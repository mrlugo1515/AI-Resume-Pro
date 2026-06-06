import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getJobById, incrementJobViews, hasApplied } from '@/app/actions/jobs'
import { Button } from '@/components/ui/button'
import { ApplyButton } from './apply-button'
import {
  ArrowLeft,
  MapPin,
  Building2,
  Clock,
  DollarSign,
  Briefcase,
  Users,
  Eye,
  ExternalLink,
  Mail,
  Sparkles,
  CheckCircle2,
} from 'lucide-react'

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const job = await getJobById(parseInt(id))
  
  if (!job) {
    notFound()
  }

  // Increment views
  await incrementJobViews(job.id)
  
  const alreadyApplied = await hasApplied(job.id)

  const formatSalary = (min: number | null, max: number | null) => {
    if (!min && !max) return null
    if (min && max) return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k per year`
    if (min) return `From $${(min / 1000).toFixed(0)}k per year`
    if (max) return `Up to $${(max / 1000).toFixed(0)}k per year`
    return null
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
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
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-8">
        {/* Job Header Card */}
        <div className="bg-surface rounded-xl border border-border p-8 mb-6 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              {job.featured && (
                <span className="inline-block px-3 py-1 bg-primary-500 text-white text-sm font-medium rounded-full mb-4">
                  Featured Position
                </span>
              )}
              <h1 className="text-3xl font-bold text-text-primary mb-2">{job.title}</h1>
              <div className="flex items-center gap-2 text-xl text-text-secondary mb-4">
                <Building2 className="w-5 h-5" />
                {job.company}
              </div>
              
              <div className="flex flex-wrap gap-4 text-text-secondary">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </span>
                <span className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span className="capitalize">{job.jobType.replace('-', ' ')}</span>
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="capitalize">{job.locationType}</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {alreadyApplied ? (
                <Button disabled className="gap-2 bg-green-500 hover:bg-green-500 cursor-default">
                  <CheckCircle2 className="w-4 h-4" />
                  Already Applied
                </Button>
              ) : job.applicationUrl ? (
                <a href={job.applicationUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full gap-2 bg-primary-500 hover:bg-primary-600">
                    Apply Now
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
              ) : job.applicationEmail ? (
                <a href={`mailto:${job.applicationEmail}?subject=Application for ${job.title}`}>
                  <Button className="w-full gap-2 bg-primary-500 hover:bg-primary-600">
                    <Mail className="w-4 h-4" />
                    Apply via Email
                  </Button>
                </a>
              ) : (
                <ApplyButton jobId={job.id} />
              )}
              
              <Link href="/dashboard/new">
                <Button variant="outline" className="w-full gap-2">
                  <Sparkles className="w-4 h-4" />
                  Optimize Resume for This Job
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-border">
            {formatSalary(job.salaryMin, job.salaryMax) && (
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Salary</p>
                  <p className="font-semibold text-text-primary">{formatSalary(job.salaryMin, job.salaryMax)}</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Views</p>
                <p className="font-semibold text-text-primary">{job.views}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Applications</p>
                <p className="font-semibold text-text-primary">{job.applications}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-zinc-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-zinc-600" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Posted</p>
                <p className="font-semibold text-text-primary">{formatDate(job.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-surface rounded-xl border border-border p-6">
              <h2 className="text-xl font-semibold text-text-primary mb-4">Job Description</h2>
              <div className="prose prose-zinc max-w-none">
                <p className="text-text-secondary whitespace-pre-wrap">{job.description}</p>
              </div>
            </div>

            {/* Requirements */}
            {job.requirements && (
              <div className="bg-surface rounded-xl border border-border p-6">
                <h2 className="text-xl font-semibold text-text-primary mb-4">Requirements</h2>
                <div className="prose prose-zinc max-w-none">
                  <p className="text-text-secondary whitespace-pre-wrap">{job.requirements}</p>
                </div>
              </div>
            )}

            {/* Benefits */}
            {job.benefits && (
              <div className="bg-surface rounded-xl border border-border p-6">
                <h2 className="text-xl font-semibold text-text-primary mb-4">Benefits</h2>
                <div className="prose prose-zinc max-w-none">
                  <p className="text-text-secondary whitespace-pre-wrap">{job.benefits}</p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Info */}
            <div className="bg-surface rounded-xl border border-border p-6">
              <h3 className="font-semibold text-text-primary mb-4">About {job.company}</h3>
              <div className="w-16 h-16 bg-zinc-100 rounded-xl flex items-center justify-center mb-4">
                <Building2 className="w-8 h-8 text-zinc-400" />
              </div>
              <p className="text-text-secondary text-sm">
                Learn more about working at {job.company} and discover other open positions.
              </p>
            </div>

            {/* CTA */}
            <div className="bg-primary-50 rounded-xl border border-primary-200 p-6">
              <h3 className="font-semibold text-primary-900 mb-2">Stand Out from Other Applicants</h3>
              <p className="text-primary-700 text-sm mb-4">
                Use ForgeCareerAI to optimize your resume specifically for this position and increase your chances of getting an interview.
              </p>
              <Link href="/dashboard/new">
                <Button className="w-full bg-primary-500 hover:bg-primary-600">
                  Optimize My Resume
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Spacing */}
      <div className="h-16"></div>
    </div>
  )
}
