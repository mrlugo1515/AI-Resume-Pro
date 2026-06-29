'use client'

import { useMemo, Fragment, type ReactNode } from 'react'

export type ResumeTemplate = 'classic' | 'modern' | 'minimal'

interface ResumeDocumentProps {
  content: string
  template?: ResumeTemplate
}

type Line =
  | { type: 'name'; text: string }
  | { type: 'contact'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'bullet'; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'text'; text: string }
  | { type: 'divider' }
  | { type: 'spacer' }

// Per-template class definitions. Each template restyles the same parsed lines.
interface TemplateStyles {
  container: string
  fontClass: string
  name: string
  contact: string
  heading: string
  subheading: string
  bulletDot: string
  bulletText: string
  text: string
  strong: string
}

const TEMPLATES: Record<ResumeTemplate, TemplateStyles> = {
  classic: {
    container: 'px-8 py-10 sm:px-12 sm:py-12 text-zinc-800 leading-relaxed',
    fontClass: 'font-serif',
    name: 'text-3xl font-bold tracking-tight text-zinc-900 text-center',
    contact: 'mt-2 text-center text-sm text-zinc-500 font-sans',
    heading:
      'mt-7 mb-3 text-sm font-bold uppercase tracking-widest text-primary-700 border-b-2 border-primary-200 pb-1 font-sans',
    subheading: 'mt-3 font-semibold text-zinc-900',
    bulletDot: 'mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500',
    bulletText: 'text-[15px]',
    text: 'mt-1.5 text-[15px]',
    strong: 'font-semibold text-zinc-900',
  },
  modern: {
    container: 'px-8 py-10 sm:px-12 sm:py-12 text-zinc-700 leading-relaxed',
    fontClass: 'font-sans',
    name: 'text-4xl font-extrabold tracking-tight text-zinc-900',
    contact: 'mt-2 text-sm text-primary-600 font-medium',
    heading:
      'mt-8 mb-3 text-xs font-bold uppercase tracking-[0.2em] text-white bg-primary-600 inline-block px-3 py-1 rounded-md',
    subheading: 'mt-4 font-bold text-zinc-900 text-[15px]',
    bulletDot: 'mt-[7px] h-2 w-2 flex-shrink-0 rounded-sm bg-primary-500 rotate-45',
    bulletText: 'text-[15px]',
    text: 'mt-1.5 text-[15px]',
    strong: 'font-bold text-primary-700',
  },
  minimal: {
    container: 'px-8 py-10 sm:px-14 sm:py-14 text-zinc-700 leading-relaxed',
    fontClass: 'font-sans',
    name: 'text-2xl font-medium tracking-wide text-zinc-900 uppercase',
    contact: 'mt-2 text-xs text-zinc-400 tracking-wide',
    heading:
      'mt-9 mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400',
    subheading: 'mt-3 font-medium text-zinc-900',
    bulletDot: 'mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-zinc-400',
    bulletText: 'text-sm text-zinc-600',
    text: 'mt-1.5 text-sm text-zinc-600',
    strong: 'font-semibold text-zinc-900',
  },
}

// Strip surrounding markdown markers from a whole line so headings/names render
// cleanly (e.g. "### Jordan Lee" -> "Jordan Lee", "**EXPERIENCE**" -> "EXPERIENCE")
function stripWrappingMarkers(text: string): string {
  return text
    .replace(/^\s*#{1,6}\s*/, '') // leading markdown heading hashes
    .replace(/^\s*\*{1,3}\s*/, '')
    .replace(/\s*\*{1,3}\s*$/, '')
    .trim()
}

// Render inline markdown (**bold**, *italic*, and [label](url) links) into React nodes
function renderInline(text: string, strongClass: string): ReactNode {
  const parts = text
    .split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g)
    .filter(Boolean)
  return parts.map((part, i) => {
    if (/^\*\*[^*]+\*\*$/.test(part)) {
      return (
        <strong key={i} className={strongClass}>
          {part.slice(2, -2)}
        </strong>
      )
    }
    if (/^\*[^*]+\*$/.test(part)) {
      return (
        <em key={i} className="text-zinc-600">
          {part.slice(1, -1)}
        </em>
      )
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link) {
      return (
        <a
          key={i}
          href={link[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-600 hover:underline print:text-inherit print:no-underline"
        >
          {link[1]}
        </a>
      )
    }
    return <Fragment key={i}>{part}</Fragment>
  })
}

// True if the entire line is wrapped in bold markers, e.g. **EXPERIENCE**
function isBoldOnlyLine(text: string): boolean {
  return /^\*\*[^*]+\*\*$/.test(text.trim())
}

// Common resume section headings used to detect section titles
const SECTION_KEYWORDS = [
  'summary',
  'objective',
  'professional summary',
  'experience',
  'work experience',
  'professional experience',
  'employment',
  'education',
  'skills',
  'technical skills',
  'core competencies',
  'projects',
  'certifications',
  'awards',
  'achievements',
  'publications',
  'languages',
  'interests',
  'volunteer',
  'references',
  'contact',
]

function isSectionHeading(raw: string): boolean {
  const trimmed = raw.trim()
  if (!trimmed || trimmed.length > 40) return false
  const normalized = stripWrappingMarkers(trimmed)
    .replace(/[:|]+$/, '')
    .trim()
    .toLowerCase()
  const plain = stripWrappingMarkers(trimmed).replace(/[:|]+$/, '').trim()
  // ALL CAPS short lines are almost always section headers
  const isAllCaps =
    plain === plain.toUpperCase() &&
    /[A-Z]/.test(plain) &&
    plain.split(' ').length <= 4
  return SECTION_KEYWORDS.includes(normalized) || isAllCaps
}

function looksLikeContact(raw: string): boolean {
  return (
    /@/.test(raw) ||
    /\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(raw) ||
    /linkedin\.com|github\.com|https?:\/\//i.test(raw) ||
    /\|/.test(raw)
  )
}

function parseResume(content: string): Line[] {
  const rawLines = content.split('\n')
  const lines: Line[] = []
  let nameAssigned = false
  let contactAssigned = false

  for (let i = 0; i < rawLines.length; i++) {
    const raw = rawLines[i]
    const trimmed = raw.trim()

    if (!trimmed) {
      // Collapse consecutive blanks into a single spacer
      if (lines.length && lines[lines.length - 1].type !== 'spacer') {
        lines.push({ type: 'spacer' })
      }
      continue
    }

    // Markdown horizontal rule -> divider
    if (/^([-*_]\s?){3,}$/.test(trimmed)) {
      lines.push({ type: 'divider' })
      continue
    }

    // First non-empty line is the candidate's name
    if (!nameAssigned) {
      lines.push({ type: 'name', text: stripWrappingMarkers(trimmed) })
      nameAssigned = true
      continue
    }

    // The line right after the name, if it looks like contact info
    if (nameAssigned && !contactAssigned && looksLikeContact(trimmed)) {
      lines.push({ type: 'contact', text: stripWrappingMarkers(trimmed) })
      contactAssigned = true
      continue
    }

    // Markdown headings (# Heading or ## Heading)
    if (/^#{1,6}\s+/.test(trimmed)) {
      lines.push({
        type: 'heading',
        text: trimmed.replace(/^#{1,6}\s+/, '').replace(/[:|]+$/, '').trim(),
      })
      contactAssigned = true
      continue
    }

    if (isSectionHeading(trimmed)) {
      lines.push({
        type: 'heading',
        text: stripWrappingMarkers(trimmed).replace(/[:|]+$/, '').trim(),
      })
      contactAssigned = true
      continue
    }

    // Bullet detection (markdown -, *, + or unicode bullets)
    if (/^[-•*+▪◦‣·]\s+/.test(trimmed) || /^\d+\.\s+/.test(trimmed)) {
      lines.push({
        type: 'bullet',
        text: trimmed.replace(/^[-•*+▪◦‣·]\s+/, '').replace(/^\d+\.\s+/, ''),
      })
      continue
    }

    // A whole line wrapped in bold markers -> subheading (e.g. a role title)
    if (isBoldOnlyLine(trimmed)) {
      lines.push({ type: 'subheading', text: stripWrappingMarkers(trimmed) })
      continue
    }

    // Lines with a date range or "at Company" pattern -> subheading (job/role)
    if (
      /\b(19|20)\d{2}\b\s*[-–—]\s*((19|20)\d{2}|present|current)/i.test(trimmed) ||
      (/\bat\b.+/i.test(trimmed) && trimmed.length < 80)
    ) {
      lines.push({ type: 'subheading', text: trimmed })
      continue
    }

    lines.push({ type: 'text', text: trimmed })
  }

  return lines
}

export function ResumeDocument({ content, template = 'classic' }: ResumeDocumentProps) {
  const lines = useMemo(() => parseResume(content), [content])
  const s = TEMPLATES[template] ?? TEMPLATES.classic

  return (
    <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden print:rounded-none print:border-0 print:shadow-none">
      <div className={`mx-auto max-w-3xl ${s.container} ${s.fontClass}`}>
        {lines.map((line, i) => {
          switch (line.type) {
            case 'name':
              return (
                <h1 key={i} className={s.name}>
                  {line.text}
                </h1>
              )
            case 'contact':
              return (
                <p key={i} className={s.contact}>
                  {renderInline(line.text, s.strong)}
                </p>
              )
            case 'heading':
              return (
                <h2 key={i} className={s.heading}>
                  {line.text}
                </h2>
              )
            case 'subheading':
              return (
                <p key={i} className={`resume-subheading ${s.subheading}`}>
                  {renderInline(line.text, s.strong)}
                </p>
              )
            case 'bullet':
              return (
                <div key={i} className="resume-bullet flex gap-2.5 mt-1.5 pl-1">
                  <span className={s.bulletDot} />
                  <span className={s.bulletText}>{renderInline(line.text, s.strong)}</span>
                </div>
              )
            case 'text':
              return (
                <p key={i} className={s.text}>
                  {renderInline(line.text, s.strong)}
                </p>
              )
            case 'divider':
              return <hr key={i} className="my-5 border-t border-zinc-200" />
            case 'spacer':
              return <div key={i} className="h-3" />
            default:
              return null
          }
        })}
      </div>
    </div>
  )
}
