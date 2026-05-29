import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="bg-white border-t border-border py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.png"
                alt="ForgeCareerAI"
                width={36}
                height={36}
                className="rounded-lg"
              />
              <span className="text-lg font-bold text-text-primary">ForgeCareerAI</span>
            </Link>
            <p className="text-sm text-text-secondary max-w-sm">
              AI-powered resume optimization that helps you land more interviews. 
              Tailored for ATS systems and hiring managers.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                  Testimonials
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/sign-in" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/sign-up" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} ForgeCareerAI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-text-muted hover:text-text-secondary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-text-muted hover:text-text-secondary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
