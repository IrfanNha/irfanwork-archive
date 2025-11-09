"use client";

import { motion } from "framer-motion";
import { Search, Filter, SortDesc } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import { ANIMATION_VARIANTS, MOTION } from "@/constants";
import { BlogFilters } from "@/types";

interface BlogHeaderProps {
  totalPosts: number;
  currentFilters: BlogFilters;
}

export function BlogHeader({ totalPosts, currentFilters }: BlogHeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(currentFilters.search || "");

  const updateFilters = useCallback(
    (newFilters: Partial<BlogFilters>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(newFilters).forEach(([key, value]) => {
        if (value && value !== "all") {
          params.set(key, value.toString());
        } else {
          params.delete(key);
        }
      });

      // Reset page when filters change
      if (Object.keys(newFilters).some((key) => key !== "page")) {
        params.delete("page");
      }

      router.push(`/blog?${params.toString()}`);
    },
    [searchParams, router]
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchValue !== (currentFilters.search || "")) {
        updateFilters({ search: searchValue });
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [searchValue, updateFilters, currentFilters.search]);

  const clearFilters = () => {
    setSearchValue("");
    router.push("/blog");
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const activeFiltersCount =
    Object.values(currentFilters).filter(Boolean).length - 2; // Exclude page and pageSize

  return (
    <motion.div
      className="space-y-6"
      variants={ANIMATION_VARIANTS.stagger}
      initial="hidden"
      animate="visible"
    >
      {/* Blog Header */}
      <motion.section
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Main Title */}
        <motion.div variants={itemVariants} className="space-y-3">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Blog
          </h1>
          {totalPosts > 0 && (
            <p className="text-sm text-muted-foreground font-light uppercase tracking-wider">
              {totalPosts} Article{totalPosts !== 1 ? "s" : ""}
            </p>
          )}
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl"
        >
          Discover insights, tutorials, and stories from our community.
        </motion.p>
      </motion.section>

      {/* Search & Filters */}
      <motion.div
        className="space-y-4"
        variants={ANIMATION_VARIANTS.slideUp}
        transition={{ delay: 0.2 }}
      >
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-10 border-border focus:border-foreground/50 bg-background"
            />
          </div>

          {/* Sort */}
          <div className="sm:w-[180px]">
            <Select
              value={currentFilters.sort || "newest"}
              onValueChange={(value) => updateFilters({ sort: value as any })}
            >
              <SelectTrigger className="border-border focus:border-foreground/50 bg-background">
                <SortDesc className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Clear Filters */}
          {activeFiltersCount > 0 && (
            <Button
              variant="outline"
              onClick={clearFilters}
              className="hover:bg-muted border-border"
            >
              <Filter className="h-4 w-4 mr-2" />
              Clear
            </Button>
          )}
        </div>

        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: MOTION.FAST }}
          >
            {currentFilters.search && (
              <Badge
                variant="outline"
                className="bg-background border-border text-xs font-normal"
              >
                Search: &quot;{currentFilters.search}&quot;
              </Badge>
            )}
            {currentFilters.category && (
              <Badge
                variant="outline"
                className="bg-background border-border text-xs font-normal"
              >
                {currentFilters.category}
              </Badge>
            )}
            {currentFilters.tag && (
              <Badge
                variant="outline"
                className="bg-background border-border text-xs font-normal"
              >
                #{currentFilters.tag}
              </Badge>
            )}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
