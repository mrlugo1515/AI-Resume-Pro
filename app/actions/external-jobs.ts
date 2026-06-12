'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { resume } from '@/lib/db/schema'
import { and, desc, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import {
  fetchExternalJobs,
  fetchExternalJobById,
  isLiveJobsEnabled,
  type ExternalJob,
  type ExternalJobFilters,
} from '@/lib/jobs-api'
import { scoreJobMatch, type MatchResult } from '@/lib/job-match'

export type MatchedJob = ExternalJob & { match: MatchResult | null }

async function getOptionalUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  return session?.user?.id || null
}

// Returns the candidate's best resume text for matching:
// prefer the most recent optimized resume, else the most recent original.
async function getResumeTextForUser(userId: string): Promise<string | null> {
  const results = await db
    .select()
    .from(resume)
    .where(eq(resume.userId, userId))
    .orderBy(desc(resume.updatedAt))
    .limit(10)

  if (results.length === 0) return null

  const optimized = results.find((r) => r.optimizedContent && r.optimizedContent.length > 40)
  if (optimized?.optimizedContent) return optimized.optimizedContent

  const original = results.find((r) => r.originalContent && r.originalContent.length > 40)
  return original?.originalContent || null
}

export async function getMatchedJobs(filters?: ExternalJobFilters): Promise<{
  jobs: MatchedJob[]
  hasResume: boolean
  liveData: boolean
}> {
  const userId = await getOptionalUserId()
  const [jobs, resumeText] = await Promise.all([
    fetchExternalJobs(filters || {}),
    userId ? getResumeTextForUser(userId) : Promise.resolve(null),
  ])

  const matched: MatchedJob[] = jobs.map((j) => ({
    ...j,
    match: resumeText ? scoreJobMatch(resumeText, j) : null,
  }))

  // Rank by match score when a resume exists; otherwise keep featured/recency order.
  if (resumeText) {
    matched.sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1
      return (b.match?.score || 0) - (a.match?.score || 0)
    })
  }

  return {
    jobs: matched,
    hasResume: Boolean(resumeText),
    liveData: isLiveJobsEnabled(),
  }
}

export async function getMatchedJobById(id: string): Promise<{
  job: MatchedJob | null
  hasResume: boolean
}> {
  const userId = await getOptionalUserId()
  const [job, resumeText] = await Promise.all([
    fetchExternalJobById(id),
    userId ? getResumeTextForUser(userId) : Promise.resolve(null),
  ])

  if (!job) return { job: null, hasResume: Boolean(resumeText) }

  return {
    job: { ...job, match: resumeText ? scoreJobMatch(resumeText, job) : null },
    hasResume: Boolean(resumeText),
  }
}
