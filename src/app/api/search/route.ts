import { NextRequest, NextResponse } from 'next/server'
import { strapiAPI } from '@/lib/api/strapi'
import { PROJECTS } from '@/constants/projects'
import { getAllProjectsMeta } from '@/lib/mdx'

interface SearchResult {
  id: string
  title: string
  description: string
  url: string
  type: 'blog' | 'project' | 'page' | 'mdx-project'
  category?: string
  publishedAt?: string
}

// Cache for API responses (in-memory cache)
const apiCache = new Map<string, { data: SearchResult[], timestamp: number }>()
const CACHE_TTL = 5 * 60 * 1000

function getCachedResults(query: string): SearchResult[] | null {
  const cached = apiCache.get(query)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data
  }
  return null
}

function setCachedResults(query: string, data: SearchResult[]): void {
  apiCache.set(query, { data, timestamp: Date.now() })
  
  if (apiCache.size > 100) {
    const entries = Array.from(apiCache.entries())
    const sortedEntries = entries.sort((a, b) => a[1].timestamp - b[1].timestamp)
    const toDelete = sortedEntries.slice(0, 50)
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

    // Search MDX projects from /p/[slug]
    try {
      const mdxProjects = await getAllProjectsMeta()
      
      const mdxProjectResults = mdxProjects.filter(project => {
        const titleMatch = project.title.toLowerCase().includes(searchQuery)
        const excerptMatch = project.excerpt.toLowerCase().includes(searchQuery)
        const techMatch = project.tech.some(tech => tech.toLowerCase().includes(searchQuery))
        const tagsMatch = project.tags?.some(tag => tag.toLowerCase().includes(searchQuery)) || false
        const keywordsMatch = project.keywords?.some(kw => kw.toLowerCase().includes(searchQuery)) || false
        
        return titleMatch || excerptMatch || techMatch || tagsMatch || keywordsMatch
      })

      mdxProjectResults.forEach((project) => {
        results.push({
          id: `mdx-project-${project.id}`,
          title: project.title,
          description: project.excerpt,
          url: `/p/${project.slug}`,
          type: 'mdx-project',
          category: project.category,
          publishedAt: project.date
        })
      })
    } catch (error) {
      console.error('MDX projects search error:', error)
    }

    // Search projects (static data from constants)
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
      },
      {
        id: 'page-terms',
        title: 'Terms & Conditions',
        description: 'Understand the terms, conditions, and guidelines for using this website and its services.',
        url: '/terms',
        type: 'page' as const
      },
      {
        id: 'page-privacy',
        title: 'Privacy & Policy',
        description: 'Read how this website handles data collection, usage, cookies, and your privacy rights.',
        url: '/privacy',
        type: 'page' as const
      },
    ]

    const pageResults = pages.filter(page =>
      page.title.toLowerCase().includes(searchQuery) ||
      page.description.toLowerCase().includes(searchQuery)
    )

    results.push(...pageResults)

    const sortedResults = results.sort((a, b) => {
      const aTitleMatch = a.title.toLowerCase().includes(searchQuery)
      const bTitleMatch = b.title.toLowerCase().includes(searchQuery)
      
      if (aTitleMatch && !bTitleMatch) return -1
      if (!aTitleMatch && bTitleMatch) return 1
      
      const typeOrder = { 'mdx-project': 0, 'blog': 1, 'project': 2, 'page': 3 }
      const aOrder = typeOrder[a.type] ?? 4
      const bOrder = typeOrder[b.type] ?? 4
      
      if (aOrder !== bOrder) return aOrder - bOrder
      
      if (a.publishedAt && b.publishedAt) {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      }
      
      return 0
    })

    const finalResults = sortedResults.slice(0, 10) 

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