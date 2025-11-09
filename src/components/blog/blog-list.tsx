'use client'

import { PostCard } from '@/components/blog/post-card'
import { BlogPagination } from '@/components/blog/blog-pagination'
import { EmptyState } from '@/components/blog/empty-state'
import { Post, BlogFilters } from '@/types'

interface BlogListProps {
  initialPosts: Post[]
  pagination: {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }
  filters: BlogFilters
}

export function BlogList({ initialPosts, pagination, filters }: BlogListProps) {
  if (initialPosts.length === 0) {
    return <EmptyState filters={filters} />
  }

  return (
    <div className="space-y-0">
      {/* Posts List */}
      <div className="divide-y divide-border">
        {initialPosts.map((post, index) => (
          <PostCard 
            key={post.documentId} 
            post={post} 
            index={index}
          />
        ))}
      </div>

      {/* Pagination */}
      {pagination.pageCount > 1 && (
        <div className="pt-12 pb-8">
          <BlogPagination pagination={pagination} />
        </div>
      )}
    </div>
  )
}