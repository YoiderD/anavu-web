import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Products from './components/Products'
import Packaging from './components/Packaging'
import Mascot from './components/Mascot'
import Ingredients from './components/Ingredients'
import NutritionTable from './components/NutritionTable'
import OrderSection from './components/OrderSection'
import Footer from './components/Footer'
import { catalogProducts } from './data/products'

export default function App() {
  const [cart, setCart] = useState({
    caja: 1,
    galleta: 0,
    taza: 0,
    tote: 0,
    logistica: 0,
  })

  const [toast, setToast] = useState(null)

  const showToast = (message) => {
    setToast(message)
    setTimeout(() => {
      setToast(null)
    }, 3000)
  }

  const handleAddToCart = (id) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }))
    const item = catalogProducts.find((p) => p.id === id)
    if (item) {
      showToast(`¡Agregado: ${item.name}! Revisa tu pedido abajo.`)
    }
  }

  const updateQty = (id, delta) => {
    setCart((prev) => {
      const current = prev[id] || 0
      const next = Math.max(0, current + delta)
      return {
        ...prev,
        [id]: next,
      }
    })
  }

  const totalItemsCount = Object.values(cart).reduce((a, b) => a + b, 0)

  return (
    <div className="min-h-screen flex flex-col bg-anavu-cream text-anavu-green selection:bg-anavu-yellow selection:text-anavu-green relative">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-anavu-green text-anavu-cream px-5 py-3.5 rounded-2xl border-2 border-anavu-yellow shadow-2xl flex items-center gap-3 animate-fade-in-up">
          <span className="w-7 h-7 rounded-full bg-anavu-yellow text-anavu-green flex items-center justify-center font-bold text-xs">
            ✓
          </span>
          <span className="text-xs font-bold">{toast}</span>
          <a
            href="#pedidos"
            className="ml-2 bg-anavu-yellow text-anavu-green text-[10px] font-extrabold px-2.5 py-1 rounded-lg hover:bg-anavu-lightyellow transition-colors"
          >
            Ver Pedido
          </a>
        </div>
      )}

      {/* Navigation */}
      <Navbar cartCount={totalItemsCount} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <Products onAddToCart={handleAddToCart} />
        <Packaging />
        <Mascot />
        <Ingredients />
        <NutritionTable />
        <OrderSection
          cart={cart}
          updateQty={updateQty}
          catalogItems={catalogProducts}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <a
        href="https://wa.me/51906013296?text=%C2%A1Hola%20An%C3%A1vu!%20%F0%9F%8D%AA%20Quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20las%20galletas%20de%20maracuy%C3%A1%20y%20avena"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 left-6 z-40 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all border-2 border-white cursor-pointer group"
        aria-label="Contactar por WhatsApp"
      >
        <i className="fa-brands fa-whatsapp text-3xl group-hover:rotate-12 transition-transform"></i>
        <span className="absolute left-16 bg-anavu-darkgreen text-white text-[11px] font-bold px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg pointer-events-none">
          ¿Dudas? Chatea con nosotros
        </span>
      </a>
    </div>
  )
}
