# Single-Page Scrolling Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Merge Home, About, Skills, and Contact into one scrolling page with anchor navigation; keep FiliTV and Coding as independent detail pages.

**Architecture:** Replace multi-route structure with a single `<HomePage>` component containing all sections as `<section id="...">` anchors. Navbar becomes anchor links on `/` and route links on detail pages. FiliTV and Coding pages are untouched.

**Tech Stack:** React, React Router v6, CSS custom properties (existing), IntersectionObserver via useScrollReveal

---

## File Map

| File | Action | What changes |
|---|---|---|
| `src/pages/Home.jsx` | **Modify** | Add About, Skills, Contact sections below existing Hero |
| `src/components/Navbar.jsx` | **Modify** | Anchor links on `/`, route links elsewhere |
| `src/App.jsx` | **Modify** | Remove `/about`, `/skills`, `/contact` routes |
| `src/pages/About.jsx` | **Delete** | Content moved into Home.jsx |
| `src/pages/Skills.jsx` | **Delete** | Content moved into Home.jsx |
| `src/pages/Contact.jsx` | **Delete** | Content moved into Home.jsx |

---

## Task 1: Add anchor IDs to existing Home Hero section

**Files:**
- Modify: `src/pages/Home.jsx`

- [ ] **Step 1: Add `id="hero"` to the hero section element**

In `src/pages/Home.jsx`, find the `<section className="hero-section">` (inside the `phase === 'main'` block) and add `id="hero"`:

```jsx
<section className="hero-section" id="hero">
```

- [ ] **Step 2: Verify dev server shows no errors**

```bash
cd "/Users/ericlu/Documents/文稿 - 朱鑫垚的MacBook Air/My projects/portfolio"
npm run dev
```
Open `http://localhost:5173` — hero section should look unchanged.

- [ ] **Step 3: Commit**

```bash
cd "/Users/ericlu/Documents/文稿 - 朱鑫垚的MacBook Air/My projects/portfolio"
git add src/pages/Home.jsx
git commit -m "feat: add id=hero anchor to home hero section"
```

---

## Task 2: Add About section to Home.jsx

**Files:**
- Modify: `src/pages/Home.jsx`

The About section content comes from `src/pages/About.jsx`. It includes: TiltCard component, timeline data, methods data, currentWork data, and three chapter sections. We inline everything into Home.jsx.

- [ ] **Step 1: Add TiltCard component and data arrays to Home.jsx**

At the top of `src/pages/Home.jsx`, add these imports and the TiltCard component + data after the existing `qualities` array:

```jsx
import { useState, useRef } from 'react'
```
(replace the existing `import { useState, useEffect } from 'react'` — add `useRef`)

Then after the `qualities` array, add:

```jsx
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
  { step: '01', title: '快速验证', short: '用最小成本测试想法', detail: '不等一切准备好再开始。先做一个粗糙但可用的版本，放到真实场景中观察反应。失败的信息和成功的一样有价值。', icon: '🚀', color: '#FF6B35' },
  { step: '02', title: 'AI 放大', short: '用工具弥补知识盲区', detail: '我不追求"什么都自己做"，而是追求"最快让想法落地"。AI 工具是我的乘法器——它让一个人能做一个小团队的事。', icon: '🤖', color: '#6366f1' },
  { step: '03', title: '数据驱动', short: '实验思维设计增长策略', detail: '每个决策背后都需要假设，每个假设都需要验证。我习惯用"如果…那么…因为…"的方式设计策略，用数据反驳或支持直觉。', icon: '📊', color: '#10b981' },
]

const currentWork = [
  { tag: '主项目', title: 'FiliTV · 菲律宾流媒体增长', desc: '负责 TikTok 内容策略与 AI 工具应用，探索内容驱动用户获取的增长飞轮', color: '#FF6B35' },
  { tag: '学习中', title: '内容运营 × 用户增长', desc: '研究如何用内容运营思维解决海外市场的用户获取问题，积累可迁移的方法论', color: '#6366f1' },
]
```

- [ ] **Step 2: Add useState for expandedMethod in the Home component**

In the `Home` component function body, after `useScrollReveal()`, add:

```jsx
const [expandedMethod, setExpandedMethod] = useState(null)
```

- [ ] **Step 3: Add About section JSX inside the `phase === 'main'` block in Home.jsx**

After the closing `</section>` of `hero-section` and before `<Footer />`, add:

```jsx
{/* ── ABOUT ── */}
<section id="about" style={{ paddingTop: 80, borderTop: '1px solid var(--border)' }}>
  <div style={{ padding: '80px 0 60px', overflow: 'hidden' }}>
    <div className="container" style={{ maxWidth: 960 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 60, alignItems: 'center' }}>
        <div>
          <p className="section-label animate-in" style={{ marginBottom: 16 }}>About Me — 关于我</p>
          <h1 className="animate-in" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 28 }}>
            从商科生<br /><span style={{ color: 'var(--accent)' }}>到 AI Builder</span>
          </h1>
          <p className="animate-in" style={{ fontSize: '1.0625rem', color: 'var(--secondary)', lineHeight: 1.85, maxWidth: 480, borderLeft: '3px solid var(--accent)', paddingLeft: 20 }}>
            我不是科班程序员，但我相信在 AI 时代，
            <strong style={{ color: 'var(--primary)' }}>真正的能力是用工具快速把想法变成现实</strong>——
            这个作品集本身就是最好的证明。
          </p>
        </div>
        <div className="animate-in" style={{ position: 'relative', flexShrink: 0 }}>
          <div style={{ width: 156, height: 156, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent) 0%, #ff9a6c 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.75rem', fontWeight: 800, color: 'white', boxShadow: '0 20px 60px rgba(255, 107, 53, 0.3)' }}>
            E
          </div>
          <div style={{ position: 'absolute', inset: -10, borderRadius: '50%', border: '2px dashed rgba(255, 107, 53, 0.3)', animation: 'spin 20s linear infinite' }} />
        </div>
      </div>
      <div className="animate-in" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 44 }}>
        {['国际商务硕士', '英语流利', 'AI 工具用户', '内容运营', '海外市场'].map(tag => (
          <span key={tag} style={{ padding: '6px 14px', borderRadius: 99, border: '1px solid var(--border)', fontSize: '0.8125rem', color: 'var(--secondary)', background: 'var(--white)' }}>{tag}</span>
        ))}
      </div>
    </div>
  </div>

  {/* Chapter 01 背景 */}
  <div style={{ padding: '64px 0', borderTop: '1px solid var(--border)' }}>
    <div className="container" style={{ maxWidth: 960 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 64, alignItems: 'start' }}>
        <div className="reveal">
          <p className="section-label">Chapter 01</p>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.3 }}>我的<br />背景</h2>
        </div>
        <div className="reveal" style={{ paddingLeft: 16 }}>
          {timeline.map((item, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '72px 1fr', gap: 20, paddingBottom: i < timeline.length - 1 ? 32 : 0, paddingLeft: 20, borderLeft: item.accent ? '2px solid var(--accent)' : '2px solid var(--border)', position: 'relative' }}>
              <div style={{ position: 'absolute', left: -6, top: 4, width: 10, height: 10, borderRadius: '50%', background: item.accent ? 'var(--accent)' : 'var(--border-strong)', border: '2px solid var(--canvas)' }} />
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: item.accent ? 'var(--accent)' : 'var(--muted)', fontWeight: 600, paddingTop: 2 }}>{item.year}</span>
              <div>
                <h3 style={{ fontWeight: 600, marginBottom: 6 }}>{item.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--secondary)', lineHeight: 1.75 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>

  {/* Chapter 02 方法论 */}
  <div style={{ padding: '64px 0', borderTop: '1px solid var(--border)' }}>
    <div className="container" style={{ maxWidth: 960 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 64, alignItems: 'start' }}>
        <div className="reveal">
          <p className="section-label">Chapter 02</p>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.3 }}>我的<br />方法论</h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--muted)', marginTop: 12, lineHeight: 1.6 }}>点击卡片<br />展开详情</p>
        </div>
        <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {methods.map((m, i) => (
            <TiltCard key={m.step} className="card" style={{ cursor: 'pointer', transitionDelay: `${i * 0.08}s`, border: expandedMethod === i ? `1px solid ${m.color}` : '1px solid var(--border)' }} onClick={() => setExpandedMethod(expandedMethod === i ? null : i)}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18 }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: `${m.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.375rem', flexShrink: 0 }}>{m.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: m.color, fontWeight: 600 }}>{m.step}</span>
                    <h3 style={{ fontWeight: 700 }}>{m.title}</h3>
                    <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--muted)' }}>{expandedMethod === i ? '▲' : '▼'}</span>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--secondary)' }}>{m.short}</p>
                </div>
              </div>
              <div style={{ maxHeight: expandedMethod === i ? 160 : 0, overflow: 'hidden', transition: 'max-height 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                <p style={{ fontSize: '0.9375rem', color: 'var(--secondary)', lineHeight: 1.8, paddingTop: 16, marginTop: 16, borderTop: '1px solid var(--border)' }}>{m.detail}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </div>
  </div>

  {/* Chapter 03 正在做的事 */}
  <div style={{ padding: '64px 0', borderTop: '1px solid var(--border)' }}>
    <div className="container" style={{ maxWidth: 960 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 64, alignItems: 'start' }}>
        <div className="reveal">
          <p className="section-label">Chapter 03</p>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.3 }}>正在做<br />的事</h2>
        </div>
        <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {currentWork.map((item, i) => (
            <div key={i} className="card" style={{ display: 'flex', gap: 20, alignItems: 'flex-start', cursor: 'default', transitionDelay: `${i * 0.1}s` }}>
              <div style={{ width: 4, alignSelf: 'stretch', borderRadius: 2, background: item.color, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: '0.6875rem', fontWeight: 600, padding: '3px 10px', borderRadius: 99, background: `${item.color}18`, color: item.color, letterSpacing: '0.05em' }}>{item.tag}</span>
                  <h3 style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{item.title}</h3>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--secondary)', lineHeight: 1.75 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 4: Add the spin keyframe CSS at the bottom of the return**

The About section uses `animation: 'spin 20s linear infinite'`. Add a `<style>` tag inside the JSX return (just before the final closing tag of the `phase === 'main'` block):

```jsx
<style>{`
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`}</style>
```

- [ ] **Step 5: Verify in browser**

Open `http://localhost:5173`, click "探索我的世界", scroll down — About section should appear below Hero.

- [ ] **Step 6: Commit**

```bash
cd "/Users/ericlu/Documents/文稿 - 朱鑫垚的MacBook Air/My projects/portfolio"
git add src/pages/Home.jsx
git commit -m "feat: inline About section into Home single-page layout"
```

---

## Task 3: Add Skills section to Home.jsx

**Files:**
- Modify: `src/pages/Home.jsx`

- [ ] **Step 1: Add skillsData array to Home.jsx**

After the `currentWork` array, add:

```jsx
const skillsData = [
  {
    category: 'AI 工具应用', icon: '⚡',
    items: [
      { name: 'Claude Code / Codex', desc: 'AI 辅助编程，从需求到代码的完整流程', level: 90 },
      { name: 'Stitch + Antigravity', desc: '无代码/低代码工具，快速搭建 Web 应用原型', level: 85 },
      { name: 'Gemini Pro + Veo', desc: 'AI 视频生成，用于 TikTok 内容素材制作', level: 75 },
    ],
  },
  {
    category: '产品运营能力', icon: '🌏',
    items: [
      { name: 'TikTok 内容策略', desc: '内容矩阵设计、漏斗分析、本地化策略', level: 85 },
      { name: '内容简报生成', desc: 'AI 辅助生成结构化内容简报', level: 80 },
      { name: '增长实验设计', desc: 'A/B 测试框架、分阶段验证思路', level: 70 },
    ],
  },
  {
    category: '技术能力', icon: '💻',
    items: [
      { name: '前端开发', desc: 'HTML/CSS/JS + React，AI 辅助完成', level: 80 },
      { name: 'GitHub Pages 部署', desc: '静态网站托管，持续集成部署', level: 85 },
      { name: 'React + Vite', desc: '现代前端框架，组件化开发', level: 75 },
    ],
  },
  {
    category: '语言能力', icon: '🗣️',
    items: [
      { name: '英语', desc: '专业工作语言，可完成英文报告撰写', level: 85 },
      { name: '中文', desc: '母语', level: 100 },
    ],
  },
]
```

- [ ] **Step 2: Add Skills section JSX after the About section closing tag**

```jsx
{/* ── SKILLS ── */}
<section id="skills" style={{ borderTop: '1px solid var(--border)' }}>
  <div className="section">
    <div className="container">
      <div className="accent-line" />
      <p className="section-label">Capabilities</p>
      <h2 className="section-title animate-in" style={{ marginBottom: 16 }}>能力框架</h2>
      <p className="animate-in delay-1" style={{ color: 'var(--secondary)', marginBottom: 48, maxWidth: 500 }}>
        四个维度的能力矩阵，hover 可以查看详情
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
        {skillsData.map((group, gi) => (
          <div key={group.category} className="reveal" style={{ transitionDelay: `${gi * 0.1}s` }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: '1.5rem' }}>{group.icon}</span>
              {group.category}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
              {group.items.map((s, si) => (
                <div key={s.name} className="card card-interactive" style={{ transitionDelay: `${si * 0.05}s` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <h4 style={{ fontWeight: 600 }}>{s.name}</h4>
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
  </div>
</section>
```

- [ ] **Step 3: Verify in browser**

Scroll down past About — Skills section should appear with progress bars animating on entry.

- [ ] **Step 4: Commit**

```bash
cd "/Users/ericlu/Documents/文稿 - 朱鑫垚的MacBook Air/My projects/portfolio"
git add src/pages/Home.jsx
git commit -m "feat: inline Skills section into Home single-page layout"
```

---

## Task 4: Add Projects section to Home.jsx

**Files:**
- Modify: `src/pages/Home.jsx`

- [ ] **Step 1: Add Projects section JSX after the Skills section closing tag**

```jsx
{/* ── PROJECTS ── */}
<section id="projects" style={{ borderTop: '1px solid var(--border)' }}>
  <div className="section">
    <div className="container">
      <div className="accent-line" />
      <p className="section-label">Work</p>
      <h2 className="section-title animate-in" style={{ marginBottom: 16 }}>项目案例</h2>
      <p className="animate-in delay-1" style={{ color: 'var(--secondary)', marginBottom: 48, maxWidth: 500 }}>
        从 0 到 1 的完整落地经验
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
        <Link to="/projects/fili-tv" className="card card-interactive reveal" style={{ textDecoration: 'none', display: 'block' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--accent-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>📺</div>
            <div>
              <p style={{ fontWeight: 700, fontSize: '1rem' }}>FiliTV</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>海外流媒体运营</p>
            </div>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--secondary)', lineHeight: 1.7, marginBottom: 16 }}>
            菲律宾流媒体平台增长项目，负责 TikTok 内容策略与 AI 工具应用，探索内容驱动用户获取的增长飞轮。
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['TikTok', 'AI 工具', '内容运营', '海外市场'].map(t => (
              <span key={t} style={{ fontSize: '0.6875rem', padding: '3px 10px', borderRadius: 99, background: 'var(--accent-subtle)', color: 'var(--accent)', fontWeight: 500 }}>{t}</span>
            ))}
          </div>
        </Link>

        <Link to="/projects/coding" className="card card-interactive reveal" style={{ textDecoration: 'none', display: 'block', transitionDelay: '0.1s' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>💻</div>
            <div>
              <p style={{ fontWeight: 700, fontSize: '1rem' }}>AI 独立开发</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>用 AI 工具构建产品</p>
            </div>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--secondary)', lineHeight: 1.7, marginBottom: 16 }}>
            用 Claude Code、React 等 AI 工具从零构建这个作品集及其他项目，验证"非科班也能独立落地产品"的路径。
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['React', 'Claude Code', 'GitHub Pages', 'Vite'].map(t => (
              <span key={t} style={{ fontSize: '0.6875rem', padding: '3px 10px', borderRadius: 99, background: 'rgba(99,102,241,0.1)', color: '#6366f1', fontWeight: 500 }}>{t}</span>
            ))}
          </div>
        </Link>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify in browser**

Scroll down past Skills — two project cards should appear, both clickable and linking to detail pages.

- [ ] **Step 3: Commit**

```bash
cd "/Users/ericlu/Documents/文稿 - 朱鑫垚的MacBook Air/My projects/portfolio"
git add src/pages/Home.jsx
git commit -m "feat: add Projects section to Home single-page layout"
```

---

## Task 5: Add Contact section to Home.jsx

**Files:**
- Modify: `src/pages/Home.jsx`

- [ ] **Step 1: Add Contact section JSX after the Projects section closing tag, before `<Footer />`**

```jsx
{/* ── CONTACT ── */}
<section id="contact" style={{ borderTop: '1px solid var(--border)' }}>
  <div className="section">
    <div className="container" style={{ maxWidth: 640 }}>
      <div className="accent-line" style={{ margin: '0 0 24px' }} />
      <p className="section-label">Get in Touch</p>
      <h2 className="section-title animate-in" style={{ marginBottom: 16 }}>联系我</h2>
      <p className="animate-in delay-1" style={{ color: 'var(--secondary)', lineHeight: 1.7, marginBottom: 40 }}>
        对我的项目感兴趣，或有任何合作机会，随时欢迎联系。
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
        {[
          { icon: <svg width="28" height="28" viewBox="0 0 98 96" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"/></svg>, title: 'GitHub', subtitle: 'zhuxinyao99-jpg', link: 'https://github.com/zhuxinyao99-jpg', external: true },
          { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>, title: 'Email', subtitle: 'zxy200204@126.com', link: 'mailto:zxy200204@126.com', external: false },
          { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>, title: 'Gmail', subtitle: 'zhuxinyao99@gmail.com', link: 'mailto:zhuxinyao99@gmail.com', external: false },
          { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>, title: 'Telegram', subtitle: '@ericlibro', link: 'https://t.me/ericlibro', external: true },
        ].map((c, i) => (
          <a key={i} href={c.link} target={c.external ? '_blank' : undefined} rel={c.external ? 'noopener noreferrer' : undefined}
            className="card card-interactive reveal"
            style={{ padding: '18px 24px', textDecoration: 'none', transitionDelay: `${i * 0.08}s`, display: 'flex', alignItems: 'center', gap: 18 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: 'var(--accent-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', flexShrink: 0 }}>{c.icon}</div>
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

      <div className="card reveal" style={{ padding: '40px', textAlign: 'center', background: 'linear-gradient(135deg, var(--accent-subtle) 0%, transparent 100%)', borderColor: 'var(--accent)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 140, height: 140, borderRadius: '50%', background: 'var(--accent)', opacity: 0.06, pointerEvents: 'none' }} />
        <p style={{ fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600, marginBottom: 16 }}>Open to Work</p>
        <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic', fontWeight: 700, fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', marginBottom: 12, lineHeight: 1.25 }}>
          Think deep.<br />Build real.
        </h3>
        <p style={{ color: 'var(--secondary)', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: 380, margin: '0 auto 28px' }}>
          正在寻找海外产品运营相关机会。如果你的团队在做有意义的事，让我们聊聊。
        </p>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify in browser**

Scroll to bottom — Contact section with 4 cards + CTA block should appear.

- [ ] **Step 3: Commit**

```bash
cd "/Users/ericlu/Documents/文稿 - 朱鑫垚的MacBook Air/My projects/portfolio"
git add src/pages/Home.jsx
git commit -m "feat: inline Contact section into Home single-page layout"
```

---

## Task 6: Update Navbar to anchor links

**Files:**
- Modify: `src/components/Navbar.jsx`

- [ ] **Step 1: Replace navLinks and add smooth scroll logic**

Replace the entire `Navbar.jsx` content with:

```jsx
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const mainLinks = [
  { id: 'hero', label: '首页' },
  { id: 'about', label: '关于' },
  { id: 'skills', label: '能力' },
  { id: 'projects', label: '项目' },
  { id: 'contact', label: '联系' },
]

const detailRoutes = ['/projects/fili-tv', '/projects/coding']

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const isDetailPage = detailRoutes.includes(location.pathname)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (isDetailPage) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.3 }
    )
    mainLinks.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [isDetailPage, location.pathname])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo">Eric Lu</Link>
          <ul className="navbar-links">
            {isDetailPage ? (
              <>
                <li><Link to="/">← 返回</Link></li>
                {detailRoutes.map(path => (
                  <li key={path}>
                    <Link to={path} className={location.pathname === path ? 'active' : ''}>
                      {path === '/projects/fili-tv' ? 'FiliTV' : 'Coding'}
                    </Link>
                  </li>
                ))}
              </>
            ) : (
              mainLinks.map(link => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className={activeSection === link.id ? 'active' : ''}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', color: 'inherit', padding: 0 }}
                  >
                    {link.label}
                  </button>
                </li>
              ))
            )}
          </ul>
          <button className="mobile-toggle" onClick={() => setMobileOpen(true)} aria-label="打开菜单">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="mobile-nav">
          <button onClick={() => setMobileOpen(false)} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', cursor: 'pointer' }} aria-label="关闭菜单">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          {isDetailPage ? (
            <Link to="/" onClick={() => setMobileOpen(false)}>← 返回首页</Link>
          ) : (
            mainLinks.map(link => (
              <button key={link.id} onClick={() => { scrollToSection(link.id); setMobileOpen(false) }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', color: 'inherit', fontSize: '1.5rem', padding: '8px 0', display: 'block', width: '100%', textAlign: 'left' }}>
                {link.label}
              </button>
            ))
          )}
        </div>
      )}
    </>
  )
}
```

- [ ] **Step 2: Verify anchor scrolling**

Open `http://localhost:5173`, complete the intro, then click each navbar item — should smooth-scroll to the correct section. On a detail page (e.g. `/projects/fili-tv`), navbar should show "← 返回" link.

- [ ] **Step 3: Commit**

```bash
cd "/Users/ericlu/Documents/文稿 - 朱鑫垚的MacBook Air/My projects/portfolio"
git add src/components/Navbar.jsx
git commit -m "feat: convert navbar to anchor links on home, route links on detail pages"
```

---

## Task 7: Clean up App.jsx and remove old pages

**Files:**
- Modify: `src/App.jsx`
- Delete: `src/pages/About.jsx`, `src/pages/Skills.jsx`, `src/pages/Contact.jsx`

- [ ] **Step 1: Update App.jsx to remove merged routes**

Replace `src/App.jsx` with:

```jsx
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import FiliTV from './pages/FiliTV'
import Coding from './pages/Coding'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/fili-tv" element={<FiliTV />} />
        <Route path="/projects/coding" element={<Coding />} />
      </Routes>
    </>
  )
}
```

- [ ] **Step 2: Delete old page files**

```bash
cd "/Users/ericlu/Documents/文稿 - 朱鑫垚的MacBook Air/My projects/portfolio"
rm src/pages/About.jsx src/pages/Skills.jsx src/pages/Contact.jsx
```

- [ ] **Step 3: Verify no broken links in browser**

Check: `/` loads full single page, `/projects/fili-tv` loads FiliTV detail, `/projects/coding` loads Coding detail. Navigating to `/about` or `/skills` should fall through (404 or redirect — acceptable for now).

- [ ] **Step 4: Commit and push**

```bash
cd "/Users/ericlu/Documents/文稿 - 朱鑫垚的MacBook Air/My projects/portfolio"
git add src/App.jsx
git rm src/pages/About.jsx src/pages/Skills.jsx src/pages/Contact.jsx
git commit -m "feat: remove old separate pages, single-page redesign complete"
git push origin main
```

---

## Self-Review

**Spec coverage check:**
- ✅ Intro animation preserved (untouched)
- ✅ Hero section — exists, gets `id="hero"`
- ✅ About section (gold quote + timeline + methodology) — Task 2
- ✅ Skills section — Task 3
- ✅ Projects section with cards linking to detail pages — Task 4
- ✅ Contact section with CTA echoing Hero tone — Task 5
- ✅ Navbar becomes anchor links — Task 6
- ✅ FiliTV + Coding remain as independent routes — preserved in App.jsx, Task 7
- ✅ Scroll reveal animations preserved — existing `.reveal` classes carried over

**Placeholder scan:** No TBD or TODO items. All code is complete.

**Type consistency:** `scrollToSection(id)` defined in Task 6 and used consistently. `mainLinks` array used in both desktop and mobile nav render paths.
