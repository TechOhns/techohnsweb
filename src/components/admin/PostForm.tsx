'use client'

import { useActionState, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Upload, X } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { createPost, updatePost } from '@/app/(admin)/actions/blog'
import { uploadImage } from '@/app/(admin)/actions/storage'

const initialState = { success: false, error: '', message: '' }

export default function PostForm({ post }: { post?: any }) {
  const router = useRouter()
  const [coverImage, setCoverImage] = useState(post?.cover_image || '')
  const [isUploading, setIsUploading] = useState(false)
  const [slug, setSlug] = useState(post?.slug || '')

  const action = post ? updatePost.bind(null, post.id) : createPost
  const [state, formAction, isPending] = useActionState(action, initialState)

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error)
    } else if (state?.success) {
      toast.success(state.message || 'Saved successfully!')
      if (!post) {
        router.push('/admin/blog')
      }
    }
  }, [state, router, post])

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!post) {
      setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''))
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    const result = await uploadImage(formData)
    if (result.success) {
      setCoverImage(result.url)
      toast.success('Image uploaded successfully')
    } else {
      toast.error(result.error)
    }
    setIsUploading(false)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/blog"
            className="p-2 text-[#4D4D4D] hover:bg-[#F5F5F5] rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-syne, sans-serif)' }}>
              {post ? 'Edit Post' : 'Write Post'}
            </h1>
          </div>
        </div>
        <button
          type="submit"
          form="post-form"
          disabled={isPending || isUploading}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#007ACC] text-white text-sm font-semibold rounded-lg hover:bg-[#007ACC]/90 transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {isPending ? 'Saving...' : 'Save Post'}
        </button>
      </div>

      <form action={formAction} id="post-form" className="space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-[#e5e7eb] space-y-5">
              <div>
                <label className="block text-xs font-semibold text-[#4D4D4D] mb-1.5">Post Title</label>
                <input
                  name="title"
                  type="text"
                  required
                  defaultValue={post?.title}
                  onChange={handleTitleChange}
                  placeholder="e.g. The Future of Web Development"
                  className="w-full px-4 py-2.5 rounded-lg border border-[#e5e7eb] focus:border-[#007ACC] outline-none text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4D4D4D] mb-1.5">Slug</label>
                <input
                  name="slug"
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#e5e7eb] bg-[#F5F5F5] focus:bg-white focus:border-[#007ACC] outline-none text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4D4D4D] mb-1.5">Excerpt (Short Summary)</label>
                <textarea
                  name="excerpt"
                  rows={2}
                  required
                  defaultValue={post?.excerpt}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#e5e7eb] focus:border-[#007ACC] outline-none text-sm resize-none"
                />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#e5e7eb] space-y-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-[#1a1a1a]">Content (Markdown)</h2>
              </div>
              
              <textarea
                name="content"
                rows={20}
                required
                defaultValue={post?.content}
                placeholder="Write your post content using Markdown formatting..."
                className="w-full px-4 py-4 rounded-lg border border-[#e5e7eb] focus:border-[#007ACC] outline-none text-sm font-mono leading-relaxed resize-y min-h-[400px]"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-[#e5e7eb] space-y-5">
              <h2 className="font-semibold text-[#1a1a1a] mb-4">Cover Image</h2>
              
              <div>
                <input type="hidden" name="cover_image" value={coverImage} />
                
                {coverImage ? (
                  <div className="relative rounded-lg overflow-hidden border border-[#e5e7eb] group aspect-video">
                    <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setCoverImage('')}
                      className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed border-[#e5e7eb] hover:border-[#007ACC] hover:bg-[#F5F5F5] rounded-lg cursor-pointer transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-6 h-6 text-[#9ca3af] mb-2" />
                      <p className="text-xs text-[#4D4D4D] font-medium">
                        {isUploading ? 'Uploading...' : 'Click to upload'}
                      </p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isUploading} />
                  </label>
                )}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#e5e7eb] space-y-5">
              <h2 className="font-semibold text-[#1a1a1a] mb-4">Settings</h2>
              
              <div>
                <label className="block text-xs font-semibold text-[#4D4D4D] mb-1.5">Category</label>
                <select
                  name="category"
                  required
                  defaultValue={post?.category || 'tech'}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#e5e7eb] focus:border-[#007ACC] outline-none text-sm bg-white"
                >
                  <option value="tech">Technology</option>
                  <option value="design">Design</option>
                  <option value="business">Business</option>
                  <option value="tutorials">Tutorials</option>
                  <option value="news">News</option>
                </select>
              </div>

              <div className="pt-4 border-t border-[#e5e7eb]">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="published"
                    defaultChecked={post?.published ?? true}
                    className="w-4 h-4 rounded border-[#e5e7eb] text-[#007ACC] focus:ring-[#007ACC]"
                  />
                  <span className="text-sm font-medium text-[#1a1a1a]">Publish post</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
