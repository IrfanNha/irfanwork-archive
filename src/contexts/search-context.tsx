'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { useSearch as useSearchHook } from '@/hooks/use-search'

interface SearchResult {
  id: string
  title: string
  description: string
  url: string
  type: 'blog' | 'project' | 'page'
  category?: string
  publishedAt?: string
}

interface SearchContextType {
  isSearchOpen: boolean
  searchQuery: string
  searchResults: SearchResult[]
  isLoading: boolean
  error: string | null
  openSearch: () => void
  closeSearch: () => void
  setSearchQuery: (query: string) => void
  clearSearch: () => void
  clearCache: () => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  
  const { search, results, isLoading, error, clearResults, clearCache, cleanup } = useSearchHook({
    debounceMs: 300,
    minQueryLength: 2,
    cacheTtl: 5 * 60 * 1000 // 5 minutes
  })

  const openSearch = useCallback(() => {
    setIsSearchOpen(true)
  }, [])

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false)
    setSearchQuery('')
    clearResults()
  }, [clearResults])

  const clearSearch = useCallback(() => {
    setSearchQuery('')
    clearResults()
  }, [clearResults])

  // Perform search when query changes
  useEffect(() => {
    if (searchQuery.trim()) {
      search(searchQuery)
    } else {
      clearResults()
    }
  }, [searchQuery, search, clearResults])

  // Cleanup on unmount
  useEffect(() => {
    return cleanup
  }, [cleanup])

  return (
    <SearchContext.Provider
      value={{
        isSearchOpen,
        searchQuery,
        searchResults: results,
        isLoading,
        error,
        openSearch,
        closeSearch,
        setSearchQuery,
        clearSearch,
        clearCache,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}
