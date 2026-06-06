'use client'

import { useCallback, useState } from 'react'
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { X } from 'lucide-react'

import { startCheckoutSession } from '@/app/actions/stripe'
import { Button } from '@/components/ui/button'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface CheckoutProps {
  productId: string
  onClose?: () => void
}

export function Checkout({ productId, onClose }: CheckoutProps) {
  const fetchClientSecret = useCallback(
    async () => {
      const secret = await startCheckoutSession(productId)
      return secret ?? ''
    },
    [productId]
  )

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-auto relative">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        <div id="checkout" className="p-6">
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={{ fetchClientSecret }}
          >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      </div>
    </div>
  )
}

interface CheckoutButtonProps {
  productId: string
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'outline' | 'ghost'
}

export function CheckoutButton({ productId, children, className, variant = 'default' }: CheckoutButtonProps) {
  const [showCheckout, setShowCheckout] = useState(false)

  return (
    <>
      <Button 
        onClick={() => setShowCheckout(true)} 
        className={className}
        variant={variant}
      >
        {children}
      </Button>
      {showCheckout && (
        <Checkout 
          productId={productId} 
          onClose={() => setShowCheckout(false)} 
        />
      )}
    </>
  )
}
