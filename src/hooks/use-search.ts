'use client'

import { useState, useCallback, useRef } from 'react'
import { searchCache } from '@/lib/search-cache'

interface SearchResult {
  id: string
  title: string
  description: string
  url: string
  type: 'blog' | 'project' | 'page'
  category?: string
  publishedAt?: string
}

interface UseSearchOptions {
  debounceMs?: number
  minQueryLength?: number
  cacheTtl?: number
}

export function useSearch(options: UseSearchOptions = {}) {
  const {
    debounceMs = 300,
    minQueryLength = 2,
    cacheTtl = 5 * 60 * 1000 // 5 minutes
  } = options

  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  const [error, setError] = useState<string | null>(null)
  
  const debounceRef = useRef<NodeJS.Timeout>()
  const abortControllerRef = useRef<AbortController>()

  const performSearch = useCallback(async (query: string): Promise<SearchResult[]> => {
    if (!query.trim() || query.trim().length < minQueryLength) {
      return []
    }

    const trimmedQuery = query.trim()

    // Check cache first
    const cachedResults = searchCache.get(trimmedQuery)
    if (cachedResults) {
      console.log('Search cache hit for:', trimmedQuery)
      return cachedResults
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController()

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(trimmedQuery)}`, {
        signal: abortControllerRef.current.signal
      })

      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`)
      }

      const data = await response.json()
      const searchResults = data.results || []

      // Cache the results
      searchCache.set(trimmedQuery, searchResults, cacheTtl)
      
      console.log('Search cache miss for:', trimmedQuery, 'Results:', searchResults.length)
      return searchResults

    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Search request aborted')
        return []
      }
      
      console.error('Search error:', error)
      throw error
    }
  }, [minQueryLength, cacheTtl])

  const search = useCallback(async (query: string) => {
    // Clear previous debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    // If query is too short, clear results
    if (!query.trim() || query.trim().length < minQueryLength) {
      setResults([])
      setError(null)
      return
    }

    // Debounce the search
    debounceRef.current = setTimeout(async () => {
      setIsLoading(true)
      setError(null)

      try {
        const searchResults = await performSearch(query)
        setResults(searchResults)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Search failed')
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }, debounceMs)
  }, [performSearch, debounceMs, minQueryLength])

  const clearResults = useCallback(() => {
    setResults([])
    setError(null)
  }, [])

  const clearCache = useCallback(() => {
    searchCache.clear()
  }, [])

  // Cleanup on unmount
  const cleanup = useCallback(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
  }, [])

  return {
    search,
    results,
    isLoading,
    error,
    clearResults,
    clearCache,
    cleanup
  }
}
