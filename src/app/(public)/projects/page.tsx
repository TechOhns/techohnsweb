import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Filter } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore the full portfolio of TechOhns — web apps, mobile apps, and full stack solutions.',
}

const CATEGORY_META: Record<string, { label: string; color: string }> = {
  web: { label: 'Web App', color: '#1a1a1a' },
  mobile: { label: 'Mobile App', color: '#1a3a2a' },
  fullstack: { label: 'Full Stack', color: '#007ACC' },
  'ui-ux': { label: 'UI/UX', color: '#FFCC00' },
  consulting: { label: 'Consulting', color: '#2d1a6e' },
}

const CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'web', label: 'Web' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'fullstack', label: 'Full Stack' },
  { value: 'ui-ux', label: 'UI/UX' },
]

export default async function ProjectsPage() {
  const supabase = await createClient()
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .eq('published', true)
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false })

  const publishedProjects = projects || []

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <p className="text-sm font-semibold text-[#007ACC] tracking-widest uppercase mb-3">Portfolio</p>
              <h1
                className="text-5xl sm:text-6xl font-bold text-[#1a1a1a]"
                style={{ fontFamily: 'var(--font-syne, sans-serif)' }}
              >
                Our Work
              </h1>
            </div>
            <p className="text-[#4D4D4D] max-w-sm leading-relaxed">
              A selection of projects we&apos;ve designed, built, and shipped — from MVP to production.
            </p>
          </div>

          {/* Category filter (static — client-side filtering to be wired up) */}
          <div className="flex items-center gap-2 mt-10 flex-wrap">
            <Filter className="w-4 h-4 text-[#9ca3af]" />
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                id={`filter-${cat.value}`}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  cat.value === 'all'
                    ? 'bg-[#007ACC] text-white border-[#007ACC]'
                    : 'bg-white text-[#4D4D4D] border-[#e5e7eb] hover:border-[#007ACC]/30 hover:text-[#007ACC]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {publishedProjects.map((project) => {
              const meta = CATEGORY_META[project.category] || { label: 'Project', color: '#007ACC' }
              const cover_color = meta.color

              return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group block"
              >
                {/* Cover */}
                <div
                  className="relative w-full h-52 rounded-2xl overflow-hidden mb-5 transition-transform duration-300 group-hover:scale-[1.02]"
                  style={{ backgroundColor: cover_color }}
                >
                  {project.cover_image ? (
                    <img src={project.cover_image} alt={project.title} className="w-full h-full object-cover opacity-80 mix-blend-overlay" />
                  ) : (
                    <>
                      {/* Grid pattern */}
                      <div
                        className="absolute inset-0 opacity-10"
                        style={{
                          backgroundImage:
                            'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
                          backgroundSize: '28px 28px',
                        }}
                      />
                      {/* Mock browser chrome */}
                      <div className="absolute inset-4 bg-white/10 rounded-xl border border-white/15 backdrop-blur-sm flex flex-col overflow-hidden">
                        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/10">
                          <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                          <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                          <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                        </div>
                        <div className="flex-1 p-3 space-y-2">
                          <div className="h-2 rounded bg-white/20 w-2/3" />
                          <div className="h-2 rounded bg-white/15 w-1/2" />
                        </div>
                      </div>
                    </>
                  )}
                  {project.featured && (
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-[#FFCC00] text-[#1a1a1a]">
                        Featured
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/90 text-[10px] font-semibold text-[#1a1a1a]">
                      <ArrowUpRight className="w-3 h-3" />
                      View
                    </div>
                  </div>
                </div>

                {/* Meta */}
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[#007ACC]/10 text-[#007ACC] mb-2 inline-block uppercase tracking-wider">
                  {meta.label}
                </span>
                <h2
                  className="text-lg font-bold text-[#1a1a1a] mb-1 group-hover:text-[#007ACC] transition-colors"
                  style={{ fontFamily: 'var(--font-syne, sans-serif)' }}
                >
                  {project.title}
                </h2>
                <p className="text-sm text-[#4D4D4D] mb-4 leading-relaxed">{project.tagline}</p>
                <div className="flex flex-wrap gap-1.5">
                  {(project.tech_stack || []).map((t: string) => (
                    <span
                      key={t}
                      className="text-[10px] px-2.5 py-1 rounded-md bg-[#F5F5F5] text-[#4D4D4D] border border-[#e5e7eb] font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            )})}
            
            {publishedProjects.length === 0 && (
              <div className="sm:col-span-2 lg:col-span-3 text-center py-12">
                <p className="text-[#4D4D4D] text-sm">No projects found. Check back later!</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
