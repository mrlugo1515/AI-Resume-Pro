'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Gift, Copy, Check, Users, Sparkles, Share2, Mail, Linkedin, Twitter } from 'lucide-react'
import type { ReferralStats } from '@/lib/referral'

export function ReferralCard({ stats }: { stats: ReferralStats }) {
  const [origin, setOrigin] = useState('')
  const [copied, setCopied] = useState(false)
  const [canNativeShare, setCanNativeShare] = useState(false)

  useEffect(() => {
    setOrigin(window.location.origin)
    setCanNativeShare(typeof navigator !== 'undefined' && !!navigator.share)
  }, [])

  const shareUrl = origin ? `${origin}/sign-up?ref=${stats.code}` : ''
  const shareMessage =
    'I used ForgeCareerAI to optimize my resume for ATS and land more interviews. Sign up with my link and we both get a free resume optimization:'

  const copyLink = useCallback(async () => {
    if (!shareUrl) return
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard may be unavailable; the input remains selectable as a fallback.
    }
  }, [shareUrl])

  const nativeShare = useCallback(async () => {
    if (!shareUrl) return
    try {
      await navigator.share({ title: 'ForgeCareerAI', text: shareMessage, url: shareUrl })
    } catch {
      // User dismissed the share sheet — no action needed.
    }
  }, [shareUrl])

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(shareUrl)}`
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
  const emailUrl = `mailto:?subject=${encodeURIComponent('A tool that got my resume past the bots')}&body=${encodeURIComponent(`${shareMessage}\n\n${shareUrl}`)}`

  return (
    <div className="space-y-6">
      {/* Hero / reward explainer */}
      <Card className="bg-gradient-to-r from-primary-600 to-primary-700 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <CardContent className="pt-6 relative">
          <div className="flex items-center gap-2 mb-2">
            <Gift className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Give a free optimization, get one free</h2>
          </div>
          <p className="text-white/80 text-sm max-w-xl leading-relaxed">
            Share your link with friends. When someone signs up through it, you
            {' '}<span className="font-semibold text-white">both</span> get{' '}
            {stats.rewardPerReferral} bonus resume optimization{stats.rewardPerReferral > 1 ? 's' : ''} — free.
          </p>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-5 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-primary">{stats.referralCount}</p>
                <p className="text-xs text-text-muted">Friends referred</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent-50 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-accent-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-primary">{stats.bonusCredits}</p>
                <p className="text-xs text-text-muted">Bonus credits earned</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Share link */}
      <Card>
        <CardContent className="pt-6">
          <label htmlFor="referral-link" className="block text-sm font-medium text-text-primary mb-2">
            Your referral link
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              id="referral-link"
              readOnly
              value={shareUrl}
              onFocus={(e) => e.currentTarget.select()}
              className="flex-1 h-11 px-3 rounded-lg border border-border bg-surface-alt text-sm text-text-secondary font-mono truncate focus:outline-none focus:ring-2 focus:ring-primary-200"
              aria-label="Your referral link"
            />
            <Button onClick={copyLink} className="h-11 bg-primary-600 hover:bg-primary-700 whitespace-nowrap" disabled={!shareUrl}>
              {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
              {copied ? 'Copied!' : 'Copy link'}
            </Button>
          </div>

          {/* Share targets */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            {canNativeShare && (
              <Button variant="outline" size="sm" onClick={nativeShare} className="gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            )}
            <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="gap-2">
                <Twitter className="w-4 h-4" />
                Post on X
              </Button>
            </a>
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="gap-2">
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </Button>
            </a>
            <a href={emailUrl}>
              <Button variant="outline" size="sm" className="gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>

      {/* How it works */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold text-text-primary mb-4">How it works</h3>
          <ol className="space-y-4">
            {[
              { title: 'Share your link', body: 'Send your referral link to friends who are job hunting.' },
              { title: 'They sign up', body: 'Your friend creates a free account using your link.' },
              { title: 'You both get rewarded', body: `Each of you earns ${stats.rewardPerReferral} free resume optimization, automatically.` },
            ].map((step, i) => (
              <li key={step.title} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <p className="font-medium text-text-primary text-sm">{step.title}</p>
                  <p className="text-sm text-text-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}
