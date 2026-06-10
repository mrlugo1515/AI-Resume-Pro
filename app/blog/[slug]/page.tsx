import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Calendar, Clock, User, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LandingHeader } from '@/components/landing-header'
import { Footer } from '@/components/footer'
import { blogPosts, getPostBySlug } from '@/lib/blog-posts'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: 'Article Not Found' }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://forgecareerai.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.dateISO,
      authors: [post.author],
    },
  }
}

const categoryColors: Record<string, string> = {
  'Resume Tips': 'bg-blue-100 text-blue-700',
  'Job Search': 'bg-green-100 text-green-700',
  'Career Advice': 'bg-purple-100 text-purple-700',
  Research: 'bg-amber-100 text-amber-700',
}

/** Minimal renderer for paragraphs, ## headings, and - list items. */
function ArticleContent({ content }: { content: string }) {
  const blocks = content.trim().split('\n\n')
  const elements: React.ReactNode[] = []
  let listBuffer: string[] = []

  const flushList = (key: string) => {
    if (listBuffer.length === 0) return
    elements.push(
      <ul key={key} className="my-6 space-y-2 list-disc pl-6 text-text-secondary leading-relaxed">
        {listBuffer.map((item, i) => (
          <li key={i}>{item.replace(/^-\s*/, '')}</li>
        ))}
      </ul>
    )
    listBuffer = []
  }

  blocks.forEach((block, i) => {
    const lines = block.split('\n')
    const isList = lines.every((l) => l.trim().startsWith('- '))

    if (isList) {
      listBuffer.push(...lines)
      return
    }
    flushList(`list-${i}`)

    if (block.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-2xl font-bold text-text-primary mt-10 mb-4">
          {block.replace(/^##\s*/, '')}
        </h2>
      )
    } else {
      elements.push(
        <p key={i} className="my-5 text-text-secondary leading-relaxed text-lg">
          {block}
        </p>
      )
    }
  })
  flushList('list-final')

  return <div>{elements}</div>
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.dateISO,
    author: { '@type': 'Organization', name: post.author },
    publisher: { '@type': 'Organization', name: 'ForgeCareerAI' },
    mainEntityOfPage: `https://forgecareerai.com/blog/${post.slug}`,
  }

  return (
    <div className="min-h-screen bg-background">
      <LandingHeader solid />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Article header */}
      <article className="pt-32 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary-600 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all articles
          </Link>

          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${categoryColors[post.category] ?? 'bg-zinc-100 text-zinc-700'}`}>
            {post.category}
          </span>

          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary leading-tight mb-6 text-balance">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-5 text-sm text-text-muted pb-8 border-b border-border">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" /> {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> {post.readTime}
            </span>
          </div>

          <div className="mt-8">
            <ArticleContent content={post.content} />
          </div>

          {/* Inline CTA */}
          <div className="mt-12 rounded-2xl border border-primary-200 bg-primary-50 p-8 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-text-primary mb-2 text-balance">
              See how your resume scores — free
            </h2>
            <p className="text-text-secondary mb-5 max-w-md mx-auto">
              Put this advice into action. Get an instant ATS score and your top fixes in seconds, no signup required.
            </p>
            <Link href="/free-ats-check">
              <Button size="lg" className="bg-primary-600 hover:bg-primary-700 text-white">
                Check My Resume Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </article>

      {/* Related */}
      <section className="py-16 px-4 bg-surface border-t border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-text-primary mb-8">Keep reading</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`}>
                <div className="h-full bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-all hover:-translate-y-1">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${categoryColors[p.category] ?? 'bg-zinc-100 text-zinc-700'}`}>
                    {p.category}
                  </span>
                  <h3 className="font-semibold text-text-primary mb-2 line-clamp-2">{p.title}</h3>
                  <p className="text-sm text-text-secondary line-clamp-2">{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
