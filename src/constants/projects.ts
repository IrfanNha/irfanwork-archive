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
] as const;

export type TechStack = typeof TECH_STACK[number];

// Type untuk project
export type Project = {
  id: string;
  name: string;
  description: string;
  tech: TechStack[];
  category: "web" | "app" | "tool" | "other";
  url: string;       
  liveUrl: string;   
  image: string;     
};

// Daftar project
export const PROJECTS: Project[] = [
  {
    id: "1",
    name: "Portfolio Website",
    description: "Personal portfolio built with Next.js, Tailwind CSS & Framer Motion.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    category: "web",
    url: "https://github.com/xanax/portfolio",
    liveUrl: "https://xanaxportfolio.com",
    image: "/projects/portfolio.png",
  },
  {
    id: "2",
    name: "Quran App",
    description: "A web application to read, search, and bookmark Quranic verses. Fully responsive and optimized for mobile.",
    tech: ["Next.js", "TypeScript", "React", "Tailwind CSS", "shadcn/ui"],
    category: "web",
    url: "https://quran-app-irfanwork.vercel.app",
    liveUrl: "https://xanaxquran.com",
    image: "/projects/quran-app.png",
  },
  {
    id: "3",
    name: "BTC Address Generator",
    description: "Web-based Bitcoin address generator using elliptic curve cryptography. Built with Next.js and TypeScript.",
    tech: ["Next.js", "TypeScript", "elliptic", "crypto", "Tailwind CSS", "shadcn/ui"],
    category: "tool",
    url: "https://github.com/xanax/btc-address-generator",
    liveUrl: "https://xanaxbtc.com",
    image: "/projects/seamless-wallet.png",
  },
];
