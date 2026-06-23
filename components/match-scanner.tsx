'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { useDropzone } from 'react-dropzone'
import {
  Upload, FileText, Sparkles, Check, Loader2, X, ArrowLeft,
  AlertCircle, Clipboard, File, Target, Copy, TrendingUp,
  CheckCircle2, Tag, Lightbulb, Mail, RotateCcw,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { PaywallDialog } from '@/components/paywall-dialog'

interface UploadedFile {
  pathname: string
  filename: string
  size: number
  type: string
}

interface Improvement {
  title: string
  description: string
}

interface MatchResult {
  matchScore: number
  matchSummary: string
  scoreBreakdown: { skills: number; experience: number; keywords: number }
  matchedSkills: string[]
  missingSkills: string[]
  resumeImprovements: Improvement[]
  coverLetter: string
}

export function MatchScanner() {
  const [resumeContent, setResumeContent] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isParsing, setIsParsing] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [inputMode, setInputMode] = useState<'upload' | 'paste'>('upload')
  const [result, setResult] = useState<MatchResult | null>(null)
  const [copied, setCopied] = useState(false)
  const [showPaywall, setShowPaywall] = useState(false)
  const [paywallMessage, setPaywallMessage] = useState<string | undefined>(undefined)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setError(null)
    setIsUploading(true)
    setProgress(10)

    try {
      const formData = new FormData()
      formData.append('file', file)

      setProgress(30)
      const uploadRes = await fetch('/api/upload-resume', {
        method: 'POST',
        body: formData,
      })

      if (!uploadRes.ok) {
        const data = await uploadRes.json()
        throw new Error(data.error || 'Upload failed')
      }

      const uploadData = await uploadRes.json()
      setUploadedFile(uploadData)
      setProgress(50)

      setIsParsing(true)
      setProgress(70)

      const parseRes = await fetch('/api/parse-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pathname: uploadData.pathname,
          fileType: uploadData.type,
        }),
      })

      if (!parseRes.ok) {
        const data = await parseRes.json()
        throw new Error(data.error || 'Failed to parse resume')
      }

      const parseData = await parseRes.json()
      setResumeContent(parseData.text)
      setProgress(100)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsUploading(false)
      setIsParsing(false)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
      'text/plain': ['.txt'],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
  })

  const handlePasteResume = async () => {
    try {
      const text = await navigator.clipboard.readText()
      if (text) {
        setResumeContent(text)
        setError(null)
      }
    } catch {
      setError('Unable to paste from clipboard. Please paste manually.')
    }
  }

  const handleScan = async () => {
    if (!resumeContent.trim()) {
      setError('Please add your resume first')
      return
    }
    if (!jobDescription.trim()) {
      setError('Please paste the job description')
      return
    }

    setIsScanning(true)
    setError(null)
    setProgress(0)

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 8, 90))
    }, 500)

    try {
      const res = await fetch('/api/match-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText: resumeContent, jobDescription }),
      })

      clearInterval(progressInterval)

      if (res.status === 402) {
        const data = await res.json()
        setIsScanning(false)
        setProgress(0)
        setPaywallMessage(data.message || 'Upgrade to Pro for unlimited match scans.')
        setShowPaywall(true)
        return
      }

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Scan failed')
      }

      const data = await res.json()
      setProgress(100)
      await new Promise((r) => setTimeout(r, 400))
      setResult(data)
    } catch (err) {
      clearInterval(progressInterval)
      setError(err instanceof Error ? err.message : 'Scan failed')
    } finally {
      setIsScanning(false)
    }
  }

  const handleReset = () => {
    setResult(null)
    setProgress(0)
    setError(null)
  }

  const copyCoverLetter = async () => {
    if (!result?.coverLetter) return
    await navigator.clipboard.writeText(result.coverLetter)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clearFile = () => {
    setUploadedFile(null)
    setResumeContent('')
    setProgress(0)
    setError(null)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const scoreColor = (score: number) =>
    score >= 80 ? 'text-green-600' : score >= 60 ? 'text-amber-500' : 'text-red-500'
  const scoreBg = (score: number) =>
    score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-amber-500' : 'bg-red-500'

  // Scanning state
  if (isScanning) {
    const statusMessage =
      progress < 30
        ? 'Reading your resume and the job description...'
        : progress < 60
          ? 'Comparing skills and experience...'
          : progress < 90
            ? 'Scoring the match and finding gaps...'
            : 'Writing your tailored cover letter...'
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-8 pb-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary-100 flex items-center justify-center">
              <Target className="w-8 h-8 text-primary-600 animate-pulse" />
            </div>
            <h2 className="text-xl font-semibold text-text-primary mb-2">Scanning Your Match</h2>
            <p className="text-text-secondary mb-6">{statusMessage}</p>
            <Progress value={progress} className="h-2 mb-4" />
            <p className="text-sm text-text-muted">{progress}% complete</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Results state
  if (result) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-text-primary">Your Match Report</h1>
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            New Scan
          </Button>
        </div>

        {/* Match Score */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative w-32 h-32 flex-shrink-0">
                <svg className="w-32 h-32 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted" />
                  <circle
                    cx="50" cy="50" r="42" fill="none" strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={`${(result.matchScore / 100) * 264} 264`}
                    className={scoreColor(result.matchScore)}
                    stroke="currentColor"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-3xl font-bold ${scoreColor(result.matchScore)}`}>{result.matchScore}</span>
                  <span className="text-xs text-text-muted">match</span>
                </div>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-lg font-semibold text-text-primary mb-1 flex items-center gap-2 justify-center sm:justify-start">
                  <TrendingUp className="w-5 h-5 text-primary-600" />
                  Overall Match
                </h2>
                <p className="text-text-secondary mb-4">{result.matchSummary}</p>
                <div className="grid grid-cols-3 gap-3">
                  {([
                    ['Skills', result.scoreBreakdown.skills],
                    ['Experience', result.scoreBreakdown.experience],
                    ['Keywords', result.scoreBreakdown.keywords],
                  ] as const).map(([label, val]) => (
                    <div key={label}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-text-muted">{label}</span>
                        <span className="text-xs font-medium text-text-primary">{val}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                        <div className={`h-full rounded-full ${scoreBg(val)}`} style={{ width: `${val}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Skills You Match ({result.matchedSkills.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {result.matchedSkills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {result.matchedSkills.map((s, i) => (
                    <span key={i} className="px-2.5 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-text-muted">No strong skill matches found.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Tag className="w-5 h-5 text-amber-500" />
                Missing Skills ({result.missingSkills.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {result.missingSkills.length > 0 ? (
                <>
                  <div className="flex flex-wrap gap-2">
                    {result.missingSkills.map((s, i) => (
                      <span key={i} className="px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-text-muted mt-3">Add these to your resume if they genuinely reflect your experience.</p>
                </>
              ) : (
                <p className="text-sm text-text-muted">Great news — no major skill gaps detected!</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Resume Improvements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Lightbulb className="w-5 h-5 text-primary-600" />
              Resume Improvements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {result.resumeImprovements.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-primary-600" />
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

        {/* Cover Letter */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base">
                <Mail className="w-5 h-5 text-accent-600" />
                Tailored Cover Letter
              </CardTitle>
              <Button variant="outline" size="sm" onClick={copyCoverLetter}>
                {copied ? <Check className="w-4 h-4 mr-1.5" /> : <Copy className="w-4 h-4 mr-1.5" />}
                {copied ? 'Copied' : 'Copy'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-surface border border-border rounded-lg p-4 whitespace-pre-wrap text-sm text-text-primary leading-relaxed">
              {result.coverLetter}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Input state
  return (
    <div className="space-y-6">
      <PaywallDialog
        open={showPaywall}
        onOpenChange={setShowPaywall}
        message={paywallMessage}
      />
      <div>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text-primary transition-colors mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
          <Target className="w-6 h-6 text-primary-600" />
          Job Match Scanner
        </h1>
        <p className="text-text-secondary mt-1">
          Upload your resume and paste a job description to get your match score, missing skills, resume improvements, and a tailored cover letter.
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
          <button onClick={() => setError(null)} className="ml-auto">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Step 1: Resume */}
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-lg font-semibold text-text-primary mb-1">1. Your Resume</h2>
          <p className="text-text-secondary mb-4 text-sm">Upload a file or paste your resume text.</p>

          <div className="flex gap-2 mb-6">
            <Button variant={inputMode === 'upload' ? 'default' : 'outline'} size="sm" onClick={() => setInputMode('upload')} className="flex-1">
              <Upload className="w-4 h-4 mr-2" />
              Upload File
            </Button>
            <Button variant={inputMode === 'paste' ? 'default' : 'outline'} size="sm" onClick={() => setInputMode('paste')} className="flex-1">
              <Clipboard className="w-4 h-4 mr-2" />
              Paste Text
            </Button>
          </div>

          {inputMode === 'upload' ? (
            <>
              {!uploadedFile ? (
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                    isDragActive ? 'border-primary-500 bg-primary-50' : 'border-border hover:border-primary-300 hover:bg-accent-50'
                  }`}
                >
                  <input {...getInputProps()} />
                  {isUploading || isParsing ? (
                    <div className="space-y-4">
                      <Loader2 className="w-12 h-12 mx-auto text-primary-600 animate-spin" />
                      <div>
                        <p className="font-medium text-text-primary">{isParsing ? 'Extracting content...' : 'Uploading...'}</p>
                        <Progress value={progress} className="h-1 mt-3 max-w-xs mx-auto" />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center">
                        <Upload className="w-8 h-8 text-primary-600" />
                      </div>
                      <p className="text-lg font-medium text-text-primary mb-1">
                        {isDragActive ? 'Drop your resume here' : 'Drag & drop your resume'}
                      </p>
                      <p className="text-text-secondary mb-4">or click to browse files</p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {['PDF', 'DOCX', 'DOC', 'TXT'].map((t) => (
                          <span key={t} className="px-3 py-1 bg-muted rounded-full text-xs text-text-muted">{t}</span>
                        ))}
                      </div>
                      <p className="text-xs text-text-muted mt-3">Maximum file size: 10MB</p>
                    </>
                  )}
                </div>
              ) : (
                <div className="border rounded-xl p-4 bg-green-50 border-green-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                      <File className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-text-primary truncate">{uploadedFile.filename}</p>
                      <p className="text-sm text-text-secondary">{formatFileSize(uploadedFile.size)}</p>
                      <div className="flex items-center gap-1 mt-1 text-green-600">
                        <Check className="w-4 h-4" />
                        <span className="text-sm">Content extracted</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={clearFile}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {resumeContent && (
                <div className="mt-6">
                  <label className="block text-sm font-medium text-text-primary mb-2">Extracted Content</label>
                  <Textarea value={resumeContent} onChange={(e) => setResumeContent(e.target.value)} rows={6} className="font-mono text-sm" />
                </div>
              )}
            </>
          ) : (
            <div className="space-y-4">
              <Button variant="outline" size="sm" onClick={handlePasteResume} className="flex-shrink-0">
                <Clipboard className="w-4 h-4 mr-2" />
                Paste from Clipboard
              </Button>
              <Textarea
                value={resumeContent}
                onChange={(e) => setResumeContent(e.target.value)}
                rows={10}
                placeholder="Paste your resume content here..."
                className="font-mono text-sm"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Step 2: Job Description */}
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-lg font-semibold text-text-primary mb-1">2. Job Description</h2>
          <p className="text-text-secondary mb-4 text-sm">Paste the full job posting you want to match against.</p>
          <Textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={8}
            placeholder="Paste the job description here..."
          />
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button size="lg" onClick={handleScan} disabled={!resumeContent.trim() || !jobDescription.trim()}>
          <Sparkles className="w-5 h-5 mr-2" />
          Scan My Match
        </Button>
      </div>

      {/* Feature highlights */}
      <div className="grid sm:grid-cols-4 gap-4 pt-2">
        {[
          { icon: Target, label: 'Match Score', desc: 'See how you stack up', bg: 'bg-primary-100', color: 'text-primary-600' },
          { icon: Tag, label: 'Missing Skills', desc: 'Close the gaps', bg: 'bg-amber-100', color: 'text-amber-600' },
          { icon: Lightbulb, label: 'Improvements', desc: 'Actionable tips', bg: 'bg-primary-100', color: 'text-primary-600' },
          { icon: Mail, label: 'Cover Letter', desc: 'Tailored & ready', bg: 'bg-green-100', color: 'text-green-600' },
        ].map((f) => (
          <div key={f.label} className="flex items-start gap-3 p-4 rounded-lg bg-surface border border-border">
            <div className={`w-10 h-10 rounded-lg ${f.bg} flex items-center justify-center flex-shrink-0`}>
              <f.icon className={`w-5 h-5 ${f.color}`} />
            </div>
            <div>
              <p className="font-medium text-text-primary text-sm">{f.label}</p>
              <p className="text-xs text-text-muted">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
