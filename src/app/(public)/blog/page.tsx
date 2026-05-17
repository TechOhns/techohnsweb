import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Clock, User } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights on web development, design, and building technology for Africa.',
}

const CATEGORY_META: Record<string, { color: string; label: string }> = {
  tech: { color: '#007ACC', label: 'Tech' },
  design: { color: '#4D4D4D', label: 'Design' },
  business: { color: '#1a3a2a', label: 'Business' },
  tutorials: { color: '#007ACC', label: 'Tutorials' },
  news: { color: '#4D4D4D', label: 'News' },
}

export default async function BlogPage() {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from('blog_posts')
    .select(`
      *,
      author:team_members(name)
    `)
    .eq('published', true)
    .order('created_at', { ascending: false })

  const publishedPosts = posts || []

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-[#007ACC] tracking-widest uppercase mb-3" style={{ fontFamily: 'var(--font-lora, serif)' }}>Journal</p>
          <h1
            className="text-5xl sm:text-6xl font-bold text-[#1a1a1a] mb-5"
            style={{ fontFamily: 'var(--font-lora, serif)' }}
          >
            The Blog
          </h1>
          <p className="text-[#2c2c2c] max-w-xl text-lg leading-relaxed" style={{ fontFamily: 'var(--font-lora, serif)' }}>
            Thoughts on building software, design decisions, and navigating the African tech landscape.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="pb-24 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6">
            {publishedPosts.map((post, i) => {
              const meta = CATEGORY_META[post.category] || { color: '#007ACC', label: 'Tech' }
              const cover_color = meta.color
              
              return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`group block ${i === 0 ? 'lg:col-span-2' : ''}`}
              >
                {/* Minimalist Cover Accent instead of solid color */}
                <div
                  className="relative w-full overflow-hidden mb-5 transition-transform duration-300 group-hover:scale-[1.01] border border-[#e6e4dc] rounded-sm"
                  style={{ backgroundColor: `${cover_color}0A`, height: i === 0 ? '260px' : '200px' }}
                >
                  {post.cover_image ? (
                    <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover mix-blend-multiply opacity-90" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                       <span className="opacity-20" style={{ color: cover_color }}>
                         <ArrowUpRight className="w-12 h-12" />
                       </span>
                    </div>
                  )}
                  <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: cover_color }} />
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-1 px-3 py-1.5 bg-[#FAF9F6] border border-[#e6e4dc] text-[10px] font-semibold text-[#2c2c2c] rounded-sm">
                      <ArrowUpRight className="w-3 h-3" /> Read
                    </div>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-[10px] font-semibold px-2.5 py-1 rounded-sm uppercase tracking-wider"
                    style={{
                      backgroundColor: `${cover_color}15`,
                      color: cover_color,
                      fontFamily: 'var(--font-lora, serif)'
                    }}
                  >
                    {meta.label}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-[#9ca3af]">
                    <Clock className="w-3 h-3" /> {post.reading_time} min read
                  </span>
                </div>
                <h2
                  className="text-xl sm:text-2xl font-bold text-[#1a1a1a] mb-3 group-hover:text-[#007ACC] transition-colors leading-snug"
                  style={{ fontFamily: 'var(--font-lora, serif)' }}
                >
                  {post.title}
                </h2>
                <p className="text-[15px] text-[#2c2c2c] leading-relaxed mb-5" style={{ fontFamily: 'var(--font-lora, serif)' }}>{post.excerpt}</p>
                <div className="flex items-center gap-2 text-xs text-[#9ca3af]">
                  <User className="w-3.5 h-3.5" />
                  <span>{post.author?.name || 'TechOhns Team'}</span>
                  <span>·</span>
                  <span>{new Date(post.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              </Link>
            )})}
            
            {publishedPosts.length === 0 && (
              <div className="lg:col-span-3 text-center py-12">
                <p className="text-[#4D4D4D] text-sm">No blog posts found. Check back later!</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
