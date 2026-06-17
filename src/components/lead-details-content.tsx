'use client'

import { useState } from 'react'
import { updateLeadStatus, updateLeadNotes } from '@/lib/lead-details-actions'
import { Loader2, CheckCircle2 } from 'lucide-react'

interface LeadDetailsContentProps {
  initialLead: any
}

export function LeadDetailsContent({ initialLead }: LeadDetailsContentProps) {
  const [isStatusUpdating, setIsStatusUpdating] = useState(false)
  const [isNotesUpdating, setIsNotesUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [notes, setNotes] = useState(initialLead.notes || '')

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setError(null)
    setIsStatusUpdating(true)
    try {
      await updateLeadStatus(initialLead.id, e.target.value as any)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 2000)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setIsStatusUpdating(false)
    }
  }

  const handleNotesChange = async () => {
    setError(null)
    setIsNotesUpdating(true)
    try {
      await updateLeadNotes(initialLead.id, notes)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 2000)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setIsNotesUpdating(false)
    }
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

        {/* Status */}
        <section className="bg-white rounded-xl border border-[#e3e8ee] p-6">
          <h2 className="text-[15px] font-semibold text-[#0a2540] mb-4">Status</h2>
          <div className="space-y-3">
            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-[12px] text-red-600">
                {error}
              </div>
            )}
            <select
              defaultValue={initialLead.status}
              onChange={handleStatusChange}
              disabled={isStatusUpdating}
              className="w-full px-3 py-2 rounded-lg border border-[#e3e8ee] text-[13px] text-[#0a2540]"
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="follow_up">Follow Up</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
            </select>
          </div>
        </section>

        {/* Notes */}
        <section className="bg-white rounded-xl border border-[#e3e8ee] p-6">
          <h2 className="text-[15px] font-semibold text-[#0a2540] mb-4">Notes</h2>
          <div className="space-y-3">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={isNotesUpdating}
              className="w-full px-3 py-2 rounded-lg border border-[#e3e8ee] text-[13px] text-[#0a2540] min-h-[120px] disabled:opacity-60"
              placeholder="Add notes about this lead..."
            />
            <button
              onClick={handleNotesChange}
              disabled={isNotesUpdating}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#635bff] text-white text-[12px] font-semibold hover:bg-[#5350e6] disabled:opacity-60"
            >
              {isNotesUpdating && <Loader2 className="w-3 h-3 animate-spin" />}
              Save Notes
            </button>
            {success && !error && (
              <span className="inline-flex items-center gap-1.5 text-[12px] text-emerald-600">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Saved!
              </span>
            )}
          </div>
        </section>
      </div>

      {/* Sidebar */}
      <div className="bg-white rounded-xl border border-[#e3e8ee] p-4 h-fit">
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
          {initialLead.assignedTo && (
            <div>
              <p className="text-[#8898aa]">Assigned to</p>
              <p className="text-[#0a2540]">{initialLead.assignedTo.fullName}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
