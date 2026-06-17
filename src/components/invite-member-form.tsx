'use client'

import { useState } from 'react'
import { inviteMember } from '@/lib/team-actions'
import type { WorkspaceMember } from '@prisma/client'

interface Member extends WorkspaceMember {
  user: {
    id: string
    email: string
    fullName: string | null
    profile: {
      avatarUrl: string | null
    } | null
  }
}

interface InviteMemberFormProps {
  onSuccess: (member: Member) => void
  onCancel: () => void
}

export function InviteMemberForm({ onSuccess, onCancel }: InviteMemberFormProps) {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('agent')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (!email || !role) {
      setError('Email and role are required')
      return
    }

    try {
      setIsLoading(true)
      const formData = new FormData()
      formData.append('email', email)
      formData.append('role', role)

      const result = await inviteMember(formData)

      if (result.error) {
        setError(result.error)
      } else if (result.success && result.member) {
        onSuccess(result.member)
      }
    } catch (err) {
      setError('Failed to invite member')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      {error && (
        <div className="p-3 rounded-lg bg-red-50 text-red-600 text-[12px]">
          {error}
        </div>
      )}

      <div>
        <label className="block text-[12px] font-semibold text-[#425466] mb-2">
          Email Address *
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="member@example.com"
          disabled={isLoading}
          className="w-full px-4 py-2.5 rounded-lg border border-[#e3e8ee] text-[13px] text-[#0a2540] placeholder-[#8898aa] focus:outline-none focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/10 disabled:opacity-50"
        />
        <p className="text-[11px] text-[#8898aa] mt-1">
          The user must already have an account
        </p>
      </div>

      <div>
        <label className="block text-[12px] font-semibold text-[#425466] mb-2">
          Role *
        </label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          disabled={isLoading}
          className="w-full px-4 py-2.5 rounded-lg border border-[#e3e8ee] text-[13px] text-[#0a2540] bg-white focus:outline-none focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/10 disabled:opacity-50 cursor-pointer"
        >
          <option value="agent">Agent - Can view and manage leads</option>
          <option value="manager">Manager - Can manage team and leads</option>
          <option value="admin">Admin - Full access except ownership</option>
          <option value="owner">Owner - Full workspace control</option>
        </select>
      </div>

      <div className="flex items-center gap-2 pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 px-4 py-2.5 rounded-lg bg-[#635bff] text-white text-[13px] font-semibold hover:bg-[#5350e6] transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Inviting...' : 'Invite Member'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1 px-4 py-2.5 rounded-lg border border-[#e3e8ee] text-[#0a2540] text-[13px] font-semibold hover:bg-[#f6f9fc] transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
