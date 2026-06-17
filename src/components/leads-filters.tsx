'use client'

import { useState } from 'react'
import { Search, Calendar } from 'lucide-react'
import type { LeadStatus } from '@prisma/client'

interface LeadsFiltersProps {
  onStatusChange: (status: LeadStatus | '') => void
  onSearchChange: (search: string) => void
  onDateRangeChange: (startDate: Date | null, endDate: Date | null) => void
}

const statuses: Array<{ value: LeadStatus; label: string }> = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'follow_up', label: 'Follow Up' },
  { value: 'won', label: 'Won' },
  { value: 'lost', label: 'Lost' },
]

export function LeadsFilters({
  onStatusChange,
  onSearchChange,
  onDateRangeChange,
}: LeadsFiltersProps) {
  const [status, setStatus] = useState<LeadStatus | ''>('')
  const [search, setSearch] = useState('')
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')

  const handleStatusChange = (newStatus: LeadStatus | '') => {
    setStatus(newStatus)
    onStatusChange(newStatus)
  }

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch)
    onSearchChange(newSearch)
  }

  const handleDateChange = () => {
    const start = startDate ? new Date(startDate) : null
    const end = endDate ? new Date(endDate) : null
    onDateRangeChange(start, end)
  }

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStart = e.target.value
    setStartDate(newStart)
    if (endDate) {
      const end = new Date(endDate)
      onDateRangeChange(newStart ? new Date(newStart) : null, end)
    }
  }

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEnd = e.target.value
    setEndDate(newEnd)
    if (startDate) {
      const start = new Date(startDate)
      onDateRangeChange(start, newEnd ? new Date(newEnd) : null)
    }
  }

  return (
    <div className="border-b border-[#e3e8ee] px-8 py-4 flex items-center gap-3">
      {/* Search */}
      <div className="flex-1 relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8898aa]" />
        <input
          type="text"
          placeholder="Search leads by name, email, or phone…"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full pl-9 pr-4 py-2 rounded-lg border border-[#e3e8ee] text-[13px] text-[#0a2540] placeholder-[#8898aa] focus:outline-none focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/10"
        />
      </div>

      {/* Status filter */}
      <select
        value={status}
        onChange={(e) => handleStatusChange(e.target.value as LeadStatus | '')}
        className="px-4 py-2 rounded-lg border border-[#e3e8ee] text-[13px] text-[#0a2540] bg-white hover:border-[#8898aa] transition-colors cursor-pointer"
      >
        <option value="">All statuses</option>
        {statuses.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>

      {/* Date range picker */}
      <div className="relative">
        <button
          onClick={() => setShowDatePicker(!showDatePicker)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#e3e8ee] text-[13px] text-[#0a2540] bg-white hover:border-[#8898aa] transition-colors"
        >
          <Calendar className="w-4 h-4" />
          <span>Date</span>
        </button>

        {showDatePicker && (
          <div className="absolute top-full mt-2 right-0 bg-white border border-[#e3e8ee] rounded-lg shadow-lg p-4 z-50 min-w-72">
            <div className="space-y-3">
              <div>
                <label className="block text-[12px] font-semibold text-[#425466] mb-1">
                  From
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={handleStartDateChange}
                  className="w-full px-3 py-2 rounded-lg border border-[#e3e8ee] text-[13px] text-[#0a2540] focus:outline-none focus:border-[#635bff]"
                />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-[#425466] mb-1">
                  To
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={handleEndDateChange}
                  className="w-full px-3 py-2 rounded-lg border border-[#e3e8ee] text-[13px] text-[#0a2540] focus:outline-none focus:border-[#635bff]"
                />
              </div>
              <button
                onClick={() => setShowDatePicker(false)}
                className="w-full px-3 py-2 rounded-lg bg-[#635bff] text-white text-[12px] font-semibold hover:bg-[#5350e6] transition-colors"
              >
                Apply
              </button>
              {(startDate || endDate) && (
                <button
                  onClick={() => {
                    setStartDate('')
                    setEndDate('')
                    onDateRangeChange(null, null)
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-[#e3e8ee] text-[#8898aa] text-[12px] font-semibold hover:bg-[#f6f9fc] transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
