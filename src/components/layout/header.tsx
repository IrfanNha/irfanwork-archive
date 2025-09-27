"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeDropdown } from "@/components/ui/theme-dropdown";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Menu, Search, Sparkles } from "lucide-react";
import {
	MAIN_NAV,
	SITE_CONFIG,
	ANIMATION_VARIANTS,
	MOTION,
} from "@/constants/index";
import { cn } from "@/lib/utils";
import { Container } from "../ui/container";
import { useSearch } from "@/contexts/search-context";

export function Header() {
	const pathname = usePathname();
	const { openSearch } = useSearch();
	const [isScrolled, setIsScrolled] = React.useState(false);

	// Handle scroll effect
	React.useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<motion.header
			className={cn(
				"sticky top-0 z-50 w-full transition-all duration-300 mx-auto",
				isScrolled
					? "bg-background/80 backdrop-blur-md border-b border-yellow-500/20 shadow-lg shadow-yellow-500/5"
					: "bg-background/60 backdrop-blur-sm border-b border-border"
			)}
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{
				duration: MOTION.MEDIUM,
				type: "spring",
				stiffness: 100,
			}}>
			<Container>
				<div>
					<div className="container flex h-16 items-center justify-between">
						{/* Logo Section */}
						<motion.div
							className="flex items-center space-x-4"
							variants={ANIMATION_VARIANTS.slideInLeft}
							initial="hidden"
							animate="visible"
							transition={{ duration: MOTION.MEDIUM }}>
							<Link
								href="/"
								className="group flex items-center space-x-2">
								<motion.div
									className="relative"
									whileHover={{ rotate: 360 }}
									transition={{
										duration: MOTION.SLOW,
										ease: "easeInOut",
									}}>
									<div className="h-8 w-8 rounded-lg flex items-center justify-center">
										<Sparkles className="h-6 w-6  text-yellow-500" />
									</div>

									{/* Glow effect */}
									<motion.div
										className="absolute inset-0 rounded-lg bg-yellow-400/20 blur-lg"
										initial={{ opacity: 0, scale: 0.8 }}
										whileHover={{ opacity: 1, scale: 1.2 }}
										transition={{ duration: MOTION.MEDIUM }}
									/>
								</motion.div>

								<motion.span
									className="text-xl font-bold text-yellow-500 group-hover:text-yellow-500 transition-all duration-300"
									whileHover={{ scale: 1.05 }}
									transition={{ duration: MOTION.FAST }}>
									{SITE_CONFIG.name}
								</motion.span>
							</Link>
						</motion.div>

						{/* Desktop Navigation */}
						<motion.nav
							className="hidden md:flex items-center space-x-1"
							variants={ANIMATION_VARIANTS.stagger}
							initial="hidden"
							animate="visible">
							{MAIN_NAV.map((item, index) => {
								const isActive = pathname === item.href;
								const Icon = item.icon;

								return (
									<motion.div
										key={item.href}
										variants={ANIMATION_VARIANTS.slideUp}
										transition={{ delay: index * 0.1 }}
										whileHover={{ y: -2 }}
										whileTap={{ y: 0 }}>
										<Link href={item.href}>
											<Button
												variant={
													isActive
														? "default"
														: "ghost"
												}
												size="sm"
												className={cn(
													"relative group transition-all duration-300",
													isActive
														? "bg-yellow-500 text-white hover:bg-yellow-600 shadow-lg shadow-yellow-500/25"
														: "hover:bg-yellow-500/10 hover:text-yellow-600 border border-transparent hover:border-yellow-500/20"
												)}>
												{Icon && (
													<Icon className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
												)}
												{item.label}

												{/* Active indicator */}
												{isActive && (
													<motion.div
														className="absolute -bottom-2 left-1/2 w-1 h-1 bg-yellow-600 rounded-full"
														layoutId="activeNav"
														initial={{ scale: 0 }}
														animate={{ scale: 1 }}
														transition={{
															duration:
																MOTION.FAST,
														}}
													/>
												)}

												{/* Hover shine effect */}
												<motion.span
													className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-yellow-500/5 to-transparent"
													whileHover={{
														x: ["-100%", "100%"], // keyframes, smooth
													}}
													transition={{
														duration: 0.8,
														ease: "easeInOut",
													}}
												/>
											</Button>
										</Link>
									</motion.div>
								);
							})}
						</motion.nav>

						{/* Search & Actions */}
						<motion.div
							className="flex items-center space-x-2"
							variants={ANIMATION_VARIANTS.slideInRight}
							initial="hidden"
							animate="visible"
							transition={{ duration: MOTION.MEDIUM }}>
							{/* Search Toggle */}
							<motion.div
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="relative group">
								<Button
									variant="ghost"
									size="sm"
									className="h-8 w-8 px-0 hover:bg-yellow-500/10 hover:text-yellow-600 border border-transparent hover:border-yellow-500/20"
									onClick={openSearch}>
									<Search className="h-4 w-4" />
								</Button>
								
								{/* Keyboard shortcut indicator */}
								<div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
									<div className="bg-foreground text-background text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
										Press <kbd className="px-1 py-0.5 bg-background/20 rounded text-xs">⌘K</kbd> to search
									</div>
								</div>
							</motion.div>

							{/* Theme Dropdown */}
							<ThemeDropdown />

							{/* Mobile Menu */}
							<Sheet>
								<SheetTrigger asChild>
									<motion.div
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										className="md:hidden">
										<Button
											variant="ghost"
											size="sm"
											className="h-8 w-8 px-0 hover:bg-yellow-500/10 hover:text-yellow-600">
											<Menu className="h-4 w-4" />
										</Button>
									</motion.div>
								</SheetTrigger>

								<SheetContent
									side="right"
									className="w-80 border-yellow-500/20">
									<SheetHeader>
										<SheetTitle className="flex items-center gap-2">
											<div className="h-6 w-6 rounded bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
												<Sparkles className="h-3 w-3 text-white" />
											</div>
											{SITE_CONFIG.name}
										</SheetTitle>

										<SheetDescription className="text-sm text-muted-foreground">
											Navigate through the sections using
											the menu below.
										</SheetDescription>
									</SheetHeader>

									<Container>
										<nav className="flex flex-col space-y-3 mt-6">
											{MAIN_NAV.map((item, index) => {
												const Icon = item.icon;
												const isActive =
													pathname === item.href;

												return (
													<motion.div
														key={item.href}
														initial={{
															opacity: 0,
															x: -20,
														}}
														animate={{
															opacity: 1,
															x: 0,
														}}
														transition={{
															delay: index * 0.1,
														}}>
														<Link href={item.href}>
															<Button
																variant={
																	isActive
																		? "default"
																		: "ghost"
																}
																size="sm"
																className={cn(
																	"w-full justify-start py-5",
																	isActive
																		? "bg-yellow-500 hover:bg-yellow-600 text-white"
																		: "hover:bg-yellow-500/10 hover:text-yellow-600"
																)}>
																{Icon && (
																	<Icon className="mr-3 h-4 w-4" />
																)}
																<div className="text-left">
																	<div className="font-medium">
																		{
																			item.label
																		}
																	</div>
																	{item.description && (
																		<div
																			className={cn(
																				"text-xs",
																				isActive
																					? "text-muted"
																					: "text-muted-foreground"
																			)}>
																			{
																				item.description
																			}
																		</div>
																	)}
																</div>
															</Button>
														</Link>
													</motion.div>
												);
											})}
										</nav>
									</Container>
								</SheetContent>
							</Sheet>
						</motion.div>
					</div>
				</div>

			</Container>
		</motion.header>
	);
}
