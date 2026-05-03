"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search, X, ArrowUpRight, Sparkles, ChevronDown, ArrowUp,
} from "lucide-react";

function onImgLoad(e: React.SyntheticEvent<HTMLImageElement>) {
  e.currentTarget.setAttribute("data-loaded", "true");
}

interface Site {
  name: string;
  tagline: string;
  desc: string;
  category: string;
  url: string;
  slug: string;
  icon: string;
  featured?: boolean;
  badge?: string;
  badgeColor?: string;
}

const sites: Site[] = [
  // Featured 3
  { name: "醫院掛號助手", tagline: "台大、榮總自動掛號", desc: "輸入醫師和時段，AI 自動幫你搶號，搶到 LINE 通知。", category: "健康", url: "https://hospital.slime-tools.com", slug: "hospital", icon: "\u{1FA7A}", featured: true, badge: "新上線", badgeColor: "#EF4444" },
  { name: "生活即時通", tagline: "停車、油價、天氣、醫療", desc: "即時資料聚合：停車場空位、加油站油價、垃圾車位置、附近診所。", category: "即時資訊", url: "https://life.slime-tools.com", slug: "life", icon: "\u{1F4E1}", featured: true, badge: "熱門", badgeColor: "#0EA5E9" },
  { name: "幫你盯", tagline: "降價自動通知", desc: "設定目標價，蝦皮 / momo / PChome 降價時 LINE 立即通知。", category: "監控", url: "https://watch.slime-tools.com", slug: "watch", icon: "\u{1F514}", featured: true, badge: "推薦", badgeColor: "#10B981" },

  // Rest 12
  { name: "省錢雷達", tagline: "全台比價引擎", desc: "搜尋商品，蝦皮、momo、PChome、Yahoo 即時比價，找出最低價。", category: "購物", url: "https://save.slime-tools.com", slug: "save", icon: "\u{1F4B0}" },
  { name: "超級計算器", tagline: "12 個實用計算器", desc: "房貸、所得稅、BMR/TDEE、保險缺口、退休金⋯一站搞定。", category: "計算", url: "https://calc.slime-tools.com", slug: "calc", icon: "\u{1F9EE}" },
  { name: "萬能工具箱", tagline: "瀏覽器端圖片處理", desc: "圖片壓縮、轉檔、裁切、浮水印，全部本地處理零隱私風險。", category: "工具", url: "https://tools.slime-tools.com", slug: "tools", icon: "\u{1F9F0}" },
  { name: "玩一下", tagline: "免費小遊戲合集", desc: "2048、貪吃蛇、養成遊戲、星界召喚、傳奇球場。", category: "娛樂", url: "https://games.slime-tools.com", slug: "games", icon: "\u{1F3AE}" },
  { name: "統編查詢+", tagline: "公司一秒查清楚", desc: "輸入統編或公司名，登記資料、負面新聞、法院判決一次看完。", category: "查詢", url: "https://company.slime-tools.com", slug: "company", icon: "\u{1F50D}" },
  { name: "AI 工具箱", tagline: "9 個 AI 小工具", desc: "取名、文案、履歷、密碼、英文名、迷因產生器⋯", category: "AI", url: "https://ai.slime-tools.com", slug: "ai", icon: "\u{1F916}" },
  { name: "命運之鑰", tagline: "免費線上算命", desc: "塔羅牌、星座、紫微斗數、姓名學、生肖運勢。", category: "占卜", url: "https://fortune.slime-tools.com", slug: "fortune", icon: "\u{1F52E}" },
  { name: "減肥健康站", tagline: "BMR / TDEE 計算", desc: "計算每日基礎代謝、食物熱量查詢、運動消耗、健康評分。", category: "健康", url: "https://health.slime-tools.com", slug: "health", icon: "\u{1F4AA}" },
  { name: "編髮教學", tagline: "2026 流行髮型", desc: "編髮步驟教學、流行髮型推薦、護髮知識整理。", category: "美容", url: "https://hair.slime-tools.com", slug: "hair", icon: "\u{2702}\u{FE0F}" },
  { name: "教育花費", tagline: "養小孩到大學要多少", desc: "0 歲到大學完整教育費試算，公私立比較、含通膨調整。", category: "教育", url: "https://edu.slime-tools.com", slug: "edu", icon: "\u{1F393}" },
  { name: "金融健檢", tagline: "保險缺口分析", desc: "計算壽險、醫療、意外、癌症保障缺口，信用卡比較。", category: "金融", url: "https://insurance.slime-tools.com", slug: "insurance", icon: "\u{1F4CA}" },
  { name: "無限小說", tagline: "免費線上小說", desc: "熱門網路小說、龍傲天、異世界轉生，多語言支援。", category: "閱讀", url: "https://novel.slime-tools.com", slug: "novel", icon: "\u{1F4DA}" },
];

const categories = ["全部", "即時資訊", "健康", "監控", "購物", "計算", "工具", "娛樂", "查詢", "AI", "占卜", "美容", "教育", "金融", "閱讀"];

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("全部");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const toolsSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Show back-to-top button when scrolled
  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-scroll to tools section when search query changes
  useEffect(() => {
    if (query && toolsSectionRef.current) {
      const rect = toolsSectionRef.current.getBoundingClientRect();
      if (rect.top > window.innerHeight * 0.5) {
        toolsSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [query]);

  const filtered = useMemo(() => {
    return sites.filter((s) => {
      const matchQuery =
        !query ||
        s.name.includes(query) ||
        s.desc.includes(query) ||
        s.category.includes(query) ||
        s.tagline.includes(query);
      const matchCategory = activeCategory === "全部" || s.category === activeCategory;
      return matchQuery && matchCategory;
    });
  }, [query, activeCategory]);

  const isFiltered = activeCategory !== "全部" || query !== "";
  const featured = sites.filter((s) => s.featured);
  const rest = sites.filter((s) => !s.featured);

  return (
    <div className="min-h-screen flex flex-col bg-soft">
      {/* Top nav */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/85 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-200">
              <span className="font-display text-white text-base font-extrabold">S</span>
            </div>
            <div>
              <span className="font-display text-base font-extrabold tracking-tight block leading-none">Slime Tools</span>
              <span className="text-[10px] font-medium tracking-wide" style={{ color: 'var(--color-fg-muted)' }}>史萊姆的工具箱</span>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                searchRef.current?.focus();
                searchRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
              className="md:hidden p-2 rounded-lg cursor-pointer"
              style={{ color: 'var(--color-fg-muted)' }}
              aria-label="搜尋"
            >
              <Search className="w-4 h-4" />
            </button>
            <kbd className="hidden md:inline-flex items-center gap-0.5 px-2 py-1 rounded-md text-[11px] font-semibold border" style={{ borderColor: 'var(--color-border)', color: 'var(--color-fg-muted)' }}>
              ⌘ K
            </kbd>
            <a href="#tools" className="px-3 py-1.5 rounded-full text-[11px] font-semibold border" style={{ borderColor: 'var(--color-border)', color: 'var(--color-fg-muted)' }}>
              {sites.length} 個工具
            </a>
          </div>
        </div>
      </nav>

      {/* Hero — Editorial style with featured screenshot */}
      <header className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-20 pb-6 sm:pb-12">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Headlines */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-3 sm:mb-6 rounded-full border" style={{ borderColor: 'var(--color-border)', color: 'var(--color-fg-muted)' }}>
                <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--color-accent)' }} />
                <span className="text-[11px] font-semibold">{sites.length} 個工具，全部免費</span>
              </div>

              <h1 className="font-display text-[32px] sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight mb-3 sm:mb-6">
                生活中需要的<br />
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  都在這裡
                </span>。
              </h1>

              <p className="text-sm sm:text-lg leading-relaxed mb-5 sm:mb-8 max-w-lg" style={{ color: 'var(--color-fg-muted)' }}>
                停車場、比價、計算器、自動掛號⋯不用裝 app、不用註冊，瀏覽器打開就能用。
              </p>

              {/* Search */}
              <div className="search-box max-w-md flex items-center gap-2 px-4 py-3.5 mb-4">
                <Search className="w-4 h-4 shrink-0" style={{ color: 'var(--color-fg-subtle)' }} />
                <input
                  ref={searchRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="搜尋工具，例如「掛號」「比價」"
                  className="flex-1 bg-transparent text-sm font-medium placeholder:font-normal focus:outline-none"
                  style={{ color: 'var(--color-fg)' }}
                />
                {query && (
                  <button onClick={() => setQuery("")} className="p-0.5 rounded cursor-pointer">
                    <X className="w-4 h-4" style={{ color: 'var(--color-fg-muted)' }} />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="text-[11px] font-medium mr-0.5" style={{ color: 'var(--color-fg-subtle)' }}>熱門：</span>
                {[
                  { icon: "\u{1FA7A}", name: "掛號", url: "https://hospital.slime-tools.com" },
                  { icon: "\u{1F4E1}", name: "即時通", url: "https://life.slime-tools.com" },
                  { icon: "\u{1F4B0}", name: "比價", url: "https://save.slime-tools.com" },
                  { icon: "\u{1F9EE}", name: "計算器", url: "https://calc.slime-tools.com" },
                  { icon: "\u{1F514}", name: "降價通知", url: "https://watch.slime-tools.com" },
                ].map((t) => (
                  <a key={t.name} href={t.url} className="quick-tag">
                    <span>{t.icon}</span>{t.name}
                  </a>
                ))}
              </div>

              {/* Mobile CTA to browse all tools */}
              <button
                onClick={() => toolsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="sm:hidden mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold cursor-pointer"
                style={{ color: 'var(--color-accent)' }}
              >
                瀏覽全部 {sites.length} 個工具
                <ChevronDown className="w-4 h-4 animate-bounce" />
              </button>
            </div>

            {/* Right: Featured screenshot preview (desktop: large card, mobile: horizontal scroll) */}
            {/* Desktop */}
            <div className="hidden lg:block lg:col-span-6 lg:pl-4">
              <a
                href="https://hospital.slime-tools.com"
                className="article-featured block fade-up"
              >
                <div className="cover">
                  <Image
                    src="/screenshots/hospital.png"
                    alt="醫院掛號助手"
                    width={1280}
                    height={720}
                    priority
                    sizes="50vw"
                    onLoad={onImgLoad}
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide" style={{ background: '#EF444415', color: '#EF4444', border: '1px solid #EF444430' }}>
                      新上線
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--color-fg-subtle)' }}>
                      健康
                    </span>
                  </div>
                  <h2 className="font-display text-2xl font-extrabold mb-2 tracking-tight">
                    醫院掛號助手
                  </h2>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-fg-muted)' }}>
                    台大、榮總自動掛號 + LINE 通知。輸入醫師和時段，AI 自動幫你搶號，搶到立即通知。
                  </p>
                  <div className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: 'var(--color-accent)' }}>
                    立即使用
                    <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
                  </div>
                </div>
              </a>
            </div>

            {/* Mobile: horizontal featured cards */}
            <div className="lg:hidden -mx-4 px-4 mt-4">
              <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2">
                {featured.map((site) => (
                  <a
                    key={site.slug}
                    href={site.url}
                    className="mobile-featured-card snap-start shrink-0"
                    style={{ width: "75vw", maxWidth: "300px" }}
                  >
                    <div className="cover">
                      <Image
                        src={`/screenshots/${site.slug}.png`}
                        alt={site.name}
                        width={600}
                        height={375}
                        sizes="75vw"
                        onLoad={onImgLoad}
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-1.5">
                        {site.badge && (
                          <span
                            className="px-1.5 py-0.5 rounded-full text-[9px] font-bold"
                            style={{
                              background: `${site.badgeColor}15`,
                              color: site.badgeColor,
                              border: `1px solid ${site.badgeColor}30`,
                            }}
                          >
                            {site.badge}
                          </span>
                        )}
                        <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--color-fg-subtle)' }}>
                          {site.category}
                        </span>
                      </div>
                      <h3 className="font-display text-base font-extrabold tracking-tight mb-0.5">
                        <span className="mr-1">{site.icon}</span>{site.name}
                      </h3>
                      <p className="text-[12px] leading-relaxed line-clamp-2" style={{ color: 'var(--color-fg-muted)' }}>
                        {site.tagline}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tools section */}
      <section ref={toolsSectionRef} id="tools" className="py-8 sm:py-12 border-t scroll-mt-20" style={{ borderColor: 'var(--color-border)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Section header */}
          <div className="flex items-end justify-between mb-6 sm:mb-8">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--color-accent)' }}>
                所有工具
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
                {isFiltered ? `${filtered.length} 個結果` : '探索全部'}
              </h2>
            </div>
          </div>

          {/* Categories */}
          <div className="category-scroll-wrapper overflow-x-auto no-scrollbar -mx-4 px-4 mb-8">
            <div className="flex gap-2 min-w-max sm:min-w-0 sm:flex-wrap pr-8 sm:pr-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="pill"
                  data-active={cat === activeCategory}
                  aria-pressed={cat === activeCategory}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="scroll-hint sm:hidden" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 rounded-2xl border" style={{ borderColor: 'var(--color-border)' }}>
              <p className="text-base font-medium" style={{ color: 'var(--color-fg-muted)' }}>
                沒有找到符合的工具
              </p>
            </div>
          ) : (
            <>
              {/* Featured 2 cards (only when no filter) */}
              {!isFiltered && (
                <div className="hidden lg:grid md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  {featured.slice(1).map((site, i) => (
                    <a
                      key={site.slug}
                      href={site.url}
                      className="article-featured block fade-up"
                      style={{ animationDelay: `${i * 80}ms` }}
                    >
                      <div className="cover">
                        <Image
                          src={`/screenshots/${site.slug}.png`}
                          alt={site.name}
                          width={1280}
                          height={720}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          onLoad={onImgLoad}
                        />
                      </div>
                      <div className="p-5 sm:p-6">
                        <div className="flex items-center gap-2 mb-2">
                          {site.badge && (
                            <span
                              className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide"
                              style={{
                                background: `${site.badgeColor}15`,
                                color: site.badgeColor,
                                border: `1px solid ${site.badgeColor}30`,
                              }}
                            >
                              {site.badge}
                            </span>
                          )}
                          <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--color-fg-subtle)' }}>
                            {site.category}
                          </span>
                        </div>
                        <h3 className="font-display text-xl font-extrabold mb-1.5 tracking-tight">
                          <span className="mr-1.5">{site.icon}</span>{site.name}
                        </h3>
                        <p className="text-sm leading-relaxed line-clamp-2" style={{ color: 'var(--color-fg-muted)' }}>
                          {site.desc}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              )}

              {/* Grid of all (or filtered) */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {(isFiltered ? filtered : rest).map((site, i) => (
                  <a
                    key={site.slug}
                    href={site.url}
                    className="article-card fade-up"
                    style={{ animationDelay: `${i * 30}ms` }}
                  >
                    <div className="cover">
                      <Image
                        src={`/screenshots/${site.slug}.png`}
                        alt={site.name}
                        width={1280}
                        height={800}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        onLoad={onImgLoad}
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--color-fg-subtle)' }}>
                          {site.category}
                        </span>
                        {site.badge && (
                          <span
                            className="px-2 py-0.5 rounded-full text-[9px] font-bold"
                            style={{
                              background: `${site.badgeColor}15`,
                              color: site.badgeColor,
                            }}
                          >
                            {site.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-lg font-extrabold mb-1 tracking-tight leading-tight">
                        <span className="mr-1.5">{site.icon}</span>{site.name}
                      </h3>
                      <p className="text-[12px] font-semibold mb-2" style={{ color: 'var(--color-accent)' }}>
                        {site.tagline}
                      </p>
                      <p className="text-[13px] leading-relaxed line-clamp-2 mb-4 flex-1" style={{ color: 'var(--color-fg-muted)' }}>
                        {site.desc}
                      </p>
                      <div className="inline-flex items-center gap-1 text-[12px] font-semibold pt-3 border-t" style={{ borderColor: 'var(--color-border)', color: 'var(--color-fg-muted)' }}>
                        <span>免費使用</span>
                        <span className="ml-auto inline-flex items-center gap-0.5" style={{ color: 'var(--color-accent)' }}>
                          前往
                          <ArrowUpRight className="w-3 h-3" strokeWidth={2.5} />
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Stats / Trust */}
      <section className="py-16 border-t" style={{ borderColor: 'var(--color-border)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div>
              <p className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight mb-2">{sites.length}</p>
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-fg-muted)' }}>
                免費工具
              </p>
            </div>
            <div>
              <p className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight mb-2">100%</p>
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-fg-muted)' }}>
                無需註冊
              </p>
            </div>
            <div>
              <p className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight mb-2">24/7</p>
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-fg-muted)' }}>
                即時更新
              </p>
            </div>
            <div>
              <p className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight mb-2">∞</p>
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-fg-muted)' }}>
                持續新增
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 sm:py-16 border-t" style={{ borderColor: 'var(--color-border)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Footer grid: brand + tool categories */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12 mb-10">
            {/* Brand */}
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-md bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="font-display text-white text-[11px] font-extrabold">S</span>
                </div>
                <span className="font-display font-extrabold text-sm">Slime Tools</span>
              </div>
              <p className="text-xs leading-relaxed max-w-[200px]" style={{ color: 'var(--color-fg-muted)' }}>
                史萊姆的工具箱，{sites.length} 個免費線上工具，不用裝 App、不用註冊。
              </p>
            </div>

            {/* Tool links by category */}
            {[
              { title: "生活實用", items: sites.filter(s => ["即時資訊", "監控", "購物", "工具"].includes(s.category)) },
              { title: "健康理財", items: sites.filter(s => ["健康", "計算", "金融", "教育"].includes(s.category)) },
              { title: "休閒娛樂", items: sites.filter(s => ["娛樂", "AI", "占卜", "查詢", "美容", "閱讀"].includes(s.category)) },
            ].map((group) => (
              <div key={group.title}>
                <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-fg-subtle)' }}>
                  {group.title}
                </p>
                <ul className="space-y-2">
                  {group.items.map((site) => (
                    <li key={site.slug}>
                      <a
                        href={site.url}
                        className="text-[13px] font-medium transition-colors hover:text-indigo-600"
                        style={{ color: 'var(--color-fg-muted)' }}
                      >
                        <span className="mr-1">{site.icon}</span>{site.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="pt-6 border-t text-center" style={{ borderColor: 'var(--color-border)' }}>
            <p className="text-xs font-medium" style={{ color: 'var(--color-fg-muted)' }}>
              © 2026 Slime Tools · 史萊姆的工具箱 · 所有工具永久免費
            </p>
          </div>
        </div>
      </footer>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="back-to-top"
        data-visible={showBackToTop}
        aria-label="回到頂部"
      >
        <ArrowUp className="w-4 h-4" strokeWidth={2.5} />
      </button>
    </div>
  );
}
