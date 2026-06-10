'use client'

import { useMemo, Fragment, type ReactNode } from 'react'

interface ResumeDocumentProps {
  content: string
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

// Strip surrounding markdown markers from a whole line (e.g. **EXPERIENCE** -> EXPERIENCE)
function stripWrappingMarkers(text: string): string {
  return text.replace(/^\s*\*{1,3}\s*/, '').replace(/\s*\*{1,3}\s*$/, '').trim()
}

// Render inline markdown (**bold** and *italic*) into React nodes
function renderInline(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean)
  return parts.map((part, i) => {
    if (/^\*\*[^*]+\*\*$/.test(part)) {
      return (
        <strong key={i} className="font-semibold text-zinc-900">
          {part.slice(2, -2)}
        </strong>
      )
    }
    if (/^\*[^*]+\*$/.test(part)) {
      return (
        <em key={i} className="text-zinc-700">
          {part.slice(1, -1)}
        </em>
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

export function ResumeDocument({ content }: ResumeDocumentProps) {
  const lines = useMemo(() => parseResume(content), [content])

  return (
    <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
      <div className="mx-auto max-w-3xl px-8 py-10 sm:px-12 sm:py-12 font-serif text-zinc-800 leading-relaxed">
        {lines.map((line, i) => {
          switch (line.type) {
            case 'name':
              return (
                <h1
                  key={i}
                  className="text-3xl font-bold tracking-tight text-zinc-900 text-center"
                >
                  {line.text}
                </h1>
              )
            case 'contact':
              return (
                <p
                  key={i}
                  className="mt-2 text-center text-sm text-zinc-500 font-sans"
                >
                  {line.text}
                </p>
              )
            case 'heading':
              return (
                <h2
                  key={i}
                  className="mt-7 mb-3 text-sm font-bold uppercase tracking-widest text-primary-700 border-b-2 border-primary-200 pb-1 font-sans"
                >
                  {line.text}
                </h2>
              )
            case 'subheading':
              return (
                <p key={i} className="mt-3 font-semibold text-zinc-900">
                  {renderInline(line.text)}
                </p>
              )
            case 'bullet':
              return (
                <div key={i} className="flex gap-2.5 mt-1.5 pl-1">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" />
                  <span className="text-[15px]">{renderInline(line.text)}</span>
                </div>
              )
            case 'text':
              return (
                <p key={i} className="mt-1.5 text-[15px]">
                  {renderInline(line.text)}
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
