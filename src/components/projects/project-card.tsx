"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ExternalLink, Github, Eye, Code } from "lucide-react";
import type { Project } from "@/constants/projects";

interface ProjectCardProps {
	project: Project;
	index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
	const [isHovered, setIsHovered] = React.useState(false);
	const [imageLoaded, setImageLoaded] = React.useState(false);

	const cardVariants = {
		rest: {
			scale: 1,
			y: 0,
			rotateX: 0,
			rotateY: 0,
			boxShadow:
				"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
		},
		hover: {
			scale: 1.015,
			y: -6,
			rotateX: 3,
			rotateY: 3,
			boxShadow:
				"0 15px 30px -8px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(250, 204, 21, 0.1)",
			transition: {
				type: "spring" as const,
				stiffness: 120,
				damping: 15,
			},
		},
	};

	const imageVariants = {
	rest: { scale: 1 },
	hover: {
		scale: 1.03,
		transition: { duration: 0.25, ease: "easeOut" as const },
	},
	};

	const overlayVariants = {
	rest: { opacity: 0 },
	hover: {
		opacity: 1,
		transition: { duration: 0.25, ease: "easeInOut" as const },
	},
	};


	const getCategoryColor = (category: string) => {
		const colors = {
			web: "from-blue-400/20 to-blue-600/30",
			app: "from-green-400/20 to-green-600/30",
			tool: "from-purple-400/20 to-purple-600/30",
			other: "from-pink-400/20 to-pink-600/30",
		};
		return colors[category as keyof typeof colors] || colors.other;
	};

	return (
		<motion.div
			variants={cardVariants}
			initial="rest"
			whileHover="hover"
			animate="rest"
			onHoverStart={() => setIsHovered(true)}
			onHoverEnd={() => setIsHovered(false)}
			className="group cursor-pointer"
			style={{ perspective: 800 }}>
			<Card className="overflow-hidden border-yellow-500/20 bg-card/80 backdrop-blur-sm hover:border-yellow-500/40 transition-colors duration-300">
				{/* Project Image */}
				<div className="relative aspect-video overflow-hidden">
					<motion.div
						variants={imageVariants}
						className="h-full w-full will-change-transform">
						<Image
							src={project.image}
							alt={project.name}
							fill
							sizes="(max-width: 768px) 100vw, 50vw"
							className="object-cover transition-all duration-500"
							onLoad={() => setImageLoaded(true)}
						/>

						{/* Loading placeholder */}
						{!imageLoaded && (
							<div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-yellow-600/20 animate-pulse" />
						)}

						{/* Gradient overlay */}
						<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

						{/* Hover overlay */}
						<motion.div
							variants={overlayVariants}
							className="absolute inset-0 bg-gradient-to-t from-yellow-500/20 via-transparent to-transparent flex items-center justify-center gap-2 will-change-opacity">
							<Button
								size="sm"
								variant="secondary"
								className="bg-white/90 hover:bg-white text-black shadow-lg backdrop-blur-sm"
								asChild>
								<Link
									href={project.liveUrl}
									target="_blank"
									rel="noopener noreferrer">
									<Eye className="w-4 h-4 mr-1" />
									Live Demo
								</Link>
							</Button>

							<Button
								size="sm"
								variant="outline"
								className="bg-black/20 border-white/30 text-white hover:bg-black/40 backdrop-blur-sm"
								asChild>
								<Link
									href={project.url}
									target="_blank"
									rel="noopener noreferrer">
									<Github className="w-4 h-4 mr-1" />
									Code
								</Link>
							</Button>
						</motion.div>
					</motion.div>

					{/* Category badge */}
					<div className="absolute top-4 left-4">
						<Badge
							variant="secondary"
							className={`bg-gradient-to-r ${getCategoryColor(project.category)} border-white/20 text-white capitalize backdrop-blur-sm`}>
							{project.category}
						</Badge>
					</div>

					{/* Project index */}
					<div className="absolute top-4 right-4">
						<motion.div
							className="w-8 h-8 rounded-full bg-yellow-500/90 text-black font-bold text-sm flex items-center justify-center backdrop-blur-sm will-change-transform"
							animate={
								isHovered ? { rotate: 360 } : { rotate: 0 }
							}
							transition={{ duration: 0.5, ease: "easeOut" }}>
							{index + 1}
						</motion.div>
					</div>
				</div>

				<CardHeader className="space-y-2">
					<CardTitle className="flex items-start justify-between gap-2">
						<span className="line-clamp-1">{project.name}</span>
						<motion.div
							animate={
								isHovered ? { x: 3, y: -3 } : { x: 0, y: 0 }
							}
							transition={{ duration: 0.15, ease: "easeOut" }}>
							<ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-yellow-500 transition-colors" />
						</motion.div>
					</CardTitle>

					<CardDescription className="line-clamp-2 text-sm">
						{project.description}
					</CardDescription>
				</CardHeader>

				<CardContent className="space-y-4">
					{/* Tech stack */}
					<div className="space-y-2">
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<Code className="w-4 h-4" />
							<span className="font-medium">Tech Stack</span>
						</div>

						<div className="flex flex-wrap gap-1.5">
							{project.tech.slice(0, 4).map((tech, i) => (
								<motion.div
									key={tech}
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ delay: i * 0.08 }}>
									<Badge
										variant="outline"
										className="text-xs border-yellow-500/20 text-yellow-600 hover:border-yellow-500/40 hover:bg-yellow-500/5 transition-colors">
										{tech}
									</Badge>
								</motion.div>
							))}

							{project.tech.length > 4 && (
								<Badge
									variant="outline"
									className="text-xs border-muted text-muted-foreground">
									+{project.tech.length - 4} more
								</Badge>
							)}
						</div>
					</div>

					{/* Action buttons */}
					<div className="flex gap-2 pt-2">
						<Button
							variant="outline"
							size="sm"
							className="flex-1 border-yellow-500/20 hover:border-yellow-500/40 hover:bg-yellow-500/5 group"
							asChild>
							<Link
								href={project.liveUrl}
								target="_blank"
								rel="noopener noreferrer">
								<Eye className="w-4 h-4 mr-1.5 group-hover:scale-110 transition-transform" />
								View Live
							</Link>
						</Button>

						<Button
							variant="outline"
							size="sm"
							className="flex-1 border-yellow-500/20 hover:border-yellow-500/40 hover:bg-yellow-500/5 group"
							asChild>
							<Link
								href={project.url}
								target="_blank"
								rel="noopener noreferrer">
								<Github className="w-4 h-4 mr-1.5 group-hover:scale-110 transition-transform" />
								Source Code
							</Link>
						</Button>
					</div>
				</CardContent>

				{/* Bottom gradient accent */}
				<motion.div
					className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 will-change-transform"
					initial={{ scaleX: 0 }}
					animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
					transition={{ duration: 0.25, ease: "easeOut" }}
				/>
			</Card>
		</motion.div>
	);
}
