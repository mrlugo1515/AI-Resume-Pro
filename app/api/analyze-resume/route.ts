import { type NextRequest, NextResponse } from 'next/server'
import { generateObject } from 'ai'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

const analysisSchema = z.object({
  atsScore: z
    .number()
    .min(0)
    .max(100)
    .describe('A realistic ATS compatibility score from 0-100 for the current resume content.'),
  improvements: z
    .array(
      z.object({
        title: z.string().describe('A short title for the suggested improvement.'),
        description: z.string().describe('A one-sentence, actionable suggestion.'),
      })
    )
    .describe('3-6 specific, actionable suggestions to further improve the resume.'),
  keywordsMatched: z.array(z.string()).describe('Important keywords currently present in the resume.'),
  missingKeywords: z
    .array(z.string())
    .describe('Relevant keywords still missing that the candidate should consider adding if applicable.'),
})

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { content, jobDescription } = await request.json()
    if (!content || content.trim().length < 20) {
      return NextResponse.json({ error: 'Resume content is required' }, { status: 400 })
    }

    const systemPrompt = `You are an expert ATS analyst and resume reviewer. You analyze resume content and return an honest, critical ATS compatibility score and concrete suggestions. Do NOT rewrite the resume. Most resumes score 55-80; reserve 90+ for genuinely excellent, well-targeted resumes.`

    const userPrompt = jobDescription
      ? `RESUME CONTENT:\n"""\n${content}\n"""\n\nTARGET JOB DESCRIPTION:\n"""\n${jobDescription}\n"""\n\nAnalyze how well this resume targets the job and return the structured analysis.`
      : `RESUME CONTENT:\n"""\n${content}\n"""\n\nAnalyze this resume for general ATS compatibility and return the structured analysis.`

    const { object } = await generateObject({
      model: 'openai/gpt-4o-mini',
      schema: analysisSchema,
      system: systemPrompt,
      prompt: userPrompt,
    })

    return NextResponse.json({
      atsScore: Math.round(object.atsScore),
      improvements: object.improvements,
      keywordsMatched: object.keywordsMatched,
      missingKeywords: object.missingKeywords,
      success: true,
    })
  } catch (error) {
    console.error('[v0] Analyze error:', error)
    return NextResponse.json({ error: 'Failed to analyze resume' }, { status: 500 })
  }
}
