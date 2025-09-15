// constants/navigation.ts
import { LucideIcon, Home, FileText, User, Settings, Mail, BarChart3, Users, Github, Twitter, Linkedin, FolderGit2 } from "lucide-react";
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
  { label: "Articles", href: "/articles", icon: FileText, description: "Browse all articles" },
  { label: "Projects", href: "/projects", icon: FolderGit2, description: "See Our Projects" },
  { label: "About", href: "/about", icon: User, description: "Learn more about us" },
  { label: "Contact", href: "/contact", icon: Mail, description: "Get in touch" },
] as const;

export const ADMIN_NAV: NavLink[] = [
  { label: "Dashboard", href: "/admin", icon: BarChart3, description: "Overview & analytics" },
  { label: "Articles", href: "/admin/articles", icon: FileText, description: "Manage articles" },
  { label: "Users", href: "/admin/users", icon: Users, description: "User management", badge: "Admin" },
  { label: "Settings", href: "/admin/settings", icon: Settings, description: "Site configuration" },
] as const;

export const FOOTER_LINKS = {
  product: [
    { label: "Features", href: "/project" },
    { label: "Pricing", href: "/pricing" },
    { label: "Documentation", href: "/docs" },
    { label: "API", href: "/api" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Articles", href: "/articles" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "Help Center", href: "/help" },
    { label: "Status", href: "/status" },
    { label: "Changelog", href: "/changelog" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
} as const;

export const SOCIAL_LINKS = [
  { label: "GitHub", href: SITE_CONFIG.social.github, icon: Github, color: "#333" },
  { label: "Twitter", href: SITE_CONFIG.social.twitter, icon: Twitter, color: "#1DA1F2" },
  { label: "LinkedIn", href: SITE_CONFIG.social.linkedin, icon: Linkedin, color: "#0077B5" },
] as const;
