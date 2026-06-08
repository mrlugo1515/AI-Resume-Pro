import type { Metadata } from 'next'
import { Search, Shield, Target, BarChart3, CheckCircle2, AlertTriangle } from 'lucide-react'
import { SeoLanding } from '@/components/seo-landing'

export const metadata: Metadata = {
  title: 'Free ATS Resume Checker — Test Your Resume Against Any Job',
  description:
    'Run your resume through our free ATS Resume Checker. Instantly see your match score, missing keywords, and formatting issues before you apply.',
  keywords: ['ATS resume checker', 'ATS checker', 'resume scanner', 'ATS resume test', 'resume keyword checker'],
  alternates: { canonical: '/ats-resume-checker' },
  openGraph: {
    title: 'Free ATS Resume Checker — Test Your Resume Against Any Job',
    description:
      'Instantly see your ATS match score, missing keywords, and formatting issues before you apply.',
    url: '/ats-resume-checker',
  },
}

const features = [
  { icon: BarChart3, title: 'Instant Match Score', description: 'See exactly how well your resume matches a job description on a 0–100 scale.' },
  { icon: Search, title: 'Missing Keyword Detection', description: 'Identify the critical skills and keywords your resume is missing for each role.' },
  { icon: Shield, title: 'Formatting Analysis', description: 'Catch parsing issues, unsupported fonts, and layout problems that confuse ATS software.' },
  { icon: Target, title: 'Role-Specific Insights', description: 'Get tailored recommendations based on the exact job you are targeting.' },
  { icon: CheckCircle2, title: 'Actionable Fixes', description: 'Receive clear, prioritized suggestions you can apply in minutes.' },
  { icon: AlertTriangle, title: 'Red-Flag Warnings', description: 'Spot the mistakes that get resumes auto-rejected before a human ever sees them.' },
]

const steps = [
  { title: 'Upload Your Resume', description: 'Drop in your PDF, DOCX, or paste your resume text.' },
  { title: 'Paste the Job Description', description: 'Add the role you are applying for so we can compare them.' },
  { title: 'Get Your Score & Fixes', description: 'See your ATS match score and a prioritized list of improvements.' },
]

const benefits = [
  'Know your score before you apply',
  'Find missing keywords instantly',
  'Avoid auto-rejection mistakes',
  'Free instant analysis',
  'Compare against any job',
  'Improve and re-scan unlimited times',
]

const faqs = [
  { question: 'What is an ATS Resume Checker?', answer: 'An ATS Resume Checker simulates how Applicant Tracking Systems read your resume, then scores how well it matches a job description and flags any issues that could get it filtered out.' },
  { question: 'How accurate is the match score?', answer: 'Our checker analyzes keywords, skills, and formatting the same way modern ATS platforms do, giving you a reliable estimate of how your resume will perform.' },
  { question: 'Is the ATS checker free?', answer: 'Yes, you can run a free scan and see your match score and key recommendations. Premium unlocks deeper analysis and one-click optimization.' },
  { question: 'Will it tell me what to fix?', answer: 'Yes. You get a prioritized list of missing keywords, formatting warnings, and concrete suggestions to raise your score.' },
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

export default function AtsResumeCheckerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SeoLanding
        eyebrow="ATS Resume Checker"
        title="Test your resume against any job with our"
        highlight="free ATS checker"
        subtitle="Upload your resume and a job description to instantly see your match score, missing keywords, and the exact fixes that get you past the filters."
        primaryCta={{ label: 'Check My Resume Free', href: '/sign-up' }}
        secondaryCta={{ label: 'Try the Match Scanner', href: '/dashboard/match-scan' }}
        features={features}
        steps={steps}
        benefits={benefits}
        faqs={faqs}
        emailSource="ats-resume-checker"
      />
    </>
  )
}
