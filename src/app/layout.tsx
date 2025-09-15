import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: {
		default: "Irfan Nuha | Blog & Creative Works",
		template: "%s | Irfan Nuha",
	},
	description:
		"Discover the writings, projects, and creative works of Irfan Nuha. A modern platform built with Next.js, sharing articles, experiments, and personal insights.",
	keywords: [
		"Irfan Nuha",
		"personal blog",
		"creative works",
		"portfolio",
		"articles",
		"writing",
		"thoughts",
		"experiments",
		"ideas",
		"Next.js",
		"Supabase",
		"TailwindCSS",
		"TypeScript",
		"developer blog",
		"modern web",
	],
	authors: [{ name: "Irfan Nuha", url: process.env.NEXT_PUBLIC_APP_URL }],
	creator: "Irfan Nuha",
	publisher: "Irfan Nuha",
	metadataBase: new URL(
		process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
	),
	openGraph: {
		type: "website",
		locale: "en_US",
		url: process.env.NEXT_PUBLIC_APP_URL,
		title: "Irfan Nuha | Blog & Creative Works",
		description:
			"Explore the blog and creative works of Irfan Nuha. A modern platform powered by Next.js with a focus on writing, projects, and personal exploration.",
		siteName: "Irfan Nuha",
		images: [
			{
				url: "/og.png", // put a custom OG image in /public
				width: 1200,
				height: 630,
				alt: "Irfan Nuha | Blog & Creative Works",
			},
		],
	},

	icons: {
		icon: [
			{ url: "/favicon.ico", sizes: "any" },
			{ url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
			{ url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
		],
		shortcut: "/favicon-16x16.png",
		apple: [
			{ url: "/apple-touch-icon.png" },
			{ url: "/apple-touch-icon-152x152.png", sizes: "152x152" },
			{ url: "/apple-touch-icon-180x180.png", sizes: "180x180" },
		],
	},
	manifest: "/site.webmanifest",
	alternates: {
		canonical: process.env.NEXT_PUBLIC_APP_URL,
	},
	other: {
		sitemap: `${process.env.NEXT_PUBLIC_APP_URL}/sitemap.xml`,
		robots: "index, follow",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange>
					<div className="relative flex min-h-screen flex-col">
						<Header />
						<main className="flex-1">{children}</main>
						<Footer />
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
