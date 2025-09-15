"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

import {
	Github,
	Star,
	GitFork,
	Calendar,
	Code,
	AlertCircle,
	Loader2,
} from "lucide-react";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "../ui/table";

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
		<section className="space-y-8 py-16">
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

			<motion.div
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.3 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
				className="grid md:grid-cols-2 gap-8 items-start">
				{/* User Profile */}
				<AnimatePresence>
					{user && (
						<motion.div
							key="user-profile"
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.9 }}
							transition={{ duration: 0.6, ease: "easeOut" }}
							className="flex flex-col items-center gap-6 p-6 rounded-2xl">
							{/* Avatar */}
							<motion.div
								whileHover={{ scale: 1.1, rotate: 2 }}
								transition={{ type: "spring", stiffness: 200 }}
								className="relative">
								<div className="absolute inset-0 rounded-fullanimate-pulse" />
								<img
									src={user.avatar_url}
									alt={user.name}
									className="relative w-28 h-28 rounded-full border-2 border-yellow-500/40"
								/>
							</motion.div>

							{/* Name & Bio */}
							<div className="text-center space-y-2">
								<h3 className="text-2xl font-bold flex items-center justify-center gap-2">
									<Github className="w-6 h-6 text-yellow-600" />
									<span className="bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">
										{user.name || user.login}
									</span>
								</h3>
								{user.bio && (
									<motion.p
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											delay: 0.3,
											duration: 0.6,
										}}
										className="text-muted-foreground max-w-md mx-auto">
										{user.bio}
									</motion.p>
								)}
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Stats Table */}
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
					className="overflow-hidden rounded-xl border border-border bg-card/80 backdrop-blur-md shadow-xl">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-12"></TableHead>
								<TableHead>Statistic</TableHead>
								<TableHead className="text-right">
									Value
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow>
								<TableCell>
									<Code className="w-4 h-4 text-yellow-600" />
								</TableCell>
								<TableCell>Repositories</TableCell>
								<TableCell className="text-right font-semibold">
									{user?.public_repos}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<Star className="w-4 h-4 text-yellow-600" />
								</TableCell>
								<TableCell>Total Stars</TableCell>
								<TableCell className="text-right font-semibold">
									{repos.reduce(
										(acc, r) => acc + r.stargazers_count,
										0
									)}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<GitFork className="w-4 h-4 text-yellow-600" />
								</TableCell>
								<TableCell>Total Forks</TableCell>
								<TableCell className="text-right font-semibold">
									{repos.reduce(
										(acc, r) => acc + r.forks_count,
										0
									)}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<Github className="w-4 h-4 text-yellow-600" />
								</TableCell>
								<TableCell>Followers</TableCell>
								<TableCell className="text-right font-semibold">
									{user?.followers}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<Github className="w-4 h-4 text-yellow-600" />
								</TableCell>
								<TableCell>Following</TableCell>
								<TableCell className="text-right font-semibold">
									{user?.following}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<Calendar className="w-4 h-4 text-yellow-600" />
								</TableCell>
								<TableCell>Last Activity</TableCell>
								<TableCell className="text-right font-semibold">
									{repos[0]
										? new Date(
												repos[0].updated_at
											).toLocaleDateString("en-US", {
												month: "short",
												day: "numeric",
												year: "numeric",
											})
										: "N/A"}
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</motion.div>
			</motion.div>
		</section>
	);
}
