"use client";

import * as React from "react";
import { HomeHero } from "@/components/home/hero";
import { HomeAbout } from "@/components/home/about";
import { HomeCoreInterests } from "@/components/home/core-interest";

export default function Homepage() {
	const [_isVisible, setIsVisible] = React.useState(false);

	React.useEffect(() => {
		setIsVisible(true);
	}, []);

	return (
		<main className="relative min-h-screen overflow-hidden">
			{/* Background Blobs */}

			{/* Content */}
			<HomeHero />

			<HomeAbout />

			<HomeCoreInterests />
		</main>
	);
}
