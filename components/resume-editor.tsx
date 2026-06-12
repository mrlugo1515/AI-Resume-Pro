'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ResumeDocument } from '@/components/resume-document'
import { updateResume } from '@/app/actions/resume'
import {
  Sparkles,
  Loader2,
  Save,
  Check,
  Wand2,
  RefreshCw,
  Target,
  CheckCircle2,
  AlertCircle,
  X,
} from 'lucide-react'

interface Improvement {
  title: string
  description: string
}

interface ResumeEditorProps {
  resumeId: number
  initialContent: string
  jobDescription: string | null
  initialAtsScore: number | null
  initialImprovements: Improvement[]
  initialMatched: string[]
  initialMissing: string[]
}

function scoreColor(score: number) {
  if (score >= 80) return 'text-green-600'
  if (score >= 60) return 'text-primary-600'
  if (score >= 40) return 'text-amber-600'
  return 'text-red-600'
}

export function ResumeEditor({
  resumeId,
  initialContent,
  jobDescription,
  initialAtsScore,
  initialImprovements,
  initialMatched,
  initialMissing,
}: ResumeEditorProps) {
  const [content, setContent] = useState(initialContent)
  const [savedContent, setSavedContent] = useState(initialContent)
  const [atsScore, setAtsScore] = useState<number | null>(initialAtsScore)
  const [improvements, setImprovements] = useState<Improvement[]>(initialImprovements)
  const [matched, setMatched] = useState<string[]>(initialMatched)
  const [missing, setMissing] = useState<string[]>(initialMissing)

  const [analyzing, setAnalyzing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  // Inline rewrite state
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [selection, setSelection] = useState<{ start: number; end: number; text: string } | null>(null)
  const [rewriting, setRewriting] = useState(false)
  const [rewriteResult, setRewriteResult] = useState<{ rewritten: string; variants: string[] } | null>(null)

  const dirty = content !== savedContent

  useEffect(() => {
    setSaved(false)
  }, [content])

  const captureSelection = () => {
    const el = textareaRef.current
    if (!el) return
    const start = el.selectionStart
    const end = el.selectionEnd
    const text = content.slice(start, end).trim()
    if (text.length >= 3) {
      setSelection({ start, end, text })
      setRewriteResult(null)
    } else {
      setSelection(null)
    }
  }

  const handleAnalyze = async () => {
    setAnalyzing(true)
    setError('')
    try {
      const res = await fetch('/api/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, jobDescription: jobDescription || undefined }),
      })
      if (!res.ok) throw new Error('Analysis failed')
      const data = await res.json()
      setAtsScore(data.atsScore)
      setImprovements(data.improvements || [])
      setMatched(data.keywordsMatched || [])
      setMissing(data.missingKeywords || [])
    } catch {
      setError('Could not analyze the resume. Please try again.')
    } finally {
      setAnalyzing(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')
    try {
      await updateResume(resumeId, {
        optimizedContent: content,
        atsScore: atsScore ?? undefined,
        improvements: JSON.stringify(improvements),
        keywordsMatched: JSON.stringify({ matched, missing }),
        status: 'completed',
      })
      setSavedContent(content)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch {
      setError('Could not save your changes. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const runRewrite = async (mode: string) => {
    if (!selection) return
    setRewriting(true)
    setError('')
    setRewriteResult(null)
    try {
      const res = await fetch('/api/rewrite-snippet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: selection.text, mode, jobDescription: jobDescription || undefined }),
      })
      if (!res.ok) throw new Error('Rewrite failed')
      const data = await res.json()
      setRewriteResult({ rewritten: data.rewritten, variants: data.variants || [] })
    } catch {
      setError('Could not rewrite the selected text. Please try again.')
    } finally {
      setRewriting(false)
    }
  }

  const applyRewrite = (replacement: string) => {
    if (!selection) return
    const next = content.slice(0, selection.start) + replacement + content.slice(selection.end)
    setContent(next)
    setSelection(null)
    setRewriteResult(null)
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
          <button onClick={() => setError('')} className="ml-auto" aria-label="Dismiss">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Live score + actions bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-muted flex flex-col items-center justify-center">
                <span className={`text-xl font-bold leading-none ${scoreColor(atsScore ?? 0)}`}>
                  {atsScore ?? '--'}
                </span>
                <span className="text-[10px] text-text-secondary">ATS</span>
              </div>
              <div>
                <p className="font-semibold text-text-primary">Live ATS Score</p>
                <p className="text-sm text-text-secondary">
                  {dirty ? 'You have unsaved edits — rescore to refresh.' : 'Edit your resume, then rescore.'}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleAnalyze} disabled={analyzing}>
                {analyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Scoring...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Rescore
                  </>
                )}
              </Button>
              <Button onClick={handleSave} disabled={saving || (!dirty && !saved)}>
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : saved ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Saved
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Editor + Live preview */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Wand2 className="w-4 h-4 text-primary-600" />
              Editor
            </CardTitle>
            <p className="text-sm text-text-secondary">
              Select any text, then use AI to rewrite it.
            </p>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col gap-4">
            <Textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onSelect={captureSelection}
              className="min-h-[480px] font-mono text-sm flex-1"
            />

            {/* Inline AI rewrite toolbar */}
            {selection && (
              <div className="rounded-lg border border-primary-200 bg-primary-50 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-primary-600" />
                  <p className="text-sm font-medium text-text-primary">
                    Improve selected text
                  </p>
                  <button
                    onClick={() => {
                      setSelection(null)
                      setRewriteResult(null)
                    }}
                    className="ml-auto text-text-secondary"
                    aria-label="Cancel"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-text-secondary italic mb-3 line-clamp-2">
                  &ldquo;{selection.text}&rdquo;
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={() => runRewrite('bullet')} disabled={rewriting}>
                    Strengthen bullet
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => runRewrite('concise')} disabled={rewriting}>
                    Make concise
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => runRewrite('keywords')} disabled={rewriting}>
                    Add keywords
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => runRewrite('summary')} disabled={rewriting}>
                    Polish summary
                  </Button>
                </div>

                {rewriting && (
                  <div className="flex items-center gap-2 mt-3 text-sm text-text-secondary">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Rewriting...
                  </div>
                )}

                {rewriteResult && (
                  <div className="mt-4 space-y-2">
                    {[rewriteResult.rewritten, ...rewriteResult.variants].map((variant, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 p-3 rounded-lg bg-surface border border-border"
                      >
                        <p className="text-sm text-text-primary flex-1">{variant}</p>
                        <Button size="sm" variant="ghost" onClick={() => applyRewrite(variant)}>
                          <Check className="w-4 h-4 mr-1" />
                          Use
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Live preview */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="w-4 h-4 text-primary-600" />
              Live Preview
            </CardTitle>
            <p className="text-sm text-text-secondary">Exactly how recruiters will see it.</p>
          </CardHeader>
          <CardContent className="flex-1">
            <ResumeDocument content={content} />
          </CardContent>
        </Card>
      </div>

      {/* Suggestions + keywords */}
      <div className="grid md:grid-cols-2 gap-6">
        {improvements.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {improvements.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary text-sm">{item.title}</p>
                      <p className="text-sm text-text-secondary">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {(matched.length > 0 || missing.length > 0) && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Target className="w-5 h-5 text-primary-600" />
                Keywords
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {matched.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-text-primary mb-2">Included ({matched.length})</p>
                  <div className="flex flex-wrap gap-2">
                    {matched.map((kw, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs font-medium"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {missing.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-text-primary mb-2">Consider adding ({missing.length})</p>
                  <div className="flex flex-wrap gap-2">
                    {missing.map((kw, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-medium"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
