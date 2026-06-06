import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { DashboardHeader } from '@/components/dashboard-header'
import { MatchScanner } from '@/components/match-scanner'

export const metadata = {
  title: 'Job Match Scanner | ForgeCareerAI',
  description:
    'Scan your resume against any job description to get a match score, missing skills, resume improvements, and a tailored cover letter.',
}

export default async function MatchScanPage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session?.user) {
    redirect('/sign-in')
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <MatchScanner />
      </main>
    </div>
  )
}
