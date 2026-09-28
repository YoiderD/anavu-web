import { useState, useRef, useEffect, useCallback } from 'react'

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

// Bocas limpias extraídas del render original (sin frames "fantasma" del GIF)
const MOUTHS = ['closed', 'mid', 'open', 'wide']

// Forma de boca según la vocal dominante de la sílaba (con algo de variación para no sonar robótico)
const visemeFor = (syllable) => {
  const shape = /[aá]/i.test(syllable) ? 'wide' : /[eéoó]/i.test(syllable) ? 'open' : 'mid'
  if (Math.random() < 0.25) return shape === 'wide' ? 'open' : 'mid'
  return shape
}

// Apertura de mandíbula por forma de boca
const JAW = { closed: 0, mid: 0.4, open: 0.7, wide: 1 }

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

function MaracuyitaAvatar({ mouth, blinking, speaking, arm, waveId }) {
  const jaw = JAW[mouth]
  return (
    <div className={`absolute inset-0 mascot-body ${speaking ? 'is-speaking' : ''}`}>
      <div
        className="absolute inset-0 mascot-jaw"
        style={{ transform: `translateY(${jaw * 1.2}px) scaleY(${1 + jaw * 0.012})` }}
      >
        {MOUTHS.map((m) => (
          <img
            key={m}
            src={`/images/maracuyita/mouth-${m}.webp`}
            alt={m === 'closed' ? 'Maracuyita - Mascota oficial de Anávu' : ''}
            aria-hidden={m !== 'closed'}
            draggable="false"
            className={`absolute inset-0 w-full h-full object-cover select-none mouth-layer ${mouth === m ? 'is-active' : ''}`}
          />
        ))}
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
  const [mouth, setMouth] = useState('closed')
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
      at(0, () => setMouth('closed'))
      return () => timers.forEach(clearTimeout)
    }

    const words = tips[tipIndex].split(' ')
    const word = words[displayedWords - 1]
    const { speak, pause } = wordTiming(word)
    const syl = syllablesOf(word)

    if (syl.length) {
      const step = speak / syl.length
      syl.forEach((s, i) => {
        at(i * step, () => setMouth(visemeFor(s)))
        // Entre palabras seguidas la boca no siempre cierra del todo (coarticulación)
        const last = i === syl.length - 1
        const rest = last && (pause > 40 || Math.random() < 0.5) ? 'closed' : 'mid'
        at(i * step + step * 0.65, () => setMouth(rest))
      })
    } else {
      at(0, () => setMouth('closed'))
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
                  mouth={mouth}
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
