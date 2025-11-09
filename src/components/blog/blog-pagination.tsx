'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MOTION } from '@/constants'

interface BlogPaginationProps {
  pagination: {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }
}

export function BlogPagination({ pagination }: BlogPaginationProps) {
  const searchParams = useSearchParams()
  const { page, pageCount } = pagination

  const createPageLink = (pageNum: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (pageNum === 1) {
      params.delete('page')
    } else {
      params.set('page', pageNum.toString())
    }
    return `/blog?${params.toString()}`
  }

  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, page - delta); i <= Math.min(pageCount - 1, page + delta); i++) {
      range.push(i)
    }

    if (page - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (page + delta < pageCount - 1) {
      rangeWithDots.push('...', pageCount)
    } else {
      rangeWithDots.push(pageCount)
    }

    return rangeWithDots.filter((item, index, array) => array.indexOf(item) === index)
  }

  if (pageCount <= 1) return null

  const visiblePages = getVisiblePages()

  return (
    <motion.div
      className="flex justify-center items-center space-x-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: MOTION.MEDIUM }}
    >
      {/* Previous Button */}
      <Button
        variant="outline"
        size="sm"
        asChild={page > 1}
        disabled={page <= 1}
        className="hover:bg-muted"
      >
        {page > 1 ? (
          <Link href={createPageLink(page - 1)}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Link>
        ) : (
          <span>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </span>
        )}
      </Button>

      {/* Page Numbers */}
      <div className="flex space-x-1">
        {visiblePages.map((pageNum, index) => (
          <div key={index}>
            {pageNum === '...' ? (
              <Button variant="ghost" size="sm" disabled>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant={pageNum === page ? "default" : "outline"}
                size="sm"
                asChild={pageNum !== page}
                disabled={pageNum === page}
                className="hover:bg-muted"
              >
                {pageNum !== page ? (
                  <Link href={createPageLink(pageNum as number)}>
                    {pageNum}
                  </Link>
                ) : (
                  <span>{pageNum}</span>
                )}
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Next Button */}
      <Button
        variant="outline"
        size="sm"
        asChild={page < pageCount}
        disabled={page >= pageCount}
        className="hover:bg-muted"
      >
        {page < pageCount ? (
          <Link href={createPageLink(page + 1)}>
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        ) : (
          <span>
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </span>
        )}
      </Button>
    </motion.div>
  )
}