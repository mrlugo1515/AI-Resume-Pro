'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { DashboardHeader } from '@/components/dashboard-header'
import { getMyApplications } from '@/app/actions/jobs'
import { 
  FileCheck, 
  MapPin, 
  Building2, 
  Clock,
  ExternalLink,
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react'

type ApplicationWithJob = {
  application: {
    id: number
    jobId: number
    userId: string
    status: string
    createdAt: Date
  }
  job: {
    id: number
    title: string
    company: string
    location: string
    locationType: string
    jobType: string
  }
}

export default function MyApplicationsPage() {
  const [applications, setApplications] = useState<ApplicationWithJob[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadApplications()
  }, [])

  const loadApplications = async () => {
    try {
      const apps = await getMyApplications()
      setApplications(apps as ApplicationWithJob[])
    } catch {
      // Handle error
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />
      case 'reviewing':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
      default:
        return <Clock className="w-4 h-4 text-zinc-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: 'bg-zinc-100 text-zinc-700',
      reviewing: 'bg-yellow-100 text-yellow-700',
      accepted: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700',
    }
    return styles[status] || styles.pending
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
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
              <FileCheck className="w-6 h-6 text-primary-500" />
              My Applications
            </h1>
            <p className="text-text-secondary mt-1">Track the status of your job applications</p>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-500 border-t-transparent"></div>
            <p className="mt-4 text-text-secondary">Loading applications...</p>
          </div>
        ) : applications.length === 0 ? (
          <Card className="text-center py-16 border-dashed border-2">
            <CardContent>
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary-50 flex items-center justify-center">
                <FileCheck className="w-10 h-10 text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">No applications yet</h3>
              <p className="text-sm text-text-secondary mb-6 max-w-sm mx-auto">
                Start applying to jobs and track your progress here.
              </p>
              <Link href="/jobs">
                <Button className="bg-primary-600 hover:bg-primary-700">
                  Browse Jobs
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-text-muted">{applications.length} application{applications.length !== 1 ? 's' : ''}</p>
              <div className="flex items-center gap-4 text-xs text-text-muted">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Pending</span>
                <span className="flex items-center gap-1"><AlertCircle className="w-3 h-3 text-yellow-500" /> Reviewing</span>
                <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-green-500" /> Accepted</span>
              </div>
            </div>
            {applications.map(({ application, job }) => (
              <Card key={application.id} className="hover:shadow-md transition-all">
                <CardContent className="py-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {getStatusIcon(application.status)}
                        <h3 className="text-lg font-semibold text-text-primary">
                          {job.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-4 text-text-secondary text-sm mb-3">
                        <span className="flex items-center gap-1">
                          <Building2 className="w-4 h-4" />
                          {job.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-3 py-1 text-xs rounded-full capitalize ${getStatusBadge(application.status)}`}>
                          {application.status}
                        </span>
                        <span className="text-xs text-text-muted">
                          Applied {formatDate(application.createdAt)}
                        </span>
                      </div>
                    </div>
                    <Link href={`/jobs/${job.id}`}>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        View Job
                      </Button>
                    </Link>
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
