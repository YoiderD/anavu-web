import { useState } from 'react'
import { catalogProducts } from '../data/products'

export default function Products({ onAddToCart }) {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all'
    ? catalogProducts
    : catalogProducts.filter(p => p.category === filter)

  return (
    <section id="productos" className="py-20 border-b border-anavu-yellow/30 bg-anavu-cream relative overflow-hidden">
      {/* Decorative ambient glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-anavu-yellow/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-anavu-lushgreen/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10 animate-fade-in-up">
          <span className="bg-anavu-yellow/30 text-anavu-brown font-extrabold px-4 py-1.5 rounded-full text-xs uppercase tracking-widest border border-anavu-yellow inline-block">
            Catálogo & Merchandising
          </span>
          <h2 className="text-3xl sm:text-5xl text-anavu-green" style={{ fontFamily: 'Shrikhand, cursive' }}>
            Nuestra Línea de Productos
          </h2>
          <p className="text-sm sm:text-base text-anavu-darkgreen/80">
            Descubre nuestras galletas artesanales de maracuyá con avena, merchandising exclusivo coleccionable y formatos mayoristas para negocios.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            { id: 'all', label: 'Todos los Productos' },
            { id: 'galletas', label: '🍪 Galletas Artesanales' },
            { id: 'merch', label: '✨ Merchandising Oficial' },
            { id: 'b2b', label: '📦 Distribución B2B' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-extrabold transition-all cursor-pointer shadow-xs ${
                filter === cat.id
                  ? 'bg-anavu-green text-anavu-cream border-2 border-anavu-yellow scale-105 shadow-md'
                  : 'bg-white text-anavu-green border border-anavu-yellow/40 hover:bg-anavu-yellow/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6 sm:gap-8">
          {filtered.map((p, i) => (
            <div
              key={p.id}
              className={`bg-white rounded-3xl border-2 border-anavu-yellow/50 p-5 sm:p-6 flex flex-col justify-between shadow-md card-hover animate-fade-in-up stagger-${(i % 4) + 1}`}
            >
              <div className="space-y-3">
                <div className="w-full h-52 rounded-2xl border border-anavu-yellow/30 overflow-hidden relative group bg-gradient-to-b from-white via-anavu-cream/30 to-anavu-cream/60 flex items-center justify-center p-3">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-sm"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className={`absolute top-2.5 right-2.5 ${p.badgeColor} text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs`}>
                    {p.badge}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl text-anavu-green leading-snug" style={{ fontFamily: 'Shrikhand, cursive' }}>
                  {p.name}
                </h3>
                <p className="text-xs text-anavu-darkgreen/75 leading-relaxed line-clamp-3">
                  {p.desc}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 mt-5 border-t border-anavu-yellow/30 gap-3">
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] text-anavu-brown font-bold block truncate">{p.unit}</span>
                  <span className="text-xl sm:text-2xl text-anavu-green font-bold whitespace-nowrap block" style={{ fontFamily: 'Shrikhand, cursive' }}>
                    S/ {p.price.toFixed(2)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onAddToCart(p.id)}
                  className="bg-anavu-green text-anavu-cream px-4 py-2.5 rounded-xl font-extrabold text-xs hover:bg-anavu-brown hover:scale-105 active:scale-95 transition-all shadow cursor-pointer flex items-center gap-2 shrink-0"
                >
                  <i className="fa-solid fa-cart-plus text-anavu-yellow text-xs"></i>
                  <span>Agregar</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
