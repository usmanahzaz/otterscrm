'use client'

import { useState, useEffect } from 'react'
import { Bell, X, Check } from 'lucide-react'
import Link from 'next/link'
import {
  getUserNotifications,
  markNotificationAsRead,
  deleteNotification,
} from '@/lib/notification-actions'
import type { Notification } from '@prisma/client'

interface NotificationWithLead extends Notification {
  lead: { id: string; fullName: string } | null
}

interface NotificationCenterProps {
  initialUnreadCount: number
}

export function NotificationCenter({ initialUnreadCount }: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<NotificationWithLead[]>([])
  const [unreadCount, setUnreadCount] = useState(initialUnreadCount)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      loadNotifications()
    }
  }, [isOpen])

  const loadNotifications = async () => {
    try {
      setIsLoading(true)
      const data = await getUserNotifications()
      setNotifications(data as NotificationWithLead[])
      const unreadCount = data.filter((n) => n.status !== 'read').length
      setUnreadCount(unreadCount)
    } catch (err) {
      console.error('Failed to load notifications:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await markNotificationAsRead(notificationId)
      setNotifications(
        notifications.map((n) =>
          n.id === notificationId ? { ...n, status: 'read' } : n
        )
      )
      setUnreadCount(Math.max(0, unreadCount - 1))
    } catch (err) {
      console.error('Failed to mark notification as read:', err)
    }
  }

  const handleDelete = async (notificationId: string) => {
    try {
      await deleteNotification(notificationId)
      setNotifications(notifications.filter((n) => n.id !== notificationId))
    } catch (err) {
      console.error('Failed to delete notification:', err)
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
    }).format(date)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Bell className="w-4 h-4 text-[#8898aa]" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#635bff]" />
        )}
      </button>

      {/* Notification dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-[#e3e8ee] z-50 max-h-96 overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-[#e3e8ee] flex items-center justify-between">
            <h3 className="text-[13px] font-semibold text-[#0a2540]">Notifications</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <X className="w-4 h-4 text-[#8898aa]" />
            </button>
          </div>

          {isLoading ? (
            <div className="flex-1 flex items-center justify-center p-4">
              <p className="text-[12px] text-[#8898aa]">Loading...</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex-1 flex items-center justify-center p-4">
              <p className="text-[12px] text-[#8898aa]">No notifications</p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto divide-y divide-[#e3e8ee]">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`px-4 py-3 hover:bg-[#f6f9fc] transition-colors ${
                    notification.status !== 'read' ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-semibold text-[#0a2540]">
                        {notification.title}
                      </p>
                      <p className="text-[12px] text-[#8898aa] mt-0.5 line-clamp-2">
                        {notification.body}
                      </p>
                      {notification.lead && (
                        <Link
                          href={`/dashboard/leads/${notification.lead.id}`}
                          onClick={() => setIsOpen(false)}
                          className="text-[11px] text-[#635bff] hover:underline mt-1 inline-block"
                        >
                          View {notification.lead.fullName}
                        </Link>
                      )}
                      <p className="text-[11px] text-[#8898aa] mt-1">
                        {formatTime(notification.createdAt)}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0">
                      {notification.status !== 'read' && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="p-1.5 hover:bg-white rounded transition-colors"
                          title="Mark as read"
                        >
                          <Check className="w-3.5 h-3.5 text-green-600" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(notification.id)}
                        className="p-1.5 hover:bg-white rounded transition-colors"
                        title="Delete"
                      >
                        <X className="w-3.5 h-3.5 text-[#8898aa]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
