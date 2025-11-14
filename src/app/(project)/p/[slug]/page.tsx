import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Github,
  LinkIcon,
  Tag,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import {
  getAdjacentProjects,
  getProjectBySlug,
  getProjectMetaBySlug,
  getProjectSlugs,
  formatProjectDate,
} from "@/lib/mdx";
import {
  buildProjectMetadata,
  buildProjectStructuredData,
} from "@/lib/meta";

type PageParams = {
  params: Promise<{
    slug: string;
  }>;
};

type RepoStats = {
  stars: number;
  updatedAt: string;
} | null;

const fetchRepoStats = async (repoUrl?: string): Promise<RepoStats> => {
  if (!repoUrl || !repoUrl.includes("github.com")) return null;

  const [, owner, repo] = repoUrl.match(/github\.com\/([^/]+)\/([^/?#]+)/) ?? [];
  if (!owner || !repo) return null;

  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      next: { revalidate: 60 * 60 * 6 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return {
      stars: data.stargazers_count ?? 0,
      updatedAt: data.pushed_at ?? data.updated_at ?? "",
    };
  } catch (error) {
    console.warn("[projects] Failed to fetch repo stats", error);
    return null;
  }
};

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const meta = await getProjectMetaBySlug(slug);
  if (!meta) return {};
  return buildProjectMetadata(meta);
}

export default async function ProjectDetailPage({ params }: PageParams) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  const adjacent = await getAdjacentProjects(project.meta.slug);
  const repoStats = await fetchRepoStats(project.meta.repo);
  const structuredData = buildProjectStructuredData(project.meta);

  return (
    <>
      <Script
        id={`project-schema-${project.meta.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(structuredData)}
      </Script>
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <Container className="py-10 md:py-16 lg:py-20">
          <div className="mx-auto max-w-5xl space-y-10 md:space-y-12">
            <Link
              href="/projects"
              className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to projects
            </Link>

            <article className="space-y-8 md:space-y-10">
              <section className="space-y-8 rounded-xl border border-border/40 bg-background/80 p-6 md:p-10 shadow">
                <div className="relative overflow-hidden rounded-xl border border-border/30 bg-muted/40">
                  <Image
                    src={project.meta.banner}
                    alt={project.meta.title}
                    width={1600}
                    height={900}
                    priority
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <div className="absolute left-4 top-4">
                    <Badge className="bg-background/80 text-foreground capitalize shadow-sm">
                      {project.meta.category}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                    {project.meta.title}
                  </h1>
                  <p className="text-base text-muted-foreground md:text-xl">
                    {project.meta.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {formatProjectDate(project.meta.date)}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {project.meta.readingTime.text}
                    </span>
                    {repoStats && (
                      <span className="inline-flex items-center gap-2">
                        <Github className="h-4 w-4" />
                        {repoStats.stars.toLocaleString()} stars
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {project.meta.demo && (
                      <Link
                        href={project.meta.demo}
                        className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-4 py-2 text-sm font-medium text-foreground transition hover:bg-background/70"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <LinkIcon className="h-4 w-4" />
                        Visit demo
                      </Link>
                    )}
                    {project.meta.repo && (
                      <Link
                        href={project.meta.repo}
                        className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-4 py-2 text-sm font-medium text-foreground transition hover:bg-background/70"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4" />
                        View source
                      </Link>
                    )}
                  </div>
                </div>
              </section>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-xl border border-border/40 bg-background/80 p-6 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                    Built with
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.meta.tech.map((item) => (
                      <Badge
                        key={item}
                        variant="secondary"
                        className="rounded-full border border-border/60 bg-background/80 text-xs font-medium"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-border/40 bg-background/80 p-6 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                    Project metadata
                  </p>
                  <dl className="mt-4 space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Published</span>
                      <span className="ml-auto font-medium text-foreground">
                        {formatProjectDate(project.meta.date)}
                      </span>
                    </div>
                    {project.meta.updated && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Updated</span>
                        <span className="ml-auto font-medium text-foreground">
                          {formatProjectDate(project.meta.updated)}
                        </span>
                      </div>
                    )}
                    {repoStats?.updatedAt && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Github className="h-4 w-4" />
                        <span>Repo activity</span>
                        <span className="ml-auto font-medium text-foreground">
                          {formatProjectDate(repoStats.updatedAt)}
                        </span>
                      </div>
                    )}
                    {project.meta.tags && project.meta.tags.length > 0 && (
                      <div className="flex items-start gap-2 text-muted-foreground">
                        <Tag className="mt-0.5 h-4 w-4" />
                        <span>Topics</span>
                        <span className="ml-auto flex flex-wrap justify-end gap-2 text-right font-medium text-foreground">
                          {project.meta.tags.join(", ")}
                        </span>
                      </div>
                    )}
                  </dl>
                </div>
              </div>

              {project.headings.length > 0 && (
                <div className="rounded-xl border border-border/40 bg-background/75 p-6 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                    Table of contents
                  </p>
                  <nav className="mt-4 space-y-2 text-sm">
                    {project.headings.map((heading) => (
                      <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        className="block text-muted-foreground transition hover:text-foreground"
                        style={{
                          marginLeft: heading.level === 3 ? "0.75rem" : 0,
                        }}
                      >
                        {heading.text}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              <Suspense fallback={<div className="text-sm text-muted-foreground">Rendering content…</div>}>
                <div className="rounded-xl border border-border/30 bg-background/90 p-6 md:p-10 shadow">
                  <div className="prose prose-neutral max-w-none dark:prose-invert">
                    {project.content}
                  </div>
                </div>
              </Suspense>
            </article>

            <footer className="border-t border-border/40 pt-10">
              <div className="grid gap-4 md:grid-cols-2">
                {adjacent.previous && (
                  <Link
                    href={`/p/${adjacent.previous.slug}`}
                    className="group flex w-full items-center gap-4 rounded-xl border border-border/30 bg-background/80 px-4 py-3 text-left transition hover:border-border/60"
                  >
                    <ArrowLeft className="h-5 w-5 text-muted-foreground transition group-hover:-translate-x-1" />
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                        Previous
                      </p>
                      <p className="text-base font-semibold text-foreground">
                        {adjacent.previous.title}
                      </p>
                    </div>
                  </Link>
                )}

                {adjacent.next && (
                  <Link
                    href={`/p/${adjacent.next.slug}`}
                    className="group flex w-full items-center justify-between gap-4 rounded-xl border border-border/30 bg-background/80 px-4 py-3 text-left transition hover:border-border/60"
                  >
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                        Next
                      </p>
                      <p className="text-base font-semibold text-foreground">
                        {adjacent.next.title}
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground transition group-hover:translate-x-1" />
                  </Link>
                )}
              </div>
            </footer>
          </div>
        </Container>
      </main>
    </>
  );
}

