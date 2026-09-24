import { useState } from 'react'

export default function OrderSection({ cart, updateQty, catalogItems }) {
  const [zone, setZone] = useState('lima')
  const [customerName, setCustomerName] = useState('')
  const [notes, setNotes] = useState('')
  const [copied, setCopied] = useState(false)

  const shippingRates = {
    lima: { name: 'Lima Metropolitana (24-48 hrs)', price: 10.00 },
    provincias: { name: 'Envíos Nacionales (Shalom / Olva Courier)', price: 18.00 },
    recojo: { name: 'Recojo en Taller Artesanal (Gratis)', price: 0.00 },
  }

  // Calculate Subtotal
  const subtotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = catalogItems.find(p => p.id === id)
    return sum + (item ? item.price * qty : 0)
  }, 0)

  const shipping = subtotal > 80 && zone === 'lima' ? 0.00 : shippingRates[zone].price
  const total = subtotal + shipping

  const totalItemsCount = Object.values(cart).reduce((a, b) => a + b, 0)

  const generateWhatsAppMessage = () => {
    let msg = `¡Hola Anávu! 🍪💛 Deseo realizar un pedido de Galletas de Maracuyá & Avena:\n\n`
    
    if (customerName.trim()) {
      msg += `👤 *Cliente:* ${customerName.trim()}\n`
    }

    msg += `📦 *Detalle de Productos:*\n`
    let hasItems = false
    Object.entries(cart).forEach(([id, qty]) => {
      if (qty > 0) {
        const item = catalogItems.find(p => p.id === id)
        if (item) {
          hasItems = true
          msg += ` • ${qty}x ${item.name} (${item.unit}) - S/ ${(item.price * qty).toFixed(2)}\n`
        }
      }
    })

    if (!hasItems) {
      return null
    }

    msg += `\n📍 *Tipo de Envío:* ${shippingRates[zone].name} (S/ ${shipping.toFixed(2)})`
    if (subtotal > 80 && zone === 'lima') {
      msg += ` ¡Envío Gratis por compras mayores a S/ 80!`
    }
    
    if (notes.trim()) {
      msg += `\n📝 *Notas / Indicaciones:* ${notes.trim()}`
    }

    msg += `\n\n💰 *Total a Pagar: S/ ${total.toFixed(2)}*`
    msg += `\n\n¿Me podrían confirmar disponibilidad y los datos de pago (Yape / Plin / BCP)? ¡Muchas gracias!`

    return msg
  }

  const handleWhatsAppClick = () => {
    const msg = generateWhatsAppMessage()
    if (!msg) {
      alert('Por favor agrega al menos un producto a tu pedido.')
      return
    }
    const encoded = encodeURIComponent(msg)
    window.open(`https://wa.me/51906013296?text=${encoded}`, '_blank')
  }

  const handleCopySummary = () => {
    const msg = generateWhatsAppMessage()
    if (!msg) {
      alert('Por favor agrega al menos un producto a tu pedido.')
      return
    }
    navigator.clipboard.writeText(msg)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <section id="pedidos" className="py-20 bg-anavu-green text-anavu-cream relative overflow-hidden">
      {/* Decorative ambient rings */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-anavu-yellow/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-anavu-lushgreen/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center space-y-4 mb-12 animate-fade-in-up">
          <span className="bg-anavu-yellow text-anavu-green font-extrabold px-4 py-1.5 rounded-full text-xs uppercase tracking-widest inline-block shadow">
            Calculadora de Pedido Directo
          </span>
          <h2 className="text-3xl sm:text-5xl text-anavu-yellow" style={{ fontFamily: 'Shrikhand, cursive' }}>
            ¡Arma tu Pedido en Línea!
          </h2>
          <p className="text-xs sm:text-sm text-anavu-cream/80 max-w-xl mx-auto">
            Configura los productos que deseas probar, elige el método de entrega y genera tu pedido directo hacia nuestro canal de atención por WhatsApp en 1 clic.
          </p>
        </div>

        {/* Main Card Container */}
        <div className="bg-white text-anavu-green p-6 sm:p-10 rounded-3xl shadow-2xl space-y-8 border-4 border-anavu-yellow">
          {/* Products List in Calculator */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-anavu-brown uppercase tracking-wider mb-2">
              1. Selecciona tus Productos
            </h3>

            <div className="space-y-3">
              {catalogItems.map((item) => {
                const qty = cart[item.id] || 0
                return (
                  <div
                    key={item.id}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border transition-all ${
                      qty > 0
                        ? 'bg-anavu-cream/80 border-anavu-yellow shadow-sm'
                        : 'bg-white border-slate-200 hover:border-anavu-yellow/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover border border-anavu-yellow/40 shrink-0"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-anavu-green" style={{ fontFamily: 'Shrikhand, cursive' }}>
                          {item.name}
                        </h4>
                        <span className="text-[11px] text-anavu-brown font-bold block">
                          S/ {item.price.toFixed(2)} &bull; <span className="font-normal text-slate-500">{item.unit}</span>
                        </span>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-end gap-3 mt-3 sm:mt-0">
                      <div className="flex items-center gap-2 bg-anavu-yellow/20 p-1 rounded-xl border border-anavu-yellow/50">
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, -1)}
                          disabled={qty === 0}
                          className="w-8 h-8 rounded-lg bg-white text-anavu-green font-bold text-sm hover:bg-anavu-yellow hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 transition-all flex items-center justify-center cursor-pointer shadow-xs"
                          aria-label="Disminuir cantidad"
                        >
                          <i className="fa-solid fa-minus text-xs"></i>
                        </button>
                        <span className="w-8 text-center font-extrabold text-sm text-anavu-green">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, 1)}
                          className="w-8 h-8 rounded-lg bg-anavu-green text-anavu-cream font-bold text-sm hover:bg-anavu-brown hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-xs"
                          aria-label="Aumentar cantidad"
                        >
                          <i className="fa-solid fa-plus text-xs"></i>
                        </button>
                      </div>

                      <span className="w-20 text-right font-bold text-sm text-anavu-green">
                        S/ {(item.price * qty).toFixed(2)}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Customer & Shipping Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-anavu-yellow/30">
            {/* Delivery Method */}
            <div className="space-y-3">
              <label className="text-xs font-extrabold text-anavu-brown uppercase tracking-wider block">
                2. Destino / Tipo de Entrega
              </label>
              <div className="space-y-2">
                {Object.entries(shippingRates).map(([k, val]) => (
                  <label
                    key={k}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer text-xs font-bold transition-all ${
                      zone === k
                        ? 'bg-anavu-green text-anavu-cream border-anavu-green shadow-xs'
                        : 'bg-anavu-cream/50 text-anavu-green border-anavu-yellow/40 hover:bg-anavu-yellow/20'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="zone"
                        value={k}
                        checked={zone === k}
                        onChange={(e) => setZone(e.target.value)}
                        className="accent-anavu-yellow"
                      />
                      <span>{val.name}</span>
                    </div>
                    <span className={zone === k ? 'text-anavu-yellow' : 'text-anavu-brown'}>
                      {val.price === 0 ? 'Gratis' : `S/ ${val.price.toFixed(2)}`}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Customer Details */}
            <div className="space-y-3">
              <label className="text-xs font-extrabold text-anavu-brown uppercase tracking-wider block">
                3. Tus Datos (Opcional)
              </label>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Tu Nombre o Empresa (ej. Bodega San José)"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-anavu-yellow/40 bg-anavu-cream/40 focus:outline-none focus:ring-2 focus:ring-anavu-yellow text-anavu-green"
                />
                <textarea
                  rows="2"
                  placeholder="Indicaciones adicionales o dedicatoria personalizada..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-anavu-yellow/40 bg-anavu-cream/40 focus:outline-none focus:ring-2 focus:ring-anavu-yellow text-anavu-green resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="p-4 rounded-2xl bg-anavu-cream/60 border-2 border-anavu-yellow/40 space-y-2">
            <div className="flex items-center justify-between text-xs text-anavu-darkgreen/80">
              <span>Subtotal ({totalItemsCount} productos):</span>
              <span className="font-bold">S/ {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-anavu-darkgreen/80">
              <span>Costo de Envío:</span>
              <span className="font-bold">
                {shipping === 0 ? (
                  <span className="text-anavu-lushgreen font-extrabold">¡Envío Gratis! ✓</span>
                ) : (
                  `S/ ${shipping.toFixed(2)}`
                )}
              </span>
            </div>
            <div className="pt-2 border-t border-anavu-yellow/40 flex items-center justify-between">
              <span className="text-lg font-bold text-anavu-green" style={{ fontFamily: 'Shrikhand, cursive' }}>
                Monto Total Estimado:
              </span>
              <span className="text-3xl font-bold text-anavu-brown" style={{ fontFamily: 'Shrikhand, cursive' }}>
                S/ {total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={handleWhatsAppClick}
              disabled={totalItemsCount === 0}
              className="flex-1 bg-anavu-yellow text-anavu-green font-extrabold text-sm sm:text-base py-4 rounded-2xl border-2 border-anavu-green hover:bg-anavu-lightyellow hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className="fa-brands fa-whatsapp text-2xl text-green-700"></i>
              <span>Enviar Pedido Directo por WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={handleCopySummary}
              disabled={totalItemsCount === 0}
              className="bg-anavu-green text-anavu-cream font-bold text-xs px-6 py-4 rounded-2xl hover:bg-anavu-brown transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              title="Copiar texto del pedido"
            >
              <i className={`fa-solid ${copied ? 'fa-check text-anavu-yellow' : 'fa-copy'}`}></i>
              <span>{copied ? '¡Copiado!' : 'Copiar Resumen'}</span>
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-shield-halved text-anavu-green"></i> Atención 100% personalizada
            </span>
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-mobile-screen text-anavu-green"></i> Aceptamos Yape, Plin y Transferencias
            </span>
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-truck text-anavu-green"></i> Despachos a todo el Perú
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
