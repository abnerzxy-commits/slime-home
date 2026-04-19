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
  hasPart: [
    { "@type": "WebApplication", name: "醫院掛號助手", url: "https://hospital.slime-tools.com", applicationCategory: "HealthApplication" },
    { "@type": "WebApplication", name: "生活即時通", url: "https://life.slime-tools.com", applicationCategory: "UtilitiesApplication" },
    { "@type": "WebApplication", name: "幫你盯", url: "https://watch.slime-tools.com", applicationCategory: "ShoppingApplication" },
    { "@type": "WebApplication", name: "省錢雷達", url: "https://save.slime-tools.com", applicationCategory: "ShoppingApplication" },
    { "@type": "WebApplication", name: "超級計算器", url: "https://calc.slime-tools.com", applicationCategory: "FinanceApplication" },
    { "@type": "WebApplication", name: "萬能工具箱", url: "https://tools.slime-tools.com", applicationCategory: "UtilitiesApplication" },
    { "@type": "WebApplication", name: "玩一下", url: "https://games.slime-tools.com", applicationCategory: "GameApplication" },
    { "@type": "WebApplication", name: "統編查詢+", url: "https://company.slime-tools.com", applicationCategory: "BusinessApplication" },
    { "@type": "WebApplication", name: "AI 工具箱", url: "https://ai.slime-tools.com", applicationCategory: "UtilitiesApplication" },
    { "@type": "WebApplication", name: "命運之鑰", url: "https://fortune.slime-tools.com", applicationCategory: "EntertainmentApplication" },
    { "@type": "WebApplication", name: "減肥健康站", url: "https://health.slime-tools.com", applicationCategory: "HealthApplication" },
    { "@type": "WebApplication", name: "編髮教學", url: "https://hair.slime-tools.com", applicationCategory: "LifestyleApplication" },
    { "@type": "WebApplication", name: "教育花費", url: "https://edu.slime-tools.com", applicationCategory: "EducationalApplication" },
    { "@type": "WebApplication", name: "金融健檢", url: "https://insurance.slime-tools.com", applicationCategory: "FinanceApplication" },
    { "@type": "WebApplication", name: "無限小說", url: "https://novel.slime-tools.com", applicationCategory: "EntertainmentApplication" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW" className={`h-full antialiased ${inter.variable} ${plusJakarta.variable} ${notoSansTC.variable}`}>
      <head>
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
