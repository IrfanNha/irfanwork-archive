'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Tag, Folder, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
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
        <Card className="border-yellow-500/20 shadow-lg shadow-yellow-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Folder className="h-5 w-5 text-yellow-500" />
              Categories
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {categories.map((category) => (
              <Link
                key={category.documentId}
                href={createFilterLink('category', category.slug)}
                className={cn(
                  "block p-2 rounded-md text-sm transition-colors hover:bg-yellow-500/10",
                  currentFilters.category === category.slug
                    ? "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <div className="flex items-center justify-between">
                  <span>{category.name}</span>
                  {currentFilters.category === category.slug && (
                    <Badge variant="outline" className="bg-yellow-500/10">
                      Active
                    </Badge>
                  )}
                </div>
                {category.descriptions && (
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {category.descriptions}
                  </p>
                )}
              </Link>
            ))}
            
            {currentFilters.category && (
              <>
                <Separator className="my-2" />
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="w-full text-xs"
                >
                  <Link href={createFilterLink('category', currentFilters.category)}>
                    Clear Category Filter
                  </Link>
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Tags */}
      <motion.div variants={ANIMATION_VARIANTS.slideUp} transition={{ delay: 0.1 }}>
        <Card className="border-yellow-500/20 shadow-lg shadow-yellow-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Tag className="h-5 w-5 text-yellow-500" />
              Tags
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag.documentId}
                  href={createFilterLink('tag', tag.slug)}
                >
                  <Badge
                    variant={currentFilters.tag === tag.slug ? "default" : "outline"}
                    className={cn(
                      "cursor-pointer transition-colors hover:bg-yellow-500/10",
                      currentFilters.tag === tag.slug
                        ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                        : "border-yellow-500/30 hover:border-yellow-500/60"
                    )}
                  >
                    {tag.name}
                  </Badge>
                </Link>
              ))}
            </div>
            
            {currentFilters.tag && (
              <>
                <Separator className="my-4" />
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="w-full text-xs"
                >
                  <Link href={createFilterLink('tag', currentFilters.tag)}>
                    Clear Tag Filter
                  </Link>
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Popular Articles - Placeholder for future implementation */}
      <motion.div variants={ANIMATION_VARIANTS.slideUp} transition={{ delay: 0.2 }}>
        <Card className="border-yellow-500/20 shadow-lg shadow-yellow-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-yellow-500" />
              Popular This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Popular articles feature coming soon...
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}