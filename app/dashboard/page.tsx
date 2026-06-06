import Link from 'next/link'
import { headers } from 'next/headers'
import { FileText, Plus, Clock, Download, TrendingUp, Target, Zap, Eye, ArrowUpRight, Calendar, BarChart3, Briefcase, Search, Bookmark, FileCheck } from 'lucide-react'
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
    { 
      label: 'Total Resumes', 
      value: stats.total.toString(), 
      icon: FileText, 
      color: 'text-primary-600', 
      bg: 'bg-primary-50',
      trend: '+12%',
      trendUp: true
    },
    { 
      label: 'This Month', 
      value: stats.thisMonth.toString(), 
      icon: Calendar, 
      color: 'text-accent-600', 
      bg: 'bg-accent-50',
      trend: '+3',
      trendUp: true
    },
    { 
      label: 'Optimized', 
      value: stats.completed.toString(), 
      icon: Target, 
      color: 'text-green-600', 
      bg: 'bg-green-50',
      trend: '100%',
      trendUp: true
    },
    { 
      label: 'Avg ATS Score', 
      value: stats.total > 0 ? '92%' : '-', 
      icon: TrendingUp, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50',
      trend: '+15pts',
      trendUp: true
    },
  ]

  // Activity chart data (mock weekly activity)
  const weeklyActivity = [
    { day: 'Mon', count: 2 },
    { day: 'Tue', count: 1 },
    { day: 'Wed', count: 3 },
    { day: 'Thu', count: 0 },
    { day: 'Fri', count: 2 },
    { day: 'Sat', count: 1 },
    { day: 'Sun', count: 0 },
  ]
  const maxCount = Math.max(...weeklyActivity.map(d => d.count), 1)

  return (
    <div className="min-h-screen bg-surface">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">
              Welcome back{session?.user?.name ? `, ${session.user.name.split(' ')[0]}` : ''}!
            </h1>
            <p className="text-text-secondary mt-1">Here&apos;s your resume optimization overview.</p>
          </div>
          <Link href="/dashboard/new">
            <Button className="bg-primary-600 hover:bg-primary-700">
              <Plus className="w-4 h-4 mr-2" />
              New Resume
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-5 pb-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    {stat.trend && (
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        stat.trendUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                      }`}>
                        {stat.trendUp ? '↑' : '↓'} {stat.trend}
                      </span>
                    )}
                  </div>
                  <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                  <p className="text-xs text-text-muted mt-1">{stat.label}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Actions */}
          <Card className="lg:col-span-2">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent-500" />
                Quick Actions
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <Link href="/dashboard/new" className="group">
                  <div className="p-4 rounded-xl border border-border bg-surface hover:bg-primary-50 hover:border-primary-200 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                        <FileText className="w-5 h-5 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-text-primary text-sm">Create New Resume</p>
                        <p className="text-xs text-text-muted">AI-optimized for your target job</p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-primary-600 transition-colors" />
                    </div>
                  </div>
                </Link>
                <Link href="/dashboard/new" className="group">
                  <div className="p-4 rounded-xl border border-border bg-surface hover:bg-accent-50 hover:border-accent-200 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center group-hover:bg-accent-200 transition-colors">
                        <Download className="w-5 h-5 text-accent-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-text-primary text-sm">Generate Cover Letter</p>
                        <p className="text-xs text-text-muted">Tailored to job description</p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-accent-600 transition-colors" />
                    </div>
                  </div>
                </Link>
                <Link href="/dashboard/match-scan" className="group">
                  <div className="p-4 rounded-xl border border-border bg-surface hover:bg-blue-50 hover:border-blue-200 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <Target className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-text-primary text-sm">Job Match Scanner</p>
                        <p className="text-xs text-text-muted">Score your fit & tailor instantly</p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-blue-600 transition-colors" />
                    </div>
                  </div>
                </Link>
                <Link href="/jobs" className="group">
                  <div className="p-4 rounded-xl border border-border bg-surface hover:bg-blue-50 hover:border-blue-200 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <Briefcase className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-text-primary text-sm">Browse Jobs</p>
                        <p className="text-xs text-text-muted">Find your next opportunity</p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-blue-600 transition-colors" />
                    </div>
                  </div>
                </Link>
                <Link href="/jobs/post" className="group">
                  <div className="p-4 rounded-xl border border-border bg-surface hover:bg-green-50 hover:border-green-200 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                        <Search className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-text-primary text-sm">Post a Job</p>
                        <p className="text-xs text-text-muted">Find qualified candidates</p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-green-600 transition-colors" />
                    </div>
                  </div>
                </Link>
                <Link href="/dashboard/saved-jobs" className="group">
                  <div className="p-4 rounded-xl border border-border bg-surface hover:bg-amber-50 hover:border-amber-200 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                        <Bookmark className="w-5 h-5 text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-text-primary text-sm">Saved Jobs</p>
                        <p className="text-xs text-text-muted">Jobs you bookmarked</p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-amber-600 transition-colors" />
                    </div>
                  </div>
                </Link>
                <Link href="/dashboard/applications" className="group">
                  <div className="p-4 rounded-xl border border-border bg-surface hover:bg-purple-50 hover:border-purple-200 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                        <FileCheck className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-text-primary text-sm">My Applications</p>
                        <p className="text-xs text-text-muted">Track your progress</p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-purple-600 transition-colors" />
                    </div>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Activity */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary-500" />
                Weekly Activity
              </h3>
              <div className="flex items-end justify-between gap-2 h-24">
                {weeklyActivity.map((day) => (
                  <div key={day.day} className="flex flex-col items-center gap-2 flex-1">
                    <div 
                      className="w-full bg-primary-100 rounded-t-sm transition-all hover:bg-primary-200"
                      style={{ 
                        height: `${Math.max((day.count / maxCount) * 100, 8)}%`,
                        minHeight: '4px'
                      }}
                    />
                    <span className="text-[10px] text-text-muted">{day.day}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-text-muted text-center mt-4">
                {weeklyActivity.reduce((sum, d) => sum + d.count, 0)} resumes this week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Pro Tips Banner */}
        {stats.total < 3 && (
          <Card className="bg-gradient-to-r from-primary-600 to-primary-700 text-white mb-8 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <CardContent className="pt-6 relative">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Pro Tip: Tailor Every Application
                  </h3>
                  <p className="text-white/80 text-sm max-w-lg">
                    Candidates who customize their resume for each job are 3x more likely to get an interview. 
                    Use our AI to match keywords from the job description.
                  </p>
                </div>
                <Link href="/dashboard/new">
                  <Button variant="secondary" size="sm" className="bg-white text-primary-700 hover:bg-white/90 border-0 whitespace-nowrap">
                    Try It Now
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Resumes */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2">
              <Clock className="w-5 h-5 text-text-muted" />
              Recent Resumes
            </h2>
            <span className="text-xs text-text-muted bg-surface-alt px-3 py-1 rounded-full">
              {resumes.length} total
            </span>
          </div>

          {resumes.length === 0 ? (
            <Card className="text-center py-16 border-dashed border-2">
              <CardContent>
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary-50 flex items-center justify-center">
                  <FileText className="w-10 h-10 text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">No resumes yet</h3>
                <p className="text-sm text-text-secondary mb-6 max-w-sm mx-auto">
                  Create your first AI-optimized resume and start landing more interviews.
                </p>
                <Link href="/dashboard/new">
                  <Button size="lg" className="bg-primary-600 hover:bg-primary-700">
                    <Plus className="w-5 h-5 mr-2" />
                    Create Your First Resume
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {resumes.map((resume, index) => (
                <Card 
                  key={resume.id} 
                  className="hover:shadow-md transition-all hover:border-primary-200 group"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center group-hover:from-primary-100 group-hover:to-primary-200 transition-colors">
                          <FileText className="w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-text-primary group-hover:text-primary-600 transition-colors">
                            {resume.title}
                          </p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-text-muted flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(resume.createdAt).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-primary-50 text-primary-700 font-medium capitalize">
                              {resume.tier}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize flex items-center gap-1 ${
                              resume.status === 'completed' 
                                ? 'bg-green-50 text-green-700' 
                                : 'bg-yellow-50 text-yellow-700'
                            }`}>
                              {resume.status === 'completed' && <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />}
                              {resume.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="hidden sm:flex text-text-muted hover:text-primary-600">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <ResumeActions resumeId={resume.id} />
                      </div>
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
