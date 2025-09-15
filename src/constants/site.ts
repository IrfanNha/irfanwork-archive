// constants/site.ts
export const SITE_CONFIG = {
  name: "IrfanWork",
  description: "A modern blog platform built with Next.js and Supabase",
  tagline: "Create. Share. Inspire.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  keywords: ["blog", "nextjs", "supabase", "typescript", "tailwindcss", "cms"],
  author: "Irfan",
  social: {
    github: "https://github.com/yourusername",
    twitter: "https://twitter.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    email: "hello@yoursite.com",
  },
} as const;
