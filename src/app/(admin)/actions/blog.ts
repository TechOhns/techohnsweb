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

export async function createPost(prevState: any, formData: FormData) {
  try {
    const supabase = await getSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { success: false, error: 'Unauthorized', message: '' }

    const rawData = {
      title: formData.get('title') as string,
      slug: formData.get('slug') as string,
      excerpt: formData.get('excerpt') as string,
      content: formData.get('content') as string,
      category: formData.get('category') as string,
      cover_image: formData.get('cover_image') as string,
      author_id: user.id, // Using the authenticated admin as author
      published: formData.get('published') === 'on',
    }

    const { error } = await supabase.from('blog_posts').insert([rawData])
    if (error) throw error

    revalidatePath('/blog')
    revalidatePath('/admin/blog')
    
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to create post', message: '' }
  }

  redirect('/admin/blog')
}

export async function updatePost(id: string, prevState: any, formData: FormData) {
  try {
    const supabase = await getSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { success: false, error: 'Unauthorized', message: '' }

    const rawData = {
      title: formData.get('title') as string,
      slug: formData.get('slug') as string,
      excerpt: formData.get('excerpt') as string,
      content: formData.get('content') as string,
      category: formData.get('category') as string,
      cover_image: formData.get('cover_image') as string,
      published: formData.get('published') === 'on',
      updated_at: new Date().toISOString(),
    }

    const { error } = await supabase.from('blog_posts').update(rawData).eq('id', id)
    if (error) throw error

    revalidatePath('/blog')
    revalidatePath(`/blog/${rawData.slug}`)
    revalidatePath('/admin/blog')
    
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to update post', message: '' }
  }

  redirect('/admin/blog')
}

export async function deletePost(id: string) {
  try {
    const supabase = await getSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { success: false, error: 'Unauthorized' }

    const { error } = await supabase.from('blog_posts').delete().eq('id', id)
    if (error) throw error

    revalidatePath('/blog')
    revalidatePath('/admin/blog')
    
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to delete post' }
  }
}
