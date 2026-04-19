import type { Metadata } from 'next'
import { Hero } from '@/components/home/Hero'
import { ProblemSection } from '@/components/home/ProblemSection'
import { FeaturesSection } from '@/components/home/FeaturesSection'
import { HowItWorks } from '@/components/home/HowItWorks'
import { Screenshots } from '@/components/home/Screenshots'
import { WhoItsFor } from '@/components/home/WhoItsFor'
import { WaitlistCTA } from '@/components/home/WaitlistCTA'
import { AppJsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'KitchFlow — Kitchen Operations Management App',
  description:
    'Manage inventory, staff, tasks, waste and suppliers for your restaurant or café. KitchFlow is the all-in-one kitchen operations app.',
  alternates: { canonical: 'https://kitchflowapp.com' },
  openGraph: {
    title: 'KitchFlow — Kitchen Operations Management App',
    description: 'The all-in-one kitchen operations platform for restaurants, cafés and catering teams.',
    url: 'https://kitchflowapp.com',
    images: [{ url: '/og-image.png' }],
  },
}

export default function HomePage() {
  return (
    <>
      <AppJsonLd />
      <Hero />
      <ProblemSection />
      <FeaturesSection />
      <HowItWorks />
      <Screenshots />
      <WhoItsFor />
      <WaitlistCTA />
    </>
  )
}
