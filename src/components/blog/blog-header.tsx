'use client'

import { motion } from 'framer-motion'
import { Search, Filter, SortDesc } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useCallback, useEffect } from 'react'
import { ANIMATION_VARIANTS, MOTION } from '@/constants'
import { BlogFilters } from '@/types'

interface BlogHeaderProps {
  totalPosts: number
  currentFilters: BlogFilters
}

export function BlogHeader({ totalPosts, currentFilters }: BlogHeaderProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchValue, setSearchValue] = useState(currentFilters.search || '')

  const updateFilters = useCallback((newFilters: Partial<BlogFilters>) => {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        params.set(key, value.toString())
      } else {
        params.delete(key)
      }
    })

    // Reset page when filters change
    if (Object.keys(newFilters).some(key => key !== 'page')) {
      params.delete('page')
    }

    router.push(`/blog?${params.toString()}`)
  }, [searchParams, router])


  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchValue !== (currentFilters.search || '')) {
        updateFilters({ search: searchValue })
      }
    }, 300)

    return () => clearTimeout(handler)
  }, [searchValue, updateFilters, currentFilters.search])

  const clearFilters = () => {
    setSearchValue('')
    router.push('/blog')
  }
  const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { duration: 0.6, staggerChildren: 0.2 },
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

  const activeFiltersCount =
    Object.values(currentFilters).filter(Boolean).length - 2 // Exclude page and pageSize

  return (
    <motion.div
      className="space-y-6"
      variants={ANIMATION_VARIANTS.stagger}
      initial="hidden"
      animate="visible"
    >
      {/* Blog Header */}
<motion.section
  className="text-center space-y-8"
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  {/* Main Title */}
  <motion.div variants={itemVariants} className="space-y-4">
    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
      <span className="bg-gradient-to-r from-foreground via-foreground to-yellow-600 bg-clip-text text-transparent">
        Blog
      </span>
    </h1> 

    <motion.div
      className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full"
      initial={{ width: 0 }}
      whileInView={{ width: 80 }}
      viewport={{ once: true }}
      transition={{ delay: 0.6, duration: 0.8 }}
    />
  </motion.div>

  {/* Subtitle */}
  <motion.p
    variants={itemVariants}
    className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
  >
    Discover insights, tutorials, and stories from our community.
    {totalPosts > 0 && (
      <span className="block mt-2">
        Found <strong className="text-yellow-600">{totalPosts}</strong>{" "}
        article{totalPosts !== 1 ? "s" : ""}
      </span>
    )}
  </motion.p>
</motion.section>


      {/* Search & Filters */}
      <motion.div
        className="bg-card border border-yellow-500/20 rounded-lg p-6 shadow-lg shadow-yellow-500/5"
        variants={ANIMATION_VARIANTS.slideUp}
        transition={{ delay: 0.2 }}
      >
        <div className="flex flex-col md:flex-row gap-4 items-end">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-10 border-yellow-500/20 focus:border-yellow-500/40"
            />
          </div>

          {/* Sort */}
          <div className="min-w-[150px]">
            <Select
              value={currentFilters.sort || 'newest'}
              onValueChange={(value) => updateFilters({ sort: value as any })}
            >
              <SelectTrigger className="border-yellow-500/20 focus:border-yellow-500/40">
                <SortDesc className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Clear Filters */}
          {activeFiltersCount > 0 && (
            <Button
              variant="outline"
              onClick={clearFilters}
              className="hover:bg-yellow-500/10"
            >
              <Filter className="h-4 w-4 mr-2" />
              Clear ({activeFiltersCount})
            </Button>
          )}
        </div>

        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <motion.div
            className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-yellow-500/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: MOTION.FAST }}
          >
            {currentFilters.search && (
              <Badge variant="outline" className="bg-yellow-500/10 border-yellow-500/30">
                Search: &quot;{currentFilters.search}&quot;
              </Badge>
            )}
            {currentFilters.category && (
              <Badge variant="outline" className="bg-yellow-500/10 border-yellow-500/30">
                Category: {currentFilters.category}
              </Badge>
            )}
            {currentFilters.tag && (
              <Badge variant="outline" className="bg-yellow-500/10 border-yellow-500/30">
                Tag: {currentFilters.tag}
              </Badge>
            )}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}
