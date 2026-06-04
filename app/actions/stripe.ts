'use server'

import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { ALL_PRODUCTS } from '@/lib/products'

export async function startCheckoutSession(productId: string) {
  const product = ALL_PRODUCTS.find((p) => p.id === productId)
  if (!product) {
    throw new Error(`Product with id "${productId}" not found`)
  }

  const params: Stripe.Checkout.SessionCreateParams = {
    ui_mode: 'embedded',
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
    },
  }

  const session = await stripe.checkout.sessions.create(params)

  return session.client_secret
}

export async function getCheckoutSessionStatus(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId)
  
  return {
    status: session.status,
    customerEmail: session.customer_details?.email,
    paymentStatus: session.payment_status,
  }
}
