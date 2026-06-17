'use client'

import { useState } from 'react'
import { updateLeadNotes } from '@/lib/lead-details-actions'

interface LeadNotesFormProps {
  leadId: string
  currentNotes: string
  onNotesChange: (notes: string) => void
}

export function LeadNotesForm({
  leadId,
  currentNotes,
  onNotesChange,
}: LeadNotesFormProps) {
  const [notes, setNotes] = useState(currentNotes)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSave = async () => {
    try {
      setIsLoading(true)
      setError('')
      const updated = await updateLeadNotes(leadId, notes)
      onNotesChange(updated.notes || '')
    } catch (err) {
      setError('Failed to save notes')
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
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        disabled={isLoading}
        placeholder="Add notes about this lead..."
        className="w-full px-4 py-3 rounded-lg border border-[#e3e8ee] text-[13px] text-[#0a2540] placeholder-[#8898aa] focus:outline-none focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/10 resize-none h-32 disabled:opacity-50"
      />
      <button
        onClick={handleSave}
        disabled={isLoading || notes === currentNotes}
        className="px-4 py-2.5 rounded-lg bg-[#635bff] text-white text-[13px] font-semibold hover:bg-[#5350e6] transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Saving...' : 'Save Notes'}
      </button>
    </div>
  )
}
