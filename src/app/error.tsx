'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, Home } from 'lucide-react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f9fc] px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(251, 146, 60, 0.1)' }}
          >
            <AlertTriangle className="w-8 h-8 text-orange-500" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-[#0a2540] mb-2">Something went wrong</h1>
        <p className="text-[13px] text-[#8898aa] mb-6">
          We encountered an unexpected error. Please try again or contact support if the problem
          persists.
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
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#e3e8ee] text-[#0a2540] text-[13px] font-semibold hover:bg-[#f6f9fc] transition-colors"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
        </div>
      </div>
    </div>
  )
}
