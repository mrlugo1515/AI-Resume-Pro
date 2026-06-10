import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Source_Serif_4 } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GoogleAnalytics } from '@next/third-parties/google'
import { SupportChat } from '@/components/support-chat'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const sourceSerif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: 'ForgeCareerAI - Forge Your Career with AI-Powered Resumes',
    template: '%s | ForgeCareerAI',
  },
  description: 'Forge your career path with AI-powered resume optimization. Get ATS-friendly resumes tailored to your dream job in minutes.',
  keywords: ['resume', 'AI', 'resume builder', 'ATS optimization', 'career', 'job search', 'resume optimization', 'ForgeCareerAI'],
  authors: [{ name: 'ForgeCareerAI' }],
  metadataBase: new URL('https://forgecareerai.com'),
  manifest: '/manifest.webmanifest',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'ForgeCareerAI',
    title: 'ForgeCareerAI - Forge Your Career with AI-Powered Resumes',
    description: 'Forge your career path with AI-powered resume optimization. Get ATS-friendly resumes tailored to your dream job in minutes.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ForgeCareerAI - AI-Powered Resume Optimization',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ForgeCareerAI - Forge Your Career with AI-Powered Resumes',
    description: 'Forge your career path with AI-powered resume optimization. Get ATS-friendly resumes tailored to your dream job in minutes.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  generator: 'v0.app',
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0d9488',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={sourceSerif.variable}>
      <body className="font-sans antialiased">
        {children}
        <SupportChat />
        {process.env.NODE_ENV === 'production' && <Analytics />}
        {process.env.NODE_ENV === 'production' && <SpeedInsights />}
        {process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  )
}
