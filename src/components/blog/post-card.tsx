"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/types";
import { formatDate, readingTime } from "@/lib/utils";

interface PostCardProps {
  post: Post;
  index?: number;
}

export function PostCard({ post, index = 0 }: PostCardProps) {
  const coverImage = Array.isArray(post.coverImage)
    ? post.coverImage[0]
    : (post.coverImage as any)?.data?.[0] || post.coverImage;

  const category = Array.isArray(post.categories)
    ? post.categories[0]
    : (post.categories as any)?.data?.[0] || post.categories?.[0];

  const contentText =
    post.content
      ?.map((block) => block.children?.map((child) => child.text).join(" "))
      .join(" ") || "";

  const estimatedReadingTime = readingTime(contentText + (post.excerpt || ""));

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ x: 4 }}
      className="group"
    >
      <Link
        href={`/blog/${post.slug}`}
        className="block border-b border-border py-8 transition-colors hover:bg-muted/30"
      >
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Left: Content */}
          <div className="flex-1 space-y-4">
            {/* Meta Information */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground font-light tracking-wide uppercase">
              {category && (
                <Badge
                  variant="outline"
                  className="border-border text-muted-foreground font-normal text-xs px-2 py-0.5"
                >
                  {category.name}
                </Badge>
              )}
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3 w-3" />
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-3 w-3" />
                <span>{estimatedReadingTime} min</span>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold leading-tight group-hover:text-foreground/80 transition-colors">
              {post.title}
            </h2>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-muted-foreground leading-relaxed line-clamp-2 md:line-clamp-3 text-base">
                {post.excerpt}
              </p>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {post.tags.slice(0, 4).map((tag, tagIndex) => (
                  <span
                    key={tag?.documentId || tag?.id || tagIndex}
                    className="text-xs text-muted-foreground/70 font-light"
                  >
                    #{tag?.name}
                  </span>
                ))}
                {post.tags.length > 4 && (
                  <span className="text-xs text-muted-foreground/50 font-light">
                    +{post.tags.length - 4}
                  </span>
                )}
              </div>
            )}

            {/* Read More Indicator */}
            <div className="flex items-center gap-2 text-sm text-foreground/60 group-hover:text-foreground/80 transition-colors pt-2">
              <span className="font-medium">Read article</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Right: Thumbnail Image */}
          {coverImage && (
            <div className="md:w-48 lg:w-64 flex-shrink-0">
              <div className="relative aspect-video md:aspect-square overflow-hidden rounded border border-border/50 group-hover:border-border transition-colors">
                <Image
                  src={coverImage.url}
                  alt={coverImage.alternativeText || post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 256px"
                />
              </div>
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
