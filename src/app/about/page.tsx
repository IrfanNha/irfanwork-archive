import { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { AboutHero } from "@/components/about/about-hero";
import { AboutStory } from "@/components/about/about-story";
import { AboutTimeline } from "@/components/about/about-timeline";
import { AboutSkills } from "@/components/about/about-skills";
import { AboutValues } from "@/components/about/about-values";
import { AboutStats } from "@/components/about/about-stats";
import { PERSONAL_INFO } from "@/constants/home";

export const metadata: Metadata = {
  title: "About",
  description: PERSONAL_INFO.fullBio,
  openGraph: {
    title: `About | ${PERSONAL_INFO.name}`,
    description: PERSONAL_INFO.fullBio,
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Container>
        <div className="py-12 md:py-16 lg:py-20">
          {/* Hero Section */}
          <AboutHero />

          {/* Stats Section */}
          <AboutStats />

          {/* Story Section */}
          <AboutStory />

          {/* Timeline Section */}
          <AboutTimeline />

          {/* Skills Section */}
          <AboutSkills />

          {/* Values Section */}
          <AboutValues />
        </div>
      </Container>
    </div>
  );
}
