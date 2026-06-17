import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth-actions'
import { Plus, Users } from 'lucide-react'

export default async function TeamPage() {
  const currentUser = await getCurrentUser()

  if (!currentUser) redirect('/login')

  return (
    <div className="flex flex-col h-full">
      {/* Page header */}
      <div className="border-b border-[#e3e8ee] px-8 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0a2540]" style={{ letterSpacing: '-0.025em' }}>
            Team
          </h1>
          <p className="text-[13px] text-[#8898aa] mt-1">
            Manage team members and their roles
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#635bff] text-white text-[13px] font-semibold hover:bg-[#5350e6] transition-colors">
          <Plus className="w-4 h-4" />
          Invite Member
        </button>
      </div>

      {/* Content area */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-sm">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: 'rgba(99,91,255,0.1)' }}
          >
            <Users className="w-6 h-6 text-[#635bff]" />
          </div>
          <h2 className="text-lg font-semibold text-[#0a2540] mb-2">
            Team management coming soon
          </h2>
          <p className="text-[13px] text-[#8898aa]">
            Phase 8 will include full team collaboration features.
          </p>
        </div>
      </div>
    </div>
  )
}
