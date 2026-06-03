'use client'

import Link from 'next/link'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckoutButton } from '@/components/checkout'
import { RESUME_PRODUCTS, formatPrice } from '@/lib/products'

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-4 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">Pricing</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Pay per optimization. No subscriptions, no hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {RESUME_PRODUCTS.map((plan) => (
            <Card
              key={plan.id}
              className={`relative transition-all duration-300 hover:shadow-xl ${
                plan.popular 
                  ? 'ring-2 ring-primary-500 shadow-lg scale-[1.02]' 
                  : 'hover:scale-[1.01]'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                  Most Popular
                </div>
              )}
              <CardContent className="pt-8 pb-8">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-bold text-text-primary">{formatPrice(plan.priceInCents)}</span>
                    <span className="text-text-muted text-sm">one-time</span>
                  </div>
                  <p className="text-sm text-text-secondary">{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-text-secondary">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <CheckoutButton
                  productId={plan.id}
                  className={`w-full ${plan.popular ? 'bg-primary-600 hover:bg-primary-700' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  Get Started
                </CheckoutButton>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-text-muted text-sm">
            Need to hire? Check out our{' '}
            <Link href="/jobs/post" className="text-primary-600 hover:underline">
              job posting packages
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
