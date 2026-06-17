'use client'

import { useState } from 'react'
import { updateMemberRole } from '@/lib/team-actions'
import type { WorkspaceRole } from '@prisma/client'

interface MemberRoleSelectProps {
  memberId: string
  currentRole: WorkspaceRole
  onRoleChange: (memberId: string, role: string) => void
  isCurrentUser: boolean
}

const roles: Array<{ value: WorkspaceRole; label: string; description: string }> = [
  { value: 'agent', label: 'Agent', description: 'Can view and manage assigned leads' },
  {
    value: 'manager',
    label: 'Manager',
    description: 'Can manage team members and leads',
  },
  {
    value: 'admin',
    label: 'Admin',
    description: 'Full access except ownership',
  },
  { value: 'owner', label: 'Owner', description: 'Full workspace control' },
]

export function MemberRoleSelect({
  memberId,
  currentRole,
  onRoleChange,
  isCurrentUser,
}: MemberRoleSelectProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleRoleChange = async (newRole: WorkspaceRole) => {
    try {
      setIsLoading(true)
      setError('')
      await updateMemberRole(memberId, newRole)
      onRoleChange(memberId, newRole)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update role')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative">
      {error && (
        <div className="absolute top-full mt-1 right-0 bg-red-50 text-red-600 text-[11px] px-2 py-1 rounded whitespace-nowrap z-40">
          {error}
        </div>
      )}
      <select
        value={currentRole}
        onChange={(e) => handleRoleChange(e.target.value as WorkspaceRole)}
        disabled={isLoading || isCurrentUser}
        className="px-4 py-1.5 rounded-lg border border-[#e3e8ee] text-[12px] font-semibold text-[#0a2540] bg-white hover:border-[#635bff] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed capitalize"
      >
        {roles.map((role) => (
          <option key={role.value} value={role.value}>
            {role.label}
          </option>
        ))}
      </select>
      {isCurrentUser && (
        <p className="text-[11px] text-[#8898aa] mt-1 absolute right-0 w-40">
          You cannot change your own role
        </p>
      )}
    </div>
  )
}
