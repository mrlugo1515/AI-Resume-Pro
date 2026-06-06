import Link from 'next/link'
import { ArrowRight, Upload, Sparkles, Download, Check, Star, Zap, Shield, Target, TrendingUp, FileText, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { LandingHeader } from '@/components/landing-header'
import { Footer } from '@/components/footer'
import { CompanyLogos } from '@/components/company-logos'
import { BeforeAfterDemo } from '@/components/before-after-demo'
import { FAQ } from '@/components/faq'
import { AnimatedStats } from '@/components/animated-stats'
import { PricingSection } from '@/components/pricing-section'

const features = [
  {
    icon: Upload,
    title: 'Upload Your Resume',
    description: 'Drop your existing resume or paste the text. We support PDF, DOCX, and plain text formats.',
  },
  {
    icon: Sparkles,
    title: 'AI Analysis & Optimization',
    description: 'Our AI analyzes your resume against the job description and optimizes keywords, formatting, and tone.',
  },
  {
    icon: Download,
    title: 'Download & Apply',
    description: 'Get your ATS-optimized resume and tailored cover letter ready to submit in minutes.',
  },
]

const benefits = [
  {
    icon: Target,
    title: 'Job-Specific Tailoring',
    description: 'Every resume is customized to match the exact requirements of your target position.',
  },
  {
    icon: Shield,
    title: 'ATS-Friendly Format',
    description: 'Guaranteed to pass through Applicant Tracking Systems that filter out 75% of applications.',
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description: 'Get your optimized resume in under 2 minutes. No waiting, no manual reviews.',
  },
  {
    icon: TrendingUp,
    title: 'Achievement Highlighting',
    description: 'AI identifies and emphasizes your most impactful accomplishments and metrics.',
  },
]

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Product Manager',
    company: 'Stripe',
    content: "I was applying to 20+ jobs with no responses. After using ForgeCareerAI, I got 3 interviews in the first week. The keyword optimization is incredible.",
    rating: 5,
    image: 'SC',
  },
  {
    name: 'James Rodriguez',
    role: 'Software Engineer',
    company: 'Google',
    content: "The AI completely transformed my resume. It highlighted achievements I didn't think to include. Landed my dream job within a month.",
    rating: 5,
    image: 'JR',
  },
  {
    name: 'Emily Park',
    role: 'Marketing Director',
    company: 'HubSpot',
    content: "As someone who reviews hundreds of resumes, I can instantly tell the difference. ForgeCareerAI produces results that actually stand out.",
    rating: 5,
    image: 'EP',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'ForgeCareerAI',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'AI-powered resume optimization that tailors your resume to any job description, beats ATS systems, and helps you land more interviews.',
      offers: {
        '@type': 'Offer',
        price: '9',
        priceCurrency: 'USD',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '1200',
      },
      url: 'https://forgecareerai.com',
    },
    {
      '@type': 'Organization',
      name: 'ForgeCareerAI',
      url: 'https://forgecareerai.com',
      logo: 'https://forgecareerai.com/icon.png',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does ForgeCareerAI optimize my resume?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Our AI analyzes your resume against the target job description, adds relevant keywords, strengthens achievement statements, and formats everything to pass Applicant Tracking Systems (ATS).',
          },
        },
        {
          '@type': 'Question',
          name: 'What file formats can I upload?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can upload PDF, DOCX, DOC, and TXT files, or simply paste your resume text directly.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is ForgeCareerAI free to use?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, you can start optimizing for free with no credit card required. Paid plans unlock advanced ATS optimization and cover letter generation.',
          },
        },
      ],
    },
  ],
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingHeader />

      {/* Hero Section - Dark with gradient */}
      <section className="relative pt-32 pb-24 px-4 bg-gradient-dark overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-radial" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-500/10 rounded-full blur-[100px]" />
        
        <div className="relative max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-zinc-300 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-accent-400" />
            AI-Powered Resume Optimization
          </div>
          
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 animate-fade-in-up tracking-tight">
            Land more interviews with{' '}
            <span className="text-gradient">AI-optimized</span>{' '}
            resumes
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Stop sending generic resumes. Our AI tailors every application to the job description, 
            optimizing for both ATS systems and hiring managers.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Link href="/sign-up">
              <Button size="lg" className="text-base px-8 h-12 bg-primary-600 hover:bg-primary-700 text-white">
                Start Optimizing Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button variant="outline" size="lg" className="text-base px-8 h-12 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white">
                See How It Works
              </Button>
            </a>
          </div>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-500 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" /> No credit card required
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" /> Free tier available
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" /> Cancel anytime
            </span>
          </div>
        </div>

        {/* Animated Stats */}
        <AnimatedStats />
        
        {/* Company Logos */}
        <CompanyLogos />
      </section>

      {/* Before/After Demo */}
      <BeforeAfterDemo />

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-4 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">How It Works</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Three steps to your perfect resume
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Our AI-powered platform makes resume optimization simple and effective.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <div 
                  key={feature.title} 
                  className="relative text-center p-8 rounded-2xl bg-white border border-border hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary-600 text-white text-sm font-bold flex items-center justify-center">
                    {i + 1}
                  </div>
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-3">{feature.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">Why ForgeCareerAI</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Built for modern job seekers
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Everything you need to stand out in today&apos;s competitive job market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <div 
                  key={benefit.title} 
                  className="flex gap-5 p-6 rounded-xl bg-surface hover:bg-surface-alt transition-colors border border-transparent hover:border-border"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2">{benefit.title}</h3>
                    <p className="text-text-secondary">{benefit.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <PricingSection />

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">Testimonials</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Trusted by thousands of job seekers
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              See how professionals landed their dream roles with ForgeCareerAI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <Card key={t.name} className="h-full hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-6 flex flex-col h-full">
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-text-secondary leading-relaxed mb-6 flex-1">
                    &ldquo;{t.content}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-sm font-semibold">
                      {t.image}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{t.name}</p>
                      <p className="text-xs text-text-muted">{t.role} at {t.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Final CTA */}
      <section className="py-24 px-4 bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial opacity-50" />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to land your dream job?
          </h2>
          <p className="text-lg text-zinc-400 mb-10 max-w-xl mx-auto">
            Join thousands of job seekers who are getting more interviews with AI-optimized resumes.
          </p>
          <Link href="/sign-up">
            <Button
              size="lg"
              className="text-base px-10 h-14 bg-accent-500 hover:bg-accent-600 text-white font-semibold shadow-lg shadow-accent-500/25"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <p className="mt-6 text-sm text-zinc-500">
            No credit card required. Start optimizing in seconds.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
