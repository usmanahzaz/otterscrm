'use client'

import { useMemo, useState } from 'react'
import { LeadsFilters } from '@/components/leads-filters'
import { LeadsTable } from '@/components/leads-table'
import type { LeadStatus, Lead } from '@prisma/client'

interface LeadWithAssignee extends Lead {
  assignedTo: { id: string; fullName: string | null } | null
}

interface WorkspaceMember {
  id: string
  user: { id: string; fullName: string | null }
}

interface LeadsContentProps {
  initialLeads: LeadWithAssignee[]
  members: WorkspaceMember[]
}

export function LeadsContent({ initialLeads, members }: LeadsContentProps) {
  const [status, setStatus] = useState<LeadStatus | ''>('')
  const [search, setSearch] = useState('')
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  const filteredLeads = useMemo(() => {
    let result = initialLeads

    // Filter by status
    if (status) {
      result = result.filter((lead) => lead.status === status)
    }

    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase()
      result = result.filter(
        (lead) =>
          lead.fullName.toLowerCase().includes(searchLower) ||
          lead.email?.toLowerCase().includes(searchLower) ||
          lead.phone?.toLowerCase().includes(searchLower)
      )
    }

    // Filter by date range
    if (startDate || endDate) {
      result = result.filter((lead) => {
        const leadDate = new Date(lead.createdAt)
        if (startDate && leadDate < startDate) return false
        if (endDate) {
          const endDateWithTime = new Date(endDate)
          endDateWithTime.setHours(23, 59, 59, 999)
          if (leadDate > endDateWithTime) return false
        }
        return true
      })
    }

    return result
  }, [initialLeads, status, search, startDate, endDate])

  return (
    <>
      <LeadsFilters
        onStatusChange={setStatus}
        onSearchChange={setSearch}
        onDateRangeChange={(start, end) => {
          setStartDate(start)
          setEndDate(end)
        }}
      />
      <LeadsTable leads={filteredLeads} members={members} />
    </>
  )
}
