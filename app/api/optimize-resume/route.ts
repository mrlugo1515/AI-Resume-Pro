import { type NextRequest, NextResponse } from 'next/server'
import { streamText } from 'ai'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { db } from '@/lib/db'
import { resume } from '@/lib/db/schema'

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { title, content, jobDescription } = await request.json()

    if (!content) {
      return NextResponse.json({ error: 'Resume content is required' }, { status: 400 })
    }

    // Create system prompt based on whether job description is provided
    const systemPrompt = jobDescription
      ? `You are an expert resume optimizer and career coach. Your task is to optimize the given resume to match the job description provided.

Focus on:
1. Adding relevant keywords from the job description naturally
2. Highlighting transferable skills that match the job requirements
3. Quantifying achievements where possible
4. Improving action verbs and impact statements
5. Ensuring ATS (Applicant Tracking System) compatibility
6. Maintaining a professional tone
7. Organizing content for maximum impact

Return ONLY the optimized resume content without any explanations or comments.`
      : `You are an expert resume optimizer and career coach. Your task is to improve the given resume for general job applications.

Focus on:
1. Improving clarity and conciseness
2. Strengthening action verbs and impact statements
3. Quantifying achievements where possible
4. Fixing grammar and formatting issues
5. Ensuring ATS (Applicant Tracking System) compatibility
6. Maintaining a professional tone
7. Organizing content for maximum impact

Return ONLY the optimized resume content without any explanations or comments.`

    const userPrompt = jobDescription
      ? `Here is my resume:\n\n${content}\n\nHere is the job description I'm targeting:\n\n${jobDescription}\n\nPlease optimize my resume for this specific job.`
      : `Here is my resume:\n\n${content}\n\nPlease optimize my resume for general job applications.`

    // Generate optimized resume using AI
    const result = await streamText({
      model: 'openai/gpt-4o-mini',
      system: systemPrompt,
      prompt: userPrompt,
    })

    // Collect the full response
    let optimizedContent = ''
    for await (const chunk of result.textStream) {
      optimizedContent += chunk
    }

    // Calculate a simple ATS score (based on content analysis)
    const atsScore = calculateATSScore(optimizedContent, jobDescription)

    // Save to database
    const [newResume] = await db.insert(resume).values({
      userId: session.user.id,
      title: title || 'Untitled Resume',
      originalContent: content,
      optimizedContent,
      jobDescription: jobDescription || null,
      tier: jobDescription ? 'keyword' : 'basic',
      atsScore,
      status: 'completed',
    }).returning()

    return NextResponse.json({
      id: newResume.id,
      optimizedContent,
      atsScore,
      success: true,
    })
  } catch (error) {
    console.error('Optimize error:', error)
    return NextResponse.json({ error: 'Failed to optimize resume' }, { status: 500 })
  }
}

function calculateATSScore(resumeContent: string, jobDescription?: string): number {
  let score = 70 // Base score

  // Check for common ATS-friendly elements
  const hasContactInfo = /email|phone|\d{3}[-.]?\d{3}[-.]?\d{4}|@/i.test(resumeContent)
  const hasExperience = /experience|work history|employment/i.test(resumeContent)
  const hasEducation = /education|degree|university|college/i.test(resumeContent)
  const hasSkills = /skills|proficient|expertise/i.test(resumeContent)
  const hasActionVerbs = /led|managed|developed|created|implemented|achieved|increased|reduced|improved/i.test(resumeContent)
  const hasQuantifiableResults = /\d+%|\$\d+|\d+ (years?|months?|people|team|projects?)/i.test(resumeContent)

  if (hasContactInfo) score += 5
  if (hasExperience) score += 5
  if (hasEducation) score += 5
  if (hasSkills) score += 5
  if (hasActionVerbs) score += 5
  if (hasQuantifiableResults) score += 5

  // If job description provided, check for keyword matches
  if (jobDescription) {
    const jobWords = jobDescription.toLowerCase().split(/\W+/).filter(w => w.length > 4)
    const resumeWords = resumeContent.toLowerCase()
    const matchCount = jobWords.filter(word => resumeWords.includes(word)).length
    const matchRatio = matchCount / Math.max(jobWords.length, 1)
    score += Math.min(matchRatio * 20, 15) // Up to 15 bonus points for keyword matching
  }

  return Math.min(Math.round(score), 100)
}
