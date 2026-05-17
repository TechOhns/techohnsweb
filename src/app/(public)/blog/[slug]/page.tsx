import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, User, Share2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

const CATEGORY_META: Record<string, { color: string; label: string }> = {
  tech: { color: '#007ACC', label: 'Tech' },
  design: { color: '#4D4D4D', label: 'Design' },
  business: { color: '#1a3a2a', label: 'Business' },
  tutorials: { color: '#007ACC', label: 'Tutorials' },
  news: { color: '#4D4D4D', label: 'News' },
}

type Params = { slug: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: post } = await supabase.from('blog_posts').select('title, excerpt').eq('slug', slug).single()
  
  if (!post) return { title: 'Post not found' }
  return { title: post.title, description: post.excerpt }
}

// Very simple markdown-ish renderer — replace with a real MDX solution later
function renderContent(md: string) {
  const lines = md.trim().split('\n')
  return lines.map((line, i) => {
    if (line.startsWith('## ')) {
      return (
        <h2
          key={i}
          className="text-2xl font-bold text-[#1a1a1a] mt-12 mb-4"
          style={{ fontFamily: 'var(--font-lora, serif)' }}
        >
          {line.replace('## ', '')}
        </h2>
      )
    }
    if (line.startsWith('```')) return null
    if (line.trim() === '') return <br key={i} />
    return (
      <p key={i} className="text-[#2c2c2c] text-lg leading-loose mb-6" style={{ fontFamily: 'var(--font-lora, serif)' }}>
        {line}
      </p>
    )
  })
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: post } = await supabase
    .from('blog_posts')
    .select(`*, author:team_members(name)`)
    .eq('slug', slug)
    .single()

  if (!post || !post.published) notFound()

  const meta = CATEGORY_META[post.category] || { color: '#007ACC', label: 'Tech' }

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 bg-[#FAF9F6] border-b border-[#e6e4dc]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#6b7280] text-sm hover:text-[#1a1a1a] mb-8 transition-colors uppercase tracking-wider"
            style={{ fontFamily: 'var(--font-lora, serif)' }}
          >
            <ArrowLeft className="w-4 h-4" /> All posts
          </Link>
          <div className="mb-6">
            <span className="text-xs font-semibold px-3 py-1 rounded-sm border border-[#e6e4dc] text-[#2c2c2c] inline-block uppercase tracking-widest" style={{ fontFamily: 'var(--font-lora, serif)' }}>
              {meta.label}
            </span>
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold text-[#1a1a1a] mb-8 leading-tight"
            style={{ fontFamily: 'var(--font-lora, serif)' }}
          >
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-[#6b7280] text-sm font-medium" style={{ fontFamily: 'var(--font-lora, serif)' }}>
            <span className="flex items-center gap-1.5 text-[#2c2c2c]">
              <User className="w-3.5 h-3.5" /> {post.author?.name || 'TechOhns Team'}
            </span>
            <span>|</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {post.reading_time} min read
            </span>
            <span>|</span>
            <span>{new Date(post.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-[#FAF9F6]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose max-w-none space-y-4 mb-12">
            {renderContent(post.content)}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-8 border-t border-[#e6e4dc] mb-8">
            {(post.tags || []).map((tag: string) => (
              <span
                key={tag}
                className="text-xs px-3 py-1.5 rounded-sm bg-[#FAF9F6] border border-[#e6e4dc] text-[#6b7280] font-medium"
                style={{ fontFamily: 'var(--font-lora, serif)' }}
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Share */}
          <div className="flex items-center gap-3 text-sm text-[#9ca3af]">
            <Share2 className="w-4 h-4" />
            <span>Share this post</span>
          </div>
        </div>
      </section>
    </>
  )
}
