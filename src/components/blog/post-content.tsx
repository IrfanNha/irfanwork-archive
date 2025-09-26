// src/components/blog/post-content.tsx
'use client'

import { motion } from 'framer-motion'
import { Post, StrapiRichTextNode } from '@/types'
import { ANIMATION_VARIANTS } from '@/constants'
import Image from 'next/image'


interface PostContentProps {
  post: Post
}

export function PostContent({ post }: PostContentProps) {
  const renderContent = (content: StrapiRichTextNode[]) => {
    return content.map((block, index) => {
      switch (block.type) {
        case 'paragraph':
          return (
            <p key={index} className="mb-4 leading-relaxed text-foreground">
              {block.children?.map((child, childIndex) => {
                
                
                if (child.bold && child.italic) {
                  return <strong key={childIndex}><em>{child.text}</em></strong>
                }
                if (child.bold) {
                  return <strong key={childIndex} className="font-semibold">{child.text}</strong>
                }
                if (child.italic) {
                  return <em key={childIndex} className="italic">{child.text}</em>
                }
                if (child.underline) {
                  return <u key={childIndex} className="underline">{child.text}</u>
                }
                return <span key={childIndex}>{child.text}</span>
              })}
            </p>
          )
        
        case 'heading':
          const level = (block as any).level || 2
          
          // Type-safe heading rendering
          const renderHeading = () => {
            const headingContent = block.children?.map((child, childIndex) => (
              <span key={childIndex}>{child.text}</span>
            ))
            
            const baseClasses = "font-bold mb-4 mt-8 text-foreground"
            
            switch (level) {
              case 1:
                return <h1 className={`${baseClasses} text-3xl`}>{headingContent}</h1>
              case 2:
                return <h2 className={`${baseClasses} text-2xl`}>{headingContent}</h2>
              case 3:
                return <h3 className={`${baseClasses} text-xl`}>{headingContent}</h3>
              case 4:
                return <h4 className={`${baseClasses} text-lg`}>{headingContent}</h4>
              case 5:
                return <h5 className={`${baseClasses} text-base font-bold`}>{headingContent}</h5>
              case 6:
                return <h6 className={`${baseClasses} text-sm font-bold`}>{headingContent}</h6>
              default:
                return <h2 className={`${baseClasses} text-2xl`}>{headingContent}</h2>
            }
          }
          
          return <div key={index}>{renderHeading()}</div>

        case 'list':
          const isOrdered = (block as any).format === 'ordered'
          const listItems = block.children?.map((listItem, listIndex) => (
            <li key={listIndex} className="mb-2 text-foreground">
              {(listItem as any).children?.map((child: any, childIndex: number) => {
                if (child.bold) {
                  return <strong key={childIndex}>{child.text}</strong>
                }
                if (child.italic) {
                  return <em key={childIndex}>{child.text}</em>
                }
                return <span key={childIndex}>{child.text}</span>
              })}
            </li>
          ))

          return isOrdered ? (
            <ol key={index} className="mb-6 ml-6 list-decimal space-y-1">
              {listItems}
            </ol>
          ) : (
            <ul key={index} className="mb-6 ml-6 list-disc space-y-1">
              {listItems}
            </ul>
          )

        case 'code':
          return (
            <pre key={index} className="bg-muted border border-border p-4 rounded-lg mb-6 overflow-x-auto">
              <code className="text-sm font-mono text-foreground">
                {block.children?.map((child, childIndex) => (
                  <span key={childIndex}>{child.text}</span>
                ))}
              </code>
            </pre>
          )

        case 'quote':
        case 'blockquote':
          return (
            <blockquote key={index} className="border-l-4 border-yellow-500 pl-6 py-2 mb-6 italic text-muted-foreground bg-yellow-500/5 rounded-r-lg">
              <div className="text-foreground/80">
                {block.children?.map((child, childIndex) => (
                  <span key={childIndex}>{child.text}</span>
                ))}
              </div>
            </blockquote>
          )

        case 'link':
          return (
            <a 
              key={index} 
              href={(block as any).url}
              className="text-yellow-600 hover:text-yellow-700 underline underline-offset-2 hover:underline-offset-4 transition-all"
              target={(block as any).target || '_self'}
              rel={(block as any).target === '_blank' ? 'noopener noreferrer' : undefined}
            >
              {block.children?.map((child, childIndex) => (
                <span key={childIndex}>{child.text}</span>
              ))}
            </a>
          )

        case 'image':
          const imageData = block as any
          return (
            <figure key={index} className="mb-6">
            <Image
                src={imageData.image?.url || imageData.url}
                alt={imageData.image?.alternativeText || imageData.alt || ''}
                width={800}
                height={500}
                className="w-full h-auto rounded-lg"
            />
            {imageData.image?.caption && (
                <figcaption className="text-sm text-muted-foreground text-center mt-2 italic">
                {imageData.image.caption}
                </figcaption>
            )}
            </figure>

          )

        default:
          if (block.children && Array.isArray(block.children)) {
            return (
              <div key={index} className="mb-4 text-foreground">
                {block.children.map((child, childIndex) => {
                  if (typeof child === 'object' && child.text) {
                    if (child.bold) {
                      return <strong key={childIndex}>{child.text}</strong>
                    }
                    if (child.italic) {
                      return <em key={childIndex}>{child.text}</em>
                    }
                    return <span key={childIndex}>{child.text}</span>
                  }
                  return <span key={childIndex}>{String(child)}</span>
                })}
              </div>
            )
          }
          
          return (
            <div key={index} className="my-4 p-3 bg-muted rounded-lg border-l-4 border-yellow-500">
              <p className="text-sm text-muted-foreground">
                Unsupported content type: {block.type}
              </p>
              <pre className="text-xs mt-2 text-muted-foreground overflow-x-auto">
                {JSON.stringify(block, null, 2)}
              </pre>
            </div>
          )
      }
    })
  }

  return (
    <motion.div
      className="prose prose-lg max-w-none 
        prose-headings:text-foreground 
        prose-p:text-foreground 
        prose-strong:text-foreground 
        prose-a:text-yellow-600 
        prose-a:no-underline 
        hover:prose-a:underline 
        prose-blockquote:text-muted-foreground 
        prose-blockquote:border-yellow-500
        prose-code:text-foreground 
        prose-pre:bg-muted
        prose-li:text-foreground
        prose-ul:text-foreground
        prose-ol:text-foreground"
      variants={ANIMATION_VARIANTS.fadeIn}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.4 }}
    >
      <div className="space-y-4">
        {renderContent(post.content)}
      </div>
    </motion.div>
  )
}