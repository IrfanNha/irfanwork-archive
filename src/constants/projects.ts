// Type-safe tech stack keys
export const TECH_STACK = [
  "Next.js",
  "TypeScript",
  "React",
  "Node.js",
  "Express",
  "Tailwind CSS",
  "Prisma",
  "PostgreSQL",
  "MongoDB",
  "Framer Motion",
  "shadcn/ui",
  "elliptic",
  "crypto",
  "shadcn",
  "FingerprintJS",
] as const;

export type TechStack = (typeof TECH_STACK)[number];

export type Project = {
  id: string;
  slug: string;
  name: string;
  description: string;
  tech: TechStack[];
  category: "web" | "app" | "tool" | "other" | "content";
  url: string;
  liveUrl: string;
  image: string;
};

export const PROJECTS: Project[] = [
  {
    id: "1",
    slug: "portfolio",
    name: "Portfolio Website",
    description:
      "Personal portfolio built with Next.js, Tailwind CSS & Framer Motion.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    category: "web",
    url: "https://github.com/IrfanNha/irfanwork",
    liveUrl: "https://irfanwork.vercel.app",
    image: "/projects/portfolio.png",
  },
  {
    id: "2",
    slug: "quran-app",
    name: "Quran App",
    description:
      "A web application to read, search, and bookmark Quranic verses. Fully responsive and optimized for mobile.",
    tech: ["Next.js", "TypeScript", "React", "Tailwind CSS", "shadcn/ui"],
    category: "web",
    url: "https://github.com/IrfanNha/quran-app",
    liveUrl: "https://quran-app-irfanwork.vercel.app",
    image: "/projects/quran-app.png",
  },
  {
    id: "3",
    slug: "btc-address-generator",
    name: "BTC Address Generator",
    description:
      "Web-based Bitcoin address generator using elliptic curve cryptography. Built with Next.js and TypeScript.",
    tech: ["Next.js", "TypeScript", "elliptic", "crypto", "Tailwind CSS", "shadcn/ui"],
    category: "tool",
    url: "https://github.com/IrfanNha/seamless-wallet",
    liveUrl: "https://btcseamless-wallet.vercel.app",
    image: "/projects/seamless-wallet.png",
  },
  {
    id: "4",
    slug: "willezur-macht",
    name: "Wille zur Macht",
    description:
      "A digital platform for publishing philosophical essays and reflections inspired by Nietzschean thought. Integrates aesthetic visuals and social engagement via Instagram @willezur.macht.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    category: "content",
    url: "https://github.com/IrfanNha/willezurmacht",
    liveUrl: "https://willezurmacht.vercel.app",
    image: "/projects/willezurmacht.png",
  },
  {
    id: "5",
    slug: "iwsl",
    name: "IW ShortLink",
    description:
      "A personal shortlink provider built with Next.js, TypeScript, and MockAPI. Features visitor tracking via FingerprintJS and analytics via Vercel. Designed with shadcn@latest and a clean, modern aesthetic.",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn",
      "FingerprintJS",
    ],
    category: "tool",
    url: "https://github.com/IrfanNha/shortlink-provider",
    liveUrl: "https://iwsl.vercel.app",
    image: "/projects/iwsl.png",
  },
];
