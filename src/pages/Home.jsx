import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'
import Footer from '../components/Footer'
import { useScrollReveal } from '../hooks/useScrollReveal'

const qualities = [
  { word: 'DETAIL', x: -38, y: -30, size: 1.1 },
  { word: 'RIGOROUS', x: 32, y: -22, size: 0.9 },
  { word: 'STRUCTURED', x: -18, y: 8, size: 1.3 },
  { word: 'EFFICIENT', x: 35, y: 15, size: 1 },
  { word: 'DEPTH', x: -35, y: 35, size: 1.2 },
  { word: 'READER & THINKER', x: 15, y: 40, size: 0.85 },
]

export default function Home() {
  const [phase, setPhase] = useState('intro')
  const [titleReady, setTitleReady] = useState(false)
  const [subtitleReady, setSubtitleReady] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [showEnter, setShowEnter] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [litCount, setLitCount] = useState(0)
  const [showName, setShowName] = useState(false)

  useScrollReveal()

  useEffect(() => {
    const t1 = setTimeout(() => setTitleReady(true), 800)
    const t2 = setTimeout(() => setSubtitleReady(true), 1800)
    const t3 = setTimeout(() => setShowHint(true), 2800)
    const t4 = setTimeout(() => setShowEnter(true), 4000)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [])

  useEffect(() => {
    if (phase !== 'intro') return
    const handler = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [phase])

  const handleEnter = () => {
    setPhase('words')
    qualities.forEach((_, i) => {
      setTimeout(() => setLitCount(i + 1), 300 + i * 600)
    })
    setTimeout(() => setShowName(true), 300 + qualities.length * 600 + 400)
    setTimeout(() => setPhase('main'), 300 + qualities.length * 600 + 2200)
  }

  return (
    <>
      <div
        className="gradient-bg-persistent"
        style={phase === 'intro'
          ? { zIndex: 500, cursor: 'grab' }
          : { zIndex: -1, pointerEvents: 'none' }
        }
      >
        <ShaderGradientCanvas style={{ position: 'absolute', inset: 0 }} pixelDensity={1.5} fov={45}>
          <ShaderGradient
            animate="on" brightness={1.1} cAzimuthAngle={0} cDistance={7.1}
            cPolarAngle={140} cameraZoom={17.3}
            color1="#ffffff" color2="#ffbb00" color3="#0700ff"
            envPreset="city" grain="off" lightType="3d" reflection={0.1}
            shader="defaults" type="sphere"
            uAmplitude={1.4} uDensity={1.1} uFrequency={5.5}
            uSpeed={0.1} uStrength={1} uTime={0}
            wireframe={false} enableTransition={true}
          />
        </ShaderGradientCanvas>
      </div>

      {/* ===== INTRO ===== */}
      {phase === 'intro' && (
        <div className="intro-screen intro-bright">
          <div className="intro-content">
            <h1
              className={`luminous-title ${titleReady ? 'luminous-visible' : ''}`}
              style={{ transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)` }}
            >
              <span className="luminous-letter">E</span>
              <span className="luminous-letter">R</span>
              <span className="luminous-letter">I</span>
              <span className="luminous-letter">C</span>
              <span className="luminous-dot">.</span>
            </h1>
            <p
              className={`luminous-sub ${subtitleReady ? 'luminous-sub-visible' : ''}`}
              style={{ transform: `translate(${mousePos.x * 0.15}px, ${mousePos.y * 0.15}px)` }}
            >
              Product & AI Builder
            </p>
          </div>

          {showHint && (
            <div className="intro-hint intro-hint-dark">
              <div className="intro-hint-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 12a8 8 0 018-8M20 12a8 8 0 00-8-8" strokeLinecap="round" opacity="0.6"/>
                  <path d="M15 9l-3 3 3 3M9 9l3 3-3 3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>拖拽旋转 · 探索 3D 渐变</span>
            </div>
          )}

          {showEnter && (
            <button className="intro-enter intro-enter-dark" onClick={handleEnter}>
              <span className="intro-enter-text intro-enter-text-dark">探索我的世界</span>
              <span className="intro-enter-arrow intro-enter-arrow-dark">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M19 12l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
          )}
        </div>
      )}

      {/* ===== WORDS CLOUD ===== */}
      {phase === 'words' && (
        <div className="words-screen">
          <div className="cloud-container">
            {qualities.map((q, i) => (
              <span
                key={q.word}
                className={`cloud-word ${i < litCount ? 'cloud-lit' : ''}`}
                style={{
                  left: `${50 + q.x}%`,
                  top: `${50 + q.y}%`,
                  fontSize: `${q.size}rem`,
                }}
              >
                {q.word}
              </span>
            ))}
          </div>

          {showName && (
            <div className="cloud-name">
              <span className="cloud-name-label">This is</span>
              <strong className="cloud-name-eric">ERIC</strong>
            </div>
          )}
        </div>
      )}

      {/* ===== MAIN ===== */}
      {phase === 'main' && (
        <div className="main-content-enter">
          <section className="hero-section">
            <div className="hero-inner">
              <div className="animate-in">
                <span className="hero-badge">
                  <span className="hero-badge-dot" />
                  Open to work · 海外产品运营
                </span>
              </div>
              <h1 className="hero-h1">
                <span className="hero-line animate-in delay-2">Think deep.</span>
                <br />
                <span className="hero-line animate-in delay-4">Build real.</span>
              </h1>
              <p className="animate-in delay-5 hero-sub">
                深度思考，然后把事情做出来。
              </p>
              <div className="animate-in delay-6 hero-ctas">
                <Link to="/projects/fili-tv" className="btn btn-primary">
                  看看我做了什么
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link to="/about" className="btn btn-outline">关于我</Link>
              </div>
              <div className="animate-in delay-7 hero-stats">
                {[
                  { value: '2', label: 'AI 独立开发 App' },
                  { value: '1', label: '海外运营项目' },
                  { value: '0→1', label: '全流程落地能力' },
                ].map((s, i) => (
                  <div key={i} className="hero-stat" style={{ borderLeft: i > 0 ? '1px solid var(--border)' : 'none' }}>
                    <p className="counter" style={{ fontSize: '1.75rem' }}>{s.value}</p>
                    <p style={{ fontSize: '0.6875rem', color: 'var(--muted)', marginTop: 4 }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="animate-in delay-8 scroll-indicator">
              <span>Scroll</span>
              <div className="scroll-mouse"><div className="scroll-dot" /></div>
            </div>
          </section>

          <section className="section glass-section">
            <div className="container">
              <div className="reveal" style={{ marginBottom: 48 }}>
                <p className="section-label">What I Do</p>
                <h2 className="section-title">三个核心能力</h2>
              </div>
              <div className="cards-grid-3">
                {[
                  { icon: '⚡', title: 'AI 产品落地', desc: '用 Claude Code、Stitch 等 AI 工具独立完成产品从零到上线，工具在变，快速落地的能力不变。', tags: ['Claude Code', 'Stitch', 'Antigravity'] },
                  { icon: '🧠', title: 'AI 融入日常', desc: '用 OpenClaw、Hermes 等工具重构学习和工作流，让 AI 成为提升效率的底层习惯而非噱头。', tags: ['OpenClaw', 'Hermes', '效率工具'] },
                  { icon: '🌏', title: '海外产品运营', desc: '负责 FILI TV 菲律宾 TikTok 内容运营，制定策略、设计内容矩阵、解决漏斗问题。', tags: ['TikTok', '内容策略', '增长'] },
                  { icon: '🎓', title: '复合背景', desc: '国际商务硕士 + 英语本科，英语可作为工作语言，理解跨文化运营逻辑。', tags: ['英语', 'IB', '跨文化'] },
                ].map((card, i) => (
                  <div key={i} className="card card-interactive reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                    <div className="card-icon">{card.icon}</div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 12 }}>{card.title}</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--secondary)', lineHeight: 1.7, marginBottom: 20 }}>{card.desc}</p>
                    <div className="tags-row">{card.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section glass-section-alt">
            <div className="container">
              <div className="reveal" style={{ marginBottom: 48 }}>
                <p className="section-label">Selected Work</p>
                <h2 className="section-title">Featured Projects</h2>
              </div>
              <div className="cards-grid-2">
                <Link to="/projects/fili-tv" className="card card-interactive reveal" style={{ textDecoration: 'none' }}>
                  <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}><span className="tag-status tag-active">进行中</span><span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>海外运营 · 2026</span></div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 12 }}>FILI TV TikTok 内容运营</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--secondary)', lineHeight: 1.7, marginBottom: 20 }}>菲律宾市场 TikTok 内容策略与执行。设计 6 个内容角度的内容矩阵，用 AI 生成结构化简报。</p>
                  <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--accent)' }}>查看详情 →</span>
                </Link>
                <Link to="/projects/coding" className="card card-interactive reveal" style={{ textDecoration: 'none', transitionDelay: '0.1s' }}>
                  <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}><span className="tag-status tag-done">已完成</span><span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>AI Coding · 2026</span></div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 12 }}>AI 辅助 Coding 项目</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--secondary)', lineHeight: 1.7, marginBottom: 20 }}>用 AI 工具独立完成两个生活工具 App，展示端到端的产品落地能力。</p>
                  <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--accent)' }}>查看详情 →</span>
                </Link>
              </div>
            </div>
          </section>

          <section className="section glass-section">
            <div className="container" style={{ maxWidth: 640, textAlign: 'center' }}>
              <div className="reveal">
                <p className="section-label">My Approach</p>
                <h2 className="section-title" style={{ marginBottom: 16 }}>我的方法论</h2>
                <p style={{ color: 'var(--secondary)', marginBottom: 32, lineHeight: 1.8 }}>不是科班出身，但我相信 AI 时代技术门槛已不是障碍。<br />真正的能力是用 AI 工具快速把想法变成现实。</p>
                <Link to="/about" className="btn btn-primary">了解更多 →</Link>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      )}
    </>
  )
}
