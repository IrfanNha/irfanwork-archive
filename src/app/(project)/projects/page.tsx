import { Metadata } from "next";
import { PERSONAL_INFO } from "@/constants/home";
import ProjectsPage from "@/components/projects/projects-page";

export const metadata: Metadata = {
  title: "Projects",
  description: `Explore shipped products, experiments, and tools crafted by ${PERSONAL_INFO.name}.`,
  openGraph: {
    title: `Projects | ${PERSONAL_INFO.name}`,
    description: `Explore shipped products, experiments, and tools crafted by ${PERSONAL_INFO.name}.`,
  },
};

export default function Page() {
  return <ProjectsPage />;
}
