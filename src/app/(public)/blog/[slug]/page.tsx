import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, User, Share2 } from 'lucide-react'

const POSTS: Record<string, {
  slug: string; title: string; excerpt: string; content: string
  category: string; categoryLabel: string; reading_time: number
  author: string; created_at: string; cover_color: string; tags: string[]
}> = {
  'building-supabase-auth-zambia': {
    slug: 'building-supabase-auth-zambia',
    title: 'Building Supabase Auth for Real-World Zambian Apps',
    excerpt: 'A deep dive into integrating Supabase authentication with SMS OTP for markets where email is less common.',
    content: `
## The Context

In Zambia, as in much of Sub-Saharan Africa, mobile phone penetration far outpaces email adoption. While nearly everyone has a phone number, many users — especially in lower-income or rural segments — don't actively check email or simply don't have an address they remember.

This creates a UX problem for apps that default to "sign in with email." Drop-off rates spike. Users call support confused about verification emails. The experience breaks.

## Why Supabase + SMS OTP

Supabase's Auth system natively supports SMS-based one-time passwords via Twilio, MessageBird, and Vonage. The flow is simple: user enters their phone number, receives a 6-digit code, and authenticates.

For Zambian apps, we pair this with a local SMS gateway (e.g. Airtel Business or Zamtel's API) to avoid international SMS pricing.

## The Implementation

\`\`\`typescript
const { data, error } = await supabase.auth.signInWithOtp({
  phone: '+260971234567',
})
\`\`\`

On verify:
\`\`\`typescript
const { data, error } = await supabase.auth.verifyOtp({
  phone: '+260971234567',
  token: '123456',
  type: 'sms',
})
\`\`\`

## Key Lessons

1. **Phone number formatting matters** — always normalise to E.164 before passing to Supabase.
2. **Rate limiting is your friend** — SMS costs money. Implement a 60-second cooldown and a max 3 OTP requests per hour.
3. **Fallback UX** — always provide a WhatsApp fallback for users who don't receive the SMS within 30 seconds.
    `,
    category: 'tech',
    categoryLabel: 'Tech',
    reading_time: 8,
    author: 'Chanda Mutale',
    created_at: '2025-04-12',
    cover_color: '#007ACC',
    tags: ['Supabase', 'Auth', 'Next.js', 'Zambia'],
  },
}

type Params = { slug: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const post = POSTS[slug]
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
          className="text-xl font-bold text-[#1a1a1a] mt-10 mb-3"
          style={{ fontFamily: 'var(--font-syne, sans-serif)' }}
        >
          {line.replace('## ', '')}
        </h2>
      )
    }
    if (line.startsWith('```')) return null
    if (line.trim() === '') return <br key={i} />
    return (
      <p key={i} className="text-[#4D4D4D] leading-relaxed">
        {line}
      </p>
    )
  })
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const post = POSTS[slug]
  if (!post) notFound()

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16" style={{ backgroundColor: post.cover_color }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/60 text-sm hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> All posts
          </Link>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/15 text-white mb-4 inline-block">
            {post.categoryLabel}
          </span>
          <h1
            className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-syne, sans-serif)' }}
          >
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-white/60 text-sm">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" /> {post.author}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {post.reading_time} min read
            </span>
            <span>·</span>
            <span>{new Date(post.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose max-w-none space-y-4 mb-12">
            {renderContent(post.content)}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-8 border-t border-[#e5e7eb] mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1.5 rounded-lg bg-[#F5F5F5] border border-[#e5e7eb] text-[#4D4D4D] font-medium"
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
