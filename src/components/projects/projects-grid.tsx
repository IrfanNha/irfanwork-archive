"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "./project-card";
import type { Project } from "@/constants/projects";

interface ProjectsGridProps {
	projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
	if (projects.length === 0) {
		return (
			<motion.div
				className="text-center py-16 space-y-4"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}>
				<div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-yellow-400/20 to-yellow-600/30 flex items-center justify-center">
					<motion.div
						className="text-2xl"
						animate={{ rotate: [0, -10, 10, 0] }}
						transition={{ duration: 2, repeat: Infinity }}>
						🔍
					</motion.div>
				</div>
				<h3 className="text-xl font-semibold text-foreground">
					No projects found
				</h3>
				<p className="text-muted-foreground max-w-md mx-auto">
					No projects match the selected filter. Try selecting a
					different category or check back later for new projects.
				</p>
			</motion.div>
		);
	}

	return (
		<section className="space-y-8">
			{/* Section Header */}
			<motion.div
				className="text-center space-y-2"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}>
				<h2 className="text-2xl md:text-3xl font-bold">
					<span className="bg-gradient-to-r from-foreground to-yellow-600 bg-clip-text text-transparent">
						Featured Work
					</span>
				</h2>
				<div className="w-16 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full" />
			</motion.div>

			{/* Projects Grid */}
			<AnimatePresence mode="wait">
				<motion.div
					key={projects.length} // Force re-render when projects change
					className="grid gap-6 md:gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.6, staggerChildren: 0.1 }}>
					{projects.map((project, index) => (
						<motion.div
							key={project.id}
							initial={{ opacity: 0, y: 30, scale: 0.9 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, scale: 0.9, y: -20 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							layout
							layoutId={project.id}>
							<ProjectCard project={project} index={index} />
						</motion.div>
					))}
				</motion.div>
			</AnimatePresence>

			{/* Load More Button (Future Enhancement) */}
			{projects.length > 0 && (
				<motion.div
					className="text-center pt-8"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.8 }}>
					<p className="text-sm text-muted-foreground">
						More projects coming soon! 🚀
					</p>
				</motion.div>
			)}
		</section>
	);
}
