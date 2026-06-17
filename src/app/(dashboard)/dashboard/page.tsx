import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth-actions'
import { signOut } from '@/lib/auth-actions'
import { Orbit, LogOut, Users, BarChart3, Bell } from 'lucide-react'

export default async function DashboardPage() {
  const currentUser = await getCurrentUser()

  if (!currentUser) redirect('/login')

  const { user, profile, workspace, role } = currentUser

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
              {profile?.fullName?.charAt(0).toUpperCase() ?? '?'}
            </div>
            <span className="text-[13px] text-white/70 hidden sm:block">
              {profile?.fullName ?? 'User'}
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
            Phase 1 complete — Prisma + PostgreSQL ready
          </div>

          <h1
            className="text-3xl font-bold text-white mb-3"
            style={{ letterSpacing: '-0.025em' }}
          >
            Welcome, {profile?.fullName?.split(' ')[0] ?? 'there'} 👋
          </h1>
          <p className="text-[15px] mb-8" style={{ color: '#8898aa' }}>
            Your workspace <span className="text-white font-medium">{workspace?.name}</span> is ready.
            The full dashboard is coming in Phase 2.
          </p>

          {/* Phase checklist */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-left space-y-3">
            {[
              { done: true,  label: 'Prisma schema (8 tables, enums, relationships)' },
              { done: true,  label: 'PostgreSQL connection ready for Railway' },
              { done: true,  label: 'JWT auth (email/password + bcrypt)' },
              { done: true,  label: 'Protected routes via middleware' },
              { done: true,  label: 'Server actions for auth flow' },
              { done: false, label: 'Phase 2 → Dashboard layout & sidebar navigation' },
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

          {/* Next steps */}
          <div className="mt-8 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <p className="text-[12px] text-blue-300 mb-3">
              <strong>Next: Deploy to Railway</strong>
            </p>
            <ol className="text-[11px] text-blue-300/80 space-y-1.5 text-left">
              <li>1. Connect GitHub repo to Railway</li>
              <li>2. Add PostgreSQL plugin</li>
              <li>3. Set DATABASE_URL from plugin</li>
              <li>4. Set JWT_SECRET env var</li>
              <li>5. Run <code className="bg-white/5 px-1 rounded">npx prisma migrate deploy</code></li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
