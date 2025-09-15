"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeftCircle } from "lucide-react";
import { COLORS, MOTION, ANIMATION_VARIANTS } from "@/constants";

export default function NotFoundPage() {
	// Scroll effect → opacity + y translation
	const { scrollYProgress } = useScroll();
	const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
	const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.7]);

	// Mouse parallax
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
	const [windowSize, setWindowSize] = useState({ w: 0, h: 0 });

	useEffect(() => {
		// Update ukuran window ketika mount
		if (typeof window !== "undefined") {
			setWindowSize({ w: window.innerWidth, h: window.innerHeight });
		}

		const handleResize = () => {
			setWindowSize({ w: window.innerWidth, h: window.innerHeight });
		};

		const handleMouseMove = (e: MouseEvent) => {
			setMousePos({ x: e.clientX, y: e.clientY });
		};

		window.addEventListener("resize", handleResize);
		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			window.removeEventListener("resize", handleResize);
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	const parallaxX =
		windowSize.w > 0 ? (mousePos.x - windowSize.w / 2) * 0.02 : 0;
	const parallaxY =
		windowSize.h > 0 ? (mousePos.y - windowSize.h / 2) * 0.02 : 0;

	return (
		<main className="relative min-h-[80vh] flex items-center overflow-hidden">
			{/* Background blob */}
			<motion.div
				className="absolute inset-0 -z-10"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: MOTION.SLOW }}>
				<div className="absolute top-1/3 left-1/4 w-72 h-72 bg-yellow-500/20 rounded-full blur-3xl animate-pulse" />
				<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-300/10 rounded-full blur-3xl animate-pulse" />
			</motion.div>

			<Container className="py-24 relative z-10">
				<div className="grid gap-10 lg:grid-cols-2 items-center">
					{/* Left: Icon + effects */}
					<motion.div
						style={{ y, opacity }}
						transition={{ duration: MOTION.MEDIUM }}
						className="flex flex-col items-center  gap-6">
						<motion.div
							variants={ANIMATION_VARIANTS.scale}
							initial="hidden"
							animate="visible"
							transition={{ duration: MOTION.SLOW }}
							className="bg-white/5 p-10 rounded-2xl shadow-xl flex items-center justify-center relative"
							style={{
								transform: `translate(${parallaxX}px, ${parallaxY}px)`,
							}}>
							<motion.div
								animate={{ y: [0, -10, 0] }}
								transition={{
									repeat: Infinity,
									duration: 3,
									ease: "easeInOut",
								}}
								whileHover={{ scale: 1.1, rotate: 5 }}
								whileTap={{ scale: 0.95 }}>
								<ArrowLeftCircle className="w-32 h-32 text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.4)]" />
							</motion.div>
						</motion.div>
					</motion.div>

					{/* Right: text + actions */}
					<motion.div
						variants={ANIMATION_VARIANTS.slideInRight}
						initial="hidden"
						animate="visible"
						transition={{ duration: MOTION.MEDIUM }}
						className="flex flex-col gap-6">
						<h1
							className="text-3xl sm:text-5xl font-extrabold tracking-tight"
							style={{ color: COLORS.BITCOIN[500] }}>
							Oops! Page Not Found
						</h1>

						<p className="text-muted-foreground text-lg leading-relaxed">
							The page you&apos;re looking for could not be found.
							It may have been moved or deleted.
						</p>

						<ul className="space-y-2 text-sm text-muted-foreground">
							<li>• Double-check the URL you entered.</li>
							<li>• Try using the search feature.</li>
							<li>• Or return to the homepage.</li>
						</ul>

						<div className="flex flex-wrap gap-3 mt-6">
							<Link href="/">
								<motion.div
									whileHover={{ scale: 1.05, y: -2 }}
									whileTap={{ scale: 0.95 }}
									transition={{
										type: "spring",
										stiffness: 250,
										damping: 20,
									}}>
									<Button
										variant="default"
										className="flex items-center gap-2 shadow-lg hover:shadow-xl transition-all bg-yellow-500">
										<Home className="h-4 w-4" />
										Home
									</Button>
								</motion.div>
							</Link>

							<Link href="/search">
								<motion.div
									whileHover={{ scale: 1.05, y: -2 }}
									whileTap={{ scale: 0.95 }}
									transition={{
										type: "spring",
										stiffness: 250,
										damping: 20,
									}}>
									<Button
										variant="outline"
										className="flex items-center gap-2 hover:bg-white/10">
										<Search className="h-4 w-4" />
										Cari
									</Button>
								</motion.div>
							</Link>
						</div>
					</motion.div>
				</div>
			</Container>
		</main>
	);
}
