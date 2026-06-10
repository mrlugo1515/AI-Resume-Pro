'use server'

import { db } from '@/lib/db'
import { subscriber } from '@/lib/db/schema'
import { sql } from 'drizzle-orm'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function subscribeEmail(
  email: string,
  source = 'unknown'
): Promise<{ success: boolean; error?: string }> {
  const trimmed = email.trim().toLowerCase()

  if (!EMAIL_RE.test(trimmed)) {
    return { success: false, error: 'Please enter a valid email address.' }
  }

  try {
    // Insert, ignoring duplicates so re-subscribing is a no-op success.
    await db
      .insert(subscriber)
      .values({ email: trimmed, source })
      .onConflictDoNothing({ target: subscriber.email })

    return { success: true }
  } catch (error) {
    console.error('Subscribe error:', error)
    return { success: false, error: 'Something went wrong. Please try again.' }
  }
}
