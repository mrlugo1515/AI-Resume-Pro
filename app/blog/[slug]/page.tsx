import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Calendar, Clock, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LandingHeader } from '@/components/landing-header'
import { Footer } from '@/components/footer'
import {
  getAllPosts,
  getPostBySlug,
  getNonFeaturedPosts,
  type ContentBlock,
} from '@/lib/blog-data'

const baseUrl = 'https://forgecareerai.com'

const categoryColors: Record<string, string> = {
  'Resume Tips': 'bg-blue-100 text-blue-700',
  'Job Search': 'bg-green-100 text-green-700',
  'Career Advice': 'bg-purple-100 text-purple-700',
  Research: 'bg-amber-100 text-amber-700',
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return { title: 'Article Not Found' }
  }

  const url = `${baseUrl}/blog/${post.slug}`

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url,
      publishedTime: post.published,
      authors: [post.author],
      section: post.category,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  }
}

function renderBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case 'heading':
      return (
        <h2
          key={index}
          className="text-2xl font-bold text-text-primary mt-10 mb-4"
        >
          {block.text}
        </h2>
      )
    case 'paragraph':
      return (
        <p key={index} className="text-text-secondary leading-relaxed mb-6">
          {block.text}
        </p>
      )
    case 'list':
      return (
        <ul key={index} className="list-disc pl-6 mb-6 flex flex-col gap-2">
          {block.items.map((item, i) => (
            <li key={i} className="text-text-secondary leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      )
    case 'quote':
      return (
        <blockquote
          key={index}
          className="border-l-4 border-primary-500 bg-surface pl-6 pr-4 py-4 my-8 rounded-r-lg"
        >
          <p className="text-text-primary italic leading-relaxed">
            {block.text}
          </p>
        </blockquote>
      )
    default:
      return null
  }
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const related = getNonFeaturedPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.published,
    dateModified: post.published,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ForgeCareer AI',
      url: baseUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${post.slug}`,
    },
    articleSection: post.category,
  }

  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Article header */}
      <article>
        <header className="pt-32 pb-12 px-4 bg-gradient-dark">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
            <span
              className={`inline-block w-fit px-3 py-1 rounded-full text-xs font-medium mb-4 ${categoryColors[post.category] ?? 'bg-zinc-100 text-zinc-700'}`}
            >
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-balance">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" /> {post.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" /> {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> {post.readTime}
              </span>
            </div>
          </div>
        </header>

        {/* Article body */}
        <div className="py-12 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-text-primary leading-relaxed mb-8 font-medium">
              {post.excerpt}
            </p>
            {post.content.map((block, index) => renderBlock(block, index))}

            {/* CTA */}
            <div className="mt-12 p-8 rounded-2xl bg-surface border border-border text-center">
              <h2 className="text-xl font-bold text-text-primary mb-3">
                Ready to put this into practice?
              </h2>
              <p className="text-text-secondary mb-6">
                Build an ATS-optimized resume in minutes with ForgeCareer AI.
              </p>
              <Button asChild className="bg-primary-600 hover:bg-primary-700">
                <Link href="/sign-up">
                  Create Your Resume
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="py-16 px-4 bg-surface">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-text-primary mb-8">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((rel) => (
                <Link key={rel.slug} href={`/blog/${rel.slug}`}>
                  <div className="h-full bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-all hover:-translate-y-1">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${categoryColors[rel.category] ?? 'bg-zinc-100 text-zinc-700'}`}
                    >
                      {rel.category}
                    </span>
                    <h3 className="font-semibold text-text-primary mb-2 line-clamp-2">
                      {rel.title}
                    </h3>
                    <p className="text-sm text-text-secondary line-clamp-2">
                      {rel.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
