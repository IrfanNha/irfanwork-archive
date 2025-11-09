// Home page constants with type safety
import { Brain, Code2, Users, LucideIcon } from "lucide-react";

export interface CoreInterest {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  skills: string[];
}

export interface TechStack {
  category: string;
  technologies: {
    name: string;
    level: number; // 1-5 scale
    color: string;
    icon?: string;
  }[];
}

export interface Quote {
  id: string;
  text: string;
  author: string;
  category: "philosophy" | "technology" | "life";
}

export interface ContactInfo {
  phone: string;
  phoneDisplay: string;
  address: string;
  workingHours: {
    weekdays: string;
    weekend: string;
  };
}

export interface PersonalInfo {
  name: string;
  title: string;
  shortBio: string;
  fullBio: string;
  location: string;
  email: string;
  image: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter?: string;
    instagram?: string;
  };
  contact: ContactInfo;
}

// Personal Information
export const PERSONAL_INFO: PersonalInfo = {
  name: "Irfan Nuha",
  title: "Full Stack Developer & Digital Innovator",
  shortBio: "Passionate developer who loves creating meaningful digital experiences that bridge technology and human needs.",
  fullBio: "I'm a full-stack developer with a deep passion for creating digital solutions that matter. My journey in technology is driven by curiosity and the belief that great software should not only work well but also serve humanity's best interests. I enjoy exploring the intersection of programming, philosophy, and social impact.",
  location: "Semarang, Indonesia",
  email: "irfannuha@protonmail.com",
  image: "/irfan.webp",
  socialLinks: {
    github: "https://github.com/IrfanNha",
    linkedin: "https://linkedin.com/in/irfan-nuha",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com/irrfnnh"
  },
  contact: {
    phone: "+6281234567890",
    phoneDisplay: "+62 812-3456-7890",
    address: "Jl. Example Street No. 123, Semarang, Central Java 50123",
    workingHours: {
      weekdays: "Mon - Fri: 9:00 - 18:00",
      weekend: "Closed"
    }
  }
};

// Core Interests
export const CORE_INTERESTS: CoreInterest[] = [
  {
    id: "philosophy",
    title: "Philosophy",
    description: "Exploring the fundamental questions of existence, ethics, and human nature. I find that philosophical thinking enhances both life and code quality.",
    icon: Brain,
    color: "from-purple-400 to-purple-600",
    skills: ["Critical Thinking", "Ethics", "Logic", "Epistemology", "Existentialism"]
  },
  {
    id: "programming",
    title: "Programming",
    description: "Building scalable, maintainable software solutions with modern technologies. Always learning and adapting to new paradigms and best practices.",
    icon: Code2,
    color: "from-blue-400 to-blue-600", 
    skills: ["Full Stack Development", "System Design", "Clean Architecture", "DevOps", "Open Source"]
  },
  {
    id: "social-science",
    title: "Social Science",
    description: "Understanding human behavior, society, and culture to build technology that truly serves people and communities effectively.",
    icon: Users,
    color: "from-green-400 to-green-600",
    skills: ["Human Psychology", "UX Research", "Community Building", "Digital Sociology", "Cultural Studies"]
  }
];

// Tech Stack
export const TECH_STACK: TechStack[] = [
  {
    category: "Frontend",
    technologies: [
      { name: "React", level: 5, color: "#61DAFB" },
      { name: "Next.js", level: 5, color: "#000000" },
      { name: "TypeScript", level: 4, color: "#3178C6" },
      { name: "Tailwind CSS", level: 5, color: "#06B6D4" },
      { name: "Framer Motion", level: 4, color: "#FF0055" }
    ]
  },
  {
    category: "Backend", 
    technologies: [
      { name: "Node.js", level: 4, color: "#339933" },
      { name: "Express.js", level: 4, color: "#000000" },
      { name: "Prisma", level: 4, color: "#2D3748" },
      { name: "PostgreSQL", level: 4, color: "#336791" },
      { name: "MongoDB", level: 3, color: "#47A248" }
    ]
  },
  {
    category: "Tools & DevOps",
    technologies: [
      { name: "Git", level: 5, color: "#F05032" },
      { name: "Docker", level: 3, color: "#2496ED" },
      { name: "Vercel", level: 4, color: "#000000" },
      { name: "Figma", level: 4, color: "#F24E1E" },
      { name: "VS Code", level: 5, color: "#007ACC" }
    ]
  }
];

// Inspirational Quotes
export const QUOTES: Quote[] = [
  {
    id: "1",
    text: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
    category: "technology"
  },
  {
    id: "2", 
    text: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House",
    category: "technology"
  },
  {
    id: "3",
    text: "The unexamined life is not worth living.",
    author: "Socrates",
    category: "philosophy"
  },
  {
    id: "4",
    text: "Technology is best when it brings people together.",
    author: "Matt Mullenweg",
    category: "technology"
  },
  {
    id: "5",
    text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "Aristotle",
    category: "philosophy"
  },
  {
    id: "6",
    text: "The only way to make sense out of change is to plunge into it, move with it, and join the dance.",
    author: "Alan Watts",
    category: "life"
  }
];