import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'About Us',
  description: `Learn about ${SITE_CONFIG.name} — our story, mission, and the team behind the work.`,
}

const TEAM = [
  { name: 'Samuel Wakumelo', role: 'Founder', initials: 'SW', color: '#007ACC' },
  { name: 'Pumulo Mubiana', role: 'Co-Founder', initials: 'PM', color: '#FFCC00' },
]

const VALUES = [
  { title: 'Craft over speed', body: 'We believe great software takes deliberate effort. We ship quality, not just velocity.' },
  { title: 'Transparent by default', body: 'No hidden timelines, no surprise invoices. We keep clients in the loop at every stage.' },
  { title: 'Built for longevity', body: 'Code that lasts. We write maintainable, well-documented solutions — not clever hacks.' },
  { title: 'Local first, global ready', body: 'Proud to be Zambian-built. Our solutions work for African markets and beyond.' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[#1a1a1a]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-[#007ACC] tracking-widest uppercase mb-4">Our story</p>
          <h1
            className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-syne, sans-serif)' }}
          >
            Building Africa&apos;s{' '}
            <span style={{ color: '#FFCC00' }}>Digital Future</span>
          </h1>
          <p className="text-white/65 text-lg max-w-2xl mx-auto leading-relaxed">
            {SITE_CONFIG.name} is a Lusaka-based software studio founded on one belief: that world-class
            technology should be built right here, for the people who need it most.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-semibold text-[#007ACC] tracking-widest uppercase mb-3">Mission</p>
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] mb-5"
                style={{ fontFamily: 'var(--font-syne, sans-serif)' }}
              >
                Technology that moves people forward
              </h2>
              <p className="text-[#4D4D4D] leading-relaxed mb-4">
                We partner with startups, NGOs, and established businesses to turn their ideas into
                digital products that actually work — beautifully designed, rigorously tested, and
                built to scale.
              </p>
              <p className="text-[#4D4D4D] leading-relaxed">
                From a simple landing page to a multi-tenant SaaS platform, we approach every project
                with the same level of care and precision.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {VALUES.map((v) => (
                <div
                  key={v.title}
                  className="bg-[#F5F5F5] rounded-2xl p-5 border border-[#e5e7eb]"
                >
                  <h3
                    className="text-sm font-bold text-[#1a1a1a] mb-2"
                    style={{ fontFamily: 'var(--font-syne, sans-serif)' }}
                  >
                    {v.title}
                  </h3>
                  <p className="text-xs text-[#4D4D4D] leading-relaxed">{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-[#F5F5F5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-[#007ACC] tracking-widest uppercase mb-3">The team</p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#1a1a1a]"
              style={{ fontFamily: 'var(--font-syne, sans-serif)' }}
            >
              The people behind the work
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {TEAM.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl p-6 border border-[#e5e7eb] text-center">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white mx-auto mb-4"
                  style={{ backgroundColor: member.color }}
                >
                  {member.initials}
                </div>
                <h3
                  className="font-bold text-[#1a1a1a] mb-1"
                  style={{ fontFamily: 'var(--font-syne, sans-serif)' }}
                >
                  {member.name}
                </h3>
                <p className="text-sm text-[#9ca3af]">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
