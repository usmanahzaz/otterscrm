'use client'

import { MessageSquare, CheckSquare2, User, FileText, Clock, Zap } from 'lucide-react'
import type { Activity } from '@prisma/client'

interface ActivityLogProps {
  activities: Array<
    Activity & {
      user: { id: string; fullName: string | null } | null
    }
  >
}

export function ActivityLog({ activities }: ActivityLogProps) {
  const getActivityIcon = (type: string) => {
    const iconProps = { className: 'w-4 h-4' }
    switch (type) {
      case 'note_added':
        return <FileText {...iconProps} />
      case 'status_changed':
        return <CheckSquare2 {...iconProps} />
      case 'assigned':
        return <User {...iconProps} />
      case 'follow_up_set':
        return <Clock {...iconProps} />
      case 'called':
        return <Zap {...iconProps} />
      case 'email_sent':
        return <MessageSquare {...iconProps} />
      default:
        return <Zap {...iconProps} />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'note_added':
        return { bg: 'rgba(99, 91, 255, 0.1)', text: '#635bff' }
      case 'status_changed':
        return { bg: 'rgba(34, 197, 94, 0.1)', text: '#22c55e' }
      case 'assigned':
        return { bg: 'rgba(251, 146, 60, 0.1)', text: '#fb923c' }
      case 'follow_up_set':
        return { bg: 'rgba(59, 130, 246, 0.1)', text: '#3b82f6' }
      case 'called':
        return { bg: 'rgba(139, 92, 246, 0.1)', text: '#8b5cf6' }
      case 'email_sent':
        return { bg: 'rgba(236, 72, 153, 0.1)', text: '#ec4899' }
      default:
        return { bg: 'rgba(136, 152, 170, 0.1)', text: '#8898aa' }
    }
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
      hour: 'numeric',
      minute: '2-digit',
    }).format(date)
  }

  return (
    <div className="bg-white rounded-lg border border-[#e3e8ee] overflow-hidden sticky top-0">
      <div className="px-6 py-4 border-b border-[#e3e8ee]">
        <h2 className="text-lg font-semibold text-[#0a2540]">Activity</h2>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {activities.length === 0 ? (
          <div className="px-6 py-8 text-center">
            <p className="text-[13px] text-[#8898aa]">No activities yet</p>
          </div>
        ) : (
          <div className="divide-y divide-[#e3e8ee]">
            {activities.map((activity) => {
              const color = getActivityColor(activity.type)
              return (
                <div key={activity.id} className="px-6 py-4 hover:bg-[#f6f9fc] transition-colors">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: color.bg, color: color.text }}
                    >
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-[12px] font-semibold text-[#0a2540] capitalize">
                            {activity.type.replace('_', ' ')}
                          </p>
                          {activity.body && (
                            <p className="text-[12px] text-[#425466] mt-1 line-clamp-2">
                              {activity.body}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        {activity.user && (
                          <span className="text-[11px] text-[#8898aa]">
                            {activity.user.fullName}
                          </span>
                        )}
                        <span className="text-[11px] text-[#8898aa]">
                          {formatTime(activity.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
