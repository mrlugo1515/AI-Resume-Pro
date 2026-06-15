import { db } from '@/lib/db'
import { entitlement, usageEvent } from '@/lib/db/schema'
import { and, count, eq } from 'drizzle-orm'

export type MeteredAction = 'optimize' | 'match_scan' | 'cover_letter'

// Lifetime free-tier allowance per action. Pro users are unlimited.
export const FREE_LIMITS: Record<MeteredAction, number> = {
  optimize: 1,
  match_scan: 1,
  cover_letter: 1,
}

export const ACTION_LABELS: Record<MeteredAction, string> = {
  optimize: 'resume optimization',
  match_scan: 'job match scan',
  cover_letter: 'cover letter',
}

export type Plan = 'free' | 'pro'

export async function getPlan(userId: string): Promise<Plan> {
  const [row] = await db
    .select({ plan: entitlement.plan })
    .from(entitlement)
    .where(eq(entitlement.userId, userId))
    .limit(1)
  return row?.plan === 'pro' ? 'pro' : 'free'
}

export async function isPro(userId: string): Promise<boolean> {
  return (await getPlan(userId)) === 'pro'
}

async function getUsageCount(userId: string, action: MeteredAction): Promise<number> {
  const [row] = await db
    .select({ value: count() })
    .from(usageEvent)
    .where(and(eq(usageEvent.userId, userId), eq(usageEvent.action, action)))
  return row?.value ?? 0
}

export interface AccessResult {
  allowed: boolean
  plan: Plan
  used: number
  limit: number
  remaining: number
}

/**
 * Determine whether a user may perform a metered action without consuming it.
 * Pro users are always allowed. Free users are allowed until they hit the limit.
 */
export async function checkAccess(userId: string, action: MeteredAction): Promise<AccessResult> {
  const plan = await getPlan(userId)
  const limit = FREE_LIMITS[action]
  if (plan === 'pro') {
    return { allowed: true, plan, used: 0, limit, remaining: Infinity }
  }
  const used = await getUsageCount(userId, action)
  return { allowed: used < limit, plan, used, limit, remaining: Math.max(0, limit - used) }
}

/** Record a consumed free-tier action. No-op semantics for Pro are handled by callers. */
export async function recordUsage(userId: string, action: MeteredAction): Promise<void> {
  await db.insert(usageEvent).values({ userId, action })
}

/** Grant Pro access to a user. Idempotent — safe to call from both the webhook and checkout polling. */
export async function grantPro(
  userId: string,
  opts: { productId?: string; stripeCustomerId?: string } = {}
): Promise<void> {
  const now = new Date()
  await db
    .insert(entitlement)
    .values({
      userId,
      plan: 'pro',
      lastProductId: opts.productId,
      stripeCustomerId: opts.stripeCustomerId,
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: entitlement.userId,
      set: {
        plan: 'pro',
        lastProductId: opts.productId,
        stripeCustomerId: opts.stripeCustomerId,
        updatedAt: now,
      },
    })
}

/** Snapshot of usage for the dashboard / paywall UI. */
export async function getUsageSummary(userId: string): Promise<{
  plan: Plan
  actions: Record<MeteredAction, { used: number; limit: number; remaining: number }>
}> {
  const plan = await getPlan(userId)
  const actions = {} as Record<MeteredAction, { used: number; limit: number; remaining: number }>
  for (const action of Object.keys(FREE_LIMITS) as MeteredAction[]) {
    const limit = FREE_LIMITS[action]
    if (plan === 'pro') {
      actions[action] = { used: 0, limit, remaining: Infinity }
    } else {
      const used = await getUsageCount(userId, action)
      actions[action] = { used, limit, remaining: Math.max(0, limit - used) }
    }
  }
  return { plan, actions }
}
