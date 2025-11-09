"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Container } from "@/components/ui/container";
import { ProjectsHero } from "@/components/projects/projects-hero";
import { ProjectsFilter } from "@/components/projects/projects-filter";
import { ProjectsGrid } from "@/components/projects/projects-grid";
import { PROJECTS, type Project } from "@/constants/projects";

const GitHubRepos = dynamic(
  () =>
    import("@/components/projects/github-repos").then((mod) => mod.GitHubRepos),
  {
    ssr: false,
    loading: () => (
      <div className="text-center text-muted-foreground py-16">
        Loading GitHub Repos...
      </div>
    ),
  }
);

export default function ProjectsPage() {
  const [selectedFilter, setSelectedFilter] = React.useState<string>("all");

  // Filter projects based on selected category
  const filteredProjects = React.useMemo<Project[]>(() => {
    if (selectedFilter === "all") return PROJECTS;
    return PROJECTS.filter((project) => project.category === selectedFilter);
  }, [selectedFilter]);

  return (
    <main className="min-h-screen bg-background">
      <Container>
        <div className="max-w-6xl mx-auto py-12 md:py-16 lg:py-20">
          <ProjectsHero />

          <div className="mt-12 lg:mt-16 space-y-12">
            {/* Filter Section */}
            <ProjectsFilter
              selectedFilter={selectedFilter}
              onFilterChange={setSelectedFilter}
            />

            {/* Projects List */}
            <ProjectsGrid projects={filteredProjects} />
          </div>

          {/* Lazy Loaded GitHub Repos */}
          <div className="mt-20">
            <GitHubRepos />
          </div>
        </div>
      </Container>
    </main>
  );
}
