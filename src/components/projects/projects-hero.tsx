"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Code, Sparkles, Rocket } from "lucide-react";
import { PROJECTS } from "@/constants/projects";

export function ProjectsHero() {
	const [isVisible, setIsVisible] = React.useState(false);

	React.useEffect(() => {
		setIsVisible(true);
	}, []);

	return (
		<motion.section
			className="text-center space-y-8"
			initial={{ opacity: 0 }}
			animate={{ opacity: isVisible ? 1 : 0 }}
			transition={{ duration: 0.6, staggerChildren: 0.2 }}>
			{/* Badge */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
				transition={{ duration: 0.6, delay: 0.1 }}
				className="flex justify-center">
				<Badge
					variant="outline"
					className="border-yellow-500/30 text-yellow-600 bg-yellow-500/5 backdrop-blur-sm">
					<Code className="w-3 h-3 mr-1" />
					My Work & Projects
				</Badge>
			</motion.div>

			{/* Main Title */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
				transition={{ duration: 0.6, delay: 0.2 }}
				className="space-y-4">
				<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
					<span className="bg-gradient-to-r from-foreground via-foreground to-yellow-600 bg-clip-text text-transparent">
						Creative
					</span>
					<br />
					<span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent flex items-center justify-center gap-3">
						<Sparkles className="w-8 h-8 md:w-12 md:h-12 text-yellow-500" />
						Projects
					</span>
				</h1>

				<motion.div
					className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full"
					initial={{ width: 0 }}
					animate={{ width: isVisible ? 96 : 0 }}
					transition={{ delay: 0.8, duration: 0.8 }}
				/>
			</motion.div>

			{/* Subtitle */}
			<motion.p
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
				transition={{ duration: 0.6, delay: 0.3 }}
				className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
				Explore my collection of projects, from web applications to
				creative experiments. Each project represents a journey of{" "}
				<span className="text-yellow-600 font-medium">learning</span>,{" "}
				<span className="text-yellow-600 font-medium">building</span>,
				and <span className="text-yellow-600 font-medium">growing</span>{" "}
				as a developer.
			</motion.p>

			{/* Stats */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
				transition={{ duration: 0.6, delay: 0.4 }}
				className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
				<div className="flex items-center gap-2">
					<motion.div
						className="w-2 h-2 rounded-full bg-green-500"
						animate={{ scale: [1, 1.2, 1] }}
						transition={{ duration: 2, repeat: Infinity }}
					/>
					<span>{PROJECTS.length} Projects</span>
				</div>
				<div className="w-px h-4 bg-border" />
				<div className="flex items-center gap-2">
					<Rocket className="w-4 h-4 text-yellow-500" />
					<span>Always Building</span>
				</div>
			</motion.div>
		</motion.section>
	);
}
