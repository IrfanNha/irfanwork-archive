'use client'

import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Clock, FileText, Code, Home, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useSearch } from '@/contexts/search-context'
import { cn } from '@/lib/utils'
import { MOTION } from '@/constants'

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'blog':
      return <FileText className="h-4 w-4" />
    case 'project':
      return <Code className="h-4 w-4" />
    case 'page':
      return <Home className="h-4 w-4" />
    default:
      return <FileText className="h-4 w-4" />
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'blog':
      return 'bg-blue-500/10 text-blue-600 border-blue-500/20'
    case 'project':
      return 'bg-green-500/10 text-green-600 border-green-500/20'
    case 'page':
      return 'bg-purple-500/10 text-purple-600 border-purple-500/20'
    default:
      return 'bg-gray-500/10 text-gray-600 border-gray-500/20'
  }
}

export function SearchModal() {
  const {
    isSearchOpen,
    searchQuery,
    searchResults,
    isLoading,
    error,
    closeSearch,
    setSearchQuery,
    clearSearch,
    clearCache
  } = useSearch()

  const inputRef = useRef<HTMLInputElement>(null)

  // Focus input when modal opens
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isSearchOpen])

  // Search is now handled automatically by the context
  // No need for manual debouncing here

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeSearch()
    }
  }

  const handleResultClick = () => {
    closeSearch()
  }

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSearch}
          />

          {/* Modal */}
          <motion.div
            className="fixed top-16 sm:top-20 left-1/2 transform -translate-x-1/2 w-[calc(100vw-1rem)] sm:w-[calc(100vw-2rem)] max-w-2xl z-50"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: MOTION.FAST }}
            onKeyDown={handleKeyDown}
            style={{ 
              maxWidth: 'min(100vw - 1rem, 32rem)',
              left: '50%',
              transform: 'translateX(-50%)'
            }}
          >
            <div className="bg-background border border-yellow-500/20 rounded-lg shadow-xl shadow-yellow-500/10 overflow-hidden">
              {/* Search Input */}
              <div className="p-4 border-b border-yellow-500/20">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    ref={inputRef}
                    type="text"
                    placeholder="Search articles, projects, pages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-10 border-yellow-500/20 focus:border-yellow-500/40 focus:ring-yellow-500/20 w-full"
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                      onClick={clearSearch}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Search Results */}
              <div className="max-h-96 overflow-y-auto overflow-x-hidden">
                {error ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                      <X className="h-6 w-6 text-red-500" />
                    </div>
                    <h3 className="font-medium text-foreground mb-2">Search Error</h3>
                    <p className="text-sm text-muted-foreground mb-4">{error}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        clearCache()
                        setSearchQuery('')
                      }}
                      className="text-xs"
                    >
                      Clear Cache & Retry
                    </Button>
                  </div>
                ) : isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-yellow-500" />
                    <span className="ml-2 text-muted-foreground">Searching...</span>
                  </div>
                ) : searchQuery.trim() ? (
                  searchResults.length > 0 ? (
                    <div className="p-2">
                      {searchResults.map((result, index) => (
                        <motion.a
                          key={result.id}
                          href={result.url}
                          onClick={handleResultClick}
                          className="block p-3 rounded-lg hover:bg-yellow-500/5 transition-colors group"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <div className="flex items-start gap-3 w-full">
                            <div className="flex-shrink-0 mt-1">
                              {getTypeIcon(result.type)}
                            </div>
                            
                            <div className="flex-1 min-w-0 overflow-hidden">
                              <div className="flex items-start gap-2 mb-1 flex-wrap">
                                <h3 className="font-medium text-foreground group-hover:text-yellow-600 transition-colors truncate flex-1 min-w-0">
                                  {result.title}
                                </h3>
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    "text-xs flex-shrink-0",
                                    getTypeColor(result.type)
                                  )}
                                >
                                  {result.type}
                                </Badge>
                              </div>
                              
                              <p className="text-sm text-muted-foreground line-clamp-2 break-words">
                                {result.description}
                              </p>
                              
                              {result.category && (
                                <div className="flex items-center gap-1 mt-1">
                                  <Clock className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                                  <span className="text-xs text-muted-foreground truncate">
                                    {result.category}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.a>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <Search className="h-12 w-12 text-muted-foreground/50 mb-4" />
                      <h3 className="font-medium text-foreground mb-2">No results found</h3>
                      <p className="text-sm text-muted-foreground">
                        Try searching with different keywords
                      </p>
                    </div>
                  )
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Search className="h-12 w-12 text-muted-foreground/50 mb-4" />
                    <h3 className="font-medium text-foreground mb-2">Start typing to search</h3>
                    <p className="text-sm text-muted-foreground">
                      Search for articles, projects, or pages
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-3 border-t border-yellow-500/20 bg-muted/30">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-muted-foreground">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    <span className="hidden sm:inline">Press <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Esc</kbd> to close</span>
                    <span className="sm:hidden">Press <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Esc</kbd> to close</span>
                    {searchQuery.trim() && (
                      <>
                        <span className="hidden sm:inline">•</span>
                        <button
                          onClick={clearCache}
                          className="hover:text-foreground transition-colors text-left"
                          title="Clear search cache"
                        >
                          Clear Cache
                        </button>
                      </>
                    )}
                  </div>
                  <span className="text-right">{searchResults.length} result{searchResults.length !== 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
