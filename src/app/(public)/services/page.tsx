import type { Metadata } from 'next'
import { Globe, Smartphone, Layers, Palette, Lightbulb, CheckCircle2, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore TechOhns services — web development, mobile apps, full stack solutions, UI/UX design, and tech consulting.',
}

const ICON_MAP: Record<string, React.ElementType> = {
  Globe, Smartphone, Layers, Palette, Lightbulb,
}

const SERVICES = [
  {
    icon: 'Globe',
    title: 'Web Development',
    tagline: 'Fast, scalable, production-grade web applications.',
    description: 'From marketing sites to complex multi-tenant platforms, we build with Next.js, TypeScript, and Supabase — optimised for performance, SEO, and maintainability.',
    features: [
      'Server components & streaming with Next.js App Router',
      'REST and GraphQL API integration',
      'SEO-first architecture',
      'Performance budgets & Lighthouse auditing',
      'Responsive, accessible design',
    ],
    color: '#007ACC',
    bg: '#EBF5FF',
  },
  {
    icon: 'Smartphone',
    title: 'Mobile App Development',
    tagline: 'iOS & Android apps that feel genuinely native.',
    description: 'Cross-platform apps built with React Native and Expo. We handle everything from app architecture through to App Store submission and post-launch support.',
    features: [
      'React Native + Expo (managed & bare workflow)',
      'iOS & Android publishing',
      'Offline-first with SQLite / MMKV',
      'Push notifications (FCM + APNs)',
      'OTA updates via EAS Update',
    ],
    color: '#007ACC',
    bg: '#EBF5FF',
  },
  {
    icon: 'Layers',
    title: 'Full Stack Development',
    tagline: 'End-to-end from database design to polished UI.',
    description: 'Complete solutions designed and deployed. We architect your database schema, build your backend APIs, craft your frontend, and wire up your DevOps pipeline.',
    features: [
      'Supabase / PostgreSQL database design',
      'Row Level Security & multi-tenancy',
      'CI/CD with GitHub Actions',
      'Docker & VPS deployment',
      'Monitoring, logging & alerting',
    ],
    color: '#007ACC',
    bg: '#EBF5FF',
  },
  {
    icon: 'Palette',
    title: 'UI/UX Design',
    tagline: 'Interfaces that delight users and drive results.',
    description: 'Research-driven design that balances aesthetics with function. We create design systems, wireframes, prototypes, and final high-fidelity UIs delivered in Figma.',
    features: [
      'User research & journey mapping',
      'Wireframing & lo-fi prototyping',
      'High-fidelity Figma designs',
      'Design system creation & documentation',
      'Usability testing & iteration',
    ],
    color: '#FFCC00',
    bg: '#FFFBEB',
  },
  {
    icon: 'Lightbulb',
    title: 'Tech Consulting',
    tagline: 'Strategic technical guidance for smarter decisions.',
    description: 'Fractional CTO, architecture review, or digital transformation roadmapping — we help businesses make the right technology choices at every stage.',
    features: [
      'Architecture review & recommendations',
      'Tech stack selection & vendor evaluation',
      'Code quality audits',
      'Digital transformation strategy',
      'Team mentoring & technical training',
    ],
    color: '#4D4D4D',
    bg: '#F5F5F5',
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[#1a1a1a]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-[#007ACC] tracking-widest uppercase mb-4">What we do</p>
          <h1
            className="text-5xl sm:text-6xl font-bold text-white mb-5"
            style={{ fontFamily: 'var(--font-syne, sans-serif)' }}
          >
            Services Built for{' '}
            <span style={{ color: '#FFCC00' }}>Growth</span>
          </h1>
          <p className="text-white/65 text-lg max-w-xl mx-auto leading-relaxed">
            From single landing pages to enterprise SaaS platforms — we cover the full stack, inside and out.
          </p>
        </div>
      </section>

      {/* Services list */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {SERVICES.map((service, i) => {
            const Icon = ICON_MAP[service.icon] ?? Globe
            return (
              <div
                key={service.title}
                id={`service-${service.icon.toLowerCase()}`}
                className={`grid lg:grid-cols-2 gap-12 items-start ${i % 2 !== 0 ? 'lg:grid-flow-col-dense' : ''}`}
              >
                {/* Text */}
                <div className={i % 2 !== 0 ? 'lg:col-start-2' : ''}>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: service.bg }}
                  >
                    <Icon className="w-6 h-6" style={{ color: service.color }} />
                  </div>
                  <h2
                    className="text-2xl font-bold text-[#1a1a1a] mb-2"
                    style={{ fontFamily: 'var(--font-syne, sans-serif)' }}
                  >
                    {service.title}
                  </h2>
                  <p className="text-sm font-medium mb-4" style={{ color: service.color }}>{service.tagline}</p>
                  <p className="text-[#4D4D4D] leading-relaxed mb-6">{service.description}</p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all hover:opacity-80"
                    style={{ borderColor: service.color, color: service.color }}
                  >
                    Discuss a project <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Features */}
                <div
                  className="rounded-2xl p-7 space-y-3"
                  style={{ backgroundColor: service.bg }}
                >
                  <p className="text-xs font-bold text-[#4D4D4D] uppercase tracking-wider mb-4">What&apos;s included</p>
                  {service.features.map((f) => (
                    <div key={f} className="flex items-start gap-3">
                      <CheckCircle2
                        className="w-4 h-4 mt-0.5 flex-shrink-0"
                        style={{ color: service.color }}
                      />
                      <span className="text-sm text-[#4D4D4D] leading-relaxed">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#007ACC]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-syne, sans-serif)' }}
          >
            Not sure which service fits?
          </h2>
          <p className="text-white/75 mb-8 leading-relaxed">
            Book a free 30-minute discovery call and let&apos;s figure it out together.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-[#007ACC] font-semibold text-sm hover:bg-[#FFCC00] hover:text-[#1a1a1a] transition-all"
          >
            Get a free consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
