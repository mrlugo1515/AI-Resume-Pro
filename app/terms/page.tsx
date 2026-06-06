import Link from 'next/link'
import { LandingHeader } from '@/components/landing-header'
import { Footer } from '@/components/footer'

export const metadata = {
  title: 'Terms of Service - ForgeCareerAI',
  description: 'Terms of Service for ForgeCareerAI resume optimization platform.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      
      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-text-primary mb-8">Terms of Service</h1>
        <p className="text-text-secondary mb-8">Last updated: January 2024</p>
        
        <div className="prose prose-zinc max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">1. Acceptance of Terms</h2>
            <p className="text-text-secondary mb-4">
              By accessing and using ForgeCareerAI (&quot;the Service&quot;), you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">2. Description of Service</h2>
            <p className="text-text-secondary mb-4">
              ForgeCareerAI provides AI-powered resume optimization, cover letter generation, and job search services. 
              We use artificial intelligence to analyze and improve your resume content for better ATS compatibility 
              and increased interview chances.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">3. User Accounts</h2>
            <p className="text-text-secondary mb-4">
              To use certain features of the Service, you must create an account. You are responsible for:
            </p>
            <ul className="list-disc pl-6 text-text-secondary mb-4 space-y-2">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Providing accurate and complete registration information</li>
              <li>Notifying us immediately of any unauthorized use of your account</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">4. User Content</h2>
            <p className="text-text-secondary mb-4">
              You retain ownership of all content you submit to the Service, including resumes and cover letters. 
              By submitting content, you grant us a limited license to process and optimize your content for the 
              purpose of providing the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">5. Payment Terms</h2>
            <p className="text-text-secondary mb-4">
              Certain features of the Service require payment. By purchasing a plan, you agree to pay the 
              applicable fees. All payments are processed securely through Stripe. Refunds may be available 
              within 7 days of purchase if you are not satisfied with the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">6. Prohibited Uses</h2>
            <p className="text-text-secondary mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 text-text-secondary mb-4 space-y-2">
              <li>Use the Service for any illegal purpose</li>
              <li>Submit false or misleading information</li>
              <li>Attempt to reverse engineer or copy the Service</li>
              <li>Use the Service to harass or harm others</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">7. Disclaimer of Warranties</h2>
            <p className="text-text-secondary mb-4">
              The Service is provided &quot;as is&quot; without warranties of any kind. We do not guarantee that the 
              Service will result in job offers or interviews. Results may vary based on individual circumstances.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">8. Limitation of Liability</h2>
            <p className="text-text-secondary mb-4">
              ForgeCareerAI shall not be liable for any indirect, incidental, special, or consequential damages 
              arising from your use of the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">9. Changes to Terms</h2>
            <p className="text-text-secondary mb-4">
              We reserve the right to modify these terms at any time. We will notify users of significant changes 
              via email or through the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">10. Contact Us</h2>
            <p className="text-text-secondary mb-4">
              If you have questions about these Terms, please contact us at{' '}
              <a href="mailto:support@forgecareerai.com" className="text-primary-600 hover:underline">
                support@forgecareerai.com
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
