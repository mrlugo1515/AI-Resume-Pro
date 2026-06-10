import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'Free ATS Resume Check — ForgeCareerAI'

export default function Image() {
  return renderOgImage({
    eyebrow: 'Free ATS Check',
    title: 'Is your resume ATS-ready? Find out instantly.',
  })
}
