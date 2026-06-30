import { DashboardHeader } from '@/components/dashboard-header'
import { ReferralCard } from '@/components/referral-card'
import { getReferralStats } from '@/app/actions/referral'

export const metadata = {
  title: 'Refer Friends | ForgeCareerAI',
  description:
    'Invite friends to ForgeCareerAI. When they sign up with your link, you both get a free resume optimization.',
}

export default async function ReferralsPage() {
  const stats = await getReferralStats()

  return (
    <div className="min-h-screen bg-surface">
      <DashboardHeader />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-text-primary">Refer friends, earn free optimizations</h1>
          <p className="text-text-secondary mt-1">
            Help a friend land more interviews — and get rewarded for it.
          </p>
        </div>
        <ReferralCard stats={stats} />
      </main>
    </div>
  )
}
