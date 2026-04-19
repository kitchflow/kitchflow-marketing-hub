'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/KFButton'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { Logo } from '@/components/ui/Logo'
import { cn } from '@/lib/utils'

export function Navbar() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const navItemClass = (href: string) =>
    cn(
      'text-sm font-medium text-foreground/80 hover:text-foreground transition-colors',
      pathname === href && 'text-foreground',
    )

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'bg-background/80 backdrop-blur-xl shadow-soft border-b border-border/60'
          : 'bg-background/60 backdrop-blur-md',
      )}
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/#features"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              {t('nav.features')}
            </Link>
            <Link href="/blog" className={navItemClass('/blog')}>
              {t('nav.blog')}
            </Link>
            <Link href="/contact" className={navItemClass('/contact')}>
              {t('nav.contact')}
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher compact />
            <Button size="sm">{t('nav.download')}</Button>
          </div>

          <button
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300 ease-out border-b border-border bg-background',
          open ? 'max-h-96' : 'max-h-0',
        )}
      >
        <div className="px-5 py-4 flex flex-col gap-4">
          <Link href="/#features" className="py-2 text-base font-medium">
            {t('nav.features')}
          </Link>
          <Link href="/blog" className="py-2 text-base font-medium">
            {t('nav.blog')}
          </Link>
          <Link href="/contact" className="py-2 text-base font-medium">
            {t('nav.contact')}
          </Link>
          <div className="flex items-center justify-between pt-2">
            <LanguageSwitcher />
            <Button size="sm">{t('nav.download')}</Button>
          </div>
        </div>
      </div>
    </header>
  )
}
