import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth-actions'
import { Plus, Search } from 'lucide-react'
import Link from 'next/link'
import { db } from '@/lib/db'

export default async function LeadsPage() {
  const currentUser = await getCurrentUser()
  if (!currentUser) redirect('/login')

  const { workspace } = currentUser

  const leads = await db.lead.findMany({
    where: { workspaceId: workspace!.id },
    include: { assignedTo: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="flex flex-col h-full">
      {/* Page header */}
      <div className="border-b border-[#e3e8ee] px-8 py-6 flex items-center justify-between bg-white">
        <div>
          <h1 className="text-2xl font-bold text-[#0a2540]" style={{ letterSpacing: '-0.025em' }}>
            Leads
          </h1>
          <p className="text-[13px] text-[#8898aa] mt-1">
            {leads.length} lead{leads.length !== 1 ? 's' : ''} in your workspace
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#635bff] text-white text-[13px] font-semibold hover:bg-[#5350e6] transition-colors">
          <Plus className="w-4 h-4" />
          Add Lead
        </button>
      </div>

      {/* Filters & Search */}
      <div className="border-b border-[#e3e8ee] px-8 py-4 flex items-center gap-3 bg-white">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8898aa]" />
          <input
            type="text"
            placeholder="Search leads by name, email, or phone…"
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-[#e3e8ee] text-[13px] text-[#0a2540] placeholder-[#8898aa] focus:outline-none focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/10"
          />
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-auto bg-[#f6f9fc]">
        {leads.length === 0 ? (
          <div className="flex items-center justify-center h-full p-8">
            <div className="text-center max-w-sm">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(99,91,255,0.1)' }}>
                <Plus className="w-6 h-6 text-[#635bff]" />
              </div>
              <h2 className="text-lg font-semibold text-[#0a2540] mb-2">No leads yet</h2>
              <p className="text-[13px] text-[#8898aa]">Import leads or add your first lead to get started.</p>
            </div>
          </div>
        ) : (
          <div className="p-8">
            <div className="bg-white rounded-xl border border-[#e3e8ee] overflow-hidden">
              <table className="w-full">
                <thead className="border-b border-[#e3e8ee] bg-[#f6f9fc]">
                  <tr>
                    <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#425466]">Name</th>
                    <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#425466]">Email</th>
                    <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#425466]">Phone</th>
                    <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#425466]">Status</th>
                    <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#425466]">Assigned</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="border-b border-[#e3e8ee] hover:bg-[#f6f9fc] transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-3">
                        <Link href={`/dashboard/leads/${lead.id}`} className="text-[13px] font-medium text-[#635bff] hover:underline">
                          {lead.fullName}
                        </Link>
                      </td>
                      <td className="px-6 py-3 text-[13px] text-[#8898aa]">{lead.email || '—'}</td>
                      <td className="px-6 py-3 text-[13px] text-[#8898aa]">{lead.phone || '—'}</td>
                      <td className="px-6 py-3">
                        <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-medium capitalize" style={{ background: 'rgba(99,91,255,0.1)', color: '#635bff' }}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-[13px] text-[#8898aa]">{lead.assignedTo?.fullName || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
