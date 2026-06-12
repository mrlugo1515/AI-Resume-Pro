'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { resume } from '@/lib/db/schema'
import { and, desc, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function getResumes() {
  const userId = await getUserId()
  return db
    .select()
    .from(resume)
    .where(eq(resume.userId, userId))
    .orderBy(desc(resume.createdAt))
}

export async function getResumeById(id: number) {
  const userId = await getUserId()
  const results = await db
    .select()
    .from(resume)
    .where(and(eq(resume.id, id), eq(resume.userId, userId)))
    .limit(1)
  return results[0] || null
}

export async function createResume(data: {
  title: string
  originalContent: string
  jobDescription?: string
  tier: string
}) {
  const userId = await getUserId()
  const result = await db
    .insert(resume)
    .values({
      userId,
      title: data.title,
      originalContent: data.originalContent,
      jobDescription: data.jobDescription || null,
      tier: data.tier,
      status: 'pending',
    })
    .returning()
  revalidatePath('/dashboard')
  return result[0]
}

export async function updateResume(
  id: number,
  data: {
    optimizedContent?: string
    coverLetter?: string
    atsScore?: number
    improvements?: string
    keywordsMatched?: string
    status?: string
  }
) {
  const userId = await getUserId()
  await db
    .update(resume)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(and(eq(resume.id, id), eq(resume.userId, userId)))
  revalidatePath('/dashboard')
  revalidatePath(`/dashboard/resume/${id}`)
}

export async function deleteResume(id: number) {
  const userId = await getUserId()
  await db.delete(resume).where(and(eq(resume.id, id), eq(resume.userId, userId)))
  revalidatePath('/dashboard')
}

export async function getResumeStats() {
  const userId = await getUserId()
  const resumes = await db
    .select()
    .from(resume)
    .where(eq(resume.userId, userId))

  const now = new Date()
  const completed = resumes.filter((r) => r.status === 'completed').length
  const thisMonth = resumes.filter((r) => {
    const date = new Date(r.createdAt)
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
  }).length

  // Real average ATS score across scored resumes.
  const scored = resumes.filter((r) => typeof r.atsScore === 'number' && r.atsScore! > 0)
  const avgAtsScore =
    scored.length > 0
      ? Math.round(scored.reduce((sum, r) => sum + (r.atsScore || 0), 0) / scored.length)
      : null
  const bestAtsScore = scored.length > 0 ? Math.max(...scored.map((r) => r.atsScore || 0)) : null

  // Real activity for the last 7 days, oldest -> newest.
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const weeklyActivity = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(now)
    d.setDate(now.getDate() - (6 - i))
    d.setHours(0, 0, 0, 0)
    const next = new Date(d)
    next.setDate(d.getDate() + 1)
    const count = resumes.filter((r) => {
      const c = new Date(r.createdAt)
      return c >= d && c < next
    }).length
    return { day: dayLabels[d.getDay()], count }
  })

  // Count created in the previous month for a real trend.
  const lastMonth = resumes.filter((r) => {
    const date = new Date(r.createdAt)
    const lm = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    return date.getMonth() === lm.getMonth() && date.getFullYear() === lm.getFullYear()
  }).length

  return {
    total: resumes.length,
    completed,
    thisMonth,
    lastMonth,
    avgAtsScore,
    bestAtsScore,
    weeklyActivity,
  }
}
