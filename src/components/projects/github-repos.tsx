"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Github,
	Star,
	GitFork,
	ExternalLink,
	Calendar,
	Code,
	AlertCircle,
	Loader2,
} from "lucide-react";

interface GitHubRepo {
	id: number;
	name: string;
	full_name: string;
	description: string | null;
	html_url: string;
	language: string | null;
	stargazers_count: number;
	forks_count: number;
	created_at: string;
	updated_at: string;
	topics: string[];
	visibility: string;
	default_branch: string;
}

interface GitHubUser {
	login: string;
	name: string;
	bio: string | null;
	public_repos: number;
	followers: number;
	following: number;
	avatar_url: string;
}

export function GitHubRepos() {
	const [repos, setRepos] = React.useState<GitHubRepo[]>([]);
	const [user, setUser] = React.useState<GitHubUser | null>(null);
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState<string | null>(null);
	const [sortBy, setSortBy] = React.useState<"updated" | "stars" | "name">(
		"updated"
	);
	const [filterLanguage, setFilterLanguage] = React.useState<string>("all");

	const username = "IrfanNha";

	React.useEffect(() => {
		const fetchGitHubData = async () => {
			try {
				setLoading(true);
				setError(null);

				// Fetch user data
				const userResponse = await fetch(
					`https://api.github.com/users/${username}`
				);
				if (!userResponse.ok) throw new Error("User not found");
				const userData: GitHubUser = await userResponse.json();
				setUser(userData);

				// Fetch repositories
				const reposResponse = await fetch(
					`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
				);
				if (!reposResponse.ok)
					throw new Error("Failed to fetch repositories");
				const reposData: GitHubRepo[] = await reposResponse.json();
				setRepos(reposData);
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "An error occurred"
				);
			} finally {
				setLoading(false);
			}
		};

		fetchGitHubData();
	}, []);

	// Get unique languages
	const languages = Array.from(
		new Set(repos.map((repo) => repo.language).filter(Boolean))
	);

	// Filter and sort repos
	const filteredAndSortedRepos = repos
		.filter(
			(repo) =>
				filterLanguage === "all" || repo.language === filterLanguage
		)
		.sort((a, b) => {
			switch (sortBy) {
				case "stars":
					return b.stargazers_count - a.stargazers_count;
				case "name":
					return a.name.localeCompare(b.name);
				case "updated":
				default:
					return (
						new Date(b.updated_at).getTime() -
						new Date(a.updated_at).getTime()
					);
			}
		});

	const getLanguageColor = (language: string | null) => {
		const colors: Record<string, string> = {
			JavaScript: "bg-yellow-500",
			TypeScript: "bg-blue-500",
			Python: "bg-green-500",
			Java: "bg-red-500",
			"C++": "bg-purple-500",
			HTML: "bg-orange-500",
			CSS: "bg-pink-500",
			PHP: "bg-indigo-500",
			Go: "bg-cyan-500",
			Rust: "bg-amber-600",
		};
		return colors[language || ""] || "bg-gray-500";
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};

	if (loading) {
		return (
			<div className="flex flex-col items-center justify-center py-16 space-y-4">
				<Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
				<p className="text-muted-foreground">
					Loading repositories from GitHub...
				</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex flex-col items-center justify-center py-16 space-y-4">
				<div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
					<AlertCircle className="w-8 h-8 text-red-500" />
				</div>
				<h3 className="text-lg font-semibold">
					Failed to load repositories
				</h3>
				<p className="text-muted-foreground text-center max-w-md">
					{error}. Please check the username or try again later.
				</p>
				<Button
					onClick={() => window.location.reload()}
					variant="outline"
					className="border-yellow-500/20 hover:border-yellow-500/40">
					Try Again
				</Button>
			</div>
		);
	}

	return (
		<section className="space-y-8">
			{/* Section Header */}
			<motion.div
				className="text-center space-y-4"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}>
				<h2 className="text-2xl md:text-3xl font-bold">
					<span className="bg-gradient-to-r from-foreground to-yellow-600 bg-clip-text text-transparent">
						GitHub Repositories
					</span>
				</h2>
				<div className="w-16 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full" />
			</motion.div>

			{/* User Profile Header */}
			{user && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
					className="text-center space-y-4 py-6">
					<div className="flex flex-col md:flex-row items-center gap-6 max-w-2xl mx-auto">
						<img
							src={user.avatar_url}
							alt={user.name}
							className="w-20 h-20 rounded-full border-2 border-yellow-500/30"
						/>
						<div className="text-center md:text-left">
							<h3 className="text-xl font-bold flex items-center gap-2 justify-center md:justify-start">
								<Github className="w-5 h-5" />
								{user.name || user.login}
							</h3>
							{user.bio && (
								<p className="text-muted-foreground mt-2">
									{user.bio}
								</p>
							)}
							<div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground justify-center md:justify-start">
								<span>{user.public_repos} repositories</span>
								<span>{user.followers} followers</span>
								<span>{user.following} following</span>
							</div>
						</div>
					</div>
				</motion.div>
			)}

			{/* Filters */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3 }}
				className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-yellow-500/10">
				<div className="flex items-center gap-2 text-sm">
					<span className="text-muted-foreground">Sort by:</span>
					<select
						value={sortBy}
						onChange={(e) => setSortBy(e.target.value as any)}
						className="bg-background border border-yellow-500/20 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/20">
						<option value="updated">Last Updated</option>
						<option value="stars">Most Stars</option>
						<option value="name">Name</option>
					</select>
				</div>

				<div className="flex items-center gap-2 text-sm">
					<span className="text-muted-foreground">Filter:</span>
					<select
						value={filterLanguage}
						onChange={(e) => setFilterLanguage(e.target.value)}
						className="bg-background border border-yellow-500/20 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/20">
						<option value="all">All Languages</option>
						{languages.map((lang) => (
							<option key={lang} value={lang ?? ""}>
								{lang}
							</option>
						))}
					</select>
				</div>

				<div className="text-sm text-muted-foreground">
					{filteredAndSortedRepos.length} of {repos.length}{" "}
					repositories
				</div>
			</motion.div>

			{/* Repositories Grid */}
			<AnimatePresence>
				<div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
					{filteredAndSortedRepos.map((repo, index) => (
						<motion.div
							key={repo.id}
							initial={{ opacity: 0, y: 30, scale: 0.9 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, scale: 0.9, y: -20 }}
							transition={{ duration: 0.4, delay: index * 0.1 }}
							whileHover={{ y: -4 }}
							className="h-full">
							<Card className="h-full flex flex-col border-yellow-500/20 bg-card/80 backdrop-blur-sm hover:border-yellow-500/40 transition-all duration-300 group">
								<CardHeader className="space-y-2 pb-4">
									<div className="flex items-start justify-between gap-2">
										<CardTitle className="text-lg font-semibold line-clamp-1 group-hover:text-yellow-600 transition-colors">
											{repo.name}
										</CardTitle>
										<Badge
											variant={
												repo.visibility === "public"
													? "secondary"
													: "destructive"
											}
											className="text-xs">
											{repo.visibility}
										</Badge>
									</div>

									<CardDescription className="line-clamp-3 text-sm leading-relaxed h-[4.5rem] overflow-hidden">
										{repo.description ||
											"No description available"}
									</CardDescription>
								</CardHeader>

								<CardContent className="space-y-4 flex-1 flex flex-col pt-0">
									{/* Language and Stats */}
									<div className="space-y-2">
										<div className="flex items-center gap-2 flex-wrap">
											{repo.language && (
												<div className="flex items-center gap-1">
													<div
														className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`}
													/>
													<span className="text-xs text-muted-foreground">
														{repo.language}
													</span>
												</div>
											)}
											<div className="flex items-center gap-1 text-muted-foreground">
												<Star className="w-3 h-3" />
												<span className="text-xs">
													{repo.stargazers_count}
												</span>
											</div>
											<div className="flex items-center gap-1 text-muted-foreground">
												<GitFork className="w-3 h-3" />
												<span className="text-xs">
													{repo.forks_count}
												</span>
											</div>
										</div>

										{repo.topics &&
											repo.topics.length > 0 && (
												<div className="flex flex-wrap gap-1 h-[3rem] overflow-hidden">
													{repo.topics
														.slice(0, 3)
														.map((topic) => (
															<Badge
																key={topic}
																variant="outline"
																className="text-xs border-yellow-500/20 text-yellow-600">
																{topic}
															</Badge>
														))}
													{repo.topics.length > 3 && (
														<Badge
															variant="outline"
															className="text-xs border-muted text-muted-foreground">
															+
															{repo.topics
																.length - 3}
														</Badge>
													)}
												</div>
											)}
									</div>

									{/* Updated date */}
									<div className="flex items-center gap-1 text-xs text-muted-foreground">
										<Calendar className="w-3 h-3" />
										<span>
											Updated{" "}
											{formatDate(repo.updated_at)}
										</span>
									</div>

									{/* Action button */}
									<div className="mt-auto">
										<Button
											variant="outline"
											size="sm"
											className="w-full border-yellow-500/20 hover:border-yellow-500/40 hover:bg-yellow-500/5 group/btn"
											asChild>
											<a
												href={repo.html_url}
												target="_blank"
												rel="noopener noreferrer">
												<ExternalLink className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
												View Repository
											</a>
										</Button>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>
			</AnimatePresence>

			{filteredAndSortedRepos.length === 0 && !loading && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="text-center py-16 space-y-4">
					<div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-yellow-400/20 to-yellow-600/30 flex items-center justify-center">
						<Code className="w-8 h-8 text-yellow-600" />
					</div>
					<h3 className="text-xl font-semibold">
						No repositories found
					</h3>
					<p className="text-muted-foreground max-w-md mx-auto">
						No repositories match the current filter. Try changing
						the language filter or sort option.
					</p>
				</motion.div>
			)}
		</section>
	);
}
