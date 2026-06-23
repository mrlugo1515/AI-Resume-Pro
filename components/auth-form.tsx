'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Sparkles, Check, Star, ArrowLeft } from 'lucide-react'

interface AuthFormProps {
  mode: 'sign-in' | 'sign-up'
}

const valueProps = [
  'AI-tailored resumes for any job description',
  'Beat ATS filters and get past the bots',
  'Land 3x more interviews on average',
]

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (mode === 'sign-up') {
        const result = await authClient.signUp.email({
          email,
          password,
          name: name || email.split('@')[0],
        })
        if (result.error) {
          setError(result.error.message || 'Failed to sign up')
          return
        }
      } else {
        const result = await authClient.signIn.email({
          email,
          password,
        })
        if (result.error) {
          setError(result.error.message || 'Invalid email or password')
          return
        }
      }
      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Brand panel */}
      <aside className="relative hidden lg:flex flex-col justify-between bg-gradient-dark p-12 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-radial" />
        <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-primary-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[320px] h-[320px] bg-accent-500/10 rounded-full blur-[100px]" />

        <div className="relative">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-card rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">ForgeCareerAI</span>
          </Link>
        </div>

        <div className="relative max-w-md">
          <h2 className="text-3xl font-bold text-white leading-tight text-balance mb-8">
            Forge a resume that actually gets you the interview.
          </h2>
          <ul className="space-y-4">
            {valueProps.map((prop) => (
              <li key={prop} className="flex items-start gap-3 text-zinc-300">
                <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-primary-600/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary-400" />
                </span>
                <span className="leading-relaxed">{prop}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex items-center gap-3">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-sm text-zinc-400">
            Rated 4.9/5 by 1,200+ job seekers
          </span>
        </div>
      </aside>

      {/* Form panel */}
      <main className="flex flex-col justify-center px-6 py-12 sm:px-12 bg-surface">
        <div className="w-full max-w-sm mx-auto">
          {/* Mobile brand */}
          <Link href="/" className="lg:hidden inline-flex items-center gap-2 mb-8">
            <div className="w-9 h-9 bg-gradient-card rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-text-primary">ForgeCareerAI</span>
          </Link>

          <Link
            href="/"
            className="hidden lg:inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text-secondary mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
              {mode === 'sign-in' ? 'Welcome back' : 'Create your account'}
            </h1>
            <p className="text-text-secondary">
              {mode === 'sign-in'
                ? 'Sign in to continue optimizing your resumes.'
                : 'Start creating AI-optimized resumes today.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'sign-up' && (
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className="h-11 bg-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="h-11 bg-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="h-11 bg-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
              {mode === 'sign-up' && (
                <p className="text-xs text-text-muted">Must be at least 8 characters.</p>
              )}
            </div>

            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-200">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full h-11 text-base" disabled={loading}>
              {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              {mode === 'sign-in' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-text-secondary">
            {mode === 'sign-in' ? (
              <>
                {"Don't have an account? "}
                <Link href="/sign-up" className="text-primary-600 hover:text-primary-700 font-semibold">
                  Sign up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <Link href="/sign-in" className="text-primary-600 hover:text-primary-700 font-semibold">
                  Sign in
                </Link>
              </>
            )}
          </div>

          <p className="mt-8 text-center text-xs text-text-muted leading-relaxed">
            By continuing, you agree to our{' '}
            <Link href="/terms" className="underline hover:text-text-secondary">Terms</Link>{' '}
            and{' '}
            <Link href="/privacy" className="underline hover:text-text-secondary">Privacy Policy</Link>.
          </p>
        </div>
      </main>
    </div>
  )
}
