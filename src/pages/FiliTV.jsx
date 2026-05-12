import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function FiliTV() {
  useScrollReveal()

  return (
    <main style={{ paddingTop: 80 }}>
      <div className="page-gradient" />

      {/* Hero Banner */}
      <section style={{ padding: '80px 0 0', background: 'linear-gradient(180deg, rgba(29, 78, 216, 0.06) 0%, transparent 100%)' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <div className="animate-in" style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
              <span className="tag-status tag-active">进行中</span>
              <span className="tag">海外运营</span>
              <span className="tag">2026</span>
            </div>
            <h1 className="section-title">FILI TV TikTok 内容运营</h1>
            <p className="animate-in delay-1" style={{ color: 'var(--secondary)', marginTop: 16, fontSize: '1.0625rem', lineHeight: 1.7 }}>
              菲律宾市场流媒体增长项目全案
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="container" style={{ maxWidth: 800 }}>
          {/* Background */}
          <div className="reveal" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 4, height: 20, background: 'var(--accent)', borderRadius: 2 }} />
              项目背景
            </h2>
            <div className="card card-glass" style={{ cursor: 'default' }}>
              <p style={{ fontSize: '0.9375rem', color: 'var(--secondary)', lineHeight: 1.8 }}>
                FILI TV 是一款面向菲律宾市场的流媒体聚合平台，提供 PBA 篮球、NBA、UFC 等体育内容以及 Netflix、Disney+ 等影视内容。核心问题：<strong style={{ color: 'var(--primary)' }}>下载→安装→激活的漏斗存在严重流失</strong>。
              </p>
            </div>
          </div>

          {/* Role */}
          <div className="reveal" style={{ marginBottom: 48 }}>
            <div className="card" style={{ cursor: 'default', background: 'linear-gradient(135deg, var(--accent-subtle), rgba(255,187,0,0.05))', borderColor: 'var(--accent)', display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: '2rem' }}>👤</span>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: 4 }}>我的角色</p>
                <p style={{ fontWeight: 600, fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>内容策略负责人 / AI 工具应用</p>
              </div>
            </div>
          </div>

          {/* What I did */}
          <div className="reveal" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 4, height: 20, background: 'var(--accent)', borderRadius: 2 }} />
              我做了什么
            </h2>
            <div className="timeline">
              {[
                '设计 TikTok 内容测试框架，对应漏斗每个环节的流失问题',
                '制定 6 个内容角度策略（痛点对比、体育集锦、UFC热血等），形成完整内容矩阵',
                '用 AI 工具生成 5 个结构化内容简报，包含 Hook、字幕、CTA',
                '设计 Tagalog + Taglish 本地化语言策略',
                '建立与本地协作方的分工框架：策略在外地，执行在本地',
                '推进 V002–V005 简报制作与发布',
              ].map((item, i) => (
                <div key={i} className="timeline-item">
                  <p style={{ fontSize: '0.9375rem', color: 'var(--secondary)', lineHeight: 1.7 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Insights */}
          <div className="reveal" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 4, height: 20, background: 'var(--accent)', borderRadius: 2 }} />
              关键洞察
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { icon: '🔍', text: '发现核心问题不是「点击」而是「下载→激活」漏斗流失' },
                { icon: '📈', text: '三阶段增长路径：养号期→测试期→KOC 规模化' },
                { icon: '🤝', text: '与本地协作方建立分工 SOP，策略与执行分离' },
              ].map((insight, i) => (
                <div key={i} className="card card-interactive" style={{ padding: 20, display: 'flex', gap: 16, alignItems: 'center', transitionDelay: `${i * 0.1}s` }}>
                  <span style={{ fontSize: '1.5rem' }}>{insight.icon}</span>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--secondary)' }}>{insight.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="reveal" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 12 }}>使用的工具</h2>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['Claude Code', 'TikTok', 'Figma', 'Google Sheets'].map(t => (
                <span key={t} className="tag" data-tooltip={`用于 FILI TV 项目`}>{t}</span>
              ))}
            </div>
          </div>

          <div className="reveal">
            <Link to="/" className="btn btn-outline">← 返回首页</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
