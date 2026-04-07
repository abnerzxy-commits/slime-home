const sites = [
  { name: "生活即時通", desc: "停車場、油價、天氣、醫療", icon: "📡", url: "https://life.slime-tools.com", color: "#0ea5e9" },
  { name: "萬能工具箱", desc: "圖片壓縮、轉檔、裁切", icon: "🔧", url: "https://tools.slime-tools.com", color: "#8b5cf6" },
  { name: "省錢雷達", desc: "蝦皮/momo/PChome 比價", icon: "💰", url: "https://save.slime-tools.com", color: "#22c55e" },
  { name: "超級計算器", desc: "房貸、稅務、健康、投資", icon: "🧮", url: "https://calc.slime-tools.com", color: "#f59e0b" },
  { name: "玩一下", desc: "2048、貪吃蛇、養成遊戲", icon: "🎮", url: "https://games.slime-tools.com", color: "#ec4899" },
  { name: "幫你盯", desc: "降價通知、比價追蹤", icon: "👁️", url: "https://watch.slime-tools.com", color: "#10b981" },
  { name: "統編查詢+", desc: "公司登記、負面新聞", icon: "🔍", url: "https://company.slime-tools.com", color: "#6366f1" },
  { name: "AI 工具箱", desc: "取名、文案、履歷產生器", icon: "🤖", url: "https://ai.slime-tools.com", color: "#06b6d4" },
  { name: "命運之鑰", desc: "塔羅、星座、紫微斗數", icon: "🔮", url: "https://fortune.slime-tools.com", color: "#a855f7" },
  { name: "減肥健康站", desc: "BMR/TDEE、熱量查詢", icon: "❤️", url: "https://health.slime-tools.com", color: "#ef4444" },
  { name: "編髮教學", desc: "流行髮型、編髮步驟", icon: "💇", url: "https://hair.slime-tools.com", color: "#f97316" },
  { name: "教育花費", desc: "養小孩到大學要多少錢", icon: "🎓", url: "https://edu.slime-tools.com", color: "#3b82f6" },
  { name: "金融健檢", desc: "保險缺口、信用卡比較", icon: "🛡️", url: "https://insurance.slime-tools.com", color: "#14b8a6" },
  { name: "無限小說", desc: "免費線上小說閱讀", icon: "📖", url: "https://novel.slime-tools.com", color: "#78716c" },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <header className="text-center py-16 px-4" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-3">🐌 Slime Tools</h1>
        <p className="text-lg text-white/90">史萊姆的工具箱 — 免費線上工具集合</p>
        <p className="text-sm text-white/70 mt-2">{sites.length} 個免費工具，一站搞定</p>
      </header>

      {/* Grid */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {sites.map((s) => (
            <a
              key={s.name}
              href={s.url}
              className="group block rounded-2xl border border-gray-200 bg-white p-5 transition-all hover:shadow-lg hover:-translate-y-1 dark:bg-gray-900 dark:border-gray-800"
              style={{ borderTopColor: s.color, borderTopWidth: 3 }}
            >
              <div className="text-3xl mb-3">{s.icon}</div>
              <h2 className="font-bold text-base mb-1 group-hover:text-blue-600 transition-colors">{s.name}</h2>
              <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
            </a>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6 text-center text-sm text-gray-400 dark:border-gray-800">
        <p>© 2026 Slime Tools — 所有工具免費使用</p>
      </footer>
    </div>
  );
}
