'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink } from 'lucide-react'

// Static showcase — replace with real DB data once Supabase is connected
const FEATURED_PROJECTS = [
  {
    id: '1',
    slug: 'lusaka-connect',
    title: 'Lusaka Connect',
    tagline: 'Urban infrastructure reporting platform for Lusaka City Council',
    category: 'Full Stack',
    tech_stack: ['Next.js', 'Supabase', 'PostGIS', 'Mapbox'],
    cover_color: '#007ACC',
    accent: '#FFCC00',
  },
  {
    id: '2',
    slug: 'zambia-vote',
    title: 'ZambiaVote',
    tagline: 'Secure digital election platform for higher education institutions',
    category: 'Web App',
    tech_stack: ['Next.js', 'TypeScript', 'Supabase', 'ShadCN'],
    cover_color: '#1a1a1a',
    accent: '#007ACC',
  },
  {
    id: '3',
    slug: 'blueoak-realty',
    title: 'BlueOak Realty',
    tagline: 'Pan-African real estate listing platform across 5 markets',
    category: 'Mobile + Web',
    tech_stack: ['React Native', 'Expo', 'Supabase', 'Google Maps'],
    cover_color: '#1a3a2a',
    accent: '#FFCC00',
  },
]

const CATEGORY_COLORS: Record<string, string> = {
  'Full Stack': '#007ACC',
  'Web App': '#4D4D4D',
  'Mobile + Web': '#007ACC',
}

export default function FeaturedProjectsSection() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-semibold text-[#007ACC] tracking-widest uppercase mb-3"
            >
              Selected work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold text-[#1a1a1a]"
              style={{ fontFamily: 'var(--font-syne, sans-serif)' }}
            >
              Projects We&apos;re{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #007ACC, #FFCC00)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Proud Of
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#e5e7eb] text-sm font-semibold text-[#1a1a1a] hover:border-[#007ACC]/30 hover:bg-[#007ACC]/5 hover:text-[#007ACC] transition-all duration-200"
            >
              View all projects
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Projects grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {FEATURED_PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="group"
            >
              <Link href={`/projects/${project.slug}`} className="block">
                {/* Cover */}
                <div
                  className="relative w-full h-56 rounded-2xl overflow-hidden mb-5 transition-transform duration-300 group-hover:scale-[1.02]"
                  style={{ backgroundColor: project.cover_color }}
                >
                  {/* Decorative grid */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
                      backgroundSize: '32px 32px',
                    }}
                  />

                  {/* Mock UI frame */}
                  <div className="absolute inset-4 bg-white/10 rounded-xl border border-white/15 backdrop-blur-sm flex flex-col overflow-hidden">
                    <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/10">
                      <div className="w-2 h-2 rounded-full bg-white/30" />
                      <div className="w-2 h-2 rounded-full bg-white/30" />
                      <div className="w-2 h-2 rounded-full bg-white/30" />
                    </div>
                    <div className="flex-1 p-3 space-y-2">
                      <div className="h-2 rounded bg-white/20 w-3/4" />
                      <div className="h-2 rounded bg-white/15 w-1/2" />
                      <div className="grid grid-cols-3 gap-2 mt-3">
                        {[1, 2, 3].map((n) => (
                          <div key={n} className="h-8 rounded-lg bg-white/10" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Accent dot */}
                  <div
                    className="absolute top-3 right-3 w-3 h-3 rounded-full"
                    style={{ backgroundColor: project.accent }}
                  />

                  {/* Hover overlay */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-sm text-[10px] font-semibold text-[#1a1a1a]">
                      <ExternalLink className="w-3 h-3" />
                      View project
                    </div>
                  </div>
                </div>

                {/* Meta */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: `${CATEGORY_COLORS[project.category] || '#007ACC'}15`,
                        color: CATEGORY_COLORS[project.category] || '#007ACC',
                      }}
                    >
                      {project.category}
                    </span>
                  </div>

                  <h3
                    className="text-xl font-bold text-[#1a1a1a] mb-1.5 group-hover:text-[#007ACC] transition-colors"
                    style={{ fontFamily: 'var(--font-syne, sans-serif)' }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-[#4D4D4D] text-sm leading-relaxed mb-4">{project.tagline}</p>

                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech_stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] px-2.5 py-1 rounded-md bg-[#F5F5F5] text-[#4D4D4D] font-medium border border-[#e5e7eb]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
