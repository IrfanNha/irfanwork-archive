// constants/site.ts
export const SITE_CONFIG = {
  name: "IrfanWork",
  description: "Full Stack Developer & Digital Innovator",
  tagline: "Create. Share. Inspire.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  keywords: ["blog", "nextjs", "supabase", "typescript", "tailwindcss", "cms"],
  author: "Irfan",
  social: {
    github: "https://github.com/IrfanNha",
    twitter: "https://twitter.com/",
    linkedin: "https://linkedin.com/in/irfan-nuha",
    email: "irfannuha@protonmail.com",
  },
} as const;
