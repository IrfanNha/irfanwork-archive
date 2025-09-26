'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ANIMATION_VARIANTS } from '@/constants'

export function PostNavigation() {
  return (
    <motion.div
      className="py-8 space-y-6"
      variants={ANIMATION_VARIANTS.fadeIn}
      initial="hidden"
      animate="visible"
    >
      <Separator className="bg-yellow-500/20" />
      
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <Button variant="outline" asChild className="hover:bg-yellow-500/10">
          <Link href="/blog" className="group">
            <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Blog
          </Link>
        </Button>

        <div className="flex gap-2">
          {/* Previous/Next post navigation can be added here when available */}
          <Button variant="ghost" className="text-muted-foreground" disabled>
            Previous Post
          </Button>
          <Button variant="ghost" className="text-muted-foreground" disabled>
            Next Post
          </Button>
        </div>
      </div>
    </motion.div>
  )
}