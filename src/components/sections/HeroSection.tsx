'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Code2, Smartphone, Globe, Zap } from 'lucide-react'

const ROTATING_WORDS = ['Web Apps', 'Mobile Apps', 'Full Stack', 'Digital Experiences', 'SaaS Products']

const FLOATING_BADGES = [
  { icon: Code2, label: 'Next.js', color: '#007ACC', delay: 0, pos: 'absolute -left-4 top-16' },
  { icon: Smartphone, label: 'React Native', color: '#4D4D4D', delay: 0.2, pos: 'absolute -right-6 top-32' },
  { icon: Globe, label: 'Full Stack', color: '#007ACC', delay: 0.4, pos: 'absolute -left-6 bottom-24' },
  { icon: Zap, label: 'Supabase', color: '#FFCC00', delay: 0.6, pos: 'absolute -right-4 bottom-16' },
]

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    const word = ROTATING_WORDS[wordIndex]
    if (typing) {
      if (displayed.length < word.length) {
        const t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setTyping(false), 2000)
        return () => clearTimeout(t)
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
        return () => clearTimeout(t)
      } else {
        setWordIndex((i) => (i + 1) % ROTATING_WORDS.length)
        setTyping(true)
      }
    }
  }, [displayed, typing, wordIndex])

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-white">
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,122,204,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,122,204,0.04) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      {/* Radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,122,204,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — copy */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#007ACC]/20 bg-[#007ACC]/5 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-[#007ACC] animate-pulse" />
              <span className="text-[#007ACC] text-sm font-medium">Available for new projects</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-[4.5rem] font-bold leading-[1.08] tracking-tight text-[#1a1a1a] mb-6"
              style={{ fontFamily: 'var(--font-syne, sans-serif)' }}
            >
              We Build{' '}
              <span className="relative inline-block">
                <span style={{ color: 'var(--blue)' }}>{displayed}</span>
                <span
                  className="inline-block w-[3px] ml-1 animate-pulse"
                  style={{
                    height: '0.85em',
                    backgroundColor: 'var(--gold)',
                    verticalAlign: 'middle',
                    display: 'inline-block',
                  }}
                />
              </span>
              <br />
              That{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #007ACC 0%, #1a8dd4 60%, #FFCC00 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Scale.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-[#4D4D4D] leading-relaxed max-w-lg mb-10"
            >
              TechOhns delivers world-class software — from sleek web apps to powerful mobile
              experiences. We turn your ideas into production-ready products, fast.
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/contact"
                id="hero-cta-start"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white text-sm transition-all duration-200 hover:opacity-90 hover:shadow-xl active:scale-95"
                style={{ backgroundColor: 'var(--blue)', boxShadow: '0 4px 20px rgba(0,122,204,0.3)' }}
              >
                Start a Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/projects"
                id="hero-cta-work"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-[#1a1a1a] text-sm border border-[#e5e7eb] bg-white hover:border-[#007ACC]/30 hover:bg-[#007ACC]/5 hover:text-[#007ACC] transition-all duration-200 active:scale-95"
              >
                View Our Work
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 flex items-center gap-6"
            >
              <div className="flex -space-x-2">
                {(['#007ACC', '#FFCC00', '#4D4D4D', '#007ACC'] as const).map((c, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-bold"
                    style={{ backgroundColor: c }}
                  >
                    {['AB', 'TC', 'MN', 'PQ'][i]}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs font-semibold text-[#1a1a1a]">Trusted by 30+ clients</p>
                <p className="text-xs text-[#9ca3af]">across Africa &amp; beyond</p>
              </div>
            </motion.div>
          </div>

          {/* Right — code card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div
              className="relative rounded-2xl overflow-hidden border border-[#e5e7eb]"
              style={{ background: 'linear-gradient(135deg, #F5F5F5 0%, #ffffff 100%)' }}
            >
              {/* Browser bar */}
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[#e5e7eb] bg-white">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <div className="flex-1 mx-4 h-6 rounded-md bg-[#F5F5F5] flex items-center px-3">
                  <span className="text-[10px] text-[#9ca3af]">techohns.com</span>
                </div>
              </div>

              {/* Code body */}
              <div className="p-6 font-mono text-sm leading-relaxed">
                <div className="flex gap-4">
                  <div className="text-[#9ca3af] text-right select-none" style={{ minWidth: '1.5rem' }}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <div key={n} className="text-xs leading-6">{n}</div>
                    ))}
                  </div>
                  <div className="flex-1 text-xs leading-6">
                    <div><span style={{ color: '#007ACC' }}>const</span> <span style={{ color: '#1a1a1a' }}>project</span> <span style={{ color: '#4D4D4D' }}>=</span> {'{'}</div>
                    <div className="pl-4"><span style={{ color: '#4D4D4D' }}>name</span>: <span style={{ color: '#16a34a' }}>&quot;YourApp&quot;</span>,</div>
                    <div className="pl-4"><span style={{ color: '#4D4D4D' }}>stack</span>: [<span style={{ color: '#16a34a' }}>&quot;Next.js&quot;</span>, <span style={{ color: '#16a34a' }}>&quot;Supabase&quot;</span>],</div>
                    <div className="pl-4"><span style={{ color: '#4D4D4D' }}>status</span>: <span style={{ color: '#16a34a' }}>&quot;shipped&quot;</span> <span style={{ color: '#FFCC00' }}>✓</span></div>
                    <div>{'}'}</div>
                    <div className="mt-2"><span style={{ color: '#007ACC' }}>await</span> TechOhns.<span style={{ color: '#4D4D4D' }}>build</span>(project)</div>
                    <div className="mt-2 text-[#9ca3af]">{'// ✅ Deployed in 6 weeks'}</div>
                    <div className="text-[#9ca3af]">{'// 🚀 100% client satisfaction'}</div>
                    <div className="text-[#9ca3af]">{'// ⚡ Production-ready code'}</div>
                  </div>
                </div>
              </div>

              {/* Status bar */}
              <div className="flex items-center justify-between px-5 py-2.5 bg-[#007ACC]">
                <span className="text-white text-[10px] font-medium">TechOhns Studio</span>
                <span className="text-white/80 text-[10px]">TypeScript • Next.js</span>
              </div>
            </div>

            {/* Floating badges */}
            {FLOATING_BADGES.map(({ icon: Icon, label, color, delay, pos }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + delay }}
                className={`${pos} flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-[#e5e7eb] shadow-lg text-xs font-semibold`}
                style={{ color }}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </motion.div>
            ))}

            {/* Decorative rings */}
            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full border-2 border-dashed border-[#007ACC]/15 pointer-events-none" />
            <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full border-2 border-[#FFCC00]/30 pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
