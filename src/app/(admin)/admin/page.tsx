import type { Metadata } from 'next'
import {
  FolderKanban, FileText, Mail, Users,
  TrendingUp, Eye, MessageSquare, Briefcase,
} from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Dashboard',
}

const STAT_CARDS = [
  { label: 'Total Projects', value: '—', icon: FolderKanban, color: '#007ACC' },
  { label: 'Published Posts', value: '—', icon: FileText, color: '#007ACC' },
  { label: 'Unread Messages', value: '—', icon: Mail, color: '#FFCC00' },
  { label: 'Team Members', value: '—', icon: Users, color: '#4D4D4D' },
]

const QUICK_LINKS = [
  { label: 'New Project', href: '/admin/projects/new', icon: FolderKanban },
  { label: 'New Blog Post', href: '/admin/blog/new', icon: FileText },
  { label: 'View Messages', href: '/admin/messages', icon: MessageSquare },
  { label: 'Manage Services', href: '/admin/services', icon: Briefcase },
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-syne, sans-serif)' }}>
          Dashboard
        </h1>
        <p className="text-[#9ca3af] mt-1 text-sm">
          Welcome back to {SITE_CONFIG.name} Admin
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map((card) => {
          const Icon = card.icon
          return (
            <div
              key={card.label}
              className="bg-white rounded-2xl p-5 border border-[#e5e7eb] flex flex-col gap-3"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${card.color}10` }}
              >
                <Icon className="w-5 h-5" style={{ color: card.color }} />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1a1a1a]">{card.value}</p>
                <p className="text-xs text-[#9ca3af] mt-0.5">{card.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick links */}
      <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6">
        <h2 className="text-sm font-semibold text-[#1a1a1a] mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#007ACC]" />
          Quick Actions
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {QUICK_LINKS.map((link) => {
            const Icon = link.icon
            return (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-[#e5e7eb] text-sm font-medium text-[#4D4D4D] hover:border-[#007ACC]/30 hover:text-[#007ACC] hover:bg-[#007ACC]/5 transition-all"
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {link.label}
              </a>
            )
          })}
        </div>
      </div>

      {/* Placeholder recent activity */}
      <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6">
        <h2 className="text-sm font-semibold text-[#1a1a1a] mb-4 flex items-center gap-2">
          <Eye className="w-4 h-4 text-[#007ACC]" />
          Recent Activity
        </h2>
        <div className="flex items-center justify-center py-12 text-[#9ca3af] text-sm">
          Activity feed coming soon — connect Supabase to populate this section.
        </div>
      </div>
    </div>
  )
}
