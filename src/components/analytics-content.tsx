'use client'

import { Activity } from 'lucide-react'
import type { LeadStatus } from '@prisma/client'

interface AnalyticsData {
  totalLeads: number
  leadsByStatus: Array<{ status: LeadStatus; count: number }>
  conversionRate: number
  leadsLast30Days: Record<string, number>
  topPerformers: Array<{ id: string; fullName: string | null; leadCount: number }>
  recentActivities: Array<{
    id: string
    type: string
    body: string | null
    createdAt: Date
    lead: { id: string; fullName: string } | null
    user: { id: string; fullName: string | null } | null
  }>
}

interface AnalyticsContentProps {
  analytics: AnalyticsData
}

export function AnalyticsContent({ analytics }: AnalyticsContentProps) {
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

  const formatTime = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`

    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date)
  }

  const maxLeadsInDay = Math.max(...Object.values(analytics.leadsLast30Days), 1)

  return (
    <div className="flex-1 overflow-auto bg-[#f6f9fc] p-8">
      <div className="max-w-7xl space-y-6">
        {/* Key metrics */}
        <div className="grid grid-cols-4 gap-4">
          {/* Total leads */}
          <div className="bg-white rounded-lg border border-[#e3e8ee] p-6">
            <p className="text-[12px] font-semibold text-[#8898aa] uppercase tracking-wide">
              Total Leads
            </p>
            <p className="text-4xl font-bold text-[#0a2540] mt-2">
              {analytics.totalLeads}
            </p>
          </div>

          {/* Conversion rate */}
          <div className="bg-white rounded-lg border border-[#e3e8ee] p-6">
            <p className="text-[12px] font-semibold text-[#8898aa] uppercase tracking-wide">
              Conversion Rate
            </p>
            <p className="text-4xl font-bold text-[#0a2540] mt-2">
              {analytics.conversionRate}%
            </p>
          </div>

          {/* Won leads */}
          <div className="bg-white rounded-lg border border-[#e3e8ee] p-6">
            <p className="text-[12px] font-semibold text-[#8898aa] uppercase tracking-wide">
              Won Leads
            </p>
            <p className="text-4xl font-bold text-green-600 mt-2">
              {analytics.leadsByStatus.find((s) => s.status === 'won')?.count || 0}
            </p>
          </div>

          {/* Lost leads */}
          <div className="bg-white rounded-lg border border-[#e3e8ee] p-6">
            <p className="text-[12px] font-semibold text-[#8898aa] uppercase tracking-wide">
              Lost Leads
            </p>
            <p className="text-4xl font-bold text-red-600 mt-2">
              {analytics.leadsByStatus.find((s) => s.status === 'lost')?.count || 0}
            </p>
          </div>
        </div>

        {/* Leads by status (pie chart alternative - bar display) */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-[#e3e8ee] p-6">
            <h2 className="text-lg font-semibold text-[#0a2540] mb-4">Leads by Status</h2>
            <div className="space-y-3">
              {analytics.leadsByStatus.map(({ status, count }) => {
                const color = getStatusColor(status)
                const percentage =
                  analytics.totalLeads > 0
                    ? Math.round((count / analytics.totalLeads) * 100)
                    : 0
                return (
                  <div key={status}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[13px] font-semibold text-[#0a2540] capitalize">
                        {status.replace('_', ' ')}
                      </span>
                      <span className="text-[13px] font-semibold text-[#8898aa]">
                        {count} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#e3e8ee] overflow-hidden">
                      <div
                        className="h-full transition-all"
                        style={{ width: `${percentage}%`, background: color.text }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Leads trend (last 30 days) */}
          <div className="bg-white rounded-lg border border-[#e3e8ee] p-6">
            <h2 className="text-lg font-semibold text-[#0a2540] mb-4">Last 30 Days</h2>
            <div className="flex items-end gap-1 h-48">
              {Object.entries(analytics.leadsLast30Days).map(([date, count]) => {
                const height = (count / maxLeadsInDay) * 100
                const dateObj = new Date(date)
                const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' })
                return (
                  <div key={date} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-[#635bff] rounded-t transition-all hover:bg-[#5350e6]"
                      style={{ height: `${Math.max(height, 5)}%` }}
                      title={`${dateObj.toLocaleDateString()}: ${count} leads`}
                    />
                    <p className="text-[10px] text-[#8898aa] mt-2 text-center">{dayName}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Top performers and recent activity */}
        <div className="grid grid-cols-2 gap-6">
          {/* Top performers */}
          <div className="bg-white rounded-lg border border-[#e3e8ee] p-6">
            <h2 className="text-lg font-semibold text-[#0a2540] mb-4">Top Performers</h2>
            <div className="space-y-3">
              {analytics.topPerformers.length === 0 ? (
                <p className="text-[13px] text-[#8898aa]">No data yet</p>
              ) : (
                analytics.topPerformers.map((performer, index) => (
                  <div
                    key={performer.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-[#f6f9fc] hover:bg-[#e3e8ee] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center font-semibold text-[12px] text-white bg-[#635bff]">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-[#0a2540]">
                          {performer.fullName || 'Unknown'}
                        </p>
                      </div>
                    </div>
                    <span className="text-[13px] font-bold text-[#635bff]">
                      {performer.leadCount}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent activity */}
          <div className="bg-white rounded-lg border border-[#e3e8ee] p-6">
            <h2 className="text-lg font-semibold text-[#0a2540] mb-4">Recent Activity</h2>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {analytics.recentActivities.length === 0 ? (
                <p className="text-[13px] text-[#8898aa]">No activity yet</p>
              ) : (
                analytics.recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="p-3 rounded-lg bg-[#f6f9fc] border border-[#e3e8ee] hover:border-[#635bff] transition-colors"
                  >
                    <div className="flex items-start gap-2">
                      <Activity className="w-4 h-4 text-[#635bff] mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-semibold text-[#0a2540] capitalize">
                          {activity.type.replace('_', ' ')}
                        </p>
                        {activity.lead && (
                          <p className="text-[12px] text-[#8898aa] line-clamp-1">
                            {activity.lead.fullName}
                          </p>
                        )}
                        <p className="text-[11px] text-[#8898aa] mt-1">
                          {formatTime(activity.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
