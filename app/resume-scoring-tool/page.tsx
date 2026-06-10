import type { Metadata } from 'next'
import { Gauge, BarChart3, ListChecks, TrendingUp, Sparkles, Award } from 'lucide-react'
import { SeoLanding } from '@/components/seo-landing'

export const metadata: Metadata = {
  title: 'Resume Scoring Tool — Get Your Resume Score Instantly',
  description:
    'Score your resume in seconds with our free AI Resume Scoring Tool. Get a detailed breakdown of strengths, weaknesses, and how to improve your score.',
  keywords: ['resume scoring tool', 'resume score', 'resume grader', 'resume rating', 'resume analysis tool'],
  alternates: { canonical: '/resume-scoring-tool' },
  openGraph: {
    title: 'Resume Scoring Tool — Get Your Resume Score Instantly',
    description:
      'Get a detailed breakdown of your resume strengths, weaknesses, and how to improve your score.',
    url: '/resume-scoring-tool',
  },
}

const features = [
  { icon: Gauge, title: 'Overall Resume Score', description: 'Get a clear 0–100 score that tells you exactly where your resume stands.' },
  { icon: BarChart3, title: 'Category Breakdown', description: 'See how you score on impact, clarity, keywords, formatting, and more.' },
  { icon: ListChecks, title: 'Prioritized Improvements', description: 'A ranked checklist of changes that will raise your score the fastest.' },
  { icon: Sparkles, title: 'AI Rewrite Suggestions', description: 'Get AI-generated improvements for weak bullet points and summaries.' },
  { icon: TrendingUp, title: 'Track Your Progress', description: 'Re-score after edits and watch your resume improve in real time.' },
  { icon: Award, title: 'Benchmark Against Top Resumes', description: 'See how your resume compares to high-performing candidates in your field.' },
]

const steps = [
  { title: 'Upload Your Resume', description: 'Add your current resume in PDF, DOCX, or plain text.' },
  { title: 'Get Your Score', description: 'Our AI grades your resume across key categories in seconds.' },
  { title: 'Apply the Fixes', description: 'Follow the prioritized suggestions and re-score to track improvement.' },
]

const benefits = [
  'Instant 0–100 resume score',
  'Detailed category breakdown',
  'Clear, prioritized fixes',
  'Free to score your resume',
  'AI-powered rewrite ideas',
  'Re-score as many times as you like',
]

const faqs = [
  { question: 'How is my resume score calculated?', answer: 'Our AI evaluates your resume across categories like impact, clarity, keyword relevance, and ATS formatting, then combines them into a single 0–100 score.' },
  { question: 'What is a good resume score?', answer: 'Most strong resumes score 80 or above. Our tool shows you exactly which areas are holding you back and how to improve them.' },
  { question: 'Is the resume scoring tool free?', answer: 'Yes, you can score your resume for free and see your breakdown. Premium unlocks AI rewrites and unlimited re-scoring.' },
  { question: 'Can I improve my score?', answer: 'Definitely. You get a prioritized list of improvements, and you can re-score after each edit to see your progress.' },
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

export default function ResumeScoringToolPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SeoLanding
        eyebrow="Resume Scoring Tool"
        title="Get your resume score in seconds with"
        highlight="AI analysis"
        subtitle="Our free Resume Scoring Tool grades your resume across the categories that matter and shows you exactly how to boost your score."
        primaryCta={{ label: 'Score My Resume Free', href: '/sign-up' }}
        features={features}
        steps={steps}
        benefits={benefits}
        faqs={faqs}
        emailSource="resume-scoring-tool"
      />
    </>
  )
}
