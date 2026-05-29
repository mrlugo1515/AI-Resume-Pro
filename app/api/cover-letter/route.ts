"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { resume } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) return null
  return session.user.id
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserId()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { resumeId, resumeContent, jobDescription, companyName, jobTitle } = await request.json()

    if (!resumeContent || !jobDescription) {
      return NextResponse.json(
        { error: "Resume content and job description are required" },
        { status: 400 }
      )
    }

    const prompt = `You are an expert career coach and professional writer. Create a compelling, personalized cover letter based on the following resume and job description.

RESUME:
${resumeContent}

JOB DESCRIPTION:
${jobDescription}

${companyName ? `COMPANY: ${companyName}` : ""}
${jobTitle ? `POSITION: ${jobTitle}` : ""}

Guidelines:
- Write a professional, engaging cover letter (3-4 paragraphs)
- Highlight relevant experience and skills from the resume that match the job requirements
- Show enthusiasm for the role and company
- Include specific achievements when possible
- Keep it concise but impactful
- Use a professional but personable tone

Write the cover letter now:`

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      prompt,
      temperature: 0.8,
    })

    // Update the resume in database if resumeId provided
    if (resumeId) {
      await db.update(resume)
        .set({
          coverLetter: text,
          updatedAt: new Date()
        })
        .where(eq(resume.id, resumeId))
    }

    return NextResponse.json({ coverLetter: text })
  } catch (error) {
    console.error("Cover letter generation error:", error)
    return NextResponse.json(
      { error: "Failed to generate cover letter" },
      { status: 500 }
    )
  }
}
