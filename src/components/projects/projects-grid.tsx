"use client";

import { ProjectCard } from "./project-card";
import type { Project } from "@/constants/projects";

interface ProjectsGridProps {
	projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
	if (projects.length === 0) {
		return (
			<div className="text-center py-16 space-y-4">
				<div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
					<div className="text-2xl">🔍</div>
				</div>
				<h3 className="text-xl font-semibold text-foreground">
					No projects found
				</h3>
				<p className="text-muted-foreground max-w-md mx-auto">
					No projects match the selected filter. Try selecting a
					different category or check back later for new projects.
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-0">
			{/* Projects List */}
			<div className="divide-y divide-border">
				{projects.map((project, index) => (
					<ProjectCard 
						key={project.id} 
						project={project} 
						index={index}
					/>
				))}
			</div>
		</div>
	);
}
