import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'Career Development Assistant — ForgeCareerAI'

export default function Image() {
  return renderOgImage({
    eyebrow: 'Career Assistant',
    title: 'Your AI partner for every career move.',
  })
}
