import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

const CATEGORY_META: Record<string, { label: string; color: string }> = {
  web: { label: 'Web App', color: '#1a1a1a' },
  mobile: { label: 'Mobile App', color: '#1a3a2a' },
  fullstack: { label: 'Full Stack', color: '#007ACC' },
  'ui-ux': { label: 'UI/UX', color: '#FFCC00' },
  consulting: { label: 'Consulting', color: '#2d1a6e' },
}

type Params = { slug: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: project } = await supabase.from('projects').select('title, tagline').eq('slug', slug).single()
  
  if (!project) return { title: 'Project not found' }
  return {
    title: project.title,
    description: project.tagline,
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: project } = await supabase.from('projects').select('*').eq('slug', slug).single()

  if (!project || !project.published) notFound()
  
  const meta = CATEGORY_META[project.category] || { label: 'Project', color: '#007ACC' }
  const cover_color = meta.color

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16" style={{ backgroundColor: cover_color }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-white/60 text-sm hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> All projects
          </Link>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/15 text-white mb-4 inline-block uppercase tracking-wider">
            {meta.label}
          </span>
          <h1
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-syne, sans-serif)' }}
          >
            {project.title}
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl">{project.tagline}</p>
          <div className="flex items-center gap-3 mt-8">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#1a1a1a] text-sm font-semibold hover:bg-[#FFCC00] transition-colors"
              >
                <ExternalLink className="w-4 h-4" /> Live site
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/15 text-white text-sm font-semibold hover:bg-white/25 transition-colors"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2
                  className="text-lg font-bold text-[#1a1a1a] mb-3"
                  style={{ fontFamily: 'var(--font-syne, sans-serif)' }}
                >
                  Overview
                </h2>
                <p className="text-[#4D4D4D] leading-relaxed">{project.description}</p>
              </div>
              <div>
                <h2
                  className="text-lg font-bold text-[#1a1a1a] mb-3"
                  style={{ fontFamily: 'var(--font-syne, sans-serif)' }}
                >
                  The Challenge
                </h2>
                <p className="text-[#4D4D4D] leading-relaxed">{project.challenge}</p>
              </div>
              <div>
                <h2
                  className="text-lg font-bold text-[#1a1a1a] mb-3"
                  style={{ fontFamily: 'var(--font-syne, sans-serif)' }}
                >
                  Our Solution
                </h2>
                <p className="text-[#4D4D4D] leading-relaxed">{project.solution}</p>
              </div>
              <div className="bg-[#007ACC]/5 border border-[#007ACC]/15 rounded-2xl p-6">
                <h2
                  className="text-lg font-bold text-[#1a1a1a] mb-3"
                  style={{ fontFamily: 'var(--font-syne, sans-serif)' }}
                >
                  Outcome
                </h2>
                <p className="text-[#4D4D4D] leading-relaxed">{project.outcome}</p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-[#F5F5F5] rounded-2xl p-6 border border-[#e5e7eb]">
                <h3
                  className="text-sm font-bold text-[#1a1a1a] mb-4"
                  style={{ fontFamily: 'var(--font-syne, sans-serif)' }}
                >
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(project.tech_stack || []).map((t: string) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1.5 rounded-lg bg-white border border-[#e5e7eb] text-[#4D4D4D] font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-[#1a1a1a] rounded-2xl p-6 text-white">
                <p className="text-sm font-semibold mb-2" style={{ fontFamily: 'var(--font-syne, sans-serif)' }}>
                  Like what you see?
                </p>
                <p className="text-white/60 text-xs mb-4 leading-relaxed">
                  We can build something similar for you.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FFCC00] hover:underline"
                >
                  Get in touch →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
