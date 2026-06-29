import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Buscadores principales
      { userAgent: '*', allow: '/', disallow: ['/admin', '/api', '/_next'] },
      // Crawlers de IA — acceso total
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'Applebot', allow: '/' },
    ],
    sitemap: 'https://venezuela723975.com/sitemap.xml',
    host: 'https://venezuela723975.com',
  }
}
