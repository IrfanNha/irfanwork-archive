"use client";

import * as React from "react";
import { motion } from "framer-motion";

export function BackgroundBlobs() {
	const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
	const [windowSize, setWindowSize] = React.useState({ w: 0, h: 0 });

	React.useEffect(() => {
		// Update ukuran window ketika mount
		if (typeof window !== "undefined") {
			setWindowSize({ w: window.innerWidth, h: window.innerHeight });
		}

		const handleResize = () => {
			setWindowSize({ w: window.innerWidth, h: window.innerHeight });
		};

		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY });
		};

		window.addEventListener("resize", handleResize);
		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			window.removeEventListener("resize", handleResize);
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	const parallaxX =
		windowSize.w > 0 ? (mousePosition.x - windowSize.w / 2) * 0.02 : 0;
	const parallaxY =
		windowSize.h > 0 ? (mousePosition.y - windowSize.h / 2) * 0.02 : 0;

	return (
		<div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
			{/* Main gradient background */}
			<motion.div
				className="absolute inset-0 bg-gradient-to-br from-background via-background to-yellow-500/5"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1.2 }}
			/>

			{/* Large animated blobs */}
			<motion.div
				className="absolute top-1/4 left-1/4 w-72 h-72 bg-yellow-300/10 rounded-full blur-3xl animate-pulse"
				style={{
					transform: `translate(${parallaxX * 0.5}px, ${parallaxY * 0.5}px)`,
				}}
				initial={{ scale: 0, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 1.5, delay: 0.2 }}
			/>

			<motion.div
				className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-300/10 rounded-full blur-3xl animate-pulse"
				style={{
					transform: `translate(${parallaxX * -0.3}px, ${parallaxY * -0.3}px)`,
				}}
				initial={{ scale: 0, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 1.5, delay: 0.4 }}
			/>

			{/* Additional floating blobs */}
			<motion.div
				className="absolute top-1/2 right-1/3 w-64 h-64 bg-yellow-400/6 rounded-full blur-3xl"
				style={{
					transform: `translate(${parallaxX * 0.8}px, ${parallaxY * 0.8}px)`,
				}}
				animate={{
					scale: [1, 1.1, 1],
					opacity: [0.15, 0.25, 0.15],
				}}
				transition={{
					duration: 8,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			/>

			<motion.div
				className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-yellow-300/8 rounded-full blur-3xl"
				style={{
					transform: `translate(${parallaxX * -0.6}px, ${parallaxY * -0.6}px)`,
				}}
				animate={{
					scale: [1, 1.2, 1],
					opacity: [0.08, 0.18, 0.08],
				}}
				transition={{
					duration: 10,
					repeat: Infinity,
					ease: "easeInOut",
					delay: 2,
				}}
			/>

			{/* Smaller accent blobs */}
			<motion.div
				className="absolute top-20 right-20 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl"
				style={{
					transform: `translate(${parallaxX * 1.2}px, ${parallaxY * 1.2}px)`,
				}}
				animate={{
					y: [0, -20, 0],
					scale: [1, 1.1, 1],
				}}
				transition={{
					duration: 6,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			/>

			<motion.div
				className="absolute bottom-20 left-20 w-40 h-40 bg-yellow-600/12 rounded-full blur-2xl"
				style={{
					transform: `translate(${parallaxX * -1.0}px, ${parallaxY * -1.0}px)`,
				}}
				animate={{
					y: [0, 15, 0],
					scale: [1, 1.15, 1],
				}}
				transition={{
					duration: 7,
					repeat: Infinity,
					ease: "easeInOut",
					delay: 1,
				}}
			/>

			{/* Floating particles */}
			{Array.from({ length: 8 }).map((_, i) => (
				<motion.div
					key={i}
					className="absolute w-2 h-2 rounded-full bg-yellow-500/40 blur-sm"
					style={{
						top: `${15 + i * 12}%`,
						left: `${8 + i * 11}%`,
						transform: `translate(${parallaxX * (0.3 + i * 0.1)}px, ${parallaxY * (0.3 + i * 0.1)}px)`,
					}}
					animate={{
						y: [0, -25, 0],
						opacity: [0.2, 0.8, 0.2],
						scale: [0.8, 1.2, 0.8],
					}}
					transition={{
						y: {
							duration: 4 + i * 0.5,
							repeat: Infinity,
							ease: "easeInOut",
							delay: i * 0.3,
						},
						opacity: {
							duration: 3 + i * 0.4,
							repeat: Infinity,
							ease: "easeInOut",
							delay: i * 0.2,
						},
						scale: {
							duration: 3.5 + i * 0.3,
							repeat: Infinity,
							ease: "easeInOut",
							delay: i * 0.4,
						},
					}}
				/>
			))}

			{/* Gradient overlays for depth */}
			<motion.div
				className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-background/10"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 2, delay: 0.5 }}
			/>
		</div>
	);
}
