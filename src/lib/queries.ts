import { createClient } from './supabase/server'
import type { Project, BlogPost, TeamMember, Service, ContactMessage } from '@/types'

// ─── Projects ─────────────────────────────────────────────────────────────────

export async function getProjects(category?: string): Promise<Project[]> {
  const supabase = await createClient()
  let query = supabase
    .from('projects')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (category && category !== 'all') {
    query = query.eq('category', category)
  }

  const { data, error } = await query
  if (error) throw error
  return data ?? []
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error) return null
  return data
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('published', true)
    .eq('featured', true)
    .limit(3)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

// ─── Blog ─────────────────────────────────────────────────────────────────────

export async function getBlogPosts(category?: string): Promise<BlogPost[]> {
  const supabase = await createClient()
  let query = supabase
    .from('blog_posts')
    .select('*, author:team_members(name, photo_url, role)')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (category && category !== 'all') {
    query = query.eq('category', category)
  }

  const { data, error } = await query
  if (error) throw error
  return data ?? []
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*, author:team_members(name, photo_url, role, bio)')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error) return null
  return data
}

// ─── Team ─────────────────────────────────────────────────────────────────────

export async function getTeamMembers(): Promise<TeamMember[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('active', true)
    .order('order', { ascending: true })

  if (error) throw error
  return data ?? []
}

// ─── Services ─────────────────────────────────────────────────────────────────

export async function getServices(): Promise<Service[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('active', true)
    .order('order', { ascending: true })

  if (error) throw error
  return data ?? []
}

// ─── Messages ─────────────────────────────────────────────────────────────────

export async function submitContactMessage(
  formData: Omit<ContactMessage, 'id' | 'read' | 'replied' | 'created_at'>
): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase.from('contact_messages').insert({
    ...formData,
    read: false,
    replied: false,
  })

  if (error) throw error
}
