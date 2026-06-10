export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'quote'; text: string }

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  date: string
  author: string
  /** ISO date for metadata / structured data */
  published: string
  featured?: boolean
  content: ContentBlock[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'ultimate-guide-ats-resumes-2024',
    title: 'The Ultimate Guide to ATS-Optimized Resumes in 2024',
    excerpt:
      'Learn how Applicant Tracking Systems work and discover the exact strategies top candidates use to get their resumes seen by hiring managers.',
    category: 'Resume Tips',
    readTime: '12 min read',
    date: 'Jan 15, 2024',
    author: 'Career Team',
    published: '2024-01-15',
    featured: true,
    content: [
      {
        type: 'paragraph',
        text: 'More than 90% of large companies use an Applicant Tracking System (ATS) to filter resumes before a human ever sees them. If your resume is not formatted in a way these systems can read, it can be rejected automatically — no matter how qualified you are. This guide breaks down exactly how ATS software works and how to give your resume the best possible chance of reaching a hiring manager.',
      },
      { type: 'heading', text: 'What is an ATS and why does it matter?' },
      {
        type: 'paragraph',
        text: 'An Applicant Tracking System is software that collects, scans, and ranks job applications. When you submit a resume online, the ATS parses your document into structured data — name, work history, skills, education — and matches it against the job description. Recruiters then search and sort candidates based on that data, often filtering by specific keywords.',
      },
      {
        type: 'paragraph',
        text: 'The practical takeaway is simple: your resume has two audiences. First the machine, then the human. You need to satisfy both.',
      },
      { type: 'heading', text: 'Use a clean, parseable format' },
      {
        type: 'list',
        items: [
          'Use a standard single-column layout. Tables, text boxes, and multi-column designs frequently confuse parsers.',
          'Stick to common fonts like Arial, Calibri, or Georgia at 10–12pt.',
          'Save and submit as a .docx or a text-based PDF — never an image or scanned document.',
          'Use standard section headings: "Work Experience," "Education," "Skills." Creative headings like "Where I\'ve Made Magic" may not be recognized.',
          'Avoid putting critical information in headers and footers, which some systems ignore.',
        ],
      },
      { type: 'heading', text: 'Mirror the language of the job description' },
      {
        type: 'paragraph',
        text: 'ATS ranking often comes down to keyword matching. Read the job posting carefully and identify the skills, tools, and qualifications it emphasizes. If the posting says "project management" and "stakeholder communication," those exact phrases should appear naturally in your resume — assuming they are true of your experience.',
      },
      {
        type: 'quote',
        text: 'Tailoring your resume to each role is the single highest-impact change most job seekers can make. A generic resume sent to 50 jobs almost always underperforms a targeted resume sent to 10.',
      },
      { type: 'heading', text: 'Quantify your achievements' },
      {
        type: 'paragraph',
        text: 'Once your resume passes the ATS, a recruiter spends an average of just 6–8 seconds on the first scan. Numbers stop the eye. Instead of "Responsible for managing social media," write "Grew Instagram following 140% (12K to 29K) in 8 months, driving a 22% increase in referral traffic."',
      },
      { type: 'heading', text: 'A quick ATS-friendly checklist' },
      {
        type: 'list',
        items: [
          'Single-column, standard layout',
          'Standard section headings',
          'Keywords pulled from the job description',
          'Quantified, achievement-focused bullet points',
          'No graphics, icons, or photos carrying essential text',
          'Saved as .docx or text-based PDF',
        ],
      },
      {
        type: 'paragraph',
        text: 'Optimizing for ATS is not about gaming the system — it is about presenting your real qualifications in a format both software and humans can understand. Get the structure right, speak the employer\'s language, and let your accomplishments do the rest.',
      },
    ],
  },
  {
    slug: 'power-words-resume',
    title: '10 Power Words That Make Your Resume Stand Out',
    excerpt:
      'Discover the action verbs and phrases that catch recruiters attention and showcase your achievements effectively.',
    category: 'Resume Tips',
    readTime: '5 min read',
    date: 'Jan 12, 2024',
    author: 'Career Team',
    published: '2024-01-12',
    content: [
      {
        type: 'paragraph',
        text: 'The words you choose on your resume shape how recruiters perceive your impact. Weak, passive phrasing like "responsible for" or "helped with" buries your contributions. Strong action verbs put you in the driver\'s seat. Here are ten power words — and how to use them well.',
      },
      { type: 'heading', text: 'The 10 power words' },
      {
        type: 'list',
        items: [
          'Spearheaded — signals you initiated and led something new.',
          'Accelerated — shows you made a process or result faster.',
          'Optimized — conveys measurable improvement to a system.',
          'Generated — ties your work directly to revenue or output.',
          'Streamlined — communicates efficiency and cost savings.',
          'Launched — demonstrates ownership of a product or initiative.',
          'Negotiated — highlights influence and business acumen.',
          'Transformed — implies large-scale, meaningful change.',
          'Mentored — shows leadership and people development.',
          'Delivered — emphasizes reliability and results.',
        ],
      },
      { type: 'heading', text: 'Pair power words with proof' },
      {
        type: 'paragraph',
        text: 'A power word without evidence is just a buzzword. The formula that works: [Action verb] + [what you did] + [measurable result]. For example: "Streamlined the onboarding workflow, cutting new-hire ramp time from 6 weeks to 3."',
      },
      {
        type: 'quote',
        text: 'Recruiters do not reward effort — they reward outcomes. Power words frame your outcomes in the strongest possible light.',
      },
      { type: 'heading', text: 'Words to retire' },
      {
        type: 'list',
        items: [
          '"Responsible for" — describes duties, not achievements.',
          '"Helped" — minimizes your role.',
          '"Hardworking" and "team player" — tell, don\'t show.',
          '"Synergy" and other empty jargon.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Go through every bullet on your resume and ask: does this start with a strong verb, and does it prove a result? If not, rewrite it. Small wording changes can dramatically shift how impressive your experience reads.',
      },
    ],
  },
  {
    slug: 'tailor-resume-job-application',
    title: 'How to Tailor Your Resume for Each Job Application',
    excerpt:
      'A step-by-step guide to customizing your resume for specific job descriptions without starting from scratch.',
    category: 'Job Search',
    readTime: '7 min read',
    date: 'Jan 10, 2024',
    author: 'Career Team',
    published: '2024-01-10',
    content: [
      {
        type: 'paragraph',
        text: 'Sending the same resume to every job is one of the most common job-search mistakes. Tailoring does not mean rewriting from scratch — it means making strategic adjustments so each application speaks directly to that specific role. Here is a repeatable process you can run in 15 minutes per application.',
      },
      { type: 'heading', text: 'Step 1: Decode the job description' },
      {
        type: 'paragraph',
        text: 'Copy the job posting and highlight every hard skill, tool, certification, and recurring theme. Pay special attention to requirements listed first or repeated — those are the priorities. These become your keyword targets.',
      },
      { type: 'heading', text: 'Step 2: Build a master resume' },
      {
        type: 'paragraph',
        text: 'Maintain one long "master" document containing every role, accomplishment, and skill you have. Tailoring then becomes a process of selecting and reordering the most relevant material rather than writing new content each time.',
      },
      { type: 'heading', text: 'Step 3: Reorder for relevance' },
      {
        type: 'list',
        items: [
          'Move the most relevant experience and bullet points to the top of each section.',
          'Rewrite your professional summary to reflect the target job title.',
          'Adjust your skills section so the posting\'s priority skills appear first.',
          'Cut or condense bullets that have nothing to do with this role.',
        ],
      },
      { type: 'heading', text: 'Step 4: Match the language' },
      {
        type: 'paragraph',
        text: 'If the company calls it "client success" and your resume says "customer support," align the terminology where it is accurate. This helps both ATS keyword matching and human recruiters who scan for familiar terms.',
      },
      {
        type: 'quote',
        text: 'Quality beats quantity. Ten tailored applications will almost always outperform fifty generic ones.',
      },
      { type: 'heading', text: 'Step 5: Final consistency check' },
      {
        type: 'paragraph',
        text: 'Before submitting, reread the posting once more and confirm your resume answers the question every hiring manager is really asking: "Can this person do this specific job?" When the answer jumps off the page, you have tailored it well.',
      },
    ],
  },
  {
    slug: 'top-skills-employers-2024',
    title: 'The Top Skills Employers Are Looking for in 2024',
    excerpt:
      'Research-backed insights into the most in-demand hard and soft skills across industries.',
    category: 'Career Advice',
    readTime: '6 min read',
    date: 'Jan 8, 2024',
    author: 'Career Team',
    published: '2024-01-08',
    content: [
      {
        type: 'paragraph',
        text: 'The skills employers value shift every year as technology and ways of working evolve. Based on hiring trends across major job boards and employer surveys, here are the hard and soft skills that carry the most weight in 2024 — and how to show them on your resume.',
      },
      { type: 'heading', text: 'In-demand hard skills' },
      {
        type: 'list',
        items: [
          'AI and machine learning literacy — even non-technical roles increasingly value comfort with AI tools.',
          'Data analysis — the ability to interpret data and make decisions from it.',
          'Digital marketing and SEO — essential across industries, not just marketing teams.',
          'Cloud computing — familiarity with platforms like AWS, Azure, or Google Cloud.',
          'Cybersecurity awareness — a growing priority for organizations of every size.',
        ],
      },
      { type: 'heading', text: 'Soft skills that set you apart' },
      {
        type: 'list',
        items: [
          'Adaptability — the top soft skill cited by employers in a fast-changing market.',
          'Communication — clear writing and speaking, especially in remote teams.',
          'Critical thinking — solving ambiguous problems without a playbook.',
          'Emotional intelligence — collaborating and leading effectively.',
          'Time management — delivering reliably across competing priorities.',
        ],
      },
      { type: 'heading', text: 'How to prove skills on your resume' },
      {
        type: 'paragraph',
        text: 'Listing a skill is not enough — back it with evidence. Instead of writing "strong communication," show it: "Presented quarterly results to a 40-person leadership team and authored the company-wide product update newsletter." Tie every claimed skill to a concrete example or result.',
      },
      {
        type: 'quote',
        text: 'The most hireable candidates pair technical ability with adaptability. Tools change; the capacity to learn quickly is what keeps you valuable.',
      },
      {
        type: 'paragraph',
        text: 'Audit your current resume against this list. Where you have a genuine strength that the market rewards, make sure it is visible and supported with proof.',
      },
    ],
  },
  {
    slug: 'cover-letter-data-analysis',
    title: 'Cover Letter vs No Cover Letter: What the Data Says',
    excerpt:
      'We analyzed thousands of applications to find out if cover letters really make a difference.',
    category: 'Research',
    readTime: '4 min read',
    date: 'Jan 5, 2024',
    author: 'Career Team',
    published: '2024-01-05',
    content: [
      {
        type: 'paragraph',
        text: 'Few job-search debates are as persistent as the cover letter question. Are they a waste of time, or a quiet differentiator? We looked at application outcomes and recruiter surveys to separate myth from reality.',
      },
      { type: 'heading', text: 'What the numbers show' },
      {
        type: 'paragraph',
        text: 'Surveys of hiring managers consistently find that a meaningful share — often around half — still read cover letters, and many say a strong one can tip a decision between two similar candidates. At the same time, a significant portion of recruiters admit they rarely read them. The takeaway: cover letters are optional often, but rarely a disadvantage when done well.',
      },
      { type: 'heading', text: 'When a cover letter matters most' },
      {
        type: 'list',
        items: [
          'When the application explicitly requests one — skipping it signals you do not follow instructions.',
          'When you are changing careers and need to connect the dots in your story.',
          'When you have an employment gap or unusual background worth explaining.',
          'When you are applying to a smaller company where a human reads every application.',
        ],
      },
      { type: 'heading', text: 'When you can skip it' },
      {
        type: 'paragraph',
        text: 'For high-volume applications through large ATS-driven portals where no field exists for one, the time is often better spent tailoring your resume. If you do skip it, make sure your resume is exceptional.',
      },
      {
        type: 'quote',
        text: 'A great cover letter rarely gets you the job on its own — but a generic or sloppy one can absolutely cost you it.',
      },
      {
        type: 'paragraph',
        text: 'Our recommendation: keep a strong, adaptable cover letter template ready. Customize the opening and one middle paragraph per role. The marginal effort is small, and the downside of having one is essentially zero.',
      },
    ],
  },
  {
    slug: 'explain-employment-gaps',
    title: 'How to Explain Employment Gaps on Your Resume',
    excerpt:
      'Practical strategies for addressing career breaks, layoffs, and other gaps in your work history.',
    category: 'Resume Tips',
    readTime: '6 min read',
    date: 'Jan 3, 2024',
    author: 'Career Team',
    published: '2024-01-03',
    content: [
      {
        type: 'paragraph',
        text: 'Employment gaps are far more common — and more accepted — than most job seekers fear. Layoffs, caregiving, health, education, and career changes are normal parts of a working life. What matters is how you frame the gap, not the gap itself.',
      },
      { type: 'heading', text: 'Do not try to hide it' },
      {
        type: 'paragraph',
        text: 'Recruiters notice missing years, and elaborate attempts to disguise them tend to backfire. Honesty paired with a forward-looking explanation builds far more trust than a confusing timeline.',
      },
      { type: 'heading', text: 'Strategies that work' },
      {
        type: 'list',
        items: [
          'Use years instead of months for roles if a short gap looks larger than it is.',
          'Include meaningful activity during the gap: freelance work, volunteering, courses, certifications, or caregiving.',
          'Add a brief, neutral line if helpful, e.g. "2023 — Career break for family caregiving."',
          'Lead with a strong skills-based summary so attention starts on your capabilities.',
        ],
      },
      { type: 'heading', text: 'Address it confidently in interviews' },
      {
        type: 'paragraph',
        text: 'Prepare a short, honest, positive explanation — two or three sentences — and then pivot to your enthusiasm for the role. For example: "I took a year to care for a family member. During that time I completed a data analytics certification, and I\'m excited to bring those new skills to this position."',
      },
      {
        type: 'quote',
        text: 'A gap is not a weakness. How you talk about it reveals your self-awareness and resilience — qualities employers actively want.',
      },
      {
        type: 'paragraph',
        text: 'Frame your break as a chapter with a purpose, show what you gained or contributed, and redirect the conversation to the value you bring now. Most interviewers will move on quickly.',
      },
    ],
  },
  {
    slug: 'remote-job-search-tips',
    title: 'Remote Job Search: Resume Tips for 2024',
    excerpt:
      'How to highlight remote work skills and stand out in the competitive remote job market.',
    category: 'Job Search',
    readTime: '5 min read',
    date: 'Jan 1, 2024',
    author: 'Career Team',
    published: '2024-01-01',
    content: [
      {
        type: 'paragraph',
        text: 'Remote roles attract huge applicant pools, which means your resume needs to do more than list duties — it needs to prove you can thrive without an office around you. Here is how to position yourself for remote work in 2024.',
      },
      { type: 'heading', text: 'Make your remote experience obvious' },
      {
        type: 'paragraph',
        text: 'If you have worked remotely before, label it clearly. Add "(Remote)" next to the location for relevant roles, and call out distributed collaboration in your bullet points. Employers want proof you have done it successfully.',
      },
      { type: 'heading', text: 'Highlight the skills remote employers prize' },
      {
        type: 'list',
        items: [
          'Written communication — async work lives or dies on clear writing.',
          'Self-management — show you deliver without supervision.',
          'Familiarity with remote tools — Slack, Zoom, Notion, Asana, Jira, and similar.',
          'Time-zone and cross-team coordination experience.',
          'Documentation habits — a major asset on distributed teams.',
        ],
      },
      { type: 'heading', text: 'Quantify remote impact' },
      {
        type: 'paragraph',
        text: 'Show results delivered in a remote context: "Coordinated a 9-person team across 4 time zones to ship a product launch on schedule." This proves capability, not just preference.',
      },
      {
        type: 'quote',
        text: 'Remote hiring is global, which means more competition. Specificity and proof are how you rise above a crowded applicant pool.',
      },
      {
        type: 'paragraph',
        text: 'Finally, optimize for the keywords remote postings use — "remote," "distributed," "asynchronous" — where they genuinely apply. Combined with concrete results, you will present as someone ready to be productive from day one.',
      },
    ],
  },
]

export function getAllPosts(): BlogPost[] {
  return blogPosts
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getFeaturedPost(): BlogPost {
  return blogPosts.find((post) => post.featured) ?? blogPosts[0]
}

export function getNonFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((post) => !post.featured)
}
