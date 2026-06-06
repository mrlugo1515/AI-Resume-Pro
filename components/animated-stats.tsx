'use client'

import { FileText, Users, TrendingUp, Star } from 'lucide-react'
import { AnimatedCounter } from './animated-counter'

const stats = [
  { 
    value: 50000, 
    suffix: '+',
    label: 'Resumes Optimized', 
    description: 'and counting',
    icon: FileText 
  },
  { 
    value: 85, 
    suffix: '%',
    label: 'Interview Rate', 
    description: 'average increase',
    icon: TrendingUp 
  },
  { 
    value: 15000, 
    suffix: '+',
    label: 'Happy Users', 
    description: 'worldwide',
    icon: Users 
  },
  { 
    value: 4.9, 
    suffix: '/5',
    label: 'User Rating', 
    description: 'based on reviews',
    icon: Star 
  },
]

export function AnimatedStats() {
  return (
    <div className="relative max-w-6xl mx-auto mt-20 mb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-800">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div 
              key={stat.label} 
              className="bg-zinc-900/80 p-6 text-center animate-fade-in-up group hover:bg-zinc-900 transition-colors"
              style={{ animationDelay: `${0.4 + i * 0.1}s` }}
            >
              <div className="flex justify-center mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary-600/20 flex items-center justify-center group-hover:bg-primary-600/30 transition-colors">
                  <Icon className="w-5 h-5 text-primary-400" />
                </div>
              </div>
              <p className="text-3xl sm:text-4xl font-bold text-white mb-1">
                {stat.value % 1 !== 0 ? (
                  <>{stat.value}{stat.suffix}</>
                ) : (
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                )}
              </p>
              <p className="text-sm font-medium text-zinc-300">{stat.label}</p>
              <p className="text-xs text-zinc-500">{stat.description}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
