import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'
import { getPostBySlug } from '@/lib/blog-posts'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'ForgeCareerAI blog article'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  return renderOgImage({
    eyebrow: post?.category ?? 'Career Resources',
    title: post?.title ?? 'Career advice from ForgeCareerAI',
  })
}
