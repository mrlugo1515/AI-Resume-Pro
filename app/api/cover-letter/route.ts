import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { generateText } from 'ai'
import { auth } from '@/lib/auth'
import { checkAccess, recordUsage } from '@/lib/entitlements'

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

    const access = await checkAccess(session.user.id, 'cover_letter')
    if (!access.allowed) {
      return NextResponse.json(
        {
          error: 'paywall',
          action: 'cover_letter',
          used: access.used,
          limit: access.limit,
          message: `You've used your ${access.limit} free cover letter${access.limit === 1 ? '' : 's'}. Upgrade to Pro for unlimited cover letters.`,
        },
        { status: 402 }
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
      maxOutputTokens: 2000,
    })

    if (access.plan === 'free') {
      await recordUsage(session.user.id, 'cover_letter')
    }

    return NextResponse.json({ coverLetter })
  } catch (error) {
    console.error('Cover letter generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate cover letter. Please try again.' },
      { status: 500 }
    )
  }
}
