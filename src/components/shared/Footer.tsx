import Link from 'next/link'
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG, PUBLIC_NAV } from '@/lib/constants'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white text-sm"
                style={{ backgroundColor: 'var(--blue)' }}
              >
                TO
              </div>
              <span
                className="font-bold text-xl tracking-tight"
                style={{ fontFamily: 'var(--font-syne, sans-serif)' }}
              >
                TechOhns
              </span>
            </div>
            <p className="text-[#9ca3af] text-sm leading-relaxed max-w-xs mb-6">
              Building tomorrow's digital solutions. We craft world-class web apps, mobile
              applications, and digital experiences for businesses globally.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {[
                { label: 'GH', title: 'GitHub', href: SITE_CONFIG.socials.github },
                { label: 'LI', title: 'LinkedIn', href: SITE_CONFIG.socials.linkedin },
                { label: 'IG', title: 'Instagram', href: SITE_CONFIG.socials.instagram },
              ].map(({ href, label, title }) => (
                <a
                  key={title}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={title}
                  className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-[#9ca3af] hover:bg-[#007ACC] hover:text-white transition-all duration-200 text-xs font-bold"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm tracking-wider uppercase text-[#FFCC00] mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {PUBLIC_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[#9ca3af] hover:text-white text-sm transition-colors flex items-center gap-1 group"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm tracking-wider uppercase text-[#FFCC00] mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-start gap-2.5 text-[#9ca3af] hover:text-white text-sm transition-colors"
                >
                  <Mail className="w-4 h-4 mt-0.5 text-[#007ACC] flex-shrink-0" />
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-start gap-2.5 text-[#9ca3af] hover:text-white text-sm transition-colors"
                >
                  <Phone className="w-4 h-4 mt-0.5 text-[#007ACC] flex-shrink-0" />
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2.5 text-[#9ca3af] text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 text-[#007ACC] flex-shrink-0" />
                  {SITE_CONFIG.location}
                </div>
              </li>
            </ul>

            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-[#1a1a1a] transition-all hover:opacity-90"
              style={{ backgroundColor: 'var(--gold)' }}
            >
              Chat on WhatsApp
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#6b7280] text-xs">
            © {year} TechOhns. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-[#6b7280]">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
