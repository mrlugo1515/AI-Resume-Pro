import Link from 'next/link'
import { Sparkles, MapPin, Building2, ArrowUpRight, Briefcase } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getMatchedJobs } from '@/app/actions/external-jobs'
import { MatchRing } from '@/components/match-ring'

// Server component: recommends the user's best-matching jobs based on their resume.
export async function RecommendedJobs() {
  const { jobs, hasResume } = await getMatchedJobs({})

  // Only surface jobs we could actually score; take the strongest handful.
  const ranked = hasResume
    ? jobs.filter((j) => j.match && j.match.score >= 40).slice(0, 4)
    : jobs.slice(0, 4)

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-text-primary flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent-500" />
            {hasResume ? 'Recommended For You' : 'Featured Jobs'}
          </h3>
          <Link href="/jobs" className="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
            View all
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        {!hasResume && (
          <div className="mb-4 rounded-lg bg-primary-50 border border-primary-100 px-4 py-3">
            <p className="text-sm text-primary-800">
              Create a resume to unlock personalized match scores for every job.
            </p>
          </div>
        )}

        {ranked.length === 0 ? (
          <div className="text-center py-8">
            <Briefcase className="w-10 h-10 text-text-muted mx-auto mb-3" />
            <p className="text-sm text-text-secondary">No strong matches yet. Try browsing all jobs.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {ranked.map((job) => (
              <Link
                key={job.id}
                href={`/jobs/${encodeURIComponent(job.id)}`}
                className="group block rounded-xl border border-border bg-surface p-3 transition-all hover:border-primary-200 hover:bg-primary-50/40"
              >
                <div className="flex items-center gap-3">
                  {job.match ? (
                    <MatchRing score={job.match.score} size={44} />
                  ) : (
                    <div className="w-11 h-11 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-5 h-5 text-primary-600" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-text-primary truncate group-hover:text-primary-600 transition-colors">
                      {job.title}
                    </p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-text-muted truncate">{job.company}</span>
                      <span className="text-xs text-text-muted flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        {job.location}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-primary-600 transition-colors flex-shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        )}

        <Link href="/jobs" className="block mt-4">
          <Button variant="outline" size="sm" className="w-full">
            Browse all jobs
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
