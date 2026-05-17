'use client'

import { Bell, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function AdminTopbar() {
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    const fetchUnread = async () => {
      const supabase = createClient()
      const { count } = await supabase
        .from('contact_messages')
        .select('*', { count: 'exact', head: true })
        .eq('read', false)
      if (count) setUnreadCount(count)
    }
    fetchUnread()

    // Real-time listener for new messages could be added here
  }, [])

  return (
    <header className="h-16 bg-white border-b border-[#e5e7eb] flex items-center justify-between px-6 flex-shrink-0">
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <Search className="w-4 h-4 text-[#9ca3af]" />
        <input
          id="admin-search"
          type="text"
          placeholder="Search..."
          className="flex-1 text-sm text-[#4D4D4D] bg-transparent outline-none placeholder:text-[#9ca3af]"
        />
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/admin/messages"
          id="admin-notifications-btn"
          className="relative p-2 rounded-lg hover:bg-[#F5F5F5] transition-colors flex items-center justify-center"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4 text-[#4D4D4D]" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-3.5 h-3.5 flex items-center justify-center rounded-full bg-[#007ACC] text-[8px] font-bold text-white border border-white">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#007ACC] flex items-center justify-center text-white text-xs font-bold">
            A
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-medium text-[#1a1a1a]">Admin</p>
            <p className="text-[10px] text-[#9ca3af]">TechOhns</p>
          </div>
        </div>
      </div>
    </header>
  )
}
