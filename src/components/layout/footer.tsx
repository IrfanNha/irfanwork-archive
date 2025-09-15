"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Heart, Mail, ArrowUp, Sparkles } from "lucide-react";
import {
	FOOTER_LINKS,
	SOCIAL_LINKS,
	SITE_CONFIG,
	ANIMATION_VARIANTS,
	MOTION,
} from "@/constants/index";

export function Footer() {
	const [email, setEmail] = React.useState("");
	const [isSubscribed, setIsSubscribed] = React.useState(false);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const handleSubscribe = (e: React.FormEvent) => {
		e.preventDefault();
		if (email) {
			setIsSubscribed(true);
			setEmail("");
			setTimeout(() => setIsSubscribed(false), 3000);
		}
	};

	return (
		<footer className="px-4 mx-auto w-full max-w-7xl border-t border-yellow-500/20 bg-gradient-to-br from-background to-yellow-500/5">
			{/* Back to top button */}
			<motion.button
				onClick={scrollToTop}
				className="fixed bottom-8 right-8 z-50 h-12 w-12 rounded-full bg-yellow-500 text-black shadow-lg shadow-yellow-500/25 hover:shadow-xl hover:shadow-yellow-500/40 transition-all duration-300"
				whileHover={{ scale: 1.1, rotate: 180 }}
				whileTap={{ scale: 0.9 }}
				initial={{ opacity: 0, y: 100 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 1 }}>
				<ArrowUp className="h-5 w-5 mx-auto" />
			</motion.button>

			<div className="container py-16">
				{/* Newsletter Section */}
				<motion.div
					className="mb-16 text-center"
					variants={ANIMATION_VARIANTS.fadeIn}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					transition={{ duration: MOTION.MEDIUM }}>
					<div className="max-w-md mx-auto">
						<motion.div
							className="flex items-center justify-center gap-2 mb-4"
							variants={ANIMATION_VARIANTS.slideUp}>
							<Sparkles className="h-5 w-5 text-yellow-500" />
							<h3 className="text-xl font-semibold">
								Stay Updated
							</h3>
						</motion.div>

						<motion.p
							className="text-muted-foreground mb-6"
							variants={ANIMATION_VARIANTS.slideUp}
							transition={{ delay: 0.1 }}>
							Get the latest articles and insights delivered to
							your inbox.
						</motion.p>

						<motion.form
							onSubmit={handleSubscribe}
							className="flex gap-2"
							variants={ANIMATION_VARIANTS.slideUp}
							transition={{ delay: 0.2 }}>
							<Input
								type="email"
								placeholder="Enter your email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="flex-1 border-yellow-500/20 focus:border-yellow-500/40"
								disabled={isSubscribed}
							/>
							<Button
								type="submit"
								size="sm"
								className="bg-yellow-500 hover:bg-yellow-600 text-black shadow-lg shadow-yellow-500/25"
								disabled={isSubscribed}>
								{isSubscribed ? (
									<motion.span
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
										className="flex items-center gap-1">
										✓ Subscribed!
									</motion.span>
								) : (
									<>
										<Mail className="h-4 w-4 mr-1" />
										Subscribe
									</>
								)}
							</Button>
						</motion.form>
					</div>
				</motion.div>

				<Separator className="mb-12 bg-yellow-500/20" />

				{/* Main Footer Content */}
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
					{/* Brand Section */}
					<motion.div
						className="lg:col-span-2"
						variants={ANIMATION_VARIANTS.slideInLeft}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						transition={{ duration: MOTION.MEDIUM }}>
						<Link
							href="/"
							className="flex items-center space-x-2 mb-4">
							<motion.div
								className="h-8 w-8 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg"
								whileHover={{ rotate: 360, scale: 1.1 }}
								transition={{ duration: 0.6 }}>
								<Sparkles className="h-4 w-4 text-white" />
							</motion.div>
							<span className="text-lg font-bold">
								{SITE_CONFIG.name}
							</span>
						</Link>
						<p className="text-muted-foreground mb-4 max-w-sm">
							{SITE_CONFIG.description}
						</p>
						<div className="flex gap-3">
							{SOCIAL_LINKS.map((social) => (
								<motion.a
									key={social.label}
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									className="h-10 w-10 flex items-center justify-center rounded-full border border-yellow-500/20 hover:bg-yellow-500/10 transition"
									whileHover={{ scale: 1.15 }}
									whileTap={{ scale: 0.95 }}>
									<social.icon className="h-5 w-5" />
								</motion.a>
							))}
						</div>
					</motion.div>

					{/* Footer Links */}
					{Object.entries(FOOTER_LINKS).map(([section, links], i) => (
						<motion.div
							key={section}
							variants={ANIMATION_VARIANTS.slideUp}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
							transition={{ delay: i * 0.1 }}>
							<h4 className="font-semibold mb-4 capitalize">
								{section}
							</h4>
							<ul className="space-y-2">
								{links.map((link) => (
									<li key={link.href}>
										<Link
											href={link.href}
											className="text-muted-foreground hover:text-yellow-500 transition">
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</motion.div>
					))}
				</div>

				<Separator className="my-12 bg-yellow-500/20" />

				{/* Bottom Section */}
				<motion.div
					className="flex flex-col md:flex-row items-center justify-between gap-4"
					variants={ANIMATION_VARIANTS.fadeIn}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					transition={{ duration: MOTION.SLOW }}>
					<p className="text-sm text-muted-foreground flex items-center gap-1">
						Made with <Heart className="h-4 w-4 text-red-500" /> by{" "}
						<span className="font-medium">
							{SITE_CONFIG.author}
						</span>
					</p>
					<Badge
						variant="outline"
						className="border-yellow-500/40 text-yellow-600">
						© {new Date().getFullYear()} {SITE_CONFIG.name}. All
						rights reserved.
					</Badge>
				</motion.div>
			</div>
		</footer>
	);
}
