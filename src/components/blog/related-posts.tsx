'use client'

import { motion } from 'framer-motion'
import { PostCard } from './post-card'
import { ANIMATION_VARIANTS } from '@/constants'
import { Post } from '@/types'

interface RelatedPostsProps {
  posts: Post[]
  currentPost: Post
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <motion.section
      className="py-12 space-y-6"
      variants={ANIMATION_VARIANTS.stagger}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        className="text-2xl font-bold text-center"
        variants={ANIMATION_VARIANTS.slideUp}
      >
        Related Articles
      </motion.h2>
      
      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        variants={ANIMATION_VARIANTS.stagger}
      >
        {posts.map((post, index) => (
          <motion.div
            key={post.documentId}
            variants={ANIMATION_VARIANTS.slideUp}
            transition={{ delay: index * 0.1 }}
          >
            <PostCard post={post} />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}