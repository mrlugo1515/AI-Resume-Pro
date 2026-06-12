// Local, explainable job-match scoring.
//
// Scores a job listing against a candidate's resume text without an AI call,
// so we can rank an entire board instantly and for free. The score blends
// keyword overlap, title relevance, and seniority alignment.

const STOP_WORDS = new Set([
  'the', 'and', 'for', 'with', 'you', 'your', 'our', 'are', 'will', 'this', 'that', 'have', 'has',
  'from', 'into', 'about', 'their', 'they', 'them', 'who', 'what', 'when', 'where', 'how', 'why',
  'a', 'an', 'to', 'of', 'in', 'on', 'at', 'by', 'as', 'is', 'be', 'or', 'we', 'us', 'it', 'its',
  'work', 'working', 'experience', 'years', 'year', 'team', 'teams', 'role', 'job', 'company',
  'looking', 'join', 'help', 'build', 'building', 'including', 'across', 'using', 'strong', 'plus',
  'etc', 'more', 'than', 'all', 'new', 'well', 'within', 'per', 'must', 'should', 'able', 'like',
])

// Common tech/skill tokens we want to weight heavily when present.
const SKILL_TOKENS = new Set([
  'react', 'typescript', 'javascript', 'node', 'nodejs', 'python', 'go', 'golang', 'java', 'rust',
  'aws', 'gcp', 'azure', 'kubernetes', 'docker', 'terraform', 'postgres', 'postgresql', 'mysql',
  'redis', 'graphql', 'rest', 'api', 'sql', 'nosql', 'mongodb', 'next', 'nextjs', 'vue', 'angular',
  'svelte', 'tailwind', 'css', 'html', 'figma', 'design', 'product', 'marketing', 'sales', 'seo',
  'analytics', 'ml', 'machine', 'learning', 'ai', 'data', 'devops', 'ci', 'cd', 'agile', 'scrum',
  'leadership', 'management', 'stakeholder', 'roadmap', 'kpi', 'saas', 'b2b', 'b2c', 'crm',
])

const SENIORITY = ['intern', 'junior', 'mid', 'senior', 'staff', 'principal', 'lead', 'director', 'vp', 'head']

function tokenize(text: string): string[] {
  return (text || '')
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP_WORDS.has(t))
}

function keywordSet(text: string): Set<string> {
  return new Set(tokenize(text))
}

function detectSeniority(text: string): number {
  const t = text.toLowerCase()
  for (let i = SENIORITY.length - 1; i >= 0; i--) {
    if (t.includes(SENIORITY[i])) return i
  }
  return 2 // default to "mid"
}

export type MatchResult = {
  score: number // 0-100
  matchedKeywords: string[]
  missingKeywords: string[]
  titleMatch: boolean
  reason: string
}

export function scoreJobMatch(
  resumeText: string,
  job: { title: string; description: string; requirements?: string | null }
): MatchResult {
  if (!resumeText || resumeText.trim().length < 20) {
    return {
      score: 0,
      matchedKeywords: [],
      missingKeywords: [],
      titleMatch: false,
      reason: 'Add a resume to see how well you match this role.',
    }
  }

  const resumeTokens = keywordSet(resumeText)
  const jobText = `${job.title} ${job.requirements || ''} ${job.description}`
  const jobTokens = tokenize(jobText)

  // Build a weighted set of the job's most important keywords (dedup, prefer skills).
  const jobKeywords = Array.from(new Set(jobTokens))
  const skillKeywords = jobKeywords.filter((t) => SKILL_TOKENS.has(t))
  const importantKeywords = skillKeywords.length >= 4 ? skillKeywords : jobKeywords.slice(0, 24)

  const matched: string[] = []
  const missing: string[] = []
  let weightTotal = 0
  let weightMatched = 0

  for (const kw of importantKeywords) {
    const weight = SKILL_TOKENS.has(kw) ? 2 : 1
    weightTotal += weight
    if (resumeTokens.has(kw)) {
      weightMatched += weight
      matched.push(kw)
    } else {
      missing.push(kw)
    }
  }

  const keywordScore = weightTotal > 0 ? weightMatched / weightTotal : 0

  // Title relevance: do any meaningful title tokens appear in the resume?
  const titleTokens = tokenize(job.title).filter((t) => !SENIORITY.includes(t))
  const titleHits = titleTokens.filter((t) => resumeTokens.has(t)).length
  const titleMatch = titleTokens.length > 0 && titleHits / titleTokens.length >= 0.4

  // Seniority alignment: penalize large gaps between resume and job level.
  const resumeSeniority = detectSeniority(resumeText)
  const jobSeniority = detectSeniority(job.title)
  const seniorityGap = Math.abs(resumeSeniority - jobSeniority)
  const seniorityScore = Math.max(0, 1 - seniorityGap * 0.15)

  // Blend: keywords 70%, title 15%, seniority 15%.
  const raw = keywordScore * 0.7 + (titleMatch ? 0.15 : titleHits > 0 ? 0.07 : 0) + seniorityScore * 0.15
  const score = Math.round(Math.min(100, Math.max(0, raw * 100)))

  let reason: string
  if (score >= 80) reason = 'Excellent match — your experience aligns strongly with this role.'
  else if (score >= 60) reason = 'Good match — you cover most of the key requirements.'
  else if (score >= 40) reason = 'Partial match — tailor your resume to close a few gaps.'
  else reason = 'Stretch role — significant gaps, but worth a tailored application.'

  return {
    score,
    matchedKeywords: matched.slice(0, 12),
    missingKeywords: missing.filter((k) => SKILL_TOKENS.has(k) || k.length > 3).slice(0, 8),
    titleMatch,
    reason,
  }
}
