'use client'

import { useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import { Toaster } from 'sonner'
import i18n, { applyLangToDocument, type Lang } from '@/lib/i18n'

export function I18nProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    applyLangToDocument((i18n.language as Lang) || 'en')
    const handler = (lng: string) => applyLangToDocument((lng as Lang) || 'en')
    i18n.on('languageChanged', handler)
    return () => {
      i18n.off('languageChanged', handler)
    }
  }, [])

  return (
    <I18nextProvider i18n={i18n}>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: '9999px',
            border: '1px solid var(--border)',
            background: 'var(--background)',
            color: 'var(--foreground)',
          },
        }}
      />
    </I18nextProvider>
  )
}
