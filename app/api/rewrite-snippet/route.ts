import { type NextRequest, NextResponse } from 'next/server'
import { generateObject } from 'ai'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

const rewriteSchema = z.object({
  rewritten: z
    .string()
    .describe('The improved version of the provided text, preserving meaning but stronger and more impactful.'),
  variants: z
    .array(z.string())
    .max(3)
    .describe('Up to 3 alternative phrasings the candidate can choose from.'),
})

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { text, mode, jobDescription } = await request.json()
    if (!text || text.trim().length < 3) {
      return NextResponse.json({ error: 'Text to rewrite is required' }, { status: 400 })
    }

    const modeGuide: Record<string, string> = {
      bullet:
        'Rewrite this resume bullet point to start with a strong action verb, quantify impact where reasonable, and be concise (one line). Never invent specific metrics that are not implied.',
      summary:
        'Rewrite this professional summary to be punchy, specific, and tailored. 2-3 sentences max.',
      concise: 'Make this text more concise and impactful without losing meaning.',
      keywords: 'Naturally weave in relevant industry keywords without keyword-stuffing.',
    }

    const instruction = modeGuide[mode as string] || modeGuide.concise

    const systemPrompt = `You are a world-class resume writer. ${instruction} Be honest — never fabricate experience, titles, or metrics. Keep the candidate's voice.`

    const userPrompt = jobDescription
      ? `TARGET JOB:\n"""\n${jobDescription}\n"""\n\nTEXT TO IMPROVE:\n"""\n${text}\n"""`
      : `TEXT TO IMPROVE:\n"""\n${text}\n"""`

    const { object } = await generateObject({
      model: 'openai/gpt-4o-mini',
      schema: rewriteSchema,
      system: systemPrompt,
      prompt: userPrompt,
    })

    return NextResponse.json({
      rewritten: object.rewritten,
      variants: object.variants || [],
      success: true,
    })
  } catch (error) {
    console.error('[v0] Rewrite error:', error)
    return NextResponse.json({ error: 'Failed to rewrite text' }, { status: 500 })
  }
}
