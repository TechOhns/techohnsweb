import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'

// Static data — swap for getProjectBySlug(slug) once Supabase is connected
const PROJECTS: Record<string, {
  slug: string; title: string; tagline: string; description: string
  challenge: string; solution: string; outcome: string
  category: string; tech_stack: string[]; cover_color: string
  live_url?: string; github_url?: string
}> = {
  'lusaka-connect': {
    slug: 'lusaka-connect',
    title: 'Lusaka Connect',
    tagline: 'Urban infrastructure reporting platform for Lusaka City Council',
    description: 'A real-time platform that allows Lusaka residents to report infrastructure issues — broken roads, burst pipes, downed streetlights — and track their resolution via an interactive map.',
    challenge: 'The Council had no unified system for citizens to report issues, leading to duplicated complaints, slow response times, and zero visibility into resolution progress.',
    solution: 'We built a geospatially-powered Next.js application backed by Supabase and PostGIS. Citizens submit reports via a mobile-friendly form with GPS coordinates; council staff triage, assign, and close tickets through an admin dashboard.',
    outcome: 'Deployed to 3 pilot wards. Average resolution time decreased by 40%. Over 1,200 reports filed in the first month of operation.',
    category: 'Full Stack',
    tech_stack: ['Next.js 16', 'TypeScript', 'Supabase', 'PostGIS', 'Mapbox GL', 'Framer Motion'],
    cover_color: '#007ACC',
    live_url: 'https://lusaka-connect.co.zm',
  },
  'zambia-vote': {
    slug: 'zambia-vote',
    title: 'ZambiaVote',
    tagline: 'Secure digital election platform for higher education institutions',
    description: 'A tamper-proof online voting system used by universities and colleges across Zambia to run student government and academic elections.',
    challenge: 'Paper-based elections were expensive to administer, prone to ballot fraud, and produced slow results. Institutions needed a trusted, auditable digital alternative.',
    solution: 'Built a Next.js app with Supabase Auth for voter identity verification, cryptographic ballot hashing, and a live real-time results dashboard visible post-poll.',
    outcome: 'Adopted by 4 institutions. 98.7% voter satisfaction. Zero disputed results across 12 elections held on the platform.',
    category: 'Web App',
    tech_stack: ['Next.js 16', 'TypeScript', 'Supabase', 'ShadCN UI', 'Zod', 'Zustand'],
    cover_color: '#1a1a1a',
  },
}

type Params = { slug: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const project = PROJECTS[slug]
  if (!project) return { title: 'Project not found' }
  return {
    title: project.title,
    description: project.tagline,
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const project = PROJECTS[slug]

  if (!project) notFound()

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16" style={{ backgroundColor: project.cover_color }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-white/60 text-sm hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> All projects
          </Link>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/15 text-white mb-4 inline-block">
            {project.category}
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
                  {project.tech_stack.map((t) => (
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
