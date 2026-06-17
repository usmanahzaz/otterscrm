'use client'

import { Trash2 } from 'lucide-react'

interface TeamContentProps {
  members: any[]
  canManageTeam: boolean
  currentUserId: string
}

export function TeamContent({ members, canManageTeam, currentUserId }: TeamContentProps) {
  return (
    <div className="flex-1 overflow-auto p-8">
      {members.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <p className="text-[13px] text-[#8898aa]">No team members yet</p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#e3e8ee] overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-[#e3e8ee] bg-[#f6f9fc]">
              <tr>
                <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#425466]">Name</th>
                <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#425466]">Email</th>
                <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#425466]">Role</th>
                {canManageTeam && <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#425466]">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id} className="border-b border-[#e3e8ee] hover:bg-[#f6f9fc] transition-colors">
                  <td className="px-6 py-3 text-[13px] text-[#0a2540]">{member.user.fullName}</td>
                  <td className="px-6 py-3 text-[13px] text-[#8898aa]">{member.user.email}</td>
                  <td className="px-6 py-3 text-[13px] text-[#0a2540] capitalize">{member.role}</td>
                  {canManageTeam && (
                    <td className="px-6 py-3">
                      {member.userId !== currentUserId && (
                        <button className="p-2 rounded-lg text-[#8898aa] hover:text-red-600 hover:bg-red-50 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
