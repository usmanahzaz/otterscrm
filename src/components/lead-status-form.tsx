'use client'

import { useState } from 'react'
import { updateLeadStatus } from '@/lib/lead-details-actions'
import type { LeadStatus } from '@prisma/client'

const statuses: Array<{ value: LeadStatus; label: string }> = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'follow_up', label: 'Follow Up' },
  { value: 'won', label: 'Won' },
  { value: 'lost', label: 'Lost' },
]

interface LeadStatusFormProps {
  leadId: string
  currentStatus: LeadStatus
  onStatusChange: (status: LeadStatus) => void
}

export function LeadStatusForm({
  leadId,
  currentStatus,
  onStatusChange,
}: LeadStatusFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleStatusChange = async (newStatus: LeadStatus) => {
    try {
      setIsLoading(true)
      setError('')
      const updated = await updateLeadStatus(leadId, newStatus)
      onStatusChange(updated.status as LeadStatus)
    } catch (err) {
      setError('Failed to update status')
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
      <div className="grid grid-cols-2 gap-2">
        {statuses.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => handleStatusChange(value)}
            disabled={isLoading}
            className={`px-4 py-2.5 rounded-lg text-[13px] font-semibold transition-colors ${
              currentStatus === value
                ? 'bg-[#635bff] text-white'
                : 'border border-[#e3e8ee] text-[#0a2540] hover:border-[#635bff]'
            } disabled:opacity-50`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
