import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'ForgeCareerAI - AI-Powered Resume Optimization',
    template: '%s | ForgeCareerAI',
  },
  description: 'Land more interviews with AI-optimized resumes. ForgeCareerAI tailors your resume to job descriptions for maximum ATS compatibility.',
  keywords: ['resume optimization', 'AI resume', 'ATS optimization', 'job search', 'career tools', 'resume builder', 'cover letter generator'],
  authors: [{ name: 'ForgeCareerAI' }],
  creator: 'ForgeCareerAI',
  metadataBase: new URL('https://forgecareerai.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://forgecareerai.com',
    siteName: 'ForgeCareerAI',
    title: 'ForgeCareerAI - AI-Powered Resume Optimization',
    description: 'Land more interviews with AI-optimized resumes. ForgeCareerAI tailors your resume to job descriptions for maximum ATS compatibility.',
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
    title: 'ForgeCareerAI - AI-Powered Resume Optimization',
    description: 'Land more interviews with AI-optimized resumes. ForgeCareerAI tailors your resume to job descriptions for maximum ATS compatibility.',
    images: ['/og-image.png'],
    creator: '@forgecareerai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
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
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
