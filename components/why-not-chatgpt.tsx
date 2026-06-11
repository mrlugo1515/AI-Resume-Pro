import { Check, X } from 'lucide-react'

const comparison = [
  {
    label: 'Knows what each specific ATS actually screens for',
    chatgpt: false,
    forge: true,
  },
  {
    label: 'Scores your resume against the exact job description',
    chatgpt: false,
    forge: true,
  },
  {
    label: 'Keeps formatting that survives ATS parsing',
    chatgpt: false,
    forge: true,
  },
  {
    label: 'Built only for landing interviews — not 100 other tasks',
    chatgpt: false,
    forge: true,
  },
  {
    label: 'No prompt engineering or copy-pasting required',
    chatgpt: false,
    forge: true,
  },
  {
    label: 'Exports a clean, recruiter-ready PDF in one click',
    chatgpt: false,
    forge: true,
  },
]

export function WhyNotChatGPT() {
  return (
    <section className="py-24 px-4 bg-surface">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">
            Honest Question
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4 text-balance">
            &ldquo;Can&apos;t I just do this with ChatGPT?&rdquo;
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto text-pretty">
            You can ask ChatGPT to &ldquo;improve my resume&rdquo; — but it doesn&apos;t know how
            real ATS software ranks you, and it can quietly break your formatting. We do one thing,
            and we do it for the job you&apos;re actually applying to.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
          {/* Header row */}
          <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 px-5 py-4 sm:px-8 bg-surface border-b border-border">
            <span className="text-sm font-medium text-text-muted">What you actually need</span>
            <span className="w-20 text-center text-sm font-semibold text-text-secondary">
              ChatGPT
            </span>
            <span className="w-20 text-center text-sm font-semibold text-primary-600">
              ForgeCareerAI
            </span>
          </div>

          {comparison.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[1fr_auto_auto] items-center gap-4 px-5 py-4 sm:px-8 border-b border-border last:border-0"
            >
              <span className="text-sm text-text-primary pr-2">{row.label}</span>
              <span className="w-20 flex justify-center">
                {row.chatgpt ? (
                  <Check className="w-5 h-5 text-green-600" />
                ) : (
                  <X className="w-5 h-5 text-text-muted" />
                )}
              </span>
              <span className="w-20 flex justify-center">
                <span className="w-7 h-7 rounded-full bg-primary-50 flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary-600" />
                </span>
              </span>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-text-muted mt-6 max-w-xl mx-auto">
          Think of it like the difference between a general assistant and a specialist. For the
          thing that decides your next job, you want the specialist.
        </p>
      </div>
    </section>
  )
}
