import type { Metadata } from 'next'
import Link from 'next/link'
import { Sparkles, ShieldCheck, Zap, BarChart3 } from 'lucide-react'
import { LandingHeader } from '@/components/landing-header'
import { Footer } from '@/components/footer'
import { FreeAtsPreview } from '@/components/free-ats-preview'

export const metadata: Metadata = {
  title: 'Free Instant ATS Resume Checker — No Signup Required',
  description:
    'Paste your resume and get an instant ATS compatibility score in seconds. See your top issues and quick wins free — no account, no upload, no credit card.',
  alternates: { canonical: '/free-ats-check' },
  openGraph: {
    title: 'Free Instant ATS Resume Checker — No Signup Required',
    description:
      'Get your ATS score in seconds. Paste your resume and see exactly what is holding it back — completely free.',
    url: 'https://forgecareerai.com/free-ats-check',
    type: 'website',
  },
}

const perks = [
  { icon: Zap, label: 'Instant results in seconds' },
  { icon: ShieldCheck, label: 'No signup or credit card' },
  { icon: BarChart3, label: 'Real ATS scoring' },
]

export default function FreeAtsCheckPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />

      <section className="pt-32 pb-12 px-4 bg-gradient-dark">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-zinc-300 mb-6">
            <Sparkles className="w-4 h-4 text-accent-400" />
            100% Free — No Account Needed
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-[1.1] mb-5 tracking-tight text-balance">
            Is your resume <span className="text-gradient">ATS-ready?</span> Find out instantly
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            Paste your resume below and get a real ATS compatibility score in seconds — plus the
            top issues holding you back. No signup, no upload, no credit card.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-400">
            {perks.map((p) => {
              const Icon = p.icon
              return (
                <span key={p.label} className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-accent-400" />
                  {p.label}
                </span>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-surface">
        <FreeAtsPreview />
      </section>

      <section className="py-16 px-4 bg-background">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-4 text-balance">
            Want the full breakdown and a rewritten resume?
          </h2>
          <p className="text-text-secondary mb-2">
            Creating a free account unlocks every issue, a line-by-line optimized rewrite, missing
            keywords, and a tailored cover letter for any job.
          </p>
          <p className="text-sm text-text-muted">
            Already convinced?{' '}
            <Link href="/sign-up" className="text-primary-600 font-medium hover:underline">
              Create your free account
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
