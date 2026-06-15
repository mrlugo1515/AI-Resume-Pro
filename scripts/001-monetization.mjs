import { Pool } from 'pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

const statements = [
  `CREATE TABLE IF NOT EXISTS entitlement (
    id SERIAL PRIMARY KEY,
    "userId" TEXT NOT NULL UNIQUE,
    plan TEXT NOT NULL DEFAULT 'free',
    "stripeCustomerId" TEXT,
    "lastProductId" TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
  )`,
  `CREATE TABLE IF NOT EXISTS usage_event (
    id SERIAL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    action TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT now()
  )`,
  `CREATE INDEX IF NOT EXISTS usage_event_user_action_idx ON usage_event ("userId", action)`,
]

try {
  for (const sql of statements) {
    await pool.query(sql)
    console.log('[migrate] ok:', sql.split('\n')[0])
  }
  console.log('[migrate] done')
} catch (err) {
  console.error('[migrate] failed:', err)
  process.exitCode = 1
} finally {
  await pool.end()
}
