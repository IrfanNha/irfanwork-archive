import { BlogLoading } from "@/components/blog/blog-loading";

export default function BlogPageLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl py-12 md:py-16 lg:py-20">
        <BlogLoading />
      </div>
    </div>
  );
}

