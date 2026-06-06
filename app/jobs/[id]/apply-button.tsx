'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { applyToJob } from '@/app/actions/jobs'
import { CheckCircle2, Loader2 } from 'lucide-react'

export function ApplyButton({ jobId }: { jobId: number }) {
  const [isPending, startTransition] = useTransition()
  const [applied, setApplied] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleApply = () => {
    startTransition(async () => {
      try {
        await applyToJob(jobId)
        setApplied(true)
      } catch (err) {
        if (err instanceof Error) {
          if (err.message === 'Unauthorized') {
            window.location.href = '/sign-in'
          } else {
            setError(err.message)
          }
        }
      }
    })
  }

  if (applied) {
    return (
      <Button disabled className="gap-2 bg-green-500 hover:bg-green-500 cursor-default">
        <CheckCircle2 className="w-4 h-4" />
        Application Submitted
      </Button>
    )
  }

  return (
    <div>
      <Button 
        onClick={handleApply} 
        disabled={isPending}
        className="w-full gap-2 bg-primary-500 hover:bg-primary-600"
      >
        {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
        {isPending ? 'Applying...' : 'Quick Apply'}
      </Button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  )
}
