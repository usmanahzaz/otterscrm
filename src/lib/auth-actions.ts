'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import type { Profile, WorkspaceMember, Workspace, WorkspaceRole } from '@/types/database'

// ── Sign Up ────────────────────────────────────────────────
export async function signUp(formData: FormData) {
  const supabase = await createClient()

  const fullName      = formData.get('full_name') as string
  const email         = formData.get('email') as string
  const password      = formData.get('password') as string
  const workspaceName = formData.get('workspace_name') as string

  // 1. Create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/confirm`,
    },
  })

  if (authError)       return { error: authError.message }
  if (!authData.user)  return { error: 'Failed to create account. Please try again.' }

  // 2. Create workspace (service client bypasses RLS — user isn't a member yet)
  const service    = await createServiceClient()
  const base       = workspaceName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  const uniqueSlug = `${base}-${Math.random().toString(36).slice(2, 7)}`

  const { data: wsData, error: wsError } = await service
    .from('workspaces')
    .insert({ name: workspaceName, slug: uniqueSlug })
    .select()
    .single()

  if (wsError || !wsData) return { error: 'Failed to create workspace. Please try again.' }

  const workspace = wsData as Workspace

  // 3. Add user as owner
  const { error: memberError } = await service
    .from('workspace_members')
    .insert({
      workspace_id: workspace.id,
      user_id:      authData.user.id,
      role:         'owner',
      joined_at:    new Date().toISOString(),
    })

  if (memberError) return { error: 'Failed to set up workspace membership.' }

  return { success: true, message: 'Check your email to confirm your account.' }
}

// ── Sign In ────────────────────────────────────────────────
export async function signIn(formData: FormData) {
  const supabase = await createClient()
  const email    = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error: error.message }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

// ── Sign Out ───────────────────────────────────────────────
export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}

// ── Get current user + workspace ───────────────────────────
export async function getCurrentUser() {
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) return null

  const { data: profileData } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const profile = profileData as Profile | null

  const { data: membershipsData } = await supabase
    .from('workspace_members')
    .select('*, workspace:workspaces(*)')
    .eq('user_id', user.id)

  const memberships = (membershipsData ?? []) as Array<WorkspaceMember & { workspace: Workspace }>

  return {
    user,
    profile,
    memberships,
    workspace: (memberships[0]?.workspace ?? null) as Workspace | null,
    role:      (memberships[0]?.role ?? null) as WorkspaceRole | null,
  }
}
