'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { signJWT, verifyJWT, type JWTPayload } from '@/lib/jwt'

const COOKIE_NAME = 'auth-token'
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 30 * 24 * 60 * 60, // 30 days
}

// ── Get current user from JWT cookie ───────────────────────
export async function getCurrentUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value

  if (!token) return null

  const payload = await verifyJWT(token)
  if (!payload) return null

  const user = await db.user.findUnique({
    where: { id: payload.userId },
    include: {
      profile: true,
      workspaces: {
        include: { workspace: true },
        where: { workspaceId: payload.workspaceId },
      },
    },
  })

  if (!user) return null

  const workspace = user.workspaces[0]?.workspace ?? null
  const role = user.workspaces[0]?.role ?? null

  return {
    user,
    profile: user.profile,
    workspace,
    role,
  }
}

// ── Sign Up ────────────────────────────────────────────────
export async function signUp(formData: FormData) {
  const fullName       = formData.get('full_name') as string
  const email          = formData.get('email') as string
  const password       = formData.get('password') as string
  const workspaceName  = formData.get('workspace_name') as string

  if (!fullName || !email || !password || !workspaceName) {
    return { error: 'All fields are required.' }
  }

  // Check if user exists
  const existing = await db.user.findUnique({ where: { email } })
  if (existing) {
    return { error: 'Email already in use.' }
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Create user, profile, workspace, and membership in one transaction
  try {
    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
        profile: {
          create: {
            fullName,
          },
        },
        workspaces: {
          create: {
            role: 'owner',
            joinedAt: new Date(),
            workspace: {
              create: {
                name: workspaceName,
                slug: `${workspaceName
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, '-')
                  .replace(/^-|-$/g, '')}-${Math.random().toString(36).slice(2, 7)}`,
              },
            },
          },
        },
      },
      include: {
        workspaces: { include: { workspace: true } },
      },
    })

    const workspace = newUser.workspaces[0]?.workspace
    if (!workspace) throw new Error('Failed to create workspace')

    // Create JWT and set cookie
    const token = await signJWT({
      userId: newUser.id,
      email: newUser.email,
      workspaceId: workspace.id,
    })

    const cookieStore = await cookies()
    cookieStore.set(COOKIE_NAME, token, COOKIE_OPTIONS)

    revalidatePath('/', 'layout')
    redirect('/dashboard')
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to create account.'
    return { error: message }
  }
}

// ── Sign In ────────────────────────────────────────────────
export async function signIn(formData: FormData) {
  const email    = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email and password are required.' }
  }

  const user = await db.user.findUnique({
    where: { email },
    include: { workspaces: { include: { workspace: true } } },
  })

  if (!user) {
    return { error: 'Invalid email or password.' }
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    return { error: 'Invalid email or password.' }
  }

  const workspace = user.workspaces[0]?.workspace
  if (!workspace) {
    return { error: 'No workspace found. Please sign up again.' }
  }

  // Create JWT and set cookie
  const token = await signJWT({
    userId: user.id,
    email: user.email,
    workspaceId: workspace.id,
  })

  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, COOKIE_OPTIONS)

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

// ── Sign Out ───────────────────────────────────────────────
export async function signOut() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
  revalidatePath('/', 'layout')
  redirect('/login')
}
