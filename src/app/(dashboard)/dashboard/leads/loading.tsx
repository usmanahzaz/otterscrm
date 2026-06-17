import { PageHeaderSkeleton, TableLoadingSkeleton } from '@/components/loading-skeleton'

export default function LeadsLoading() {
  return (
    <div className="flex flex-col h-full">
      <PageHeaderSkeleton />
      <div className="border-b border-[#e3e8ee] px-8 py-4">
        <div className="h-10 bg-[#e3e8ee] rounded w-full max-w-md animate-pulse" />
      </div>
      <TableLoadingSkeleton />
    </div>
  )
}
