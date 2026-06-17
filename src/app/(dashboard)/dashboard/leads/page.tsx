import { redirect } from 'next/navigation'
import { Plus } from 'lucide-react'
import { LeadsContent } from '@/components/leads-content'
import { getLeads, getWorkspaceMembers } from '@/lib/leads-actions'
import { getCurrentUser } from '@/lib/auth-actions'

export default async function LeadsPage() {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    redirect('/login')
  }

  const [initialLeads, members] = await Promise.all([getLeads(), getWorkspaceMembers()])

  return (
    <div className="flex flex-col h-full">
      {/* Page header */}
      <div className="border-b border-[#e3e8ee] px-8 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0a2540]" style={{ letterSpacing: '-0.025em' }}>
            Leads
          </h1>
          <p className="text-[13px] text-[#8898aa] mt-1">
            {initialLeads.length} lead{initialLeads.length !== 1 ? 's' : ''} in your workspace
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#635bff] text-white text-[13px] font-semibold hover:bg-[#5350e6] transition-colors">
          <Plus className="w-4 h-4" />
          Import Leads
        </button>
      </div>

      {/* Content with filters and table */}
      <LeadsContent initialLeads={initialLeads} members={members} />
    </div>
  )
}
