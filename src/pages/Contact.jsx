import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useScrollReveal } from '../hooks/useScrollReveal'

const contacts = [
  {
    icon: '🐙', title: 'GitHub', subtitle: 'zhuxinyao99-jpg',
    link: 'https://github.com/zhuxinyao99-jpg', external: true,
  },
  {
    icon: '🎯', title: '期望职位', subtitle: '百度海外产品运营实习',
    link: null, external: false,
  },
  {
    icon: '💬', title: '开放沟通', subtitle: '随时欢迎交流合作机会',
    link: null, external: false,
  },
]

export default function Contact() {
  useScrollReveal()

  return (
    <main style={{ paddingTop: 80 }}>
      <div className="page-gradient" />

      <section className="section">
        <div className="container" style={{ maxWidth: 600, textAlign: 'center' }}>
          <div className="accent-line" style={{ margin: '0 auto 24px' }} />
          <p className="section-label">Get in Touch</p>
          <h1 className="section-title animate-in" style={{ marginBottom: 16 }}>联系方式</h1>
          <p className="animate-in delay-1" style={{ color: 'var(--secondary)', marginBottom: 48, lineHeight: 1.7 }}>
            如果你对我的项目感兴趣，或有合作机会，欢迎联系我。
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
            {contacts.map((c, i) => {
              const inner = (
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, width: '100%' }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: 'var(--accent-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
                    {c.icon}
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ fontWeight: 600, marginBottom: 2 }}>{c.title}</p>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--muted)' }}>{c.subtitle}</p>
                  </div>
                  {c.external && (
                    <svg style={{ marginLeft: 'auto', color: 'var(--accent)' }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              )

              return c.link ? (
                <a key={i} href={c.link} target="_blank" rel="noopener noreferrer"
                  className="card card-interactive reveal" style={{ width: '100%', padding: '20px 24px', textDecoration: 'none', transitionDelay: `${i * 0.1}s` }}>
                  {inner}
                </a>
              ) : (
                <div key={i} className="card reveal" style={{ width: '100%', padding: '20px 24px', cursor: 'default', transitionDelay: `${i * 0.1}s` }}>
                  {inner}
                </div>
              )
            })}
          </div>

          <div className="reveal" style={{ marginTop: 48 }}>
            <Link to="/" className="btn btn-primary">← 返回首页</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
