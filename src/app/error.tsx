'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f9fc] p-4">
      <div className="max-w-md w-full bg-white rounded-xl border border-[#e3e8ee] p-8 text-center">
        <h1 className="text-2xl font-bold text-[#0a2540] mb-2">Something went wrong</h1>
        <p className="text-[13px] text-[#8898aa] mb-4">
          An error occurred while rendering this page.
        </p>
        
        {error.digest && (
          <div className="bg-gray-50 rounded-lg p-3 mb-4 text-left">
            <p className="text-[11px] font-mono text-gray-600 break-all">
              Error ID: {error.digest}
            </p>
          </div>
        )}

        <div className="space-y-2">
          <button
            onClick={() => reset()}
            className="w-full px-4 py-2 rounded-lg bg-[#635bff] text-white text-[13px] font-semibold hover:bg-[#5350e6] transition-colors"
          >
            Try again
          </button>
          <a
            href="/login"
            className="block px-4 py-2 rounded-lg border border-[#e3e8ee] text-[#0a2540] text-[13px] font-semibold hover:bg-[#f6f9fc] transition-colors"
          >
            Go to login
          </a>
        </div>

        <p className="text-[11px] text-[#8898aa] mt-4">
          Check your database connection and environment variables.
        </p>
      </div>
    </div>
  )
}
