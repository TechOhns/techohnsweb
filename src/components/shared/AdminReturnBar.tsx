import Link from 'next/link'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { LayoutDashboard } from 'lucide-react'

export default async function AdminReturnBar() {
  const cookieStore = await cookies()
  
  // We only need to check auth state, so no need for setAll in a Server Component
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // If no user is logged in, render absolutely nothing
  if (!user) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100]">
      <Link 
        href="/admin"
        className="flex items-center gap-2 px-5 py-2.5 bg-[#1a1a1a] text-white text-sm font-semibold rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/10 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,122,204,0.3)] transition-all duration-300 group"
      >
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-white/80 group-hover:text-white transition-colors">Admin Mode Active</span>
        <div className="w-[1px] h-4 bg-white/20 mx-1" />
        <LayoutDashboard className="w-4 h-4 text-[#FFCC00]" />
        Back to Dashboard
      </Link>
    </div>
  )
}
