'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth-actions'
import type { LeadStatus } from '@prisma/client'

// ── Get all leads for workspace with filters ────────────────
export async function getLeads(options?: {
  status?: LeadStatus
  assignedToId?: string
  startDate?: Date
  endDate?: Date
  search?: string
}) {
  const currentUser = await getCurrentUser()
  if (!currentUser?.workspace?.id) {
    throw new Error('No workspace found')
  }

  const where: any = {
    workspaceId: currentUser.workspace.id,
  }

  if (options?.status) {
    where.status = options.status
  }

  if (options?.assignedToId) {
    where.assignedToId = options.assignedToId
  }

  if (options?.startDate || options?.endDate) {
    where.createdAt = {}
    if (options.startDate) {
      where.createdAt.gte = options.startDate
    }
    if (options.endDate) {
      where.createdAt.lte = options.endDate
    }
  }

  if (options?.search) {
    where.OR = [
      { fullName: { contains: options.search, mode: 'insensitive' } },
      { email: { contains: options.search, mode: 'insensitive' } },
      { phone: { contains: options.search, mode: 'insensitive' } },
    ]
  }

  const leads = await db.lead.findMany({
    where,
    include: {
      assignedTo: {
        select: {
          id: true,
          fullName: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return leads
}

// ── Get workspace members for assignee dropdown ────────────────
export async function getWorkspaceMembers() {
  const currentUser = await getCurrentUser()
  if (!currentUser?.workspace?.id) {
    throw new Error('No workspace found')
  }

  const members = await db.workspaceMember.findMany({
    where: { workspaceId: currentUser.workspace.id },
    include: {
      user: {
        select: {
          id: true,
          fullName: true,
        },
      },
    },
  })

  return members
}

// ── Delete multiple leads ────────────────────────────────────
export async function deleteLeads(leadIds: string[]) {
  const currentUser = await getCurrentUser()
  if (!currentUser?.workspace?.id) {
    throw new Error('No workspace found')
  }

  // Verify all leads belong to the workspace
  const leads = await db.lead.findMany({
    where: {
      id: { in: leadIds },
      workspaceId: currentUser.workspace.id,
    },
  })

  if (leads.length !== leadIds.length) {
    throw new Error('One or more leads not found')
  }

  await db.lead.deleteMany({
    where: { id: { in: leadIds } },
  })

  revalidatePath('/dashboard/leads')
  return { success: true }
}

// ── Assign leads to user ────────────────────────────────────
export async function assignLeads(leadIds: string[], assignedToId: string) {
  const currentUser = await getCurrentUser()
  if (!currentUser?.workspace?.id) {
    throw new Error('No workspace found')
  }

  // Verify user exists in workspace
  const member = await db.workspaceMember.findFirst({
    where: {
      workspaceId: currentUser.workspace.id,
      userId: assignedToId,
    },
  })

  if (!member) {
    throw new Error('User not found in workspace')
  }

  // Verify all leads belong to the workspace
  const leads = await db.lead.findMany({
    where: {
      id: { in: leadIds },
      workspaceId: currentUser.workspace.id,
    },
  })

  if (leads.length !== leadIds.length) {
    throw new Error('One or more leads not found')
  }

  await db.lead.updateMany({
    where: { id: { in: leadIds } },
    data: { assignedToId },
  })

  revalidatePath('/dashboard/leads')
  return { success: true }
}
