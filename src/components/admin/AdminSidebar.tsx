'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Mail,
  Users,
  Briefcase,
  LogOut,
  ChevronLeft,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

const ICON_MAP: Record<string, React.ElementType> = {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Mail,
  Users,
  Briefcase,
}

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: 'LayoutDashboard' },
  { label: 'Projects', href: '/admin/projects', icon: 'FolderKanban' },
  { label: 'Blog', href: '/admin/blog', icon: 'FileText' },
  { label: 'Messages', href: '/admin/messages', icon: 'Mail' },
  { label: 'Team', href: '/admin/team', icon: 'Users' },
  { label: 'Services', href: '/admin/services', icon: 'Briefcase' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <aside className="w-60 flex-shrink-0 bg-[#1a1a1a] flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#007ACC] flex items-center justify-center font-bold text-white text-xs">
            TO
          </div>
          <div>
            <p
              className="font-bold text-white text-sm"
              style={{ fontFamily: 'var(--font-syne, sans-serif)' }}
            >
              TechOhns
            </p>
            <p className="text-[#6b7280] text-[10px]">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const Icon = ICON_MAP[item.icon]
          const isActive =
            item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                isActive
                  ? 'bg-[#007ACC] text-white'
                  : 'text-[#9ca3af] hover:text-white hover:bg-white/5'
              )}
            >
              {Icon && <Icon className="w-4 h-4 flex-shrink-0" />}
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-4 border-t border-white/10 pt-3">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#9ca3af] hover:text-white hover:bg-white/5 transition-all mb-1"
        >
          <ChevronLeft className="w-4 h-4" />
          View Site
        </Link>
        <button
          id="admin-logout-btn"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#9ca3af] hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
