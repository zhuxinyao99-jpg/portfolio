import Footer from '../components/Footer'
import { useScrollReveal } from '../hooks/useScrollReveal'

const skillsData = [
  {
    category: 'AI 工具应用',
    icon: '⚡',
    items: [
      { name: 'Claude Code / Codex', desc: 'AI 辅助编程，从需求到代码的完整流程', level: 90 },
      { name: 'Stitch + Antigravity', desc: '无代码/低代码工具，快速搭建 Web 应用原型', level: 85 },
      { name: 'Gemini Pro + Veo', desc: 'AI 视频生成，用于 TikTok 内容素材制作', level: 75 },
    ],
  },
  {
    category: '产品运营能力',
    icon: '🌏',
    items: [
      { name: 'TikTok 内容策略', desc: '内容矩阵设计、漏斗分析、本地化策略', level: 85 },
      { name: '内容简报生成', desc: 'AI 辅助生成结构化内容简报', level: 80 },
      { name: '增长实验设计', desc: 'A/B 测试框架、分阶段验证思路', level: 70 },
    ],
  },
  {
    category: '技术能力',
    icon: '💻',
    items: [
      { name: '前端开发', desc: 'HTML/CSS/JS + React，AI 辅助完成', level: 80 },
      { name: 'GitHub Pages 部署', desc: '静态网站托管，持续集成部署', level: 85 },
      { name: 'React + Vite', desc: '现代前端框架，组件化开发', level: 75 },
    ],
  },
  {
    category: '语言能力',
    icon: '🗣️',
    items: [
      { name: '英语', desc: '专业工作语言，可完成英文报告撰写', level: 85 },
      { name: '中文', desc: '母语', level: 100 },
    ],
  },
]

export default function Skills() {
  useScrollReveal()

  return (
    <main style={{ paddingTop: 80 }}>
      <div className="page-gradient" />

      <section className="section">
        <div className="container">
          <div className="accent-line" />
          <p className="section-label">Capabilities</p>
          <h1 className="section-title animate-in" style={{ marginBottom: 16 }}>能力框架</h1>
          <p className="animate-in delay-1" style={{ color: 'var(--secondary)', marginBottom: 48, maxWidth: 500 }}>
            四个维度的能力矩阵，hover 可以查看详情
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
            {skillsData.map((group, gi) => (
              <div key={group.category} className="reveal" style={{ transitionDelay: `${gi * 0.1}s` }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: '1.5rem' }}>{group.icon}</span>
                  {group.category}
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
                  {group.items.map((s, si) => (
                    <div key={s.name} className="card card-interactive" style={{ transitionDelay: `${si * 0.05}s` }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                        <h3 style={{ fontWeight: 600 }}>{s.name}</h3>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600 }}>{s.level}%</span>
                      </div>
                      <p style={{ fontSize: '0.875rem', color: 'var(--secondary)', lineHeight: 1.6, marginBottom: 12 }}>{s.desc}</p>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ '--progress': `${s.level}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
