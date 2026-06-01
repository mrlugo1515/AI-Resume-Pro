'use client'

import { useState } from 'react'
import { ChevronDown, Plus, Minus } from 'lucide-react'

const faqs = [
  {
    question: 'How does ForgeCareerAI optimize my resume?',
    answer: 'Our AI analyzes your resume against the specific job description you provide. It identifies missing keywords, improves phrasing for ATS compatibility, quantifies achievements, and restructures content to highlight your most relevant experience. The result is a tailored resume that both ATS systems and hiring managers love.',
  },
  {
    question: 'What is an ATS and why does it matter?',
    answer: 'ATS (Applicant Tracking System) is software that companies use to filter resumes before a human sees them. Up to 75% of resumes are rejected by ATS before reaching a recruiter. Our AI ensures your resume uses the right keywords, formatting, and structure to pass these systems.',
  },
  {
    question: 'How long does the optimization process take?',
    answer: 'Most resumes are optimized in under 2 minutes. Simply upload your current resume, paste the job description, and our AI does the rest. You can review, make edits, and download your optimized resume immediately.',
  },
  {
    question: 'Can I use ForgeCareerAI for multiple job applications?',
    answer: 'Absolutely! In fact, we recommend it. Each job posting has different requirements, so tailoring your resume for each application significantly increases your chances. Our Professional plan includes unlimited resume optimizations.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes, security is our top priority. All data is encrypted in transit and at rest. We never share your personal information or resume content with third parties. You can delete your data at any time from your account settings.',
  },
  {
    question: 'What file formats do you support?',
    answer: 'We support PDF, DOCX, DOC, and plain text formats for upload. You can download your optimized resume in PDF or DOCX format, ready to submit to employers.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'Yes, we offer a 7-day money-back guarantee. If you are not satisfied with our service for any reason, contact support within 7 days of your purchase for a full refund.',
  },
  {
    question: 'Can the AI write my resume from scratch?',
    answer: 'Our Career Pro plan includes full resume rewriting capabilities. You provide your work history and the AI creates a professionally written resume optimized for your target role. However, we recommend starting with an existing resume for best results.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-24 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-text-secondary">
            Everything you need to know about ForgeCareerAI.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-border rounded-xl overflow-hidden bg-surface transition-all hover:border-primary-200"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-medium text-text-primary pr-4">{faq.question}</span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  openIndex === index ? 'bg-primary-100 text-primary-600' : 'bg-zinc-100 text-zinc-500'
                }`}>
                  {openIndex === index ? (
                    <Minus className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <p className="px-5 pb-5 text-text-secondary leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center p-8 bg-surface rounded-2xl border border-border">
          <p className="text-text-primary font-medium mb-2">Still have questions?</p>
          <p className="text-text-secondary text-sm mb-4">
            Can&apos;t find the answer you&apos;re looking for? Reach out to our support team.
          </p>
          <a 
            href="mailto:support@forgecareerai.com"
            className="text-primary-600 font-medium hover:text-primary-700 transition-colors"
          >
            Contact Support →
          </a>
        </div>
      </div>
    </section>
  )
}
