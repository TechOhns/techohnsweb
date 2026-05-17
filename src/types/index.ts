// ─── Project ──────────────────────────────────────────────────────────────────
export interface Project {
  id: string
  slug: string
  title: string
  tagline: string
  description: string
  challenge: string
  solution: string
  outcome: string
  category: ProjectCategory
  tech_stack: string[]
  images: string[]
  cover_image: string
  live_url?: string
  github_url?: string
  featured: boolean
  published: boolean
  created_at: string
  updated_at: string
}

export type ProjectCategory =
  | 'web'
  | 'mobile'
  | 'fullstack'
  | 'ui-ux'
  | 'consulting'

// ─── Blog ─────────────────────────────────────────────────────────────────────
export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  cover_image?: string
  category: BlogCategory
  tags: string[]
  author_id: string
  author?: TeamMember
  reading_time: number
  published: boolean
  created_at: string
  updated_at: string
}

export type BlogCategory =
  | 'tech'
  | 'design'
  | 'business'
  | 'tutorials'
  | 'news'

// ─── Team ─────────────────────────────────────────────────────────────────────
export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  photo_url?: string
  email?: string
  linkedin_url?: string
  github_url?: string
  twitter_url?: string
  order: number
  active: boolean
  created_at: string
}

// ─── Service ──────────────────────────────────────────────────────────────────
export interface Service {
  id: string
  title: string
  description: string
  long_description: string
  icon: string
  features: string[]
  order: number
  active: boolean
  created_at: string
}

// ─── Contact Message ──────────────────────────────────────────────────────────
export interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  read: boolean
  replied: boolean
  created_at: string
}

// ─── Contact Form ─────────────────────────────────────────────────────────────
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

// ─── Admin ────────────────────────────────────────────────────────────────────
export interface AdminStats {
  total_projects: number
  published_projects: number
  total_posts: number
  published_posts: number
  total_messages: number
  unread_messages: number
  total_team: number
}

// ─── Navigation ───────────────────────────────────────────────────────────────
export interface NavItem {
  label: string
  href: string
  external?: boolean
}

// ─── API Response ─────────────────────────────────────────────────────────────
export interface ApiResponse<T> {
  data: T | null
  error: string | null
  success: boolean
}
