import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth-actions'
import { getAnalyticsData } from '@/lib/analytics-actions'
import { AnalyticsContent } from '@/components/analytics-content'

export default async function AnalyticsPage() {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    redirect('/login')
  }

  const analytics = await getAnalyticsData()

  return (
    <div className="flex flex-col h-full">
      {/* Page header */}
      <div className="border-b border-[#e3e8ee] px-8 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0a2540]" style={{ letterSpacing: '-0.025em' }}>
            Analytics
          </h1>
          <p className="text-[13px] text-[#8898aa] mt-1">
            Performance metrics and insights
          </p>
        </div>
      </div>

      {/* Content */}
      <AnalyticsContent analytics={analytics} />
    </div>
  )
}
