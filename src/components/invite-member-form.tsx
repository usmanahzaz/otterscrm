'use client'

import { useState } from 'react'
import { inviteMember } from '@/lib/team-actions'
import { Loader2, CheckCircle2 } from 'lucide-react'

interface InviteMemberFormProps {
  onSuccess?: () => void
  onCancel: () => void
}

export function InviteMemberForm({ onSuccess, onCancel }: InviteMemberFormProps) {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('agent')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

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
      } else if (result.success) {
        setSuccess(true)
        setEmail('')
        onSuccess?.()
        setTimeout(() => onCancel(), 2000)
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
        <div className="p-3 rounded-lg bg-red-50 text-red-600 text-[12px] border border-red-100">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 rounded-lg bg-emerald-50 text-emerald-600 text-[12px] border border-emerald-100 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          Invitation sent!
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
      </div>

      <div>
        <label className="block text-[12px] font-semibold text-[#425466] mb-2">
          Role *
        </label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          disabled={isLoading}
          className="w-full px-4 py-2.5 rounded-lg border border-[#e3e8ee] text-[13px] text-[#0a2540] bg-white focus:outline-none focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/10 disabled:opacity-50"
        >
          <option value="agent">Agent</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="flex items-center gap-2 pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#635bff] text-white text-[13px] font-semibold hover:bg-[#5350e6] transition-colors disabled:opacity-50"
        >
          {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
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
