'use client'

import { useState, useTransition } from 'react'
import { Bookmark } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { saveJob, unsaveJob } from '@/app/actions/jobs'

interface SaveJobButtonProps {
  jobId: number
  initialSaved?: boolean
  variant?: 'icon' | 'full'
}

export function SaveJobButton({ jobId, initialSaved = false, variant = 'icon' }: SaveJobButtonProps) {
  const [isSaved, setIsSaved] = useState(initialSaved)
  const [isPending, startTransition] = useTransition()

  const handleToggle = () => {
    startTransition(async () => {
      try {
        if (isSaved) {
          await unsaveJob(jobId)
          setIsSaved(false)
        } else {
          await saveJob(jobId)
          setIsSaved(true)
        }
      } catch {
        // User not logged in or error - redirect to sign in
        window.location.href = '/sign-in'
      }
    })
  }

  if (variant === 'full') {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          handleToggle()
        }}
        disabled={isPending}
        className={isSaved ? 'bg-amber-50 border-amber-200 text-amber-700' : ''}
      >
        <Bookmark className={`w-4 h-4 mr-1 ${isSaved ? 'fill-current' : ''}`} />
        {isSaved ? 'Saved' : 'Save'}
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        handleToggle()
      }}
      disabled={isPending}
      className={`h-8 w-8 ${isSaved ? 'text-amber-500 hover:text-amber-600' : 'text-text-muted hover:text-text-primary'}`}
    >
      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
    </Button>
  )
}
