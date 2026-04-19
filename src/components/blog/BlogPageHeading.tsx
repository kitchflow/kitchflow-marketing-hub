'use client'

import { useTranslation } from 'react-i18next'

export function BlogPageHeading() {
  const { t } = useTranslation()

  return (
    <div className="mx-auto max-w-2xl text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">{t('blog.title')}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{t('blog.subtitle')}</p>
    </div>
  )
}
