import { put } from '@vercel/blob'
import { type NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { extractResumeText } from '@/lib/resume-parser'

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain',
    ]
    
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload PDF, DOCX, DOC, or TXT files.' },
        { status: 400 }
      )
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB.' },
        { status: 400 }
      )
    }

    // Read the file into memory once, then store and parse it concurrently.
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const filename = `resumes/${session.user.id}/${Date.now()}-${file.name}`

    // Run blob upload and text extraction in parallel. The user only needs the
    // extracted text to continue, and both operations work off the same buffer,
    // so there is no reason to wait for one before starting the other.
    const [blobResult, parseResult] = await Promise.allSettled([
      put(filename, buffer, {
        access: 'private',
        contentType: file.type,
      }),
      extractResumeText(buffer, file.type),
    ])

    // Resolve the extracted text / parse error.
    let extractedText = ''
    let parseError: string | null = null
    if (parseResult.status === 'fulfilled') {
      extractedText = parseResult.value
      if (!extractedText || extractedText.length < 20) {
        parseError =
          'We could not read enough text from this file. It may be a scanned image or password-protected. Try the "Paste Text" option instead.'
      }
    } else {
      console.error('[v0] Parse error during upload:', parseResult.reason)
      parseError =
        'We could not extract text from this file. Please try a different file or use the "Paste Text" option.'
    }

    // The blob upload is non-blocking for the user flow; log but do not fail.
    const pathname =
      blobResult.status === 'fulfilled' ? blobResult.value.pathname : null
    if (blobResult.status === 'rejected') {
      console.error('[v0] Blob upload failed:', blobResult.reason)
    }

    return NextResponse.json({ 
      pathname,
      filename: file.name,
      size: file.size,
      type: file.type,
      text: extractedText,
      parseError,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
