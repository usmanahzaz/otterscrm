import { PageHeaderSkeleton, GridLoadingSkeleton } from '@/components/loading-skeleton'

export default function AnalyticsLoading() {
  return (
    <div className="flex flex-col h-full">
      <PageHeaderSkeleton />
      <div className="flex-1 overflow-auto bg-[#f6f9fc] p-8">
        <div className="max-w-7xl space-y-6">
          <GridLoadingSkeleton cols={4} />
          <GridLoadingSkeleton cols={2} />
        </div>
      </div>
    </div>
  )
}
