// Search cache utility with localStorage and memory cache
interface CacheItem {
  data: any
  timestamp: number
  ttl: number // Time to live in milliseconds
}

interface SearchCache {
  [key: string]: CacheItem
}

class SearchCacheManager {
  private memoryCache: SearchCache = {}
  private readonly CACHE_PREFIX = 'search_cache_'
  private readonly DEFAULT_TTL = 5 * 60 * 1000 // 5 minutes
  private readonly MAX_CACHE_SIZE = 50

  private getStorageKey(query: string): string {
    return `${this.CACHE_PREFIX}${query.toLowerCase().trim()}`
  }

  private isExpired(item: CacheItem): boolean {
    return Date.now() - item.timestamp > item.ttl
  }

  private cleanExpiredItems(): void {
    const now = Date.now()
    Object.keys(this.memoryCache).forEach(key => {
      if (now - this.memoryCache[key].timestamp > this.memoryCache[key].ttl) {
        delete this.memoryCache[key]
      }
    })
  }

  private cleanOldestItems(): void {
    const items = Object.entries(this.memoryCache)
      .sort(([, a], [, b]) => a.timestamp - b.timestamp)
    
    const itemsToRemove = items.slice(0, items.length - this.MAX_CACHE_SIZE)
    itemsToRemove.forEach(([key]) => {
      delete this.memoryCache[key]
    })
  }

  set(query: string, data: any, ttl: number = this.DEFAULT_TTL): void {
    const key = this.getStorageKey(query)
    const item: CacheItem = {
      data,
      timestamp: Date.now(),
      ttl
    }

    // Store in memory cache
    this.memoryCache[key] = item

    // Store in localStorage (for persistence across sessions)
    try {
      localStorage.setItem(key, JSON.stringify(item))
    } catch (error) {
      console.warn('Failed to store search cache in localStorage:', error)
    }

    // Clean up if cache is too large
    if (Object.keys(this.memoryCache).length > this.MAX_CACHE_SIZE) {
      this.cleanOldestItems()
    }
  }

  get(query: string): any | null {
    const key = this.getStorageKey(query)
    
    // Try memory cache first
    let item = this.memoryCache[key]
    
    // If not in memory, try localStorage
    if (!item) {
      try {
        const stored = localStorage.getItem(key)
        if (stored) {
          item = JSON.parse(stored)
          // Store back in memory cache
          this.memoryCache[key] = item
        }
      } catch (error) {
        console.warn('Failed to retrieve search cache from localStorage:', error)
      }
    }

    if (!item) return null

    // Check if expired
    if (this.isExpired(item)) {
      this.delete(query)
      return null
    }

    return item.data
  }

  delete(query: string): void {
    const key = this.getStorageKey(query)
    delete this.memoryCache[key]
    
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.warn('Failed to delete search cache from localStorage:', error)
    }
  }

  clear(): void {
    this.memoryCache = {}
    
    try {
      // Clear all search cache items from localStorage
      Object.keys(localStorage)
        .filter(key => key.startsWith(this.CACHE_PREFIX))
        .forEach(key => localStorage.removeItem(key))
    } catch (error) {
      console.warn('Failed to clear search cache from localStorage:', error)
    }
  }

  // Clean expired items periodically
  startCleanup(): void {
    setInterval(() => {
      this.cleanExpiredItems()
    }, 60000) // Clean every minute
  }
}

export const searchCache = new SearchCacheManager()

// Start cleanup when module loads
if (typeof window !== 'undefined') {
  searchCache.startCleanup()
}
