'use client'

import { useState } from 'react'
import { Eye, EyeOff, Copy, Plus, Trash2 } from 'lucide-react'

interface ApiKey {
  id: string
  name: string
  key: string
  createdAt: Date
  lastUsed?: Date
}

interface ApiKeysSectionProps {
  keys?: ApiKey[]
}

export function ApiKeysSection({ keys = [] }: ApiKeysSectionProps) {
  const [showKey, setShowKey] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [keyName, setKeyName] = useState('')

  const handleCopyKey = (key: string, id: string) => {
    navigator.clipboard.writeText(key)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-[12px] text-[#8898aa]">
          API keys allow external applications to access your workspace data
        </p>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#635bff] text-white text-[12px] font-semibold hover:bg-[#5350e6] transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            New Key
          </button>
        )}
      </div>

      {showForm && (
        <div className="p-4 rounded-lg bg-[#f6f9fc] border border-[#e3e8ee] space-y-3">
          <input
            type="text"
            value={keyName}
            onChange={(e) => setKeyName(e.target.value)}
            placeholder="Give this key a name..."
            className="w-full px-3 py-2 rounded-lg border border-[#e3e8ee] text-[13px] text-[#0a2540] placeholder-[#8898aa] focus:outline-none focus:border-[#635bff]"
          />
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                // In production, this would create an API key
                setShowForm(false)
                setKeyName('')
              }}
              disabled={!keyName}
              className="flex-1 px-3 py-2 rounded-lg bg-[#635bff] text-white text-[12px] font-semibold hover:bg-[#5350e6] transition-colors disabled:opacity-50"
            >
              Create Key
            </button>
            <button
              onClick={() => {
                setShowForm(false)
                setKeyName('')
              }}
              className="flex-1 px-3 py-2 rounded-lg border border-[#e3e8ee] text-[#0a2540] text-[12px] font-semibold hover:bg-[#f6f9fc] transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {keys.length === 0 ? (
        <div className="p-4 rounded-lg bg-[#f6f9fc] border border-[#e3e8ee] text-center">
          <p className="text-[12px] text-[#8898aa]">No API keys created yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {keys.map((key) => (
            <div
              key={key.id}
              className="p-4 rounded-lg bg-[#f6f9fc] border border-[#e3e8ee] flex items-center justify-between"
            >
              <div className="flex-1">
                <p className="text-[13px] font-semibold text-[#0a2540]">{key.name}</p>
                <p className="text-[12px] text-[#8898aa] mt-1">
                  {showKey === key.id ? key.key : '••••••••••••••••'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowKey(showKey === key.id ? null : key.id)}
                  className="p-2 rounded hover:bg-white transition-colors"
                >
                  {showKey === key.id ? (
                    <EyeOff className="w-4 h-4 text-[#8898aa]" />
                  ) : (
                    <Eye className="w-4 h-4 text-[#8898aa]" />
                  )}
                </button>
                <button
                  onClick={() => handleCopyKey(key.key, key.id)}
                  className="p-2 rounded hover:bg-white transition-colors"
                >
                  <Copy
                    className={`w-4 h-4 ${
                      copied === key.id
                        ? 'text-green-600'
                        : 'text-[#8898aa]'
                    }`}
                  />
                </button>
                <button className="p-2 rounded hover:bg-red-50 transition-colors">
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
