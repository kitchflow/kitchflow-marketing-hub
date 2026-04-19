import type { Metadata } from 'next'
import { ContactPageContent } from '@/components/contact/ContactPageContent'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with the KitchFlow team for partnerships, press enquiries or general questions.',
  alternates: { canonical: 'https://kitchflowapp.com/contact' },
}

export default function ContactPage() {
  return <ContactPageContent />
}
