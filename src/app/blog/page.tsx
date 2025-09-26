import { Metadata } from 'next'
import { Suspense } from 'react'
import { BlogList } from '@/components/blog/blog-list'
import { BlogSidebar } from '@/components/blog/blog-sidebar'
import { BlogHeader } from '@/components/blog/blog-header'
import { BlogLoading } from '@/components/blog/blog-loading'
import { strapiAPI } from '@/lib/api/strapi'
import { Container } from '@/components/ui/container'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read our latest articles about technology, design, and development.',
  openGraph: {
    title: 'Blog | Blog Platform',
    description: 'Read our latest articles about technology, design, and development.',
  },
}

interface BlogPageProps {
  searchParams?: {
    search?: string
    category?: string
    tag?: string
    sort?: 'newest' | 'oldest' | 'popular'
    page?: string
  }
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const sp = searchParams ?? {}

  const filters = {
    search: sp.search,
    category: sp.category,
    tag: sp.tag,
    sort: sp.sort || 'newest',
    page: parseInt(sp.page ?? '1', 10),
    pageSize: 12,
  }

  // Fetch data in parallel
  const [postsResponse, categoriesResponse, tagsResponse] = await Promise.all([
    strapiAPI.getPosts(filters),
    strapiAPI.getCategories(),
    strapiAPI.getTags(),
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-yellow-500/5">
      <Container>
        <div className="container py-8">
          <BlogHeader 
            totalPosts={postsResponse.meta.pagination.total}
            currentFilters={filters}
          />
          
          <div className="grid gap-8 lg:grid-cols-4 mt-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Suspense fallback={<BlogLoading />}>
                <BlogList 
                  initialPosts={postsResponse.data}
                  pagination={postsResponse.meta.pagination}
                  filters={filters}
                />
              </Suspense>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <BlogSidebar 
                categories={categoriesResponse.data}
                tags={tagsResponse.data}
                currentFilters={filters}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
