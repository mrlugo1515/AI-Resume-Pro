# AI Resume Pro

Land more interviews by getting resumes and cover letters that are automatically tailored to each job description. AI analyzes your existing resume against a target job posting, then optimizes for keywords, formatting, and tone — saving hours of manual work per application.

## Tech Stack

| Layer     | Technology                                           |
|-----------|------------------------------------------------------|
| Frontend  | Vite + React 19, Tailwind CSS v4                     |
| Backend   | Node.js 24, Express 5                                |
| Database  | SQLite via Turso (libSQL)                            |
| AI        | OpenAI API / Anthropic (integration planned)         |
| Auth      | JWT / Clerk (planned)                                |
| Payments  | Stripe (planned)                                     |

## Project Structure

```
ai-resume-pro/
├── frontend/              # Vite + React + Tailwind
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page-level components
│   │   ├── App.jsx        # Main app with routing
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles + Tailwind import
│   ├── index.html         # HTML template
│   ├── vite.config.js     # Vite config (dev proxy to backend)
│   └── package.json
├── backend/               # Express API server
│   ├── src/
│   │   ├── routes/        # Route handlers
│   │   │   ├── optimize.js  # Resume optimization endpoint
│   │   │   └── auth.js      # Auth endpoints (placeholder)
│   │   ├── middleware/    # Express middleware
│   │   └── server.js      # Server entry point
│   ├── .env.example       # Environment variable template
│   └── package.json
├── package.json           # Root workspace scripts
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 20+ (v24 recommended)
- npm 10+

### Installation

```bash
# 1. Clone the repository
git clone <repo-url>
cd ai-resume-pro

# 2. Install dependencies for all projects
npm run setup

# 3. Backend environment setup
cp backend/.env.example backend/.env
# Edit backend/.env to add your API keys (OpenAI, etc.)
```

### Development

Run both frontend and backend concurrently:

```bash
npm run dev
```

This starts:
- **Frontend** at `http://localhost:5173` (with hot module replacement)
- **Backend** at `http://localhost:3001` (with auto-restart on file changes)

The frontend dev server proxies `/api/*` requests to the backend.

### Production Build

```bash
npm run build
npm start   # Starts the backend (serves frontend build from dist/)
```

Alternatively, deploy frontend to Vercel and backend to Railway.

## API Endpoints

| Method | Path             | Description                     |
|--------|------------------|---------------------------------|
| GET    | /api/health      | Health check                    |
| POST   | /api/optimize    | Optimize resume for job posting |
| POST   | /api/auth/login  | User login (coming soon)        |
| POST   | /api/auth/register | User registration (coming soon) |
| GET    | /api/auth/me     | Current user (coming soon)      |

### POST /api/optimize

**Request body:**
```json
{
  "resume": "string (resume text content)",
  "jobDescription": "string (target job posting)",
  "tier": "basic | pro"
}
```

**Response:**
```json
{
  "optimizedResume": "string",
  "optimizedCoverLetter": "string (pro tier only)",
  "keywords": ["keyword1", "keyword2", ...],
  "matchScore": 85,
  "tier": "basic"
}
```

## Roadmap

- [x] Project scaffolding
- [ ] AI integration (OpenAI API)
- [ ] User authentication (JWT / Clerk)
- [ ] Resume upload (PDF, DOCX parsing)
- [ ] Stripe subscription billing
- [ ] Team-db integration for tracking requests
- [ ] White-label for career coaches

## License

MIT