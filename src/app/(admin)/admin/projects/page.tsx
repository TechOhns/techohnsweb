import Link from 'next/link'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Plus, Edit2, Trash2, Globe, Code2 as Github } from 'lucide-react'
import { Project } from '@/types'

export default async function AdminProjectsPage() {
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

  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-syne, sans-serif)' }}>
            Projects
          </h1>
          <p className="text-sm text-[#4D4D4D] mt-1">Manage your portfolio projects</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 px-4 py-2 bg-[#007ACC] text-white text-sm font-semibold rounded-lg hover:bg-[#007ACC]/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#F5F5F5] text-[#4D4D4D] font-semibold text-xs uppercase tracking-wider border-b border-[#e5e7eb]">
              <tr>
                <th className="px-6 py-4">Project</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Links</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              {projects?.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-[#9ca3af]">
                    No projects found. Click "Add Project" to create one.
                  </td>
                </tr>
              )}
              {projects?.map((project: Project) => (
                <tr key={project.id} className="hover:bg-[#F5F5F5]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-[#1a1a1a]">{project.title}</div>
                    <div className="text-xs text-[#9ca3af] mt-0.5">{project.slug}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F5F5F5] text-[#4D4D4D] border border-[#e5e7eb]">
                      {project.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {project.published ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-800">
                          PUBLISHED
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-800">
                          DRAFT
                        </span>
                      )}
                      {project.featured && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-yellow-100 text-yellow-800">
                          FEATURED
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 text-[#9ca3af]">
                      {project.live_url ? (
                        <a href={project.live_url} target="_blank" rel="noreferrer" className="hover:text-[#007ACC]">
                          <Globe className="w-4 h-4" />
                        </a>
                      ) : (
                        <Globe className="w-4 h-4 opacity-30" />
                      )}
                      {project.github_url ? (
                        <a href={project.github_url} target="_blank" rel="noreferrer" className="hover:text-[#1a1a1a]">
                          <Github className="w-4 h-4" />
                        </a>
                      ) : (
                        <Github className="w-4 h-4 opacity-30" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/projects/${project.id}`}
                        className="p-1.5 text-[#4D4D4D] hover:text-[#007ACC] hover:bg-[#007ACC]/10 rounded-md transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      {/* Delete button will be implemented in a client component or via a form action */}
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
