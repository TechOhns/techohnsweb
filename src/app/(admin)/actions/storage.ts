'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get('file') as File
    if (!file) throw new Error('No file provided')

    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll() },
        },
      }
    )

    // Verify user is authenticated
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')

    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
    const filePath = `${fileName}`

    // Upload to Supabase Storage
    const { error: uploadError, data } = await supabase.storage
      .from('techohns-media')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('techohns-media')
      .getPublicUrl(filePath)

    return { success: true, url: publicUrl }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to upload image' }
  }
}
