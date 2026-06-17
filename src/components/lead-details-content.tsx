'use client'

import { useState, useTransition } from 'react'
import { updateLeadStatus, assignLead, addLeadNote } from '@/lib/lead-details-actions'
import { Loader2, CheckCircle2 } from 'lucide-react'

interface LeadDetailsContentProps {
  initialLead: any
}

export function LeadDetailsContent({ initialLead }: LeadDetailsContentProps) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setError(null)
    const formData = new FormData()
    formData.append('status', e.target.value)
    startTransition(async () => {
      const result = await updateLeadStatus(initialLead.id, formData)
      if (result?.error) setError(result.error)
      else {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 2000)
      }
    })
  }

  return (
    <div className="grid grid-cols-3 gap-6 p-8">
      {/* Main info */}
      <div className="col-span-2 space-y-6">
        {/* Lead info */}
        <section className="bg-white rounded-xl border border-[#e3e8ee] p-6">
          <h2 className="text-[15px] font-semibold text-[#0a2540] mb-4">Lead Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[12px] text-[#8898aa] mb-1">Full Name</p>
              <p className="text-[13px] text-[#0a2540] font-medium">{initialLead.fullName}</p>
            </div>
            <div>
              <p className="text-[12px] text-[#8898aa] mb-1">Email</p>
              <p className="text-[13px] text-[#0a2540] font-medium">{initialLead.email || '—'}</p>
            </div>
            <div>
              <p className="text-[12px] text-[#8898aa] mb-1">Phone</p>
              <p className="text-[13px] text-[#0a2540] font-medium">{initialLead.phone || '—'}</p>
            </div>
            <div>
              <p className="text-[12px] text-[#8898aa] mb-1">Source</p>
              <p className="text-[13px] text-[#0a2540] font-medium capitalize">{initialLead.source.replace('_', ' ')}</p>
            </div>
          </div>
        </section>

        {/* Status & Assignment */}
        <section className="bg-white rounded-xl border border-[#e3e8ee] p-6">
          <h2 className="text-[15px] font-semibold text-[#0a2540] mb-4">Status & Assignment</h2>
          <div className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-[12px] text-red-600">
                {error}
              </div>
            )}
            <div>
              <label className="block text-[12px] text-[#425466] mb-2">Status</label>
              <select
                defaultValue={initialLead.status}
                onChange={handleStatusChange}
                disabled={isPending}
                className="w-full px-3 py-2 rounded-lg border border-[#e3e8ee] text-[13px] text-[#0a2540]"
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="follow_up">Follow Up</option>
                <option value="won">Won</option>
                <option value="lost">Lost</option>
              </select>
            </div>
          </div>
        </section>

        {/* Notes */}
        <section className="bg-white rounded-xl border border-[#e3e8ee] p-6">
          <h2 className="text-[15px] font-semibold text-[#0a2540] mb-4">Notes</h2>
          <textarea
            defaultValue={initialLead.notes || ''}
            className="w-full px-3 py-2 rounded-lg border border-[#e3e8ee] text-[13px] text-[#0a2540] min-h-[120px]"
            placeholder="Add notes about this lead..."
          />
        </section>
      </div>

      {/* Sidebar */}
      <div className="space-y-4">
        {/* Metadata */}
        <div className="bg-white rounded-xl border border-[#e3e8ee] p-4">
          <h3 className="text-[12px] font-semibold text-[#0a2540] mb-3">Details</h3>
          <div className="space-y-3 text-[12px]">
            <div>
              <p className="text-[#8898aa]">Created</p>
              <p className="text-[#0a2540]">{new Date(initialLead.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-[#8898aa]">Updated</p>
              <p className="text-[#0a2540]">{new Date(initialLead.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
