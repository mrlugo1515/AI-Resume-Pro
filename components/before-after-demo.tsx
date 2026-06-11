'use client'

import { useState } from 'react'
import { ArrowRight, Check, X, Sparkles, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'

const beforeResume = {
  title: 'Senior Full-Stack Engineer',
  summary: 'Results-driven Full-Stack Engineer with 5+ years of experience building scalable web applications that drive business growth.',
  bullets: [
    'Architected and deployed 12 production web applications serving 100K+ daily users',
    'Reduced page load times by 65% through React optimization and code splitting',
    'Led cross-functional team of 6 developers, delivering projects 20% ahead of schedule',
    'Implemented CI/CD pipeline reducing deployment time from 2 hours to 15 minutes',
  ],
  views: 3,
  outcome: 'Buried in the ATS',
  outcomeDetail: 'Strong resume — but missing the keywords this specific job screens for. Recruiters never saw it.',
}

const afterResume = {
  title: 'Senior Full-Stack Engineer',
  summary: 'Results-driven Full-Stack Engineer with 5+ years of experience building scalable web applications that drive business growth.',
  bullets: [
    'Architected and deployed 12 production web applications serving 100K+ daily users',
    'Reduced page load times by 65% through React optimization and code splitting',
    'Led cross-functional team of 6 developers, delivering projects 20% ahead of schedule',
    'Implemented CI/CD pipeline reducing deployment time from 2 hours to 15 minutes',
  ],
  views: 759,
  outcome: 'Surfaced to recruiters',
  outcomeDetail: 'Tailored to match the exact keywords this job screens for — so it ranks at the top and actually gets opened.',
}

export function BeforeAfterDemo() {
  const [showAfter, setShowAfter] = useState(false)

  return (
    <section className="py-24 px-4 bg-gradient-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial opacity-30" />
      
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-zinc-300 mb-6">
            <Sparkles className="w-4 h-4 text-accent-400" />
            See the Transformation
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            The same resume. 253x more eyes on it.
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Your experience is already strong. The problem is nobody&apos;s seeing it. Watch what happens when your resume is tuned to the exact job you&apos;re applying for.
          </p>
        </div>

        {/* Toggle Button */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center bg-zinc-900 rounded-full p-1 border border-zinc-800">
            <button
              onClick={() => setShowAfter(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                !showAfter 
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                  : 'text-zinc-400 hover:text-zinc-300'
              }`}
            >
              Before
            </button>
            <button
              onClick={() => setShowAfter(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                showAfter 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'text-zinc-400 hover:text-zinc-300'
              }`}
            >
              After AI
            </button>
          </div>
        </div>

        {/* Resume Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Resume Preview */}
          <div className={`bg-white rounded-2xl p-8 shadow-2xl transition-all duration-500 ${
            showAfter ? 'ring-2 ring-green-500/50' : 'ring-2 ring-red-500/30'
          }`}>
            <div className="mb-6 pb-4 border-b border-zinc-200">
              <h3 className={`text-xl font-bold transition-colors ${
                showAfter ? 'text-zinc-900' : 'text-zinc-600'
              }`}>
                {showAfter ? afterResume.title : beforeResume.title}
              </h3>
              <p className="text-sm text-zinc-500 mt-2 leading-relaxed">
                {showAfter ? afterResume.summary : beforeResume.summary}
              </p>
            </div>
            
            <div className="space-y-3">
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Experience</p>
              {(showAfter ? afterResume.bullets : beforeResume.bullets).map((bullet, i) => (
                <div 
                  key={i} 
                  className={`flex items-start gap-3 text-sm transition-all duration-300 ${
                    showAfter ? 'text-zinc-700' : 'text-zinc-500'
                  }`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                    showAfter ? 'bg-green-500' : 'bg-zinc-300'
                  }`} />
                  {bullet}
                </div>
              ))}
            </div>
          </div>

          {/* Analysis Panel */}
          <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 flex flex-col">
            {/* Big visual outcome: recruiter views */}
            <div className={`flex flex-col items-center text-center rounded-2xl p-8 mb-6 transition-all ${
              showAfter
                ? 'bg-green-500/10 border border-green-500/20'
                : 'bg-red-500/10 border border-red-500/20'
            }`}>
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${
                showAfter ? 'bg-green-500/20' : 'bg-red-500/20'
              }`}>
                <Eye className={`w-7 h-7 ${showAfter ? 'text-green-400' : 'text-red-400'}`} />
              </div>
              <div className={`text-6xl font-bold tabular-nums transition-all ${
                showAfter ? 'text-green-400' : 'text-red-400'
              }`}>
                {showAfter ? afterResume.views : beforeResume.views}
              </div>
              <p className="text-sm text-zinc-400 mt-2">recruiters viewed this resume</p>
            </div>

            {/* Outcome label */}
            <div className="flex items-center gap-3 mb-3">
              {showAfter ? (
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-green-400" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <X className="w-5 h-5 text-red-400" />
                </div>
              )}
              <div>
                <h4 className="font-semibold text-white">
                  {showAfter ? afterResume.outcome : beforeResume.outcome}
                </h4>
              </div>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {showAfter ? afterResume.outcomeDetail : beforeResume.outcomeDetail}
            </p>

            {/* Score */}
            <div className="mt-auto pt-6 border-t border-zinc-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-zinc-400">ATS Score</span>
                <span className={`text-2xl font-bold ${
                  showAfter ? 'text-green-400' : 'text-red-400'
                }`}>
                  {showAfter ? '94%' : '42%'}
                </span>
              </div>
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-700 ${
                    showAfter ? 'bg-green-500 w-[94%]' : 'bg-red-500 w-[42%]'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-accent-500 hover:bg-accent-600 text-white px-8"
            asChild
          >
            <a href="/sign-up">
              Transform Your Resume Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
