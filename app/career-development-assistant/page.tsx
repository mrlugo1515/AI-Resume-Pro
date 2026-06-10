import type { Metadata } from 'next'
import { Compass, Map, MessageSquare, TrendingUp, Briefcase, GraduationCap } from 'lucide-react'
import { SeoLanding } from '@/components/seo-landing'

export const metadata: Metadata = {
  title: 'Career Development Assistant — Your AI Career Coach',
  description:
    'Plan your next move with our AI Career Development Assistant. Get personalized career paths, skill recommendations, and job search guidance 24/7.',
  keywords: ['career development assistant', 'AI career coach', 'career AI tools', 'career planning', 'job application assistant'],
  alternates: { canonical: '/career-development-assistant' },
  openGraph: {
    title: 'Career Development Assistant — Your AI Career Coach',
    description:
      'Get personalized career paths, skill recommendations, and job search guidance from your AI career coach.',
    url: '/career-development-assistant',
  },
}

const features = [
  { icon: Compass, title: 'Personalized Career Paths', description: 'Discover roles that match your skills, experience, and goals — with clear next steps.' },
  { icon: Map, title: 'Skill Gap Analysis', description: 'See which skills to build to reach your target role and how to get there.' },
  { icon: MessageSquare, title: '24/7 AI Guidance', description: 'Ask anything about your job search, resume, or career and get instant, tailored advice.' },
  { icon: Briefcase, title: 'Job Application Assistant', description: 'Get help tailoring applications, writing outreach, and prioritizing the right roles.' },
  { icon: TrendingUp, title: 'Growth Recommendations', description: 'Receive data-driven suggestions to accelerate promotions and salary growth.' },
  { icon: GraduationCap, title: 'Learning Resources', description: 'Get curated courses and resources mapped to your career goals.' },
]

const steps = [
  { title: 'Share Your Goals', description: 'Tell the assistant about your background and where you want to go.' },
  { title: 'Get Your Plan', description: 'Receive a personalized roadmap with roles, skills, and milestones.' },
  { title: 'Take Action', description: 'Follow guided steps and check in anytime for fresh advice.' },
]

const benefits = [
  'Personalized career roadmap',
  'Skill gap recommendations',
  'Always-on AI guidance',
  'Free to get started',
  'Tailored job application help',
  'Built on real labor-market data',
]

const faqs = [
  { question: 'What does the Career Development Assistant do?', answer: 'It acts as your personal AI career coach — mapping career paths, identifying skill gaps, and giving you tailored guidance on your resume, applications, and growth.' },
  { question: 'Is it really personalized?', answer: 'Yes. The assistant uses your background, goals, and target roles to generate advice and roadmaps specific to your situation.' },
  { question: 'Is the career assistant free?', answer: 'You can start for free. Premium plans unlock deeper roadmaps, unlimited coaching, and advanced job application tools.' },
  { question: 'Can it help with my job applications?', answer: 'Absolutely. It helps you tailor resumes, write outreach messages, and prioritize the roles most likely to land you interviews.' },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}

export default function CareerDevelopmentAssistantPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SeoLanding
        eyebrow="Career Development Assistant"
        title="Plan your next career move with your"
        highlight="AI career coach"
        subtitle="From personalized career paths to skill recommendations and job application help, your AI Career Development Assistant guides every step — 24/7."
        primaryCta={{ label: 'Start Career Planning Free', href: '/sign-up' }}
        features={features}
        steps={steps}
        benefits={benefits}
        faqs={faqs}
        emailSource="career-development-assistant"
      />
    </>
  )
}
