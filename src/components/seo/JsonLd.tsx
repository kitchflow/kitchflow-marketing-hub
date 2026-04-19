export function AppJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'MobileApplication',
          name: 'KitchFlow',
          description:
            'The all-in-one kitchen operations management app for restaurants, cafés and catering teams.',
          operatingSystem: 'iOS, Android',
          applicationCategory: 'BusinessApplication',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          author: {
            '@type': 'Organization',
            name: 'KitchFlow',
            url: 'https://kitchflowapp.com',
          },
        }),
      }}
    />
  )
}

export function BlogPostJsonLd({ post }: { post: any }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          datePublished: post.publishedAt,
          author: {
            '@type': 'Person',
            name: post.author?.name || 'KitchFlow Team',
          },
          publisher: {
            '@type': 'Organization',
            name: 'KitchFlow',
            url: 'https://kitchflowapp.com',
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://kitchflowapp.com/blog/${post.slug.current}`,
          },
        }),
      }}
    />
  )
}
