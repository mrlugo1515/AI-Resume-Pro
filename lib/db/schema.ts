import { pgTable, text, timestamp, boolean, serial, integer } from 'drizzle-orm/pg-core'

// --- Better Auth required tables -------------------------------------------
// Column names are camelCase to match Better Auth's defaults. Do not rename.

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

// --- App tables ------------------------------------------------------------

export const resume = pgTable('resume', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  title: text('title').notNull(),
  originalContent: text('originalContent').notNull(),
  optimizedContent: text('optimizedContent'),
  jobDescription: text('jobDescription'),
  coverLetter: text('coverLetter'),
  tier: text('tier').notNull().default('basic'),
  atsScore: integer('atsScore'),
  improvements: text('improvements'),
  keywordsMatched: text('keywordsMatched'),
  status: text('status').notNull().default('pending'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// --- Job Board tables ------------------------------------------------------

export const job = pgTable('job', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  title: text('title').notNull(),
  company: text('company').notNull(),
  location: text('location').notNull(),
  locationType: text('locationType').notNull().default('onsite'),
  jobType: text('jobType').notNull().default('full-time'),
  category: text('category').default('other'),
  salaryMin: integer('salaryMin'),
  salaryMax: integer('salaryMax'),
  description: text('description').notNull(),
  requirements: text('requirements'),
  benefits: text('benefits'),
  applicationUrl: text('applicationUrl'),
  applicationEmail: text('applicationEmail'),
  status: text('status').notNull().default('active'),
  featured: boolean('featured').notNull().default(false),
  views: integer('views').notNull().default(0),
  applications: integer('applications').notNull().default(0),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  expiresAt: timestamp('expiresAt'),
})

export const jobApplication = pgTable('job_application', {
  id: serial('id').primaryKey(),
  jobId: integer('jobId').notNull(),
  userId: text('userId').notNull(),
  resumeId: integer('resumeId'),
  coverLetter: text('coverLetter'),
  status: text('status').notNull().default('pending'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const savedJob = pgTable('saved_job', {
  id: serial('id').primaryKey(),
  jobId: integer('jobId').notNull(),
  userId: text('userId').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

// --- Monetization tables ---------------------------------------------------

// One row per user describing their access level.
// plan: 'free' (default) | 'pro' (unlimited AI after purchase)
export const entitlement = pgTable('entitlement', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull().unique(),
  plan: text('plan').notNull().default('free'),
  stripeCustomerId: text('stripeCustomerId'),
  lastProductId: text('lastProductId'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// One row per metered AI action, used to enforce free-tier limits.
// action: 'optimize' | 'match_scan' | 'cover_letter'
export const usageEvent = pgTable('usage_event', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  action: text('action').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})
