import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://venezuela723975.com'

  // Páginas estáticas
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          es: `${baseUrl}`,
          en: `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/memorial`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/apoyo`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/documentacion`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/buscar-personas`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/organizaciones`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/cronologia`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/legal/privacidad`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/legal/aviso-legal`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/legal/politica-de-cookies`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.2,
    },
  ]

  // Velas aprobadas — indexables para SEO
  try {
    const apiUrl = process.env.INTERNAL_API_URL || 'http://localhost:4000'
    const res = await fetch(`${apiUrl}/api/v1/candles?limit=1000&approved=true`, {
      next: { revalidate: 3600 },
    })
    if (res.ok) {
      const data = await res.json()
      const candlePages: MetadataRoute.Sitemap = data.data.map((candle: any) => ({
        url: `${baseUrl}/memorial/vela/${candle.id}`,
        lastModified: new Date(candle.createdAt),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      }))
      return [...staticPages, ...candlePages]
    }
  } catch {
    // Si la API no responde, devolvemos solo las estáticas
  }

  return staticPages
}
