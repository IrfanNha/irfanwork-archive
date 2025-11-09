import { notFound } from "next/navigation";
import { PostContent } from "@/components/blog/post-content";
import { PostHeader } from "@/components/blog/post-header";
import { PostNavigation } from "@/components/blog/post-navigation";
import { strapiAPI } from "@/lib/api/strapi";
import { Post } from "@/types";
import { Container } from "@/components/ui/container";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate, readingTime } from "@/lib/utils";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Enable ISR for individual blog posts
export const revalidate = 60; // Revalidate every 60 seconds

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await strapiAPI.getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Get related posts if post has categories
  let relatedPosts: Post[] = [];
  if (post.categories && post.categories.length > 0) {
    try {
      const relatedResponse = await strapiAPI.getRelatedPosts(
        post.categories[0].slug,
        post.id,
        3
      );

      relatedPosts = relatedResponse.data || [];

      // If no related posts found, try to get recent posts instead
      if (relatedPosts.length === 0) {
        const recentResponse = await strapiAPI.getPosts({ pageSize: 4 });
        relatedPosts = recentResponse.data
          .filter((p) => p.id !== post.id)
          .slice(0, 3);
      }
    } catch (error) {
      console.error("Error fetching related posts:", error);
      // Fallback to recent posts
      try {
        const recentResponse = await strapiAPI.getPosts({ pageSize: 4 });
        relatedPosts = recentResponse.data
          .filter((p) => p.id !== post.id)
          .slice(0, 3);
      } catch (fallbackError) {
        console.error("Error fetching fallback posts:", fallbackError);
        relatedPosts = [];
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
            <div className="mt-4">
              <PostContent post={post} />
            </div>

            {/* Post Navigation */}
            <PostNavigation />

            {/* Related Posts Section */}
            {relatedPosts.length > 0 && (
              <section className="mt-16 pt-12 border-t border-border">
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    Related Articles
                  </h2>
                  <p className="text-muted-foreground">
                    Continue reading with these related posts
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {relatedPosts.map((relatedPost) => {
                    const coverImage = Array.isArray(relatedPost.coverImage)
                      ? relatedPost.coverImage[0]
                      : (relatedPost.coverImage as any)?.data?.[0] ||
                        relatedPost.coverImage;

                    const category = Array.isArray(relatedPost.categories)
                      ? relatedPost.categories[0]
                      : (relatedPost.categories as any)?.data?.[0] ||
                        relatedPost.categories?.[0];

                    const contentText =
                      relatedPost.content
                        ?.map((block) =>
                          block.children?.map((child) => child.text).join(" ")
                        )
                        .join(" ") || "";

                    const estimatedReadingTime = readingTime(
                      contentText + (relatedPost.excerpt || "")
                    );

                    return (
                      <article
                        key={relatedPost.documentId || relatedPost.id}
                        className="group h-full"
                      >
                        <Link
                          href={`/blog/${relatedPost.slug}`}
                          className="block h-full border border-border rounded-lg overflow-hidden transition-all hover:shadow-lg hover:border-border/80 bg-card"
                        >
                          {/* Cover Image */}
                          {coverImage && (
                            <div className="relative aspect-video overflow-hidden">
                              <Image
                                src={coverImage.url}
                                alt={
                                  coverImage.alternativeText ||
                                  relatedPost.title
                                }
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 400px"
                              />
                              {category && (
                                <div className="absolute top-3 left-3">
                                  <Badge
                                    variant="secondary"
                                    className="bg-background/90 backdrop-blur-sm text-foreground border-0"
                                  >
                                    {category.name}
                                  </Badge>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Content */}
                          <div className="p-5 space-y-3">
                            {/* Meta Information */}
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1.5">
                                <Calendar className="h-3 w-3" />
                                <time dateTime={relatedPost.publishedAt}>
                                  {formatDate(relatedPost.publishedAt)}
                                </time>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Clock className="h-3 w-3" />
                                <span>{estimatedReadingTime} min</span>
                              </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                              {relatedPost.title}
                            </h3>

                            {/* Excerpt */}
                            {relatedPost.excerpt && (
                              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                                {relatedPost.excerpt}
                              </p>
                            )}

                            {/* Tags */}
                            {relatedPost.tags &&
                              relatedPost.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 pt-1">
                                  {relatedPost.tags
                                    .slice(0, 3)
                                    .map((tag, tagIndex) => (
                                      <span
                                        key={
                                          tag?.documentId || tag?.id || tagIndex
                                        }
                                        className="text-xs text-muted-foreground/70 font-light"
                                      >
                                        #{tag?.name}
                                      </span>
                                    ))}
                                  {relatedPost.tags.length > 3 && (
                                    <span className="text-xs text-muted-foreground/50 font-light">
                                      +{relatedPost.tags.length - 3}
                                    </span>
                                  )}
                                </div>
                              )}
                          </div>
                        </Link>
                      </article>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
