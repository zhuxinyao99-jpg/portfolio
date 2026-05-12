import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function About() {
  useScrollReveal()

  return (
    <main style={{ paddingTop: 80 }}>
      <div className="page-gradient" />

      <section className="section">
        <div className="container" style={{ maxWidth: 720 }}>
          <div className="accent-line" />
          <p className="section-label">About Me</p>
          <h1 className="section-title animate-in" style={{ marginBottom: 32 }}>关于我</h1>

          <div className="card card-glass reveal" style={{ marginBottom: 48, cursor: 'default', fontSize: '1.0625rem', color: 'var(--secondary)', lineHeight: 1.9 }}>
            <p>我是一个用 AI 工具重新定义学习方式的人。不是科班出身，但我相信在 AI 时代，技术门槛已经不再是障碍——<strong style={{ color: 'var(--primary)' }}>真正的能力是用 AI 工具快速把想法变成现实。</strong></p>
          </div>

          {/* Background */}
          <div className="reveal" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 4, height: 20, background: 'var(--accent)', borderRadius: 2 }} />
              背景
            </h2>
            <div className="timeline">
              {[
                { title: '国际商务硕士 + 英语本科', desc: '跨学科复合背景' },
                { title: '新运科技海外仓储项目', desc: '海外商务实践经验' },
                { title: '英语第二工作语言', desc: '可流利完成英文报告撰写和跨文化沟通' },
              ].map((item, i) => (
                <div key={i} className="timeline-item">
                  <h3 style={{ fontWeight: 600, marginBottom: 4 }}>{item.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--secondary)' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Why */}
          <div className="reveal" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 4, height: 20, background: 'var(--accent)', borderRadius: 2 }} />
              为什么做这个作品集
            </h2>
            <p style={{ fontSize: '0.9375rem', color: 'var(--secondary)', lineHeight: 1.8 }}>
              百度海外产品运营实习申请触发的。这个作品集本身就是最好的证明——<strong style={{ color: 'var(--accent)' }}>从设计到上线，全程用 AI 工具辅助完成</strong>。
            </p>
          </div>

          {/* Methodology */}
          <div className="reveal" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 4, height: 20, background: 'var(--accent)', borderRadius: 2 }} />
              方法论
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { step: '01', title: '快速验证', desc: '用最小成本做出可用的东西，快速测试想法是否成立', icon: '🚀' },
                { step: '02', title: 'AI 放大', desc: '用 AI 工具弥补知识盲区，快速学习并落地执行', icon: '🤖' },
                { step: '03', title: '数据驱动', desc: '用实验思维设计增长策略，用数据验证假设', icon: '📊' },
              ].map((m, i) => (
                <div key={m.step} className="card card-interactive reveal" style={{ display: 'flex', gap: 20, alignItems: 'flex-start', transitionDelay: `${i * 0.1}s` }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--accent-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>
                    {m.icon}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600 }}>{m.step}</span>
                      <h3 style={{ fontWeight: 600, color: 'var(--primary)' }}>{m.title}</h3>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--secondary)' }}>{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Currently doing */}
          <div className="reveal" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 4, height: 20, background: 'var(--accent)', borderRadius: 2 }} />
              正在做的事
            </h2>
            <div className="card" style={{ cursor: 'default', background: 'linear-gradient(135deg, var(--white), rgba(255, 107, 53, 0.04))' }}>
              <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 12, fontSize: '0.9375rem', color: 'var(--secondary)', lineHeight: 1.7 }}>
                <li>菲律宾流媒体产品 TikTok 增长项目，负责内容策略和 AI 工具应用</li>
                <li>学习如何用内容运营思维解决用户获取问题</li>
              </ul>
            </div>
          </div>

          <div className="reveal" style={{ display: 'flex', gap: 16 }}>
            <Link to="/skills" className="btn btn-primary">查看能力框架 →</Link>
            <Link to="/" className="btn btn-outline">← 返回首页</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
