import { NavItem } from '@/types'

export const SITE_CONFIG = {
  name: 'TechOhns',
  tagline: "Building Digital Solutions",
  description:
    'TechOhns is a software development company delivering quality web apps, mobile applications, and digital experiences for businesses globally.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://techohns.com',
  email: 'us@techohns.com',
  phone: '+260 97 163 2781',
  whatsapp: '+260971632781',
  location: 'Lusaka, Zambia',
  socials: {
    twitter: 'https://twitter.com/techohns',
    linkedin: 'https://linkedin.com/company/techohns',
    github: 'https://github.com/TheOhns',
    instagram: 'https://instagram.com/techohns',
  },
}

export const PUBLIC_NAV: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export const ADMIN_NAV = [
  { label: 'Dashboard', href: '/admin', icon: 'LayoutDashboard' },
  { label: 'Projects', href: '/admin/projects', icon: 'FolderKanban' },
  { label: 'Blog', href: '/admin/blog', icon: 'FileText' },
  { label: 'Messages', href: '/admin/messages', icon: 'Mail' },
  { label: 'Team', href: '/admin/team', icon: 'Users' },
  { label: 'Services', href: '/admin/services', icon: 'Briefcase' },
]

export const PROJECT_CATEGORIES = [
  { value: 'all', label: 'All Projects' },
  { value: 'web', label: 'Web Apps' },
  { value: 'mobile', label: 'Mobile Apps' },
  { value: 'fullstack', label: 'Full Stack' },
  { value: 'ui-ux', label: 'UI/UX Design' },
  { value: 'consulting', label: 'Consulting' },
]

export const BLOG_CATEGORIES = [
  { value: 'all', label: 'All Posts' },
  { value: 'tech', label: 'Technology' },
  { value: 'design', label: 'Design' },
  { value: 'business', label: 'Business' },
  { value: 'tutorials', label: 'Tutorials' },
  { value: 'news', label: 'News' },
]

export const BRAND = {
  blue: '#007ACC',
  charcoal: '#4D4D4D',
  white: '#FFFFFF',
  lightGrey: '#F5F5F5',
  gold: '#FFCC00',
}

export const STATS = [
  { value: 50, suffix: '+', label: 'Projects Delivered' },
  { value: 30, suffix: '+', label: 'Happy Clients' },
  { value: 3, suffix: '+', label: 'Years Experience' },
  { value: 10, suffix: '+', label: 'Team Members' },
]
