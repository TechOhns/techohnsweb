'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Globe, Smartphone, Layers, Palette, Lightbulb, ArrowRight } from 'lucide-react'

const ICON_MAP: Record<string, React.ElementType> = {
  Globe, Smartphone, Layers, Palette, Lightbulb,
}

const SERVICES = [
  {
    icon: 'Globe',
    title: 'Web Development',
    description: 'Scalable, high-performance web applications built with Next.js, TypeScript, and modern APIs.',
    features: ['Next.js & React', 'REST & GraphQL', 'SEO optimized'],
    color: '#007ACC',
    bg: 'rgba(0,122,204,0.06)',
  },
  {
    icon: 'Smartphone',
    title: 'Mobile Apps',
    description: 'Cross-platform iOS & Android apps built with React Native that feel truly native.',
    features: ['iOS & Android', 'Push notifications', 'Offline support'],
    color: '#007ACC',
    bg: 'rgba(0,122,204,0.06)',
  },
  {
    icon: 'Layers',
    title: 'Full Stack Solutions',
    description: 'End-to-end development — database design, backend APIs, and polished frontend UIs.',
    features: ['Database design', 'CI/CD pipelines', 'Cloud deploy'],
    color: '#007ACC',
    bg: 'rgba(0,122,204,0.06)',
  },
  {
    icon: 'Palette',
    title: 'UI/UX Design',
    description: 'Research-driven interfaces that balance beauty with usability and convert visitors.',
    features: ['Wireframing', 'Design systems', 'Usability testing'],
    color: '#FFCC00',
    bg: 'rgba(255,204,0,0.06)',
  },
  {
    icon: 'Lightbulb',
    title: 'Tech Consulting',
    description: 'Strategic technical guidance to help your business make smarter technology decisions.',
    features: ['Architecture review', 'Tech stack selection', 'Code audits'],
    color: '#4D4D4D',
    bg: 'rgba(77,77,77,0.06)',
  },
]

export default function ServicesSection() {
  return (
    <section className="section-padding bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-[#007ACC] tracking-widest uppercase mb-3"
          >
            What we do
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-[#1a1a1a] mb-5"
            style={{ fontFamily: 'var(--font-syne, sans-serif)' }}
          >
            Services Built for{' '}
            <span style={{ color: 'var(--blue)' }}>Growth</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-[#4D4D4D] max-w-xl mx-auto leading-relaxed"
          >
            From idea to deployment, we cover every layer of the stack. Here&apos;s how we help
            businesses build better.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => {
            const Icon = ICON_MAP[service.icon] ?? Globe
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group bg-white rounded-2xl p-7 border border-[#e5e7eb] hover:border-[#007ACC]/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: service.bg }}
                >
                  <Icon className="w-6 h-6" style={{ color: service.color }} />
                </div>

                <h3
                  className="text-lg font-bold text-[#1a1a1a] mb-2"
                  style={{ fontFamily: 'var(--font-syne, sans-serif)' }}
                >
                  {service.title}
                </h3>
                <p className="text-[#4D4D4D] text-sm leading-relaxed mb-5">{service.description}</p>

                {/* Features */}
                <ul className="space-y-1.5 mb-6">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-[#4D4D4D]">
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: service.color }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Arrow */}
                <div
                  className="flex items-center gap-1 text-xs font-semibold transition-all duration-200 group-hover:gap-2"
                  style={{ color: service.color }}
                >
                  Learn more
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </motion.div>
            )
          })}

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: SERVICES.length * 0.08 }}
            className="bg-[#007ACC] rounded-2xl p-7 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-5">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
              <h3
                className="text-lg font-bold text-white mb-2"
                style={{ fontFamily: 'var(--font-syne, sans-serif)' }}
              >
                Have a project in mind?
              </h3>
              <p className="text-white/75 text-sm leading-relaxed">
                Let&apos;s talk. We&apos;ll help you scope, plan, and ship it.
              </p>
            </div>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-[#007ACC] text-sm font-semibold hover:bg-[#FFCC00] hover:text-[#1a1a1a] transition-all duration-200 self-start"
            >
              Get a free quote
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[#007ACC] font-semibold text-sm hover:underline"
          >
            Explore all services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
