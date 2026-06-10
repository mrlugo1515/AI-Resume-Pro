import type { Metadata } from 'next'
import { MessageSquare, Mic, ListChecks, Lightbulb, Target, Users } from 'lucide-react'
import { SeoLanding } from '@/components/seo-landing'

export const metadata: Metadata = {
  title: 'AI Interview Preparation Tool — Practice & Land the Offer',
  description:
    'Ace your next interview with our AI Interview Preparation Tool. Practice role-specific questions, get instant feedback, and walk in with confidence.',
  keywords: ['interview preparation tool', 'AI interview prep', 'mock interview', 'interview practice', 'interview questions'],
  alternates: { canonical: '/interview-preparation-tool' },
  openGraph: {
    title: 'AI Interview Preparation Tool — Practice & Land the Offer',
    description:
      'Practice role-specific interview questions, get instant AI feedback, and walk in with confidence.',
    url: '/interview-preparation-tool',
  },
}

const features = [
  { icon: MessageSquare, title: 'Role-Specific Questions', description: 'Practice the exact questions hiring managers ask for your target role and industry.' },
  { icon: Mic, title: 'Mock Interviews', description: 'Run realistic AI-led mock interviews any time, at your own pace.' },
  { icon: Lightbulb, title: 'Instant Feedback', description: 'Get actionable feedback on your answers, structure, and clarity in real time.' },
  { icon: ListChecks, title: 'STAR Answer Coaching', description: 'Learn to structure compelling answers using the proven STAR method.' },
  { icon: Target, title: 'Job-Tailored Prep', description: 'Paste the job description and get questions tailored to that specific role.' },
  { icon: Users, title: 'Behavioral & Technical', description: 'Prepare for both behavioral and technical rounds across every discipline.' },
]

const steps = [
  { title: 'Pick Your Role', description: 'Choose your target role or paste a job description to tailor your prep.' },
  { title: 'Practice with AI', description: 'Answer realistic questions in a mock interview and get instant feedback.' },
  { title: 'Refine & Repeat', description: 'Improve your answers and practice until you feel confident and ready.' },
]

const benefits = [
  'Role-specific question banks',
  'Realistic AI mock interviews',
  'Instant, actionable feedback',
  'Free to start practicing',
  'Behavioral and technical prep',
  'Practice anytime, anywhere',
]

const faqs = [
  { question: 'How does the Interview Preparation Tool work?', answer: 'You choose a role or paste a job description, then practice realistic interview questions with an AI interviewer that gives instant feedback on your answers.' },
  { question: 'What types of interviews can I prepare for?', answer: 'You can prepare for behavioral, situational, and technical interviews across virtually every industry and experience level.' },
  { question: 'Is the interview prep tool free?', answer: 'Yes, you can start practicing for free. Premium unlocks unlimited mock interviews and advanced feedback.' },
  { question: 'Will it help with specific job descriptions?', answer: 'Yes. Paste any job description and the tool generates questions tailored to that exact role so your practice is highly relevant.' },
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

export default function InterviewPreparationToolPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SeoLanding
        eyebrow="Interview Preparation Tool"
        title="Practice smarter and land the offer with"
        highlight="AI interview prep"
        subtitle="Practice role-specific questions, run realistic mock interviews, and get instant AI feedback so you walk into every interview confident and prepared."
        primaryCta={{ label: 'Start Practicing Free', href: '/sign-up' }}
        features={features}
        steps={steps}
        benefits={benefits}
        faqs={faqs}
        emailSource="interview-preparation-tool"
      />
    </>
  )
}
