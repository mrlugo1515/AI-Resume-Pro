import Link from 'next/link'
import { LandingHeader } from '@/components/landing-header'
import { Footer } from '@/components/footer'

export const metadata = {
  title: 'Privacy Policy - ForgeCareerAI',
  description: 'Privacy Policy for ForgeCareerAI resume optimization platform.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader solid />
      
      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-text-primary mb-8">Privacy Policy</h1>
        <p className="text-text-secondary mb-8">Last updated: January 2024</p>
        
        <div className="prose prose-zinc max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">1. Introduction</h2>
            <p className="text-text-secondary mb-4">
              ForgeCareerAI (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, and safeguard your information when you use our Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">2. Information We Collect</h2>
            <p className="text-text-secondary mb-4">We collect information you provide directly to us:</p>
            <ul className="list-disc pl-6 text-text-secondary mb-4 space-y-2">
              <li><strong>Account Information:</strong> Name, email address, and password when you create an account</li>
              <li><strong>Resume Content:</strong> Resume text, job descriptions, and cover letters you submit for optimization</li>
              <li><strong>Payment Information:</strong> Payment details processed securely through Stripe (we do not store card numbers)</li>
              <li><strong>Usage Data:</strong> Information about how you use the Service, including features accessed and time spent</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">3. How We Use Your Information</h2>
            <p className="text-text-secondary mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 text-text-secondary mb-4 space-y-2">
              <li>Provide, maintain, and improve the Service</li>
              <li>Process your resume and generate optimized content</li>
              <li>Process payments and send transaction confirmations</li>
              <li>Send you updates, marketing communications (with your consent), and support messages</li>
              <li>Analyze usage patterns to improve user experience</li>
              <li>Protect against fraud and unauthorized access</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">4. Data Security</h2>
            <p className="text-text-secondary mb-4">
              We implement industry-standard security measures to protect your information:
            </p>
            <ul className="list-disc pl-6 text-text-secondary mb-4 space-y-2">
              <li>All data is encrypted in transit using TLS/SSL</li>
              <li>Passwords are hashed and never stored in plain text</li>
              <li>Regular security audits and monitoring</li>
              <li>Limited employee access to user data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">5. Data Retention</h2>
            <p className="text-text-secondary mb-4">
              We retain your information for as long as your account is active or as needed to provide services. 
              You can request deletion of your data at any time by contacting us or deleting your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">6. Third-Party Services</h2>
            <p className="text-text-secondary mb-4">We may share information with trusted third parties:</p>
            <ul className="list-disc pl-6 text-text-secondary mb-4 space-y-2">
              <li><strong>Stripe:</strong> For payment processing</li>
              <li><strong>AI Providers:</strong> To process and optimize your resume content</li>
              <li><strong>Analytics:</strong> To understand usage patterns (anonymized data only)</li>
            </ul>
            <p className="text-text-secondary mb-4">
              We do not sell your personal information to third parties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">7. Your Rights</h2>
            <p className="text-text-secondary mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-text-secondary mb-4 space-y-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt out of marketing communications</li>
              <li>Export your data in a portable format</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">8. Cookies</h2>
            <p className="text-text-secondary mb-4">
              We use cookies and similar technologies to maintain your session, remember preferences, 
              and analyze usage. You can control cookie settings through your browser.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">9. Children&apos;s Privacy</h2>
            <p className="text-text-secondary mb-4">
              The Service is not intended for users under 16 years of age. We do not knowingly collect 
              information from children under 16.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">10. Changes to This Policy</h2>
            <p className="text-text-secondary mb-4">
              We may update this Privacy Policy from time to time. We will notify you of significant 
              changes via email or through the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">11. Contact Us</h2>
            <p className="text-text-secondary mb-4">
              If you have questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:privacy@forgecareerai.com" className="text-primary-600 hover:underline">
                privacy@forgecareerai.com
              </a>
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <Link href="/" className="text-primary-600 hover:underline">
            &larr; Back to Home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
