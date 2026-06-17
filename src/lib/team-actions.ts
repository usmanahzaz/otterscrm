'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth-actions'
import type { WorkspaceRole } from '@prisma/client'

// ── Get workspace members with details ────────────────────
export async function getWorkspaceTeam() {
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
          email: true,
          fullName: true,
          profile: {
            select: {
              avatarUrl: true,
            },
          },
        },
      },
    },
    orderBy: {
      joinedAt: 'desc',
    },
  })

  return members
}

// ── Invite member to workspace ────────────────────────────
export async function inviteMember(formData: FormData) {
  const currentUser = await getCurrentUser()
  if (!currentUser?.workspace?.id) {
    throw new Error('No workspace found')
  }

  // Check if user is owner or admin
  if (currentUser.role !== 'owner' && currentUser.role !== 'admin') {
    return { error: 'Only owners and admins can invite members' }
  }

  const email = formData.get('email') as string
  const role = formData.get('role') as string

  if (!email || !role) {
    return { error: 'Email and role are required' }
  }

  if (!['owner', 'admin', 'manager', 'agent'].includes(role)) {
    return { error: 'Invalid role' }
  }

  try {
    // Check if user already exists
    let user = await db.user.findUnique({
      where: { email },
    })

    // If user doesn't exist, we could create an invitation (not implemented yet)
    if (!user) {
      // For now, return an error
      return { error: 'User with this email does not exist. They need to sign up first.' }
    }

    // Check if user is already in workspace
    const existingMember = await db.workspaceMember.findFirst({
      where: {
        workspaceId: currentUser.workspace.id,
        userId: user.id,
      },
    })

    if (existingMember) {
      return { error: 'User is already a member of this workspace' }
    }

    // Add user to workspace
    const member = await db.workspaceMember.create({
      data: {
        workspaceId: currentUser.workspace.id,
        userId: user.id,
        role: role as WorkspaceRole,
        joinedAt: new Date(),
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            fullName: true,
            profile: {
              select: {
                avatarUrl: true,
              },
            },
          },
        },
      },
    })

    revalidatePath('/dashboard/team')
    return { success: true, member }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to invite member'
    return { error: message }
  }
}

// ── Update member role ────────────────────────────────────
export async function updateMemberRole(memberId: string, newRole: WorkspaceRole) {
  const currentUser = await getCurrentUser()
  if (!currentUser?.workspace?.id) {
    throw new Error('No workspace found')
  }

  // Check if user is owner or admin
  if (currentUser.role !== 'owner' && currentUser.role !== 'admin') {
    throw new Error('Only owners and admins can change roles')
  }

  const member = await db.workspaceMember.findFirst({
    where: {
      id: memberId,
      workspaceId: currentUser.workspace.id,
    },
  })

  if (!member) {
    throw new Error('Member not found')
  }

  // Prevent changing owner role
  if (member.role === 'owner' && currentUser.user.id !== member.userId) {
    throw new Error('Cannot change owner role')
  }

  // Can't change your own role to non-owner if you're the only owner
  if (member.userId === currentUser.user.id && newRole !== 'owner') {
    const ownerCount = await db.workspaceMember.count({
      where: {
        workspaceId: currentUser.workspace.id,
        role: 'owner',
      },
    })

    if (ownerCount === 1) {
      throw new Error('Cannot remove yourself as the only owner')
    }
  }

  const updated = await db.workspaceMember.update({
    where: { id: memberId },
    data: { role: newRole },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          fullName: true,
          profile: {
            select: {
              avatarUrl: true,
            },
          },
        },
      },
    },
  })

  revalidatePath('/dashboard/team')
  return updated
}

// ── Remove member from workspace ──────────────────────────
export async function removeMember(memberId: string) {
  const currentUser = await getCurrentUser()
  if (!currentUser?.workspace?.id) {
    throw new Error('No workspace found')
  }

  // Check if user is owner or admin
  if (currentUser.role !== 'owner' && currentUser.role !== 'admin') {
    throw new Error('Only owners and admins can remove members')
  }

  const member = await db.workspaceMember.findFirst({
    where: {
      id: memberId,
      workspaceId: currentUser.workspace.id,
    },
  })

  if (!member) {
    throw new Error('Member not found')
  }

  // Prevent removing the last owner
  if (member.role === 'owner') {
    const ownerCount = await db.workspaceMember.count({
      where: {
        workspaceId: currentUser.workspace.id,
        role: 'owner',
      },
    })

    if (ownerCount === 1) {
      throw new Error('Cannot remove the last owner from the workspace')
    }
  }

  // Prevent removing yourself if you're the only owner
  if (member.userId === currentUser.user.id && member.role === 'owner') {
    throw new Error('Cannot remove yourself as the only owner')
  }

  await db.workspaceMember.delete({
    where: { id: memberId },
  })

  revalidatePath('/dashboard/team')
  return { success: true }
}
