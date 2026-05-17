'use client'

import { Bell, Search } from 'lucide-react'

export default function AdminTopbar() {
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
        <button
          id="admin-notifications-btn"
          className="relative p-2 rounded-lg hover:bg-[#F5F5F5] transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4 text-[#4D4D4D]" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#007ACC]" />
        </button>
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
