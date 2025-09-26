'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export function BlogLoading() {
  return (
    <div className="space-y-8">
      {/* Posts Grid Loading */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="border-yellow-500/20 overflow-hidden">
            {/* Image skeleton */}
            <Skeleton className="h-48 w-full" />
            
            <CardHeader className="pb-3">
              {/* Meta info skeleton */}
              <div className="flex items-center gap-4 mb-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-16" />
              </div>
              
              {/* Title skeleton */}
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-2/3" />
            </CardHeader>

            <CardContent className="pt-0">
              {/* Description skeleton */}
              <div className="space-y-2 mb-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              
              {/* Tags skeleton */}
              <div className="flex gap-2 mb-4">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-12" />
              </div>
              
              {/* Button skeleton */}
              <Skeleton className="h-8 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="flex justify-center items-center space-x-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  )
}