import { Metadata } from "next";
import { PERSONAL_INFO } from "@/constants/home";
import ProjectsPage from "@/components/projects/projects-page";

export const metadata: Metadata = {
  title: "Projects",
  description: `Get in touch with ${PERSONAL_INFO.name}. I'd love to hear from you and answer any questions you may have.`,
  openGraph: {
    title: `Projects | ${PERSONAL_INFO.name}`,
    description: `Get in touch with ${PERSONAL_INFO.name}. I'd love to hear from you and answer any questions you may have.`,
  },
};

export default function Page() {
  return <ProjectsPage />;
}
