'use client'

import { useState } from 'react'
import { Bell, Mail, MessageCircle } from 'lucide-react'

interface NotificationPreferencesFormProps {
  onSubmit?: (preferences: NotificationPreferences) => Promise<void>
}

interface NotificationPreferences {
  whatsAppEnabled: boolean
  emailEnabled: boolean
  inAppEnabled: boolean
}

export function NotificationPreferencesForm({ onSubmit }: NotificationPreferencesFormProps) {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    whatsAppEnabled: true,
    emailEnabled: true,
    inAppEnabled: true,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleToggle = (key: keyof NotificationPreferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleSave = async () => {
    try {
      setIsLoading(true)
      setMessage('')
      if (onSubmit) {
        await onSubmit(preferences)
      }
      setMessage('Preferences saved successfully')
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      setMessage('Failed to save preferences')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {message && (
        <div className="p-3 rounded-lg bg-green-50 text-green-600 text-[12px]">
          {message}
        </div>
      )}

      <div className="space-y-3">
        {/* WhatsApp toggle */}
        <div className="flex items-center justify-between p-4 rounded-lg border border-[#e3e8ee] hover:bg-[#f6f9fc] transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[#0a2540]">WhatsApp Notifications</p>
              <p className="text-[12px] text-[#8898aa]">Get notified when lead status changes</p>
            </div>
          </div>
          <button
            onClick={() => handleToggle('whatsAppEnabled')}
            disabled={isLoading}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              preferences.whatsAppEnabled ? 'bg-green-600' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                preferences.whatsAppEnabled ? 'translate-x-5' : ''
              }`}
            />
          </button>
        </div>

        {/* Email toggle */}
        <div className="flex items-center justify-between p-4 rounded-lg border border-[#e3e8ee] hover:bg-[#f6f9fc] transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <Mail className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[#0a2540]">Email Notifications</p>
              <p className="text-[12px] text-[#8898aa]">Get notified via email</p>
            </div>
          </div>
          <button
            onClick={() => handleToggle('emailEnabled')}
            disabled={isLoading}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              preferences.emailEnabled ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                preferences.emailEnabled ? 'translate-x-5' : ''
              }`}
            />
          </button>
        </div>

        {/* In-app toggle */}
        <div className="flex items-center justify-between p-4 rounded-lg border border-[#e3e8ee] hover:bg-[#f6f9fc] transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
              <Bell className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[#0a2540]">In-App Notifications</p>
              <p className="text-[12px] text-[#8898aa]">Show notifications in the app</p>
            </div>
          </div>
          <button
            onClick={() => handleToggle('inAppEnabled')}
            disabled={isLoading}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              preferences.inAppEnabled ? 'bg-purple-600' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                preferences.inAppEnabled ? 'translate-x-5' : ''
              }`}
            />
          </button>
        </div>
      </div>

      <div className="pt-4 border-t border-[#e3e8ee]">
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="px-4 py-2.5 rounded-lg bg-[#635bff] text-white text-[13px] font-semibold hover:bg-[#5350e6] transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : 'Save Preferences'}
        </button>
      </div>
    </div>
  )
}
