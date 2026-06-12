'use client'

import { Sparkles } from 'lucide-react'

function colorFor(score: number) {
  if (score >= 80) return { ring: 'text-green-500', bg: 'bg-green-50', text: 'text-green-700', track: 'text-green-100' }
  if (score >= 60) return { ring: 'text-primary-500', bg: 'bg-primary-50', text: 'text-primary-700', track: 'text-primary-100' }
  if (score >= 40) return { ring: 'text-amber-500', bg: 'bg-amber-50', text: 'text-amber-700', track: 'text-amber-100' }
  return { ring: 'text-zinc-400', bg: 'bg-zinc-50', text: 'text-zinc-600', track: 'text-zinc-100' }
}

export function MatchRing({ score, size = 56 }: { score: number; size?: number }) {
  const c = colorFor(score)
  const stroke = 5
  const r = (size - stroke) / 2
  const circumference = 2 * Math.PI * r
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} className={c.track} stroke="currentColor" fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={stroke}
          className={c.ring}
          stroke="currentColor"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`font-bold leading-none ${c.text}`} style={{ fontSize: size * 0.28 }}>
          {score}
        </span>
        <span className={`leading-none ${c.text}`} style={{ fontSize: size * 0.16 }}>
          match
        </span>
      </div>
    </div>
  )
}

export function MatchBadge({ score }: { score: number }) {
  const c = colorFor(score)
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${c.bg} ${c.text}`}>
      <Sparkles className="w-3 h-3" />
      {score}% match
    </span>
  )
}
