'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createJob } from '@/app/actions/jobs'
import { ArrowLeft, Sparkles, Loader2, CheckCircle2 } from 'lucide-react'

export default function PostJobPage() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    locationType: 'onsite',
    jobType: 'full-time',
    salaryMin: '',
    salaryMax: '',
    description: '',
    requirements: '',
    benefits: '',
    applicationUrl: '',
    applicationEmail: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    startTransition(async () => {
      try {
        await createJob({
          title: formData.title,
          company: formData.company,
          location: formData.location,
          locationType: formData.locationType,
          jobType: formData.jobType,
          salaryMin: formData.salaryMin ? parseInt(formData.salaryMin) : undefined,
          salaryMax: formData.salaryMax ? parseInt(formData.salaryMax) : undefined,
          description: formData.description,
          requirements: formData.requirements || undefined,
          benefits: formData.benefits || undefined,
          applicationUrl: formData.applicationUrl || undefined,
          applicationEmail: formData.applicationEmail || undefined,
        })
        router.push('/jobs?posted=true')
      } catch (err) {
        if (err instanceof Error) {
          if (err.message === 'Unauthorized') {
            router.push('/sign-in')
          } else {
            setError(err.message)
          }
        }
      }
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">ForgeCareerAI</span>
            </Link>
            <Link href="/jobs">
              <Button variant="ghost" className="text-zinc-300 hover:text-white hover:bg-white/10 gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Jobs
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold mb-2">Post a New Job</h1>
          <p className="text-zinc-400">
            Reach thousands of qualified candidates with AI-optimized resumes
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="bg-surface rounded-xl border border-border p-6">
            <h2 className="text-xl font-semibold text-text-primary mb-6">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Senior Software Engineer"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="company">Company Name *</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g. Acme Inc."
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. San Francisco, CA"
                  required
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="locationType">Work Type *</Label>
                  <select
                    id="locationType"
                    name="locationType"
                    value={formData.locationType}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-2 rounded-lg border border-border bg-background"
                  >
                    <option value="onsite">On-site</option>
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="jobType">Job Type *</Label>
                  <select
                    id="jobType"
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-2 rounded-lg border border-border bg-background"
                  >
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Salary */}
          <div className="bg-surface rounded-xl border border-border p-6">
            <h2 className="text-xl font-semibold text-text-primary mb-2">Compensation</h2>
            <p className="text-text-secondary text-sm mb-6">
              Jobs with salary information get 30% more applications
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="salaryMin">Minimum Salary ($/year)</Label>
                <Input
                  id="salaryMin"
                  name="salaryMin"
                  type="number"
                  value={formData.salaryMin}
                  onChange={handleChange}
                  placeholder="e.g. 80000"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="salaryMax">Maximum Salary ($/year)</Label>
                <Input
                  id="salaryMax"
                  name="salaryMax"
                  type="number"
                  value={formData.salaryMax}
                  onChange={handleChange}
                  placeholder="e.g. 120000"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Job Details */}
          <div className="bg-surface rounded-xl border border-border p-6">
            <h2 className="text-xl font-semibold text-text-primary mb-6">Job Details</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="description">Job Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the role, responsibilities, and what a typical day looks like..."
                  rows={6}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  placeholder="List the skills, experience, and qualifications needed..."
                  rows={4}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="benefits">Benefits & Perks</Label>
                <Textarea
                  id="benefits"
                  name="benefits"
                  value={formData.benefits}
                  onChange={handleChange}
                  placeholder="Health insurance, 401k, remote work options, etc..."
                  rows={4}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Application Method */}
          <div className="bg-surface rounded-xl border border-border p-6">
            <h2 className="text-xl font-semibold text-text-primary mb-2">How to Apply</h2>
            <p className="text-text-secondary text-sm mb-6">
              Provide at least one way for candidates to apply
            </p>
            <div className="space-y-4">
              <div>
                <Label htmlFor="applicationUrl">Application URL</Label>
                <Input
                  id="applicationUrl"
                  name="applicationUrl"
                  type="url"
                  value={formData.applicationUrl}
                  onChange={handleChange}
                  placeholder="https://yourcompany.com/careers/apply"
                  className="mt-1"
                />
              </div>
              <div className="text-center text-text-secondary text-sm">or</div>
              <div>
                <Label htmlFor="applicationEmail">Application Email</Label>
                <Input
                  id="applicationEmail"
                  name="applicationEmail"
                  type="email"
                  value={formData.applicationEmail}
                  onChange={handleChange}
                  placeholder="jobs@yourcompany.com"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              {error}
            </div>
          )}

          {/* Submit */}
          <div className="flex justify-end gap-4">
            <Link href="/jobs">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button 
              type="submit" 
              disabled={isPending}
              className="gap-2 bg-primary-500 hover:bg-primary-600"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Post Job
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
