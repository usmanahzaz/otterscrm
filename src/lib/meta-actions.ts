'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth-actions'

// ── Get all connected meta pages ────────────────────────────
export async function getConnectedMetaPages() {
  const currentUser = await getCurrentUser()
  if (!currentUser?.workspace?.id) {
    throw new Error('No workspace found')
  }

  const pages = await db.metaPage.findMany({
    where: { workspaceId: currentUser.workspace.id },
    orderBy: { connectedAt: 'desc' },
  })

  return pages
}

// ── Connect meta page ──────────────────────────────────────
export async function connectMetaPage(formData: FormData) {
  const currentUser = await getCurrentUser()
  if (!currentUser?.workspace?.id) {
    throw new Error('No workspace found')
  }

  const pageId = formData.get('page_id') as string
  const pageName = formData.get('page_name') as string
  const accessToken = formData.get('access_token') as string

  if (!pageId || !pageName || !accessToken) {
    return { error: 'All fields are required' }
  }

  try {
    // Check if page already connected
    const existing = await db.metaPage.findFirst({
      where: {
        workspaceId: currentUser.workspace.id,
        pageId,
      },
    })

    if (existing) {
      return { error: 'This Meta page is already connected' }
    }

    const page = await db.metaPage.create({
      data: {
        workspaceId: currentUser.workspace.id,
        pageId,
        pageName,
        accessToken,
        isActive: true,
      },
    })

    revalidatePath('/dashboard/integrations')
    return { success: true, page }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to connect page'
    return { error: message }
  }
}

// ── Disconnect meta page ────────────────────────────────────
export async function disconnectMetaPage(pageId: string) {
  const currentUser = await getCurrentUser()
  if (!currentUser?.workspace?.id) {
    throw new Error('No workspace found')
  }

  const page = await db.metaPage.findFirst({
    where: {
      id: pageId,
      workspaceId: currentUser.workspace.id,
    },
  })

  if (!page) {
    throw new Error('Meta page not found')
  }

  await db.metaPage.delete({
    where: { id: pageId },
  })

  revalidatePath('/dashboard/integrations')
  return { success: true }
}

// ── Toggle page active status ──────────────────────────────
export async function toggleMetaPageStatus(pageId: string) {
  const currentUser = await getCurrentUser()
  if (!currentUser?.workspace?.id) {
    throw new Error('No workspace found')
  }

  const page = await db.metaPage.findFirst({
    where: {
      id: pageId,
      workspaceId: currentUser.workspace.id,
    },
  })

  if (!page) {
    throw new Error('Meta page not found')
  }

  const updated = await db.metaPage.update({
    where: { id: pageId },
    data: { isActive: !page.isActive },
  })

  revalidatePath('/dashboard/integrations')
  return updated
}
