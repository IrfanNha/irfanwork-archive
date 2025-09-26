'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { formatDate, readingTime } from '@/lib/utils'
import { ANIMATION_VARIANTS } from '@/constants'
import { Post } from '@/types'

interface PostHeaderProps {
  post: Post
}

export function PostHeader({ post }: PostHeaderProps) {
  const coverImage = post.coverImage?.[0]
  const category = post.categories?.[0]
  
  // Calculate reading time from content
  const contentText = post.content
    ?.map(block => block.children?.map(child => child.text).join(' '))
    .join(' ') || ''
  
  const estimatedReadingTime = readingTime(contentText + (post.excerpt || ''))

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
      } catch (error) {
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href)
        console.error('Error sharing:', error)
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <motion.article
      className="space-y-8"
      variants={ANIMATION_VARIANTS.stagger}
      initial="hidden"
      animate="visible"
    >
      {/* Back Button */}
      <motion.div variants={ANIMATION_VARIANTS.slideUp}>
        <Button variant="ghost" asChild className="group -ml-4">
          <Link href="/blog">
            <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Blog
          </Link>
        </Button>
      </motion.div>

      {/* Cover Image */}
      {coverImage && (
        <motion.div
          className="relative h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden shadow-sm"
          variants={ANIMATION_VARIANTS.scale}
          transition={{ delay: 0.2 }}
        >
          <Image
            src={coverImage.url}
            alt={coverImage.alternativeText || post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          
          {/* Category Badge */}
          {category && (
            <motion.div
              className="absolute top-6 left-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Badge className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium shadow-lg text-sm px-3 py-1">
                {category.name}
              </Badge>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Post Header Info */}
      <motion.div
        className="space-y-6"
        variants={ANIMATION_VARIANTS.slideUp}
        transition={{ delay: 0.3 }}
      >
        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ">
          {post.title}
        </h1>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {post.excerpt}
          </p>
        )}

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{estimatedReadingTime} min read</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="hover:bg-yellow-500/10"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge
                key={tag.documentId}
                variant="outline"
                className="border-yellow-500/30 text-muted-foreground hover:bg-yellow-500/10"
              >
                #{tag.name}
              </Badge>
            ))}
          </div>
        )}

        <Separator className="bg-yellow-500/20" />
      </motion.div>
    </motion.article>
  )
}