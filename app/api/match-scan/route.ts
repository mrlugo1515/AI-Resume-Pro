import { type NextRequest, NextResponse } from 'next/server'
import { generateObject } from 'ai'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

const matchSchema = z.object({
  matchScore: z
    .number()
    .min(0)
    .max(100)
    .describe('Overall match score 0-100 for how well the resume fits this specific job. Be realistic and critical.'),
  matchSummary: z
    .string()
    .describe('A 1-2 sentence honest summary of how strong a candidate this person is for the role.'),
  scoreBreakdown: z
    .object({
      skills: z.number().min(0).max(100).describe('Score for skills alignment.'),
      experience: z.number().min(0).max(100).describe('Score for relevant experience alignment.'),
      keywords: z.number().min(0).max(100).describe('Score for ATS keyword coverage.'),
    })
    .describe('Sub-scores that explain the overall match score.'),
  matchedSkills: z
    .array(z.string())
    .describe('Important skills/keywords from the job description that ARE present in the resume.'),
  missingSkills: z
    .array(z.string())
    .describe('Important skills/keywords from the job description that are MISSING from the resume and should be added if the candidate has them.'),
  resumeImprovements: z
    .array(
      z.object({
        title: z.string().describe('Short title of the suggested improvement.'),
        description: z.string().describe('One to two sentences explaining the specific, actionable change to make.'),
      })
    )
    .describe('4-7 specific, actionable improvements to make the resume a stronger match for this job.'),
  coverLetter: z
    .string()
    .describe('A tailored, professional cover letter (3-4 paragraphs) for this specific job, written in first person from the candidate. Start with "Dear Hiring Manager,". Do not use bracketed placeholders.'),
})

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { resumeText, jobDescription } = await request.json()

    if (!resumeText?.trim() || !jobDescription?.trim()) {
      return NextResponse.json(
        { error: 'Both a resume and a job description are required.' },
        { status: 400 }
      )
    }

    const systemPrompt = `You are an expert career coach, recruiter, and ATS (Applicant Tracking System) specialist. You analyze how well a candidate's resume matches a specific job description and produce honest, actionable guidance.

Be realistic and critical when scoring:
- A weak or generic match should score 40-60.
- A solid, relevant match should score 70-85.
- Reserve 90+ for genuinely excellent, well-aligned candidates.

When suggesting missing skills, only list skills that are genuinely implied by the job description. When writing the cover letter, only reference experience and skills that are supported by the resume — never invent employers, titles, degrees, or metrics.`

    const userPrompt = `CANDIDATE'S RESUME:
"""
${resumeText}
"""

TARGET JOB DESCRIPTION:
"""
${jobDescription}
"""

Analyze the match between this resume and this job, then produce the structured result including a tailored cover letter.`

    const { object } = await generateObject({
      model: 'openai/gpt-4o',
      schema: matchSchema,
      system: systemPrompt,
      prompt: userPrompt,
    })

    return NextResponse.json({
      ...object,
      matchScore: Math.round(object.matchScore),
      scoreBreakdown: {
        skills: Math.round(object.scoreBreakdown.skills),
        experience: Math.round(object.scoreBreakdown.experience),
        keywords: Math.round(object.scoreBreakdown.keywords),
      },
      success: true,
    })
  } catch (error) {
    console.error('Match scan error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze match. Please try again.' },
      { status: 500 }
    )
  }
}
