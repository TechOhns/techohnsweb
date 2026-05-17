'use client'

import { useActionState, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Upload, X } from 'lucide-react'
import Link from 'next/link'
import { createProject, updateProject } from '@/app/(admin)/actions/projects'
import { uploadImage } from '@/app/(admin)/actions/storage'

const initialState = { success: false, error: '', message: '' }

export default function ProjectForm({ project }: { project?: any }) {
  const router = useRouter()
  const [coverImage, setCoverImage] = useState(project?.cover_image || '')
  const [isUploading, setIsUploading] = useState(false)
  const [slug, setSlug] = useState(project?.slug || '')

  // Create or Update action
  const action = project ? updateProject.bind(null, project.id) : createProject
  const [state, formAction, isPending] = useActionState(action, initialState)

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!project) {
      // Auto-generate slug for new projects
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
    } else {
      alert(result.error)
    }
    setIsUploading(false)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/projects"
            className="p-2 text-[#4D4D4D] hover:bg-[#F5F5F5] rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-syne, sans-serif)' }}>
              {project ? 'Edit Project' : 'New Project'}
            </h1>
          </div>
        </div>
        <button
          type="submit"
          form="project-form"
          disabled={isPending || isUploading}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#007ACC] text-white text-sm font-semibold rounded-lg hover:bg-[#007ACC]/90 transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {isPending ? 'Saving...' : 'Save Project'}
        </button>
      </div>

      {state?.error && (
        <div className="p-4 bg-red-50 text-red-800 rounded-xl border border-red-200 text-sm font-medium">
          {state.error}
        </div>
      )}

      <form action={formAction} id="project-form" className="space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Main content - 2 cols */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-[#e5e7eb] space-y-5">
              <h2 className="font-semibold text-[#1a1a1a] mb-4">Basic Information</h2>
              
              <div>
                <label className="block text-xs font-semibold text-[#4D4D4D] mb-1.5">Project Title</label>
                <input
                  name="title"
                  type="text"
                  required
                  defaultValue={project?.title}
                  onChange={handleTitleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#e5e7eb] focus:border-[#007ACC] outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4D4D4D] mb-1.5">Slug (URL)</label>
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
                <label className="block text-xs font-semibold text-[#4D4D4D] mb-1.5">Tagline</label>
                <input
                  name="tagline"
                  type="text"
                  required
                  defaultValue={project?.tagline}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#e5e7eb] focus:border-[#007ACC] outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4D4D4D] mb-1.5">Short Description</label>
                <textarea
                  name="description"
                  rows={3}
                  required
                  defaultValue={project?.description}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#e5e7eb] focus:border-[#007ACC] outline-none text-sm resize-none"
                />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#e5e7eb] space-y-5">
              <h2 className="font-semibold text-[#1a1a1a] mb-4">Case Study Content</h2>
              
              <div>
                <label className="block text-xs font-semibold text-[#4D4D4D] mb-1.5">The Challenge</label>
                <textarea
                  name="challenge"
                  rows={4}
                  required
                  defaultValue={project?.challenge}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#e5e7eb] focus:border-[#007ACC] outline-none text-sm resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4D4D4D] mb-1.5">The Solution</label>
                <textarea
                  name="solution"
                  rows={4}
                  required
                  defaultValue={project?.solution}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#e5e7eb] focus:border-[#007ACC] outline-none text-sm resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4D4D4D] mb-1.5">The Outcome</label>
                <textarea
                  name="outcome"
                  rows={4}
                  required
                  defaultValue={project?.outcome}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#e5e7eb] focus:border-[#007ACC] outline-none text-sm resize-none"
                />
              </div>
            </div>
          </div>

          {/* Sidebar - 1 col */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-[#e5e7eb] space-y-5">
              <h2 className="font-semibold text-[#1a1a1a] mb-4">Media</h2>
              
              <div>
                <label className="block text-xs font-semibold text-[#4D4D4D] mb-2">Cover Image</label>
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
              <h2 className="font-semibold text-[#1a1a1a] mb-4">Metadata</h2>
              
              <div>
                <label className="block text-xs font-semibold text-[#4D4D4D] mb-1.5">Category</label>
                <select
                  name="category"
                  required
                  defaultValue={project?.category || 'web'}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#e5e7eb] focus:border-[#007ACC] outline-none text-sm bg-white"
                >
                  <option value="web">Web App</option>
                  <option value="mobile">Mobile App</option>
                  <option value="fullstack">Full Stack</option>
                  <option value="ui-ux">UI/UX Design</option>
                  <option value="consulting">Consulting</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4D4D4D] mb-1.5">Tech Stack (comma separated)</label>
                <input
                  name="tech_stack"
                  type="text"
                  required
                  defaultValue={project?.tech_stack?.join(', ')}
                  placeholder="React, Node.js, PostgreSQL"
                  className="w-full px-4 py-2.5 rounded-lg border border-[#e5e7eb] focus:border-[#007ACC] outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4D4D4D] mb-1.5">Live URL (optional)</label>
                <input
                  name="live_url"
                  type="url"
                  defaultValue={project?.live_url}
                  placeholder="https://"
                  className="w-full px-4 py-2.5 rounded-lg border border-[#e5e7eb] focus:border-[#007ACC] outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4D4D4D] mb-1.5">GitHub URL (optional)</label>
                <input
                  name="github_url"
                  type="url"
                  defaultValue={project?.github_url}
                  placeholder="https://github.com/..."
                  className="w-full px-4 py-2.5 rounded-lg border border-[#e5e7eb] focus:border-[#007ACC] outline-none text-sm"
                />
              </div>

              <div className="pt-4 border-t border-[#e5e7eb] space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="published"
                    defaultChecked={project?.published ?? true}
                    className="w-4 h-4 rounded border-[#e5e7eb] text-[#007ACC] focus:ring-[#007ACC]"
                  />
                  <span className="text-sm font-medium text-[#1a1a1a]">Publish immediately</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="featured"
                    defaultChecked={project?.featured ?? false}
                    className="w-4 h-4 rounded border-[#e5e7eb] text-[#007ACC] focus:ring-[#007ACC]"
                  />
                  <span className="text-sm font-medium text-[#1a1a1a]">Feature on homepage</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
