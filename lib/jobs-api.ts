// Live jobs provider layer.
//
// Uses JSearch (RapidAPI) when RAPIDAPI_KEY is configured, aggregating real
// listings from Google for Jobs, LinkedIn, Indeed, ZipRecruiter, and more.
// Falls back to a curated sample dataset so the board is never empty.
//
// Results are cached in-memory to protect the free-tier API quota.

export type ExternalJob = {
  id: string // prefixed external id, e.g. "ext:abc123"
  source: 'live' | 'sample'
  title: string
  company: string
  companyLogo: string | null
  location: string
  locationType: string // remote | hybrid | onsite
  jobType: string // full-time | part-time | contract | internship
  salaryMin: number | null
  salaryMax: number | null
  description: string
  requirements: string | null
  benefits: string | null
  applicationUrl: string | null
  postedAt: string // ISO string
  featured: boolean
}

export type ExternalJobFilters = {
  search?: string
  location?: string
  locationType?: string
  jobType?: string
  salaryMin?: number
  salaryMax?: number
  page?: number
}

const CACHE_TTL_MS = 1000 * 60 * 30 // 30 minutes
const cache = new Map<string, { expires: number; data: ExternalJob[] }>()

function cacheKey(filters: ExternalJobFilters) {
  return JSON.stringify({
    s: filters.search?.toLowerCase().trim() || '',
    l: filters.location?.toLowerCase().trim() || '',
    lt: filters.locationType || '',
    jt: filters.jobType || '',
    p: filters.page || 1,
  })
}

export function isLiveJobsEnabled() {
  return Boolean(process.env.RAPIDAPI_KEY)
}

function mapEmploymentType(t?: string): string {
  switch ((t || '').toUpperCase()) {
    case 'PARTTIME':
      return 'part-time'
    case 'CONTRACTOR':
    case 'CONTRACT':
      return 'contract'
    case 'INTERN':
    case 'INTERNSHIP':
      return 'internship'
    default:
      return 'full-time'
  }
}

function deriveLocationType(j: any): string {
  if (j.job_is_remote) return 'remote'
  const text = `${j.job_title || ''} ${j.job_description || ''}`.toLowerCase()
  if (text.includes('hybrid')) return 'hybrid'
  return 'onsite'
}

function buildLocation(j: any): string {
  if (j.job_is_remote) return 'Remote'
  const parts = [j.job_city, j.job_state, j.job_country].filter(Boolean)
  return parts.join(', ') || 'Location not specified'
}

function normalizeSalary(j: any): { min: number | null; max: number | null } {
  let min = j.job_min_salary ?? null
  let max = j.job_max_salary ?? null
  const period = (j.job_salary_period || '').toUpperCase()
  // Convert hourly/monthly to approximate annual for consistent display.
  const factor = period === 'HOUR' ? 2080 : period === 'MONTH' ? 12 : period === 'WEEK' ? 52 : 1
  if (min) min = Math.round(min * factor)
  if (max) max = Math.round(max * factor)
  return { min, max }
}

async function fetchFromJSearch(filters: ExternalJobFilters): Promise<ExternalJob[]> {
  const query = [filters.search, filters.location].filter(Boolean).join(' in ') || 'software engineer'
  const params = new URLSearchParams({
    query,
    page: String(filters.page || 1),
    num_pages: '1',
  })
  if (filters.locationType === 'remote') params.set('remote_jobs_only', 'true')
  if (filters.jobType) {
    const map: Record<string, string> = {
      'full-time': 'FULLTIME',
      'part-time': 'PARTTIME',
      contract: 'CONTRACTOR',
      internship: 'INTERN',
    }
    if (map[filters.jobType]) params.set('employment_types', map[filters.jobType])
  }

  // Bound the external call so a slow upstream never hangs the request;
  // on timeout we throw and the caller falls back to sample jobs.
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 6000)

  let res: Response
  try {
    res = await fetch(`https://jsearch.p.rapidapi.com/search?${params.toString()}`, {
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY as string,
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
      },
      signal: controller.signal,
      // Next.js fetch caching as a second layer.
      next: { revalidate: 1800 },
    })
  } finally {
    clearTimeout(timeout)
  }

  if (!res.ok) {
    throw new Error(`JSearch request failed: ${res.status}`)
  }

  const json = await res.json()
  const data: any[] = json.data || []

  return data.map((j) => {
    const { min, max } = normalizeSalary(j)
    return {
      id: `ext:${j.job_id}`,
      source: 'live' as const,
      title: j.job_title || 'Untitled role',
      company: j.employer_name || 'Company',
      companyLogo: j.employer_logo || null,
      location: buildLocation(j),
      locationType: deriveLocationType(j),
      jobType: mapEmploymentType(j.job_employment_type),
      salaryMin: min,
      salaryMax: max,
      description: j.job_description || '',
      requirements: Array.isArray(j.job_highlights?.Qualifications)
        ? j.job_highlights.Qualifications.join('\n')
        : null,
      benefits: Array.isArray(j.job_highlights?.Benefits) ? j.job_highlights.Benefits.join('\n') : null,
      applicationUrl: j.job_apply_link || null,
      postedAt: j.job_posted_at_datetime_utc || new Date().toISOString(),
      featured: false,
    }
  })
}

function filterSampleJobs(filters: ExternalJobFilters): ExternalJob[] {
  let jobs = [...SAMPLE_JOBS]
  if (filters.search) {
    const q = filters.search.toLowerCase()
    jobs = jobs.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.description.toLowerCase().includes(q)
    )
  }
  if (filters.location) {
    const q = filters.location.toLowerCase()
    jobs = jobs.filter((j) => j.location.toLowerCase().includes(q))
  }
  if (filters.locationType) {
    jobs = jobs.filter((j) => j.locationType === filters.locationType)
  }
  if (filters.jobType) {
    jobs = jobs.filter((j) => j.jobType === filters.jobType)
  }
  if (filters.salaryMin) {
    jobs = jobs.filter((j) => (j.salaryMax || j.salaryMin || 0) >= filters.salaryMin!)
  }
  return jobs
}

export async function fetchExternalJobs(filters: ExternalJobFilters = {}): Promise<ExternalJob[]> {
  const key = cacheKey(filters)
  const cached = cache.get(key)
  if (cached && cached.expires > Date.now()) {
    return cached.data
  }

  let data: ExternalJob[]
  if (isLiveJobsEnabled()) {
    try {
      data = await fetchFromJSearch(filters)
      // If live returns nothing (rare for niche queries), pad with samples.
      if (data.length === 0) data = filterSampleJobs(filters)
    } catch (err) {
      console.error('[v0] JSearch fetch failed, using sample jobs:', err)
      data = filterSampleJobs(filters)
    }
  } else {
    data = filterSampleJobs(filters)
  }

  cache.set(key, { expires: Date.now() + CACHE_TTL_MS, data })
  return data
}

export async function fetchExternalJobById(id: string): Promise<ExternalJob | null> {
  // Search across all cached pages first.
  for (const entry of cache.values()) {
    const found = entry.data.find((j) => j.id === id)
    if (found) return found
  }

  const rawId = id.replace(/^ext:/, '')

  if (isLiveJobsEnabled()) {
    try {
      const res = await fetch(
        `https://jsearch.p.rapidapi.com/job-details?job_id=${encodeURIComponent(rawId)}`,
        {
          headers: {
            'X-RapidAPI-Key': process.env.RAPIDAPI_KEY as string,
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
          },
          next: { revalidate: 1800 },
        }
      )
      if (res.ok) {
        const json = await res.json()
        const j = (json.data || [])[0]
        if (j) {
          const { min, max } = normalizeSalary(j)
          return {
            id: `ext:${j.job_id}`,
            source: 'live',
            title: j.job_title || 'Untitled role',
            company: j.employer_name || 'Company',
            companyLogo: j.employer_logo || null,
            location: buildLocation(j),
            locationType: deriveLocationType(j),
            jobType: mapEmploymentType(j.job_employment_type),
            salaryMin: min,
            salaryMax: max,
            description: j.job_description || '',
            requirements: Array.isArray(j.job_highlights?.Qualifications)
              ? j.job_highlights.Qualifications.join('\n')
              : null,
            benefits: Array.isArray(j.job_highlights?.Benefits)
              ? j.job_highlights.Benefits.join('\n')
              : null,
            applicationUrl: j.job_apply_link || null,
            postedAt: j.job_posted_at_datetime_utc || new Date().toISOString(),
            featured: false,
          }
        }
      }
    } catch (err) {
      console.error('[v0] JSearch detail fetch failed:', err)
    }
  }

  return SAMPLE_JOBS.find((j) => j.id === id) || null
}

// Curated fallback dataset — realistic listings so the board is never empty
// before a RAPIDAPI_KEY is added.
const daysAgo = (n: number) => new Date(Date.now() - n * 86400000).toISOString()

const SAMPLE_JOBS: ExternalJob[] = [
  {
    id: 'ext:sample-1',
    source: 'sample',
    title: 'Senior Full-Stack Engineer',
    company: 'Linear',
    companyLogo: null,
    location: 'Remote',
    locationType: 'remote',
    jobType: 'full-time',
    salaryMin: 160000,
    salaryMax: 220000,
    description:
      'We are looking for a Senior Full-Stack Engineer to build delightful, fast product experiences. You will own features end-to-end across our React/TypeScript frontend and Node.js services, collaborating closely with design and product.',
    requirements:
      '5+ years building production web apps\nExpert in React, TypeScript, and Node.js\nExperience with Postgres and event-driven systems\nStrong product sense and attention to detail',
    benefits: 'Top-of-market salary\nEquity\nRemote-first\nHome office stipend',
    applicationUrl: 'https://example.com/apply',
    postedAt: daysAgo(1),
    featured: true,
  },
  {
    id: 'ext:sample-2',
    source: 'sample',
    title: 'Product Manager, Growth',
    company: 'Gusto',
    companyLogo: null,
    location: 'San Francisco, CA',
    locationType: 'hybrid',
    jobType: 'full-time',
    salaryMin: 140000,
    salaryMax: 185000,
    description:
      'Drive growth initiatives across activation, retention, and monetization. Partner with engineering and data science to ship experiments that move core metrics.',
    requirements:
      '4+ years in product management\nProven track record of growth experiments\nStrong analytical and SQL skills\nExcellent communication',
    benefits: 'Comprehensive health coverage\n401k match\nHybrid schedule',
    applicationUrl: 'https://example.com/apply',
    postedAt: daysAgo(2),
    featured: false,
  },
  {
    id: 'ext:sample-3',
    source: 'sample',
    title: 'Frontend Engineer (React)',
    company: 'Northbeam',
    companyLogo: null,
    location: 'New York, NY',
    locationType: 'onsite',
    jobType: 'full-time',
    salaryMin: 130000,
    salaryMax: 170000,
    description:
      'Build the data visualization layer of our marketing analytics platform. Turn complex datasets into intuitive, performant dashboards.',
    requirements:
      '3+ years with React and TypeScript\nExperience with charting libraries\nCSS and accessibility expertise',
    benefits: 'Equity\nCatered lunches\nLearning budget',
    applicationUrl: 'https://example.com/apply',
    postedAt: daysAgo(3),
    featured: false,
  },
  {
    id: 'ext:sample-4',
    source: 'sample',
    title: 'Data Scientist',
    company: 'Lumen Health',
    companyLogo: null,
    location: 'Remote',
    locationType: 'remote',
    jobType: 'full-time',
    salaryMin: 145000,
    salaryMax: 195000,
    description:
      'Apply machine learning to improve patient outcomes. Build predictive models and partner with clinical teams to deploy them responsibly.',
    requirements:
      'MS/PhD in a quantitative field\nStrong Python and ML fundamentals\nExperience with healthcare data a plus',
    benefits: 'Remote-first\nMeaningful mission\nGenerous PTO',
    applicationUrl: 'https://example.com/apply',
    postedAt: daysAgo(4),
    featured: false,
  },
  {
    id: 'ext:sample-5',
    source: 'sample',
    title: 'DevOps / Platform Engineer',
    company: 'Vercel',
    companyLogo: null,
    location: 'Remote',
    locationType: 'remote',
    jobType: 'full-time',
    salaryMin: 150000,
    salaryMax: 210000,
    description:
      'Own and scale our cloud infrastructure. Improve developer velocity through robust CI/CD, observability, and infrastructure-as-code.',
    requirements:
      'Deep experience with AWS or GCP\nKubernetes and Terraform\nStrong scripting (Go/Python)\nOn-call ownership mindset',
    benefits: 'Equity\nRemote\nHardware budget',
    applicationUrl: 'https://example.com/apply',
    postedAt: daysAgo(5),
    featured: true,
  },
  {
    id: 'ext:sample-6',
    source: 'sample',
    title: 'UX/Product Designer',
    company: 'Figma',
    companyLogo: null,
    location: 'San Francisco, CA',
    locationType: 'hybrid',
    jobType: 'full-time',
    salaryMin: 135000,
    salaryMax: 180000,
    description:
      'Shape the end-to-end experience of our flagship product. Lead design from research through high-fidelity prototypes and shipped features.',
    requirements:
      '5+ years in product design\nStrong portfolio\nProficiency in Figma\nExperience running user research',
    benefits: 'Equity\nDesign tooling budget\nHybrid',
    applicationUrl: 'https://example.com/apply',
    postedAt: daysAgo(6),
    featured: false,
  },
  {
    id: 'ext:sample-7',
    source: 'sample',
    title: 'Marketing Manager',
    company: 'Ramp',
    companyLogo: null,
    location: 'Austin, TX',
    locationType: 'onsite',
    jobType: 'full-time',
    salaryMin: 110000,
    salaryMax: 150000,
    description:
      'Lead integrated marketing campaigns across paid, content, and lifecycle. Own the funnel from awareness to conversion.',
    requirements:
      '4+ years in B2B marketing\nData-driven mindset\nExcellent writing\nExperience with marketing automation',
    benefits: 'Bonus\n401k\nGym membership',
    applicationUrl: 'https://example.com/apply',
    postedAt: daysAgo(7),
    featured: false,
  },
  {
    id: 'ext:sample-8',
    source: 'sample',
    title: 'Backend Engineer (Go)',
    company: 'Stripe',
    companyLogo: null,
    location: 'Remote',
    locationType: 'remote',
    jobType: 'full-time',
    salaryMin: 155000,
    salaryMax: 205000,
    description:
      'Build reliable, high-throughput payment systems. Design APIs used by millions of businesses worldwide.',
    requirements:
      '5+ years backend engineering\nExpertise in Go or similar\nDistributed systems experience\nStrong testing discipline',
    benefits: 'Equity\nRemote\nLearning stipend',
    applicationUrl: 'https://example.com/apply',
    postedAt: daysAgo(8),
    featured: false,
  },
  {
    id: 'ext:sample-9',
    source: 'sample',
    title: 'Customer Success Manager',
    company: 'Notion',
    companyLogo: null,
    location: 'Remote',
    locationType: 'remote',
    jobType: 'full-time',
    salaryMin: 90000,
    salaryMax: 125000,
    description:
      'Own a portfolio of enterprise accounts. Drive adoption, retention, and expansion through strategic relationships.',
    requirements:
      '3+ years in customer success\nSaaS experience\nStrong relationship management\nData-informed approach',
    benefits: 'Commission\nRemote\nWellness budget',
    applicationUrl: 'https://example.com/apply',
    postedAt: daysAgo(9),
    featured: false,
  },
  {
    id: 'ext:sample-10',
    source: 'sample',
    title: 'Engineering Manager',
    company: 'Datadog',
    companyLogo: null,
    location: 'New York, NY',
    locationType: 'hybrid',
    jobType: 'full-time',
    salaryMin: 190000,
    salaryMax: 250000,
    description:
      'Lead and grow a team of engineers building our observability platform. Balance people leadership with technical direction.',
    requirements:
      '2+ years managing engineers\nStrong technical background\nExperience scaling teams\nExcellent communication',
    benefits: 'Equity\nHybrid\n401k match',
    applicationUrl: 'https://example.com/apply',
    postedAt: daysAgo(10),
    featured: true,
  },
  {
    id: 'ext:sample-11',
    source: 'sample',
    title: 'Junior Software Engineer',
    company: 'Webflow',
    companyLogo: null,
    location: 'Remote',
    locationType: 'remote',
    jobType: 'full-time',
    salaryMin: 95000,
    salaryMax: 125000,
    description:
      'Join our platform team and grow your craft. Work on real features with mentorship from senior engineers.',
    requirements:
      '1+ years experience or strong projects\nFamiliarity with JavaScript/React\nEagerness to learn',
    benefits: 'Mentorship\nRemote\nLearning budget',
    applicationUrl: 'https://example.com/apply',
    postedAt: daysAgo(11),
    featured: false,
  },
  {
    id: 'ext:sample-12',
    source: 'sample',
    title: 'Sales Development Representative',
    company: 'Airtable',
    companyLogo: null,
    location: 'Austin, TX',
    locationType: 'onsite',
    jobType: 'full-time',
    salaryMin: 65000,
    salaryMax: 90000,
    description:
      'Generate and qualify pipeline for our enterprise sales team. Be the first point of contact for prospective customers.',
    requirements:
      '1+ years in sales or SDR role\nExcellent communication\nResilience and drive\nCRM familiarity',
    benefits: 'Commission\nClear promotion path\n401k',
    applicationUrl: 'https://example.com/apply',
    postedAt: daysAgo(12),
    featured: false,
  },
]
