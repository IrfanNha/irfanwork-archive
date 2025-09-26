import { Metadata } from 'next'
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


export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await strapiAPI.getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // Get related posts if post has categories
  let relatedPosts: Post[] = []
  if (post.categories && post.categories.length > 0) {
    const relatedResponse = await strapiAPI.getRelatedPosts(
      post.categories[0].slug,
      post.id,
      3
    )
    relatedPosts = relatedResponse.data
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
