'use client'

import { useState, useEffect } from 'react'
import { assignLead } from '@/lib/lead-details-actions'
import { getWorkspaceMembers } from '@/lib/leads-actions'
import type { User } from '@prisma/client'

interface LeadAssigneeFormProps {
  leadId: string
  currentAssignee: { id: string; fullName: string | null; email: string } | null
  onAssigneeChange: (
    assignee: { id: string; fullName: string | null; email: string } | null
  ) => void
}

export function LeadAssigneeForm({
  leadId,
  currentAssignee,
  onAssigneeChange,
}: LeadAssigneeFormProps) {
  const [members, setMembers] = useState<
    Array<{ id: string; user: { id: string; fullName: string | null } }>
  >([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const data = await getWorkspaceMembers()
        setMembers(data)
      } catch (err) {
        console.error('Failed to load members:', err)
      }
    }

    loadMembers()
  }, [])

  const handleAssign = async (userId: string | null) => {
    try {
      setIsLoading(true)
      setError('')
      const updated = await assignLead(leadId, userId)
      onAssigneeChange(updated.assignedTo)
    } catch (err) {
      setError('Failed to assign lead')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      {error && (
        <div className="p-3 rounded-lg bg-red-50 text-red-600 text-[12px]">
          {error}
        </div>
      )}
      <div className="space-y-2">
        <button
          onClick={() => handleAssign(null)}
          disabled={isLoading}
          className={`w-full px-4 py-3 rounded-lg text-[13px] font-semibold transition-colors text-left ${
            !currentAssignee
              ? 'bg-[#635bff] text-white'
              : 'border border-[#e3e8ee] text-[#0a2540] hover:border-[#635bff]'
          } disabled:opacity-50`}
        >
          Unassigned
        </button>
        {members.map(({ id, user }) => (
          <button
            key={id}
            onClick={() =>
              handleAssign(user.id)
            }
            disabled={isLoading}
            className={`w-full px-4 py-3 rounded-lg text-[13px] font-semibold transition-colors text-left ${
              currentAssignee?.id === user.id
                ? 'bg-[#635bff] text-white'
                : 'border border-[#e3e8ee] text-[#0a2540] hover:border-[#635bff]'
            } disabled:opacity-50`}
          >
            {user.fullName || 'Unknown'}
          </button>
        ))}
      </div>
    </div>
  )
}
