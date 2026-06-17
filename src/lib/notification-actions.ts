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

export async function createStatusChangeNotification(
  leadId: string,
  newStatus: string,
  userId: string,
  workspaceId: string
) {
  await db.notification.create({
    data: {
      leadId,
      userId,
      workspaceId,
      channel: 'in_app',
      title: `Lead status changed to ${newStatus}`,
      status: 'sent',
    },
  })
}

export async function createAssignmentNotification(
  leadId: string,
  assignedToId: string,
  assignedById: string,
  workspaceId: string
) {
  const assignee = await db.user.findUnique({
    where: { id: assignedToId },
    select: { fullName: true },
  })

  await db.notification.create({
    data: {
      leadId,
      userId: assignedToId,
      workspaceId,
      channel: 'in_app',
      title: `You have been assigned a lead: ${assignee?.fullName ?? 'New Lead'}`,
      status: 'sent',
    },
  })
}
