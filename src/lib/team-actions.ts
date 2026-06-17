'use server'

import { cookies } from 'next/headers'
import { db } from '@/lib/db'
import { verifyJWT } from '@/lib/jwt'

async function getAuthContext() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value
  if (!token) return null
  const payload = await verifyJWT(token)
  if (!payload) return null
  return { userId: payload.userId, workspaceId: payload.workspaceId }
}

export async function getWorkspaceTeam() {
  const auth = await getAuthContext()
  if (!auth) return []

  const members = await db.workspaceMember.findMany({
    where: { workspaceId: auth.workspaceId },
    include: { user: { select: { id: true, fullName: true, email: true } } },
  })
  return members
}

export async function inviteMember(formData: FormData) {
  const auth = await getAuthContext()
  if (!auth) return { error: 'Not authenticated' }

  const email = (formData.get('email') as string)?.trim().toLowerCase()
  if (!email) return { error: 'Email is required' }

  const workspace = await db.workspace.findUnique({
    where: { id: auth.workspaceId },
  })
  if (!workspace) return { error: 'Workspace not found' }

  const inviter = await db.user.findUnique({
    where: { id: auth.userId },
    include: { workspaces: { where: { workspaceId: auth.workspaceId } } },
  })
  if (!inviter?.workspaces[0] || !['owner', 'admin'].includes(inviter.workspaces[0].role)) {
    return { error: 'You do not have permission to invite members' }
  }

  return { success: true, message: 'Invite sent (email integration coming soon)' }
}

export async function updateMemberRole(memberId: string, role: string) {
  const auth = await getAuthContext()
  if (!auth) return { error: 'Not authenticated' }

  const member = await db.workspaceMember.findUnique({
    where: { id: memberId },
    include: { workspace: { include: { members: { where: { id: auth.userId } } } } },
  })

  if (!member) return { error: 'Member not found' }
  if (!member.workspace.members.length) return { error: 'You do not have permission' }

  await db.workspaceMember.update({
    where: { id: memberId },
    data: { role: role as any },
  })

  return { success: true }
}

export async function removeMember(memberId: string) {
  const auth = await getAuthContext()
  if (!auth) return { error: 'Not authenticated' }

  const member = await db.workspaceMember.findUnique({
    where: { id: memberId },
  })
  if (!member) return { error: 'Member not found' }
  if (member.userId === auth.userId) return { error: 'Cannot remove yourself' }

  await db.workspaceMember.delete({
    where: { id: memberId },
  })

  return { success: true }
}
