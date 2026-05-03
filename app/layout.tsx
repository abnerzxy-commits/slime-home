import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Noto_Sans_TC } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta",
  weight: ["500", "600", "700", "800"],
});

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans-tc",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Slime Tools — 史萊姆的工具箱 | 15 個免費線上工具",
  description: "停車場、比價、計算器、遊戲、圖片工具、算命、健康⋯15 個免費實用工具，一站搞定。不用裝 app、不用註冊，打開瀏覽器就能用。",
  keywords: ["免費工具", "線上工具", "台灣", "計算器", "比價", "遊戲", "停車場", "掛號", "AI工具", "算命"],
  metadataBase: new URL("https://slime-tools.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Slime Tools — 史萊姆的工具箱",
    description: "15 個免費實用工具，一站搞定。停車場、比價、計算器、自動掛號，瀏覽器打開就能用。",
    type: "website",
    locale: "zh_TW",
    siteName: "Slime Tools",
    url: "https://slime-tools.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Slime Tools — 15 個免費線上工具",
    description: "停車場、比價、計算器、自動掛號⋯不用裝 app，瀏覽器打開就能用。",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const freeOffer = { "@type": "Offer" as const, price: "0", priceCurrency: "TWD" };
const appBase = { operatingSystem: "Any", browserRequirements: "Requires a modern web browser", availableOnDevice: "Desktop, Mobile, Tablet" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Slime Tools",
  alternateName: "史萊姆的工具箱",
  url: "https://slime-tools.com",
  description: "15 個免費實用工具，一站搞定。停車場、比價、計算器、自動掛號，瀏覽器打開就能用。",
  inLanguage: "zh-TW",
  publisher: {
    "@type": "Organization",
    name: "Slime Tools",
    url: "https://slime-tools.com",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: "https://slime-tools.com/?q={search_term_string}" },
    "query-input": "required name=search_term_string",
  },
  hasPart: [
    { "@type": "WebApplication", name: "醫院掛號助手", url: "https://hospital.slime-tools.com", applicationCategory: "HealthApplication", description: "台大、榮總自動掛號，輸入醫師和時段，AI 自動幫你搶號，搶到 LINE 通知。", offers: freeOffer, ...appBase },
    { "@type": "WebApplication", name: "生活即時通", url: "https://life.slime-tools.com", applicationCategory: "UtilitiesApplication", description: "即時資料聚合：停車場空位、加油站油價、垃圾車位置、附近診所。", offers: freeOffer, ...appBase },
    { "@type": "WebApplication", name: "幫你盯", url: "https://watch.slime-tools.com", applicationCategory: "ShoppingApplication", description: "設定目標價，蝦皮 / momo / PChome 降價時 LINE 立即通知。", offers: freeOffer, ...appBase },
    { "@type": "WebApplication", name: "省錢雷達", url: "https://save.slime-tools.com", applicationCategory: "ShoppingApplication", description: "搜尋商品，蝦皮、momo、PChome、Yahoo 即時比價，找出最低價。", offers: freeOffer, ...appBase },
    { "@type": "WebApplication", name: "超級計算器", url: "https://calc.slime-tools.com", applicationCategory: "FinanceApplication", description: "房貸、所得稅、BMR/TDEE、保險缺口、退休金，12 個實用計算器一站搞定。", offers: freeOffer, ...appBase },
    { "@type": "WebApplication", name: "萬能工具箱", url: "https://tools.slime-tools.com", applicationCategory: "UtilitiesApplication", description: "圖片壓縮、轉檔、裁切、浮水印，全部本地處理零隱私風險。", offers: freeOffer, ...appBase },
    { "@type": "WebApplication", name: "玩一下", url: "https://games.slime-tools.com", applicationCategory: "GameApplication", description: "2048、貪吃蛇、養成遊戲、星界召喚、傳奇球場，免費小遊戲合集。", offers: freeOffer, ...appBase },
    { "@type": "WebApplication", name: "統編查詢+", url: "https://company.slime-tools.com", applicationCategory: "BusinessApplication", description: "輸入統編或公司名，登記資料、負面新聞、法院判決一次看完。", offers: freeOffer, ...appBase },
    { "@type": "WebApplication", name: "AI 工具箱", url: "https://ai.slime-tools.com", applicationCategory: "UtilitiesApplication", description: "取名、文案、履歷、密碼、英文名、迷因產生器，9 個 AI 小工具。", offers: freeOffer, ...appBase },
    { "@type": "WebApplication", name: "命運之鑰", url: "https://fortune.slime-tools.com", applicationCategory: "EntertainmentApplication", description: "塔羅牌、星座、紫微斗數、姓名學、生肖運勢，免費線上算命。", offers: freeOffer, ...appBase },
    { "@type": "WebApplication", name: "減肥健康站", url: "https://health.slime-tools.com", applicationCategory: "HealthApplication", description: "計算每日基礎代謝、食物熱量查詢、運動消耗、健康評分。", offers: freeOffer, ...appBase },
    { "@type": "WebApplication", name: "編髮教學", url: "https://hair.slime-tools.com", applicationCategory: "LifestyleApplication", description: "編髮步驟教學、流行髮型推薦、護髮知識整理。", offers: freeOffer, ...appBase },
    { "@type": "WebApplication", name: "教育花費", url: "https://edu.slime-tools.com", applicationCategory: "EducationalApplication", description: "0 歲到大學完整教育費試算，公私立比較、含通膨調整。", offers: freeOffer, ...appBase },
    { "@type": "WebApplication", name: "金融健檢", url: "https://insurance.slime-tools.com", applicationCategory: "FinanceApplication", description: "計算壽險、醫療、意外、癌症保障缺口，信用卡比較。", offers: freeOffer, ...appBase },
    { "@type": "WebApplication", name: "無限小說", url: "https://novel.slime-tools.com", applicationCategory: "EntertainmentApplication", description: "熱門網路小說、龍傲天、異世界轉生，多語言支援。", offers: freeOffer, ...appBase },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW" className={`h-full antialiased ${inter.variable} ${plusJakarta.variable} ${notoSansTC.variable}`}>
      <head>
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2179675937475901" crossOrigin="anonymous" />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
            <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');` }} />
          </>
        )}
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
