'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md border-b border-border shadow-sm' 
        : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/25">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className={`text-lg font-bold transition-colors ${
              scrolled ? 'text-text-primary' : 'text-white'
            }`}>
              ForgeCareerAI
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className={`text-sm font-medium transition-colors ${
              scrolled 
                ? 'text-text-secondary hover:text-text-primary' 
                : 'text-zinc-300 hover:text-white'
            }`}>
              How It Works
            </a>
            <a href="#pricing" className={`text-sm font-medium transition-colors ${
              scrolled 
                ? 'text-text-secondary hover:text-text-primary' 
                : 'text-zinc-300 hover:text-white'
            }`}>
              Pricing
            </a>
            <Link href="/blog" className={`text-sm font-medium transition-colors ${
              scrolled 
                ? 'text-text-secondary hover:text-text-primary' 
                : 'text-zinc-300 hover:text-white'
            }`}>
              Resources
            </Link>
            <a href="#faq" className={`text-sm font-medium transition-colors ${
              scrolled 
                ? 'text-text-secondary hover:text-text-primary' 
                : 'text-zinc-300 hover:text-white'
            }`}>
              FAQ
            </a>
          </div>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/sign-in">
              <Button 
                variant="ghost" 
                size="sm" 
                className={scrolled ? '' : 'text-zinc-300 hover:text-white hover:bg-white/10'}
              >
                Log In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm" className="bg-primary-600 hover:bg-primary-700 text-white">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className={`md:hidden p-2 transition-colors ${
              scrolled ? 'text-text-secondary hover:text-text-primary' : 'text-zinc-300 hover:text-white'
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border bg-white rounded-b-xl shadow-lg">
            <div className="flex flex-col gap-4">
              <a
                href="#how-it-works"
                className="text-sm text-text-secondary hover:text-text-primary transition-colors px-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <a
                href="#pricing"
                className="text-sm text-text-secondary hover:text-text-primary transition-colors px-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <Link
                href="/blog"
                className="text-sm text-text-secondary hover:text-text-primary transition-colors px-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Resources
              </Link>
              <a
                href="#faq"
                className="text-sm text-text-secondary hover:text-text-primary transition-colors px-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </a>
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Link href="/sign-in">
                  <Button variant="ghost" className="w-full justify-center">Log In</Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="w-full justify-center bg-primary-600 hover:bg-primary-700">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
