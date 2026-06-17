'use client'

import { useState, useCallback } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowUpDown, Trash2, Users } from 'lucide-react'
import type { Lead, User } from '@prisma/client'
import { deleteLeads, assignLeads } from '@/lib/leads-actions'

type LeadWithAssignee = Lead & {
  assignedTo: { id: string; fullName: string | null } | null
}

interface LeadsTableProps {
  leads: LeadWithAssignee[]
  members: Array<{
    id: string
    user: { id: string; fullName: string | null }
  }>
}

export function LeadsTable({ leads, members }: LeadsTableProps) {
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set())
  const [sortField, setSortField] = useState<'name' | 'email' | 'phone' | 'status' | 'created'>('created')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [isLoading, setIsLoading] = useState(false)
  const [assigneeFilter, setAssigneeFilter] = useState<string>('')

  const toggleLead = (leadId: string) => {
    const newSelected = new Set(selectedLeads)
    if (newSelected.has(leadId)) {
      newSelected.delete(leadId)
    } else {
      newSelected.add(leadId)
    }
    setSelectedLeads(newSelected)
  }

  const toggleAll = () => {
    if (selectedLeads.size === leads.length) {
      setSelectedLeads(new Set())
    } else {
      setSelectedLeads(new Set(leads.map((lead) => lead.id)))
    }
  }

  const handleSort = (field: 'name' | 'email' | 'phone' | 'status' | 'created') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const sortedLeads = [...leads].sort((a, b) => {
    let aVal: any
    let bVal: any

    switch (sortField) {
      case 'name':
        aVal = a.fullName.toLowerCase()
        bVal = b.fullName.toLowerCase()
        break
      case 'email':
        aVal = a.email?.toLowerCase() ?? ''
        bVal = b.email?.toLowerCase() ?? ''
        break
      case 'phone':
        aVal = a.phone ?? ''
        bVal = b.phone ?? ''
        break
      case 'status':
        aVal = a.status
        bVal = b.status
        break
      case 'created':
        aVal = a.createdAt.getTime()
        bVal = b.createdAt.getTime()
        break
    }

    if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
    if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
    return 0
  })

  const displayedLeads = assigneeFilter
    ? sortedLeads.filter((lead) => lead.assignedToId === assigneeFilter)
    : sortedLeads

  const handleDeleteSelected = async () => {
    if (!confirm(`Delete ${selectedLeads.size} lead(s)?`)) return

    try {
      setIsLoading(true)
      await deleteLeads(Array.from(selectedLeads))
      setSelectedLeads(new Set())
    } catch (err) {
      console.error('Failed to delete leads:', err)
      alert('Failed to delete leads')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAssignSelected = async (userId: string) => {
    try {
      setIsLoading(true)
      await assignLeads(Array.from(selectedLeads), userId)
      setSelectedLeads(new Set())
    } catch (err) {
      console.error('Failed to assign leads:', err)
      alert('Failed to assign leads')
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date)
  }

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

  if (displayedLeads.length === 0 && assigneeFilter === '') {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center max-w-sm">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: 'rgba(99,91,255,0.1)' }}
          >
            <Users className="w-6 h-6 text-[#635bff]" />
          </div>
          <h2 className="text-lg font-semibold text-[#0a2540] mb-2">No leads yet</h2>
          <p className="text-[13px] text-[#8898aa]">
            Connect your Meta account or import leads to get started.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Bulk actions */}
      {selectedLeads.size > 0 && (
        <div className="border-b border-[#e3e8ee] px-8 py-3 flex items-center justify-between bg-[#f6f9fc]">
          <span className="text-[13px] text-[#425466]">
            {selectedLeads.size} selected
          </span>
          <div className="flex items-center gap-2">
            <div className="relative inline-block">
              <select
                value=""
                onChange={(e) => {
                  if (e.target.value) {
                    handleAssignSelected(e.target.value)
                  }
                }}
                className="px-3 py-1.5 text-[12px] rounded-lg border border-[#e3e8ee] text-[#0a2540] bg-white hover:border-[#8898aa] transition-colors cursor-pointer"
                disabled={isLoading}
              >
                <option value="">Assign to...</option>
                {members.map((member) => (
                  <option key={member.id} value={member.user.id}>
                    {member.user.fullName || 'Unknown'}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleDeleteSelected}
              disabled={isLoading}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete
            </button>
          </div>
        </div>
      )}

      {/* Assignee filter */}
      {members.length > 0 && (
        <div className="border-b border-[#e3e8ee] px-8 py-3">
          <select
            value={assigneeFilter}
            onChange={(e) => setAssigneeFilter(e.target.value)}
            className="px-3 py-1.5 text-[12px] rounded-lg border border-[#e3e8ee] text-[#0a2540] bg-white hover:border-[#8898aa] transition-colors cursor-pointer"
          >
            <option value="">All assignees</option>
            <option value="unassigned">Unassigned</option>
            {members.map((member) => (
              <option key={member.id} value={member.user.id}>
                {member.user.fullName || 'Unknown'}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Table */}
      <div className="flex-1 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-white border-b border-[#e3e8ee]">
              <th className="px-8 py-3 text-left">
                <Checkbox
                  checked={selectedLeads.size === leads.length && leads.length > 0}
                  onChange={toggleAll}
                />
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-1 text-[12px] font-semibold text-[#425466] uppercase tracking-wide hover:text-[#0a2540] transition-colors"
                >
                  Name
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('email')}
                  className="flex items-center gap-1 text-[12px] font-semibold text-[#425466] uppercase tracking-wide hover:text-[#0a2540] transition-colors"
                >
                  Email
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('phone')}
                  className="flex items-center gap-1 text-[12px] font-semibold text-[#425466] uppercase tracking-wide hover:text-[#0a2540] transition-colors"
                >
                  Phone
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center gap-1 text-[12px] font-semibold text-[#425466] uppercase tracking-wide hover:text-[#0a2540] transition-colors"
                >
                  Status
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-4 py-3 text-left text-[12px] font-semibold text-[#425466] uppercase tracking-wide">
                Assignee
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('created')}
                  className="flex items-center gap-1 text-[12px] font-semibold text-[#425466] uppercase tracking-wide hover:text-[#0a2540] transition-colors"
                >
                  Created
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedLeads.map((lead) => {
              const statusColor = getStatusColor(lead.status)
              return (
                <tr
                  key={lead.id}
                  className="border-b border-[#e3e8ee] hover:bg-[#f6f9fc] transition-colors"
                >
                  <td className="px-8 py-3">
                    <Checkbox
                      checked={selectedLeads.has(lead.id)}
                      onChange={() => toggleLead(lead.id)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={`/dashboard/leads/${lead.id}`}
                      className="text-[13px] font-semibold text-[#635bff] hover:underline"
                    >
                      {lead.fullName}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-[13px] text-[#425466]">
                    {lead.email || '-'}
                  </td>
                  <td className="px-4 py-3 text-[13px] text-[#425466]">
                    {lead.phone || '-'}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-block px-2.5 py-1 rounded text-[11px] font-semibold capitalize"
                      style={{
                        background: statusColor.bg,
                        color: statusColor.text,
                      }}
                    >
                      {lead.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[13px] text-[#425466]">
                    {lead.assignedTo?.fullName || '-'}
                  </td>
                  <td className="px-4 py-3 text-[13px] text-[#8898aa]">
                    {formatDate(lead.createdAt)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {displayedLeads.length === 0 && assigneeFilter !== '' && (
        <div className="flex items-center justify-center p-12">
          <div className="text-center">
            <p className="text-[13px] text-[#8898aa]">No leads assigned to this person</p>
          </div>
        </div>
      )}
    </div>
  )
}
