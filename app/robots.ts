import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://slime-tools.com/sitemap.xml',
    host: 'https://slime-tools.com',
  }
}
