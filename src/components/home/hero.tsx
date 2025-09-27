"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Download, MapPin, Code, Sparkles } from "lucide-react";
import { PERSONAL_INFO } from "@/constants/home";
import { Container } from "../ui/container";
import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "@/constants/site";

export function HomeHero() {
	const mouseRef = React.useRef({ x: 0, y: 0 });
	const [parallax, setParallax] = React.useState({ x: 0, y: 0 });
	const { scrollYProgress } = useScroll();

	const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
	const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

	React.useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			mouseRef.current = { x: e.clientX, y: e.clientY };
		};
		window.addEventListener("mousemove", handleMouseMove);

		let frame: number;
		const loop = () => {
			const { x, y } = mouseRef.current;
			const px =
				(x - (typeof window !== "undefined" ? window.innerWidth : 1920) / 2) *
				0.01;
			const py =
				(y - (typeof window !== "undefined" ? window.innerHeight : 1080) / 2) *
				0.01;
			setParallax({ x: px, y: py });
			frame = requestAnimationFrame(loop);
		};
		loop();

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			cancelAnimationFrame(frame);
		};
	}, []);

	return (
		<motion.section
			style={{ y, opacity }}
			className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
			<Container>
				{/* Floating decorative elements */}
				{/* <motion.div
					className="absolute top-20 left-20 w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400/30 to-orange-500/30 blur-xl"
					animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.2, 1] }}
					transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
				/>
				<motion.div
					className="absolute bottom-32 right-32 w-12 h-12 rounded-full bg-gradient-to-r from-blue-400/30 to-purple-500/30 blur-lg"
					animate={{ x: [0, -25, 0], y: [0, 15, 0], scale: [1, 1.1, 1] }}
					transition={{
						duration: 6,
						repeat: Infinity,
						ease: "easeInOut",
						delay: 2,
					}}
				/> */}

				<div className="container mx-auto relative z-10">
					<div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
						{/* Left Side */}
						<motion.div
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
							className="space-y-8">
							{/* Status Badge */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.2 }}>
								<Badge
									variant="outline"
									className="border-yellow-500/30 text-yellow-600 bg-yellow-500/5 backdrop-blur-sm inline-flex items-center gap-2">
									<div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
									Available for work
								</Badge>
							</motion.div>

							{/* Main Heading */}
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.3 }}
								className="space-y-4">
								<h1 className="text-5xl md:text-7xl font-bold tracking-tight">
									<motion.span
										className="block"
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.6, delay: 0.4 }}>
										Hello, I&lsquo;m
									</motion.span>
									<motion.span
										className="block bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent"
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.6, delay: 0.6 }}>
										{PERSONAL_INFO.name.split(" ")[0]}
									</motion.span>
								</h1>

								<motion.div
									initial={{ scaleX: 0 }}
									animate={{ scaleX: 1 }}
									transition={{ duration: 0.8, delay: 0.8 }}
									className="h-1 w-32 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full origin-left"
								/>
							</motion.div>

							{/* Subtitle */}
							<motion.p
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.5 }}
								className="text-2xl md:text-3xl font-medium text-muted-foreground">
								{PERSONAL_INFO.title}
							</motion.p>

							{/* Description */}
							<motion.p
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.6 }}
								className="text-lg text-muted-foreground leading-relaxed max-w-lg">
								{PERSONAL_INFO.shortBio}
							</motion.p>

							{/* Location */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.7 }}
								className="flex items-center gap-2 text-muted-foreground">
								<MapPin className="w-4 h-4" />
								<span>{PERSONAL_INFO.location}</span>
							</motion.div>

							{/* CTA Buttons */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.8 }}
								className="flex flex-col sm:flex-row gap-4">
								<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
									<Button
										asChild
										size="lg"
										className="bg-yellow-500 hover:bg-yellow-600 text-black shadow-lg hover:shadow-xl transition-all duration-300 group">
										<Link href="/projects">
											<Code className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
											View My Work
										</Link>
									</Button>
								</motion.div>
								<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
									<Button
										asChild
										variant="outline"
										size="lg"
										className="border-yellow-500/20 hover:border-yellow-500/40 hover:bg-yellow-500/5 group"
										>
											<a
												href={SITE_CONFIG.cvUrl}
												target="_blank"
												rel="noopener noreferrer"
											>
												<Download className="w-5 h-5 mr-2 group-hover:translate-y-0.5 transition-transform" />
												Download CV
											</a>
									</Button>
								</motion.div>
							</motion.div>
						</motion.div>

						{/* Right Side */}
						<motion.div
							initial={{ opacity: 0, x: 50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8, delay: 0.4 }}
							className="relative"
							style={{
								transform: `translate(${parallax.x}px, ${parallax.y}px)`,
							}}>
							<motion.div
								className="absolute -inset-4 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-full blur-2xl"
								animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
								transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
							/>

							<motion.div
								className="relative z-10"
								whileHover={{ scale: 1.05 }}
								transition={{ type: "spring", stiffness: 300, damping: 20 }}>
								<div className="w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-yellow-500/30 shadow-2xl mx-auto">
									<motion.div
										initial={{ scale: 1.2 }}
										animate={{ scale: 1 }}
										transition={{ duration: 1, ease: "easeOut" }}
										whileHover={{ scale: 1.1 }}>
										<Image
											src={PERSONAL_INFO.image}
											alt={PERSONAL_INFO.name}
											width={384}
											height={384}
											className="w-full h-full object-cover"
										/>
									</motion.div>
								</div>
							</motion.div>

							<motion.div
								className="absolute -top-4 -right-4 bg-card/80 backdrop-blur-sm border border-yellow-500/20 rounded-full p-3 shadow-lg"
								animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
								transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
								<Sparkles className="w-6 h-6 text-red-500" />
							</motion.div>

							<motion.div
								className="absolute -bottom-6 -left-6 bg-card/80 backdrop-blur-sm border border-yellow-500/20 rounded-full p-3 shadow-lg"
								animate={{ y: [0, 8, 0], rotate: [0, -5, 0] }}
								transition={{
									duration: 5,
									repeat: Infinity,
									ease: "easeInOut",
									delay: 1,
								}}>
								<Code className="w-6 h-6 text-yellow-500" />
							</motion.div>
						</motion.div>
					</div>
				</div>

				{/* Scroll indicator */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 1.2 }}
					className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
					<motion.div
						animate={{ y: [0, 8, 0] }}
						transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
						className="flex flex-col items-center gap-2 text-muted-foreground">
						<span className="text-sm">Scroll to explore</span>
						<ArrowDown className="w-5 h-5" />
					</motion.div>
				</motion.div>
			</Container>
		</motion.section>
	);
}
