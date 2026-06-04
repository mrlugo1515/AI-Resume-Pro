'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { job, jobApplication, savedJob } from '@/lib/db/schema'
import { and, desc, eq, ilike, or, sql, gte, lte } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

async function getOptionalUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  return session?.user?.id || null
}

export type JobFilters = {
  search?: string
  location?: string
  locationType?: string
  jobType?: string
  salaryMin?: number
  salaryMax?: number
}

export async function getJobs(filters?: JobFilters) {
  const conditions = [eq(job.status, 'active')]
  
  if (filters?.search) {
    conditions.push(
      or(
        ilike(job.title, `%${filters.search}%`),
        ilike(job.company, `%${filters.search}%`),
        ilike(job.description, `%${filters.search}%`)
      )!
    )
  }
  
  if (filters?.location) {
    conditions.push(ilike(job.location, `%${filters.location}%`))
  }
  
  if (filters?.locationType) {
    conditions.push(eq(job.locationType, filters.locationType))
  }
  
  if (filters?.jobType) {
    conditions.push(eq(job.jobType, filters.jobType))
  }
  
  if (filters?.salaryMin) {
    conditions.push(gte(job.salaryMin, filters.salaryMin))
  }
  
  if (filters?.salaryMax) {
    conditions.push(lte(job.salaryMax, filters.salaryMax))
  }

  return db
    .select()
    .from(job)
    .where(and(...conditions))
    .orderBy(desc(job.featured), desc(job.createdAt))
}

export async function getJobById(id: number) {
  const jobs = await db.select().from(job).where(eq(job.id, id))
  return jobs[0] || null
}

export async function incrementJobViews(id: number) {
  await db
    .update(job)
    .set({ views: sql`${job.views} + 1` })
    .where(eq(job.id, id))
}

export async function createJob(data: {
  title: string
  company: string
  location: string
  locationType: string
  jobType: string
  salaryMin?: number
  salaryMax?: number
  description: string
  requirements?: string
  benefits?: string
  applicationUrl?: string
  applicationEmail?: string
}) {
  const userId = await getUserId()
  
  const [newJob] = await db
    .insert(job)
    .values({
      ...data,
      userId,
    })
    .returning()
  
  revalidatePath('/jobs')
  return newJob
}

export async function updateJob(id: number, data: Partial<{
  title: string
  company: string
  location: string
  locationType: string
  jobType: string
  salaryMin: number
  salaryMax: number
  description: string
  requirements: string
  benefits: string
  applicationUrl: string
  applicationEmail: string
  status: string
}>) {
  const userId = await getUserId()
  
  await db
    .update(job)
    .set({ ...data, updatedAt: new Date() })
    .where(and(eq(job.id, id), eq(job.userId, userId)))
  
  revalidatePath('/jobs')
  revalidatePath(`/jobs/${id}`)
}

export async function deleteJob(id: number) {
  const userId = await getUserId()
  
  await db.delete(job).where(and(eq(job.id, id), eq(job.userId, userId)))
  
  revalidatePath('/jobs')
}

export async function getMyPostedJobs() {
  const userId = await getUserId()
  
  return db
    .select()
    .from(job)
    .where(eq(job.userId, userId))
    .orderBy(desc(job.createdAt))
}

export async function applyToJob(jobId: number, resumeId?: number, coverLetter?: string) {
  const userId = await getUserId()
  
  // Check if already applied
  const existing = await db
    .select()
    .from(jobApplication)
    .where(and(eq(jobApplication.jobId, jobId), eq(jobApplication.userId, userId)))
  
  if (existing.length > 0) {
    throw new Error('You have already applied to this job')
  }
  
  const [application] = await db
    .insert(jobApplication)
    .values({
      jobId,
      userId,
      resumeId,
      coverLetter,
    })
    .returning()
  
  // Increment application count
  await db
    .update(job)
    .set({ applications: sql`${job.applications} + 1` })
    .where(eq(job.id, jobId))
  
  revalidatePath(`/jobs/${jobId}`)
  return application
}

export async function getMyApplications() {
  const userId = await getUserId()
  
  return db
    .select({
      application: jobApplication,
      job: job,
    })
    .from(jobApplication)
    .innerJoin(job, eq(jobApplication.jobId, job.id))
    .where(eq(jobApplication.userId, userId))
    .orderBy(desc(jobApplication.createdAt))
}

export async function hasApplied(jobId: number) {
  const userId = await getOptionalUserId()
  if (!userId) return false
  
  const existing = await db
    .select()
    .from(jobApplication)
    .where(and(eq(jobApplication.jobId, jobId), eq(jobApplication.userId, userId)))
  
  return existing.length > 0
}

// Saved Jobs functionality
export async function saveJob(jobId: number) {
  const userId = await getUserId()
  
  // Check if already saved
  const existing = await db
    .select()
    .from(savedJob)
    .where(and(eq(savedJob.jobId, jobId), eq(savedJob.userId, userId)))
  
  if (existing.length > 0) {
    return { alreadySaved: true }
  }
  
  await db.insert(savedJob).values({ jobId, userId })
  revalidatePath('/jobs')
  revalidatePath('/dashboard/saved-jobs')
  return { saved: true }
}

export async function unsaveJob(jobId: number) {
  const userId = await getUserId()
  
  await db.delete(savedJob).where(
    and(eq(savedJob.jobId, jobId), eq(savedJob.userId, userId))
  )
  
  revalidatePath('/jobs')
  revalidatePath('/dashboard/saved-jobs')
  return { unsaved: true }
}

export async function getSavedJobs() {
  const userId = await getUserId()
  
  return db
    .select({
      savedJob: savedJob,
      job: job,
    })
    .from(savedJob)
    .innerJoin(job, eq(savedJob.jobId, job.id))
    .where(eq(savedJob.userId, userId))
    .orderBy(desc(savedJob.createdAt))
}

export async function isJobSaved(jobId: number) {
  const userId = await getOptionalUserId()
  if (!userId) return false
  
  const existing = await db
    .select()
    .from(savedJob)
    .where(and(eq(savedJob.jobId, jobId), eq(savedJob.userId, userId)))
  
  return existing.length > 0
}

export async function getJobStats() {
  const userId = await getUserId()
  
  const applications = await db
    .select()
    .from(jobApplication)
    .where(eq(jobApplication.userId, userId))
  
  const saved = await db
    .select()
    .from(savedJob)
    .where(eq(savedJob.userId, userId))
  
  const postedJobs = await db
    .select()
    .from(job)
    .where(eq(job.userId, userId))
  
  return {
    applicationsCount: applications.length,
    savedCount: saved.length,
    postedCount: postedJobs.length,
  }
}
