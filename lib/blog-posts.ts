export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  date: string
  dateISO: string
  author: string
  featured?: boolean
  /** Markdown-ish content: paragraphs, ## headings, and - list items. */
  content: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'ultimate-guide-ats-resumes-2026',
    title: 'The Ultimate Guide to ATS-Optimized Resumes in 2026',
    excerpt:
      'Learn how Applicant Tracking Systems work and discover the exact strategies top candidates use to get their resumes seen by hiring managers.',
    category: 'Resume Tips',
    readTime: '12 min read',
    date: 'Jan 15, 2026',
    dateISO: '2026-01-15',
    author: 'Career Team',
    featured: true,
    content: `Most resumes never reach a human. Studies consistently show that the majority of mid-to-large employers use an Applicant Tracking System (ATS) to filter applications before a recruiter ever opens them. If your resume is not built for these systems, it can be rejected in seconds — no matter how qualified you are.

## What an ATS actually does

An ATS is software that collects, parses, and ranks job applications. When you submit a resume, the system extracts your text, breaks it into structured fields (work history, education, skills), and scores it against the job description. Recruiters then search and filter that database, often by keyword.

The two failure points for candidates are parsing (the system cannot read your resume correctly) and ranking (your resume is readable but does not match the job closely enough).

## How to win at parsing

- Use a single-column layout. Multi-column designs, tables, and text boxes frequently get scrambled during parsing.
- Stick to standard section headings like "Experience", "Education", and "Skills". Creative headings confuse the parser.
- Use a common, readable font and standard bullet characters. Avoid images, icons, and logos — they carry no machine-readable text.
- Save as a .docx or a text-based PDF, never a scanned image.

## How to win at ranking

Ranking is about relevance. The closer your language mirrors the job description, the higher you score.

- Mirror the exact phrasing of key skills. If the posting says "project management", do not only write "managed projects" — include the noun phrase.
- Prioritize hard skills and tools. ATS keyword matching rewards specific technologies, certifications, and methodologies.
- Quantify everything. "Increased revenue 23%" outperforms "responsible for revenue growth" with both software and humans.

## The fastest way to check your score

Reading every job description by hand is slow. Running your resume through an ATS checker gives you an instant compatibility score and shows the exact keywords you are missing. Fix those gaps and your callback rate climbs measurably.`,
  },
  {
    slug: 'power-words-resume',
    title: '10 Power Words That Make Your Resume Stand Out',
    excerpt:
      'Discover the action verbs and phrases that catch recruiters attention and showcase your achievements effectively.',
    category: 'Resume Tips',
    readTime: '5 min read',
    date: 'Jan 12, 2026',
    dateISO: '2026-01-12',
    author: 'Career Team',
    content: `Weak verbs make strong candidates look ordinary. Phrases like "responsible for" and "helped with" describe duties, not impact. Power words describe results — and results are what get interviews.

## Why verbs matter

Recruiters skim. In the few seconds they spend on your resume, the first word of each bullet does most of the work. A precise action verb signals ownership and outcome before they even read the rest of the line.

## 10 power words to use

- Spearheaded — for initiatives you started and drove.
- Engineered — for technical solutions you designed.
- Accelerated — for things you made faster or more efficient.
- Generated — for revenue, leads, or measurable output.
- Streamlined — for processes you simplified.
- Negotiated — for deals, contracts, or cross-team agreements.
- Launched — for products, programs, or campaigns.
- Reduced — for costs, errors, or time, always with a number.
- Mentored — for leadership without a formal title.
- Transformed — for large-scale change you led.

## Pair every verb with a number

A power word without a metric is only half the story. "Streamlined onboarding" is good; "Streamlined onboarding, cutting ramp time 40%" is what gets you called.`,
  },
  {
    slug: 'tailor-resume-job-application',
    title: 'How to Tailor Your Resume for Each Job Application',
    excerpt:
      'A step-by-step guide to customizing your resume for specific job descriptions without starting from scratch.',
    category: 'Job Search',
    readTime: '7 min read',
    date: 'Jan 10, 2026',
    dateISO: '2026-01-10',
    author: 'Career Team',
    content: `Sending the same resume to every job is the single most common reason qualified people get filtered out. Tailoring does not mean rewriting from scratch — it means aligning your existing strengths to each role in a few focused minutes.

## Step 1: Extract the keywords

Read the job description and highlight the repeated skills, tools, and responsibilities. The words that appear more than once are the ones the ATS is most likely weighting.

## Step 2: Match honestly

For each key requirement, find a real bullet in your experience that demonstrates it. Adjust the wording to mirror the posting — without ever claiming experience you do not have.

## Step 3: Reorder for relevance

Move your most relevant role and bullets toward the top. Recruiters read top-down, and ATS systems often weight earlier content more heavily.

## Step 4: Rewrite the summary

Your professional summary should read like a direct answer to "why are you right for this specific job". Swap in the role title and the two or three skills the posting emphasizes most.

## Do it in minutes, not hours

This is exactly the kind of repetitive matching that AI does well. A job match scanner can compare your resume to any posting, score the fit, and surface the missing keywords automatically — so tailoring takes minutes instead of an afternoon.`,
  },
  {
    slug: 'top-skills-employers-2026',
    title: 'The Top Skills Employers Are Looking for in 2026',
    excerpt:
      'Research-backed insights into the most in-demand hard and soft skills across industries.',
    category: 'Career Advice',
    readTime: '6 min read',
    date: 'Jan 8, 2026',
    dateISO: '2026-01-08',
    author: 'Career Team',
    content: `The skills that get rewarded shift every year. Listing the right ones — and proving them — is one of the highest-leverage edits you can make to your resume.

## In-demand hard skills

- Data literacy: the ability to read, interpret, and act on data is now expected far beyond analyst roles.
- AI fluency: knowing how to use AI tools to work faster is quickly becoming a baseline expectation.
- Cloud and automation: familiarity with modern tooling signals you can operate in a current tech stack.
- Project and product management: structured delivery skills travel across nearly every industry.

## Soft skills that still win

- Communication: the ability to explain complex work simply.
- Adaptability: comfort with ambiguity and change.
- Collaboration across functions: working with people outside your own team.

## How to show skills, not just list them

A skills section alone is weak proof. Embed your top skills directly into your experience bullets, tied to outcomes: "Used SQL to identify churn drivers, informing a retention campaign that recovered 12% of at-risk accounts."`,
  },
  {
    slug: 'cover-letter-data-analysis',
    title: 'Cover Letter vs No Cover Letter: What the Data Says',
    excerpt:
      'We analyzed how cover letters affect callback rates to find out if they really make a difference.',
    category: 'Research',
    readTime: '4 min read',
    date: 'Jan 5, 2026',
    dateISO: '2026-01-05',
    author: 'Career Team',
    content: `Cover letters feel optional — but the data suggests they still move the needle, especially for competitive roles and career changers.

## When cover letters matter most

- Career changes: a letter explains a non-obvious path that a resume cannot.
- Competitive roles: when many candidates have similar resumes, a letter is a tiebreaker.
- Smaller companies: hiring managers there are more likely to read them.

## When they matter less

For high-volume roles screened almost entirely by ATS, the resume does most of the work. A letter rarely hurts, but a weak, generic one wastes the opportunity.

## The rule of thumb

Always write a tailored letter when one is requested, and when the role is competitive or the company is small. Never send a generic template — a tailored three-paragraph letter beats a long generic one every time.

## Make it fast

Tailoring a letter to each job is tedious by hand. AI can draft a tailored, accurate cover letter from your resume and the job description in seconds, which you then refine in your own voice.`,
  },
  {
    slug: 'explain-employment-gaps',
    title: 'How to Explain Employment Gaps on Your Resume',
    excerpt:
      'Practical strategies for addressing career breaks, layoffs, and other gaps in your work history.',
    category: 'Resume Tips',
    readTime: '6 min read',
    date: 'Jan 3, 2026',
    dateISO: '2026-01-03',
    author: 'Career Team',
    content: `Employment gaps are far more common than they used to be, and most hiring managers know it. The goal is not to hide a gap but to frame it with confidence.

## Lead with what you did

If you upskilled, freelanced, cared for family, or volunteered during the gap, name it. A short line like "Career break — completed a data analytics certificate and freelanced for two clients" turns a question mark into a story.

## Use year-only dates

Switching from month-year to year-only formatting can quietly smooth over short gaps without misrepresenting anything.

## Address it briefly, then move on

You do not owe a detailed explanation on the resume itself. One honest, neutral line is enough; save the fuller story for the interview if asked.

## Keep the focus on value

The strongest counter to a gap is recent, relevant, results-driven experience. Make sure your most impressive accomplishments are easy to find near the top.`,
  },
  {
    slug: 'remote-job-search-tips',
    title: 'Remote Job Search: Resume Tips for 2026',
    excerpt:
      'How to highlight remote work skills and stand out in the competitive remote job market.',
    category: 'Job Search',
    readTime: '5 min read',
    date: 'Jan 1, 2026',
    dateISO: '2026-01-01',
    author: 'Career Team',
    content: `Remote roles attract huge applicant pools, which means the filtering is fierce. Standing out requires proving you can thrive without an office around you.

## Signal remote-readiness

- Name your remote experience explicitly, including "Remote" in the location field of relevant roles.
- Highlight asynchronous communication, written documentation, and self-management.
- Mention the collaboration tools you know — they are often searched keywords.

## Quantify autonomous results

Remote hiring managers care most about output. Bullets that show you delivered measurable results with minimal supervision are the most persuasive.

## Optimize for the keyword flood

Because remote postings draw so many applicants, ATS ranking is even more decisive. Tailor aggressively to each posting and verify your keyword coverage before applying.`,
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export const featuredPost = blogPosts.find((p) => p.featured) ?? blogPosts[0]
export const otherPosts = blogPosts.filter((p) => p.slug !== featuredPost.slug)
