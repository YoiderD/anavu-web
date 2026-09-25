import { useState, useRef, useEffect } from 'react'

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

export default function Mascot() {
  const [tipIndex, setTipIndex] = useState(0)
  const [collected, setCollected] = useState([])
  const [isTalking, setIsTalking] = useState(false)
  const talkTimerRef = useRef(null)

  const triggerTalking = (durationMs = 3500) => {
    setIsTalking(true)
    if (talkTimerRef.current) {
      clearTimeout(talkTimerRef.current)
    }
    talkTimerRef.current = setTimeout(() => {
      setIsTalking(false)
    }, durationMs)
  }

  const nextTip = () => {
    setTipIndex((prev) => (prev + 1) % tips.length)
    triggerTalking(3500)
  }

  useEffect(() => {
    triggerTalking(3000)
    return () => {
      if (talkTimerRef.current) clearTimeout(talkTimerRef.current)
    }
  }, [])

  const collectSticker = (label) => {
    if (!collected.includes(label)) {
      setCollected([...collected, label])
    }
  }

  return (
    <section id="maracuyita" className="py-20 border-b border-anavu-yellow/30 bg-gradient-to-br from-anavu-yellow/20 via-anavu-cream to-anavu-lightyellow/10 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-anavu-lushgreen/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Mascot */}
          <div className="lg:col-span-5 flex flex-col items-center text-center space-y-6 animate-fade-in-up">
            {/* Speech Bubble */}
            <div
              key={tipIndex}
              className="glass px-6 py-4 rounded-3xl shadow-lg relative max-w-sm border-2 border-anavu-green animate-scale-in"
            >
              <p className="text-xs sm:text-sm font-bold text-anavu-green leading-relaxed">
                {tips[tipIndex]}
              </p>
              <div className="w-4 h-4 bg-white border-r-2 border-b-2 border-anavu-green transform rotate-45 absolute -bottom-2 left-1/2 -translate-x-1/2"></div>
            </div>

            {/* Mascot Character */}
            <div className="flex flex-col items-center">
              <button
                onClick={nextTip}
                className="w-56 h-56 sm:w-64 sm:h-64 rounded-full border-4 border-anavu-green overflow-hidden shadow-2xl hover:scale-105 active:scale-95 transition-all relative group cursor-pointer animate-pulse-glow bg-anavu-cream flex items-center justify-center"
                title="¡Haz clic en Maracuyita para escuchar otro consejo!"
              >
                <img
                  src={isTalking ? '/images/mascot-talking.webp' : '/images/mascot.jpg'}
                  alt="Maracuyita - Mascota oficial de Anávu"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-anavu-yellow/0 group-hover:bg-anavu-yellow/15 transition-all rounded-full pointer-events-none"></div>

                {isTalking && (
                  <span className="absolute bottom-3 bg-anavu-green text-anavu-yellow font-extrabold text-[10px] sm:text-xs px-3 py-1 rounded-full shadow-lg border border-anavu-yellow flex items-center gap-1.5 animate-bounce">
                    <span>💬</span> ¡Hablando!
                  </span>
                )}
              </button>
              <div className="text-center mt-3">
                <p className="text-2xl text-anavu-green" style={{ fontFamily: 'Shrikhand, cursive' }}>
                  Maracuyita
                </p>
                <span className="text-[10px] font-extrabold text-anavu-brown uppercase tracking-widest bg-white/80 px-3 py-1 rounded-full border border-anavu-yellow/40">
                  {isTalking ? 'Contándote un tip...' : 'Mascota Oficial • ¡Hazme clic!'}
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
