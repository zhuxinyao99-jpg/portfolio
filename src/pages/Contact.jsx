import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useScrollReveal } from '../hooks/useScrollReveal'

const contacts = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 98 96" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"/>
      </svg>
    ),
    title: 'GitHub',
    subtitle: 'zhuxinyao99-jpg',
    link: 'https://github.com/zhuxinyao99-jpg',
    external: true,
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    ),
    title: 'Email',
    subtitle: 'zxy200204@126.com',
    link: 'mailto:zxy200204@126.com',
    external: false,
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    ),
    title: 'Gmail',
    subtitle: 'zhuxinyao99@gmail.com',
    link: 'mailto:zhuxinyao99@gmail.com',
    external: false,
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
    title: 'Telegram',
    subtitle: '@ericlibro',
    link: 'https://t.me/ericlibro',
    external: true,
  },
]

export default function Contact() {
  useScrollReveal()

  return (
    <main style={{ paddingTop: 80 }}>
      <div className="page-gradient" />

      {/* ── Contact Header ── */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container" style={{ maxWidth: 640, textAlign: 'center' }}>
          <div className="accent-line" style={{ margin: '0 auto 24px' }} />
          <p className="section-label">Get in Touch</p>
          <h1 className="section-title animate-in" style={{ marginBottom: 16 }}>联系我</h1>
          <p className="animate-in delay-1" style={{ color: 'var(--secondary)', lineHeight: 1.7 }}>
            对我的项目感兴趣，或有任何合作机会，随时欢迎联系。
          </p>
        </div>
      </section>

      {/* ── Contact Cards ── */}
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container" style={{ maxWidth: 640 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {contacts.map((c, i) => (
              <a
                key={i}
                href={c.link}
                target={c.external ? '_blank' : undefined}
                rel={c.external ? 'noopener noreferrer' : undefined}
                className="card card-interactive reveal"
                style={{
                  padding: '18px 24px',
                  textDecoration: 'none',
                  transitionDelay: `${i * 0.08}s`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 18,
                }}
              >
                <div style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: 'var(--accent-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent)',
                  flexShrink: 0,
                }}>
                  {c.icon}
                </div>
                <div style={{ textAlign: 'left', flex: 1 }}>
                  <p style={{ fontWeight: 600, marginBottom: 2 }}>{c.title}</p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--muted)' }}>{c.subtitle}</p>
                </div>
                <svg style={{ color: 'var(--accent)', flexShrink: 0 }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Block ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 640 }}>
          <div
            className="card reveal"
            style={{
              padding: '40px',
              textAlign: 'center',
              background: 'linear-gradient(135deg, var(--accent-subtle) 0%, transparent 100%)',
              borderColor: 'var(--accent)',
              borderWidth: '1px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute',
              top: -40,
              right: -40,
              width: 140,
              height: 140,
              borderRadius: '50%',
              background: 'var(--accent)',
              opacity: 0.06,
              pointerEvents: 'none',
            }} />
            <p style={{
              fontSize: '0.6875rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              fontWeight: 600,
              marginBottom: 16,
            }}>Open to Work</p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: 'italic',
              fontWeight: 700,
              fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
              marginBottom: 12,
              lineHeight: 1.25,
            }}>
              Think deep.<br />Build real.
            </h2>
            <p style={{ color: 'var(--secondary)', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: 380, margin: '0 auto 28px' }}>
              正在寻找海外产品运营相关机会。如果你的团队在做有意义的事，让我们聊聊。
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/projects/fili-tv" className="btn btn-primary">
                看看我做了什么
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link to="/about" className="btn btn-outline">关于我</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
