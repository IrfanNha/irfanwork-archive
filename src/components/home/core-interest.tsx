"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { CORE_INTERESTS } from "@/constants/home";
import { Container } from "../ui/container";

const MotionLink = motion(Link);

export function HomeCoreInterests() {
	const ref = React.useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	return (
		<motion.section ref={ref} className="relative py-24 overflow-hidden">
			{/* Background decoration */}
			<div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />

			<Container>
				<div className="relative z-10 max-w-6xl mx-auto">
					{/* Section Header */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.8 }}
						className="text-center mb-16 space-y-4"
					>
						{/* Badge */}
						<div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border border-yellow-500/30 text-yellow-600 bg-yellow-500/5">
							Core Interests
						</div>

						{/* Title */}
						<h2 className="text-4xl md:text-5xl font-bold">
							<span className="">
								What I&lsquo;m
							</span>
							<br />
							<span className="text-yellow-400">
								Passionate About
							</span>
						</h2>

						{/* Underline Bar */}
						<motion.div
							initial={{ scaleX: 0 }}
							animate={isInView ? { scaleX: 1 } : {}}
							transition={{ duration: 0.8, delay: 0.4 }}
							className="h-1 w-32 bg-gradient-to-r from-yellow-400 to-amber-600 rounded-full mx-auto"
						/>

						{/* Subtitle */}
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.6, delay: 0.6 }}
							className="text-lg text-muted-foreground max-w-2xl mx-auto"
						>
							Three interconnected areas that drive my curiosity
							and shape my approach to technology
						</motion.p>
					</motion.div>

					{/* Interests Grid */}
					<div className="grid md:grid-cols-3 gap-8">
						{CORE_INTERESTS.map((interest, index) => (
							<motion.div
								key={interest.id}
								initial={{ opacity: 0, y: 50 }}
								animate={isInView ? { opacity: 1, y: 0 } : {}}
								transition={{
									duration: 0.6,
									delay: 0.8 + index * 0.2,
									ease: "easeOut",
								}}
								whileHover={{ y: -10, scale: 1.02 }}
								className="group relative"
							>
								{/* Card */}
								<div className="relative h-full p-8 rounded-2xl bg-card/50 border border-border backdrop-blur-sm hover:bg-card/70 transition-all duration-500 group-hover:border-border/80">
									{/* Hover gradient */}
									<div
										className={`absolute inset-0 bg-gradient-to-br ${interest.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}
									/>

									{/* Icon */}
									<motion.div
										className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300"
										whileHover={{ rotate: 10 }}
									>
										{interest.icon}
									</motion.div>

									{/* Title */}
									<motion.h3
										className={`text-2xl font-bold mb-4 bg-gradient-to-r ${interest.color} bg-clip-text text-transparent`}
									>
										{interest.title}
									</motion.h3>

									{/* Description */}
									<p className="text-muted-foreground mb-6 leading-relaxed">
										{interest.description}
									</p>

									{/* Skills */}
									<div className="space-y-3">
										<h4 className="text-sm font-semibold text-foreground/80 flex items-center gap-2">
											<ChevronRight className="w-4 h-4" />
											Key Areas
										</h4>
										<div className="flex flex-wrap gap-2">
											{interest.skills.map(
												(skill, skillIndex) => (
													<motion.span
														key={skill}
														initial={{
															opacity: 0,
															scale: 0.8,
														}}
														animate={
															isInView
																? {
																		opacity: 1,
																		scale: 1,
																  }
																: {}
														}
														transition={{
															duration: 0.3,
															delay:
																1 +
																index * 0.2 +
																skillIndex *
																	0.1,
														}}
														className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-white/5 border border-white/10 text-foreground/70 hover:bg-white/10 transition-colors"
													>
														{skill}
													</motion.span>
												)
											)}
										</div>
									</div>

									{/* Hover border */}
									<motion.div
										className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/20 transition-all duration-300"
									/>
								</div>

								{/* Floating dots */}
								{["top-right", "bottom-left"].map((pos, i) => (
									<motion.div
										key={pos}
										className={`absolute ${
											pos === "top-right"
												? "-top-2 -right-2 w-4 h-4"
												: "-bottom-2 -left-2 w-3 h-3"
										} rounded-full bg-gradient-to-r ${
											interest.color
										} ${
											pos === "top-right"
												? "opacity-60"
												: "opacity-40"
										}`}
										animate={{
											scale: [1, pos === "top-right" ? 1.2 : 1.3, 1],
											opacity: [
												pos === "top-right" ? 0.6 : 0.4,
												pos === "top-right" ? 1 : 0.8,
												pos === "top-right" ? 0.6 : 0.4,
											],
										}}
										transition={{
											duration: pos === "top-right" ? 2 : 3,
											repeat: Infinity,
											delay: index * 0.5 + (i === 1 ? 1 : 0),
										}}
									/>
								))}
							</motion.div>
						))}
					</div>

					{/* Bottom CTA */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.6, delay: 1.6 }}
						className="text-center mt-16"
					>
						<motion.p className="text-muted-foreground mb-6">
							Want to dive deeper into any of these areas? Let&lsquo;s
							have a conversation!
						</motion.p>

						<MotionLink
							href="/projects"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="inline-flex items-center px-6 py-3 rounded-lg text-base font-medium border border-yellow-500/30 text-yellow-600 bg-yellow-500/5 hover:bg-yellow-500/10 transition-all duration-300 group"
						>
							<span>Explore My Work</span>
							<ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
						</MotionLink>
					</motion.div>
				</div>
			</Container>
		</motion.section>
	);
}
