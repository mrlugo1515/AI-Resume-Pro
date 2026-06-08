import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'ATS Resume Checker — ForgeCareerAI'

export default function Image() {
  return renderOgImage({
    eyebrow: 'ATS Resume Checker',
    title: 'See exactly why ATS filters reject resumes.',
  })
}
