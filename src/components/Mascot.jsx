import { useState, useRef, useEffect, useCallback, useId } from 'react'

const tips = [
  "¡Hola! Soy Maracuyita 🌺 ¡Sabías que nuestras galletas tienen pulpa real de maracuyá maduro seleccionado a mano!",
  "🍯 Nuestro endulzante secreto es miel pura de abeja. ¡Nada de azúcar refinada!",
  "🌾 Usamos hojuelas integrales de avena que aportan 4.2g de fibra por porción. ¡Tu cuerpo te lo agradecerá!",
  "📦 ¿Tienes una bodega o minimarket? ¡Pregunta por nuestros packs mayoristas B2B!",
  "🚀 ANAVU significa: Avena + Natural + Vida + Único. ¡Cada letra cuenta una historia!",
  "💛 Nuestras galletas tienen 0g de grasas trans. ¡Snack saludable y delicioso!",
  "🌿 Cada paquete individual contiene 6 galletas crujientes de 60g total.",
]

const stickers = [
  { emoji: '💛', label: '100% Tropical' },
  { emoji: '🔥', label: 'Recién Horneado' },
  { emoji: '🌾', label: 'Avena & Miel' },
  { emoji: '✨', label: 'Crocante' },
]

// Apertura de boca (0 = sonrisa cerrada, 1 = abierta) según la vocal dominante de la sílaba,
// con algo de variación para no sonar robótico
const openFor = (syllable) => {
  const base = /[aá]/i.test(syllable) ? 1 : /[eéoó]/i.test(syllable) ? 0.65 : 0.38
  return base * (0.8 + Math.random() * 0.25)
}
const MOUTH_REST = 0.14 // entre sílabas de una misma palabra no cierra del todo

const syllablesOf = (word) => word.match(/[aeiouáéíóúü]+/gi) || []

// Duración de una palabra: ~110ms por sílaba + pausa en puntuación
const wordTiming = (word) => {
  const syl = Math.max(1, syllablesOf(word).length)
  const speak = 70 + syl * 110
  const pause = /[.!?]$/.test(word) ? 380 : /[,:;]$/.test(word) ? 220 : 40
  return { speak, pause }
}

// Posiciones en % sobre el render de 600x600
const px = (x, y, w, h) => ({ left: `${x / 6}%`, top: `${y / 6}%`, width: `${w / 6}%`, height: `${h / 6}%` })

// Geometría de la boca en coordenadas del render (600x600), anclada a la sonrisa original
const SMILE_L = [256, 325]
const SMILE_R = [362, 321]
const MOUTH_X = 309

function mouthGeometry(o) {
  const pinch = 4 * o
  const l = [SMILE_L[0] + pinch, SMILE_L[1] - 1.5 * o]
  const r = [SMILE_R[0] - pinch, SMILE_R[1] - 1.5 * o]
  const upC = 345.5 - 6 * o // labio superior: sigue la sonrisa y se aplana un poco
  const depth = 46 * o // cuánto baja el labio inferior en el centro
  const loC = 345.5 + depth * 1.33
  const teethH = 7 * o
  const up = `M${l} C${l[0] + 22},${upC} ${r[0] - 22},${upC} ${r}`
  const lowCurve = `C${r[0] - 12},${loC} ${l[0] + 12},${loC} ${l}`
  return {
    up,
    shape: `${up} ${lowCurve} Z`,
    low: `M${r} ${lowCurve}`,
    teeth: `${up} L${r[0]},${r[1] + teethH} C${r[0] - 22},${upC + teethH} ${l[0] + 22},${upC + teethH} ${l[0]},${l[1] + teethH} Z`,
    teethH,
    lowMid: 340 - 4.5 * o + depth,
  }
}

// Boca vectorial: sigue el objetivo de apertura con suavizado (sin re-render de React por frame)
function MaracuyitaMouth({ target, jawRef }) {
  const id = useId().replace(/:/g, '')
  const targetRef = useRef(target)
  const refs = useRef({})
  const set = (key) => (el) => {
    refs.current[key] = el
  }

  useEffect(() => {
    targetRef.current = target
  }, [target])

  useEffect(() => {
    let raf
    let last = null
    let o = 0
    const tick = (now) => {
      const dt = last === null ? 16 : Math.min(64, now - last)
      last = now
      const t = targetRef.current
      const tau = t > o ? 38 : 55 // abre un poco más rápido de lo que cierra
      o += (t - o) * (1 - Math.exp(-dt / tau))
      if (Math.abs(t - o) < 0.002) o = t

      const R = refs.current
      const open = o > 0.02
      R.group.style.display = open ? '' : 'none'
      if (open) {
        const g = mouthGeometry(o)
        R.clip.setAttribute('d', g.shape)
        R.cavity.setAttribute('d', g.shape)
        R.outline.setAttribute('d', g.shape)
        R.shadow.setAttribute('d', g.low)
        R.shine.setAttribute('d', g.low)
        R.teeth.setAttribute('d', g.teeth)
        R.teethShadow.setAttribute('d', g.up)
        R.teethShadow.setAttribute('transform', `translate(0,${g.teethH + 2})`)
        R.tongue.setAttribute('cy', g.lowMid + 2)
        R.tongue.setAttribute('rx', 24 + 14 * o)
        R.tongue.setAttribute('ry', 8 + 12 * o)
        R.tongueShine.setAttribute('cy', g.lowMid - 8 * o)
        R.tongueShine.setAttribute('rx', 10 + 6 * o)
        R.tongueShine.setAttribute('ry', 3 + 2 * o)
      }
      if (jawRef.current) jawRef.current.style.setProperty('--jaw', o.toFixed(3))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [jawRef])

  const blurRegion = { filterUnits: 'userSpaceOnUse', x: 200, y: 280, width: 220, height: 160 }
  return (
    <svg viewBox="0 0 600 600" className="absolute inset-0 w-full h-full pointer-events-none z-[1]" aria-hidden="true">
      <defs>
        <linearGradient id={`cav${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a0604" />
          <stop offset=".6" stopColor="#5e1510" />
          <stop offset="1" stopColor="#7a2216" />
        </linearGradient>
        <radialGradient id={`tng${id}`} cx="50%" cy="25%" r="75%">
          <stop offset="0" stopColor="#ff9aa0" />
          <stop offset="1" stopColor="#d0505c" />
        </radialGradient>
        <clipPath id={`clip${id}`}>
          <path ref={set('clip')} />
        </clipPath>
        <filter id={`soft${id}`} {...blurRegion}>
          <feGaussianBlur stdDeviation="0.5" />
        </filter>
        <filter id={`b2${id}`} {...blurRegion}>
          <feGaussianBlur stdDeviation="2" />
        </filter>
        <filter id={`b4${id}`} {...blurRegion}>
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>
      <g ref={set('group')} style={{ display: 'none' }}>
        {/* Sombra suave bajo el labio inferior */}
        <path ref={set('shadow')} transform="translate(0,5)" fill="none" stroke="#9a5410" strokeOpacity=".35" strokeWidth="7" strokeLinecap="round" filter={`url(#b4${id})`} />
        <path ref={set('cavity')} fill={`url(#cav${id})`} />
        <g clipPath={`url(#clip${id})`}>
          <ellipse ref={set('tongue')} cx={MOUTH_X} fill={`url(#tng${id})`} />
          <ellipse ref={set('tongueShine')} cx={MOUTH_X} fill="#ffc7c9" opacity=".45" filter={`url(#b2${id})`} />
          <path ref={set('teeth')} fill="#f6eddc" />
          <path ref={set('teethShadow')} fill="none" stroke="#2a0604" strokeOpacity=".45" strokeWidth="4" filter={`url(#b2${id})`} />
        </g>
        {/* Brillo del labio inferior */}
        <path ref={set('shine')} transform="translate(0,3)" fill="none" stroke="#fff1b8" strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" filter={`url(#soft${id})`} />
        <path ref={set('outline')} fill="none" stroke="#5a1400" strokeWidth="3" strokeLinejoin="round" filter={`url(#soft${id})`} />
      </g>
    </svg>
  )
}

function MaracuyitaAvatar({ mouthOpen, blinking, speaking, arm, waveId }) {
  const jawRef = useRef(null)
  return (
    <div className={`absolute inset-0 mascot-body ${speaking ? 'is-speaking' : ''}`}>
      <div ref={jawRef} className="absolute inset-0 mascot-jaw">
        <img
          src="/images/maracuyita/base.webp"
          alt="Maracuyita - Mascota oficial de Anávu"
          draggable="false"
          className="absolute inset-0 w-full h-full object-cover select-none"
        />
        <MaracuyitaMouth target={mouthOpen} jawRef={jawRef} />
        {/* Brazo como capa propia: rota desde el hombro, por detrás del borde del cuerpo */}
        <img
          key={waveId}
          src="/images/maracuyita/arm.webp"
          alt=""
          aria-hidden="true"
          draggable="false"
          className={`absolute select-none pointer-events-none mascot-arm arm-${arm}`}
          style={px(434, 231, 103, 119)}
        />
        <img
          src="/images/maracuyita/body-edge.webp"
          alt=""
          aria-hidden="true"
          draggable="false"
          className="absolute select-none pointer-events-none"
          style={px(430, 200, 40, 185)}
        />
        <img
          src="/images/maracuyita/blink.webp"
          alt=""
          aria-hidden="true"
          draggable="false"
          className="absolute select-none pointer-events-none z-[4]"
          style={{ ...px(190, 215, 230, 100), opacity: blinking ? 1 : 0 }}
        />
      </div>
    </div>
  )
}

export default function Mascot() {
  const [tipIndex, setTipIndex] = useState(0)
  const [displayedWords, setDisplayedWords] = useState(1)
  const [collected, setCollected] = useState([])
  const [mouthOpen, setMouthOpen] = useState(0)
  const [blinking, setBlinking] = useState(false)
  const [visible, setVisible] = useState(false)
  const [waving, setWaving] = useState(false)
  const [waveId, setWaveId] = useState(0)
  const sectionRef = useRef(null)
  const waveTimer = useRef(null)

  const currentWords = tips[tipIndex].split(' ')
  const speaking = displayedWords < currentWords.length

  // Saludo con la mano (se reinicia la animación con waveId)
  const wave = useCallback(() => {
    clearTimeout(waveTimer.current)
    setWaveId((id) => id + 1)
    setWaving(true)
    waveTimer.current = setTimeout(() => setWaving(false), 1900)
  }, [])

  useEffect(() => () => clearTimeout(waveTimer.current), [])

  // Solo habla cuando la sección está en pantalla
  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting)
        if (entry.isIntersecting) wave() // saluda al aparecer en pantalla
      },
      { threshold: 0.25 }
    )
    if (sectionRef.current) io.observe(sectionRef.current)
    return () => io.disconnect()
  }, [wave])

  // Palabra por palabra, con la boca sincronizada por sílaba
  useEffect(() => {
    const timers = []
    const at = (ms, fn) => timers.push(setTimeout(fn, ms))
    if (!visible) {
      at(0, () => setMouthOpen(0))
      return () => timers.forEach(clearTimeout)
    }

    const words = tips[tipIndex].split(' ')
    const word = words[displayedWords - 1]
    const { speak, pause } = wordTiming(word)
    const syl = syllablesOf(word)

    if (syl.length) {
      const step = speak / syl.length
      syl.forEach((s, i) => {
        at(i * step, () => setMouthOpen(openFor(s)))
        // Entre palabras seguidas la boca no siempre cierra del todo (coarticulación)
        const last = i === syl.length - 1
        const rest = last && (pause > 40 || Math.random() < 0.5) ? 0 : MOUTH_REST
        at(i * step + step * 0.65, () => setMouthOpen(rest))
      })
    } else {
      at(0, () => setMouthOpen(0))
    }

    if (displayedWords < words.length) {
      at(speak + pause, () => setDisplayedWords((prev) => prev + 1))
    } else {
      // Frase completa: tiempo de lectura y siguiente tip
      at(speak + 150, wave)
      at(speak + 3500, () => {
        setTipIndex((prev) => (prev + 1) % tips.length)
        setDisplayedWords(1)
      })
    }
    return () => timers.forEach(clearTimeout)
  }, [displayedWords, tipIndex, visible, wave])

  // Parpadeo aleatorio (a veces doble)
  useEffect(() => {
    let timer
    const blink = (thenDouble) => {
      setBlinking(true)
      timer = setTimeout(() => {
        setBlinking(false)
        timer = thenDouble ? setTimeout(() => blink(false), 160) : schedule()
      }, 110)
    }
    const schedule = () => (timer = setTimeout(() => blink(Math.random() < 0.2), 2200 + Math.random() * 3800))
    schedule()
    return () => clearTimeout(timer)
  }, [])

  const nextTip = () => {
    setTipIndex((prev) => (prev + 1) % tips.length)
    setDisplayedWords(1)
  }

  const collectSticker = (label) => {
    if (!collected.includes(label)) {
      setCollected([...collected, label])
    }
  }

  return (
    <section id="maracuyita" ref={sectionRef} className="py-20 border-b border-anavu-yellow/30 bg-gradient-to-br from-anavu-yellow/20 via-anavu-cream to-anavu-lightyellow/10 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-anavu-lushgreen/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Mascot Column */}
          <div className="lg:col-span-5 flex flex-col items-center text-center space-y-6 animate-fade-in-up">
            {/* Speech Bubble with Word-by-Word Animation */}
            <div className="w-full max-w-sm flex flex-col items-center">
              <div
                className="glass px-6 py-5 rounded-3xl shadow-lg relative w-full border-2 border-anavu-green transition-all"
                style={{ minHeight: '88px' }}
              >
                {/* Todas las palabras se renderizan desde el inicio para que el globo no cambie de tamaño */}
                <p key={tipIndex} className="text-xs sm:text-sm font-bold text-anavu-green leading-relaxed text-left" aria-live="polite">
                  {currentWords.map((word, idx) => (
                    <span
                      key={idx}
                      className={`inline-block mr-1 ${idx < displayedWords ? 'animate-word-in' : 'opacity-0'}`}
                    >
                      {word}
                    </span>
                  ))}
                </p>
                <div className="w-4 h-4 bg-white border-r-2 border-b-2 border-anavu-green transform rotate-45 absolute -bottom-2 left-1/2 -translate-x-1/2"></div>
              </div>

              {/* Progress Dots for Tips */}
              <div className="flex items-center justify-center gap-1.5 mt-3">
                {tips.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setTipIndex(i)
                      setDisplayedWords(1)
                    }}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      i === tipIndex
                        ? 'w-6 bg-anavu-green'
                        : 'w-1.5 bg-anavu-green/30 hover:bg-anavu-yellow'
                    }`}
                    title={`Ver tip ${i + 1}`}
                    aria-label={`Ver tip ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Mascot Character with Constant Talking & Waving Loop */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => {
                  nextTip()
                  wave()
                }}
                onMouseEnter={() => !waving && wave()}
                className="w-56 h-56 sm:w-64 sm:h-64 rounded-full border-4 border-anavu-green overflow-hidden shadow-2xl hover:scale-[1.03] active:scale-95 transition-transform duration-300 relative group cursor-pointer bg-[#F8DF97]"
                title="¡Haz clic en Maracuyita para saltar al siguiente tip!"
              >
                <MaracuyitaAvatar
                  mouthOpen={mouthOpen}
                  blinking={blinking}
                  speaking={speaking && visible}
                  arm={waving ? 'wave' : speaking && visible ? 'talk' : 'idle'}
                  waveId={waveId}
                />

                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-anavu-green text-anavu-yellow font-extrabold text-[10px] sm:text-xs px-3 py-1 rounded-full shadow-lg border border-anavu-yellow flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full bg-anavu-yellow ${speaking ? 'animate-pulse' : ''}`}></span>
                  {speaking ? 'Hablando…' : '¡Saludando!'}
                </span>
              </button>

              <div className="text-center mt-3">
                <p className="text-2xl text-anavu-green" style={{ fontFamily: 'Shrikhand, cursive' }}>
                  Maracuyita
                </p>
                <span className="text-[10px] font-extrabold text-anavu-brown uppercase tracking-widest bg-white/80 px-3 py-1 rounded-full border border-anavu-yellow/40 inline-flex items-center gap-1">
                  <span>👋</span> Mascota Oficial • ¡Haz clic para pasar tip!
                </span>
              </div>
            </div>
          </div>

          {/* Sticker Collection */}
          <div className="lg:col-span-7 glass p-8 rounded-3xl border-2 border-anavu-yellow shadow-xl space-y-6 animate-fade-in-up stagger-2">
            <div className="space-y-2">
              <span className="text-xs font-extrabold text-anavu-brown uppercase tracking-widest">Colección Digital</span>
              <h3 className="text-3xl text-anavu-green" style={{ fontFamily: 'Shrikhand, cursive' }}>Set de Stickers Maracuyita</h3>
              <p className="text-xs sm:text-sm text-anavu-darkgreen/70">
                Colecciona los stickers adhesivos que vienen incluidos gratis en tus compras por pack o regalos corporativos. ¡Haz clic para coleccionar! ({collected.length}/{stickers.length})
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stickers.map((s, i) => {
                const isCollected = collected.includes(s.label)
                return (
                  <div
                    key={i}
                    onClick={() => collectSticker(s.label)}
                    className={`p-4 rounded-2xl text-center space-y-2 cursor-pointer transition-all shadow-sm border-2 hover:scale-105 active:scale-95 ${
                      isCollected
                        ? 'bg-anavu-green border-anavu-yellow text-anavu-cream'
                        : 'bg-anavu-cream border-anavu-yellow hover:border-anavu-green'
                    }`}
                  >
                    <span className="text-3xl block">{s.emoji}</span>
                    <p className={`text-xs font-bold ${isCollected ? 'text-anavu-yellow' : 'text-anavu-green'}`} style={{ fontFamily: 'Shrikhand, cursive' }}>
                      {s.label}
                    </p>
                    {isCollected && <span className="text-[9px] font-bold text-anavu-lightyellow">✓ Coleccionado</span>}
                  </div>
                )
              })}
            </div>

            {collected.length === stickers.length && (
              <div className="bg-anavu-yellow/20 border-2 border-anavu-yellow rounded-2xl p-4 text-center animate-scale-in">
                <p className="text-anavu-green font-extrabold text-sm">🎉 ¡Colección Completa! Muestra esto en tu próximo pedido para un descuento especial.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
