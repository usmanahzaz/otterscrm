'use client'

import { useState } from 'react'
import { Plus, Trash2, ToggleLeft, ToggleRight } from 'lucide-react'
import { ConnectMetaForm } from './connect-meta-form'
import { disconnectMetaPage, toggleMetaPageStatus } from '@/lib/meta-actions'
import type { MetaPage } from '@prisma/client'

interface IntegrationsContentProps {
  metaPages: MetaPage[]
}

export function IntegrationsContent({ metaPages }: IntegrationsContentProps) {
  const [pages, setPages] = useState(metaPages)
  const [showForm, setShowForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleDisconnect = async (pageId: string) => {
    if (!confirm('Are you sure you want to disconnect this page?')) return

    try {
      setIsLoading(true)
      setError('')
      await disconnectMetaPage(pageId)
      setPages(pages.filter((p) => p.id !== pageId))
    } catch (err) {
      setError('Failed to disconnect page')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleStatus = async (pageId: string) => {
    try {
      setIsLoading(true)
      setError('')
      const updated = await toggleMetaPageStatus(pageId)
      setPages(pages.map((p) => (p.id === pageId ? updated : p)))
    } catch (err) {
      setError('Failed to update status')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFormSuccess = (newPage: MetaPage) => {
    setPages([newPage, ...pages])
    setShowForm(false)
  }

  return (
    <div className="flex-1 overflow-auto p-8">
      <div className="max-w-4xl">
        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-[13px]">
            {error}
          </div>
        )}

        {/* Meta integration card */}
        <div className="bg-white rounded-lg border border-[#e3e8ee] overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-[#e3e8ee]">
            <h2 className="text-lg font-semibold text-[#0a2540]">Meta Ads Integration</h2>
            <p className="text-[13px] text-[#8898aa] mt-1">
              Connect your Meta ads account to automatically sync leads
            </p>
          </div>

          {!showForm ? (
            <div className="px-6 py-6">
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#635bff] text-white text-[13px] font-semibold hover:bg-[#5350e6] transition-colors"
              >
                <Plus className="w-4 h-4" />
                Connect Meta Page
              </button>
            </div>
          ) : (
            <div className="px-6 py-6 bg-[#f6f9fc] border-t border-[#e3e8ee]">
              <ConnectMetaForm
                onSuccess={handleFormSuccess}
                onCancel={() => setShowForm(false)}
              />
            </div>
          )}
        </div>

        {/* Connected pages */}
        {pages.length > 0 && (
          <div className="bg-white rounded-lg border border-[#e3e8ee] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#e3e8ee]">
              <h2 className="text-lg font-semibold text-[#0a2540]">Connected Pages</h2>
              <p className="text-[13px] text-[#8898aa] mt-1">
                {pages.length} page{pages.length !== 1 ? 's' : ''} connected
              </p>
            </div>

            <div className="divide-y divide-[#e3e8ee]">
              {pages.map((page) => (
                <div
                  key={page.id}
                  className="px-6 py-4 hover:bg-[#f6f9fc] transition-colors flex items-center justify-between"
                >
                  <div className="flex-1">
                    <h3 className="text-[13px] font-semibold text-[#0a2540]">
                      {page.pageName}
                    </h3>
                    <p className="text-[12px] text-[#8898aa] mt-1">
                      Page ID: {page.pageId}
                    </p>
                    <p className="text-[12px] text-[#8898aa] mt-1">
                      Connected{' '}
                      {new Intl.DateTimeFormat('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      }).format(page.connectedAt)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] text-[#8898aa]">
                        {page.isActive ? 'Active' : 'Inactive'}
                      </span>
                      <button
                        onClick={() => handleToggleStatus(page.id)}
                        disabled={isLoading}
                        className="p-2 rounded-lg hover:bg-[#e3e8ee] transition-colors disabled:opacity-50"
                      >
                        {page.isActive ? (
                          <ToggleRight className="w-5 h-5 text-[#635bff]" />
                        ) : (
                          <ToggleLeft className="w-5 h-5 text-[#8898aa]" />
                        )}
                      </button>
                    </div>

                    <button
                      onClick={() => handleDisconnect(page.id)}
                      disabled={isLoading}
                      className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sync status info */}
        <div className="mt-6 p-4 rounded-lg bg-blue-50 border border-blue-200">
          <h3 className="text-[13px] font-semibold text-blue-900 mb-2">Sync Status</h3>
          <p className="text-[12px] text-blue-800">
            Leads will be automatically synced from your connected Meta pages. The sync happens in real-time when new form submissions are received.
          </p>
        </div>
      </div>
    </div>
  )
}
