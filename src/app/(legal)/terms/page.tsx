import { Metadata } from "next";
import { PERSONAL_INFO } from "@/constants/home";

export const metadata: Metadata = {
  title: "Legal - Terms of Service",
  description: PERSONAL_INFO.fullBio,
  openGraph: {
    title: `Terms | ${PERSONAL_INFO.name}`,
    description: PERSONAL_INFO.fullBio,
  },
};

export default function TermsPage() {
  return <div className="min-h-screen bg-background"></div>;
}
