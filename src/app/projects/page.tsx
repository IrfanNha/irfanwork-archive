"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { ProjectsHero } from "@/components/projects/projects-hero";
import { ProjectsFilter } from "@/components/projects/projects-filter";
import { ProjectsGrid } from "@/components/projects/projects-grid";
import { BackgroundBlobs } from "@/components/projects/background-blobs";
import { PROJECTS, type Project } from "@/constants/projects";
import { GitHubRepos } from "@/components/projects/github-repos";

export default function ProjectsPage() {
	const [selectedFilter, setSelectedFilter] = React.useState<string>("all");
	const [filteredProjects, setFilteredProjects] =
		React.useState<Project[]>(PROJECTS);

	// Filter projects based on selected category
	React.useEffect(() => {
		if (selectedFilter === "all") {
			setFilteredProjects(PROJECTS);
		} else {
			setFilteredProjects(
				PROJECTS.filter(
					(project) => project.category === selectedFilter
				)
			);
		}
	}, [selectedFilter]);

	return (
		<main className="relative min-h-screen overflow-hidden">
			{/* Background Blobs */}
			<BackgroundBlobs />

			{/* Content */}
			<Container className="relative z-10">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="space-y-16 py-16">
					{/* Hero Section */}
					<ProjectsHero />

					{/* Filter Section */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}>
						<ProjectsFilter
							selectedFilter={selectedFilter}
							onFilterChange={setSelectedFilter}
						/>
					</motion.div>

					{/* Projects Grid */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}>
						<ProjectsGrid projects={filteredProjects} />
					</motion.div>
				</motion.div>

				<GitHubRepos />
			</Container>
		</main>
	);
}
