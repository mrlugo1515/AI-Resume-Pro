'use client'

// Lightweight GA4 event tracking helper.
// Safe to call anywhere — no-ops if gtag isn't loaded (e.g. dev or missing ID).

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

export type AnalyticsEvent =
  | 'sign_up'
  | 'resume_upload'
  | 'premium_purchase'
  | 'contact_submit'
  | 'newsletter_signup'
  | 'cta_click'

export function trackEvent(event: AnalyticsEvent, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return
  if (typeof window.gtag === 'function') {
    window.gtag('event', event, params)
  } else {
    // Helpful during development to confirm events fire.
    console.log('[v0] analytics event:', event, params)
  }
}
