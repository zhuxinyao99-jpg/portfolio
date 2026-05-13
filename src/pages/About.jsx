import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useScrollReveal } from '../hooks/useScrollReveal'

function TiltCard({ children, style, className, onClick }) {
  const ref = useRef(null)

  const handleMouseMove = (e) => {
    const card = ref.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    card.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(12px)`
    card.style.boxShadow = `${-x * 20}px ${y * 20}px 40px rgba(255, 107, 53, 0.12)`
  }

  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = 'perspective(800px) rotateY(0) rotateX(0) translateZ(0)'
      ref.current.style.boxShadow = ''
    }
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{ transition: 'transform 0.15s ease, box-shadow 0.15s ease', ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

const timeline = [
  { year: '本科', title: '英语专业', desc: '语言能力成为跨文化沟通的底层基础，养成用外语思维处理复杂信息的习惯', accent: false },
  { year: '研究生', title: '国际商务硕士', desc: '系统学习全球商业逻辑、供应链与市场进入策略，建立商业分析框架', accent: false },
  { year: '实践', title: '新运科技 · 海外仓储项目', desc: '参与真实的海外商务项目，理解 B2B 场景下的运营挑战与跨境流程', accent: false },
  { year: '现在', title: 'AI 工具 + 内容运营', desc: '用 AI 工具放大执行力，探索如何用内容驱动海外产品增长', accent: true },
]

const methods = [
  {
    step: '01', title: '快速验证', short: '用最小成本测试想法',
    detail: '不等一切准备好再开始。先做一个粗糙但可用的版本，放到真实场景中观察反应。失败的信息和成功的一样有价值。',
    icon: '🚀', color: '#FF6B35',
  },
  {
    step: '02', title: 'AI 放大', short: '用工具弥补知识盲区',
    detail: '我不追求"什么都自己做"，而是追求"最快让想法落地"。AI 工具是我的乘法器——它让一个人能做一个小团队的事。',
    icon: '🤖', color: '#6366f1',
  },
  {
    step: '03', title: '数据驱动', short: '实验思维设计增长策略',
    detail: '每个决策背后都需要假设，每个假设都需要验证。我习惯用"如果…那么…因为…"的方式设计策略，用数据反驳或支持直觉。',
    icon: '📊', color: '#10b981',
  },
]

const currentWork = [
  {
    tag: '主项目', title: 'FiliTV · 菲律宾流媒体增长',
    desc: '负责 TikTok 内容策略与 AI 工具应用，探索内容驱动用户获取的增长飞轮',
    color: '#FF6B35',
  },
  {
    tag: '学习中', title: '内容运营 × 用户增长',
    desc: '研究如何用内容运营思维解决海外市场的用户获取问题，积累可迁移的方法论',
    color: '#6366f1',
  },
]

export default function About() {
  useScrollReveal()
  const [expandedMethod, setExpandedMethod] = useState(null)

  return (
    <main style={{ paddingTop: 80 }}>
      <div className="page-gradient" />

      {/* ── Hero ── */}
      <section style={{ padding: '80px 0 60px', overflow: 'hidden' }}>
        <div className="container" style={{ maxWidth: 960 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 60, alignItems: 'center' }}>
            <div>
              <p className="section-label animate-in" style={{ marginBottom: 16 }}>About Me — 关于我</p>
              <h1 className="animate-in" style={{
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: 28,
              }}>
                从商科生<br />
                <span style={{ color: 'var(--accent)' }}>到 AI Builder</span>
              </h1>
              <p className="animate-in" style={{
                fontSize: '1.0625rem',
                color: 'var(--secondary)',
                lineHeight: 1.85,
                maxWidth: 480,
                borderLeft: '3px solid var(--accent)',
                paddingLeft: 20,
              }}>
                我不是科班程序员，但我相信在 AI 时代，
                <strong style={{ color: 'var(--primary)' }}>真正的能力是用工具快速把想法变成现实</strong>——
                这个作品集本身就是最好的证明。
              </p>
            </div>

            {/* Avatar */}
            <div className="animate-in" style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{
                width: 156,
                height: 156,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent) 0%, #ff9a6c 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3.75rem',
                fontWeight: 800,
                color: 'white',
                boxShadow: '0 20px 60px rgba(255, 107, 53, 0.3)',
              }}>
                E
              </div>
              <div style={{
                position: 'absolute',
                inset: -10,
                borderRadius: '50%',
                border: '2px dashed rgba(255, 107, 53, 0.3)',
                animation: 'spin 20s linear infinite',
              }} />
            </div>
          </div>

          {/* Tags */}
          <div className="animate-in" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 44 }}>
            {['国际商务硕士', '英语流利', 'AI 工具用户', '内容运营', '海外市场'].map(tag => (
              <span key={tag} style={{
                padding: '6px 14px',
                borderRadius: 99,
                border: '1px solid var(--border)',
                fontSize: '0.8125rem',
                color: 'var(--secondary)',
                background: 'var(--white)',
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Chapter 01: 背景 ── */}
      <section style={{ padding: '64px 0', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: 960 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 64, alignItems: 'start' }}>
            <div className="reveal">
              <p className="section-label">Chapter 01</p>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.3 }}>我的<br />背景</h2>
            </div>

            <div className="reveal" style={{ paddingLeft: 16 }}>
              {timeline.map((item, i) => (
                <div key={i} style={{
                  display: 'grid',
                  gridTemplateColumns: '72px 1fr',
                  gap: 20,
                  paddingBottom: i < timeline.length - 1 ? 32 : 0,
                  paddingLeft: 20,
                  borderLeft: item.accent ? '2px solid var(--accent)' : '2px solid var(--border)',
                  position: 'relative',
                }}>
                  <div style={{
                    position: 'absolute',
                    left: -6,
                    top: 4,
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: item.accent ? 'var(--accent)' : 'var(--border-strong)',
                    border: '2px solid var(--canvas)',
                  }} />
                  <span style={{
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    color: item.accent ? 'var(--accent)' : 'var(--muted)',
                    fontWeight: 600,
                    paddingTop: 2,
                  }}>{item.year}</span>
                  <div>
                    <h3 style={{ fontWeight: 600, marginBottom: 6 }}>{item.title}</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--secondary)', lineHeight: 1.75 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Chapter 02: 方法论 ── */}
      <section style={{ padding: '64px 0', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: 960 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 64, alignItems: 'start' }}>
            <div className="reveal">
              <p className="section-label">Chapter 02</p>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.3 }}>我的<br />方法论</h2>
              <p style={{ fontSize: '0.8125rem', color: 'var(--muted)', marginTop: 12, lineHeight: 1.6 }}>点击卡片<br />展开详情</p>
            </div>

            <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {methods.map((m, i) => (
                <TiltCard
                  key={m.step}
                  className="card"
                  style={{
                    cursor: 'pointer',
                    transitionDelay: `${i * 0.08}s`,
                    border: expandedMethod === i ? `1px solid ${m.color}` : '1px solid var(--border)',
                  }}
                  onClick={() => setExpandedMethod(expandedMethod === i ? null : i)}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18 }}>
                    <div style={{
                      width: 52,
                      height: 52,
                      borderRadius: 14,
                      background: `${m.color}18`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.375rem',
                      flexShrink: 0,
                    }}>
                      {m.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: m.color, fontWeight: 600 }}>{m.step}</span>
                        <h3 style={{ fontWeight: 700 }}>{m.title}</h3>
                        <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--muted)' }}>
                          {expandedMethod === i ? '▲' : '▼'}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.875rem', color: 'var(--secondary)' }}>{m.short}</p>
                    </div>
                  </div>

                  <div style={{
                    maxHeight: expandedMethod === i ? 160 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}>
                    <p style={{
                      fontSize: '0.9375rem',
                      color: 'var(--secondary)',
                      lineHeight: 1.8,
                      paddingTop: 16,
                      marginTop: 16,
                      borderTop: '1px solid var(--border)',
                    }}>{m.detail}</p>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Chapter 03: 正在做 ── */}
      <section style={{ padding: '64px 0', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: 960 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 64, alignItems: 'start' }}>
            <div className="reveal">
              <p className="section-label">Chapter 03</p>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.3 }}>正在做<br />的事</h2>
            </div>

            <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {currentWork.map((item, i) => (
                <div key={i} className="card" style={{
                  display: 'flex',
                  gap: 20,
                  alignItems: 'flex-start',
                  cursor: 'default',
                  transitionDelay: `${i * 0.1}s`,
                }}>
                  <div style={{ width: 4, alignSelf: 'stretch', borderRadius: 2, background: item.color, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                      <span style={{
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                        padding: '3px 10px',
                        borderRadius: 99,
                        background: `${item.color}18`,
                        color: item.color,
                        letterSpacing: '0.05em',
                      }}>{item.tag}</span>
                      <h3 style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{item.title}</h3>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--secondary)', lineHeight: 1.75 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '60px 0 100px', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: 960 }}>
          <div className="reveal" style={{
            background: 'linear-gradient(135deg, var(--white), rgba(255, 107, 53, 0.04))',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-xl)',
            padding: '48px 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 32,
            flexWrap: 'wrap',
          }}>
            <div>
              <h2 style={{ fontSize: '1.375rem', fontWeight: 700, marginBottom: 8 }}>了解更多</h2>
              <p style={{ color: 'var(--secondary)', fontSize: '0.9375rem' }}>看看我用 AI 工具做了什么，以及我掌握的能力体系</p>
            </div>
            <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
              <Link to="/skills" className="btn btn-primary">能力框架 →</Link>
              <Link to="/coding" className="btn btn-outline">项目案例</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  )
}
