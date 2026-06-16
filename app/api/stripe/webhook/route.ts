import { type NextRequest, NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { grantPro } from '@/lib/entitlements'

// Stripe webhook for production reliability. Set STRIPE_WEBHOOK_SECRET in your
// project env and point a Stripe webhook at /api/stripe/webhook listening for
// the "checkout.session.completed" event.
export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: 'Webhook is not configured' },
      { status: 400 }
    )
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('[v0] Stripe webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const userId = session.metadata?.userId
    if (userId && session.payment_status === 'paid') {
      await grantPro(userId, {
        stripeCustomerId:
          typeof session.customer === 'string' ? session.customer : undefined,
        productId: session.metadata?.productId,
      })
    }
  }

  return NextResponse.json({ received: true })
}
