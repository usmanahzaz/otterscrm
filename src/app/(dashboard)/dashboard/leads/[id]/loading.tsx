import { CardLoadingSkeleton, PageHeaderSkeleton } from '@/components/loading-skeleton'

export default function LeadDetailsLoading() {
  return (
    <div className="flex flex-col h-full">
      <PageHeaderSkeleton />
      <div className="flex-1 overflow-auto p-8">
        <div className="grid grid-cols-3 gap-6 max-w-7xl">
          <div className="col-span-2 space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg border border-[#e3e8ee]">
                <CardLoadingSkeleton />
              </div>
            ))}
          </div>
          <div className="bg-white rounded-lg border border-[#e3e8ee]">
            <CardLoadingSkeleton />
          </div>
        </div>
      </div>
    </div>
  )
}
