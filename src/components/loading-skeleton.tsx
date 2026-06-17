'use client'

export function TableLoadingSkeleton() {
  return (
    <div className="space-y-3 p-8">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-12 bg-[#e3e8ee] rounded-lg animate-pulse" />
      ))}
    </div>
  )
}

export function CardLoadingSkeleton() {
  return (
    <div className="space-y-4 p-6">
      <div className="h-4 bg-[#e3e8ee] rounded w-1/4 animate-pulse" />
      <div className="h-8 bg-[#e3e8ee] rounded w-1/3 animate-pulse" />
      <div className="space-y-2">
        <div className="h-4 bg-[#e3e8ee] rounded w-full animate-pulse" />
        <div className="h-4 bg-[#e3e8ee] rounded w-5/6 animate-pulse" />
      </div>
    </div>
  )
}

export function GridLoadingSkeleton({ cols = 4 }: { cols?: number }) {
  return (
    <div className={`grid grid-cols-${cols} gap-4`}>
      {[...Array(cols)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg border border-[#e3e8ee] p-6 space-y-3">
          <div className="h-4 bg-[#e3e8ee] rounded w-1/4 animate-pulse" />
          <div className="h-8 bg-[#e3e8ee] rounded animate-pulse" />
          <div className="h-4 bg-[#e3e8ee] rounded w-2/3 animate-pulse" />
        </div>
      ))}
    </div>
  )
}

export function PageHeaderSkeleton() {
  return (
    <div className="border-b border-[#e3e8ee] px-8 py-6">
      <div className="h-8 bg-[#e3e8ee] rounded w-1/3 animate-pulse mb-3" />
      <div className="h-4 bg-[#e3e8ee] rounded w-1/4 animate-pulse" />
    </div>
  )
}
