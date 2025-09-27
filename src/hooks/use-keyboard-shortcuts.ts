'use client'

import { useEffect } from 'react'
import { useSearch } from '@/contexts/search-context'

export function useKeyboardShortcuts() {
  const { openSearch, closeSearch, isSearchOpen } = useSearch()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+K or Cmd+K to open search
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault()
        if (isSearchOpen) {
          closeSearch()
        } else {
          openSearch()
        }
      }

      // Escape to close search
      if (event.key === 'Escape' && isSearchOpen) {
        closeSearch()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [openSearch, closeSearch, isSearchOpen])
}
