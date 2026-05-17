import Link from 'next/link'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Plus, Edit2, Trash2, Calendar } from 'lucide-react'
import { BlogPost } from '@/types'

export default async function AdminBlogPage() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
      },
    }
  )

  const { data: posts } = await supabase
    .from('blog_posts')
    .select('*, author:author_id(name)') // Assuming there's a relation to get author name
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-syne, sans-serif)' }}>
            Blog Posts
          </h1>
          <p className="text-sm text-[#4D4D4D] mt-1">Manage your insights and articles</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 px-4 py-2 bg-[#007ACC] text-white text-sm font-semibold rounded-lg hover:bg-[#007ACC]/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Write Post
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#F5F5F5] text-[#4D4D4D] font-semibold text-xs uppercase tracking-wider border-b border-[#e5e7eb]">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              {posts?.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-[#9ca3af]">
                    No posts found. Click "Write Post" to start publishing.
                  </td>
                </tr>
              )}
              {posts?.map((post: any) => (
                <tr key={post.id} className="hover:bg-[#F5F5F5]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-[#1a1a1a]">{post.title}</div>
                    <div className="text-xs text-[#9ca3af] mt-0.5 max-w-md truncate">{post.excerpt}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F5F5F5] text-[#4D4D4D] border border-[#e5e7eb]">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-[#4D4D4D] text-xs">
                      <Calendar className="w-3 h-3 text-[#9ca3af]" />
                      {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {post.published ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-800">
                        PUBLISHED
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-800">
                        DRAFT
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/blog/${post.id}`}
                        className="p-1.5 text-[#4D4D4D] hover:text-[#007ACC] hover:bg-[#007ACC]/10 rounded-md transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button className="p-1.5 text-[#4D4D4D] hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
