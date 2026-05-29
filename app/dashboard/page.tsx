import Link from 'next/link'
import { headers } from 'next/headers'
import { FileText, Plus, Clock, Download, MoreVertical, Trash2 } from 'lucide-react'
import { auth } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { DashboardHeader } from '@/components/dashboard-header'
import { getResumes, getResumeStats } from '@/app/actions/resume'
import { ResumeActions } from '@/components/resume-actions'

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  const resumes = await getResumes()
  const stats = await getResumeStats()

  const statCards = [
    { label: 'Resumes Created', value: stats.total.toString(), icon: FileText, color: 'text-primary-600', bg: 'bg-primary-50' },
    { label: 'This Month', value: stats.thisMonth.toString(), icon: Clock, color: 'text-accent-600', bg: 'bg-accent-50' },
    { label: 'Completed', value: stats.completed.toString(), icon: Download, color: 'text-green-600', bg: 'bg-green-50' },
  ]

  return (
    <div className="min-h-screen bg-surface">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-text-primary">
            Welcome back{session?.user?.name ? `, ${session.user.name}` : ''}!
          </h1>
          <p className="text-text-secondary mt-1">Here&apos;s an overview of your resume activity.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {statCards.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                      <p className="text-xs text-text-secondary">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Action card */}
        <Card className="bg-gradient-card text-white mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-1">Create New Optimized Resume</h3>
                <p className="text-white/80 text-sm">Tailor your resume to a specific job description in minutes.</p>
              </div>
              <Link href="/dashboard/new">
                <Button variant="secondary" size="lg" className="bg-accent-500 hover:bg-accent-600 text-white border-0">
                  <Plus className="w-4 h-4 mr-2" />
                  New Resume
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Saved resumes */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">Recent Resumes</h2>
            <span className="text-xs text-text-muted">{resumes.length} total</span>
          </div>

          {resumes.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-alt flex items-center justify-center">
                  <FileText className="w-8 h-8 text-text-muted" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">No resumes yet</h3>
                <p className="text-sm text-text-secondary mb-6">Create your first optimized resume to get started.</p>
                <Link href="/dashboard/new">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Resume
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {resumes.map((resume) => (
                <Card key={resume.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-primary-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-text-primary">{resume.title}</p>
                          <div className="flex items-center gap-3 mt-0.5">
                            <span className="text-xs text-text-muted">
                              {new Date(resume.createdAt).toLocaleDateString()}
                            </span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-primary-50 text-primary-700 font-medium capitalize">
                              {resume.tier}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${
                              resume.status === 'completed' 
                                ? 'bg-green-50 text-green-700' 
                                : 'bg-yellow-50 text-yellow-700'
                            }`}>
                              {resume.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ResumeActions resumeId={resume.id} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
