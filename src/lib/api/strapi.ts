// src/lib/api/strapi.ts
import { StrapiResponse, Post, Category, Tag, BlogFilters } from '@/types'

class StrapiAPI {
  private baseURL: string

  constructor() {
  const configuredBaseUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    "https://cheerful-miracle-46ca92f071.strapiapp.com";

  // Normalize base URL by trimming trailing slashes to avoid `//api` which Strapi may reject
  this.baseURL = configuredBaseUrl.replace(/\/+$/, "");

  if (!this.baseURL) {
    throw new Error("❌ NEXT_PUBLIC_STRAPI_URL is not set in .env.local and no fallback provided");
  }

  console.log("Strapi Base URL:", this.baseURL); // Debug log
}


  private async request<T>(endpoint: string): Promise<T> {
    const safeEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
    const url = `${this.baseURL}/api${safeEndpoint}`
    console.log('Requesting URL:', url) // Debug log
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      })

      console.log('Response status:', response.status) // Debug log
      
      if (!response.ok) {
        let errorMessage = `API Error: ${response.status} ${response.statusText}`
        
        try {
          const errorData = await response.json()
          console.error('API Error Details:', errorData)
          errorMessage += ` - ${JSON.stringify(errorData)}`
        } catch (e) {
          console.error('Could not parse error response:', e)
        }
        
        throw new Error(errorMessage)
      }

      const data: unknown = await response.json()
      console.log('Response data:', data) // Debug log
      return data as T
    } catch (error) {
      console.error('Request failed:', error)
      throw error
    }
  }

  // Get all posts with optional filters
  async getPosts(filters: BlogFilters = {}): Promise<StrapiResponse<Post>> {
    const params = new URLSearchParams()
    
    if (filters.page && filters.page > 1) {
      params.append('pagination[page]', filters.page.toString())
    }
    if (filters.pageSize) {
      params.append('pagination[pageSize]', filters.pageSize.toString())
    }
    
    // Populate relations - FIXED syntax
    // Populate relations - FIXED syntax
    params.append('populate[coverImage]', 'true')
    params.append('populate[categories]', 'true')
    params.append('populate[tags]', 'true')

    
    if (filters.search) {
      params.append('filters[$or][0][title][$containsi]', filters.search)
      params.append('filters[$or][1][excerpt][$containsi]', filters.search)
    }
    
    if (filters.category) {
      params.append('filters[categories][slug][$eq]', filters.category)
    }
    
    if (filters.tag) {
      params.append('filters[tags][slug][$eq]', filters.tag)
    }
    
    let sortField = 'publishedAt:desc'
    if (filters.sort === 'oldest') {
      sortField = 'publishedAt:asc'
    } else if (filters.sort === 'popular') {
      sortField = 'publishedAt:desc' // change to views:desc if available
    }
    params.append('sort', sortField)
    
    const queryString = params.toString()
    const endpoint = `/posts${queryString ? `?${queryString}` : ''}`
    
    console.log('Posts endpoint:', endpoint) // Debug log
    
    return this.request<StrapiResponse<Post>>(endpoint)
  }

  // Get single post by slug
 async getPostBySlug(slug: string): Promise<Post | null> {
  const params = new URLSearchParams()
  params.append('filters[slug][$eq]', slug)
  
  // Use same populate format as getPosts for consistency
  params.append('populate[coverImage]', 'true')
  params.append('populate[categories]', 'true')
  params.append('populate[tags]', 'true')
  
  const endpoint = `/posts?${params.toString()}`
  console.log('Single post endpoint:', endpoint)

  try {
    const response = await this.request<StrapiResponse<Post>>(endpoint)
    return response.data.length > 0 ? response.data[0] : null
  } catch (error) {
    console.error('Error fetching post by slug:', error)
    return null
  }
}


  // Get all categories
  async getCategories(): Promise<StrapiResponse<Category>> {
    const params = new URLSearchParams()
    params.append('sort', 'name:asc')
    
    const endpoint = `/categories?${params.toString()}`
    console.log('Categories endpoint:', endpoint) // Debug log
    
    return this.request<StrapiResponse<Category>>(endpoint)
  }

  // Get all tags
  async getTags(): Promise<StrapiResponse<Tag>> {
    const params = new URLSearchParams()
    params.append('sort', 'name:asc')
    
    const endpoint = `/tags?${params.toString()}`
    console.log('Tags endpoint:', endpoint) // Debug log
    
    return this.request<StrapiResponse<Tag>>(endpoint)
  }

  // Get featured posts
  async getFeaturedPosts(limit: number = 3): Promise<StrapiResponse<Post>> {
    const params = new URLSearchParams()
    params.append('pagination[pageSize]', limit.toString())
    
    // Use same populate format as getPosts for consistency
    params.append('populate[coverImage]', 'true')
    params.append('populate[categories]', 'true')
    params.append('populate[tags]', 'true')
    params.append('sort', 'publishedAt:desc')
    
    const endpoint = `/posts?${params.toString()}`
    console.log('Featured posts endpoint:', endpoint) // Debug log
    
    return this.request<StrapiResponse<Post>>(endpoint)
  }

  // Get related posts by category
  async getRelatedPosts(categorySlug: string, currentPostId: number, limit: number = 3): Promise<StrapiResponse<Post>> {
    const params = new URLSearchParams()
    params.append('filters[categories][slug][$eq]', categorySlug)
    params.append('filters[id][$ne]', currentPostId.toString())
    params.append('pagination[pageSize]', limit.toString())
    
    // Use same populate format as getPosts for consistency
    params.append('populate[coverImage]', 'true')
    params.append('populate[categories]', 'true')
    params.append('populate[tags]', 'true')
    params.append('sort', 'publishedAt:desc')
    
    const endpoint = `/posts?${params.toString()}`
    console.log('Related posts endpoint:', endpoint)
    
    return this.request<StrapiResponse<Post>>(endpoint)
  }


  // Simple test method to check API connectivity
  async testConnection(): Promise<boolean> {
    try {
      console.log('Testing Strapi connection...')
      await this.request('/posts?pagination[pageSize]=1')
      console.log('Strapi connection successful!')
      return true
    } catch (error) {
      console.error('Strapi connection failed:', error)
      return false
    }
  }
}

export const strapiAPI = new StrapiAPI()