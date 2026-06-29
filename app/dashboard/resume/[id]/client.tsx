'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Copy, Check, Download, FileText, Sparkles, Target, Clock, ChevronDown, ChevronUp, Loader2, CheckCircle2, Tag, AlertCircle, Wand2, Eye, FileDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ResumePreview } from '@/components/resume-preview'
import { ResumeDocument, type ResumeTemplate } from '@/components/resume-document'
import { ResumeEditor } from '@/components/resume-editor'
import { PaywallDialog } from '@/components/paywall-dialog'

interface ResumeData {
  id: number
  title: string
  originalContent: string
  optimizedContent: string | null
  jobDescription: string | null
  atsScore: number | null
  improvements: string | null
  keywordsMatched: string | null
  tier: string
  status: string
  createdAt: Date
}

interface Improvement {
  title: string
  description: string
}

export function ResumeDetailClient({ resume }: { resume: ResumeData }) {
  const [mode, setMode] = useState<'view' | 'edit'>('view')
  const [template, setTemplate] = useState<ResumeTemplate>('classic')
  const [copied, setCopied] = useState(false)
  const [showOriginal, setShowOriginal] = useState(false)
  const [showRawText, setShowRawText] = useState(false)
  const [showCoverLetter, setShowCoverLetter] = useState(false)
  const [companyName, setCompanyName] = useState('')
  const [coverLetter, setCoverLetter] = useState('')
  const [generatingCL, setGeneratingCL] = useState(false)
  const [clError, setClError] = useState('')
  const [showPaywall, setShowPaywall] = useState(false)
  const [paywallMessage, setPaywallMessage] = useState<string | undefined>(undefined)

  // Parse structured feedback safely
  let improvements: Improvement[] = []
  try {
    if (resume.improvements) improvements = JSON.parse(resume.improvements)
  } catch {
    improvements = []
  }

  let matchedKeywords: string[] = []
  let missingKeywords: string[] = []
  try {
    if (resume.keywordsMatched) {
      const parsed = JSON.parse(resume.keywordsMatched)
      matchedKeywords = parsed.matched || []
      missingKeywords = parsed.missing || []
    }
  } catch {
    matchedKeywords = []
  }

  // Strip markdown markers so copied/downloaded text reads cleanly
  const toPlainText = (text: string) =>
    text
      .replace(/^\s*#{1,6}\s+/gm, '')
      .replace(/^\s*([-*_]\s?){3,}\s*$/gm, '')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/^[\t ]*[-*+]\s+/gm, '• ')

  const handleCopy = async () => {
    if (resume.optimizedContent) {
      await navigator.clipboard.writeText(toPlainText(resume.optimizedContent))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDownloadText = () => {
    if (resume.optimizedContent) {
      const blob = new Blob([toPlainText(resume.optimizedContent)], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${resume.title.replace(/[^a-z0-9]/gi, '_')}_optimized.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  // Export a crisp, selectable PDF via the browser's native print engine.
  // The hidden #resume-print-area renders the resume in the selected template,
  // and globals.css print rules hide everything else so only it lands on the page.
  const handleDownloadPdf = () => {
    if (!resume.optimizedContent) return
    const previousTitle = document.title
    // The print/PDF dialog uses document.title as the default filename.
    document.title = `${resume.title.replace(/[^\w\s-]/g, '').trim() || 'Resume'} — Optimized Resume`
    const restore = () => {
      document.title = previousTitle
      window.removeEventListener('afterprint', restore)
    }
    window.addEventListener('afterprint', restore)
    window.print()
    // Fallback in case afterprint doesn't fire (some browsers/iframes)
    setTimeout(restore, 1000)
  }

  const handleGenerateCoverLetter = async () => {
    if (!companyName.trim()) return
    
    setGeneratingCL(true)
    setClError('')

    try {
      const response = await fetch('/api/cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText: resume.optimizedContent || resume.originalContent,
          jobDescription: resume.jobDescription || '',
          companyName,
        }),
      })

      if (response.status === 402) {
        const data = await response.json()
        setPaywallMessage(data.message || 'Upgrade to Pro for unlimited cover letters.')
        setShowPaywall(true)
        return
      }

      if (!response.ok) {
        throw new Error('Failed to generate cover letter')
      }

      const data = await response.json()
      setCoverLetter(data.coverLetter)
    } catch {
      setClError('Failed to generate cover letter. Please try again.')
    } finally {
      setGeneratingCL(false)
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date(date))
  }

  return (
    <div className="space-y-6">
      <PaywallDialog
        open={showPaywall}
        onOpenChange={setShowPaywall}
        message={paywallMessage}
      />
      {/* Print-only region. Hidden on screen; globals.css print rules reveal
          only this element so "Download PDF" produces a clean, template-matched
          document with crisp, selectable text. */}
      {resume.optimizedContent && (
        <div id="resume-print-area" className="hidden print:block">
          <ResumeDocument content={resume.optimizedContent} template={template} />
        </div>
      )}
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link 
            href="/dashboard" 
            className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-text-primary">{resume.title}</h1>
          <div className="flex items-center gap-4 mt-2 text-sm text-text-secondary">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {formatDate(resume.createdAt)}
            </span>
            <span className="capitalize px-2 py-0.5 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
              {resume.tier}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex rounded-lg border border-border overflow-hidden">
            <button
              onClick={() => setMode('view')}
              className={`px-3 py-1.5 text-sm font-medium flex items-center gap-1.5 transition-colors ${
                mode === 'view' ? 'bg-primary-500 text-white' : 'bg-surface text-text-secondary hover:text-text-primary'
              }`}
            >
              <Eye className="w-4 h-4" />
              View
            </button>
            <button
              onClick={() => setMode('edit')}
              className={`px-3 py-1.5 text-sm font-medium flex items-center gap-1.5 transition-colors ${
                mode === 'edit' ? 'bg-primary-500 text-white' : 'bg-surface text-text-secondary hover:text-text-primary'
              }`}
            >
              <Wand2 className="w-4 h-4" />
              Edit
            </button>
          </div>
          <Button variant="outline" size="sm" onClick={handleCopy}>
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? 'Copied!' : 'Copy'}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default" size="sm" disabled={!resume.optimizedContent}>
                <Download className="w-4 h-4 mr-2" />
                Download
                <ChevronDown className="w-4 h-4 ml-1.5 opacity-80" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={handleDownloadPdf} className="cursor-pointer">
                <FileDown className="w-4 h-4 mr-2 text-primary-600" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Download PDF</span>
                  <span className="text-xs text-text-muted">Print-ready, matches your template</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDownloadText} className="cursor-pointer">
                <FileText className="w-4 h-4 mr-2 text-text-muted" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Plain text (.txt)</span>
                  <span className="text-xs text-text-muted">For copy-paste into forms</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {mode === 'edit' ? (
        <ResumeEditor
          resumeId={resume.id}
          initialContent={resume.optimizedContent || resume.originalContent}
          jobDescription={resume.jobDescription}
          initialAtsScore={resume.atsScore}
          initialImprovements={improvements}
          initialMatched={matchedKeywords}
          initialMissing={missingKeywords}
        />
      ) : (
      <>
      {/* Stats Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                <Target className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">ATS Score</p>
                <p className="text-2xl font-bold text-text-primary">{resume.atsScore || 0}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center">
                <FileText className="w-5 h-5 text-accent-600" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Characters</p>
                <p className="text-2xl font-bold text-text-primary">
                  {(resume.optimizedContent?.length || 0).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Status</p>
                <p className="text-2xl font-bold text-text-primary capitalize">{resume.status}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* What the AI Improved */}
      {improvements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              What We Improved
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

      {/* Keyword Analysis */}
      {(matchedKeywords.length > 0 || missingKeywords.length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-primary-600" />
              Keyword Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {matchedKeywords.length > 0 && (
              <div>
                <p className="text-sm font-medium text-text-primary mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  Keywords Included ({matchedKeywords.length})
                </p>
                <div className="flex flex-wrap gap-2">
                  {matchedKeywords.map((kw, i) => (
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
            {missingKeywords.length > 0 && (
              <div>
                <p className="text-sm font-medium text-text-primary mb-2 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  Consider Adding ({missingKeywords.length})
                </p>
                <div className="flex flex-wrap gap-2">
                  {missingKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-medium"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-text-muted mt-2">
                  Only add these if they genuinely reflect your experience.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Optimized Resume */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary-600" />
              Optimized Resume
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowRawText(!showRawText)}
              className="text-text-secondary"
            >
              {showRawText ? 'Document view' : 'Plain text'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {resume.optimizedContent ? (
            showRawText ? (
              <Textarea
                value={resume.optimizedContent}
                readOnly
                className="min-h-[400px] font-mono text-sm bg-muted"
              />
            ) : (
              <ResumePreview
                content={resume.optimizedContent}
                template={template}
                onTemplateChange={setTemplate}
              />
            )
          ) : (
            <p className="text-sm text-text-secondary py-8 text-center">
              No optimized content available yet.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Original Resume (Collapsible) */}
      <Card>
        <CardHeader>
          <button
            onClick={() => setShowOriginal(!showOriginal)}
            className="flex items-center justify-between w-full text-left"
          >
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-text-muted" />
              Original Resume
            </CardTitle>
            {showOriginal ? (
              <ChevronUp className="w-5 h-5 text-text-muted" />
            ) : (
              <ChevronDown className="w-5 h-5 text-text-muted" />
            )}
          </button>
        </CardHeader>
        {showOriginal && (
          <CardContent>
            <Textarea
              value={resume.originalContent}
              readOnly
              className="min-h-[300px] font-mono text-sm bg-muted"
            />
          </CardContent>
        )}
      </Card>

      {/* Job Description (if provided) */}
      {resume.jobDescription && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-text-muted" />
              Target Job Description
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={resume.jobDescription}
              readOnly
              className="min-h-[200px] font-mono text-sm bg-muted"
            />
          </CardContent>
        </Card>
      )}

      {/* Cover Letter Generator */}
      <Card>
        <CardHeader>
          <button
            onClick={() => setShowCoverLetter(!showCoverLetter)}
            className="flex items-center justify-between w-full text-left"
          >
            <CardTitle>Generate Cover Letter</CardTitle>
            {showCoverLetter ? (
              <ChevronUp className="w-5 h-5 text-text-muted" />
            ) : (
              <ChevronDown className="w-5 h-5 text-text-muted" />
            )}
          </button>
        </CardHeader>
        {showCoverLetter && (
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g., Google, Microsoft, Amazon"
              />
            </div>
            
            <Button 
              onClick={handleGenerateCoverLetter}
              disabled={!companyName.trim() || generatingCL}
            >
              {generatingCL ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Cover Letter
                </>
              )}
            </Button>

            {clError && (
              <p className="text-sm text-red-600">{clError}</p>
            )}

            {coverLetter && (
              <div className="space-y-2 mt-4">
                <div className="flex items-center justify-between">
                  <Label>Generated Cover Letter</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigator.clipboard.writeText(coverLetter)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={coverLetter}
                  readOnly
                  className="min-h-[300px] font-mono text-sm bg-muted"
                />
              </div>
            )}
          </CardContent>
        )}
      </Card>

      </>
      )}

      {/* Actions */}
      <div className="flex gap-4">
        <Link href="/dashboard/new">
          <Button variant="outline">
            Create Another Resume
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button>
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}
