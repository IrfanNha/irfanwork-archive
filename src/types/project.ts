import type { ReactElement } from "react";

export type ProjectCategory = "web" | "app" | "tool" | "content" | "other";

export interface ProjectFrontmatter {
  id: string;
  slug?: string;
  title: string;
  excerpt: string;
  date: string;
  updated?: string;
  tech: string[];
  banner: string;
  repo?: string;
  demo?: string;
  category: ProjectCategory;
  keywords?: string[];
  tags?: string[];
  featured?: boolean;
}

export interface ProjectMeta extends ProjectFrontmatter {
  slug: string;
  readingTime: {
    minutes: number;
    text: string;
    words: number;
  };
}

export interface ProjectHeading {
  id: string;
  text: string;
  level: number;
}

export interface ProjectContent {
  meta: ProjectMeta;
  headings: ProjectHeading[];
  content: ReactElement;
}

