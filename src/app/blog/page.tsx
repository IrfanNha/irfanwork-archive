import { Metadata } from "next";
import { Suspense } from "react";
import { BlogList } from "@/components/blog/blog-list";
import { BlogSidebar } from "@/components/blog/blog-sidebar";
import { BlogHeader } from "@/components/blog/blog-header";
import { BlogLoading } from "@/components/blog/blog-loading";
import { strapiAPI } from "@/lib/api/strapi";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read our latest articles about technology, design, and development.",
  openGraph: {
    title: "Blog | Blog Platform",
    description:
      "Read our latest articles about technology, design, and development.",
  },
};

interface BlogPageProps {
  searchParams?: Promise<{
    search?: string;
    category?: string;
    tag?: string;
    sort?: "newest" | "oldest" | "popular";
    page?: string;
  }>;
}

// Enable ISR for this page
export const revalidate = 60; // Revalidate every 60 seconds

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const sp = (searchParams ? await searchParams : {}) ?? {};

  const filters = {
    search: sp.search,
    category: sp.category,
    tag: sp.tag,
    sort: sp.sort || "newest",
    page: parseInt(sp.page ?? "1", 10),
    pageSize: 12,
  };

  // Fetch data in parallel
  const [postsResponse, categoriesResponse, tagsResponse] = await Promise.all([
    strapiAPI.getPosts(filters),
    strapiAPI.getCategories(),
    strapiAPI.getTags(),
  ]);

  return (
    <div className="min-h-screen bg-background">
      <Container>
        <div className="max-w-6xl mx-auto py-12 md:py-16 lg:py-20">
          <BlogHeader
            totalPosts={postsResponse.meta.pagination.total}
            currentFilters={filters}
          />

          <div className="grid gap-12 lg:grid-cols-12 mt-12 lg:mt-16">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <Suspense fallback={<BlogLoading />}>
                <BlogList
                  initialPosts={postsResponse.data}
                  pagination={postsResponse.meta.pagination}
                  filters={filters}
                />
              </Suspense>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 lg:pl-8 lg:border-l">
              <div className="sticky top-24 space-y-8  ">
                <BlogSidebar
                  categories={categoriesResponse.data}
                  tags={tagsResponse.data}
                  currentFilters={filters}
                />
              </div>
            </aside>
          </div>
        </div>
      </Container>
    </div>
  );
}
