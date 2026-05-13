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

/* ── Q-version chibi avatar — single unified SVG coordinate space ── */
// Layout: big head (r≈42) centered at (100,76), tiny body below at y=136
// All drawn as one component so head and body share the same coordinate system
function EricAvatar() {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 50)
    return () => clearInterval(t)
  }, [])

  // 720-tick cycle (~36s): reading → coding → badminton
  const CYCLE = 720
  const prog = (tick % CYCLE) / CYCLE
  const ss = (a, b, x) => { const t = Math.max(0, Math.min(1, (x-a)/(b-a))); return t*t*(3-2*t) }

  const readW = prog < 0.31 ? 1 : 1 - ss(0.31, 0.37, prog)
  const codeW = ss(0.31, 0.37, prog) - ss(0.64, 0.70, prog)
  const badW  = ss(0.64, 0.70, prog) - (prog > 0.96 ? ss(0.96, 1.0, prog) : 0)

  const T = tick * 0.08
  const breathY  = Math.sin(T) * 2.0
  const nod      = readW > 0.5 ? Math.sin(T * 0.6) * 2 : 0
  const pageFlip = Math.sin(T * 1.1) * 2.2
  const typeTick = Math.floor(tick / 14) % 2
  const bounce   = badW > 0.1 ? Math.abs(Math.sin(T * 2.0)) * 5 : 0
  const armSwing = Math.sin(T * 1.5) * 8
  const legSwing = Math.sin(T * 2.0) * 16
  const shuttleX = Math.sin(T * 1.2) * 9
  const shuttleY = Math.cos(T * 0.95) * 7

  // Coordinate constants — everything derived from these
  const HX = 100, HY = 76         // head center
  const BY = 138                   // body top (neck joins here)
  const BH = 46                    // body height
  const BW = 36                    // body half-width
  const LLX = 89, LRX = 111       // leg top x (left/right)
  const LY  = BY + BH              // leg top y

  // Reading: head bobs down slightly
  const eyeDropY = readW > 0.45 ? 3 : 0
  const eyeSquish = readW > 0.45 ? 0.65 : 1.0

  return (
    <div className="animate-in" style={{ flexShrink: 0, userSelect: 'none' }}>
      <svg width="200" height="280" viewBox="0 0 200 280" fill="none"
        style={{ filter: 'drop-shadow(0 14px 36px rgba(30,40,100,0.16)) drop-shadow(0 2px 6px rgba(0,0,0,0.09))' }}>
        <defs>
          <radialGradient id="qSkin" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#FFE4C8" />
            <stop offset="70%" stopColor="#FCCFA8" />
            <stop offset="100%" stopColor="#F0B98A" />
          </radialGradient>
          <radialGradient id="qHair" cx="38%" cy="28%" r="62%">
            <stop offset="0%" stopColor="#6A5A4A" />
            <stop offset="50%" stopColor="#4A3C2E" />
            <stop offset="100%" stopColor="#2E2418" />
          </radialGradient>
          <linearGradient id="qJacket" x1="0%" y1="0%" x2="60%" y2="100%">
            <stop offset="0%" stopColor="#3054A0" />
            <stop offset="100%" stopColor="#182C68" />
          </linearGradient>
          <linearGradient id="qJeans" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4A4A5E" />
            <stop offset="100%" stopColor="#2C2C3A" />
          </linearGradient>
          <linearGradient id="qShoe" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3058B0" />
            <stop offset="100%" stopColor="#1A2E70" />
          </linearGradient>
          <radialGradient id="qBlush" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F9907A" stopOpacity="0.52" />
            <stop offset="100%" stopColor="#F9907A" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ground shadow */}
        <ellipse cx="100" cy="274" rx={38 + badW * 8} ry="5" fill="rgba(0,0,0,0.08)" />

        {/* ── DESK behind character (reading scene) ── */}
        {readW > 0.02 && (
          <g opacity={readW} transform={`translate(${(1-readW)*-55}, 0)`}>
            <rect x="28" y={BY+BH+10} width="144" height="9" rx="4" fill="#C8A070" />
            <rect x="28" y={BY+BH+10} width="144" height="4" rx="3" fill="#DEB888" />
            <rect x="36" y={BY+BH+19} width="7" height="42" rx="3" fill="#A87848" />
            <rect x="157" y={BY+BH+19} width="7" height="42" rx="3" fill="#A87848" />
          </g>
        )}

        {/* ── ALL CHARACTER PARTS — single breathing group ── */}
        <g transform={`translate(0, ${breathY + bounce})`}>

          {/* == LEGS (drawn behind body) == */}
          {badW > 0.08 ? (
            // running legs
            <>
              <path d={`M${LLX} ${LY} Q${LLX-3+legSwing} ${LY+22} ${LLX-2+legSwing*1.1} ${LY+46}`}
                stroke="url(#qJeans)" strokeWidth="18" strokeLinecap="round" fill="none" />
              <path d={`M${LRX} ${LY} Q${LRX+3-legSwing} ${LY+22} ${LRX+2-legSwing*1.1} ${LY+46}`}
                stroke="url(#qJeans)" strokeWidth="18" strokeLinecap="round" fill="none" />
              <ellipse cx={LLX-2+legSwing*1.1} cy={LY+51} rx="13" ry="6" fill="url(#qShoe)" />
              <ellipse cx={LLX-2+legSwing*1.1} cy={LY+53} rx="13" ry="3" fill="#0F1C50" />
              <ellipse cx={LRX+2-legSwing*1.1} cy={LY+51} rx="13" ry="6" fill="url(#qShoe)" />
              <ellipse cx={LRX+2-legSwing*1.1} cy={LY+53} rx="13" ry="3" fill="#0F1C50" />
            </>
          ) : (
            // standing legs
            <>
              <path d={`M${LLX} ${LY} Q${LLX-2} ${LY+22} ${LLX-2} ${LY+46}`}
                stroke="url(#qJeans)" strokeWidth="18" strokeLinecap="round" fill="none" />
              <path d={`M${LRX} ${LY} Q${LRX+2} ${LY+22} ${LRX+2} ${LY+46}`}
                stroke="url(#qJeans)" strokeWidth="18" strokeLinecap="round" fill="none" />
              <rect x={LLX-11} y={LY+42} width="22" height="7" rx="3" fill="#52526A" />
              <rect x={LRX-11} y={LY+42} width="22" height="7" rx="3" fill="#52526A" />
              <ellipse cx={LLX-2} cy={LY+52} rx="13" ry="5.5" fill="url(#qShoe)" />
              <ellipse cx={LLX-2} cy={LY+54} rx="13" ry="3" fill="#0F1C50" />
              <ellipse cx={LRX+2} cy={LY+52} rx="13" ry="5.5" fill="url(#qShoe)" />
              <ellipse cx={LRX+2} cy={LY+54} rx="13" ry="3" fill="#0F1C50" />
            </>
          )}

          {/* == BODY (jacket) == */}
          {/* collar strip */}
          <rect x={HX-10} y={BY-2} width="20" height="10" rx="4" fill="#EEEAE2" />
          {/* jacket shape */}
          <path d={`M${HX-BW} ${BY+8} Q${HX-BW-5} ${BY+BH*0.55} ${HX-BW+2} ${BY+BH} Q${HX-8} ${BY+BH+7} ${HX} ${BY+BH+5} Q${HX+8} ${BY+BH+7} ${HX+BW-2} ${BY+BH} Q${HX+BW+5} ${BY+BH*0.55} ${HX+BW} ${BY+8} Q${HX+14} ${BY} ${HX} ${BY-2} Q${HX-14} ${BY} ${HX-BW} ${BY+8} Z`}
            fill="url(#qJacket)" />
          {/* jacket left shadow */}
          <path d={`M${HX-BW} ${BY+8} Q${HX-BW-5} ${BY+BH*0.55} ${HX-BW+2} ${BY+BH} Q${HX-8} ${BY+BH+7} ${HX} ${BY+BH+5} L${HX} ${BY-2} Q${HX-14} ${BY} ${HX-BW} ${BY+8} Z`}
            fill="#0F1E52" opacity="0.2" />
          {/* collar V-notch */}
          <path d={`M${HX-8} ${BY} L${HX-2} ${BY+14} L${HX} ${BY+8} L${HX} ${BY-2}`} fill="#EEEAE2" />
          <path d={`M${HX+8} ${BY} L${HX+2} ${BY+14} L${HX} ${BY+8} L${HX} ${BY-2}`} fill="#EEEAE2" />
          {/* buttons */}
          {[BY+18, BY+30, BY+42].map(y => (
            <circle key={y} cx={HX} cy={y} r="1.6" fill="#1A2860" />
          ))}

          {/* == ARMS == */}
          {/* left arm */}
          {badW > 0.08 ? (
            <path d={`M${HX-BW} ${BY+10} Q${HX-BW-9+armSwing*0.3} ${BY+28} ${HX-BW-13+armSwing*0.5} ${BY+50}`}
              stroke="#1E3478" strokeWidth="16" strokeLinecap="round" fill="none" />
          ) : (
            <path d={`M${HX-BW} ${BY+10} Q${HX-BW-8} ${BY+36} ${HX-BW-7} ${BY+58}`}
              stroke="#1E3478" strokeWidth="16" strokeLinecap="round" fill="none" />
          )}
          {/* left hand */}
          <circle
            cx={badW > 0.08 ? HX-BW-13+armSwing*0.5 : HX-BW-7}
            cy={badW > 0.08 ? BY+52 : BY+60}
            r="7" fill="url(#qSkin)" />

          {/* right arm */}
          {badW > 0.08 ? (
            <path d={`M${HX+BW} ${BY+10} Q${HX+BW+8-armSwing*0.2} ${BY+4-armSwing*1.0} ${HX+BW+14-armSwing*0.3} ${BY-16-armSwing*2.2}`}
              stroke="#1E3478" strokeWidth="16" strokeLinecap="round" fill="none" />
          ) : (
            <path d={`M${HX+BW} ${BY+10} Q${HX+BW+8} ${BY+36} ${HX+BW+7} ${BY+58}`}
              stroke="#1E3478" strokeWidth="16" strokeLinecap="round" fill="none" />
          )}
          {/* right hand */}
          <circle
            cx={badW > 0.08 ? HX+BW+14-armSwing*0.3 : HX+BW+7}
            cy={badW > 0.08 ? BY-14-armSwing*2.2 : BY+60}
            r="7" fill="url(#qSkin)" />

          {/* == PROPS == */}

          {/* Book held in arms (reading) */}
          {readW > 0.05 && (
            <g opacity={readW} transform={`translate(${pageFlip * 0.5}, 0)`}>
              <rect x={HX-27} y={BY+48} width="54" height="36" rx="5" fill="#4338CA" />
              <rect x={HX-27} y={BY+48} width="25" height="36" rx="5" fill="#6D65F5" />
              <line x1={HX-2} y1={BY+48} x2={HX-2} y2={BY+84} stroke="#3730A3" strokeWidth="2" />
              {[BY+57, BY+65, BY+73, BY+81].map(y => (
                <line key={y} x1={HX-24} y1={y} x2={HX-5} y2={y} stroke="rgba(255,255,255,0.25)" strokeWidth="0.9" />
              ))}
              <rect x={HX-27} y={BY+48} width="3" height="36" rx="1.5" fill="rgba(255,255,255,0.2)" />
            </g>
          )}

          {/* Laptop on lap (coding) */}
          {codeW > 0.05 && (
            <g opacity={codeW}>
              <rect x={HX-40} y={BY+BH+4} width="80" height="7" rx="3" fill="#2E3A4A" />
              <rect x={HX-34} y={BY+BH-30} width="68" height="36" rx="5" fill="#1A2535" />
              <rect x={HX-30} y={BY+BH-26} width="60" height="24" rx="3" fill="#0A1220" />
              <text x={HX-26} y={BY+BH-14} fontSize="5" fill="#A78BFA" fontFamily="monospace">{'const build = (idea) =>'}</text>
              <text x={HX-26} y={BY+BH-6} fontSize="5" fill="#6EE7B7" fontFamily="monospace">{'  return ship(idea)'}</text>
              <text x={HX-26} y={BY+BH+2} fontSize="5" fill="#FDE68A" fontFamily="monospace">{'}'}</text>
              <rect x={HX+10} y={BY+BH-8} width="2" height="5" fill={typeTick ? '#A78BFA' : 'transparent'} />
            </g>
          )}

          {/* Racket + shuttlecock (badminton) */}
          {badW > 0.05 && (
            <g opacity={badW}>
              {/* headband arc over hair */}
              <path d={`M${HX-28} ${HY-22} Q${HX} ${HY-50} ${HX+28} ${HY-22}`}
                stroke="#FF6B35" strokeWidth="7" strokeLinecap="round" fill="none" />
              {/* racket on raised right arm */}
              <g transform={`rotate(${-38 - armSwing * 1.2}, ${HX+BW+14-armSwing*0.3}, ${BY-14-armSwing*2.2})`}>
                <rect x={HX+BW+11-armSwing*0.3} y={BY-40-armSwing*2.2} width="5" height="24" rx="2.5" fill="#FF6B35" />
                <ellipse cx={HX+BW+13-armSwing*0.3} cy={BY-58-armSwing*2.2} rx="14" ry="18" fill="none" stroke="#D06030" strokeWidth="2.5" />
                {[-8,-2,4].map(x => (
                  <line key={x}
                    x1={HX+BW+13+x-armSwing*0.3} y1={BY-76-armSwing*2.2}
                    x2={HX+BW+13+x-armSwing*0.3} y2={BY-40-armSwing*2.2}
                    stroke="#D06030" strokeWidth="0.8" opacity="0.5" />
                ))}
                {[-10,-3,4,11].map(dy => (
                  <line key={dy}
                    x1={HX+BW-1-armSwing*0.3} y1={BY-58+dy-armSwing*2.2}
                    x2={HX+BW+27-armSwing*0.3} y2={BY-58+dy-armSwing*2.2}
                    stroke="#D06030" strokeWidth="0.8" opacity="0.5" />
                ))}
              </g>
              {/* shuttlecock */}
              <g transform={`translate(${HX+54+shuttleX}, ${HY-28+shuttleY})`}>
                <ellipse cx="0" cy="0" rx="5" ry="4" fill="white" stroke="#CCC" strokeWidth="1" />
                <path d="M0 -4 L-7 -18 M0 -4 L0 -20 M0 -4 L7 -18" stroke="#DDD" strokeWidth="1.3" strokeLinecap="round" />
              </g>
            </g>
          )}

          {/* == HEAD (big Q-version, drawn on top of everything) == */}
          <g transform={`translate(0, ${nod})`}>
            {/* neck */}
            <rect x={HX-7} y={HY+38} width="14" height="14" rx="5" fill="url(#qSkin)" />

            {/* back hair (behind head) */}
            <ellipse cx={HX} cy={HY-4} rx="44" ry="30" fill="#2E2418" />
            <ellipse cx={HX-38} cy={HY+8} rx="10" ry="20" fill="#2E2418" />
            <ellipse cx={HX+38} cy={HY+8} rx="10" ry="20" fill="#2E2418" />

            {/* head */}
            <ellipse cx={HX} cy={HY} rx="40" ry="44" fill="url(#qSkin)" />

            {/* cheeks */}
            <ellipse cx={HX-27} cy={HY+15} rx="11" ry="8" fill="url(#qBlush)" />
            <ellipse cx={HX+27} cy={HY+15} rx="11" ry="8" fill="url(#qBlush)" />

            {/* nose */}
            <ellipse cx={HX} cy={HY+17} rx="3" ry="2.2" fill="#E8AE88" opacity="0.65" />

            {/* hair cap on top */}
            <ellipse cx={HX} cy={HY-20} rx="37" ry="24" fill="url(#qHair)" />
            {/* messy tufts */}
            <path d={`M${HX-6} ${HY-40} Q${HX} ${HY-60} ${HX+6} ${HY-40}`} fill="url(#qHair)" />
            <path d={`M${HX-20} ${HY-38} Q${HX-28} ${HY-56} ${HX-12} ${HY-36}`} fill="url(#qHair)" />
            <path d={`M${HX+12} ${HY-38} Q${HX+28} ${HY-56} ${HX+20} ${HY-36}`} fill="url(#qHair)" />
            <path d={`M${HX-30} ${HY-28} Q${HX-44} ${HY-44} ${HX-24} ${HY-24}`} fill="url(#qHair)" />
            <path d={`M${HX+24} ${HY-28} Q${HX+44} ${HY-44} ${HX+30} ${HY-24}`} fill="url(#qHair)" />
            {/* hair highlight */}
            <ellipse cx={HX-10} cy={HY-30} rx="11" ry="5" fill="#8A7860" opacity="0.32" />

            {/* ears */}
            <ellipse cx={HX-40} cy={HY+6} rx="7" ry="9" fill="url(#qSkin)" />
            <ellipse cx={HX-39} cy={HY+6} rx="4.5" ry="6.5" fill="#EFC4A0" />
            <ellipse cx={HX+40} cy={HY+6} rx="7" ry="9" fill="url(#qSkin)" />
            <ellipse cx={HX+39} cy={HY+6} rx="4.5" ry="6.5" fill="#EFC4A0" />

            {/* eyebrows */}
            {badW > 0.35 ? (
              <>
                <path d={`M${HX-22} ${HY-12} Q${HX-14} ${HY-19} ${HX-6} ${HY-12}`} stroke="#3A2C1E" strokeWidth="2.8" strokeLinecap="round" fill="none" />
                <path d={`M${HX+6} ${HY-12} Q${HX+14} ${HY-19} ${HX+22} ${HY-12}`} stroke="#3A2C1E" strokeWidth="2.8" strokeLinecap="round" fill="none" />
              </>
            ) : (
              <>
                <path d={`M${HX-22} ${HY-14} Q${HX-14} ${HY-21} ${HX-6} ${HY-14}`} stroke="#3A2C1E" strokeWidth="2.4" strokeLinecap="round" fill="none" />
                <path d={`M${HX+6} ${HY-14} Q${HX+14} ${HY-21} ${HX+22} ${HY-14}`} stroke="#3A2C1E" strokeWidth="2.4" strokeLinecap="round" fill="none" />
              </>
            )}

            {/* glasses — chunky round chibi frames */}
            <circle cx={HX-14} cy={HY-2} r="12" fill="rgba(180,220,255,0.07)" stroke="#1A1828" strokeWidth="2.6" />
            <circle cx={HX+14} cy={HY-2} r="12" fill="rgba(180,220,255,0.07)" stroke="#1A1828" strokeWidth="2.6" />
            <path d={`M${HX-2} ${HY-2} Q${HX} ${HY-4} ${HX+2} ${HY-2}`} stroke="#1A1828" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <line x1={HX-40} y1={HY-4} x2={HX-26} y2={HY-2} stroke="#1A1828" strokeWidth="2" strokeLinecap="round" />
            <line x1={HX+40} y1={HY-4} x2={HX+26} y2={HY-2} stroke="#1A1828" strokeWidth="2" strokeLinecap="round" />
            <path d={`M${HX-22} ${HY-8} Q${HX-18} ${HY-12} ${HX-14} ${HY-8}`} stroke="rgba(255,255,255,0.7)" strokeWidth="1.4" strokeLinecap="round" fill="none" />
            <path d={`M${HX+6} ${HY-8} Q${HX+10} ${HY-12} ${HX+14} ${HY-8}`} stroke="rgba(255,255,255,0.7)" strokeWidth="1.4" strokeLinecap="round" fill="none" />

            {/* eyes */}
            {badW > 0.5 ? (
              <>
                <ellipse cx={HX-14} cy={HY-1} rx="5.5" ry="5.5" fill="#1E1608" />
                <ellipse cx={HX+14} cy={HY-1} rx="5.5" ry="5.5" fill="#1E1608" />
                <ellipse cx={HX-14} cy={HY-1} rx="3" ry="3" fill="#6B4C28" />
                <ellipse cx={HX+14} cy={HY-1} rx="3" ry="3" fill="#6B4C28" />
                <circle cx={HX-16} cy={HY-3} r="1.6" fill="white" />
                <circle cx={HX+12} cy={HY-3} r="1.6" fill="white" />
              </>
            ) : readW > 0.45 ? (
              <>
                <ellipse cx={HX-14} cy={HY-1+eyeDropY} rx="5" ry={3.5*eyeSquish+1.5} fill="#1E1608" />
                <ellipse cx={HX+14} cy={HY-1+eyeDropY} rx="5" ry={3.5*eyeSquish+1.5} fill="#1E1608" />
                <ellipse cx={HX-14} cy={HY-1+eyeDropY} rx="3" ry={2.2*eyeSquish+1} fill="#6B4C28" />
                <ellipse cx={HX+14} cy={HY-1+eyeDropY} rx="3" ry={2.2*eyeSquish+1} fill="#6B4C28" />
                <circle cx={HX-16} cy={HY-3+eyeDropY} r="1.3" fill="white" />
                <circle cx={HX+12} cy={HY-3+eyeDropY} r="1.3" fill="white" />
              </>
            ) : (
              <>
                <ellipse cx={HX-14} cy={HY-1} rx="5" ry="5.5" fill="#1E1608" />
                <ellipse cx={HX+14} cy={HY-1} rx="5" ry="5.5" fill="#1E1608" />
                <ellipse cx={HX-14} cy={HY-1} rx="3" ry="3.5" fill="#6B4C28" />
                <ellipse cx={HX+14} cy={HY-1} rx="3" ry="3.5" fill="#6B4C28" />
                <circle cx={HX-16} cy={HY-3} r="1.6" fill="white" />
                <circle cx={HX+12} cy={HY-3} r="1.6" fill="white" />
              </>
            )}

            {/* mouth */}
            {badW > 0.5
              ? <path d={`M${HX-10} ${HY+22} Q${HX} ${HY+34} ${HX+10} ${HY+22}`} stroke="#C07848" strokeWidth="2" strokeLinecap="round" fill="#F4A080" />
              : codeW > 0.4
              ? <path d={`M${HX-8} ${HY+22} Q${HX+4} ${HY+30} ${HX+10} ${HY+23}`} stroke="#C07848" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              : <path d={`M${HX-8} ${HY+22} Q${HX} ${HY+30} ${HX+8} ${HY+22}`} stroke="#C07848" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            }
          </g>
        </g>
      </svg>
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
