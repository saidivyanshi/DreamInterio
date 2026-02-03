'use client'

interface LoadingSkeletonProps {
  className?: string
  count?: number
}

export function LoadingSkeleton({ className = '', count = 1 }: LoadingSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`skeleton rounded-lg ${className}`}
        />
      ))}
    </>
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="glass rounded-xl p-4 space-y-4">
      <LoadingSkeleton className="h-48 w-full" />
      <LoadingSkeleton className="h-4 w-3/4" />
      <LoadingSkeleton className="h-4 w-1/2" />
      <LoadingSkeleton className="h-10 w-full" />
    </div>
  )
}

export function RoomCardSkeleton() {
  return (
    <div className="glass rounded-xl overflow-hidden">
      <LoadingSkeleton className="h-64 w-full" />
      <div className="p-6 space-y-3">
        <LoadingSkeleton className="h-6 w-3/4" />
        <LoadingSkeleton className="h-4 w-full" />
        <LoadingSkeleton className="h-4 w-1/2" />
      </div>
    </div>
  )
}