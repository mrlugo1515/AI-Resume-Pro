import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { DashboardHeader } from '@/components/dashboard-header'
import { ResumeWizard } from '@/components/resume-wizard'

export const metadata = {
  title: 'New Resume | ForgeCareerAI',
  description: 'Upload and optimize your resume with AI',
}

export default async function NewResumePage() {
  const session = await auth.api.getSession({ headers: await headers() })
  
  if (!session?.user) {
    redirect('/sign-in')
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="max-w-3xl mx-auto px-4 py-8">
        <ResumeWizard />
      </main>
    </div>
  )
}
