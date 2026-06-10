import Link from 'next/link'
import { ArrowRight, Calendar, Clock, BookOpen, FileText, Lightbulb, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { LandingHeader } from '@/components/landing-header'
import { Footer } from '@/components/footer'
import { EmailCapture } from '@/components/email-capture'
import { featuredPost, otherPosts } from '@/lib/blog-posts'

export const metadata = {
  title: 'Career Resources & Blog',
  description: 'Expert career advice, resume tips, and job search strategies to help you land your dream role.',
  alternates: { canonical: '/blog' },
}

const resources = [
  {
    icon: FileText,
    title: 'Free ATS Resume Check',
    description: 'Get an instant ATS score and your top fixes in seconds — no signup.',
    link: '/free-ats-check',
  },
  {
    icon: BookOpen,
    title: 'AI Resume Builder',
    description: 'Build an ATS-ready resume tailored to any job description.',
    link: '/ai-resume-builder',
  },
  {
    icon: Lightbulb,
    title: 'Interview Prep',
    description: 'Practice common questions and learn how to tell your story.',
    link: '/interview-preparation-tool',
  },
  {
    icon: TrendingUp,
    title: 'Resume Scoring Tool',
    description: 'See exactly how your resume scores against any role.',
    link: '/resume-scoring-tool',
  },
]

const categoryColors: Record<string, string> = {
  'Resume Tips': 'bg-blue-100 text-blue-700',
  'Job Search': 'bg-green-100 text-green-700',
  'Career Advice': 'bg-purple-100 text-purple-700',
  Research: 'bg-amber-100 text-amber-700',
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 bg-gradient-dark">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Career Resources & Insights
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Expert advice, data-driven strategies, and practical tips to accelerate your job search and career growth.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 px-4 bg-surface">
        <div className="max-w-6xl mx-auto">
          <Link href={`/blog/${featuredPost.slug}`}>
            <div className="bg-white rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-shadow">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="bg-gradient-to-br from-primary-600 to-primary-800 p-12 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-primary-200 text-sm font-medium uppercase tracking-wider">Featured Article</span>
                    <div className="mt-4 w-20 h-20 mx-auto rounded-2xl bg-white/10 flex items-center justify-center">
                      <FileText className="w-10 h-10 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <span className={`inline-block w-fit px-3 py-1 rounded-full text-xs font-medium mb-4 ${categoryColors[featuredPost.category]}`}>
                    {featuredPost.category}
                  </span>
                  <h2 className="text-2xl font-bold text-text-primary mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-text-secondary mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-text-muted mb-6">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {featuredPost.readTime}
                    </span>
                  </div>
                  <span className="inline-flex items-center w-fit text-primary-600 font-medium">
                    Read Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-text-primary mb-12">Latest Articles</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden h-full">
                  <CardContent className="p-0">
                    <div className="h-40 bg-gradient-to-br from-zinc-100 to-zinc-200 flex items-center justify-center group-hover:from-primary-50 group-hover:to-primary-100 transition-colors">
                      <FileText className="w-12 h-12 text-zinc-400 group-hover:text-primary-500 transition-colors" />
                    </div>
                    <div className="p-6">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${categoryColors[post.category]}`}>
                        {post.category}
                      </span>
                      <h3 className="font-semibold text-text-primary mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-text-muted">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {post.readTime}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 px-4 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-text-primary mb-4">Free Career Tools</h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              Access our collection of free resources to boost your job search.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource) => {
              const Icon = resource.icon
              return (
                <Link key={resource.title} href={resource.link}>
                  <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
                    <CardContent className="p-6 text-center">
                      <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                        <Icon className="w-7 h-7 text-primary-600" />
                      </div>
                      <h3 className="font-semibold text-text-primary mb-2">{resource.title}</h3>
                      <p className="text-sm text-text-secondary">{resource.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 bg-gradient-dark">
        <EmailCapture
          source="blog-newsletter"
          subheading="Join thousands of professionals receiving weekly job search strategies and career advice."
        />
      </section>

      <Footer />
    </div>
  )
}
