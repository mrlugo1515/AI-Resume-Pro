import 'server-only'

import Stripe from 'stripe'

// Lazily construct the Stripe client. Constructing eagerly at module scope
// throws ("Neither apiKey nor config.authenticator provided") whenever
// STRIPE_SECRET_KEY is absent — including during Next.js build-time page-data
// collection — which would break the production build. Deferring construction
// until first use keeps imports side-effect free.
let _stripe: Stripe | null = null

function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY is not set')
    }
    _stripe = new Stripe(key)
  }
  return _stripe
}

// Proxy preserves the existing `stripe.x.y()` call sites while initialization
// happens on first property access rather than at import time.
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop, receiver) {
    const client = getStripe()
    const value = Reflect.get(client, prop, receiver)
    return typeof value === 'function' ? value.bind(client) : value
  },
})
