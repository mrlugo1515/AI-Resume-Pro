import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect, notFound } from 'next/navigation'
import { db } from '@/lib/db'
import { resume } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { DashboardHeader } from '@/components/dashboard-header'
import { ResumeDetailClient } from './client'

export const metadata = {
  title: 'Resume Details | ForgeCareerAI',
  description: 'View your optimized resume',
}

export default async function ResumeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await auth.api.getSession({ headers: await headers() })
  
  if (!session?.user) {
    redirect('/sign-in')
  }

  const { id } = await params
  const resumeId = parseInt(id, 10)

  if (isNaN(resumeId)) {
    notFound()
  }

  const [resumeData] = await db
    .select()
    .from(resume)
    .where(and(eq(resume.id, resumeId), eq(resume.userId, session.user.id)))

  if (!resumeData) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={session.user} />
      
      <main className="max-w-5xl mx-auto px-4 py-8">
        <ResumeDetailClient resume={resumeData} />
      </main>
    </div>
  )
}
