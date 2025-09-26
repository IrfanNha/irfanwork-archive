// Existing types...
export type UserRole = 'ADMIN' | 'EDITOR' | 'USER'
export type ArticleStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'

// Strapi-specific types
export interface StrapiResponse<T> {
  data: T[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface StrapiSingleResponse<T> {
  data: T
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  meta: {}
}

export interface StrapiImage {
  id: number
  documentId: string
  name: string
  alternativeText?: string
  caption?: string
  width: number
  height: number
  formats: {
    small?: StrapiImageFormat
    medium?: StrapiImageFormat
    large?: StrapiImageFormat
    thumbnail?: StrapiImageFormat
  }
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl?: string
  provider: string
  provider_metadata?: any
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface StrapiImageFormat {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path?: string
  size: number
  width: number
  height: number
  sizeInBytes: number
}

// Content types for rich text
export interface StrapiRichTextNode {
  type: string
  children: Array<{
    text: string
    type: string
    bold?: boolean
    italic?: boolean
    underline?: boolean
  }>
}

// Updated interfaces for Strapi
export interface Category {
  id: number
  documentId: string
  name: string
  slug: string
  descriptions?: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface Tag {
  id: number
  documentId: string
  name: string
  slug: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface Post {
  id: number
  documentId: string
  title: string
  slug: string
  content: StrapiRichTextNode[]
  excerpt?: string
  coverImage?: StrapiImage[]
  createdAt: string
  updatedAt: string
  publishedAt: string
  categories?: Category[]
  tags?: Tag[]
}

// API query parameters
export interface BlogFilters {
  search?: string
  category?: string
  tag?: string
  sort?: 'newest' | 'oldest' | 'popular'
  page?: number
  pageSize?: number
}

// UI State
export interface BlogPageState {
  posts: Post[]
  categories: Category[]
  tags: Tag[]
  loading: boolean
  error: string | null
  filters: BlogFilters
  pagination: {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }
}