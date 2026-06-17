'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { verifyJWT } from '@/lib/jwt'

const COOKIE_NAME = 'auth-token'

async function getAuthUserId(): Promise<string | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return null
  const payload = await verifyJWT(token)
  return payload?.userId ?? null
}

export async function updateProfile(formData: FormData) {
  const userId = await getAuthUserId()
  if (!userId) return { error: 'Not authenticated.' }

  const fullName = (formData.get('full_name') as string)?.trim()
  const phone    = (formData.get('phone') as string)?.trim() || null

  if (!fullName) return { error: 'Full name is required.' }

  await db.user.update({
    where: { id: userId },
    data: { fullName },
  })

  await db.profile.upsert({
    where: { id: userId },
    create: { id: userId, fullName, phone },
    update: { fullName, phone },
  })

  revalidatePath('/dashboard/settings')
  return { success: true }
}

export async function updateWorkspace(formData: FormData) {
  const userId = await getAuthUserId()
  if (!userId) return { error: 'Not authenticated.' }

  const name = (formData.get('workspace_name') as string)?.trim()
  if (!name) return { error: 'Workspace name is required.' }

  const member = await db.workspaceMember.findFirst({
    where: { userId, role: { in: ['owner', 'admin'] } },
  })

  if (!member) return { error: 'You do not have permission to update this workspace.' }

  await db.workspace.update({
    where: { id: member.workspaceId },
    data: { name },
  })

  revalidatePath('/dashboard/settings')
  revalidatePath('/', 'layout')
  return { success: true }
}

export async function changePassword(formData: FormData) {
  const userId = await getAuthUserId()
  if (!userId) return { error: 'Not authenticated.' }

  const currentPassword = formData.get('current_password') as string
  const newPassword     = formData.get('new_password') as string
  const confirmPassword = formData.get('confirm_password') as string

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { error: 'All password fields are required.' }
  }

  if (newPassword.length < 8) {
    return { error: 'New password must be at least 8 characters.' }
  }

  if (newPassword !== confirmPassword) {
    return { error: 'New passwords do not match.' }
  }

  const user = await db.user.findUnique({ where: { id: userId } })
  if (!user) return { error: 'User not found.' }

  const isValid = await bcrypt.compare(currentPassword, user.password)
  if (!isValid) return { error: 'Current password is incorrect.' }

  const hashed = await bcrypt.hash(newPassword, 10)
  await db.user.update({ where: { id: userId }, data: { password: hashed } })

  return { success: true }
}
