import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'
import Footer from '../components/Footer'
import { useScrollReveal } from '../hooks/useScrollReveal'

const qualities = [
  { word: 'DEEP WORK', angle: -90, size: 1.1 },
  { word: 'RIGOROUS', angle: -30, size: 1.0 },
  { word: 'STRUCTURED', angle: 30, size: 1.15 },
  { word: 'BUILDER', angle: 90, size: 1.05 },
  { word: 'DEPTH', angle: 150, size: 1.2 },
  { word: 'LANGUAGE & MIND', angle: 210, size: 0.95 },
]

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

function SchoolLogo({ name, color }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect width="14" height="14" rx="3" fill={color} opacity="0.15" />
      <text x="7" y="10.5" textAnchor="middle" fontSize="6.5" fontWeight="700" fill={color} fontFamily="sans-serif">{name[0]}</text>
    </svg>
  )
}

const AVATAR_STATES = ['reading', 'coding', 'badminton']
const AVATAR_LABELS = { reading: '📖 深度阅读中', coding: '⌨️ Vibe Coding', badminton: '🏸 打羽毛球' }

/* ── SVG defs shared across all avatar states ── */
function AvatarDefs() {
  return (
    <defs>
      {/* skin */}
      <radialGradient id="skinGrad" cx="45%" cy="38%" r="55%">
        <stop offset="0%" stopColor="#FFECD6" />
        <stop offset="60%" stopColor="#FDDCBC" />
        <stop offset="100%" stopColor="#F0B98A" />
      </radialGradient>
      {/* skin shadow */}
      <radialGradient id="skinShadow" cx="60%" cy="55%" r="50%">
        <stop offset="0%" stopColor="#F0B98A" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#F0B98A" stopOpacity="0" />
      </radialGradient>
      {/* hair */}
      <radialGradient id="hairGrad" cx="40%" cy="30%" r="60%">
        <stop offset="0%" stopColor="#7A6A5A" />
        <stop offset="40%" stopColor="#5C4E3E" />
        <stop offset="100%" stopColor="#3A2E22" />
      </radialGradient>
      {/* jacket */}
      <linearGradient id="jacketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2D4A8A" />
        <stop offset="50%" stopColor="#1E3A7A" />
        <stop offset="100%" stopColor="#152C60" />
      </linearGradient>
      <linearGradient id="jacketSide" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#152C60" />
        <stop offset="100%" stopColor="#1E3A7A" />
      </linearGradient>
      {/* jeans */}
      <linearGradient id="jeansGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#4A4A5A" />
        <stop offset="100%" stopColor="#2E2E3A" />
      </linearGradient>
      {/* shoe */}
      <linearGradient id="shoeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#2A4A9A" />
        <stop offset="100%" stopColor="#1A2E6A" />
      </linearGradient>
      {/* white tee */}
      <linearGradient id="teeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F8F8F2" />
        <stop offset="100%" stopColor="#E8E8DC" />
      </linearGradient>
      {/* cheek blush */}
      <radialGradient id="blushL" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#F4A07A" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#F4A07A" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="blushR" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#F4A07A" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#F4A07A" stopOpacity="0" />
      </radialGradient>
    </defs>
  )
}

/* ── Shared head: design-ref accurate ── */
function Head3D({ eyeDown = false, smirkRight = false, eyebrowAngry = false, eyesClosed = false, mouthOpen = false, offsetX = 0 }) {
  return (
    <g transform={`translate(${offsetX}, 0)`}>
      {/* neck */}
      <rect x="53" y="94" width="14" height="16" rx="5" fill="url(#skinGrad)" />
      <rect x="57" y="94" width="4" height="16" fill="#E8C4A0" opacity="0.4" />

      {/* head base shadow (3D depth) */}
      <ellipse cx="64" cy="66" rx="32" ry="32" fill="#DFA870" opacity="0.25" />
      {/* head */}
      <ellipse cx="60" cy="64" rx="32" ry="32" fill="url(#skinGrad)" />
      {/* face volume shadow */}
      <ellipse cx="60" cy="64" rx="32" ry="32" fill="url(#skinShadow)" />
      {/* cheek highlight */}
      <ellipse cx="38" cy="72" rx="9" ry="6" fill="url(#blushL)" />
      <ellipse cx="82" cy="72" rx="9" ry="6" fill="url(#blushR)" />
      {/* nose */}
      <ellipse cx="60" cy="74" rx="3.5" ry="2.5" fill="#E8B090" opacity="0.7" />

      {/* ── HAIR ── layered for volume */}
      {/* back hair mass */}
      <ellipse cx="60" cy="40" rx="33" ry="22" fill="#3A2E22" />
      {/* side hair left */}
      <ellipse cx="29" cy="60" rx="8" ry="16" fill="#3A2E22" />
      {/* side hair right */}
      <ellipse cx="91" cy="60" rx="8" ry="16" fill="#3A2E22" />
      {/* hair main top */}
      <ellipse cx="60" cy="36" rx="30" ry="20" fill="url(#hairGrad)" />
      {/* messy tufts — design ref shows spiky layered hair */}
      <path d="M32 44 Q28 28 38 24 Q44 18 50 26 Q50 16 58 14 Q66 12 68 22 Q72 14 80 18 Q88 22 84 34 Q90 28 92 38" fill="url(#hairGrad)" />
      {/* hair highlight */}
      <ellipse cx="52" cy="28" rx="10" ry="5" fill="#8A7A66" opacity="0.5" />
      {/* side tuft left over ear */}
      <path d="M28 52 Q22 44 28 38 Q32 34 36 42" fill="url(#hairGrad)" />

      {/* ears */}
      <ellipse cx="28" cy="66" rx="6" ry="8" fill="url(#skinGrad)" />
      <ellipse cx="29" cy="66" rx="4" ry="6" fill="#EDBA95" />
      <ellipse cx="92" cy="66" rx="6" ry="8" fill="url(#skinGrad)" />
      <ellipse cx="91" cy="66" rx="4" ry="6" fill="#EDBA95" />

      {/* ── EYEBROWS ── */}
      {eyebrowAngry ? (
        <>
          <path d="M40 49 Q47 46 53 50" stroke="#4A3828" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M67 50 Q73 46 80 49" stroke="#4A3828" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          <path d="M40 50 Q47 47 53 50" stroke="#4A3828" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M67 50 Q73 47 80 50" stroke="#4A3828" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        </>
      )}

      {/* ── GLASSES ── large round frames, design ref */}
      {/* left lens */}
      <circle cx="47" cy="63" r="13" fill="rgba(180,220,255,0.08)" stroke="#1A1A2A" strokeWidth="2.8" />
      {/* right lens */}
      <circle cx="73" cy="63" r="13" fill="rgba(180,220,255,0.08)" stroke="#1A1A2A" strokeWidth="2.8" />
      {/* bridge */}
      <path d="M60 63 L60 63" stroke="#1A1A2A" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="60" y1="63" x2="60" y2="63" stroke="#1A1A2A" strokeWidth="2" />
      <path d="M55 63 Q60 61 65 63" stroke="#1A1A2A" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      {/* temples */}
      <line x1="28" y1="61" x2="34" y2="63" stroke="#1A1A2A" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="92" y1="61" x2="86" y2="63" stroke="#1A1A2A" strokeWidth="2.2" strokeLinecap="round" />
      {/* lens glare */}
      <path d="M41 57 Q44 55 47 57" stroke="rgba(255,255,255,0.65)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M67 57 Q70 55 73 57" stroke="rgba(255,255,255,0.65)" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* ── EYES ── */}
      {eyesClosed ? (
        <>
          <path d="M42 64 Q47 68 52 64" stroke="#3A2E22" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M68 64 Q73 68 78 64" stroke="#3A2E22" strokeWidth="2" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          <ellipse cx="47" cy={eyeDown ? 65 : 63} rx="5.5" ry={eyeDown ? 4 : 5.5} fill="#2A2010" />
          <ellipse cx="73" cy={eyeDown ? 65 : 63} rx="5.5" ry={eyeDown ? 4 : 5.5} fill="#2A2010" />
          {/* iris */}
          <ellipse cx="47" cy={eyeDown ? 65 : 63} rx="3.5" ry={eyeDown ? 2.8 : 3.5} fill="#6B4E2A" />
          <ellipse cx="73" cy={eyeDown ? 65 : 63} rx="3.5" ry={eyeDown ? 2.8 : 3.5} fill="#6B4E2A" />
          {/* pupil */}
          <ellipse cx="47" cy={eyeDown ? 65 : 63} rx="2" ry={eyeDown ? 1.8 : 2} fill="#1A1008" />
          <ellipse cx="73" cy={eyeDown ? 65 : 63} rx="2" ry={eyeDown ? 1.8 : 2} fill="#1A1008" />
          {/* catchlight */}
          <circle cx="45.5" cy={eyeDown ? 63.5 : 61.5} r="1.4" fill="white" />
          <circle cx="71.5" cy={eyeDown ? 63.5 : 61.5} r="1.4" fill="white" />
        </>
      )}

      {/* ── MOUTH ── */}
      {mouthOpen
        ? <path d="M49 82 Q60 92 71 82" stroke="#C47A4A" strokeWidth="2" strokeLinecap="round" fill="#F4A07A" />
        : smirkRight
        ? <path d="M51 82 Q62 89 70 83" stroke="#C47A4A" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        : <path d="M50 82 Q60 90 70 82" stroke="#C47A4A" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      }
    </g>
  )
}

/* ── Shared body: design-ref accurate ── */
function Body3D({ armRaise = 0, armSwingL = 0, armSwingR = 0, legSpread = 0 }) {
  return (
    <g>
      {/* white tee — visible at collar */}
      <rect x="44" y="108" width="32" height="10" rx="4" fill="url(#teeGrad)" />
      {/* jacket body */}
      <path d="M30 120 Q28 160 32 188 Q46 194 60 194 Q74 194 88 188 Q92 160 90 120 Q76 110 60 108 Q44 110 30 120 Z" fill="url(#jacketGrad)" />
      {/* jacket left panel shadow */}
      <path d="M30 120 Q28 160 32 188 Q46 194 60 194 L60 108 Q44 110 30 120 Z" fill="#152C60" opacity="0.3" />
      {/* jacket collar left */}
      <path d="M44 108 L52 128 L60 120 L60 108" fill="url(#teeGrad)" />
      {/* jacket collar right */}
      <path d="M76 108 L68 128 L60 120 L60 108" fill="url(#teeGrad)" />
      {/* jacket buttons */}
      <circle cx="60" cy="135" r="2" fill="#1A2E60" />
      <circle cx="60" cy="148" r="2" fill="#1A2E60" />
      <circle cx="60" cy="161" r="2" fill="#1A2E60" />
      {/* jacket left sleeve */}
      <path
        d={`M30 120 Q${20 - armSwingL} ${130 + armRaise} ${16 - armSwingL} ${160 + armRaise}`}
        stroke="url(#jacketSide)" strokeWidth="20" strokeLinecap="round" fill="none"
      />
      {/* left hand */}
      <ellipse cx={16 - armSwingL} cy={162 + armRaise} rx="8" ry="6" fill="url(#skinGrad)" transform={`rotate(${-10 - armSwingL * 0.5} ${16 - armSwingL} ${162 + armRaise})`} />
      {/* jacket right sleeve */}
      <path
        d={`M90 120 Q${100 + armSwingR} ${130} ${104 + armSwingR} ${158}`}
        stroke="url(#jacketSide)" strokeWidth="20" strokeLinecap="round" fill="none"
      />
      {/* right hand */}
      <ellipse cx={104 + armSwingR} cy={160} rx="8" ry="6" fill="url(#skinGrad)" transform={`rotate(${10 + armSwingR * 0.5} ${104 + armSwingR} 160)`} />

      {/* ── JEANS ── */}
      {/* left leg */}
      <path d={`M32 188 Q${30 - legSpread} 220 ${28 - legSpread} 260 Q${36 - legSpread} 268 ${46 - legSpread} 260 Q${50 - legSpread} 220 52 188 Z`} fill="url(#jeansGrad)" />
      {/* right leg */}
      <path d={`M88 188 Q${90 + legSpread} 220 ${92 + legSpread} 260 Q${84 + legSpread} 268 ${74 + legSpread} 260 Q${70 + legSpread} 220 68 188 Z`} fill="url(#jeansGrad)" />
      {/* cuffed hems left */}
      <rect x={23 - legSpread} y="256" width="24" height="8" rx="2" fill="#5A5A6A" />
      {/* cuffed hems right */}
      <rect x={69 + legSpread} y="256" width="24" height="8" rx="2" fill="#5A5A6A" />
      {/* jean highlight */}
      <rect x="44" y="192" width="6" height="60" rx="3" fill="rgba(255,255,255,0.08)" />
      <rect x="70" y="192" width="6" height="60" rx="3" fill="rgba(255,255,255,0.08)" />

      {/* ── SHOES ── canvas sneakers, design ref blue */}
      {/* left shoe */}
      <ellipse cx={35 - legSpread} cy={268} rx="16" ry="7" fill="url(#shoeGrad)" />
      <rect x={19 - legSpread} y={261} width="32" height="10" rx="5" fill="url(#shoeGrad)" />
      {/* shoe sole left */}
      <ellipse cx={35 - legSpread} cy={270} rx="16" ry="4" fill="#0F1E50" />
      {/* laces left */}
      <line x1={26 - legSpread} y1="264" x2={44 - legSpread} y2="264" stroke="white" strokeWidth="1.2" opacity="0.7" />
      <line x1={27 - legSpread} y1="267" x2={43 - legSpread} y2="267" stroke="white" strokeWidth="1.2" opacity="0.7" />
      {/* right shoe */}
      <ellipse cx={85 + legSpread} cy={268} rx="16" ry="7" fill="url(#shoeGrad)" />
      <rect x={69 + legSpread} y={261} width="32" height="10" rx="5" fill="url(#shoeGrad)" />
      <ellipse cx={85 + legSpread} cy={270} rx="16" ry="4" fill="#0F1E50" />
      <line x1={76 + legSpread} y1="264" x2={94 + legSpread} y2="264" stroke="white" strokeWidth="1.2" opacity="0.7" />
      <line x1={77 + legSpread} y1="267" x2={93 + legSpread} y2="267" stroke="white" strokeWidth="1.2" opacity="0.7" />
    </g>
  )
}

function _unused_Head3D_stub() {
  return null
  // kept to avoid edit offset issues — delete if refactoring
  const pupilX = 0
  return (
    <g>
      {/* neck */}
      <rect x="52" y="95" width="16" height="14" rx="5" fill="#F5C5A0" />
      {/* head shadow (gives 3D depth) */}
      <ellipse cx="66" cy="68" rx="30" ry="30" fill="#E8A882" />
      {/* head main */}
      <ellipse cx="60" cy="66" rx="30" ry="30" fill="#FDDCBC" />
      {/* cheek highlights */}
      <ellipse cx="44" cy="75" rx="6" ry="4" fill="#F9A88A" opacity="0.45" />
      <ellipse cx="76" cy="75" rx="6" ry="4" fill="#F9A88A" opacity="0.45" />
      {/* hair shadow */}
      <ellipse cx="63" cy="40" rx="27" ry="15" fill="#2A1F15" />
      {/* hair main */}
      <ellipse cx="60" cy="38" rx="27" ry="15" fill="#3D2B1F" />
      {/* side hair left */}
      <ellipse cx="33" cy="58" rx="7" ry="13" fill="#3D2B1F" />
      {/* side hair right */}
      <ellipse cx="87" cy="58" rx="7" ry="13" fill="#3D2B1F" />
      {/* hair front tuft */}
      <path d="M42 36 Q50 24 60 30 Q70 24 78 36" fill="#3D2B1F" />
      {/* ear left */}
      <ellipse cx="30" cy="68" rx="5" ry="7" fill="#FDDCBC" />
      <ellipse cx="31" cy="68" rx="3" ry="5" fill="#F5C5A0" />
      {/* ear right */}
      <ellipse cx="90" cy="68" rx="5" ry="7" fill="#FDDCBC" />
      <ellipse cx="89" cy="68" rx="3" ry="5" fill="#F5C5A0" />

      {/* eyebrows */}
      {eyebrowAngry ? (
        <>
          <path d="M43 53 Q49 50 55 53" stroke="#2A1F15" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M65 53 Q71 50 77 53" stroke="#2A1F15" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          <path d="M43 54 Q49 51 55 54" stroke="#2A1F15" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M65 54 Q71 51 77 54" stroke="#2A1F15" strokeWidth="2" strokeLinecap="round" fill="none" />
        </>
      )}

      {/* glasses frame — round, tortoise shell */}
      <circle cx="49" cy="68" r="10" fill="none" stroke="#8B5E3C" strokeWidth="2.2" />
      <circle cx="71" cy="68" r="10" fill="none" stroke="#8B5E3C" strokeWidth="2.2" />
      <line x1="59" y1="68" x2="61" y2="68" stroke="#8B5E3C" strokeWidth="2" />
      <line x1="28" y1="66" x2="39" y2="68" stroke="#8B5E3C" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="92" y1="66" x2="81" y2="68" stroke="#8B5E3C" strokeWidth="1.8" strokeLinecap="round" />
      {/* lens glare */}
      <path d="M43 63 Q45 61 48 63" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" fill="none" />
      <path d="M65 63 Q67 61 70 63" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" fill="none" />

      {/* eyes */}
      <ellipse cx={49 + pupilX} cy={eyeDown ? 70 : 68} rx="4.5" ry={eyeDown ? 3.5 : 4.5} fill="#2A1F15" />
      <ellipse cx={71 + pupilX} cy={eyeDown ? 70 : 68} rx="4.5" ry={eyeDown ? 3.5 : 4.5} fill="#2A1F15" />
      <circle cx={47 + pupilX} cy={eyeDown ? 68.5 : 66.5} r="1.3" fill="white" />
      <circle cx={69 + pupilX} cy={eyeDown ? 68.5 : 66.5} r="1.3" fill="white" />

      {/* mouth */}
      {smirkRight
        ? <path d="M54 82 Q63 87 70 81" stroke="#C47A4A" strokeWidth="2" strokeLinecap="round" fill="none" />
        : <path d="M52 82 Q60 88 68 82" stroke="#C47A4A" strokeWidth="2" strokeLinecap="round" fill="none" />
      }
    </g>
  )
}

function EricAvatar() {
  const [stateIdx, setStateIdx] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [tick, setTick] = useState(0)
  const current = AVATAR_STATES[stateIdx]

  useEffect(() => {
    if (hovered) return
    const t = setInterval(() => setStateIdx(i => (i + 1) % AVATAR_STATES.length), 3200)
    return () => clearInterval(t)
  }, [hovered])

  // animation tick for breathing / bobbing
  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 60)
    return () => clearInterval(t)
  }, [])

  const t = tick * 0.06
  const breathY = Math.sin(t) * 2.5           // gentle body bob
  const armSwing = Math.sin(t * 1.2) * 5      // arm sway (badminton)
  const pageFlip = Math.sin(t * 0.8) * 3      // page flutter (reading)
  const typeTick = Math.floor(tick / 20) % 2  // cursor blink (coding)

  const SVG_W = 140
  const SVG_H = 290
  const VB = `0 0 ${SVG_W} ${SVG_H}`

  // reading: holding book, eyes down, gentle sway
  const readingScene = (
    <svg width={SVG_W} height={SVG_H} viewBox={VB} fill="none"
      style={{ filter: 'drop-shadow(0 12px 32px rgba(30,40,100,0.22)) drop-shadow(0 2px 8px rgba(0,0,0,0.12))' }}>
      <AvatarDefs />
      <ellipse cx="70" cy={SVG_H - 8} rx="42" ry="8" fill="rgba(0,0,0,0.10)" />
      <g transform={`translate(0,${breathY})`}>
        <Body3D armRaise={-18} armSwingL={-8} armSwingR={8} />
        {/* book in arms */}
        <g transform={`translate(${pageFlip * 0.5}, 0)`}>
          <rect x="22" y="154" width="96" height="62" rx="6" fill="#4338CA" />
          <rect x="22" y="154" width="47" height="62" rx="6" fill="#6D65F5" />
          <line x1="69" y1="154" x2="69" y2="216" stroke="#3730A3" strokeWidth="2.5" />
          {[162,170,178,186,194,202].map(y => (
            <line key={y} x1="27" y1={y} x2="64" y2={y} stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" />
          ))}
          {/* book spine highlight */}
          <rect x="22" y="154" width="4" height="62" rx="2" fill="rgba(255,255,255,0.15)" />
        </g>
        <Head3D eyeDown />
      </g>
    </svg>
  )

  // coding: laptop on lap, smirk, cursor blink
  const codingScene = (
    <svg width={SVG_W} height={SVG_H} viewBox={VB} fill="none"
      style={{ filter: 'drop-shadow(0 12px 32px rgba(30,40,100,0.22)) drop-shadow(0 2px 8px rgba(0,0,0,0.12))' }}>
      <AvatarDefs />
      <ellipse cx="70" cy={SVG_H - 8} rx="42" ry="8" fill="rgba(0,0,0,0.10)" />
      <g transform={`translate(0,${breathY * 0.5})`}>
        <Body3D armSwingL={-6} armSwingR={6} />
        {/* laptop resting on arms */}
        <rect x="14" y="185" width="112" height="10" rx="4" fill="#374151" />
        <rect x="20" y="148" width="100" height="42" rx="7" fill="#1E293B" />
        <rect x="24" y="152" width="92" height="34" rx="4" fill="#0D1424" />
        <text x="30" y="166" fontSize="6" fill="#A78BFA" fontFamily="monospace">{'const build = (idea) => {'}</text>
        <text x="30" y="175" fontSize="6" fill="#6EE7B7" fontFamily="monospace">{'  return ship(idea)'}</text>
        <text x="30" y="184" fontSize="6" fill="#FDE68A" fontFamily="monospace">{'}'}</text>
        <rect x="86" y="177" width="2" height="7" fill={typeTick ? '#A78BFA' : 'transparent'} />
        <Head3D smirkRight />
      </g>
    </svg>
  )

  // badminton: dynamic pose, racket raised
  const badmintonScene = (
    <svg width={SVG_W + 30} height={SVG_H} viewBox={`-10 0 ${SVG_W + 30} ${SVG_H}`} fill="none"
      style={{ filter: 'drop-shadow(0 12px 32px rgba(255,107,53,0.22)) drop-shadow(0 2px 8px rgba(0,0,0,0.12))' }}>
      <AvatarDefs />
      <ellipse cx="70" cy={SVG_H - 8} rx="48" ry="9" fill="rgba(0,0,0,0.11)" />
      <g transform={`translate(0,${Math.sin(t * 1.6) * 3})`}>
        <Body3D armRaise={-30 - armSwing * 2} armSwingL={armSwing * 0.8} armSwingR={armSwing * 3} legSpread={Math.abs(armSwing) * 0.5} />
        {/* headband */}
        <rect x="28" y="58" width="64" height="9" rx="4.5" fill="#FF6B35" opacity="0.92" />
        {/* racket — attached to right arm */}
        <g transform={`rotate(${-35 - armSwing * 1.8}, 104, 130)`}>
          {/* handle */}
          <rect x="101" y="128" width="6" height="30" rx="3" fill="#FF6B35" />
          {/* head */}
          <ellipse cx="104" cy="104" rx="18" ry="24" fill="none" stroke="#C47A4A" strokeWidth="3" />
          {/* strings */}
          {[-12,-6,0,6,12].map(x => <line key={x} x1={104+x} y1="80" x2={104+x} y2="128" stroke="#C47A4A" strokeWidth="0.9" opacity="0.55" />)}
          {[-18,-10,-2,6,14,22].map(y => <line key={y} x1="86" y1={104+y-20} x2="122" y2={104+y-20} stroke="#C47A4A" strokeWidth="0.9" opacity="0.55" />)}
        </g>
        {/* shuttlecock */}
        <g transform={`translate(${Math.sin(t) * 6 + 110}, ${Math.cos(t * 1.3) * 6 + 40})`}>
          <ellipse cx="0" cy="0" rx="6" ry="5" fill="white" stroke="#CCC" strokeWidth="1.2" />
          <path d="M0 -5 L-9 -22 M0 -5 L0 -24 M0 -5 L9 -22" stroke="#DDD" strokeWidth="1.5" strokeLinecap="round" />
        </g>
        <Head3D eyebrowAngry mouthOpen />
      </g>
    </svg>
  )

  const scenes = { reading: readingScene, coding: codingScene, badminton: badmintonScene }

  return (
    <div
      className="animate-in"
      style={{ position: 'relative', flexShrink: 0, cursor: 'pointer', userSelect: 'none' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setStateIdx(i => (i + 1) % AVATAR_STATES.length)}
      title="点击切换状态"
    >
      <div style={{
        width: 172, height: 220, borderRadius: 36,
        background: 'linear-gradient(160deg, #f0f4ff 0%, #fff8f3 60%, #ffeee4 100%)',
        border: '2px solid rgba(255,107,53,0.15)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 24px 64px rgba(99,102,241,0.12), 0 8px 24px rgba(255,107,53,0.10)',
        transition: 'transform 0.25s cubic-bezier(.34,1.56,.64,1), box-shadow 0.25s ease',
        transform: hovered ? 'scale(1.06) translateY(-4px)' : 'scale(1)',
        overflow: 'hidden',
      }}>
        {/* state transition wrapper */}
        <div key={current} style={{ animation: 'avatarIn 0.4s cubic-bezier(.34,1.56,.64,1) both' }}>
          {scenes[current]}
        </div>
        <div style={{
          fontSize: '0.6875rem', color: 'var(--accent)',
          fontWeight: 600, letterSpacing: '0.03em', textAlign: 'center',
          padding: '4px 12px', borderRadius: 99,
          background: 'rgba(255,107,53,0.1)',
          marginTop: 2,
        }}>
          {AVATAR_LABELS[current]}
        </div>
      </div>
      <div style={{
        position: 'absolute', inset: -10, borderRadius: 46,
        border: '2px dashed rgba(255, 107, 53, 0.2)',
        animation: 'spin 20s linear infinite',
        pointerEvents: 'none',
      }} />
      <div style={{ position: 'absolute', bottom: -16, left: '50%', transform: 'translateX(-50%)', fontSize: '0.625rem', color: 'var(--muted)', whiteSpace: 'nowrap' }}>
        点击切换 · {stateIdx + 1}/{AVATAR_STATES.length}
      </div>
    </div>
  )
}

const timeline = [
  { year: '本科', title: '英语专业', school: '西安外国语大学', schoolShort: '西外', schoolColor: '#1a5fb4', desc: '语言能力成为跨文化沟通的底层基础，养成用外语思维处理复杂信息的习惯', accent: false },
  { year: '研究生', title: '国际商务硕士', school: '北京外国语大学', schoolShort: '北外', schoolColor: '#c0392b', desc: '系统学习全球商业逻辑、供应链与市场进入策略，建立商业分析框架', accent: false },
  { year: '实践', title: 'FiliTV · 菲律宾流媒体增长', school: null, schoolShort: null, schoolColor: null, desc: '负责 TikTok 内容策略与 AI 工具应用，探索内容驱动用户获取的增长飞轮', accent: false },
  { year: '现在', title: 'AI 工具 + 内容运营', school: null, schoolShort: null, schoolColor: null, desc: '用 AI 工具放大执行力，探索如何用内容驱动海外产品增长', accent: true },
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

export default function Home() {
  const [phase, setPhase] = useState('intro')
  const [titleReady, setTitleReady] = useState(false)
  const [subtitleReady, setSubtitleReady] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [showEnter, setShowEnter] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [litCount, setLitCount] = useState(0)
  const [showName, setShowName] = useState(false)
  const [expandedMethod, setExpandedMethod] = useState(null)

  useScrollReveal(phase)

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
                stroke="rgba(255,107,53,0.5)"
                strokeWidth="1.2"
                strokeDasharray="5 7"
                vectorEffect="non-scaling-stroke"
                style={{ opacity: litCount > 0 ? 1 : 0, transition: 'opacity 1.2s ease' }}
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

          {/* ── HERO ── */}
          <section className="hero-section" id="hero">
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
                <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="btn btn-primary">
                  看看我做了什么
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="btn btn-outline">关于我</button>
              </div>
              <div className="animate-in delay-7 hero-stats">
                {[
                  { value: '2', label: 'AI 独立开发 App' },
                  { value: '1', label: '海外运营项目' },
                  { value: '0→1', label: '全流程落地能力' },
                ].map((s, i) => (
                  <div key={i} className="hero-stat" style={{ borderLeft: i > 0 ? '1px solid var(--border)' : 'none' }}>
                    <p className="counter" style={{ fontSize: '1.75rem' }}>{s.value}</p>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--secondary)', marginTop: 4 }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── ABOUT ── */}
          <section id="about" style={{ borderTop: '1px solid var(--border)' }}>
            <div style={{ padding: '80px 0 60px', overflow: 'hidden' }}>
              <div className="container" style={{ maxWidth: 960 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 60, alignItems: 'center' }}>
                  <div>
                    <p className="section-label animate-in" style={{ marginBottom: 16 }}>About Me — 关于我</p>
                    <h2 className="animate-in" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 28 }}>
                      语言 × 商科<br /><span style={{ color: 'var(--accent)' }}>× AI 复合型</span>
                    </h2>
                    <blockquote className="animate-in" style={{ fontSize: '1.0625rem', color: 'var(--primary)', lineHeight: 2.0, maxWidth: 480, borderLeft: '3px solid var(--accent)', paddingLeft: 20, margin: 0 }}>
                      <p style={{ marginBottom: 12, fontStyle: 'italic' }}>
                        "在竞争日益激烈、变化愈加迅速的经济环境中，深度工作的能力正在成为一种稀缺而宝贵的技能。"
                      </p>
                      <footer style={{ fontSize: '0.875rem', color: 'var(--secondary)', fontStyle: 'normal', fontWeight: 500 }}>
                        — Cal Newport，《深度工作》（2016）
                      </footer>
                    </blockquote>
                  </div>
                  <EricAvatar />
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
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.3 }}>我的<br />背景</h3>
                  </div>
                  <div className="reveal" style={{ paddingLeft: 16 }}>
                    {timeline.map((item, i) => (
                      <div key={i} style={{ display: 'grid', gridTemplateColumns: '72px 1fr', gap: 20, paddingBottom: i < timeline.length - 1 ? 32 : 0, paddingLeft: 20, borderLeft: item.accent ? '2px solid var(--accent)' : '2px solid var(--border)', position: 'relative' }}>
                        <div style={{ position: 'absolute', left: -6, top: 4, width: 10, height: 10, borderRadius: '50%', background: item.accent ? 'var(--accent)' : 'var(--border-strong)', border: '2px solid var(--canvas)' }} />
                        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: item.accent ? 'var(--accent)' : 'var(--secondary)', fontWeight: 600, paddingTop: 2 }}>{item.year}</span>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
                            <h4 style={{ fontWeight: 600 }}>{item.title}</h4>
                            {item.school && (
                              <span style={{
                                display: 'inline-flex', alignItems: 'center', gap: 5,
                                fontSize: '0.6875rem', fontWeight: 600, padding: '2px 8px',
                                borderRadius: 99, background: `${item.schoolColor}15`,
                                color: item.schoolColor, border: `1px solid ${item.schoolColor}30`,
                              }}>
                                <SchoolLogo name={item.schoolShort} color={item.schoolColor} />
                                {item.school}
                              </span>
                            )}
                          </div>
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
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.3 }}>我的<br />方法论</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--secondary)', marginTop: 12, lineHeight: 1.6 }}>点击卡片<br />展开详情</p>
                  </div>
                  <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {methods.map((m, i) => (
                      <TiltCard key={m.step} className="card" style={{ cursor: 'pointer', transitionDelay: `${i * 0.08}s`, border: expandedMethod === i ? `1px solid ${m.color}` : '1px solid var(--border)' }} onClick={() => setExpandedMethod(expandedMethod === i ? null : i)}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18 }}>
                          <div style={{ width: 52, height: 52, borderRadius: 14, background: `${m.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.375rem', flexShrink: 0 }}>{m.icon}</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: m.color, fontWeight: 600 }}>{m.step}</span>
                              <h4 style={{ fontWeight: 700 }}>{m.title}</h4>
                              <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--secondary)' }}>{expandedMethod === i ? '▲' : '▼'}</span>
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
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.3 }}>正在做<br />的事</h3>
                  </div>
                  <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {currentWork.map((item, i) => (
                      <div key={i} className="card" style={{ display: 'flex', gap: 20, alignItems: 'flex-start', cursor: 'default', transitionDelay: `${i * 0.1}s` }}>
                        <div style={{ width: 4, alignSelf: 'stretch', borderRadius: 2, background: item.color, flexShrink: 0 }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                            <span style={{ fontSize: '0.6875rem', fontWeight: 600, padding: '3px 10px', borderRadius: 99, background: `${item.color}18`, color: item.color, letterSpacing: '0.05em' }}>{item.tag}</span>
                            <h4 style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{item.title}</h4>
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
                        <p style={{ fontSize: '0.8125rem', color: 'var(--secondary)' }}>海外流媒体运营</p>
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
                        <p style={{ fontSize: '0.8125rem', color: 'var(--secondary)' }}>用 AI 工具构建产品</p>
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
                    { icon: <svg width="28" height="28" viewBox="0 0 98 96" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" /></svg>, title: 'GitHub', subtitle: 'zhuxinyao99-jpg', link: 'https://github.com/zhuxinyao99-jpg', external: true },
                    { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>, title: 'Email', subtitle: 'zxy200204@126.com', link: 'mailto:zxy200204@126.com', external: false },
                    { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>, title: 'Gmail', subtitle: 'zhuxinyao99@gmail.com', link: 'mailto:zhuxinyao99@gmail.com', external: false },
                    { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>, title: 'Telegram', subtitle: '@ericlibro', link: 'https://t.me/ericlibro', external: true },
                  ].map((c, i) => (
                    <a key={i} href={c.link} target={c.external ? '_blank' : undefined} rel={c.external ? 'noopener noreferrer' : undefined}
                      className="card card-interactive reveal"
                      style={{ padding: '18px 24px', textDecoration: 'none', transitionDelay: `${i * 0.08}s`, display: 'flex', alignItems: 'center', gap: 18 }}>
                      <div style={{ width: 52, height: 52, borderRadius: 14, background: 'var(--accent-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', flexShrink: 0 }}>{c.icon}</div>
                      <div style={{ textAlign: 'left', flex: 1 }}>
                        <p style={{ fontWeight: 600, marginBottom: 2 }}>{c.title}</p>
                        <p style={{ fontSize: '0.875rem', color: 'var(--secondary)' }}>{c.subtitle}</p>
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

          <Footer />

          <style>{`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes avatarIn {
              from { opacity: 0; transform: scale(0.85) translateY(10px); }
              to   { opacity: 1; transform: scale(1) translateY(0); }
            }
          `}</style>
        </div>
      )}
    </>
  )
}
