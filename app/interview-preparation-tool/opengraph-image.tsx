import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'Interview Preparation Tool — ForgeCareerAI'

export default function Image() {
  return renderOgImage({
    eyebrow: 'Interview Prep',
    title: 'Walk into every interview ready to win.',
  })
}
