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

    const { resumeId, resumeContent, jobDescription, tier } = await request.json()

    if (!resumeContent) {
      return NextResponse.json({ error: "Resume content is required" }, { status: 400 })
    }

    // Build the optimization prompt based on tier
    const tierFeatures = {
      basic: "Focus on ATS optimization, keyword matching, and basic formatting improvements.",
      pro: "Include ATS optimization, keyword matching, formatting improvements, achievement quantification, and action verb enhancement.",
      enterprise: "Provide comprehensive optimization including ATS optimization, keyword matching, formatting, achievement quantification, action verbs, executive summary crafting, and industry-specific terminology."
    }

    const prompt = `You are an expert resume optimizer and career coach. Analyze and optimize the following resume${jobDescription ? " for the given job description" : ""}.

${tierFeatures[tier as keyof typeof tierFeatures] || tierFeatures.basic}

RESUME:
${resumeContent}

${jobDescription ? `JOB DESCRIPTION:
${jobDescription}` : ""}

Provide your response in the following JSON format:
{
  "optimizedResume": "The fully optimized resume text with improvements applied",
  "atsScore": <number between 0-100 representing ATS compatibility>,
  "improvements": ["List of specific improvements made"],
  "keywords": ["Relevant keywords extracted/added"],
  "suggestions": ["Additional suggestions for the candidate"]
}

Return ONLY the JSON object, no additional text.`

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      prompt,
      temperature: 0.7,
    })

    // Parse the AI response
    let result
    try {
      // Clean the response in case it has markdown code blocks
      const cleanedText = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim()
      result = JSON.parse(cleanedText)
    } catch {
      // If parsing fails, create a basic response
      result = {
        optimizedResume: text,
        atsScore: 75,
        improvements: ["Resume has been optimized"],
        keywords: [],
        suggestions: []
      }
    }

    // Update the resume in database if resumeId provided
    if (resumeId) {
      await db.update(resume)
        .set({
          optimizedContent: result.optimizedResume,
          atsScore: result.atsScore,
          status: "completed",
          updatedAt: new Date()
        })
        .where(eq(resume.id, resumeId))
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Optimization error:", error)
    return NextResponse.json(
      { error: "Failed to optimize resume" },
      { status: 500 }
    )
  }
}
