import { z } from "zod";

/* ---------------------------------- */
/* LOGIN SCHEMA */
/* ---------------------------------- */
export const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

/* ---------------------------------- */
/* ARTICLE SCHEMA */
/* ---------------------------------- */
export const articleSchema = z.object({
  title: z
    .string()
    .min(1, "Judul artikel wajib diisi")
    .max(200, "Judul terlalu panjang"),
  content: z.any(),
  html: z.string(),
  excerpt: z.string().max(300, "Excerpt maksimal 300 karakter").optional(),
  cover_image: z.string().url("URL gambar tidak valid").optional(),
  tags: z.array(z.string()).max(10, "Maksimal 10 tags"),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
});

/* ---------------------------------- */
/* USER SCHEMA */
/* ---------------------------------- */
export const userSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi").max(100, "Nama terlalu panjang"),
  email: z.string().email("Email tidak valid"),
  role: z.enum(["ADMIN", "EDITOR", "USER"]),
});

/* ---------------------------------- */
/* CAPTCHA SCHEMA */
/* ---------------------------------- */
export const hcaptchaSchema = z.object({
  "h-captcha-response": z
    .string()
    .min(1, "Please complete the captcha."),
});

/* ---------------------------------- */
/* CONTACT FORM SCHEMA */
/* ---------------------------------- */
export const contactSchema = z
  .object({
    name: z.string().min(2, "Name is too short."),
    email: z.string().email("Invalid email address."),
    message: z
      .string()
      .min(10, "Message is too short.")
      .max(500, "Message too long."),
    honeypot: z.string().optional(),
  })
  .and(hcaptchaSchema);

/* ---------------------------------- */
/* TYPES */
/* ---------------------------------- */
export type LoginFormData = z.infer<typeof loginSchema>;
export type ArticleFormData = z.infer<typeof articleSchema>;
export type UserFormData = z.infer<typeof userSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
