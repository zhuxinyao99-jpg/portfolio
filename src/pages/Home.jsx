import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'
import Footer from '../components/Footer'
import { useScrollReveal } from '../hooks/useScrollReveal'

const qualities = [
  { word: 'DETAIL', angle: -90, size: 1.05 },
  { word: 'RIGOROUS', angle: -30, size: 0.9 },
  { word: 'STRUCTURED', angle: 30, size: 1.2 },
  { word: 'EFFICIENT', angle: 90, size: 1.0 },
  { word: 'DEPTH', angle: 150, size: 1.15 },
  { word: 'READER & THINKER', angle: 210, size: 0.82 },
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
            <svg
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              fill="none"
            >
              <ellipse
                cx="50" cy="50" rx="30" ry="22"
                stroke="rgba(255,107,53,0.22)"
                strokeWidth="0.22"
                strokeDasharray="1.4 2.2"
                style={{ opacity: litCount > 0 ? 1 : 0, transition: 'opacity 1s ease' }}
              />
            </svg>
            {qualities.map((q, i) => {
              const rad = q.angle * Math.PI / 180
              const left = 50 + 30 * Math.cos(rad)
              const top = 50 + 22 * Math.sin(rad)
              return (
                <span
                  key={q.word}
                  className={`cloud-word ${i < litCount ? 'cloud-lit' : ''}`}
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    transform: 'translate(-50%, -50%)',
                    fontSize: `${q.size}rem`,
                  }}
                >
                  {q.word}
                </span>
              )
            })}
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
              <h1 className="hero-h1" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic', fontWeight: 700 }}>
                <span className="hero-line animate-in delay-2">Think deep.</span>
                <br />
                <span className="hero-line animate-in delay-4">Build real.</span>
              </h1>
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
          </section>

          <Footer />
        </div>
      )}
    </>
  )
}
