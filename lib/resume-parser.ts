import 'server-only'

/**
 * Extracts plain text from a resume file buffer.
 * Supports PDF, DOCX, DOC, and TXT. Runs on the server only.
 */
export async function extractResumeText(buffer: Buffer, fileType: string): Promise<string> {
  let extractedText = ''

  if (fileType === 'application/pdf') {
    // pdf-parse v2 exposes a PDFParse class.
    const { PDFParse } = await import('pdf-parse')
    const parser = new PDFParse({ data: buffer })
    try {
      const result = await parser.getText()
      extractedText = result.text || ''
    } finally {
      await parser.destroy()
    }
  } else if (
    fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    fileType === 'application/msword'
  ) {
    const mammoth = await import('mammoth')
    const result = await mammoth.extractRawText({ buffer })
    extractedText = result.value
  } else if (fileType === 'text/plain') {
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
