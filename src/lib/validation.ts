import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
})

export const articleSchema = z.object({
  title: z.string().min(1, 'Judul artikel wajib diisi').max(200, 'Judul terlalu panjang'),
  content: z.any(),
  html: z.string(),
  excerpt: z.string().max(300, 'Excerpt maksimal 300 karakter').optional(),
  cover_image: z.string().url('URL gambar tidak valid').optional(),
  tags: z.array(z.string()).max(10, 'Maksimal 10 tags'),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
})

export const userSchema = z.object({
  name: z.string().min(1, 'Nama wajib diisi').max(100, 'Nama terlalu panjang'),
  email: z.string().email('Email tidak valid'),
  role: z.enum(['ADMIN', 'EDITOR', 'USER']),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type ArticleFormData = z.infer<typeof articleSchema>
export type UserFormData = z.infer<typeof userSchema>