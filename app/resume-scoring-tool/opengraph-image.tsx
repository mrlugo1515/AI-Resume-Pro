import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'Resume Scoring Tool — ForgeCareerAI'

export default function Image() {
  return renderOgImage({
    eyebrow: 'Resume Scoring Tool',
    title: 'Score your resume against any role in seconds.',
  })
}
