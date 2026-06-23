'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calendar, Clock, FileText } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import type { BlogPost } from '@/lib/blog-data'

const categoryColors: Record<string, string> = {
  'Resume Tips': 'bg-blue-100 text-blue-700',
  'Job Search': 'bg-green-100 text-green-700',
  'Career Advice': 'bg-purple-100 text-purple-700',
  Research: 'bg-amber-100 text-amber-700',
}

const filters = ['All', 'Resume Tips', 'Job Search', 'Career Advice'] as const

export function BlogList({ posts }: { posts: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const visiblePosts =
    activeCategory === 'All'
      ? posts
      : posts.filter((post) => post.category === activeCategory)

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
        <h2 className="text-2xl font-bold text-text-primary">Latest Articles</h2>
        <div className="flex flex-wrap gap-2">
          {filters.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-primary-600 text-white'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {visiblePosts.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-zinc-100 flex items-center justify-center">
            <FileText className="w-8 h-8 text-zinc-400" />
          </div>
          <p className="text-text-secondary">No articles in this category yet. Check back soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visiblePosts.map((post) => (
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
      )}
    </>
  )
}
