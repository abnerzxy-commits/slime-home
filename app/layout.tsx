import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Slime Tools — 史萊姆的工具箱 | 免費線上工具集合",
  description: "停車場即時空位、商品比價、計算器、小遊戲、圖片工具、算命、健康管理⋯全部免費，一站搞定。",
  keywords: ["免費工具", "線上工具", "台灣", "計算器", "比價", "遊戲", "停車場"],
  openGraph: { title: "Slime Tools — 史萊姆的工具箱", description: "免費線上工具集合", type: "website", locale: "zh_TW", siteName: "Slime Tools" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW" className="h-full antialiased">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;600;700;900&display=swap" rel="stylesheet" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2179675937475901" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>{children}</body>
    </html>
  );
}
