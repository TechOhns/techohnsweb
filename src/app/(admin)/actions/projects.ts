'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

async function getSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
      },
    }
  )
}

export async function createProject(prevState: any, formData: FormData) {
  try {
    const supabase = await getSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { success: false, error: 'Unauthorized', message: '' }

    const rawData = {
      title: formData.get('title') as string,
      slug: formData.get('slug') as string,
      tagline: formData.get('tagline') as string,
      description: formData.get('description') as string,
      challenge: formData.get('challenge') as string,
      solution: formData.get('solution') as string,
      outcome: formData.get('outcome') as string,
      category: formData.get('category') as string,
      tech_stack: (formData.get('tech_stack') as string).split(',').map(s => s.trim()).filter(Boolean),
      cover_image: formData.get('cover_image') as string,
      live_url: formData.get('live_url') as string || null,
      github_url: formData.get('github_url') as string || null,
      featured: formData.get('featured') === 'on',
      published: formData.get('published') === 'on',
    }

    const { error } = await supabase.from('projects').insert([rawData])
    if (error) throw error

    revalidatePath('/projects')
    revalidatePath('/admin/projects')
    
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to create project', message: '' }
  }

  // Redirect outside try-catch to avoid catching Next.js NEXT_REDIRECT errors
  redirect('/admin/projects')
}

export async function updateProject(id: string, prevState: any, formData: FormData) {
  try {
    const supabase = await getSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { success: false, error: 'Unauthorized', message: '' }

    const rawData = {
      title: formData.get('title') as string,
      slug: formData.get('slug') as string,
      tagline: formData.get('tagline') as string,
      description: formData.get('description') as string,
      challenge: formData.get('challenge') as string,
      solution: formData.get('solution') as string,
      outcome: formData.get('outcome') as string,
      category: formData.get('category') as string,
      tech_stack: (formData.get('tech_stack') as string).split(',').map(s => s.trim()).filter(Boolean),
      cover_image: formData.get('cover_image') as string,
      live_url: formData.get('live_url') as string || null,
      github_url: formData.get('github_url') as string || null,
      featured: formData.get('featured') === 'on',
      published: formData.get('published') === 'on',
      updated_at: new Date().toISOString(),
    }

    const { error } = await supabase.from('projects').update(rawData).eq('id', id)
    if (error) throw error

    revalidatePath('/projects')
    revalidatePath(`/projects/${rawData.slug}`)
    revalidatePath('/admin/projects')
    
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to update project', message: '' }
  }

  redirect('/admin/projects')
}

export async function deleteProject(id: string) {
  try {
    const supabase = await getSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { success: false, error: 'Unauthorized' }

    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (error) throw error

    revalidatePath('/projects')
    revalidatePath('/admin/projects')
    
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to delete project' }
  }
}
