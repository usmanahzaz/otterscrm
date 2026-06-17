'use client'

import { useState } from 'react'

export function NotificationPreferencesForm() {
  const [preferences, setPreferences] = useState({
    whatsapp: true,
    email: true,
    inApp: true,
  })

  const handleChange = (key: string) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="space-y-4">
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={preferences.email}
          onChange={() => handleChange('email')}
          className="w-4 h-4 rounded border border-[#e3e8ee] text-[#635bff] accent-[#635bff]"
        />
        <span className="text-[13px] text-[#0a2540]">Email notifications</span>
      </label>

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={preferences.whatsapp}
          onChange={() => handleChange('whatsapp')}
          className="w-4 h-4 rounded border border-[#e3e8ee] text-[#635bff] accent-[#635bff]"
        />
        <span className="text-[13px] text-[#0a2540]">WhatsApp notifications</span>
      </label>

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={preferences.inApp}
          onChange={() => handleChange('inApp')}
          className="w-4 h-4 rounded border border-[#e3e8ee] text-[#635bff] accent-[#635bff]"
        />
        <span className="text-[13px] text-[#0a2540]">In-app notifications</span>
      </label>

      <button className="mt-4 w-full px-4 py-2 rounded-lg bg-[#635bff] text-white text-[13px] font-semibold hover:bg-[#5350e6] transition-colors">
        Save preferences
      </button>
    </div>
  )
}
