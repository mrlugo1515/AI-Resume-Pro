import { ImageResponse } from 'next/og'

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

/**
 * Shared branded Open Graph card used by every landing page's
 * `opengraph-image` route. Keeps social previews consistent and on-brand.
 */
export function renderOgImage({
  eyebrow,
  title,
}: {
  eyebrow: string
  title: string
}) {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0b1120 0%, #111827 55%, #0f766e 140%)',
          padding: '72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, #14b8a6, #0f766e)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
            }}
          >
            ✦
          </div>
          <span style={{ color: '#ffffff', fontSize: '34px', fontWeight: 700 }}>
            ForgeCareerAI
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <span
            style={{
              color: '#5eead4',
              fontSize: '30px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          >
            {eyebrow}
          </span>
          <span
            style={{
              color: '#ffffff',
              fontSize: '68px',
              fontWeight: 800,
              lineHeight: 1.1,
              maxWidth: '1000px',
            }}
          >
            {title}
          </span>
        </div>

        <span style={{ color: '#94a3b8', fontSize: '28px' }}>
          forgecareerai.com — AI-powered resumes that get interviews
        </span>
      </div>
    ),
    { ...OG_SIZE }
  )
}
