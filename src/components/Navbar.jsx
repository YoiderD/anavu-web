import { useState, useEffect } from 'react'

export default function Navbar({ cartCount = 0 }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links = [
    { href: '#hero', label: 'Inicio' },
    { href: '#productos', label: 'Productos' },
    { href: '#packaging', label: 'Packaging' },
    { href: '#maracuyita', label: 'Maracuyita' },
    { href: '#ingredientes', label: 'Ingredientes' },
    { href: '#nutricion', label: 'Nutrición' },
    { href: '#pedidos', label: 'Pedido' },
  ]

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-lg' : 'bg-anavu-cream/90 backdrop-blur-md'} border-b border-anavu-yellow/30`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <img
            src="/images/logo.png"
            alt="Logo Oficial Anávu"
            className="w-14 h-14 object-contain rounded-full shadow-md group-hover:scale-105 transition-transform border-2 border-anavu-yellow/60 bg-white"
          />
          <div className="flex flex-col">
            <span className="text-2xl text-anavu-green leading-none tracking-wide" style={{ fontFamily: 'Shrikhand, cursive' }}>Anávu</span>
            <span className="text-[10px] font-extrabold text-anavu-brown uppercase tracking-widest">Galletas de Maracuyá & Avena</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-7 font-bold text-sm text-anavu-green">
          {links.map(l => (
            <a key={l.href} href={l.href} className="relative hover:text-anavu-brown transition-colors after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-anavu-yellow after:transition-all hover:after:w-full">
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a href="#pedidos" className="relative bg-anavu-green text-anavu-cream px-5 py-2.5 rounded-full font-extrabold text-xs shadow-md hover:bg-anavu-brown hover:scale-105 transition-all flex items-center gap-2">
            <i className="fa-brands fa-whatsapp text-sm text-anavu-yellow"></i>
            <span className="hidden sm:inline">Pedir Ahora</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-anavu-yellow text-anavu-green text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border border-anavu-green shadow">
                {cartCount}
              </span>
            )}
          </a>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden w-10 h-10 rounded-xl bg-anavu-yellow/20 text-anavu-green flex items-center justify-center border border-anavu-yellow cursor-pointer" aria-label="Abrir Menú">
            <i className={`fa-solid ${mobileOpen ? 'fa-xmark' : 'fa-bars'} text-lg`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden glass border-t border-anavu-yellow/30 animate-fade-in-up">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col space-y-3">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="font-bold text-sm text-anavu-green hover:text-anavu-brown transition-colors py-2 border-b border-anavu-yellow/20">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
