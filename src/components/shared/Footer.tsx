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
            <div className="flex items-center mb-4">
              <img
                src="/TechOhns.png"
                alt="TechOhns Logo"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-[#9ca3af] text-sm leading-relaxed max-w-xs mb-6">
              Building tomorrow's digital solutions. We craft world-class web apps, mobile
              applications, and digital experiences for businesses globally.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {[
                { 
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>, 
                  title: 'GitHub', 
                  href: SITE_CONFIG.socials.github 
                },
                { 
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>, 
                  title: 'LinkedIn', 
                  href: SITE_CONFIG.socials.linkedin 
                },
                { 
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>, 
                  title: 'Instagram', 
                  href: SITE_CONFIG.socials.instagram 
                },
              ].map(({ href, icon, title }) => (
                <a
                  key={title}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={title}
                  className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-[#9ca3af] hover:bg-[#007ACC] hover:text-white transition-all duration-200"
                >
                  {icon}
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
