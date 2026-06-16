'use server'

import Stripe from 'stripe'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'
import { ALL_PRODUCTS } from '@/lib/products'
import { auth } from '@/lib/auth'
import { grantPro } from '@/lib/entitlements'

export async function startCheckoutSession(productId: string) {
  const product = ALL_PRODUCTS.find((p) => p.id === productId)
  if (!product) {
    throw new Error(`Product with id "${productId}" not found`)
  }

  const session = await auth.api.getSession({ headers: await headers() })
  const userId = session?.user?.id ?? ''

  const params: Stripe.Checkout.SessionCreateParams = {
    ui_mode: 'embedded' as Stripe.Checkout.SessionCreateParams.UiMode,
    redirect_on_completion: 'never',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            description: product.description,
          },
          unit_amount: product.priceInCents,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    metadata: {
      productId: product.id,
      userId,
    },
  }

  const session = await stripe.checkout.sessions.create(params)

  return session.client_secret
}

export async function getCheckoutSessionStatus(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId)

  // Grant Pro access as soon as Stripe confirms payment. This is the reliable
  // path in environments without a public webhook URL (e.g. previews). The
  // webhook performs the same grant in production for resilience.
  if (session.payment_status === 'paid') {
    const userId = session.metadata?.userId
    if (userId) {
      await grantPro(userId, {
        stripeCustomerId:
          typeof session.customer === 'string' ? session.customer : undefined,
        productId: session.metadata?.productId,
      })
    }
  }

  return {
    status: session.status,
    customerEmail: session.customer_details?.email,
    paymentStatus: session.payment_status,
  }
}
