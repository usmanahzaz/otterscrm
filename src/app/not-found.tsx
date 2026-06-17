import Link from 'next/link'
import { ArrowLeft, AlertCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f9fc] px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(239, 68, 68, 0.1)' }}
          >
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-[#0a2540] mb-2">404</h1>
        <h2 className="text-xl font-semibold text-[#0a2540] mb-3">Page not found</h2>
        <p className="text-[13px] text-[#8898aa] mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          href="/dashboard/leads"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#635bff] text-white text-[13px] font-semibold hover:bg-[#5350e6] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  )
}
