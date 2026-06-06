import { type NextRequest, NextResponse } from 'next/server'
import { generateObject } from 'ai'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { db } from '@/lib/db'
import { resume } from '@/lib/db/schema'

const optimizationSchema = z.object({
  optimizedContent: z
    .string()
    .describe('The full optimized resume content, professionally formatted in clean plain text with clear section headers.'),
  atsScore: z
    .number()
    .min(0)
    .max(100)
    .describe('A realistic ATS compatibility score from 0-100 for how well the optimized resume matches the target.'),
  improvements: z
    .array(
      z.object({
        title: z.string().describe('A short title for the improvement, e.g. "Stronger action verbs".'),
        description: z.string().describe('A one-sentence explanation of what was changed and why it helps.'),
      })
    )
    .describe('A list of 4-7 specific, concrete improvements that were made to the resume.'),
  keywordsMatched: z
    .array(z.string())
    .describe('Important keywords or skills now present in the resume. If a job description was provided, prioritize keywords from it.'),
  missingKeywords: z
    .array(z.string())
    .describe('Relevant keywords still missing that the candidate should consider adding if applicable. Empty array if none.'),
})

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { title, content, jobDescription } = await request.json()

    if (!content) {
      return NextResponse.json({ error: 'Resume content is required' }, { status: 400 })
    }

    const systemPrompt = `You are a world-class resume writer, career coach, and ATS (Applicant Tracking System) expert who has helped thousands of candidates land interviews at top companies.

Your job is to rewrite and optimize the candidate's resume so it is:
- Tailored ${jobDescription ? 'specifically to the target job description provided' : 'for strong general job applications'}
- Rich with relevant, naturally-placed keywords (never keyword-stuffed)
- Built around quantified, achievement-oriented bullet points using strong action verbs
- Free of grammar, spelling, and formatting issues
- Fully ATS-compatible with clear, standard section headers (Summary, Experience, Education, Skills, etc.)
- Honest: never invent jobs, degrees, or metrics that were not implied by the original resume

When scoring ATS compatibility, be realistic and critical — most unoptimized resumes score 55-75. Reserve scores above 90 for genuinely excellent, well-targeted resumes.`

    const userPrompt = jobDescription
      ? `CANDIDATE'S CURRENT RESUME:\n"""\n${content}\n"""\n\nTARGET JOB DESCRIPTION:\n"""\n${jobDescription}\n"""\n\nRewrite and optimize the resume to maximize this candidate's chances for this specific role. Then provide the structured analysis.`
      : `CANDIDATE'S CURRENT RESUME:\n"""\n${content}\n"""\n\nRewrite and optimize this resume for strong general job applications. Then provide the structured analysis.`

    const { object } = await generateObject({
      model: 'openai/gpt-4o',
      schema: optimizationSchema,
      system: systemPrompt,
      prompt: userPrompt,
    })

    const [newResume] = await db
      .insert(resume)
      .values({
        userId: session.user.id,
        title: title || 'Untitled Resume',
        originalContent: content,
        optimizedContent: object.optimizedContent,
        jobDescription: jobDescription || null,
        tier: jobDescription ? 'keyword' : 'basic',
        atsScore: Math.round(object.atsScore),
        improvements: JSON.stringify(object.improvements),
        keywordsMatched: JSON.stringify({
          matched: object.keywordsMatched,
          missing: object.missingKeywords,
        }),
        status: 'completed',
      })
      .returning()

    return NextResponse.json({
      id: newResume.id,
      optimizedContent: object.optimizedContent,
      atsScore: Math.round(object.atsScore),
      improvements: object.improvements,
      keywordsMatched: object.keywordsMatched,
      missingKeywords: object.missingKeywords,
      success: true,
    })
  } catch (error) {
    console.error('Optimize error:', error)
    return NextResponse.json({ error: 'Failed to optimize resume' }, { status: 500 })
  }
}
