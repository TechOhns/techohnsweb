import type { Metadata } from 'next'
import './globals.css'
import { SITE_CONFIG } from '@/lib/constants'
import { Providers } from '@/components/shared/Providers'

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: ['software development', 'web development', 'mobile apps', 'full stack', 'Zambia', 'TechOhns'],
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  openGraph: {
    type: 'website',
    url: SITE_CONFIG.url,
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Load fonts in the browser — no build-time network required */}
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Syne:wght@400..800&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Lora:ital,wght@0,400..700;1,400..700&display=swap"
          rel="stylesheet"
        />
        {/* Map font families to CSS variables consumed by components */}
        <style>{`
          :root {
            --font-jakarta: 'Plus Jakarta Sans', sans-serif;
            --font-syne: 'Syne', sans-serif;
            --font-mono: 'JetBrains Mono', monospace;
            --font-lora: 'Lora', serif;
          }
        `}</style>
      </head>
      <body
        style={{ fontFamily: 'var(--font-jakarta, sans-serif)' }}
        className="antialiased"
        suppressHydrationWarning
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
