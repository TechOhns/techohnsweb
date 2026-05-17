import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().min(4, 'Subject must be at least 4 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
})

export const projectSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  slug: z.string().min(3, 'Slug is required'),
  tagline: z.string().min(10, 'Tagline is required'),
  description: z.string().min(20, 'Description is required'),
  challenge: z.string().min(20, 'Challenge is required'),
  solution: z.string().min(20, 'Solution is required'),
  outcome: z.string().min(10, 'Outcome is required'),
  category: z.enum(['web', 'mobile', 'fullstack', 'ui-ux', 'consulting']),
  tech_stack: z.array(z.string()).min(1, 'At least one technology required'),
  live_url: z.string().url().optional().or(z.literal('')),
  github_url: z.string().url().optional().or(z.literal('')),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
})

export const blogPostSchema = z.object({
  title: z.string().min(5, 'Title is required'),
  slug: z.string().min(3, 'Slug is required'),
  excerpt: z.string().min(20, 'Excerpt is required'),
  content: z.string().min(100, 'Content is required'),
  category: z.enum(['tech', 'design', 'business', 'tutorials', 'news']),
  tags: z.array(z.string()),
  published: z.boolean().default(false),
})

export const teamMemberSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  role: z.string().min(2, 'Role is required'),
  bio: z.string().min(20, 'Bio is required'),
  email: z.string().email().optional().or(z.literal('')),
  linkedin_url: z.string().url().optional().or(z.literal('')),
  github_url: z.string().url().optional().or(z.literal('')),
  twitter_url: z.string().url().optional().or(z.literal('')),
  order: z.number().int().min(0),
  active: z.boolean().default(true),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
export type ProjectFormData = z.infer<typeof projectSchema>
export type BlogPostFormData = z.infer<typeof blogPostSchema>
export type TeamMemberFormData = z.infer<typeof teamMemberSchema>
