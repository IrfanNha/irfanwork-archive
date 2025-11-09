// About page constants
import { GraduationCap, Briefcase, Award, Users } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  organization: string;
  description: string;
  type: "education" | "experience";
  icon: LucideIcon;
  current?: boolean;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface AboutStats {
  label: string;
  value: string;
  icon: LucideIcon;
}

// Timeline data
export const TIMELINE: TimelineItem[] = [
  // Education
  {
    id: "edu-1",
    year: "2018 - 2021",
    title: "Software Engineering",
    organization: "SMK 9 Semarang",
    description: "Studied software development fundamentals, programming languages, and system design. Built foundation in web development and software architecture.",
    type: "education",
    icon: GraduationCap,
  },
  {
    id: "edu-2",
    year: "2021 - Present",
    title: "Accounting",
    organization: "Universitas Islam Sultan Agung (Unissula)",
    description: "Pursuing degree in Accounting, combining technical skills with business acumen. Learning financial systems and analytical thinking.",
    type: "education",
    icon: GraduationCap,
    current: true,
  },
  // Experience
  {
    id: "exp-1",
    year: "2024",
    title: "Full Stack Developer Intern",
    organization: "Crocodic Studio",
    description: "Developed full-stack web applications using modern technologies. Collaborated with cross-functional teams to deliver scalable solutions.",
    type: "experience",
    icon: Briefcase,
  },
  {
    id: "exp-2",
    year: "2024 - Present",
    title: "Frontend Developer Mentor",
    organization: "Crocodic Studio",
    description: "Mentoring aspiring developers in frontend technologies. Teaching React, Next.js, and modern web development best practices.",
    type: "experience",
    icon: Users,
    current: true,
  },
];

// Skills grouped by category
export const SKILLS: Skill[] = [
  {
    category: "Frontend Development",
    items: [
      "React & Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Responsive Design",
      "UI/UX Implementation",
    ],
  },
  {
    category: "Backend Development",
    items: [
      "Node.js & Express",
      "RESTful APIs",
      "Database Design",
      "Authentication & Security",
      "Server Architecture",
    ],
  },
  {
    category: "Tools & Practices",
    items: [
      "Git & GitHub",
      "Agile Methodology",
      "Code Review",
      "Testing & Debugging",
      "Documentation",
    ],
  },
  {
    category: "Soft Skills",
    items: [
      "Problem Solving",
      "Team Collaboration",
      "Mentoring & Teaching",
      "Communication",
      "Continuous Learning",
    ],
  },
];

// Stats for about page
export const ABOUT_STATS: AboutStats[] = [
  {
    label: "Years of Experience",
    value: "2+",
    icon: Briefcase,
  },
  {
    label: "Projects Completed",
    value: "3+",
    icon: Award,
  },
  {
    label: "Technologies",
    value: "10+",
    icon: GraduationCap,
  },
  {
    label: "Students Mentored",
    value: "150+",
    icon: Users,
  },
];

// About page content
export const ABOUT_CONTENT = {
  intro: "Hello! I'm Irfan Nuha, a passionate Full Stack Developer based in Semarang, Indonesia. I believe in creating digital experiences that are not only functional but also meaningful and impactful.",
  
  mission: "My mission is to bridge the gap between technology and human needs, creating solutions that serve people and communities effectively. I'm constantly exploring new technologies and methodologies to enhance my craft.",
  
  approach: "I approach every project with a blend of technical expertise and philosophical thinking. This unique perspective allows me to build software that is not just well-coded, but also thoughtfully designed to solve real problems.",
  
  values: [
    {
      title: "Continuous Learning",
      description: "Technology evolves rapidly, and so do I. I'm committed to staying current with the latest developments and best practices.",
    },
    {
      title: "Quality & Excellence",
      description: "I believe in writing clean, maintainable code and creating products that stand the test of time.",
    },
    {
      title: "Collaboration",
      description: "Great software is built by great teams. I value open communication and knowledge sharing.",
    },
    {
      title: "Impact",
      description: "Beyond writing code, I focus on creating solutions that make a positive difference in people's lives.",
    },
  ],
};