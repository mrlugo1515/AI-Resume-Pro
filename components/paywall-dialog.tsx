'use client'

import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Checkout } from '@/components/checkout'
import { useState, useCallback } from 'react'
import { getProductById, formatPrice } from '@/lib/products'
import { Sparkles, Check, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

const UPGRADE_PRODUCT_ID = 'pro'

interface PaywallDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Message describing which limit was hit. */
  message?: string
}

export function PaywallDialog({ open, onOpenChange, message }: PaywallDialogProps) {
  const router = useRouter()
  const [showCheckout, setShowCheckout] = useState(false)
  const product = getProductById(UPGRADE_PRODUCT_ID)

  const handleSuccess = useCallback(() => {
    setShowCheckout(false)
    onOpenChange(false)
    // Refresh so server components pick up the new Pro entitlement.
    router.refresh()
  }, [onOpenChange, router])

  const benefits = [
    'Unlimited resume optimizations',
    'Unlimited job match scans',
    'Unlimited AI cover letters',
    'ATS score analysis on every resume',
    'Priority AI processing',
  ]

  return (
    <>
      <Dialog open={open && !showCheckout} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mb-2">
              <Sparkles className="w-6 h-6 text-primary-600" />
            </div>
            <DialogTitle className="text-xl">Upgrade to Pro</DialogTitle>
            <DialogDescription className="text-pretty">
              {message ??
                'You have reached the limit of the free plan. Upgrade for unlimited access.'}
            </DialogDescription>
          </DialogHeader>

          <ul className="space-y-2.5 my-2">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm text-text-secondary">
                <Check className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="flex items-baseline gap-1.5 mb-2">
            <span className="text-3xl font-bold text-text-primary">
              {product ? formatPrice(product.priceInCents) : '$29'}
            </span>
            <span className="text-sm text-text-muted">one-time</span>
          </div>

          <Button onClick={() => setShowCheckout(true)} className="w-full gap-2" size="lg">
            <Zap className="w-4 h-4" />
            Upgrade Now
          </Button>
          <button
            onClick={() => onOpenChange(false)}
            className="text-sm text-text-muted hover:text-text-secondary transition-colors mt-1"
          >
            Maybe later
          </button>
        </DialogContent>
      </Dialog>

      {showCheckout && (
        <Checkout
          productId={UPGRADE_PRODUCT_ID}
          onClose={() => setShowCheckout(false)}
          onSuccess={handleSuccess}
        />
      )}
    </>
  )
}
