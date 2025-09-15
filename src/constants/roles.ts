// constants/roles.ts
import { Shield, PenTool, User } from "lucide-react";

export const USER_ROLES = {
  ADMIN: { label: "Administrator", color: "bg-red-100 text-red-800", icon: Shield, permissions: ["read", "write", "delete", "manage_users"] },
  EDITOR: { label: "Editor", color: "bg-blue-100 text-blue-800", icon: PenTool, permissions: ["read", "write"] },
  USER: { label: "User", color: "bg-gray-100 text-gray-800", icon: User, permissions: ["read"] },
} as const;

export type UserRole = keyof typeof USER_ROLES;

export const ARTICLE_STATUS = {
  DRAFT: { label: "Draft", color: "bg-yellow-100 text-yellow-800", description: "Article is being written" },
  PUBLISHED: { label: "Published", color: "bg-green-100 text-green-800", description: "Article is live" },
  ARCHIVED: { label: "Archived", color: "bg-gray-100 text-gray-800", description: "Article is hidden" },
} as const;

export type ArticleStatus = keyof typeof ARTICLE_STATUS;
