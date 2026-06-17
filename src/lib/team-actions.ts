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
