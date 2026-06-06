export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  features: string[]
  popular?: boolean
}

// Resume Optimization Tiers
export const RESUME_PRODUCTS: Product[] = [
  {
    id: 'basic',
    name: 'Basic Optimization',
    description: 'AI-powered resume enhancement with keyword optimization',
    priceInCents: 900, // $9
    features: [
      'AI-powered optimization',
      'Keyword enhancement',
      'ATS compatibility check',
      '1 resume version',
    ],
  },
  {
    id: 'pro',
    name: 'Pro Optimization',
    description: 'Complete resume transformation with cover letter',
    priceInCents: 2900, // $29
    features: [
      'Everything in Basic',
      'Custom cover letter',
      'ATS score analysis',
      '3 resume versions',
      'Priority processing',
    ],
    popular: true,
  },
  {
    id: 'premium',
    name: 'Premium Optimization',
    description: 'Full career package with unlimited revisions',
    priceInCents: 7900, // $79
    features: [
      'Everything in Pro',
      'Unlimited revisions',
      'LinkedIn optimization',
      '1-on-1 review session',
      'Interview prep tips',
      '30-day support',
    ],
  },
]

// Job Posting Products
export const JOB_PRODUCTS: Product[] = [
  {
    id: 'job-basic',
    name: 'Basic Job Posting',
    description: 'Standard job listing for 30 days',
    priceInCents: 4900, // $49
    features: [
      '30-day listing',
      'Basic visibility',
      'Email applications',
      'Company profile',
    ],
  },
  {
    id: 'job-featured',
    name: 'Featured Job Posting',
    description: 'Premium placement with highlighted listing',
    priceInCents: 9900, // $99
    features: [
      '30-day listing',
      'Featured placement',
      'Highlighted in search',
      'Social media promotion',
      'Priority support',
    ],
    popular: true,
  },
  {
    id: 'job-premium',
    name: 'Premium Recruiting',
    description: 'Full recruiting package with candidate matching',
    priceInCents: 19900, // $199
    features: [
      '60-day listing',
      'Featured placement',
      'AI candidate matching',
      'Applicant screening',
      'Dedicated support',
      'Analytics dashboard',
    ],
  },
]

// All products combined
export const ALL_PRODUCTS: Product[] = [...RESUME_PRODUCTS, ...JOB_PRODUCTS]

// Helper function to get product by ID
export function getProductById(productId: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.id === productId)
}

// Helper to format price
export function formatPrice(priceInCents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(priceInCents / 100)
}
