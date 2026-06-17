'use client'

import { useState } from 'react'
import { AlertCircle, ChevronDown } from 'lucide-react'
import { LeadStatusForm } from './lead-status-form'
import { LeadAssigneeForm } from './lead-assignee-form'
import { LeadNotesForm } from './lead-notes-form'
import { ActivityLog } from './activity-log'
import type { Lead, Activity, Reminder } from '@prisma/client'

interface LeadWithRelations extends Lead {
  assignedTo: { id: string; fullName: string | null; email: string } | null
  activities: Array<
    Activity & {
      user: { id: string; fullName: string | null } | null
    }
  >
  reminders: Reminder[]
  notifications: any[]
}

interface LeadDetailsContentProps {
  initialLead: LeadWithRelations
}

export function LeadDetailsContent({ initialLead }: LeadDetailsContentProps) {
  const [lead, setLead] = useState(initialLead)
  const [expandedSection, setExpandedSection] = useState<'status' | 'assignee' | 'notes' | null>(
    'notes'
  )

  const getStatusColor = (status: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      new: { bg: 'rgba(99, 91, 255, 0.1)', text: '#635bff' },
      contacted: { bg: 'rgba(34, 197, 94, 0.1)', text: '#22c55e' },
      follow_up: { bg: 'rgba(251, 146, 60, 0.1)', text: '#fb923c' },
      won: { bg: 'rgba(34, 197, 94, 0.1)', text: '#22c55e' },
      lost: { bg: 'rgba(239, 68, 68, 0.1)', text: '#ef4444' },
    }
    return colors[status] || { bg: 'rgba(136, 152, 170, 0.1)', text: '#8898aa' }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date)
  }

  const statusColor = getStatusColor(lead.status)

  return (
    <div className="grid grid-cols-3 gap-6 p-8 max-w-7xl">
      {/* Main column */}
      <div className="col-span-2 space-y-6">
        {/* Lead details card */}
        <div className="bg-white rounded-lg border border-[#e3e8ee] p-6">
          <h2 className="text-lg font-semibold text-[#0a2540] mb-4">Lead Details</h2>
          <div className="space-y-4">
            <div>
              <label className="text-[12px] font-semibold text-[#425466] uppercase tracking-wide">
                Email
              </label>
              <p className="text-[13px] text-[#0a2540] mt-1">{lead.email || '-'}</p>
            </div>
            <div>
              <label className="text-[12px] font-semibold text-[#425466] uppercase tracking-wide">
                Phone
              </label>
              <p className="text-[13px] text-[#0a2540] mt-1">{lead.phone || '-'}</p>
            </div>
            {lead.source && (
              <div>
                <label className="text-[12px] font-semibold text-[#425466] uppercase tracking-wide">
                  Source
                </label>
                <p className="text-[13px] text-[#0a2540] mt-1 capitalize">{lead.source.replace('_', ' ')}</p>
              </div>
            )}
            {lead.adName && (
              <div>
                <label className="text-[12px] font-semibold text-[#425466] uppercase tracking-wide">
                  Ad Name
                </label>
                <p className="text-[13px] text-[#0a2540] mt-1">{lead.adName}</p>
              </div>
            )}
            {lead.formName && (
              <div>
                <label className="text-[12px] font-semibold text-[#425466] uppercase tracking-wide">
                  Form Name
                </label>
                <p className="text-[13px] text-[#0a2540] mt-1">{lead.formName}</p>
              </div>
            )}
            <div>
              <label className="text-[12px] font-semibold text-[#425466] uppercase tracking-wide">
                Created
              </label>
              <p className="text-[13px] text-[#0a2540] mt-1">{formatDate(lead.createdAt)}</p>
            </div>
          </div>
        </div>

        {/* Status form */}
        <div className="bg-white rounded-lg border border-[#e3e8ee] overflow-hidden">
          <button
            onClick={() =>
              setExpandedSection(expandedSection === 'status' ? null : 'status')
            }
            className="w-full flex items-center justify-between p-6 hover:bg-[#f6f9fc] transition-colors"
          >
            <h2 className="text-lg font-semibold text-[#0a2540]">Lead Status</h2>
            <ChevronDown
              className={`w-4 h-4 text-[#8898aa] transition-transform ${
                expandedSection === 'status' ? 'rotate-180' : ''
              }`}
            />
          </button>
          {expandedSection === 'status' && (
            <div className="border-t border-[#e3e8ee] p-6">
              <LeadStatusForm
                leadId={lead.id}
                currentStatus={lead.status}
                onStatusChange={(newStatus) => {
                  setLead({ ...lead, status: newStatus })
                }}
              />
            </div>
          )}
          {expandedSection !== 'status' && (
            <div className="border-t border-[#e3e8ee] px-6 py-4 flex items-center justify-between">
              <span className="text-[13px] text-[#8898aa]">Current status</span>
              <span
                className="inline-block px-3 py-1.5 rounded text-[11px] font-semibold capitalize"
                style={{
                  background: statusColor.bg,
                  color: statusColor.text,
                }}
              >
                {lead.status.replace('_', ' ')}
              </span>
            </div>
          )}
        </div>

        {/* Assignee form */}
        <div className="bg-white rounded-lg border border-[#e3e8ee] overflow-hidden">
          <button
            onClick={() =>
              setExpandedSection(expandedSection === 'assignee' ? null : 'assignee')
            }
            className="w-full flex items-center justify-between p-6 hover:bg-[#f6f9fc] transition-colors"
          >
            <h2 className="text-lg font-semibold text-[#0a2540]">Assignee</h2>
            <ChevronDown
              className={`w-4 h-4 text-[#8898aa] transition-transform ${
                expandedSection === 'assignee' ? 'rotate-180' : ''
              }`}
            />
          </button>
          {expandedSection === 'assignee' && (
            <div className="border-t border-[#e3e8ee] p-6">
              <LeadAssigneeForm
                leadId={lead.id}
                currentAssignee={lead.assignedTo}
                onAssigneeChange={(newAssignee) => {
                  setLead({ ...lead, assignedTo: newAssignee })
                }}
              />
            </div>
          )}
          {expandedSection !== 'assignee' && (
            <div className="border-t border-[#e3e8ee] px-6 py-4 flex items-center justify-between">
              <span className="text-[13px] text-[#8898aa]">Assigned to</span>
              <span className="text-[13px] font-semibold text-[#0a2540]">
                {lead.assignedTo?.fullName || 'Unassigned'}
              </span>
            </div>
          )}
        </div>

        {/* Notes form */}
        <div className="bg-white rounded-lg border border-[#e3e8ee] overflow-hidden">
          <button
            onClick={() =>
              setExpandedSection(expandedSection === 'notes' ? null : 'notes')
            }
            className="w-full flex items-center justify-between p-6 hover:bg-[#f6f9fc] transition-colors"
          >
            <h2 className="text-lg font-semibold text-[#0a2540]">Notes</h2>
            <ChevronDown
              className={`w-4 h-4 text-[#8898aa] transition-transform ${
                expandedSection === 'notes' ? 'rotate-180' : ''
              }`}
            />
          </button>
          {expandedSection === 'notes' && (
            <div className="border-t border-[#e3e8ee] p-6">
              <LeadNotesForm
                leadId={lead.id}
                currentNotes={lead.notes || ''}
                onNotesChange={(newNotes) => {
                  setLead({ ...lead, notes: newNotes })
                }}
              />
            </div>
          )}
          {expandedSection !== 'notes' && (
            <div className="border-t border-[#e3e8ee] px-6 py-4">
              <p className="text-[13px] text-[#8898aa]">
                {lead.notes || 'No notes yet'}
              </p>
            </div>
          )}
        </div>

        {/* Reminders section */}
        {lead.reminders.length > 0 && (
          <div className="bg-white rounded-lg border border-[#e3e8ee] p-6">
            <h2 className="text-lg font-semibold text-[#0a2540] mb-4">Reminders</h2>
            <div className="space-y-3">
              {lead.reminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-[#f6f9fc] border border-[#e3e8ee]"
                >
                  <div className="flex-1">
                    <p className="text-[13px] font-semibold text-[#0a2540]">
                      {formatDate(reminder.dueAt)}
                    </p>
                    {reminder.note && (
                      <p className="text-[12px] text-[#8898aa] mt-1">{reminder.note}</p>
                    )}
                  </div>
                  {reminder.isDone && (
                    <span className="text-[11px] font-semibold text-green-600">Done</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div className="col-span-1">
        <ActivityLog activities={lead.activities} />
      </div>
    </div>
  )
}
