import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'AI Resume Builder — ForgeCareerAI'

export default function Image() {
  return renderOgImage({
    eyebrow: 'AI Resume Builder',
    title: 'Build an ATS-ready resume tailored to any job.',
  })
}
