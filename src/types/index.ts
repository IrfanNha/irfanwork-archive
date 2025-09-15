export type UserRole = 'ADMIN' | 'EDITOR' | 'USER'

export type ArticleStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'

export interface User {
  id: string
  email: string
  name?: string
  role: UserRole
  created_at: string
  updated_at: string
}

export interface Article {
  id: string
  title: string
  slug: string
  content: any // TipTap JSON
  html: string
  excerpt?: string
  cover_image?: string
  tags: string[]
  status: ArticleStatus
  author_id: string
  author?: User
  published_at?: string
  created_at: string
  updated_at: string
}

export interface CreateArticleData {
  title: string
  content: any
  html: string
  excerpt?: string
  cover_image?: string
  tags: string[]
  status: ArticleStatus
}

export interface UpdateArticleData extends Partial<CreateArticleData> {
  id: string
}