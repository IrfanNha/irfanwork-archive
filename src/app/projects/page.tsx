"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { ProjectsHero } from "@/components/projects/projects-hero"
import { ProjectsFilter } from "@/components/projects/projects-filter"
import { ProjectsGrid } from "@/components/projects/projects-grid"
// import { BackgroundBlobs } from "@/components/projects/background-blobs"
import { PROJECTS, type Project } from "@/constants/projects"


const GitHubRepos = dynamic(() => import("@/components/projects/github-repos").then(mod => mod.GitHubRepos), {
  ssr: false,
  loading: () => <div className="text-center text-muted-foreground">Loading GitHub Repos...</div>,
})


// Reusable motion variants (lebih enteng)
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
}

export default function ProjectsPage() {
  const [selectedFilter, setSelectedFilter] = React.useState<string>("all")

  // Gunakan useMemo biar filtering nggak dihitung ulang kecuali filter berubah
  const filteredProjects = React.useMemo<Project[]>(() => {
    if (selectedFilter === "all") return PROJECTS
    return PROJECTS.filter((project) => project.category === selectedFilter)
  }, [selectedFilter])

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background Blobs */}
      {/* <BackgroundBlobs /> */}

      {/* Content */}
      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          className="space-y-16 py-16"
        >
          {/* Hero Section */}
          <motion.div variants={fadeInUp} custom={0}>
            <ProjectsHero />
          </motion.div>

          {/* Filter Section */}
          <motion.div variants={fadeInUp} custom={0.2}>
            <ProjectsFilter
              selectedFilter={selectedFilter}
              onFilterChange={setSelectedFilter}
            />
          </motion.div>

          {/* Projects Grid */}
          <motion.div variants={fadeInUp} custom={0.4}>
            <ProjectsGrid projects={filteredProjects} />
          </motion.div>
        </motion.div>

        {/* Lazy Loaded GitHub Repos */}
        <GitHubRepos />
      </Container>
    </main>
  )
}
