import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth-actions'
import { Plus } from 'lucide-react'
import { getWorkspaceTeam } from '@/lib/team-actions'
import { TeamContent } from '@/components/team-content'

export default async function TeamPage() {
  const currentUser = await getCurrentUser()

  if (!currentUser) redirect('/login')

  const members = await getWorkspaceTeam()
  const canManageTeam = currentUser.role === 'owner' || currentUser.role === 'admin'

  return (
    <div className="flex flex-col h-full">
      {/* Page header */}
      <div className="border-b border-[#e3e8ee] px-8 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0a2540]" style={{ letterSpacing: '-0.025em' }}>
            Team
          </h1>
          <p className="text-[13px] text-[#8898aa] mt-1">
            {members.length} team member{members.length !== 1 ? 's' : ''}
          </p>
        </div>
        {canManageTeam && (
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#635bff] text-white text-[13px] font-semibold hover:bg-[#5350e6] transition-colors">
            <Plus className="w-4 h-4" />
            Invite Member
          </button>
        )}
      </div>

      {/* Content */}
      <TeamContent members={members} canManageTeam={canManageTeam} currentUserId={currentUser.user.id} />
    </div>
  )
}
