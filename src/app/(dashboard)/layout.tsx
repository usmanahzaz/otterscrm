import { redirect } from 'next/navigation'
import { getCurrentUser, signOut } from '@/lib/auth-actions'
import { Sidebar } from '@/components/sidebar'
import { Orbit, LogOut, Bell } from 'lucide-react'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    redirect('/login')
  }

  const { user, profile, workspace, role } = currentUser

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#f6f9fc' }}>
      {/* Top header */}
      <header className="border-b border-[#e3e8ee] px-6 h-14 flex items-center justify-between flex-shrink-0 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-md bg-[#635bff] flex items-center justify-center">
            <Orbit className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-[#0a2540] font-semibold text-[14px]" style={{ letterSpacing: '-0.01em' }}>
            {workspace?.name ?? 'LeadOrbit'}
          </span>
          {role && (
            <span
              className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(99,91,255,0.1)', color: '#635bff' }}
            >
              {role}
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Bell className="w-4 h-4 text-[#8898aa]" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#635bff]" />
          </button>

          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
              style={{ background: 'linear-gradient(135deg,#635bff,#a78bfa)' }}
            >
              {profile?.fullName?.charAt(0).toUpperCase() ?? '?'}
            </div>
            <span className="text-[13px] text-[#425466] hidden sm:block">
              {profile?.fullName ?? 'User'}
            </span>
          </div>

          <form action={signOut}>
            <button
              type="submit"
              className="flex items-center gap-1.5 text-[12px] text-[#8898aa] hover:text-[#0a2540] transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:block">Sign out</span>
            </button>
          </form>
        </div>
      </header>

      {/* Body: Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
