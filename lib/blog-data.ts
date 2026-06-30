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
    slug: 'marketing-manager-resume-example',
    title: 'Marketing Manager Resume Example and Writing Guide (2026)',
    excerpt:
      'A complete breakdown of a strong marketing manager resume — the structure, skills, and metric-driven bullets that prove you can grow pipeline and lead campaigns.',
    category: 'Job Search',
    readTime: '8 min read',
    date: 'Jun 9, 2026',
    author: 'Career Team',
    published: '2026-06-09',
    content: [
      {
        type: 'paragraph',
        text: 'Marketing roles are crowded, and hiring managers scan for one thing above all: proof that you can drive measurable growth. A strong marketing manager resume pairs strategic range — brand, demand generation, content, analytics — with hard numbers that show impact. This guide breaks down exactly what to include and how to phrase it.',
      },
      { type: 'heading', text: 'The structure that works' },
      {
        type: 'list',
        items: [
          'Header: name, email, phone, city, and links to LinkedIn and a portfolio or campaign samples.',
          'Summary: two to three lines naming your specialty (demand gen, brand, growth) and a headline result.',
          'Skills: channels, platforms, and tools — SEO/SEM, HubSpot, Google Analytics, paid social, marketing automation.',
          'Experience: reverse-chronological roles with results-focused bullets.',
          'Education and certifications: degree plus credentials like Google Ads or HubSpot.',
        ],
      },
      { type: 'heading', text: 'Write bullets that prove growth' },
      {
        type: 'paragraph',
        text: 'Marketing is one of the most measurable functions, so a resume without numbers reads as a red flag. Use the pattern [action] + [initiative] + [channel/tool] + [measurable result].',
      },
      {
        type: 'quote',
        text: 'Weak: "Responsible for managing social media accounts." Strong: "Grew organic social engagement 210% in 9 months and drove 1,800 marketing-qualified leads through a new LinkedIn content program."',
      },
      {
        type: 'paragraph',
        text: 'Anchor bullets in the metrics leaders care about: pipeline, MQLs, conversion rate, CAC, ROAS, revenue influenced, and growth percentages.',
      },
      { type: 'heading', text: 'Skills hiring managers look for' },
      {
        type: 'list',
        items: [
          'Demand generation and lead nurturing.',
          'SEO/SEM and paid media (Google Ads, Meta, LinkedIn).',
          'Marketing automation and CRM (HubSpot, Marketo, Salesforce).',
          'Analytics and attribution (GA4, dashboards, A/B testing).',
          'Content strategy and cross-functional campaign management.',
        ],
      },
      { type: 'heading', text: 'Tailor it to the role' },
      {
        type: 'paragraph',
        text: 'A demand-gen role wants pipeline and conversion metrics up top; a brand role wants awareness, positioning, and creative leadership. Mirror the job description\'s emphasis and lead with the achievement that matches it most closely.',
      },
      {
        type: 'paragraph',
        text: 'Before you submit, run your resume through an ATS check to confirm it parses cleanly, then make your single strongest growth result impossible to miss.',
      },
    ],
  },
  {
    slug: 'registered-nurse-resume-example',
    title: 'Registered Nurse Resume Example and Writing Guide (2026)',
    excerpt:
      'How to write a registered nurse resume that highlights your credentials, clinical skills, and patient outcomes — and passes hospital ATS screening.',
    category: 'Job Search',
    readTime: '7 min read',
    date: 'Jun 6, 2026',
    author: 'Career Team',
    published: '2026-06-06',
    content: [
      {
        type: 'paragraph',
        text: 'Nursing resumes are unique: licensure and certifications are non-negotiable screening criteria, and large healthcare systems lean heavily on applicant tracking software. A strong RN resume puts your credentials front and center, then proves your clinical competence with specifics. Here is how to build one.',
      },
      { type: 'heading', text: 'The structure that works' },
      {
        type: 'list',
        items: [
          'Header: name, credentials (RN, BSN), email, phone, and city.',
          'Licensure and certifications: license number/state, BLS, ACLS, PALS, and specialty certs — placed high.',
          'Summary: your specialty, years of experience, and care setting.',
          'Clinical experience: roles with unit type, patient population, and responsibilities.',
          'Education: nursing degree and school.',
          'Skills: clinical procedures, EHR systems, and specialties.',
        ],
      },
      { type: 'heading', text: 'Lead with credentials' },
      {
        type: 'paragraph',
        text: 'Recruiters and ATS filters screen for required licenses and certifications first. List them clearly near the top — including state, status, and expiration where relevant — so you are never filtered out for a credential you actually hold.',
      },
      { type: 'heading', text: 'Make clinical experience specific' },
      {
        type: 'paragraph',
        text: 'Generic duties ("provided patient care") tell a recruiter nothing. Specify the unit, patient load, acuity, and outcomes.',
      },
      {
        type: 'quote',
        text: 'Weak: "Cared for patients on a busy floor." Strong: "Managed care for up to 6 acute med-surg patients per shift, maintaining a 98% medication-administration accuracy rate and contributing to a 15% reduction in unit fall incidents."',
      },
      { type: 'heading', text: 'Skills and systems to include' },
      {
        type: 'list',
        items: [
          'Clinical: IV therapy, wound care, telemetry, patient assessment, medication administration.',
          'EHR systems: Epic, Cerner, Meditech.',
          'Specialties: ICU, ER, med-surg, pediatrics, oncology — whatever applies.',
          'Compliance: HIPAA, infection control, patient safety protocols.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Match the unit and certifications named in the job posting, keep formatting clean and single-column for ATS parsing, and confirm every credential is current before you apply.',
      },
    ],
  },
  {
    slug: 'data-analyst-resume-example',
    title: 'Data Analyst Resume Example and Writing Guide (2026)',
    excerpt:
      'A practical guide to writing a data analyst resume — the tools, technical skills, and impact-driven bullets that show you turn data into decisions.',
    category: 'Job Search',
    readTime: '7 min read',
    date: 'Jun 3, 2026',
    author: 'Career Team',
    published: '2026-06-03',
    content: [
      {
        type: 'paragraph',
        text: 'Data analyst roles attract a flood of applicants, and hiring teams screen hard for specific tools and demonstrated business impact. A strong resume proves two things: that you have the technical toolkit (SQL, a BI platform, often Python or R) and that your analysis actually changed decisions. Here is how to show both.',
      },
      { type: 'heading', text: 'The structure that works' },
      {
        type: 'list',
        items: [
          'Header: name, email, phone, city, and links to LinkedIn, GitHub, or a portfolio.',
          'Summary: your focus area, years of experience, and core stack.',
          'Technical skills: languages, databases, BI tools, and methods — in plain text.',
          'Experience: roles with bullets tying analysis to outcomes.',
          'Projects: dashboards or analyses that show end-to-end work, especially for early-career analysts.',
          'Education and certifications.',
        ],
      },
      { type: 'heading', text: 'Write bullets that show impact, not tasks' },
      {
        type: 'paragraph',
        text: 'Anyone can write a query — what matters is what your analysis enabled. Use the pattern [analysis you ran] + [tool] + [decision or result it drove].',
      },
      {
        type: 'quote',
        text: 'Weak: "Built dashboards in Tableau." Strong: "Built a Tableau churn dashboard that surfaced at-risk accounts, enabling a retention campaign that recovered $420K in annual recurring revenue."',
      },
      { type: 'heading', text: 'Technical skills to feature' },
      {
        type: 'list',
        items: [
          'SQL — almost always the top required skill; list it first.',
          'BI and visualization: Tableau, Power BI, Looker.',
          'Programming: Python or R, with key libraries (pandas, NumPy).',
          'Spreadsheets and modeling: advanced Excel, statistical methods.',
          'Data work: cleaning, ETL basics, A/B testing, forecasting.',
        ],
      },
      { type: 'heading', text: 'Tips for early-career analysts' },
      {
        type: 'paragraph',
        text: 'No formal analyst title yet? Let projects carry the resume. Describe a real dataset you analyzed, the tools you used, and the insight you produced — a linked dashboard or notebook is far more convincing than coursework alone.',
      },
      {
        type: 'paragraph',
        text: 'List the exact tools named in the job description where you genuinely know them, quantify the business value of your analysis, and run an ATS check before submitting.',
      },
    ],
  },
  {
    slug: 'project-manager-resume-example',
    title: 'Project Manager Resume Example and Writing Guide (2026)',
    excerpt:
      'How to write a project manager resume that proves you deliver on scope, budget, and timeline — with the methodologies and metrics employers screen for.',
    category: 'Job Search',
    readTime: '7 min read',
    date: 'May 31, 2026',
    author: 'Career Team',
    published: '2026-05-31',
    content: [
      {
        type: 'paragraph',
        text: 'Project management resumes are judged on a simple question: can you deliver projects on scope, on budget, and on time? Strong candidates back that up with methodologies, team sizes, budgets, and outcomes. This guide shows how to structure and phrase a project manager resume that earns interviews.',
      },
      { type: 'heading', text: 'The structure that works' },
      {
        type: 'list',
        items: [
          'Header: name, email, phone, city, and LinkedIn.',
          'Certifications: PMP, CSM, PRINCE2, or PMI-ACP — placed high, since many roles require them.',
          'Summary: your domain, methodologies, and a flagship delivery result.',
          'Experience: projects with scope, budget, team size, and outcomes.',
          'Skills: methodologies and tools.',
          'Education.',
        ],
      },
      { type: 'heading', text: 'Quantify every project' },
      {
        type: 'paragraph',
        text: 'Project management is inherently measurable, so vague bullets stand out for the wrong reasons. Use the pattern [project] + [scope: budget, team, timeline] + [methodology] + [outcome].',
      },
      {
        type: 'quote',
        text: 'Weak: "Managed multiple projects across teams." Strong: "Led a $2.4M ERP migration across 4 departments and 18 stakeholders using Agile/Scrum, delivering two weeks early and 8% under budget."',
      },
      { type: 'heading', text: 'Methodologies and tools to include' },
      {
        type: 'list',
        items: [
          'Methodologies: Agile, Scrum, Kanban, Waterfall, hybrid.',
          'Tools: Jira, Asana, MS Project, Monday.com, Confluence.',
          'Core skills: risk management, stakeholder communication, budgeting, resource planning.',
          'Leadership: cross-functional team coordination and vendor management.',
        ],
      },
      { type: 'heading', text: 'Match the methodology to the job' },
      {
        type: 'paragraph',
        text: 'A software role likely wants Agile/Scrum; a construction or manufacturing role often expects Waterfall. Lead with the methodologies the posting names, and feature the project most similar in scope and industry.',
      },
      {
        type: 'paragraph',
        text: 'Put required certifications near the top, quantify scope and outcomes on every project, and confirm your resume parses cleanly through an ATS check.',
      },
    ],
  },
  {
    slug: 'sales-representative-resume-example',
    title: 'Sales Representative Resume Example and Writing Guide (2026)',
    excerpt:
      'A guide to writing a sales resume that leads with numbers — quota attainment, revenue, and deal size — and proves you can close.',
    category: 'Job Search',
    readTime: '6 min read',
    date: 'May 24, 2026',
    author: 'Career Team',
    published: '2026-05-24',
    content: [
      {
        type: 'paragraph',
        text: 'Sales is the one field where your resume can be almost entirely numbers — and it should be. Hiring managers want immediate proof that you hit quota and generate revenue. A strong sales resume puts performance metrics front and center and treats every bullet as evidence that you close. Here is how to build it.',
      },
      { type: 'heading', text: 'The structure that works' },
      {
        type: 'list',
        items: [
          'Header: name, email, phone, city, and LinkedIn.',
          'Summary: your sales type (inside, field, SaaS, B2B), segment, and a headline performance stat.',
          'Experience: roles led by quota attainment, revenue, and deal metrics.',
          'Skills: sales methodologies and CRM tools.',
          'Education and any sales certifications.',
        ],
      },
      { type: 'heading', text: 'Lead with performance metrics' },
      {
        type: 'paragraph',
        text: 'The first thing a sales manager wants to see is whether you hit your number. Make it impossible to miss. Use the pattern [result vs. quota] + [revenue/volume] + [context: segment, deal size, ranking].',
      },
      {
        type: 'quote',
        text: 'Weak: "Met sales targets consistently." Strong: "Achieved 134% of annual quota ($1.8M) in 2025, ranking #2 of 22 reps, with an average deal size of $45K in mid-market SaaS."',
      },
      {
        type: 'paragraph',
        text: 'Feature quota attainment, total revenue, percentage growth, new accounts closed, deal size, and any President\'s Club or ranking awards.',
      },
      { type: 'heading', text: 'Skills and tools to include' },
      {
        type: 'list',
        items: [
          'Methodologies: consultative selling, SPIN, Challenger, solution selling.',
          'CRM and tools: Salesforce, HubSpot, Outreach, Gong.',
          'Core skills: prospecting, pipeline management, negotiation, account management.',
          'Sales motion: inbound, outbound, full-cycle, or closing.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Tailor the metrics to the role — new-business roles want closed deals and prospecting, account management wants retention and expansion. Quantify relentlessly, then verify clean ATS parsing before you apply.',
      },
    ],
  },
  {
    slug: 'free-ats-resume-checker',
    title: 'Free ATS Resume Checker: How to Test If Your Resume Will Pass in 2026',
    excerpt:
      'Worried your resume is getting auto-rejected? Here is how to check whether your resume is ATS-friendly — using a free scan and simple manual tests that reveal exactly what recruiters\' software sees.',
    category: 'Resume Tips',
    readTime: '8 min read',
    date: 'Jun 2, 2026',
    author: 'Career Team',
    published: '2026-06-02',
    content: [
      {
        type: 'paragraph',
        text: 'If you are applying to jobs and hearing nothing back, the problem may not be your experience — it may be that a human never saw your resume at all. Most mid-size and large employers run applications through an Applicant Tracking System (ATS) that parses and ranks your resume before a recruiter opens it. The good news: you can check how ATS-friendly your resume is in a few minutes, for free, and fix the issues that get resumes silently filtered out.',
      },
      { type: 'heading', text: 'Why your resume might never reach a human' },
      {
        type: 'paragraph',
        text: 'An ATS converts your document into structured text, then matches it against the job description. If the software cannot cleanly read your contact details, job titles, dates, and skills — or if your resume lacks the keywords the role calls for — you score low and drop out of the recruiter\'s search results. A beautifully designed resume can fail simply because the parser choked on a two-column layout.',
      },
      { type: 'heading', text: 'The 60-second manual ATS test' },
      {
        type: 'paragraph',
        text: 'Before reaching for any tool, run this quick check yourself. Open your resume, select all the text, copy it, and paste it into a plain text editor (like Notepad or TextEdit in plain-text mode).',
      },
      {
        type: 'list',
        items: [
          'Does everything appear in a logical top-to-bottom order? If sections jump around, the ATS will read them out of order too.',
          'Are your name, email, and phone number all present as plain text — not trapped inside a header, image, or icon?',
          'Did your bullet points survive as readable lines, or turn into stray symbols?',
          'Are your job titles, companies, and dates still clearly paired together?',
          'Is any text missing entirely? Missing text usually means it lived in a graphic, text box, or column the parser dropped.',
        ],
      },
      {
        type: 'paragraph',
        text: 'If the pasted version looks garbled or loses information, an ATS will struggle with it too — and that is your highest-priority fix.',
      },
      { type: 'heading', text: 'What an ATS checker actually looks for' },
      {
        type: 'list',
        items: [
          'Parse rate — whether your contact info, work history, education, and skills were correctly identified.',
          'Keyword match — how many of the job description\'s key skills and terms appear in your resume.',
          'Formatting risks — tables, columns, images, headers/footers, and uncommon fonts that break parsing.',
          'Section headings — standard labels like "Work Experience," "Education," and "Skills" the system expects.',
          'File type — text-based PDF or .docx, never a scanned image or screenshot.',
        ],
      },
      { type: 'heading', text: 'How to read your match score' },
      {
        type: 'paragraph',
        text: 'A match score estimates how closely your resume aligns with a specific job description. Do not chase a perfect 100% — that often means keyword stuffing, which reads poorly to the human on the other side. Aim to naturally cover the role\'s most-emphasized skills and responsibilities. If a critical required skill is genuinely part of your experience but missing from your resume, that is the gap worth closing.',
      },
      {
        type: 'quote',
        text: 'An ATS checker is not about tricking software. It is about making sure your real qualifications are visible to both the machine and the recruiter who searches it.',
      },
      { type: 'heading', text: 'Fixing the most common parsing failures' },
      {
        type: 'list',
        items: [
          'Switch from a multi-column template to a clean single-column layout.',
          'Move contact details out of the header and into the body of the document.',
          'Replace graphic skill bars and icons with plain text skill lists.',
          'Use standard section headings instead of creative ones.',
          'Add the exact skills and terms from the job posting where they truthfully apply.',
          'Export as a text-based PDF or .docx and re-run the copy-paste test.',
        ],
      },
      {
        type: 'paragraph',
        text: 'You can run all of these checks at once with ForgeCareer AI\'s free scan: paste your resume and a job description, and you will get a match score plus specific, actionable fixes. Start with the manual test above, then let the tool catch what the eye misses.',
      },
    ],
  },
  {
    slug: 'resume-keywords-guide',
    title: 'How to Find the Right Resume Keywords (And Exactly Where to Put Them)',
    excerpt:
      'Resume keywords decide whether your application ranks or disappears. Here is how to find the right ones for any job and place them so they help both the ATS and the recruiter.',
    category: 'Resume Tips',
    readTime: '7 min read',
    date: 'May 28, 2026',
    author: 'Career Team',
    published: '2026-05-28',
    content: [
      {
        type: 'paragraph',
        text: 'Resume keywords are the specific skills, tools, certifications, and role-related terms that hiring software and recruiters search for. Get them right and your resume surfaces near the top of the candidate pool. Get them wrong — or leave them out — and even a strong background can stay invisible. Here is how to identify the keywords that matter for each job and where to place them for maximum impact.',
      },
      { type: 'heading', text: 'Step 1: Mine the job description' },
      {
        type: 'paragraph',
        text: 'Your single best keyword source is the posting itself. Read it twice and highlight every concrete requirement: hard skills (Python, Salesforce, financial modeling), tools and platforms, certifications, and recurring responsibilities. Terms that appear in the title, the first few bullets, or more than once are the highest priority.',
      },
      { type: 'heading', text: 'Step 2: Separate must-haves from nice-to-haves' },
      {
        type: 'list',
        items: [
          'Must-haves usually appear under "Requirements" or "Qualifications" and are often non-negotiable.',
          'Nice-to-haves show up as "preferred," "bonus," or "a plus."',
          'Prioritize must-haves you genuinely possess — those are the keywords most likely to be filtered on.',
        ],
      },
      { type: 'heading', text: 'Step 3: Cross-check against similar postings' },
      {
        type: 'paragraph',
        text: 'Pull up three or four listings for the same role at different companies. Skills that appear across all of them are industry-standard expectations for that job — strong signals that they belong on your resume, even if a single posting omits them.',
      },
      { type: 'heading', text: 'Where to place your keywords' },
      {
        type: 'list',
        items: [
          'Professional summary — work the target job title and two or three core skills into the opening lines.',
          'Skills section — list priority hard skills here in plain text so the ATS catches them immediately.',
          'Experience bullets — this is the most powerful spot, because keywords backed by results carry weight with humans too.',
          'Job titles — if your real title was vague, add a clarifying standard title in parentheses.',
        ],
      },
      {
        type: 'quote',
        text: 'The strongest keyword is one embedded in a measurable achievement. "Optimized" means little alone; "Optimized checkout flow, lifting conversion 18%" proves the skill.',
      },
      { type: 'heading', text: 'Use exact terms — and natural variations' },
      {
        type: 'paragraph',
        text: 'If a posting says "project management," use that exact phrase rather than only "managed projects." Many systems match precise terms. At the same time, include sensible variations and acronyms (for example, both "search engine optimization" and "SEO") so you cover how different recruiters search.',
      },
      { type: 'heading', text: 'The one rule that overrides all others' },
      {
        type: 'paragraph',
        text: 'Never list a keyword you cannot back up in an interview. Keyword stuffing might lift a score, but it collapses the moment a recruiter asks you to elaborate. Tailor honestly: include the terms that are genuinely true of your experience, place them where they will be seen, and prove them with results.',
      },
    ],
  },
  {
    slug: 'resume-summary-examples',
    title: 'How to Write a Resume Summary That Gets Interviews (With Examples)',
    excerpt:
      'Your resume summary is the first thing a recruiter reads. Learn the simple formula for writing one that hooks attention in seconds — with before-and-after examples you can adapt.',
    category: 'Career Advice',
    readTime: '6 min read',
    date: 'May 21, 2026',
    author: 'Career Team',
    published: '2026-05-21',
    content: [
      {
        type: 'paragraph',
        text: 'A resume summary is a two-to-four sentence pitch at the top of your resume that tells a recruiter who you are, what you do well, and the value you bring. Done right, it earns you the extra seconds that lead to a real read. Done poorly — or filled with empty buzzwords — it gets skipped. Here is how to write one that works.',
      },
      { type: 'heading', text: 'The simple formula' },
      {
        type: 'paragraph',
        text: 'A strong summary follows a clear pattern: [Your role and years of experience] + [your top one or two specialties] + [a standout, quantified achievement] + [what you are aiming to do next]. Lead with your identity, prove your value with a number, and aim it at the job you want.',
      },
      { type: 'heading', text: 'Before and after' },
      {
        type: 'quote',
        text: 'Before: "Hardworking professional with a passion for marketing and a proven track record of success in fast-paced environments."',
      },
      {
        type: 'quote',
        text: 'After: "Digital marketing manager with 6 years scaling B2B demand generation. Grew qualified leads 140% in 12 months and cut cost-per-lead by a third. Seeking to drive pipeline growth for a high-velocity SaaS team."',
      },
      {
        type: 'paragraph',
        text: 'The "after" version names a role, proves impact with specific numbers, and signals exactly what the candidate wants — giving the recruiter every reason to keep reading.',
      },
      { type: 'heading', text: 'Tailor it to every job' },
      {
        type: 'list',
        items: [
          'Echo the target job title so the recruiter instantly sees a match.',
          'Feature the one or two skills the posting emphasizes most.',
          'Swap in an achievement most relevant to that specific role.',
          'Keep it to four lines or fewer — this is a hook, not your life story.',
        ],
      },
      { type: 'heading', text: 'Summary vs. objective' },
      {
        type: 'paragraph',
        text: 'A summary highlights what you have already accomplished and is right for most candidates. An objective states what you are looking for and only makes sense for career changers or new graduates with limited experience. When in doubt, write a summary — employers care more about your value than your wish list.',
      },
      { type: 'heading', text: 'Common mistakes to avoid' },
      {
        type: 'list',
        items: [
          'Vague adjectives like "dynamic," "motivated," or "results-driven" with nothing to back them.',
          'Writing in the first person ("I am...") — keep it crisp and implied.',
          'Listing responsibilities instead of achievements.',
          'A generic summary reused for every application.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Write your summary last, after the rest of your resume is done — by then you will know which achievements are strongest and can feature the best one up top.',
      },
    ],
  },
  {
    slug: 'how-long-should-resume-be',
    title: 'How Long Should a Resume Be? The Definitive 2026 Answer',
    excerpt:
      'One page or two? The honest answer depends on your experience. Here are clear rules for the right resume length — and how to cut or expand without losing impact.',
    category: 'Resume Tips',
    readTime: '5 min read',
    date: 'May 14, 2026',
    author: 'Career Team',
    published: '2026-05-14',
    content: [
      {
        type: 'paragraph',
        text: 'Few resume questions spark more debate than length. The truth is there is no universal rule — the right length depends on your experience and the role. What never changes is the principle behind it: every line must earn its place. Here is how to decide how long your resume should be.',
      },
      { type: 'heading', text: 'The quick rule of thumb' },
      {
        type: 'list',
        items: [
          'Students and early-career (0–3 years): one page.',
          'Mid-career (roughly 3–10 years): one to two pages.',
          'Senior, executive, or highly technical roles: two pages, occasionally three.',
          'Academic CVs and research roles: length is expected and not capped the same way.',
        ],
      },
      {
        type: 'paragraph',
        text: 'When in doubt, lean shorter. A tight one-page resume almost always beats a padded two-pager.',
      },
      { type: 'heading', text: 'Why shorter usually wins' },
      {
        type: 'paragraph',
        text: 'Recruiters spend only seconds on the first pass. A focused resume makes your strongest qualifications impossible to miss, while a long one buries them. Length is not a measure of accomplishment — relevance is.',
      },
      {
        type: 'quote',
        text: 'Your resume is a highlight reel, not an autobiography. Include what gets you this job, and cut everything that does not.',
      },
      { type: 'heading', text: 'How to cut a resume down' },
      {
        type: 'list',
        items: [
          'Remove roles older than 10–15 years unless they are directly relevant.',
          'Trim each role to three to five of its strongest, most relevant bullets.',
          'Delete an objective statement, references line, and "references available upon request."',
          'Combine or cut early jobs that no longer add value.',
          'Tighten wording — replace phrases with single strong verbs.',
        ],
      },
      { type: 'heading', text: 'How to fill a resume that is too short' },
      {
        type: 'list',
        items: [
          'Add measurable results to existing bullets rather than inventing new roles.',
          'Include relevant projects, internships, certifications, or volunteer work.',
          'Expand your skills section with tools and technologies you genuinely use.',
          'Add a concise summary that frames your strengths.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Format matters as much as length: a clean, single-column layout with consistent spacing reads longer and clearer than cramped text. Decide your length by relevance, then make every line work.',
      },
    ],
  },
  {
    slug: 'software-engineer-resume-example',
    title: 'Software Engineer Resume Example and Writing Guide (2026)',
    excerpt:
      'A practical breakdown of what a strong software engineer resume includes — structure, skills, and achievement bullets that get past the ATS and impress hiring managers.',
    category: 'Job Search',
    readTime: '8 min read',
    date: 'May 7, 2026',
    author: 'Career Team',
    published: '2026-05-07',
    content: [
      {
        type: 'paragraph',
        text: 'Software engineering is competitive, and a single role can draw hundreds of applicants. Your resume has to clear an ATS, then convince an engineer or hiring manager in seconds that you can build and ship. This guide breaks down the structure and content of a strong software engineer resume, with examples you can adapt.',
      },
      { type: 'heading', text: 'The structure that works' },
      {
        type: 'list',
        items: [
          'Header: name, email, phone, city, and links to GitHub, LinkedIn, and a portfolio.',
          'Summary: one to three lines naming your specialty, years of experience, and core stack.',
          'Skills: languages, frameworks, databases, cloud, and tools — in plain text.',
          'Experience: roles in reverse-chronological order with achievement-focused bullets.',
          'Projects: especially valuable for junior engineers or career changers.',
          'Education: degree, bootcamp, or relevant certifications.',
        ],
      },
      { type: 'heading', text: 'Write bullets that prove impact' },
      {
        type: 'paragraph',
        text: 'Hiring managers want outcomes, not task lists. Use the pattern [action verb] + [what you built] + [technology] + [measurable result].',
      },
      {
        type: 'quote',
        text: 'Weak: "Worked on the backend API." Strong: "Built a Node.js microservice handling 2M daily requests, cutting average response time from 480ms to 110ms."',
      },
      {
        type: 'paragraph',
        text: 'Numbers — latency, scale, uptime, users, revenue, time saved — are what make engineering accomplishments concrete and credible.',
      },
      { type: 'heading', text: 'Get the skills section right' },
      {
        type: 'list',
        items: [
          'Group skills logically: Languages, Frameworks, Databases, Cloud/DevOps, Tools.',
          'List the technologies named in the job description first, where you genuinely know them.',
          'Skip vague entries like "good communication" here — show those in your bullets.',
          'Avoid graphic proficiency bars; they break ATS parsing and tell recruiters little.',
        ],
      },
      { type: 'heading', text: 'Tips for junior engineers' },
      {
        type: 'paragraph',
        text: 'Without years of experience, let projects carry your resume. Describe what you built, the stack you used, and the problem it solved — a deployed app with a link beats a long list of coursework. Open-source contributions, hackathons, and internships all count as real experience.',
      },
      { type: 'heading', text: 'Before you submit' },
      {
        type: 'list',
        items: [
          'Confirm your GitHub and portfolio links work and show your best work.',
          'Match your listed skills to the specific role you are applying for.',
          'Keep it to one page if you have under 10 years of experience.',
          'Run it through an ATS check to confirm everything parses cleanly.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Tailor this template to each application, lead with measurable results, and make your strongest project or achievement impossible to miss.',
      },
    ],
  },
  {
    slug: 'common-resume-mistakes',
    title: '12 Resume Mistakes That Get You Rejected — And How to Fix Each One',
    excerpt:
      'Most resumes are rejected for avoidable reasons. Here are the 12 most common mistakes that cost candidates interviews, with a quick fix for every one.',
    category: 'Resume Tips',
    readTime: '7 min read',
    date: 'Apr 30, 2026',
    author: 'Career Team',
    published: '2026-04-30',
    content: [
      {
        type: 'paragraph',
        text: 'A great background can still produce a rejected application if the resume undercuts it. The encouraging part is that most resume mistakes are easy to fix once you know what to look for. Here are the twelve that most often cost candidates an interview — and how to correct each.',
      },
      { type: 'heading', text: 'Formatting and parsing mistakes' },
      {
        type: 'list',
        items: [
          'Multi-column or table-heavy layouts that confuse the ATS — switch to a single column.',
          'Contact details hidden in the header or footer — move them into the body.',
          'Saving as an image or scanned PDF — export a text-based PDF or .docx instead.',
          'Creative section headings the software cannot recognize — use standard labels.',
        ],
      },
      { type: 'heading', text: 'Content mistakes' },
      {
        type: 'list',
        items: [
          'Listing duties instead of achievements — rewrite bullets to show results.',
          'No numbers anywhere — quantify impact with metrics wherever possible.',
          'A generic resume sent to every job — tailor to each posting.',
          'Missing the keywords from the job description — add the ones that genuinely apply.',
          'A vague, buzzword-filled summary — replace it with a specific, quantified pitch.',
        ],
      },
      { type: 'heading', text: 'Credibility mistakes' },
      {
        type: 'list',
        items: [
          'Typos and grammar errors — proofread, read aloud, and have someone else review.',
          'Inconsistent formatting (fonts, dates, spacing) — standardize every detail.',
          'An unprofessional email address — use a simple firstname.lastname format.',
        ],
      },
      {
        type: 'quote',
        text: 'Recruiters look for reasons to shorten the pile. Every avoidable mistake hands them one. Eliminate the easy rejections and your real qualifications get a fair hearing.',
      },
      { type: 'heading', text: 'A final pre-send checklist' },
      {
        type: 'list',
        items: [
          'Single-column, ATS-friendly layout with standard headings.',
          'Tailored to the specific job, with its priority keywords included.',
          'Achievement-focused bullets backed by numbers.',
          'Zero typos and fully consistent formatting.',
          'Saved as a text-based PDF or .docx and tested for clean parsing.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Run this checklist before every application. Catching these twelve mistakes takes minutes and can be the difference between silence and an interview invitation.',
      },
    ],
  },
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
