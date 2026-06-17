'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function DashboardError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Dashboard error:', error)
  }, [error])

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-[#e3e8ee] px-8 py-6">
        <h1 className="text-2xl font-bold text-[#0a2540]">Something went wrong</h1>
        <p className="text-[13px] text-[#8898aa] mt-1">We encountered an unexpected error</p>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-sm">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: 'rgba(251, 146, 60, 0.1)' }}
          >
            <AlertTriangle className="w-6 h-6 text-orange-500" />
          </div>
          <h2 className="text-lg font-semibold text-[#0a2540] mb-2">Error occurred</h2>
          <p className="text-[13px] text-[#8898aa] mb-6">
            An unexpected error occurred. Try again or go back to the dashboard.
          </p>

          {error.message && (
            <div className="mb-6 p-3 rounded-lg bg-orange-50 border border-orange-200 text-left">
              <p className="text-[11px] text-orange-700 font-mono break-words">{error.message}</p>
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              onClick={reset}
              className="flex-1 px-4 py-2.5 rounded-lg bg-[#635bff] text-white text-[13px] font-semibold hover:bg-[#5350e6] transition-colors"
            >
              Try again
            </button>
            <Link
              href="/dashboard/leads"
              className="flex-1 px-4 py-2.5 rounded-lg border border-[#e3e8ee] text-[#0a2540] text-[13px] font-semibold hover:bg-[#f6f9fc] transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
