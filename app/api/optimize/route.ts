import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { generateText } from 'ai'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { resume } from '@/lib/db/schema'
import { and, eq } from 'drizzle-orm'

export async function POST(request: NextRequest) {
  try {
    // Verify user is authenticated
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { resumeText, jobDescription, tier, title } = await request.json()

    if (!resumeText || !jobDescription || !tier || !title) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create the resume record first
    const [newResume] = await db
      .insert(resume)
      .values({
        userId: session.user.id,
        title,
        originalContent: resumeText,
        jobDescription,
        tier,
        status: 'processing',
      })
      .returning()

    // Build the optimization prompt based on tier
    let prompt = ''
    
    if (tier === 'basic') {
      prompt = `You are an expert resume editor. Please improve the following resume with:
- Grammar and spelling corrections
- Formatting improvements
- Professional language enhancements

Keep the structure and content largely the same, just polish it.

Resume:
${resumeText}

Job Description (for context):
${jobDescription}

Return only the improved resume text, no explanations.`
    } else if (tier === 'keyword') {
      prompt = `You are an ATS optimization expert. Analyze the job description and optimize the resume to:
- Include relevant keywords from the job description
- Improve ATS compatibility
- Highlight matching skills and experiences
- Use industry-standard terminology
- Fix any grammar or formatting issues

Resume:
${resumeText}

Job Description:
${jobDescription}

Return only the optimized resume text, formatted professionally. No explanations.`
    } else if (tier === 'rewrite') {
      prompt = `You are a professional resume writer. Completely rewrite and transform this resume to:
- Perfectly target the job description
- Rewrite bullet points as achievement-focused statements with metrics where possible
- Reorganize sections for maximum impact
- Use powerful action verbs
- Optimize for ATS systems
- Create a compelling professional narrative
- Ensure all relevant skills and experiences are highlighted

Resume:
${resumeText}

Job Description:
${jobDescription}

Return only the completely rewritten resume text, formatted professionally. No explanations.`
    }

    // Generate optimized resume using AI
    const { text: optimizedResume } = await generateText({
      model: 'openai/gpt-4o-mini',
      prompt,
      maxTokens: 4000,
    })

    // Calculate a simple ATS score (based on keyword matching)
    const jobKeywords = jobDescription.toLowerCase().split(/\s+/).filter((w: string) => w.length > 4)
    const resumeWords = optimizedResume.toLowerCase().split(/\s+/)
    const matchedKeywords = jobKeywords.filter((keyword: string) => 
      resumeWords.some((word: string) => word.includes(keyword))
    )
    const atsScore = Math.min(Math.round((matchedKeywords.length / Math.max(jobKeywords.length, 1)) * 100), 95)

    // Update the resume record
    await db
      .update(resume)
      .set({
        optimizedContent: optimizedResume,
        atsScore,
        status: 'completed',
        updatedAt: new Date(),
      })
      .where(and(eq(resume.id, newResume.id), eq(resume.userId, session.user.id)))

    return NextResponse.json({
      optimizedResume,
      atsScore,
      resumeId: newResume.id,
    })
  } catch (error) {
    console.error('Optimization error:', error)
    return NextResponse.json(
      { error: 'Failed to optimize resume. Please try again.' },
      { status: 500 }
    )
  }
}
