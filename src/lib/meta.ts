// lib/meta.ts
import type { Metadata } from 'next'
import type { ProjectMeta } from '@/types/project'

const SITE_NAME = 'Irfan Nuha'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://irfanwork.vercel.app'

export function buildProjectMetadata(project: ProjectMeta): Metadata {
  const title = `${project.title} | ${SITE_NAME}`
  const description = project.excerpt
  const url = `${SITE_URL}/p/${project.slug}`
  const imageUrl = project.banner.startsWith('http') 
    ? project.banner 
    : `${SITE_URL}${project.banner}`

  return {
    title,
    description,
    keywords: [
      ...(project.keywords || []),
      ...(project.tags || []),
      ...project.tech,
      project.category,
      'portfolio',
      'project',
    ],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    openGraph: {
      type: 'article',
      title: project.title,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      publishedTime: project.date,
      modifiedTime: project.updated || project.date,
      authors: [SITE_NAME],
      tags: [...(project.tags || []), ...project.tech],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description,
      images: [imageUrl],
      creator: '@irfannuha',
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export function buildProjectStructuredData(project: ProjectMeta) {
  const url = `${SITE_URL}/p/${project.slug}`
  const imageUrl = project.banner.startsWith('http') 
    ? project.banner 
    : `${SITE_URL}${project.banner}`

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: project.title,
    description: project.excerpt,
    url,
    image: imageUrl,
    datePublished: project.date,
    dateModified: project.updated || project.date,
    author: {
      '@type': 'Person',
      name: SITE_NAME,
      url: SITE_URL,
    },
    keywords: [...(project.keywords || []), ...project.tech].join(', '),
    programmingLanguage: project.tech,
    codeRepository: project.repo,
    ...(project.demo && { applicationCategory: 'WebApplication' }),
    ...(project.demo && { url: project.demo }),
    inLanguage: 'en',
    about: {
      '@type': 'Thing',
      name: project.category,
    },
  }
}