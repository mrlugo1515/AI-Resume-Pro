'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { entitlement, referral } from '@/lib/db/schema'
import { and, count, eq, ne, sql } from 'drizzle-orm'
import { headers } from 'next/headers'
import { REFERRAL_REWARD_CREDITS, type ReferralStats, type ClaimResult } from '@/lib/referral'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

// Unambiguous alphabet (no 0/O/1/I) for human-readable, shareable codes.
const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

function generateCode(length = 7): string {
  const bytes = crypto.getRandomValues(new Uint8Array(length))
  let out = ''
  for (let i = 0; i < length; i++) out += CODE_ALPHABET[bytes[i] % CODE_ALPHABET.length]
  return out
}

/** Increment a user's bonus credits, creating the entitlement row if needed. */
async function addBonusCredits(userId: string, amount: number): Promise<void> {
  await db
    .insert(entitlement)
    .values({ userId, bonusCredits: amount })
    .onConflictDoUpdate({
      target: entitlement.userId,
      set: {
        bonusCredits: sql`${entitlement.bonusCredits} + ${amount}`,
        updatedAt: new Date(),
      },
    })
}

/**
 * Ensure the current user has a referral code, generating one lazily on first
 * access. Returns the code. Retries on the rare unique-collision.
 */
export async function ensureReferralCode(): Promise<string> {
  const userId = await getUserId()

  const [existing] = await db
    .select({ referralCode: entitlement.referralCode })
    .from(entitlement)
    .where(eq(entitlement.userId, userId))
    .limit(1)
  if (existing?.referralCode) return existing.referralCode

  for (let attempt = 0; attempt < 5; attempt++) {
    const code = generateCode()
    try {
      await db
        .insert(entitlement)
        .values({ userId, referralCode: code })
        .onConflictDoUpdate({
          target: entitlement.userId,
          // Only set a code if the row doesn't already have one.
          set: { referralCode: sql`coalesce(${entitlement.referralCode}, ${code})`, updatedAt: new Date() },
        })
      const [row] = await db
        .select({ referralCode: entitlement.referralCode })
        .from(entitlement)
        .where(eq(entitlement.userId, userId))
        .limit(1)
      if (row?.referralCode) return row.referralCode
    } catch {
      // Unique collision on referralCode — try a fresh code.
    }
  }
  throw new Error('Could not generate a referral code, please try again.')
}

/** Stats for the referral dashboard: code, successful referrals, credits earned. */
export async function getReferralStats(): Promise<ReferralStats> {
  const userId = await getUserId()
  const code = await ensureReferralCode()

  const [[countRow], [creditRow]] = await Promise.all([
    db.select({ value: count() }).from(referral).where(eq(referral.referrerUserId, userId)),
    db
      .select({ bonusCredits: entitlement.bonusCredits })
      .from(entitlement)
      .where(eq(entitlement.userId, userId))
      .limit(1),
  ])

  return {
    code,
    referralCount: countRow?.value ?? 0,
    bonusCredits: creditRow?.bonusCredits ?? 0,
    rewardPerReferral: REFERRAL_REWARD_CREDITS,
  }
}

/**
 * Attribute the current (newly signed-up) user to a referrer by code and grant
 * bonus credits to both sides. Idempotent: a user can only be attributed once.
 */
export async function claimReferral(rawCode: string | null | undefined): Promise<ClaimResult> {
  const code = rawCode?.trim().toUpperCase()
  if (!code) return { status: 'no_code' }

  const userId = await getUserId()

  // Already attributed? (one referrer per user, enforced by unique constraint)
  const [already] = await db
    .select({ id: referral.id })
    .from(referral)
    .where(eq(referral.referredUserId, userId))
    .limit(1)
  if (already) return { status: 'already_attributed' }

  // Find the referrer by their code (and make sure it isn't the user's own).
  const [referrer] = await db
    .select({ userId: entitlement.userId })
    .from(entitlement)
    .where(and(eq(entitlement.referralCode, code), ne(entitlement.userId, userId)))
    .limit(1)
  if (!referrer) {
    // Could be a non-existent code or the user's own code.
    const [own] = await db
      .select({ userId: entitlement.userId })
      .from(entitlement)
      .where(eq(entitlement.referralCode, code))
      .limit(1)
    return own ? { status: 'self_referral' } : { status: 'invalid_code' }
  }

  // Record the referral. The unique constraint on referredUserId guards against
  // a race where two requests try to attribute the same user concurrently.
  const inserted = await db
    .insert(referral)
    .values({ referrerUserId: referrer.userId, referredUserId: userId })
    .onConflictDoNothing({ target: referral.referredUserId })
    .returning({ id: referral.id })
  if (inserted.length === 0) return { status: 'already_attributed' }

  // Reward both sides.
  await Promise.all([
    addBonusCredits(referrer.userId, REFERRAL_REWARD_CREDITS),
    addBonusCredits(userId, REFERRAL_REWARD_CREDITS),
  ])

  return { status: 'granted' }
}
