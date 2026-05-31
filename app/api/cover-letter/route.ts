import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { generateText } from 'ai'
import { auth } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    // Verify user is authenticated
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { resumeText, jobDescription, companyName } = await request.json()

    if (!resumeText || !companyName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const prompt = `You are an expert cover letter writer. Write a compelling, professional cover letter for a job application.

Candidate's Resume:
${resumeText}

${jobDescription ? `Job Description:\n${jobDescription}\n` : ''}

Company: ${companyName}

Guidelines:
- Write in first person from the candidate's perspective
- Be enthusiastic but professional
- Highlight 2-3 key achievements or skills that match the role
- Show knowledge of the company if possible from context
- Keep it concise (3-4 paragraphs)
- Include a strong opening and call to action
- Do not include placeholder text like [Your Name] - use natural transitions instead

Return only the cover letter text, starting with the greeting (e.g., "Dear Hiring Manager,").`

    const { text: coverLetter } = await generateText({
      model: 'openai/gpt-4o-mini',
      prompt,
      maxTokens: 2000,
    })

    return NextResponse.json({ coverLetter })
  } catch (error) {
    console.error('Cover letter generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate cover letter. Please try again.' },
      { status: 500 }
    )
  }
}
