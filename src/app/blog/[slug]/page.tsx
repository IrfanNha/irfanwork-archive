
import { notFound } from 'next/navigation'
import { PostContent } from '@/components/blog/post-content'
import { PostHeader } from '@/components/blog/post-header'
import { RelatedPosts } from '@/components/blog/related-posts'
import { PostNavigation } from '@/components/blog/post-navigation'
import { strapiAPI } from '@/lib/api/strapi'
import { Post } from '@/types'
import { Container } from '@/components/ui/container'

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

// Enable ISR for individual blog posts
export const revalidate = 60 // Revalidate every 60 seconds

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await strapiAPI.getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // Get related posts if post has categories
  let relatedPosts: Post[] = []
  if (post.categories && post.categories.length > 0) {
    console.log('Fetching related posts for category:', post.categories[0].slug)
    console.log('Current post ID:', post.id)
    
    try {
      const relatedResponse = await strapiAPI.getRelatedPosts(
        post.categories[0].slug,
        post.id,
        3
      )
      
      console.log('Related posts response:', relatedResponse)
      relatedPosts = relatedResponse.data || []
      
      console.log('Related posts data:', relatedPosts)
      
      // If no related posts found, try to get recent posts instead
      if (relatedPosts.length === 0) {
        console.log('No related posts found, fetching recent posts...')
        const recentResponse = await strapiAPI.getPosts({ pageSize: 3 })
        relatedPosts = recentResponse.data.filter(p => p.id !== post.id).slice(0, 3)
        console.log('Recent posts as fallback:', relatedPosts)
      }
    } catch (error) {
      console.error('Error fetching related posts:', error)
      // Fallback to recent posts
      try {
        const recentResponse = await strapiAPI.getPosts({ pageSize: 3 })
        relatedPosts = recentResponse.data.filter(p => p.id !== post.id).slice(0, 3)
        console.log('Fallback recent posts:', relatedPosts)
      } catch (fallbackError) {
        console.error('Error fetching fallback posts:', fallbackError)
        relatedPosts = []
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-yellow-500/5">
      <Container>
        <div className="container py-8">
          <div className="max-w-4xl mx-auto">
            {/* Post Header */}
            <PostHeader post={post} />

            {/* Post Content */}
            <div className='mt-4'>

            <PostContent post={post} />
            </div>

            {/* Post Navigation */}
            <PostNavigation />

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <RelatedPosts posts={relatedPosts} currentPost={post} />
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}
