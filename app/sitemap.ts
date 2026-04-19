import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://slime-tools.com'

  const tools = [
    { subdomain: 'hospital', name: '醫院掛號助手' },
    { subdomain: 'life', name: '生活即時通' },
    { subdomain: 'watch', name: '幫你盯' },
    { subdomain: 'save', name: '省錢雷達' },
    { subdomain: 'calc', name: '超級計算器' },
    { subdomain: 'tools', name: '萬能工具箱' },
    { subdomain: 'games', name: '玩一下' },
    { subdomain: 'company', name: '統編查詢+' },
    { subdomain: 'ai', name: 'AI 工具箱' },
    { subdomain: 'fortune', name: '命運之鑰' },
    { subdomain: 'health', name: '減肥健康站' },
    { subdomain: 'hair', name: '編髮教學' },
    { subdomain: 'edu', name: '教育花費' },
    { subdomain: 'insurance', name: '金融健檢' },
    { subdomain: 'novel', name: '無限小說' },
  ]

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...tools.map((tool) => ({
      url: `https://${tool.subdomain}.slime-tools.com`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ]
}
