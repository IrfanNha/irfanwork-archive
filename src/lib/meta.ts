import type { Metadata } from "next";
import { SITE_CONFIG } from "@/constants/site";
import type { ProjectMeta } from "@/types/project";

const baseUrl = SITE_CONFIG.url?.replace(/\/$/, "") ?? "https://irfanwork.cloud";

export const absoluteUrl = (path = "/") =>
  `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;

export const buildProjectStructuredData = (project: ProjectMeta) => {
  const canonical = absoluteUrl(`/p/${project.slug}`);
  const banner = project.banner.startsWith("http")
    ? project.banner
    : absoluteUrl(project.banner);

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.excerpt,
    url: canonical,
    image: banner,
    datePublished: project.date,
    dateModified: project.updated ?? project.date,
    keywords: project.keywords ?? project.tech,
    author: {
      "@type": "Person",
      name: SITE_CONFIG.author,
    },
  };
};

export const buildProjectMetadata = (project: ProjectMeta): Metadata => {
  const canonical = absoluteUrl(`/p/${project.slug}`);
  const banner = project.banner.startsWith("http")
    ? project.banner
    : absoluteUrl(project.banner);

  return {
    title: `${project.title} – Project by ${SITE_CONFIG.author}`,
    description: project.excerpt,
    keywords: project.keywords ?? project.tech,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.excerpt,
      url: canonical,
      images: [
        {
          url: banner,
          width: 1200,
          height: 630,
        },
      ],
      tags: project.tags ?? project.tech,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.excerpt,
      images: [banner],
    },
  };
};

