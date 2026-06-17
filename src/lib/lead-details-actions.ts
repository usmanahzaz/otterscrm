'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth-actions'
import type { LeadStatus } from '@prisma/client'

// ── Get single lead with full details ────────────────────────
export async function getLeadDetails(leadId: string) {
  const currentUser = await getCurrentUser()
  if (!currentUser?.workspace?.id) {
    throw new Error('No workspace found')
  }

  const lead = await db.lead.findFirst({
    where: {
      id: leadId,
      workspaceId: currentUser.workspace.id,
    },
    include: {
      assignedTo: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
      activities: {
        include: {
          user: {
            select: {
              id: true,
              fullName: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
      reminders: {
        orderBy: {
          dueAt: 'asc',
        },
      },
      notifications: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })

  if (!lead) {
    throw new Error('Lead not found')
  }

  return lead
}

// ── Update lead status ────────────────────────────────────────
export async function updateLeadStatus(leadId: string, newStatus: LeadStatus) {
  const currentUser = await getCurrentUser()
  if (!currentUser?.workspace?.id) {
    throw new Error('No workspace found')
  }

  const lead = await db.lead.findFirst({
    where: {
      id: leadId,
      workspaceId: currentUser.workspace.id,
    },
  })

  if (!lead) {
    throw new Error('Lead not found')
  }

  const oldStatus = lead.status

  // Update lead and create activity
  const [updated] = await Promise.all([
    db.lead.update({
      where: { id: leadId },
      data: { status: newStatus },
      include: {
        assignedTo: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
    }),
    db.activity.create({
      data: {
        leadId,
        workspaceId: currentUser.workspace.id,
        userId: currentUser.user.id,
        type: 'status_changed',
        body: `Status changed from ${oldStatus} to ${newStatus}`,
        metadata: { oldStatus, newStatus },
      },
    }),
  ])

  revalidatePath(`/dashboard/leads/${leadId}`)
  return updated
}

// ── Update lead notes ────────────────────────────────────────
export async function updateLeadNotes(leadId: string, notes: string) {
  const currentUser = await getCurrentUser()
  if (!currentUser?.workspace?.id) {
    throw new Error('No workspace found')
  }

  const lead = await db.lead.findFirst({
    where: {
      id: leadId,
      workspaceId: currentUser.workspace.id,
    },
  })

  if (!lead) {
    throw new Error('Lead not found')
  }

  const updated = await db.lead.update({
    where: { id: leadId },
    data: { notes },
    include: {
      assignedTo: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
    },
  })

  // Log activity if notes were changed
  if (notes !== lead.notes) {
    await db.activity.create({
      data: {
        leadId,
        workspaceId: currentUser.workspace.id,
        userId: currentUser.user.id,
        type: 'note_added',
        body: notes,
      },
    })
  }

  revalidatePath(`/dashboard/leads/${leadId}`)
  return updated
}

// ── Assign lead to user ────────────────────────────────────────
export async function assignLead(leadId: string, assignedToId: string | null) {
  const currentUser = await getCurrentUser()
  if (!currentUser?.workspace?.id) {
    throw new Error('No workspace found')
  }

  const lead = await db.lead.findFirst({
    where: {
      id: leadId,
      workspaceId: currentUser.workspace.id,
    },
  })

  if (!lead) {
    throw new Error('Lead not found')
  }

  if (assignedToId) {
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
  }

  const updated = await db.lead.update({
    where: { id: leadId },
    data: { assignedToId },
    include: {
      assignedTo: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
    },
  })

  // Log activity
  const oldAssignee = lead.assignedToId
  await db.activity.create({
    data: {
      leadId,
      workspaceId: currentUser.workspace.id,
      userId: currentUser.user.id,
      type: 'assigned',
      body: assignedToId ? `Assigned to a user` : 'Unassigned',
      metadata: { oldAssignee, newAssignee: assignedToId },
    },
  })

  revalidatePath(`/dashboard/leads/${leadId}`)
  return updated
}

// ── Set follow-up reminder ────────────────────────────────────
export async function setFollowUpReminder(leadId: string, dueAt: Date, note: string) {
  const currentUser = await getCurrentUser()
  if (!currentUser?.workspace?.id) {
    throw new Error('No workspace found')
  }

  const lead = await db.lead.findFirst({
    where: {
      id: leadId,
      workspaceId: currentUser.workspace.id,
    },
  })

  if (!lead) {
    throw new Error('Lead not found')
  }

  const reminder = await db.reminder.create({
    data: {
      leadId,
      workspaceId: currentUser.workspace.id,
      assignedToId: lead.assignedToId || undefined,
      dueAt,
      note,
    },
  })

  // Update next follow up date on lead
  await db.lead.update({
    where: { id: leadId },
    data: { nextFollowUp: dueAt },
  })

  // Log activity
  await db.activity.create({
    data: {
      leadId,
      workspaceId: currentUser.workspace.id,
      userId: currentUser.user.id,
      type: 'follow_up_set',
      body: `Follow-up set for ${dueAt.toLocaleDateString()}`,
    },
  })

  revalidatePath(`/dashboard/leads/${leadId}`)
  return reminder
}

// ── Log call activity ────────────────────────────────────────
export async function logCall(leadId: string, notes: string) {
  const currentUser = await getCurrentUser()
  if (!currentUser?.workspace?.id) {
    throw new Error('No workspace found')
  }

  const lead = await db.lead.findFirst({
    where: {
      id: leadId,
      workspaceId: currentUser.workspace.id,
    },
  })

  if (!lead) {
    throw new Error('Lead not found')
  }

  const activity = await db.activity.create({
    data: {
      leadId,
      workspaceId: currentUser.workspace.id,
      userId: currentUser.user.id,
      type: 'called',
      body: notes,
    },
  })

  revalidatePath(`/dashboard/leads/${leadId}`)
  return activity
}

// ── Log email activity ────────────────────────────────────────
export async function logEmail(leadId: string, body: string) {
  const currentUser = await getCurrentUser()
  if (!currentUser?.workspace?.id) {
    throw new Error('No workspace found')
  }

  const lead = await db.lead.findFirst({
    where: {
      id: leadId,
      workspaceId: currentUser.workspace.id,
    },
  })

  if (!lead) {
    throw new Error('Lead not found')
  }

  const activity = await db.activity.create({
    data: {
      leadId,
      workspaceId: currentUser.workspace.id,
      userId: currentUser.user.id,
      type: 'email_sent',
      body,
    },
  })

  revalidatePath(`/dashboard/leads/${leadId}`)
  return activity
}
