import { Metadata } from "next";
import { PERSONAL_INFO } from "@/constants/home";

export const metadata: Metadata = {
  title: "Legal - Privacy Policy",
  description: PERSONAL_INFO.fullBio,
  openGraph: {
    title: `Privacy | ${PERSONAL_INFO.name}`,
    description: PERSONAL_INFO.fullBio,
  },
};

export default function PrivacyPage() {
  return <div className="min-h-screen bg-background"></div>;
}
