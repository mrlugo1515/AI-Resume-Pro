'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, Check, Upload, FileText, Briefcase, Sparkles, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DashboardHeader } from '@/components/dashboard-header'

const STEPS = [
  { id: 1, label: 'Resume', icon: FileText },
  { id: 2, label: 'Job Description', icon: Briefcase },
  { id: 3, label: 'Tier', icon: Sparkles },
  { id: 4, label: 'Results', icon: Check },
]

const TIERS = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'Grammar fixes, spelling corrections, and formatting improvements.',
    features: ['Grammar & spelling', 'Formatting', 'Basic proofreading'],
    color: 'border-gray-200 hover:border-gray-300',
  },
  {
    id: 'keyword',
    name: 'Keyword Optimization',
    description: 'ATS-optimized with relevant keywords from the job description.',
    features: ['Everything in Basic', 'Keyword insertion', 'ATS optimization'],
    color: 'border-primary-200 hover:border-primary-400',
    recommended: true,
  },
  {
    id: 'rewrite',
    name: 'Full Rewrite',
    description: 'Complete resume transformation tailored to the target role.',
    features: ['Everything in Keyword', 'Full rewrite', 'Achievement optimization'],
    color: 'border-accent-200 hover:border-accent-400',
  },
]

export default function NewResumePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [resumeText, setResumeText] = useState('')
  const [resumeTitle, setResumeTitle] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [selectedTier, setSelectedTier] = useState('keyword')
  const [loading, setLoading] = useState(false)
  const [processingStep, setProcessingStep] = useState('analyzing')
  const [optimizedResume, setOptimizedResume] = useState('')
  const [error, setError] = useState('')
  const [showCoverLetter, setShowCoverLetter] = useState(false)
  const [coverLetter, setCoverLetter] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [generatingCL, setGeneratingCL] = useState(false)

  const canProceed = () => {
    if (step === 1) return resumeText.trim().length > 0 && resumeTitle.trim().length > 0
    if (step === 2) return jobDescription.trim().length > 0
    if (step === 3) return !!selectedTier
    return true
  }

  const handleNext = () => {
    if (step === 3) {
      handleOptimize()
    } else {
      setStep((s) => s + 1)
    }
  }

  const handleOptimize = async () => {
    setLoading(true)
    setError('')
    setProcessingStep('analyzing')

    const progressInterval = setInterval(() => {
      setProcessingStep((prev) => {
        if (prev === 'analyzing') return 'parsing'
        if (prev === 'parsing') return 'optimizing'
        if (prev === 'optimizing') return 'finalizing'
        return prev
      })
    }, 2500)

    try {
      const response = await fetch('/api/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText,
          jobDescription,
          tier: selectedTier,
          title: resumeTitle,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to optimize resume')
      }

      const data = await response.json()
      clearInterval(progressInterval)
      setOptimizedResume(data.optimizedResume)
      setStep(4)
    } catch (err) {
      clearInterval(progressInterval)
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateCoverLetter = async () => {
    if (!resumeText || !companyName) return
    setGeneratingCL(true)
    setError('')

    try {
      const response = await fetch('/api/cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText,
          jobDescription,
          companyName,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to generate cover letter')
      }

      const data = await response.json()
      setCoverLetter(data.coverLetter)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate cover letter')
    } finally {
      setGeneratingCL(false)
    }
  }

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const processingSteps = [
    { id: 'analyzing', label: 'Analyzing resume structure...' },
    { id: 'parsing', label: 'Parsing job requirements...' },
    { id: 'optimizing', label: 'Optimizing content...' },
    { id: 'finalizing', label: 'Finalizing results...' },
  ]

  return (
    <div className="min-h-screen bg-surface">
      <DashboardHeader />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <button
          onClick={() => step > 1 ? setStep((s) => s - 1) : router.push('/dashboard')}
          className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {step > 1 ? 'Back' : 'Back to Dashboard'}
        </button>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center flex-1">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                      s.id < step
                        ? 'bg-primary-600 text-white'
                        : s.id === step
                        ? 'bg-primary-600 text-white ring-4 ring-primary-100'
                        : 'bg-surface-alt text-text-muted'
                    }`}
                  >
                    {s.id < step ? <Check className="w-4 h-4" /> : s.id}
                  </div>
                  <span
                    className={`text-sm font-medium hidden sm:inline ${
                      s.id === step ? 'text-text-primary' : s.id < step ? 'text-primary-600' : 'text-text-muted'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-3 ${
                      s.id < step ? 'bg-primary-600' : 'bg-border'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
            <button onClick={() => setError('')} className="ml-2 text-red-500 hover:text-red-700 underline">
              Dismiss
            </button>
          </div>
        )}

        {/* Step content */}
        <Card>
          <CardContent className="pt-6">
            {/* Step 1: Resume Upload */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-text-primary mb-2">Upload Your Resume</h2>
                  <p className="text-text-secondary">Paste your resume content below or type it out.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Resume Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Software Engineer - Google"
                      value={resumeTitle}
                      onChange={(e) => setResumeTitle(e.target.value)}
                    />
                    <p className="text-xs text-text-muted">Give your resume a descriptive name for easy reference.</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="resume">Resume Content</Label>
                    <Textarea
                      id="resume"
                      placeholder="Paste your resume text here..."
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                      className="min-h-[300px] font-mono text-sm"
                    />
                    <p className="text-xs text-text-muted">
                      {resumeText.length} characters
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Job Description */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-text-primary mb-2">Add Job Description</h2>
                  <p className="text-text-secondary">Paste the job description to optimize your resume for this role.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jobDescription">Job Description</Label>
                  <Textarea
                    id="jobDescription"
                    placeholder="Paste the job description here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="min-h-[300px] font-mono text-sm"
                  />
                  <p className="text-xs text-text-muted">
                    {jobDescription.length} characters
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Tier Selection */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-text-primary mb-2">Choose Optimization Level</h2>
                  <p className="text-text-secondary">Select how much you want us to optimize your resume.</p>
                </div>

                <div className="grid gap-4">
                  {TIERS.map((tier) => (
                    <button
                      key={tier.id}
                      onClick={() => setSelectedTier(tier.id)}
                      className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                        selectedTier === tier.id
                          ? 'border-primary-500 bg-primary-50/50'
                          : tier.color
                      }`}
                    >
                      {tier.recommended && (
                        <span className="absolute -top-2.5 right-4 bg-primary-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                          Recommended
                        </span>
                      )}
                      <div className="flex items-start gap-4">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          selectedTier === tier.id ? 'border-primary-600 bg-primary-600' : 'border-gray-300'
                        }`}>
                          {selectedTier === tier.id && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-text-primary">{tier.name}</h3>
                          <p className="text-sm text-text-secondary mt-1">{tier.description}</p>
                          <ul className="mt-3 space-y-1">
                            {tier.features.map((feature) => (
                              <li key={feature} className="text-xs text-text-muted flex items-center gap-2">
                                <Check className="w-3 h-3 text-primary-500" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Results or Processing */}
            {step === 4 && !optimizedResume && loading && (
              <div className="py-12 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary-100 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
                </div>
                <h2 className="text-xl font-semibold text-text-primary mb-4">Optimizing Your Resume</h2>
                <div className="max-w-xs mx-auto space-y-3">
                  {processingSteps.map((ps, i) => {
                    const stepIndex = processingSteps.findIndex(s => s.id === processingStep)
                    const isActive = ps.id === processingStep
                    const isDone = i < stepIndex

                    return (
                      <div
                        key={ps.id}
                        className={`flex items-center gap-3 text-sm ${
                          isActive ? 'text-primary-600 font-medium' : isDone ? 'text-green-600' : 'text-text-muted'
                        }`}
                      >
                        {isDone ? (
                          <Check className="w-4 h-4" />
                        ) : isActive ? (
                          <div className="w-4 h-4 rounded-full border-2 border-primary-600 border-t-transparent animate-spin" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-gray-200" />
                        )}
                        {ps.label}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {step === 4 && optimizedResume && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-text-primary mb-2">Your Optimized Resume</h2>
                  <p className="text-text-secondary">Review your optimized resume below.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Optimized Content</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopyToClipboard(optimizedResume)}
                    >
                      Copy to Clipboard
                    </Button>
                  </div>
                  <Textarea
                    value={optimizedResume}
                    readOnly
                    className="min-h-[400px] font-mono text-sm bg-muted"
                  />
                </div>

                {/* Cover Letter Section */}
                <div className="border-t border-border pt-6">
                  <button
                    onClick={() => setShowCoverLetter(!showCoverLetter)}
                    className="flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    <ArrowRight className={`w-4 h-4 transition-transform ${showCoverLetter ? 'rotate-90' : ''}`} />
                    {showCoverLetter ? 'Hide Cover Letter Generator' : 'Generate a Cover Letter'}
                  </button>

                  {showCoverLetter && (
                    <div className="mt-4 space-y-4 animate-fade-in-up">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input
                          id="companyName"
                          placeholder="e.g., Google"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                        />
                      </div>
                      <Button
                        onClick={handleGenerateCoverLetter}
                        disabled={!companyName || generatingCL}
                      >
                        {generatingCL && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        {generatingCL ? 'Generating...' : 'Generate Cover Letter'}
                      </Button>

                      {coverLetter && (
                        <div className="space-y-2 mt-4">
                          <div className="flex items-center justify-between">
                            <Label>Generated Cover Letter</Label>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCopyToClipboard(coverLetter)}
                            >
                              Copy to Clipboard
                            </Button>
                          </div>
                          <Textarea
                            value={coverLetter}
                            readOnly
                            className="min-h-[300px] font-mono text-sm bg-muted"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setStep(1)
                      setResumeText('')
                      setResumeTitle('')
                      setJobDescription('')
                      setOptimizedResume('')
                      setCoverLetter('')
                      setCompanyName('')
                    }}
                  >
                    Create Another Resume
                  </Button>
                  <Button onClick={() => router.push('/dashboard')}>
                    Back to Dashboard
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation buttons for steps 1-3 */}
        {step < 4 && (
          <div className="mt-6 flex justify-end">
            <Button
              onClick={handleNext}
              disabled={!canProceed() || loading}
              size="lg"
            >
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {step === 3 ? (
                loading ? 'Optimizing...' : 'Optimize Resume'
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
