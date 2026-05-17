import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Clock, User } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights on web development, design, and building technology for Africa.',
}

const POSTS = [
  {
    slug: 'building-supabase-auth-zambia',
    title: 'Building Supabase Auth for Real-World Zambian Apps',
    excerpt: 'A deep dive into integrating Supabase authentication with SMS OTP for markets where email is less common.',
    category: 'tech',
    categoryLabel: 'Tech',
    reading_time: 8,
    author: 'Chanda Mutale',
    created_at: '2025-04-12',
    cover_color: '#007ACC',
  },
  {
    slug: 'designing-for-low-bandwidth',
    title: 'Designing for Low-Bandwidth African Markets',
    excerpt: 'How we optimise our React apps to work gracefully on 2G and 3G connections across Lusaka and beyond.',
    category: 'design',
    categoryLabel: 'Design',
    reading_time: 6,
    author: 'Mwila Banda',
    created_at: '2025-03-28',
    cover_color: '#1a1a1a',
  },
  {
    slug: 'react-native-vs-flutter-2025',
    title: 'React Native vs Flutter in 2025: Our Honest Take',
    excerpt: 'After shipping 5 mobile apps on both platforms, here\'s what we actually recommend — and why.',
    category: 'tech',
    categoryLabel: 'Tech',
    reading_time: 10,
    author: 'Thandiwe Phiri',
    created_at: '2025-03-05',
    cover_color: '#1a2a3a',
  },
]

const CATEGORY_COLORS: Record<string, string> = {
  tech: '#007ACC',
  design: '#4D4D4D',
  business: '#1a3a2a',
  tutorials: '#007ACC',
  news: '#4D4D4D',
}

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-[#007ACC] tracking-widest uppercase mb-3">Journal</p>
          <h1
            className="text-5xl sm:text-6xl font-bold text-[#1a1a1a] mb-5"
            style={{ fontFamily: 'var(--font-syne, sans-serif)' }}
          >
            The Blog
          </h1>
          <p className="text-[#4D4D4D] max-w-xl leading-relaxed">
            Thoughts on building software, design decisions, and navigating the African tech landscape.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6">
            {POSTS.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`group block ${i === 0 ? 'lg:col-span-2' : ''}`}
              >
                {/* Cover */}
                <div
                  className="relative w-full rounded-2xl overflow-hidden mb-5 transition-transform duration-300 group-hover:scale-[1.02]"
                  style={{ backgroundColor: post.cover_color, height: i === 0 ? '260px' : '200px' }}
                >
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
                      backgroundSize: '24px 24px',
                    }}
                  />
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/90 text-[10px] font-semibold text-[#1a1a1a]">
                      <ArrowUpRight className="w-3 h-3" /> Read
                    </div>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: `${CATEGORY_COLORS[post.category] || '#007ACC'}15`,
                      color: CATEGORY_COLORS[post.category] || '#007ACC',
                    }}
                  >
                    {post.categoryLabel}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-[#9ca3af]">
                    <Clock className="w-3 h-3" /> {post.reading_time} min read
                  </span>
                </div>
                <h2
                  className="text-lg font-bold text-[#1a1a1a] mb-2 group-hover:text-[#007ACC] transition-colors leading-snug"
                  style={{ fontFamily: 'var(--font-syne, sans-serif)' }}
                >
                  {post.title}
                </h2>
                <p className="text-sm text-[#4D4D4D] leading-relaxed mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-2 text-xs text-[#9ca3af]">
                  <User className="w-3.5 h-3.5" />
                  <span>{post.author}</span>
                  <span>·</span>
                  <span>{new Date(post.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
