'use client'

import { motion } from 'framer-motion'
import { PostCard } from '@/components/blog/post-card'
import { BlogPagination } from '@/components/blog/blog-pagination'
import { EmptyState } from '@/components/blog/empty-state'
import { ANIMATION_VARIANTS } from '@/constants'
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
    <motion.div
      className="space-y-8"
      variants={ANIMATION_VARIANTS.stagger}
      initial="hidden"
      animate="visible"
    >
      {/* Posts Grid */}
      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        variants={ANIMATION_VARIANTS.stagger}
      >
        {initialPosts.map((post, index) => (
          <motion.div
            key={post.documentId}
            variants={ANIMATION_VARIANTS.slideUp}
            transition={{ delay: index * 0.1 }}
          >
            <PostCard post={post} />
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination */}
      {pagination.pageCount > 1 && (
        <motion.div
          variants={ANIMATION_VARIANTS.fadeIn}
          transition={{ delay: 0.3 }}
        >
          <BlogPagination pagination={pagination} />
        </motion.div>
      )}
    </motion.div>
  )
}