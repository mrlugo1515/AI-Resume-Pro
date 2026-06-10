'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check, Loader2 } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { subscribeEmail } from '@/app/actions/newsletter'

export function EmailCapture({
  source = 'unknown',
  heading = 'Get Career Tips in Your Inbox',
  subheading = 'Join 10,000+ professionals receiving weekly job search strategies and career advice.',
  dark = true,
}: {
  source?: string
  heading?: string
  subheading?: string
  dark?: boolean
}) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!valid) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setLoading(true)
    const result = await subscribeEmail(email, source)
    setLoading(false)
    if (!result.success) {
      setError(result.error || 'Something went wrong. Please try again.')
      return
    }
    setSubmitted(true)
    trackEvent('newsletter_signup', { source })
  }

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h2 className={`text-2xl font-bold mb-4 ${dark ? 'text-white' : 'text-text-primary'}`}>
        {heading}
      </h2>
      <p className={`mb-8 ${dark ? 'text-zinc-400' : 'text-text-secondary'}`}>{subheading}</p>

      {submitted ? (
        <div className="flex items-center justify-center gap-2 text-green-500 font-medium" role="status">
          <Check className="w-5 h-5" />
          You&apos;re on the list! Check your inbox to confirm.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" noValidate>
          <label htmlFor={`email-${source}`} className="sr-only">
            Email address
          </label>
          <input
            id={`email-${source}`}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            aria-invalid={!!error}
            className={`flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              dark
                ? 'bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500'
                : 'bg-white border border-border text-text-primary placeholder-text-muted'
            }`}
          />
          <Button type="submit" disabled={loading} className="bg-accent-500 hover:bg-accent-600 text-white px-6">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Subscribe'}
          </Button>
        </form>
      )}
      {error && <p className="text-sm text-red-400 mt-3">{error}</p>}
      <p className={`text-xs mt-4 ${dark ? 'text-zinc-500' : 'text-text-muted'}`}>
        No spam. Unsubscribe anytime.
      </p>
    </div>
  )
}
