'use client'

import { useState } from 'react'
import { Bell, X } from 'lucide-react'

interface NotificationCenterProps {
  initialUnreadCount: number
}

export function NotificationCenter({ initialUnreadCount }: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(initialUnreadCount)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Bell className="w-4 h-4 text-[#8898aa]" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#635bff]" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-80 bg-white rounded-lg border border-[#e3e8ee] shadow-lg z-50">
          <div className="p-4 border-b border-[#e3e8ee]">
            <h3 className="text-[13px] font-semibold text-[#0a2540]">Notifications</h3>
          </div>
          <div className="max-h-96 overflow-auto">
            <p className="p-4 text-[12px] text-[#8898aa] text-center">No notifications yet</p>
          </div>
        </div>
      )}
    </div>
  )
}
