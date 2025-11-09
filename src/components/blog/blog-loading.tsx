'use client'

import { Skeleton } from '@/components/ui/skeleton'

export function BlogLoading() {
  return (
    <div className="space-y-0 divide-y divide-border">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="py-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Left: Content */}
            <div className="flex-1 space-y-4">
              {/* Meta info skeleton */}
              <div className="flex items-center gap-4">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
              
              {/* Title skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-4/5" />
              </div>
              
              {/* Excerpt skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              
              {/* Tags skeleton */}
              <div className="flex gap-3 pt-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-12" />
              </div>
              
              {/* Read more skeleton */}
              <Skeleton className="h-4 w-24 pt-2" />
            </div>

            {/* Right: Thumbnail skeleton */}
            <div className="md:w-48 lg:w-64 flex-shrink-0">
              <Skeleton className="aspect-video md:aspect-square w-full rounded border border-border" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}