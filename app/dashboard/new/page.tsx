import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { DashboardHeader } from '@/components/dashboard-header'
import { ResumeWizard } from '@/components/resume-wizard'
import { fetchExternalJobById } from '@/lib/jobs-api'

export const metadata = {
  title: 'New Resume | ForgeCareerAI',
  description: 'Upload and optimize your resume with AI',
}

export default async function NewResumePage({
  searchParams,
}: {
  searchParams: Promise<{ job?: string }>
}) {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session?.user) {
    redirect('/sign-in')
  }

  const { job: jobId } = await searchParams
  let prefillJobDescription = ''
  let prefillTitle = ''
  if (jobId) {
    const targetJob = await fetchExternalJobById(decodeURIComponent(jobId))
    if (targetJob) {
      prefillJobDescription = [
        `${targetJob.title} at ${targetJob.company}`,
        targetJob.location,
        '',
        targetJob.description,
        targetJob.requirements ? `\nRequirements:\n${targetJob.requirements}` : '',
      ]
        .filter(Boolean)
        .join('\n')
      prefillTitle = `${targetJob.title} - ${targetJob.company}`
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="max-w-3xl mx-auto px-4 py-8">
        <ResumeWizard prefillJobDescription={prefillJobDescription} prefillTitle={prefillTitle} />
      </main>
    </div>
  )
}
