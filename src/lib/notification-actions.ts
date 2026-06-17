'use server'

import { cookies } from 'next/headers'
import { db } from '@/lib/db'
import { verifyJWT } from '@/lib/jwt'

async function getAuthUserId(): Promise<string | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value
  if (!token) return null
  const payload = await verifyJWT(token)
  return payload?.userId ?? null
}

export async function getUnreadNotificationCount(): Promise<number> {
  const userId = await getAuthUserId()
  if (!userId) return 0

  const count = await db.notification.count({
    where: { userId, status: { in: ['pending', 'sent'] } },
  })
  return count
}
