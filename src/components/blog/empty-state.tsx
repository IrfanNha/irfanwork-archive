'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Search, FileText, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ANIMATION_VARIANTS } from '@/constants'
import { BlogFilters } from '@/types'

interface EmptyStateProps {
  filters: BlogFilters
}

export function EmptyState({ filters }: EmptyStateProps) {
  const hasFilters = filters.search || filters.category || filters.tag
  
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 text-center space-y-6"
      variants={ANIMATION_VARIANTS.fadeIn}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="h-24 w-24 rounded-full bg-muted flex items-center justify-center"
        variants={ANIMATION_VARIANTS.scale}
        transition={{ delay: 0.2 }}
      >
        {hasFilters ? (
          <Search className="h-12 w-12 text-muted-foreground" />
        ) : (
          <FileText className="h-12 w-12 text-muted-foreground" />
        )}
      </motion.div>

      <motion.div
        className="space-y-2"
        variants={ANIMATION_VARIANTS.slideUp}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-foreground">
          {hasFilters ? 'No articles found' : 'No articles yet'}
        </h2>
        <p className="text-muted-foreground max-w-md">
          {hasFilters
            ? 'Try adjusting your search terms or filters to find what you\'re looking for.'
            : 'We\'re working on adding great content. Check back soon for amazing articles!'
          }
        </p>
      </motion.div>

      <motion.div
        className="flex flex-col sm:flex-row gap-3"
        variants={ANIMATION_VARIANTS.slideUp}
        transition={{ delay: 0.4 }}
      >
        {hasFilters ? (
          <>
            <Button asChild variant="outline" className="hover:bg-muted">
              <Link href="/blog">
                <Filter className="h-4 w-4 mr-2" />
                Clear All Filters
              </Link>
            </Button>
            <Button asChild>
              <Link href="/blog">
                Browse All Articles
              </Link>
            </Button>
          </>
        ) : (
          <Button asChild>
            <Link href="/">
              <FileText className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        )}
      </motion.div>
    </motion.div>
  )
}