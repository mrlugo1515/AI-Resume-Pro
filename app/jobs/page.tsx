'use client'

import { useState, useEffect, useTransition } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getJobs, JobFilters } from '@/app/actions/jobs'
import { 
  Search, 
  MapPin, 
  Building2, 
  Clock, 
  DollarSign,
  Briefcase,
  Filter,
  X,
  Sparkles
} from 'lucide-react'

type Job = {
  id: number
  title: string
  company: string
  location: string
  locationType: string
  jobType: string
  salaryMin: number | null
  salaryMax: number | null
  description: string
  featured: boolean
  createdAt: Date
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [isPending, startTransition] = useTransition()
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<JobFilters>({
    search: '',
    location: '',
    locationType: '',
    jobType: '',
  })

  useEffect(() => {
    loadJobs()
  }, [])

  const loadJobs = (newFilters?: JobFilters) => {
    startTransition(async () => {
      const activeFilters = newFilters || filters
      const cleanFilters: JobFilters = {}
      if (activeFilters.search) cleanFilters.search = activeFilters.search
      if (activeFilters.location) cleanFilters.location = activeFilters.location
      if (activeFilters.locationType) cleanFilters.locationType = activeFilters.locationType
      if (activeFilters.jobType) cleanFilters.jobType = activeFilters.jobType
      
      const result = await getJobs(Object.keys(cleanFilters).length > 0 ? cleanFilters : undefined)
      setJobs(result as Job[])
    })
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    loadJobs()
  }

  const clearFilters = () => {
    const emptyFilters = { search: '', location: '', locationType: '', jobType: '' }
    setFilters(emptyFilters)
    loadJobs(emptyFilters)
  }

  const formatSalary = (min: number | null, max: number | null) => {
    if (!min && !max) return null
    if (min && max) return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k`
    if (min) return `From $${(min / 1000).toFixed(0)}k`
    if (max) return `Up to $${(max / 1000).toFixed(0)}k`
    return null
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - new Date(date).getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    if (days === 0) return 'Today'
    if (days === 1) return 'Yesterday'
    if (days < 7) return `${days} days ago`
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`
    return `${Math.floor(days / 30)} months ago`
  }

  const locationTypes = [
    { value: '', label: 'All Locations' },
    { value: 'remote', label: 'Remote' },
    { value: 'hybrid', label: 'Hybrid' },
    { value: 'onsite', label: 'On-site' },
  ]

  const jobTypes = [
    { value: '', label: 'All Types' },
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'internship', label: 'Internship' },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">ForgeCareerAI</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" className="text-zinc-300 hover:text-white hover:bg-white/10">
                  Dashboard
                </Button>
              </Link>
              <Link href="/jobs/post">
                <Button className="bg-primary-500 hover:bg-primary-600">
                  Post a Job
                </Button>
              </Link>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Find Your Next Opportunity</h1>
          <p className="text-zinc-400 text-lg mb-8">
            Discover jobs that match your optimized resume
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <Input
                type="text"
                placeholder="Job title, company, or keywords..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full pl-12 h-14 bg-white/10 border-white/20 text-white placeholder:text-zinc-400 focus:bg-white/15"
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <Input
                type="text"
                placeholder="Location..."
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="w-full pl-12 h-14 bg-white/10 border-white/20 text-white placeholder:text-zinc-400 focus:bg-white/15"
              />
            </div>
            <Button type="submit" size="lg" className="h-14 px-8 bg-primary-500 hover:bg-primary-600">
              Search Jobs
            </Button>
          </form>
        </div>
      </div>

      {/* Filters & Results */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          
          {/* Quick Filters */}
          <select
            value={filters.locationType}
            onChange={(e) => {
              const newFilters = { ...filters, locationType: e.target.value }
              setFilters(newFilters)
              loadJobs(newFilters)
            }}
            className="px-4 py-2 rounded-lg border border-border bg-background text-sm"
          >
            {locationTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          
          <select
            value={filters.jobType}
            onChange={(e) => {
              const newFilters = { ...filters, jobType: e.target.value }
              setFilters(newFilters)
              loadJobs(newFilters)
            }}
            className="px-4 py-2 rounded-lg border border-border bg-background text-sm"
          >
            {jobTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>

          {(filters.search || filters.location || filters.locationType || filters.jobType) && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1 text-text-secondary">
              <X className="w-4 h-4" />
              Clear
            </Button>
          )}

          <div className="ml-auto text-sm text-text-secondary">
            {jobs.length} job{jobs.length !== 1 ? 's' : ''} found
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {isPending ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-500 border-t-transparent"></div>
              <p className="mt-4 text-text-secondary">Loading jobs...</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12 bg-surface rounded-xl border border-border">
              <Briefcase className="w-12 h-12 text-text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
              <p className="text-text-secondary mb-4">Try adjusting your search or filters</p>
              <Button onClick={clearFilters} variant="outline">
                Clear Filters
              </Button>
            </div>
          ) : (
            jobs.map((jobItem) => (
              <Link key={jobItem.id} href={`/jobs/${jobItem.id}`}>
                <div className={`p-6 rounded-xl border transition-all hover:shadow-lg hover:border-primary-300 cursor-pointer ${
                  jobItem.featured ? 'bg-primary-50 border-primary-200' : 'bg-surface border-border'
                }`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {jobItem.featured && (
                          <span className="px-2 py-0.5 bg-primary-500 text-white text-xs font-medium rounded-full">
                            Featured
                          </span>
                        )}
                        <span className="text-sm text-text-secondary">{formatDate(jobItem.createdAt)}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-text-primary mb-1">
                        {jobItem.title}
                      </h3>
                      <div className="flex items-center gap-4 text-text-secondary mb-3">
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
                        <span className="px-3 py-1 bg-zinc-100 text-zinc-700 text-sm rounded-full capitalize">
                          {jobItem.locationType}
                        </span>
                        <span className="px-3 py-1 bg-zinc-100 text-zinc-700 text-sm rounded-full capitalize">
                          {jobItem.jobType.replace('-', ' ')}
                        </span>
                        {formatSalary(jobItem.salaryMin, jobItem.salaryMax) && (
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            {formatSalary(jobItem.salaryMin, jobItem.salaryMax)}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button variant="outline" className="shrink-0">
                      View Job
                    </Button>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
