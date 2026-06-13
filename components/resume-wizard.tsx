'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useRouter } from 'next/navigation'
import { Upload, FileText, Sparkles, Check, ChevronRight, Loader2, X, Zap, ArrowLeft, AlertCircle, Clipboard, File } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'

type Step = 'upload' | 'job' | 'processing' | 'complete'

interface UploadedFile {
  pathname: string
  filename: string
  size: number
  type: string
}

export function ResumeWizard({
  prefillJobDescription = '',
  prefillTitle = '',
}: {
  prefillJobDescription?: string
  prefillTitle?: string
}) {
  const router = useRouter()
  const [step, setStep] = useState<Step>('upload')
  const [resumeTitle, setResumeTitle] = useState(prefillTitle)
  const [resumeContent, setResumeContent] = useState('')
  const [jobDescription, setJobDescription] = useState(prefillJobDescription)
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isParsing, setIsParsing] = useState(false)
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [inputMode, setInputMode] = useState<'upload' | 'paste'>('upload')

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setError(null)
    setIsUploading(true)
    setProgress(10)

    try {
      // Upload the file
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

      // Auto-generate title from filename
      const title = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')
      setResumeTitle(title)

      // Parse the file to extract text
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
    maxSize: 10 * 1024 * 1024, // 10MB
  })

  const handlePaste = async () => {
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

  const handleOptimize = async () => {
    if (!resumeContent.trim()) {
      setError('Please add your resume content first')
      return
    }

    setIsOptimizing(true)
    setStep('processing')
    setProgress(0)

    try {
      // Simulate progress for demo
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90))
      }, 500)

      const res = await fetch('/api/optimize-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: resumeTitle || 'My Resume',
          content: resumeContent,
          jobDescription: jobDescription || undefined,
        }),
      })

      clearInterval(progressInterval)

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Optimization failed')
      }

      const data = await res.json()
      setProgress(100)
      
      // Short delay to show completion
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Redirect to the resume detail page
      router.push(`/dashboard/resume/${data.id}`)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Optimization failed')
      setStep('upload')
    } finally {
      setIsOptimizing(false)
    }
  }

  const clearFile = () => {
    setUploadedFile(null)
    setResumeContent('')
    setResumeTitle('')
    setProgress(0)
    setError(null)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  if (step === 'processing') {
    const statusMessage =
      progress < 30
        ? 'Analyzing your resume structure...'
        : progress < 60
          ? 'Matching keywords and strengthening achievements...'
          : progress < 90
            ? 'Optimizing for ATS compatibility...'
            : 'Finalizing your optimized resume...'

    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-8 pb-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary-100 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary-600 animate-pulse" />
            </div>
            <h2 className="text-xl font-semibold text-text-primary mb-2">
              Optimizing Your Resume
            </h2>
            <p className="text-text-secondary mb-6">
              {statusMessage}
            </p>
            <Progress value={progress} className="h-2 mb-4" />
            <p className="text-sm text-text-muted">{progress}% complete</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className={`flex items-center gap-2 ${step === 'upload' ? 'text-primary-600' : 'text-text-muted'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            resumeContent ? 'bg-green-500 text-white' : step === 'upload' ? 'bg-primary-600 text-white' : 'bg-muted text-text-muted'
          }`}>
            {resumeContent ? <Check className="w-4 h-4" /> : '1'}
          </div>
          <span className="text-sm font-medium hidden sm:inline">Upload Resume</span>
        </div>
        <ChevronRight className="w-4 h-4 text-text-muted" />
        <div className={`flex items-center gap-2 ${step === 'job' ? 'text-primary-600' : 'text-text-muted'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step === 'job' ? 'bg-primary-600 text-white' : 'bg-muted text-text-muted'
          }`}>
            2
          </div>
          <span className="text-sm font-medium hidden sm:inline">Job Details</span>
        </div>
        <ChevronRight className="w-4 h-4 text-text-muted" />
        <div className="flex items-center gap-2 text-text-muted">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-muted">
            3
          </div>
          <span className="text-sm font-medium hidden sm:inline">Optimized</span>
        </div>
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

      {step === 'upload' && (
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold text-text-primary mb-1">Upload Your Resume</h2>
            <p className="text-text-secondary mb-6">
              Drop your file or paste your resume content - we&apos;ll handle the rest
            </p>

            {/* Toggle between upload and paste */}
            <div className="flex gap-2 mb-6">
              <Button
                variant={inputMode === 'upload' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setInputMode('upload')}
                className="flex-1"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload File
              </Button>
              <Button
                variant={inputMode === 'paste' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setInputMode('paste')}
                className="flex-1"
              >
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
                      isDragActive 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-border hover:border-primary-300 hover:bg-accent-50'
                    }`}
                  >
                    <input {...getInputProps()} />
                    {isUploading || isParsing ? (
                      <div className="space-y-4">
                        <Loader2 className="w-12 h-12 mx-auto text-primary-600 animate-spin" />
                        <div>
                          <p className="font-medium text-text-primary">
                            {isParsing ? 'Extracting content...' : 'Uploading...'}
                          </p>
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
                        <p className="text-text-secondary mb-4">
                          or click to browse files
                        </p>
                        <div className="flex flex-wrap justify-center gap-2">
                          <span className="px-3 py-1 bg-muted rounded-full text-xs text-text-muted">PDF</span>
                          <span className="px-3 py-1 bg-muted rounded-full text-xs text-text-muted">DOCX</span>
                          <span className="px-3 py-1 bg-muted rounded-full text-xs text-text-muted">DOC</span>
                          <span className="px-3 py-1 bg-muted rounded-full text-xs text-text-muted">TXT</span>
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
                          <span className="text-sm">Content extracted successfully</span>
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
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Extracted Content Preview
                    </label>
                    <Textarea
                      value={resumeContent}
                      onChange={(e) => setResumeContent(e.target.value)}
                      rows={8}
                      className="font-mono text-sm"
                      placeholder="Your resume content will appear here..."
                    />
                    <p className="text-xs text-text-muted mt-2">
                      {resumeContent.length.toLocaleString()} characters extracted
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handlePaste} className="flex-shrink-0">
                    <Clipboard className="w-4 h-4 mr-2" />
                    Paste from Clipboard
                  </Button>
                </div>
                <Textarea
                  value={resumeContent}
                  onChange={(e) => setResumeContent(e.target.value)}
                  rows={12}
                  placeholder="Paste your resume content here...

Example:
John Doe
Software Engineer

EXPERIENCE
Senior Developer at Tech Corp (2020-Present)
- Led development of microservices architecture
- Managed team of 5 engineers

EDUCATION
B.S. Computer Science, MIT"
                  className="font-mono text-sm"
                />
                <p className="text-xs text-text-muted">
                  {resumeContent.length.toLocaleString()} characters
                </p>
              </div>
            )}

            <div className="mt-6">
              <label className="block text-sm font-medium text-text-primary mb-2">
                Resume Title
              </label>
              <Input
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
                placeholder="e.g., Software Engineer - Google Application"
              />
            </div>

            <div className="flex justify-end mt-6">
              <Button
                onClick={() => setStep('job')}
                disabled={!resumeContent.trim()}
              >
                Continue
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 'job' && (
        <Card>
          <CardContent className="pt-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setStep('upload')}
              className="mb-4 -ml-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <h2 className="text-xl font-semibold text-text-primary mb-1">Target Job (Optional)</h2>
            <p className="text-text-secondary mb-6">
              {prefillJobDescription
                ? 'We pre-filled the job you selected. Upload your resume above, then optimize for this exact role.'
                : 'Add a job description to get personalized optimization tailored to the role'}
            </p>

            <Textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={8}
              placeholder="Paste the job description here...

This helps our AI:
• Match keywords that recruiters look for
• Highlight relevant experience
• Optimize for ATS systems
• Tailor your summary to the role"
            />

            <div className="bg-accent-50 rounded-lg p-4 mt-6">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-text-primary">Pro Tip</p>
                  <p className="text-sm text-text-secondary">
                    Adding a job description increases your chances of getting past ATS systems by 3x
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={handleOptimize}>
                Skip - Optimize Generally
              </Button>
              <Button onClick={handleOptimize} disabled={isOptimizing}>
                {isOptimizing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Optimizing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Optimize Resume
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Features highlight */}
      <div className="grid sm:grid-cols-3 gap-4 mt-8">
        <div className="flex items-start gap-3 p-4 rounded-lg bg-surface border border-border">
          <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
            <Zap className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <p className="font-medium text-text-primary text-sm">Instant Parsing</p>
            <p className="text-xs text-text-muted">PDF, DOCX, DOC, TXT - all supported</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-4 rounded-lg bg-surface border border-border">
          <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-accent-600" />
          </div>
          <div>
            <p className="font-medium text-text-primary text-sm">AI-Powered</p>
            <p className="text-xs text-text-muted">Smart optimization for any industry</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-4 rounded-lg bg-surface border border-border">
          <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <p className="font-medium text-text-primary text-sm">ATS Optimized</p>
            <p className="text-xs text-text-muted">Beat applicant tracking systems</p>
          </div>
        </div>
      </div>
    </div>
  )
}
