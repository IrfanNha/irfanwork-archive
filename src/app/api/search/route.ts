import { NextRequest, NextResponse } from 'next/server'
import { strapiAPI } from '@/lib/api/strapi'
import { PROJECTS } from '@/constants/projects'

interface SearchResult {
  id: string
  title: string
  description: string
  url: string
  type: 'blog' | 'project' | 'page'
  category?: string
  publishedAt?: string
}

// Cache for API responses (in-memory cache)
const apiCache = new Map<string, { data: SearchResult[], timestamp: number }>()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

function getCachedResults(query: string): SearchResult[] | null {
  const cached = apiCache.get(query)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data
  }
  return null
}

function setCachedResults(query: string, data: SearchResult[]): void {
  apiCache.set(query, { data, timestamp: Date.now() })
  
  // Clean old cache entries if cache gets too large
  if (apiCache.size > 100) {
    const entries = Array.from(apiCache.entries())
    const sortedEntries = entries.sort((a, b) => a[1].timestamp - b[1].timestamp)
    const toDelete = sortedEntries.slice(0, 50) // Remove oldest 50 entries
    toDelete.forEach(([key]) => apiCache.delete(key))
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ results: [] })
    }

    const searchQuery = query.trim().toLowerCase()

    // Check cache first
    const cachedResults = getCachedResults(searchQuery)
    if (cachedResults) {
      console.log('API cache hit for:', searchQuery)
      return NextResponse.json({ 
        results: cachedResults,
        query: searchQuery,
        total: cachedResults.length,
        cached: true
      })
    }

    console.log('API cache miss for:', searchQuery)
    const results: SearchResult[] = []

    // Search blog posts with caching
    try {
      const blogResults = await strapiAPI.getPosts({
        search: searchQuery,
        pageSize: 5
      })

      blogResults.data.forEach((post) => {
        results.push({
          id: `blog-${post.id}`,
          title: post.title,
          description: post.excerpt || 'No description available',
          url: `/blog/${post.slug}`,
          type: 'blog',
          category: post.categories?.[0]?.name,
          publishedAt: post.publishedAt
        })
      })
    } catch (error) {
      console.error('Blog search error:', error)
    }

    // Search projects (static data, no API call needed)
    const projectResults = PROJECTS.filter(project =>
      project.name.toLowerCase().includes(searchQuery) ||
      project.description.toLowerCase().includes(searchQuery) ||
      project.tech.some(tech => tech.toLowerCase().includes(searchQuery))
    )

    projectResults.forEach((project) => {
      results.push({
        id: `project-${project.id}`,
        title: project.name,
        description: project.description,
        url: project.liveUrl || project.url,
        type: 'project',
        category: project.category
      })
    })

    // Search pages (static data)
    const pages = [
      {
        id: 'page-home',
        title: 'Home',
        description: 'Welcome to Irfan Nuha\'s portfolio and blog',
        url: '/',
        type: 'page' as const
      },
      {
        id: 'page-about',
        title: 'About',
        description: 'Learn more about Irfan Nuha and his work',
        url: '/about',
        type: 'page' as const
      },
      {
        id: 'page-projects',
        title: 'Projects',
        description: 'Explore my projects and creative works',
        url: '/projects',
        type: 'page' as const
      },
      {
        id: 'page-blog',
        title: 'Blog',
        description: 'Read my latest articles and thoughts',
        url: '/blog',
        type: 'page' as const
      }
    ]

    const pageResults = pages.filter(page =>
      page.title.toLowerCase().includes(searchQuery) ||
      page.description.toLowerCase().includes(searchQuery)
    )

    results.push(...pageResults)

    // Sort results by relevance (exact matches first, then partial matches)
    const sortedResults = results.sort((a, b) => {
      const aTitleMatch = a.title.toLowerCase().includes(searchQuery)
      const bTitleMatch = b.title.toLowerCase().includes(searchQuery)
      
      if (aTitleMatch && !bTitleMatch) return -1
      if (!aTitleMatch && bTitleMatch) return 1
      
      return 0
    })

    const finalResults = sortedResults.slice(0, 10) // Limit to 10 results

    // Cache the results
    setCachedResults(searchQuery, finalResults)

    return NextResponse.json({ 
      results: finalResults,
      query: searchQuery,
      total: finalResults.length,
      cached: false
    })

  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: 'Search failed', results: [] },
      { status: 500 }
    )
  }
}
