import type { Metadata } from 'next'
import { FileText, Sparkles, Target, Zap, Shield, Download } from 'lucide-react'
import { SeoLanding } from '@/components/seo-landing'

export const metadata: Metadata = {
  title: 'AI Resume Builder — Create an ATS-Ready Resume in Minutes',
  description:
    'Build a professional, ATS-optimized resume with our free AI Resume Builder. Tailor your resume to any job description and land 3x more interviews.',
  keywords: ['AI resume builder', 'resume builder', 'AI resume writer', 'ATS resume builder', 'free resume builder'],
  alternates: { canonical: '/ai-resume-builder' },
  openGraph: {
    title: 'AI Resume Builder — Create an ATS-Ready Resume in Minutes',
    description:
      'Build a professional, ATS-optimized resume with our free AI Resume Builder. Tailor your resume to any job description and land more interviews.',
    url: '/ai-resume-builder',
  },
}

const features = [
  { icon: Sparkles, title: 'AI-Written Content', description: 'Generate powerful bullet points and summaries tailored to your experience and target role.' },
  { icon: Target, title: 'Job-Specific Tailoring', description: 'Paste any job description and the builder adapts your resume to match the exact requirements.' },
  { icon: Shield, title: 'ATS-Friendly Templates', description: 'Every template is engineered to parse cleanly through Applicant Tracking Systems.' },
  { icon: Zap, title: 'Build in Minutes', description: 'Go from blank page to polished, recruiter-ready resume in under five minutes.' },
  { icon: FileText, title: 'Multiple Formats', description: 'Export to PDF or DOCX, ready to submit to any application portal.' },
  { icon: Download, title: 'Unlimited Edits', description: 'Create a fresh, tailored version for every job you apply to — no extra work.' },
]

const steps = [
  { title: 'Add Your Details', description: 'Upload an existing resume or enter your experience and the AI does the heavy lifting.' },
  { title: 'Tailor to the Job', description: 'Paste the job description so the AI optimizes keywords, tone, and structure.' },
  { title: 'Download & Apply', description: 'Export your ATS-ready resume and start landing more interviews today.' },
]

const benefits = [
  'No design or writing skills required',
  'Keyword optimization built in',
  'Recruiter-approved formatting',
  'Free to start, no credit card',
  'Works for every industry and level',
  'Pairs with matching cover letters',
]

const faqs = [
  { question: 'Is the AI Resume Builder free?', answer: 'Yes, you can build and download a resume for free with no credit card required. Premium plans unlock advanced ATS optimization and cover letter generation.' },
  { question: 'Will my resume pass ATS systems?', answer: 'Every template is designed to be parsed cleanly by Applicant Tracking Systems, and the AI adds the relevant keywords recruiters and ATS software look for.' },
  { question: 'Can I tailor my resume to a specific job?', answer: 'Absolutely. Paste any job description and the builder rewrites and reorders your content to match that role.' },
  { question: 'What file formats can I export?', answer: 'You can export your finished resume as a PDF or DOCX file, ready to upload to any job application.' },
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

export default function AiResumeBuilderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SeoLanding
        eyebrow="AI Resume Builder"
        title="Build an ATS-ready resume with"
        highlight="AI in minutes"
        subtitle="Our AI Resume Builder writes, formats, and tailors your resume to any job description — so you stop guessing and start getting interviews."
        primaryCta={{ label: 'Build My Resume Free', href: '/sign-up' }}
        features={features}
        steps={steps}
        benefits={benefits}
        faqs={faqs}
        emailSource="ai-resume-builder"
      />
    </>
  )
}
