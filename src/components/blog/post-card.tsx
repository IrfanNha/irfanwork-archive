'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Post } from '@/types'
import { formatDate, readingTime } from '@/lib/utils'
import { MOTION } from '@/constants'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const coverImage = Array.isArray(post.coverImage) 
    ? post.coverImage[0] 
    : (post.coverImage as any)?.data?.[0] || post.coverImage
  
  const category = Array.isArray(post.categories) 
    ? post.categories[0] 
    : (post.categories as any)?.data?.[0] || post.categories?.[0]
  

  const contentText = post.content
    ?.map(block => block.children?.map(child => child.text).join(' '))
    .join(' ') || ''
  
  const estimatedReadingTime = readingTime(contentText + (post.excerpt || ''))

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: MOTION.FAST }}
      className="h-full"
    >
      <Card className="h-full border-yellow-500/20 hover:border-yellow-500/40 transition-colors duration-300 overflow-hidden group bg-card hover:shadow-xl hover:shadow-yellow-500/10">
        {/* Cover Image */}
        {coverImage && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={coverImage.url}
              alt={coverImage.alternativeText || post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Category Badge */}
            {category && (
              <div className="absolute top-4 left-4">
                <Badge 
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium shadow-lg"
                >
                  {category.name}
                </Badge>
              </div>
            )}
          </div>
        )}

        <CardHeader className="pb-3">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(post.publishedAt)}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {estimatedReadingTime} min read
            </div>
          </div>
          
          <h3 className="font-bold text-lg leading-tight group-hover:text-yellow-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </CardHeader>

        <CardContent className="pt-0">
          {post.excerpt && (
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
              {post.excerpt}
            </p>
          )}
          
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {post.tags.slice(0, 3).map((tag, index) => (
                <Badge
                  key={tag?.documentId || tag?.id || index}
                  variant="outline"
                  className="text-xs border-yellow-500/30 text-muted-foreground hover:bg-yellow-500/10"
                >
                  {tag?.name }
                </Badge>
              ))}
              {post.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{post.tags.length - 3} more
                </Badge>
              )}
            </div>
          )}

          <Button
            asChild
            variant="ghost"
            size="sm"
            className="w-full group/btn hover:bg-yellow-500/10 hover:text-yellow-600"
          >
            <Link href={`/blog/${post.slug}`}>
              Read Article
              <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}