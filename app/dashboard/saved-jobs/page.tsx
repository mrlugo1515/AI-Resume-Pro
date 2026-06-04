'use client'

import { useState, useEffect, useTransition } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { DashboardHeader } from '@/components/dashboard-header'
import { getSavedJobs, unsaveJob } from '@/app/actions/jobs'
import { 
  Bookmark, 
  MapPin, 
  Building2, 
  DollarSign,
  Briefcase,
  Trash2,
  ExternalLink,
  ArrowLeft
} from 'lucide-react'

type SavedJobWithDetails = {
  savedJob: {
    id: number
    jobId: number
    userId: string
    createdAt: Date
  }
  job: {
    id: number
    title: string
    company: string
    location: string
    locationType: string
    jobType: string
    salaryMin: number | null
    salaryMax: number | null
    description: string
    createdAt: Date
  }
}

export default function SavedJobsPage() {
  const [savedJobs, setSavedJobs] = useState<SavedJobWithDetails[]>([])
  const [isPending, startTransition] = useTransition()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadSavedJobs()
  }, [])

  const loadSavedJobs = async () => {
    try {
      const jobs = await getSavedJobs()
      setSavedJobs(jobs as SavedJobWithDetails[])
    } catch {
      // Handle error
    } finally {
      setIsLoading(false)
    }
  }

  const handleUnsave = (jobId: number) => {
    startTransition(async () => {
      await unsaveJob(jobId)
      setSavedJobs(savedJobs.filter(sj => sj.job.id !== jobId))
    })
  }

  const formatSalary = (min: number | null, max: number | null) => {
    if (!min && !max) return null
    if (min && max) return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k`
    if (min) return `From $${(min / 1000).toFixed(0)}k`
    if (max) return `Up to $${(max / 1000).toFixed(0)}k`
    return null
  }

  return (
    <div className="min-h-screen bg-surface">
      <DashboardHeader />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
              <Bookmark className="w-6 h-6 text-primary-500" />
              Saved Jobs
            </h1>
            <p className="text-text-secondary mt-1">Jobs you&apos;ve bookmarked for later</p>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-500 border-t-transparent"></div>
            <p className="mt-4 text-text-secondary">Loading saved jobs...</p>
          </div>
        ) : savedJobs.length === 0 ? (
          <Card className="text-center py-16 border-dashed border-2">
            <CardContent>
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary-50 flex items-center justify-center">
                <Bookmark className="w-10 h-10 text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">No saved jobs yet</h3>
              <p className="text-sm text-text-secondary mb-6 max-w-sm mx-auto">
                Browse job listings and save the ones you&apos;re interested in to review later.
              </p>
              <Link href="/jobs">
                <Button className="bg-primary-600 hover:bg-primary-700">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Browse Jobs
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-text-muted">{savedJobs.length} saved job{savedJobs.length !== 1 ? 's' : ''}</p>
            {savedJobs.map(({ job: jobItem }) => (
              <Card key={jobItem.id} className="hover:shadow-md transition-all">
                <CardContent className="py-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-text-primary mb-1">
                        {jobItem.title}
                      </h3>
                      <div className="flex items-center gap-4 text-text-secondary text-sm mb-3">
                        <span className="flex items-center gap-1">
                          <Building2 className="w-4 h-4" />
                          {jobItem.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {jobItem.location}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-3 py-1 bg-zinc-100 text-zinc-700 text-xs rounded-full capitalize">
                          {jobItem.locationType}
                        </span>
                        <span className="px-3 py-1 bg-zinc-100 text-zinc-700 text-xs rounded-full capitalize">
                          {jobItem.jobType.replace('-', ' ')}
                        </span>
                        {formatSalary(jobItem.salaryMin, jobItem.salaryMax) && (
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            {formatSalary(jobItem.salaryMin, jobItem.salaryMax)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link href={`/jobs/${jobItem.id}`}>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleUnsave(jobItem.id)}
                        disabled={isPending}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
