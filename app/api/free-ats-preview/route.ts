import { type NextRequest, NextResponse } from 'next/server'
import { generateObject } from 'ai'
import { z } from 'zod'

export const maxDuration = 30

const previewSchema = z.object({
  atsScore: z
    .number()
    .min(0)
    .max(100)
    .describe('Overall ATS compatibility score 0-100. Be realistic and critical — most unoptimized resumes score 45-70.'),
  scoreSummary: z
    .string()
    .describe('One honest sentence summarizing how ATS-ready this resume is.'),
  topIssues: z
    .array(
      z.object({
        title: z.string().describe('Short title of the issue (e.g. "Missing measurable results").'),
        severity: z.enum(['high', 'medium', 'low']),
      })
    )
    .min(3)
    .max(8)
    .describe('The most important ATS issues found, ordered by impact (highest first).'),
  quickWins: z
    .array(z.string())
    .min(2)
    .max(6)
    .describe('Specific, actionable fixes the candidate can make right now.'),
  missingKeywordCount: z
    .number()
    .describe('Estimated number of commonly-expected keywords missing for this type of role.'),
})

export async function POST(request: NextRequest) {
  try {
    const { resumeText } = await request.json()

    if (!resumeText?.trim() || resumeText.trim().length < 80) {
      return NextResponse.json(
        { error: 'Please paste a more complete resume (at least a few lines).' },
        { status: 400 }
      )
    }

    // Cap input size to control cost/latency for the free tool.
    const trimmed = resumeText.slice(0, 12000)

    const { object } = await generateObject({
      model: 'openai/gpt-4o-mini',
      schema: previewSchema,
      system: `You are an expert ATS (Applicant Tracking System) analyst and resume reviewer. You evaluate how well a resume would perform when parsed and ranked by automated hiring systems. Be realistic and critical:
- Generic, unquantified resumes should score 45-65.
- Solid resumes with metrics and clear structure score 70-85.
- Reserve 90+ for genuinely excellent, keyword-rich, well-structured resumes.
Identify concrete, honest issues. Never invent details about the candidate.`,
      prompt: `Analyze this resume for ATS compatibility and quality. Identify the biggest issues and quick wins.\n\nRESUME:\n"""\n${trimmed}\n"""`,
    })

    // Return the score and a teaser, but only expose the first 2 issues and
    // first 2 quick wins. The rest is "locked" behind signup.
    return NextResponse.json({
      atsScore: Math.round(object.atsScore),
      scoreSummary: object.scoreSummary,
      visibleIssues: object.topIssues.slice(0, 2),
      lockedIssueCount: Math.max(object.topIssues.length - 2, 0),
      visibleQuickWins: object.quickWins.slice(0, 2),
      lockedQuickWinCount: Math.max(object.quickWins.length - 2, 0),
      missingKeywordCount: object.missingKeywordCount,
      success: true,
    })
  } catch (error) {
    console.error('Free ATS preview error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze resume. Please try again.' },
      { status: 500 }
    )
  }
}
