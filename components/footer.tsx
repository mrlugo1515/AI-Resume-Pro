import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">ForgeCareerAI</span>
            </Link>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              AI-powered resume optimization that helps you land more interviews. 
              Tailored for ATS systems and hiring managers.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-9 h-9 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <a href="/#how-it-works" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="/#pricing" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/#testimonials" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Testimonials
                </a>
              </li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Tools</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/ai-resume-builder" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  AI Resume Builder
                </Link>
              </li>
              <li>
                <Link href="/ats-resume-checker" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  ATS Resume Checker
                </Link>
              </li>
              <li>
                <Link href="/resume-scoring-tool" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Resume Scoring Tool
                </Link>
              </li>
              <li>
                <Link href="/career-development-assistant" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Career Assistant
                </Link>
              </li>
              <li>
                <Link href="/interview-preparation-tool" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Interview Prep
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Account</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/sign-in" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/sign-up" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Create Account
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500">
            &copy; {new Date().getFullYear()} ForgeCareerAI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/blog" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
              Blog
            </Link>
            <Link href="/jobs" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
              Jobs
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
