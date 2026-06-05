import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { SupportChat } from '@/components/support-chat'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'ForgeCareerAI - Forge Your Career with AI-Powered Resumes',
    template: '%s | ForgeCareerAI',
  },
  description: 'Forge your career path with AI-powered resume optimization. Get ATS-friendly resumes tailored to your dream job in minutes.',
  keywords: ['resume', 'AI', 'resume builder', 'ATS optimization', 'career', 'job search', 'resume optimization', 'ForgeCareerAI'],
  authors: [{ name: 'ForgeCareerAI' }],
  metadataBase: new URL('https://forgecareerai.com'),
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
  generator: 'v0.app',
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <SupportChat />
        {process.env.NODE_ENV === 'production' && <Analytics />}
        {process.env.NODE_ENV === 'production' && <SpeedInsights />}
      </body>
    </html>
  )
}
