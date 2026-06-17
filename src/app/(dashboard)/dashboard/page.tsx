import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth-actions'
import { signOut } from '@/lib/auth-actions'
import { Orbit, LogOut, Users, BarChart3, Bell } from 'lucide-react'

export default async function DashboardPage() {
  const currentUser = await getCurrentUser()

  if (!currentUser) redirect('/login')

  const { profile, workspace, role } = currentUser

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a2540' }}>

      {/* Top nav */}
      <header className="border-b border-white/10 px-6 h-14 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-md bg-[#635bff] flex items-center justify-center">
            <Orbit className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-semibold text-[14px]" style={{ letterSpacing: '-0.01em' }}>
            {workspace?.name ?? 'LeadOrbit'}
          </span>
          {role && (
            <span
              className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(99,91,255,0.25)', color: '#a9a5ff' }}
            >
              {role}
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-lg hover:bg-white/5 transition-colors">
            <Bell className="w-4 h-4 text-white/50" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#635bff]" />
          </button>

          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
              style={{ background: 'linear-gradient(135deg,#635bff,#a78bfa)' }}
            >
              {profile?.full_name?.charAt(0).toUpperCase() ?? '?'}
            </div>
            <span className="text-[13px] text-white/70 hidden sm:block">
              {profile?.full_name ?? 'User'}
            </span>
          </div>

          <form action={signOut}>
            <button
              type="submit"
              className="flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:block">Sign out</span>
            </button>
          </form>
        </div>
      </header>

      {/* Body */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          {/* Phase completion badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-[12px] font-semibold"
            style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399', border: '1px solid rgba(16,185,129,0.25)' }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Phase 1 complete — Authentication working
          </div>

          <h1
            className="text-3xl font-bold text-white mb-3"
            style={{ letterSpacing: '-0.025em' }}
          >
            Welcome, {profile?.full_name?.split(' ')[0] ?? 'there'} 👋
          </h1>
          <p className="text-[15px] mb-8" style={{ color: '#8898aa' }}>
            Your workspace <span className="text-white font-medium">{workspace?.name}</span> is ready.
            The full dashboard is coming in Phase 2.
          </p>

          {/* Phase checklist */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-left space-y-3">
            {[
              { done: true,  label: 'Database schema & RLS policies' },
              { done: true,  label: 'Supabase auth (email + password)' },
              { done: true,  label: 'Workspace created on signup' },
              { done: true,  label: 'Protected routes via middleware' },
              { done: true,  label: 'Server actions for sign in / sign out' },
              { done: false, label: 'Phase 2 → Dashboard layout & navigation' },
              { done: false, label: 'Phase 3 → Leads table & filtering' },
              { done: false, label: 'Phase 4 → Lead details & CRM actions' },
            ].map(({ done, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] ${
                    done
                      ? 'bg-emerald-500 text-white'
                      : 'border border-white/15'
                  }`}
                >
                  {done && '✓'}
                </div>
                <span
                  className="text-[13px]"
                  style={{ color: done ? '#e4e9f0' : '#425466' }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Stats preview */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {[
              { icon: Users,    label: 'Team members', value: '1' },
              { icon: BarChart3, label: 'Leads',        value: '0' },
              { icon: Bell,     label: 'Notifications', value: '0' },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="rounded-xl border border-white/10 p-4"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                <Icon className="w-4 h-4 mb-2" style={{ color: '#635bff' }} />
                <p className="text-[20px] font-bold text-white">{value}</p>
                <p className="text-[11px] mt-0.5" style={{ color: '#425466' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
