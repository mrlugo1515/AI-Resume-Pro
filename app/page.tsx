import Link from 'next/link'
import { ArrowRight, Upload, Sparkles, Download, Check, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { LandingHeader } from '@/components/landing-header'
import { Footer } from '@/components/footer'

const features = [
  {
    icon: Upload,
    title: 'Upload Your Resume',
    description: 'Drop your existing resume or paste the text. We support all major formats.',
    color: 'from-blue-400 to-blue-500',
  },
  {
    icon: Sparkles,
    title: 'AI Analysis & Optimization',
    description: 'Our AI analyzes your resume against the job description and optimizes it for maximum impact.',
    color: 'from-primary-500 to-primary-700',
  },
  {
    icon: Download,
    title: 'Download & Apply',
    description: 'Get your optimized resume and tailored cover letter ready to submit.',
    color: 'from-accent-500 to-accent-600',
  },
]

const pricingPlans = [
  {
    name: 'Basic',
    price: '$0',
    period: 'free',
    description: 'Quick fixes for a polished resume.',
    features: ['Grammar & spelling fixes', 'Formatting consistency', 'Basic proofreading', 'Single document'],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$15',
    period: '/mo',
    description: 'ATS-optimized resumes that get past the bots.',
    features: ['Everything in Basic', 'ATS keyword optimization', 'Job description matching', 'Unlimited documents', 'Priority support'],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '$35',
    period: '/mo',
    description: 'Complete career transformation suite.',
    features: ['Everything in Pro', 'Full resume rewrite', 'Cover letter generation', 'Company culture alignment', 'Achievement optimization', 'API access'],
    cta: 'Contact Sales',
    highlighted: false,
  },
]

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Product Manager at Stripe',
    content: "I was applying to 20+ jobs with no responses. After using AI Resume Pro, I got 3 interviews in the first week. The keyword optimization is a game changer.",
    rating: 5,
  },
  {
    name: 'James Rodriguez',
    role: 'Software Engineer at Google',
    content: "The full rewrite feature completely transformed my resume. It highlighted achievements I didn't even think to include. Landed my dream job within a month.",
    rating: 5,
  },
  {
    name: 'Emily Park',
    role: 'Marketing Director at HubSpot',
    content: 'As someone who reviews hundreds of resumes, I can instantly tell the difference. AI Resume Pro produces results that actually stand out. Highly recommend.',
    rating: 5,
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface">
      <LandingHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-400/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 border border-primary-200 rounded-full text-xs font-medium text-primary-700 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Resume Optimization
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight mb-6 text-balance">
            Land More Interviews with{' '}
            <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
              AI-Optimized Resumes
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop sending generic resumes. Our AI tailors every application to the job description — 
            optimizing keywords, formatting, and tone so you stand out to both ATS systems and hiring managers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/sign-up">
              <Button size="lg" className="text-base">
                Start Optimizing Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <a href="#features">
              <Button variant="outline" size="lg" className="text-base">
                See How It Works
              </Button>
            </a>
          </div>
          <div className="flex items-center justify-center gap-6 mt-10 text-sm text-text-muted">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-green-500" /> No credit card
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-green-500" /> Free tier included
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-green-500" /> Cancel anytime
            </span>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              How It Works
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Three simple steps to a resume that gets results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <div 
                  key={feature.title} 
                  className="text-center animate-fade-in-up" 
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-3">{feature.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Choose the plan that fits your job search journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <Card
                key={plan.name}
                className={`relative animate-fade-in-up transition-all duration-200 hover:shadow-lg ${
                  plan.highlighted ? 'ring-2 ring-primary-500 shadow-xl scale-105' : ''
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-card text-white text-xs font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <CardContent className="pt-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-text-primary mb-1">{plan.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-text-primary">{plan.price}</span>
                      <span className="text-text-muted text-sm">{plan.period}</span>
                    </div>
                    <p className="text-sm text-text-secondary mt-2">{plan.description}</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-text-secondary">
                        <Check className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/sign-up">
                    <Button
                      variant={plan.highlighted ? 'default' : 'outline'}
                      className="w-full"
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Loved by Job Seekers
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Hear from professionals who landed their dream roles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <Card className="h-full transition-all duration-200 hover:shadow-lg">
                  <CardContent className="pt-6 flex flex-col h-full">
                    <div className="flex gap-1 mb-4">
                      {[...Array(t.rating)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed mb-6 flex-1">
                      &ldquo;{t.content}&rdquo;
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-sm font-semibold">
                        {t.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-text-primary">{t.name}</p>
                        <p className="text-xs text-text-muted">{t.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-hero">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Land More Interviews?
          </h2>
          <p className="text-lg text-blue-100 mb-10 max-w-xl mx-auto">
            Join thousands of job seekers who are getting more interviews with AI-optimized resumes.
          </p>
          <Link href="/sign-up">
            <Button
              size="lg"
              className="text-base shadow-xl bg-accent-500 hover:bg-accent-600 text-white"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
