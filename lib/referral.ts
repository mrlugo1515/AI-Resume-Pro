// Shared referral constants and types. Kept out of the `'use server'` actions
// file because server-action modules may only export async functions.

// Bonus optimize credits granted to BOTH sides of a successful referral.
export const REFERRAL_REWARD_CREDITS = 1

export interface ReferralStats {
  code: string
  referralCount: number
  bonusCredits: number
  rewardPerReferral: number
}

export type ClaimResult =
  | { status: 'granted' }
  | { status: 'already_attributed' }
  | { status: 'self_referral' }
  | { status: 'invalid_code' }
  | { status: 'no_code' }
