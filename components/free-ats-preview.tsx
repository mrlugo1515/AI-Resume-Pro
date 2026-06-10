'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Sparkles, Loader2, AlertCircle, X, Lock, Check, TrendingUp,
  ArrowRight, Lightbulb, ShieldCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { trackEvent } from '@/lib/analytics'

interface PreviewResult {
  atsScore: number
  scoreSummary: string
  visibleIssues: { title: string; severity: 'high' | 'medium' | 'low' }[]
  lockedIssueCount: number
  visibleQuickWins: string[]
  lockedQuickWinCount: number
  missingKeywordCount: number
}

const severityStyles: Record<string, string> = {
  high: 'bg-red-50 text-red-700 border-red-200',
  medium: 'bg-amber-50 text-amber-700 border-amber-200',
  low: 'bg-blue-50 text-blue-700 border-blue-200',
}

export function FreeAtsPreview() {
  const [resumeText, setResumeText] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<PreviewResult | null>(null)

  const scoreColor = (s: number) =>
    s >= 80 ? 'text-green-600' : s >= 60 ? 'text-amber-500' : 'text-red-500'

  async function handleScan() {
    if (resumeText.trim().length < 80) {
      setError('Please paste a more complete resume (at least a few lines).')
      return
    }
    setError(null)
    setIsScanning(true)
    setProgress(0)
    trackEvent('free_ats_scan_started', { length: resumeText.length })

    const interval = setInterval(() => setProgress((p) => Math.min(p + 9, 90)), 400)

    try {
      const res = await fetch('/api/free-ats-preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText }),
      })
      clearInterval(interval)
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Scan failed')
      }
      const data = await res.json()
      setProgress(100)
      await new Promise((r) => setTimeout(r, 300))
      setResult(data)
      trackEvent('free_ats_scan_completed', { score: data.atsScore })
    } catch (err) {
      clearInterval(interval)
      setError(err instanceof Error ? err.message : 'Scan failed')
    } finally {
      setIsScanning(false)
    }
  }

  function reset() {
    setResult(null)
    setProgress(0)
    setError(null)
  }

  if (isScanning) {
    const msg =
      progress < 40 ? 'Reading your resume...' :
      progress < 75 ? 'Checking ATS compatibility...' :
      'Scoring and finding issues...'
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary-100 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-primary-600 animate-pulse" />
          </div>
          <h2 className="text-xl font-semibold text-text-primary mb-2">Analyzing Your Resume</h2>
          <p className="text-text-secondary mb-6">{msg}</p>
          <Progress value={progress} className="h-2 mb-4" />
          <p className="text-sm text-text-muted">{progress}% complete</p>
        </CardContent>
      </Card>
    )
  }

  if (result) {
    return (
      <div className="w-full max-w-2xl mx-auto space-y-6">
        {/* Score */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative w-32 h-32 flex-shrink-0">
                <svg className="w-32 h-32 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted" />
                  <circle
                    cx="50" cy="50" r="42" fill="none" strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={`${(result.atsScore / 100) * 264} 264`}
                    className={scoreColor(result.atsScore)} stroke="currentColor"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-3xl font-bold ${scoreColor(result.atsScore)}`}>{result.atsScore}</span>
                  <span className="text-xs text-text-muted">ATS score</span>
                </div>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-lg font-semibold text-text-primary mb-1 flex items-center gap-2 justify-center sm:justify-start">
                  <TrendingUp className="w-5 h-5 text-primary-600" />
                  Your ATS Score
                </h2>
                <p className="text-text-secondary mb-3">{result.scoreSummary}</p>
                <p className="text-sm text-text-muted">
                  Approximately <span className="font-semibold text-text-primary">{result.missingKeywordCount} expected keywords</span> may be missing.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Visible issues */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              Issues Found
            </h3>
            <div className="space-y-2">
              {result.visibleIssues.map((issue, i) => (
                <div key={i} className={`flex items-center justify-between p-3 rounded-lg border ${severityStyles[issue.severity]}`}>
                  <span className="text-sm font-medium">{issue.title}</span>
                  <span className="text-xs uppercase font-semibold tracking-wide">{issue.severity}</span>
                </div>
              ))}
            </div>

            {result.lockedIssueCount > 0 && (
              <div className="mt-3 space-y-2">
                {Array.from({ length: Math.min(result.lockedIssueCount, 3) }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/50 blur-[2px] select-none">
                    <span className="text-sm font-medium text-text-muted">Additional issue detected</span>
                    <Lock className="w-4 h-4 text-text-muted" />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick wins */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary-600" />
              Quick Wins
            </h3>
            <ul className="space-y-3">
              {result.visibleQuickWins.map((win, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-sm text-text-secondary">{win}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Upgrade CTA */}
        <Card className="border-primary-200 bg-primary-50">
          <CardContent className="pt-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary-600 flex items-center justify-center">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-text-primary mb-2">
              Unlock your full report
            </h3>
            <p className="text-text-secondary mb-5 max-w-md mx-auto">
              See all {result.lockedIssueCount + result.visibleIssues.length} issues, {result.lockedQuickWinCount + result.visibleQuickWins.length} fixes,
              a line-by-line rewrite, missing keywords, and a tailored cover letter — free when you create an account.
            </p>
            <Link href="/sign-up" onClick={() => trackEvent('free_ats_upgrade_click', { score: result.atsScore })}>
              <Button size="lg" className="bg-primary-600 hover:bg-primary-700 text-white">
                Get My Full Report Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <p className="text-xs text-text-muted mt-4 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              No credit card required
            </p>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button variant="ghost" onClick={reset}>Scan another resume</Button>
        </div>
      </div>
    )
  }

  // Input state
  return (
    <div className="w-full max-w-2xl mx-auto">
      {error && (
        <div className="flex items-center gap-3 p-4 mb-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
          <button onClick={() => setError(null)} className="ml-auto" aria-label="Dismiss error">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      <Card>
        <CardContent className="pt-6">
          <label htmlFor="resume-paste" className="block text-sm font-medium text-text-primary mb-2">
            Paste your resume
          </label>
          <Textarea
            id="resume-paste"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            rows={12}
            placeholder="Paste your full resume text here — no signup, no upload needed. We'll score it instantly."
            className="font-mono text-sm"
          />
          <div className="flex items-center justify-between mt-4">
            <span className="text-xs text-text-muted">{resumeText.trim().length} characters</span>
            <Button onClick={handleScan} className="bg-primary-600 hover:bg-primary-700 text-white">
              <Sparkles className="w-4 h-4 mr-2" />
              Scan My Resume Free
            </Button>
          </div>
        </CardContent>
      </Card>
      <p className="text-center text-xs text-text-muted mt-4 flex items-center justify-center gap-1">
        <ShieldCheck className="w-3.5 h-3.5" />
        Instant results. No account or credit card required.
      </p>
    </div>
  )
}
