import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { ArrowRight, Check, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LandingHeader } from '@/components/landing-header'
import { Footer } from '@/components/footer'
import { EmailCapture } from '@/components/email-capture'

export interface SeoFeature {
  icon: LucideIcon
  title: string
  description: string
}

export interface SeoStep {
  title: string
  description: string
}

export interface SeoFaqItem {
  question: string
  answer: string
}

export interface SeoLandingProps {
  eyebrow: string
  title: string
  highlight: string
  subtitle: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  features: SeoFeature[]
  steps: SeoStep[]
  faqs: SeoFaqItem[]
  benefits: string[]
  emailSource: string
}

export function SeoLanding({
  eyebrow,
  title,
  highlight,
  subtitle,
  primaryCta = { label: 'Get Started Free', href: '/sign-up' },
  secondaryCta = { label: 'See How It Works', href: '/#how-it-works' },
  features,
  steps,
  faqs,
  benefits,
  emailSource,
}: SeoLandingProps) {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 bg-gradient-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial" />
        <div className="absolute top-1/3 left-1/4 w-[480px] h-[480px] bg-primary-600/20 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-zinc-300 mb-8">
            {eyebrow}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6 tracking-tight text-balance">
            {title}{' '}
            <span className="text-gradient">{highlight}</span>
          </h1>
          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed text-pretty">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link href={primaryCta.href}>
              <Button size="lg" className="text-base px-8 h-12 bg-primary-600 hover:bg-primary-700 text-white">
                {primaryCta.label}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href={secondaryCta.href}>
              <Button variant="outline" size="lg" className="text-base px-8 h-12 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white">
                {secondaryCta.label}
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm text-zinc-400">Rated 4.9/5 by 1,200+ job seekers</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">Features</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4 text-balance">
              Everything you need to win the job
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="p-8 rounded-2xl bg-white border border-border hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-14 h-14 mb-5 rounded-xl bg-primary-50 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">{feature.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">How It Works</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary text-balance">
              Get results in three simple steps
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={step.title} className="relative text-center p-8 rounded-2xl bg-surface border border-border">
                <div className="w-10 h-10 mx-auto mb-5 rounded-full bg-primary-600 text-white font-bold flex items-center justify-center">
                  {i + 1}
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">{step.title}</h3>
                <p className="text-text-secondary leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-4 bg-surface">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary text-balance">Why job seekers choose us</h2>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-border">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-text-secondary">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary text-balance">Frequently asked questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-xl border border-border bg-surface p-6">
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-text-primary list-none">
                  {faq.question}
                  <span className="text-primary-600 transition-transform group-open:rotate-45 text-2xl leading-none">+</span>
                </summary>
                <p className="mt-4 text-text-secondary leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Email capture */}
      <section className="py-20 px-4 bg-gradient-dark">
        <EmailCapture source={emailSource} />
      </section>

      <Footer />
    </div>
  )
}
