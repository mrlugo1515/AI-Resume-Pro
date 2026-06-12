'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { ResumeDocument, type ResumeTemplate } from '@/components/resume-document'

const TEMPLATE_OPTIONS: { id: ResumeTemplate; name: string; description: string }[] = [
  { id: 'classic', name: 'Classic', description: 'Serif, centered header' },
  { id: 'modern', name: 'Modern', description: 'Bold, colored section tabs' },
  { id: 'minimal', name: 'Minimal', description: 'Clean, understated spacing' },
]

export function ResumePreview({ content }: { content: string }) {
  const [template, setTemplate] = useState<ResumeTemplate>('classic')

  return (
    <div className="space-y-4">
      {/* Template switcher */}
      <div className="flex flex-wrap gap-2">
        {TEMPLATE_OPTIONS.map((opt) => {
          const active = template === opt.id
          return (
            <button
              key={opt.id}
              onClick={() => setTemplate(opt.id)}
              className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-left transition-colors ${
                active
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-border bg-surface hover:border-primary-200'
              }`}
              aria-pressed={active}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                  active ? 'border-primary-500 bg-primary-500 text-white' : 'border-zinc-300'
                }`}
              >
                {active && <Check className="h-3 w-3" />}
              </span>
              <span>
                <span className={`block text-sm font-medium ${active ? 'text-primary-700' : 'text-text-primary'}`}>
                  {opt.name}
                </span>
                <span className="block text-xs text-text-muted">{opt.description}</span>
              </span>
            </button>
          )
        })}
      </div>

      <ResumeDocument content={content} template={template} />
    </div>
  )
}
