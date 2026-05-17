import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import StatsSection from '@/components/sections/StatsSection'
import ServicesSection from '@/components/sections/ServicesSection'
import FeaturedProjectsSection from '@/components/sections/FeaturedProjectsSection'
import { SITE_CONFIG } from '@/lib/constants'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
  description: SITE_CONFIG.description,
}

export default async function HomePage() {
  const supabase = await createClient()
  const { data: featuredProjects } = await supabase
    .from('projects')
    .select('*')
    .eq('published', true)
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(3)

  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <FeaturedProjectsSection projects={featuredProjects || []} />
    </>
  )
}
