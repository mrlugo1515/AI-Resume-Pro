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
  
  const completed = resumes.filter(r => r.status === 'completed').length
  const thisMonth = resumes.filter(r => {
    const date = new Date(r.createdAt)
    const now = new Date()
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
  }).length

  return {
    total: resumes.length,
    completed,
    thisMonth,
  }
}
