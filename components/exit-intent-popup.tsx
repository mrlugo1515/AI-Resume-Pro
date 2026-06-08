'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { X, Sparkles, Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { trackEvent } from '@/lib/analytics'
import { subscribeEmail } from '@/app/actions/newsletter'

const SESSION_KEY = 'exit_intent_shown'

export function ExitIntentPopup() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Only once per session. Skip the authenticated app surface.
    if (typeof window === 'undefined') return
    if (pathname?.startsWith('/dashboard')) return
    if (sessionStorage.getItem(SESSION_KEY)) return

    let triggered = false
    const trigger = () => {
      if (triggered) return
      triggered = true
      sessionStorage.setItem(SESSION_KEY, '1')
      setOpen(true)
      trackEvent('exit_intent_shown')
    }

    // Desktop: cursor leaves toward the top of the viewport.
    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && !e.relatedTarget) trigger()
    }

    // Delay arming so it doesn't fire on initial load.
    const armTimer = setTimeout(() => {
      document.addEventListener('mouseout', onMouseOut)
    }, 4000)

    return () => {
      clearTimeout(armTimer)
      document.removeEventListener('mouseout', onMouseOut)
    }
  }, [pathname])

  if (!open) return null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setLoading(true)
    const result = await subscribeEmail(email, 'exit-intent')
    setLoading(false)
    if (!result.success) {
      setError(result.error || 'Something went wrong. Please try again.')
      return
    }
    setSubmitted(true)
    trackEvent('newsletter_signup', { source: 'exit-intent' })
  }

  function close() {
    setOpen(false)
    trackEvent('exit_intent_dismissed')
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
      onClick={close}
    >
      <div
        className="relative w-full max-w-md bg-background rounded-2xl border border-border shadow-2xl p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="w-7 h-7 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-text-primary mb-2">You&apos;re in!</h2>
            <p className="text-text-secondary">
              Check your inbox for your free ATS resume checklist.
            </p>
          </div>
        ) : (
          <>
            <div className="w-12 h-12 mb-5 rounded-full bg-primary-100 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary-600" />
            </div>
            <h2 id="exit-intent-title" className="text-2xl font-bold text-text-primary mb-2 text-balance">
              Wait — grab your free ATS checklist
            </h2>
            <p className="text-text-secondary mb-6">
              Before you go, get our 12-point checklist for beating Applicant Tracking Systems and landing more interviews. Free, instant.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3" noValidate>
              <label htmlFor="exit-email" className="sr-only">Email address</label>
              <input
                id="exit-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                aria-invalid={!!error}
                className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Button type="submit" disabled={loading} className="w-full bg-primary-600 hover:bg-primary-700 text-white h-11">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send Me the Free Checklist'}
              </Button>
            </form>
            {error && <p className="text-sm text-red-500 mt-3">{error}</p>}
            <button
              onClick={close}
              className="w-full text-center text-xs text-text-muted mt-4 hover:text-text-secondary transition-colors"
            >
              No thanks, I&apos;ll pass
            </button>
          </>
        )}
      </div>
    </div>
  )
}
