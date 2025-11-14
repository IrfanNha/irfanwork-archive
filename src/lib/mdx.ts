import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import { cache } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import { mdxComponents } from "@/components/mdx/mdx-content";
import type {
  ProjectContent,
  ProjectFrontmatter,
  ProjectHeading,
  ProjectMeta,
} from "@/types/project";
import { formatDate } from "@/lib/utils";

const PROJECTS_DIR = path.join(process.cwd(), "src", "contents", "projects");

interface ProjectSource {
  slug: string;
  frontmatter: ProjectFrontmatter;
  body: string;
}

const remarkPlugins = [remarkGfm];

const rehypePlugins = [
  rehypeSlug,
  [
    rehypeAutolinkHeadings,
    {
      properties: {
        className: ["anchor"],
        ariaHidden: "true",
      },
      behavior: "append",
    },
  ],
] as const;

async function loadProjectFile(slug: string): Promise<ProjectSource | null> {
  try {
    const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
    const raw = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(raw);

    const frontmatter = data as ProjectFrontmatter;
    if (!frontmatter.title || !frontmatter.excerpt || !frontmatter.date) {
      throw new Error(
        `Project "${slug}" is missing required fields (title, excerpt, date)`
      );
    }

    return {
      slug: frontmatter.slug ?? slug,
      frontmatter,
      body: content,
    };
  } catch (error) {
    console.error(`[mdx] Failed to load project "${slug}":`, error);
    return null;
  }
}

const getProjectSource = cache(loadProjectFile);

const buildProjectMeta = (source: ProjectSource): ProjectMeta => {
  const words = source.body.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));

  return {
    ...source.frontmatter,
    slug: source.slug,
    readingTime: {
      minutes,
      words,
      text: `${minutes} min read`,
    },
  };
};

const extractHeadings = (body: string): ProjectHeading[] => {
  const slugger = new GithubSlugger();
  const lines = body.split("\n");

  return lines
    .map((line) => {
      const match = /^(#{1,3})\s+(.*)/.exec(line.trim());
      if (!match) return null;

      const level = match[1].length;
      if (level === 1) return null;

      const text = match[2].trim();
      return {
        id: slugger.slug(text),
        text,
        level,
      };
    })
    .filter((heading): heading is ProjectHeading => Boolean(heading));
};

export const getProjectSlugs = cache(async () => {
  const files = await fs.readdir(PROJECTS_DIR);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
});

export const getAllProjectsMeta = cache(async (): Promise<ProjectMeta[]> => {
  const slugs = await getProjectSlugs();
  const metas = await Promise.all(
    slugs.map(async (slug) => {
      const source = await getProjectSource(slug);
      return source ? buildProjectMeta(source) : null;
    })
  );

  return metas
    .filter((meta): meta is ProjectMeta => Boolean(meta))
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
});

export const getProjectMetaBySlug = cache(
  async (slug: string): Promise<ProjectMeta | null> => {
    const source = await getProjectSource(slug);
    return source ? buildProjectMeta(source) : null;
  }
);

export const getProjectBySlug = cache(
  async (slug: string): Promise<ProjectContent | null> => {
    const source = await getProjectSource(slug);
    if (!source) return null;

    const { content } = await compileMDX({
      source: source.body,
      components: mdxComponents,
      options: {
        mdxOptions: {
          remarkPlugins,
          rehypePlugins,
        },
        parseFrontmatter: false,
      },
    });

    const meta = buildProjectMeta(source);
    const headings = extractHeadings(source.body);

    return {
      meta,
      headings,
      content,
    };
  }
);

export const getAdjacentProjects = cache(async (slug: string) => {
  const metas = await getAllProjectsMeta();
  const index = metas.findIndex((project) => project.slug === slug);

  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: metas[index + 1] ?? null,
    next: metas[index - 1] ?? null,
  };
});

export const formatProjectDate = (value: string) => formatDate(value);

