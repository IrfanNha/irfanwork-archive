import { Metadata } from "next";
import { PERSONAL_INFO } from "@/constants/home";
import { TosContent } from "@/components/legal/tos-content";

export const metadata: Metadata = {
  title: "Legal - Terms of Service",
  description: PERSONAL_INFO.fullBio,
  openGraph: {
    title: `Privacy | ${PERSONAL_INFO.name}`,
    description: PERSONAL_INFO.fullBio,
  },
};

export default function TOSPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <TosContent />
    </main>
  );
}
