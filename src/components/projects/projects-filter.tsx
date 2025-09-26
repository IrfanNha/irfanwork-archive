"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe, Smartphone, Wrench, Layers, Sparkles } from "lucide-react";
import { PROJECTS } from "@/constants/projects";

interface ProjectsFilterProps {
	selectedFilter: string;
	onFilterChange: (filter: string) => void;
}

const filterCategories = [
	{
		key: "all",
		label: "All Projects",
		icon: Layers,
		color: "from-yellow-400 to-yellow-600",
	},
	{
		key: "web",
		label: "Web Apps",
		icon: Globe,
		color: "from-blue-400 to-blue-600",
	},
	{
		key: "app",
		label: "Mobile Apps",
		icon: Smartphone,
		color: "from-green-400 to-green-600",
	},
	{
		key: "tool",
		label: "Tools",
		icon: Wrench,
		color: "from-purple-400 to-purple-600",
	},
	{
		key: "other",
		label: "Others",
		icon: Sparkles,
		color: "from-pink-400 to-pink-600",
	},
];

export function ProjectsFilter({
	selectedFilter,
	onFilterChange,
}: ProjectsFilterProps) {
	const getCategoryCount = (category: string) => {
		if (category === "all") return PROJECTS.length;
		return PROJECTS.filter((project) => project.category === category)
			.length;
	};

	return (
		<section className="space-y-6">
			{/* Section Title */}
			<motion.div
				className="text-center space-y-2"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}>
				<h2 className="text-2xl md:text-3xl font-bold">
					Browse by Category
				</h2>
				<p className="text-muted-foreground">
					Filter projects to find exactly what you&lsquo;re looking
					for
				</p>
			</motion.div>

			{/* Filter Buttons */}
			<motion.div
				className="flex flex-wrap justify-center gap-3"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2 }}>
				{filterCategories.map((category, index) => {
					const isSelected = selectedFilter === category.key;
					const count = getCategoryCount(category.key);
					const Icon = category.icon;

					return (
						<motion.div
							key={category.key}
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: index * 0.1, duration: 0.4 }}>
							<Button
								variant={isSelected ? "default" : "outline"}
								onClick={() => onFilterChange(category.key)}
								className={`
									relative overflow-hidden group transition-all duration-300
									${
										isSelected
											? `bg-gradient-to-r ${category.color} text-white border-transparent shadow-lg hover:shadow-xl`
											: "border-yellow-500/20 hover:border-yellow-500/40 hover:bg-yellow-500/5"
									}
								`}>
								{/* Background glow effect */}
								<motion.div
									className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-300"
									style={{
										background: `linear-gradient(to right, var(--yellow-400), var(--yellow-600))`,
									}}
								/>

								{/* Content */}
								<div className="relative flex items-center gap-2">
									<motion.div
										whileHover={{ rotate: 360 }}
										transition={{ duration: 0.6 }}>
										<Icon className="w-4 h-4" />
									</motion.div>

									<span className="font-medium">
										{category.label}
									</span>

									{count > 0 && (
										<Badge
											variant="secondary"
											className={`
												ml-1 text-xs
												${
													isSelected
														? "bg-white/20 text-white hover:bg-white/30"
														: "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20"
												}
											`}>
											{count}
										</Badge>
									)}
								</div>

								{/* Selection indicator */}
								{isSelected && (
									<motion.div
										className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/50"
										initial={{ scaleX: 0 }}
										animate={{ scaleX: 1 }}
										transition={{ duration: 0.3 }}
									/>
								)}
							</Button>
						</motion.div>
					);
				})}
			</motion.div>

			{/* Active filter indicator */}
			<motion.div
				className="text-center"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.4 }}>
				<p className="text-sm text-muted-foreground">
					{selectedFilter === "all" ? (
						<>
							Showing all{" "}
							<span className="font-medium text-yellow-600">
								{PROJECTS.length}
							</span>{" "}
							projects
						</>
					) : (
						<>
							Showing{" "}
							<span className="font-medium text-yellow-600">
								{getCategoryCount(selectedFilter)}
							</span>{" "}
							{filterCategories
								.find((cat) => cat.key === selectedFilter)
								?.label.toLowerCase()}
						</>
					)}
				</p>
			</motion.div>
		</section>
	);
}
