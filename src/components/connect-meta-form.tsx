'use client'

import { useState } from 'react'
import { connectMetaPage } from '@/lib/meta-actions'
import type { MetaPage } from '@prisma/client'

interface ConnectMetaFormProps {
  onSuccess: (page: MetaPage) => void
  onCancel: () => void
}

export function ConnectMetaForm({ onSuccess, onCancel }: ConnectMetaFormProps) {
  const [pageId, setPageId] = useState('')
  const [pageName, setPageName] = useState('')
  const [accessToken, setAccessToken] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (!pageId || !pageName || !accessToken) {
      setError('All fields are required')
      return
    }

    try {
      setIsLoading(true)
      const formData = new FormData()
      formData.append('page_id', pageId)
      formData.append('page_name', pageName)
      formData.append('access_token', accessToken)

      const result = await connectMetaPage(formData)

      if (result.error) {
        setError(result.error)
      } else if (result.success && result.page) {
        onSuccess(result.page)
      }
    } catch (err) {
      setError('Failed to connect page')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      {error && (
        <div className="p-3 rounded-lg bg-red-50 text-red-600 text-[12px]">
          {error}
        </div>
      )}

      <div>
        <label className="block text-[12px] font-semibold text-[#425466] mb-2">
          Page Name *
        </label>
        <input
          type="text"
          value={pageName}
          onChange={(e) => setPageName(e.target.value)}
          placeholder="e.g., Company Page"
          disabled={isLoading}
          className="w-full px-4 py-2.5 rounded-lg border border-[#e3e8ee] text-[13px] text-[#0a2540] placeholder-[#8898aa] focus:outline-none focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/10 disabled:opacity-50"
        />
      </div>

      <div>
        <label className="block text-[12px] font-semibold text-[#425466] mb-2">
          Page ID *
        </label>
        <input
          type="text"
          value={pageId}
          onChange={(e) => setPageId(e.target.value)}
          placeholder="Your Meta page ID"
          disabled={isLoading}
          className="w-full px-4 py-2.5 rounded-lg border border-[#e3e8ee] text-[13px] text-[#0a2540] placeholder-[#8898aa] focus:outline-none focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/10 disabled:opacity-50"
        />
      </div>

      <div>
        <label className="block text-[12px] font-semibold text-[#425466] mb-2">
          Access Token *
        </label>
        <textarea
          value={accessToken}
          onChange={(e) => setAccessToken(e.target.value)}
          placeholder="Your Meta page access token"
          disabled={isLoading}
          rows={3}
          className="w-full px-4 py-2.5 rounded-lg border border-[#e3e8ee] text-[13px] text-[#0a2540] placeholder-[#8898aa] focus:outline-none focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/10 disabled:opacity-50 resize-none"
        />
        <p className="text-[11px] text-[#8898aa] mt-1">
          You can find this in your Meta Business Manager settings
        </p>
      </div>

      <div className="flex items-center gap-2 pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 px-4 py-2.5 rounded-lg bg-[#635bff] text-white text-[13px] font-semibold hover:bg-[#5350e6] transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Connecting...' : 'Connect Page'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1 px-4 py-2.5 rounded-lg border border-[#e3e8ee] text-[#0a2540] text-[13px] font-semibold hover:bg-[#f6f9fc] transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
