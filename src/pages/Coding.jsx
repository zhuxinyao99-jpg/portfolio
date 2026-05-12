import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useScrollReveal } from '../hooks/useScrollReveal'

const projects = [
  {
    title: 'Fitness Daily 健身打卡',
    status: '已完成',
    date: '2026 年 3 月',
    icon: '🏋️',
    desc: '记录每日健身数据的生活工具，支持篮球、羽毛球等多种运动。',
    highlights: ['用 AI 工具从零开始，独立完成产品设计到部署', '支持多运动类型（篮球/羽毛球/其他）', '周数据 + 月历双重视图'],
    tools: ['Stitch', 'Antigravity', 'AI 辅助编程'],
    link: 'https://zhuxinyao99-jpg.github.io/fitness-daily/',
  },
  {
    title: '每日心情打卡',
    status: '已完成',
    date: '2026 年 2 月',
    icon: '😊',
    desc: '用 emoji 表达情绪状态，支持周趋势分析和历史回顾。',
    highlights: ['用 AI 独立完成从需求到上线全流程', 'emoji 情绪表达 + 周趋势图', '纯前端实现，数据本地存储'],
    tools: ['Stitch', 'Antigravity', 'AI 辅助编程'],
    link: 'https://zhuxinyao99-jpg.github.io/omm-daily-happy/',
  },
]

export default function Coding() {
  useScrollReveal()

  return (
    <main style={{ paddingTop: 80 }}>
      <div className="page-gradient" />

      <section style={{ padding: '80px 0 0', background: 'linear-gradient(180deg, rgba(21, 128, 61, 0.04) 0%, transparent 100%)' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <div className="animate-in">
            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <span className="tag-status tag-done">已完成</span>
              <span className="tag">AI Coding</span>
            </div>
            <h1 className="section-title">AI 辅助 Coding 项目</h1>
            <p className="animate-in delay-1" style={{ color: 'var(--secondary)', marginTop: 16, fontSize: '1.0625rem' }}>
              用 AI 工具独立完成的两个生活工具应用
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {projects.map((p, i) => (
              <div key={i} className="card card-interactive reveal" style={{ transitionDelay: `${i * 0.15}s` }}>
                <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: 'var(--accent-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', flexShrink: 0 }}>
                    {p.icon}
                  </div>
                  <div>
                    <div style={{ display: 'flex', gap: 12, marginBottom: 4 }}>
                      <span className="tag-status tag-done">{p.status}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{p.date}</span>
                    </div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{p.title}</h2>
                  </div>
                </div>

                <p style={{ fontSize: '0.9375rem', color: 'var(--secondary)', lineHeight: 1.7, marginBottom: 20 }}>{p.desc}</p>

                <h3 style={{ fontSize: '0.8125rem', fontWeight: 600, marginBottom: 12, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>核心亮点</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                  {p.highlights.map((h, j) => (
                    <div key={j} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--accent)', fontWeight: 700 }}>✓</span>
                      <p style={{ fontSize: '0.875rem', color: 'var(--secondary)' }}>{h}</p>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {p.tools.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '10px 20px' }}>
                    查看 Demo →
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal" style={{ marginTop: 48 }}>
            <Link to="/" className="btn btn-outline">← 返回首页</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
