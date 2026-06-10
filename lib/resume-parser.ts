import 'server-only'

type ResumeKind = 'pdf' | 'docx' | 'txt'

/**
 * Resolves the resume file kind from the MIME type, falling back to the file
 * extension. Mobile browsers (notably iOS Safari) frequently send an empty or
 * generic MIME type like "application/octet-stream", so the extension is a
 * critical fallback.
 */
export function resolveResumeKind(fileType: string, fileName = ''): ResumeKind | null {
  const type = (fileType || '').toLowerCase()
  const name = fileName.toLowerCase()

  if (type === 'application/pdf' || name.endsWith('.pdf')) return 'pdf'
  if (
    type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    type === 'application/msword' ||
    name.endsWith('.docx') ||
    name.endsWith('.doc')
  )
    return 'docx'
  if (type === 'text/plain' || name.endsWith('.txt')) return 'txt'
  return null
}

/**
 * Extracts plain text from a resume file buffer.
 * Supports PDF, DOCX, DOC, and TXT. Runs on the server only.
 */
export async function extractResumeText(
  buffer: Buffer,
  fileType: string,
  fileName = ''
): Promise<string> {
  let extractedText = ''
  const kind = resolveResumeKind(fileType, fileName)

  if (kind === 'pdf') {
    // pdf-parse v2 exposes a PDFParse class.
    const { PDFParse } = await import('pdf-parse')
    const parser = new PDFParse({ data: buffer })
    try {
      const result = await parser.getText()
      extractedText = result.text || ''
    } finally {
      await parser.destroy()
    }
  } else if (kind === 'docx') {
    const mammoth = await import('mammoth')
    const result = await mammoth.extractRawText({ buffer })
    extractedText = result.value
  } else if (kind === 'txt') {
    extractedText = buffer.toString('utf-8')
  } else {
    throw new Error('Unsupported file type')
  }

  // Normalize whitespace.
  return extractedText
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}
