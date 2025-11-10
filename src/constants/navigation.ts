// constants/navigation.ts
import { LucideIcon, Home, FileText, User,  Mail, Github, Twitter, Linkedin, FolderGit2 } from "lucide-react";
import { SITE_CONFIG } from "./site";

export interface NavLink {
  label: string;
  href: string;
  icon?: LucideIcon;
  description?: string;
  isExternal?: boolean;
  badge?: string;
}

export const MAIN_NAV: NavLink[] = [
  { label: "Home", href: "/", icon: Home, description: "Back to homepage" },
  { label: "Blogs", href: "/blog", icon: FileText, description: "Browse all articles" },
  { label: "Projects", href: "/projects", icon: FolderGit2, description: "See Our Projects" },
  { label: "About", href: "/about", icon: User, description: "Learn more about us" },
  { label: "Contact", href: "/contact", icon: Mail, description: "Get in touch" },
] as const;


export const FOOTER_LINKS = {
  company: [
    { label: "About", href: "/about" },
    { label: "Blogs", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/" },
    { label: "Terms of Service", href: "/" },
  ],
} as const;

export const SOCIAL_LINKS = [
  { label: "GitHub", href: SITE_CONFIG.social.github, icon: Github, color: "#333" },
  { label: "Twitter", href: SITE_CONFIG.social.twitter, icon: Twitter, color: "#1DA1F2" },
  { label: "LinkedIn", href: SITE_CONFIG.social.linkedin, icon: Linkedin, color: "#0077B5" },
] as const;
