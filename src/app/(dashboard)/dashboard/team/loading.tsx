import { PageHeaderSkeleton, TableLoadingSkeleton } from '@/components/loading-skeleton'

export default function TeamLoading() {
  return (
    <div className="flex flex-col h-full">
      <PageHeaderSkeleton />
      <TableLoadingSkeleton />
    </div>
  )
}
