'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Tag, Folder } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Category, Tag as TagType, BlogFilters } from '@/types'
import { ANIMATION_VARIANTS } from '@/constants'
import { cn } from '@/lib/utils'

interface BlogSidebarProps {
  categories: Category[]
  tags: TagType[]
  currentFilters: BlogFilters
}

export function BlogSidebar({ categories, tags, currentFilters }: BlogSidebarProps) {
  const searchParams = useSearchParams()

  const createFilterLink = (type: 'category' | 'tag', value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('page') // Reset page when filtering
    
    if (currentFilters[type] === value) {
      params.delete(type) // Remove filter if clicking current filter
    } else {
      params.set(type, value)
    }
    
    return `/blog?${params.toString()}`
  }

  return (
    <motion.div
      className="space-y-6"
      variants={ANIMATION_VARIANTS.stagger}
      initial="hidden"
      animate="visible"
    >
      {/* Categories */}
      <motion.div variants={ANIMATION_VARIANTS.slideUp}>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Folder className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Categories
            </h3>
          </div>
          <div className="space-y-1">
            {categories.map((category) => (
              <Link
                key={category.documentId}
                href={createFilterLink('category', category.slug)}
                className={cn(
                  "block py-2 text-sm transition-colors border-l-2 pl-3",
                  currentFilters.category === category.slug
                    ? "border-foreground text-foreground font-medium"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-foreground/30"
                )}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Tags */}
      <motion.div variants={ANIMATION_VARIANTS.slideUp} transition={{ delay: 0.1 }}>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Tags
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag.documentId}
                href={createFilterLink('tag', tag.slug)}
              >
                <Badge
                  variant="outline"
                  className={cn(
                    "cursor-pointer transition-colors text-xs font-normal",
                    currentFilters.tag === tag.slug
                      ? "bg-foreground text-background border-foreground"
                      : "border-border text-muted-foreground hover:bg-muted hover:border-foreground/50"
                  )}
                >
                  {tag.name}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}