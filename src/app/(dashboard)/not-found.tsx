import Link from 'next/link'
import { AlertCircle } from 'lucide-react'

export default function DashboardNotFound() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-[#e3e8ee] px-8 py-6">
        <h1 className="text-2xl font-bold text-[#0a2540]">Page not found</h1>
        <p className="text-[13px] text-[#8898aa] mt-1">
          The page you're looking for doesn't exist
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-sm">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: 'rgba(239, 68, 68, 0.1)' }}
          >
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="text-lg font-semibold text-[#0a2540] mb-2">404 Error</h2>
          <p className="text-[13px] text-[#8898aa] mb-4">
            This page doesn't exist or has been moved.
          </p>
          <Link
            href="/dashboard/leads"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#635bff] text-white text-[13px] font-semibold hover:bg-[#5350e6] transition-colors"
          >
            Back to Leads
          </Link>
        </div>
      </div>
    </div>
  )
}
