'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth-actions'

// ── Get user notifications ──────────────────────────────────
export async function getUserNotifications() {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    throw new Error('No user found')
  }

  const notifications = await db.notification.findMany({
    where: {
      userId: currentUser.user.id,
      workspaceId: currentUser.workspace?.id,
    },
    include: {
      lead: {
        select: {
          id: true,
          fullName: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 50,
  })

  return notifications
}

// ── Get unread notification count ───────────────────────────
export async function getUnreadNotificationCount() {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    throw new Error('No user found')
  }

  const count = await db.notification.count({
    where: {
      userId: currentUser.user.id,
      workspaceId: currentUser.workspace?.id,
      status: { not: 'read' },
    },
  })

  return count
}

// ── Mark notification as read ───────────────────────────────
export async function markNotificationAsRead(notificationId: string) {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    throw new Error('No user found')
  }

  const notification = await db.notification.findFirst({
    where: {
      id: notificationId,
      userId: currentUser.user.id,
      workspaceId: currentUser.workspace?.id,
    },
  })

  if (!notification) {
    throw new Error('Notification not found')
  }

  const updated = await db.notification.update({
    where: { id: notificationId },
    data: {
      status: 'read',
      readAt: new Date(),
    },
  })

  revalidatePath('/', 'layout')
  return updated
}

// ── Mark all notifications as read ──────────────────────────
export async function markAllNotificationsAsRead() {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    throw new Error('No user found')
  }

  await db.notification.updateMany({
    where: {
      userId: currentUser.user.id,
      workspaceId: currentUser.workspace?.id,
      status: { not: 'read' },
    },
    data: {
      status: 'read',
      readAt: new Date(),
    },
  })

  revalidatePath('/', 'layout')
}

// ── Create notification for status change ───────────────────
export async function createStatusChangeNotification(
  leadId: string,
  workspaceId: string,
  assignedToId: string | null,
  newStatus: string
) {
  if (!assignedToId) return

  const notification = await db.notification.create({
    data: {
      workspaceId,
      userId: assignedToId,
      leadId,
      channel: 'in_app',
      title: 'Lead status updated',
      body: `A lead's status was changed to ${newStatus}`,
      status: 'pending',
    },
  })

  return notification
}

// ── Create notification for assignment ──────────────────────
export async function createAssignmentNotification(
  leadId: string,
  workspaceId: string,
  assignedToId: string | null,
  leadName: string
) {
  if (!assignedToId) return

  const notification = await db.notification.create({
    data: {
      workspaceId,
      userId: assignedToId,
      leadId,
      channel: 'in_app',
      title: 'Lead assigned to you',
      body: `You have been assigned to ${leadName}`,
      status: 'pending',
    },
  })

  return notification
}

// ── Delete notification ────────────────────────────────────
export async function deleteNotification(notificationId: string) {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    throw new Error('No user found')
  }

  const notification = await db.notification.findFirst({
    where: {
      id: notificationId,
      userId: currentUser.user.id,
    },
  })

  if (!notification) {
    throw new Error('Notification not found')
  }

  await db.notification.delete({
    where: { id: notificationId },
  })

  revalidatePath('/', 'layout')
}
