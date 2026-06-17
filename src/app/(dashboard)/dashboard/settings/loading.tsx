import { PageHeaderSkeleton, CardLoadingSkeleton } from '@/components/loading-skeleton'

export default function SettingsLoading() {
  return (
    <div className="flex flex-col h-full">
      <PageHeaderSkeleton />
      <div className="flex-1 overflow-auto bg-[#f6f9fc]">
        <div className="max-w-2xl mx-auto px-8 py-8 space-y-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-[#e3e8ee] overflow-hidden">
              <CardLoadingSkeleton />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
