export default function Hero() {
  return (
    <section id="hero" className="relative pt-10 pb-20 md:py-28 overflow-hidden border-b border-anavu-yellow/30 bg-gradient-to-b from-anavu-cream via-anavu-yellow/10 to-anavu-cream">
      {/* Decorative blobs */}
      <div className="absolute top-10 -left-20 w-72 h-72 bg-anavu-yellow/15 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-anavu-lushgreen/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-anavu-yellow/30 border border-anavu-yellow text-anavu-green font-extrabold text-xs px-4 py-2 rounded-full shadow-sm">
              <i className="fa-solid fa-lemon text-anavu-brown"></i>
              <span>El sabor que despierta tus sentidos &bull; Naturaleza en cada bocado ♡</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl text-anavu-green leading-[1.1]" style={{ fontFamily: 'Shrikhand, cursive' }}>
              Galletas de <span className="gradient-text">Maracuyá</span> & Avena
            </h1>

            <p className="text-base sm:text-lg text-anavu-darkgreen/80 font-medium max-w-2xl mx-auto lg:mx-0">
              Una combinación artesanal e irresistible. Elaboradas con pulpa natural de maracuyá maduro, semillas crujientes, miel pura y hojuelas integrales de avena. <strong>Naturalmente diferente.</strong>
            </p>

            {/* Quality Badges */}
            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0 py-2">
              {[
                { icon: 'fa-leaf', color: 'text-anavu-green', label: '100% Natural' },
                { icon: 'fa-cookie', color: 'text-anavu-brown', label: 'Hecho con Pasión' },
                { icon: 'fa-heart', color: 'text-red-500', label: 'Sabor Único' },
              ].map((b, i) => (
                <div key={i} className={`glass p-3 rounded-2xl text-center shadow-sm card-hover stagger-${i+1} animate-scale-in`}>
                  <i className={`fa-solid ${b.icon} ${b.color} text-lg mb-1`}></i>
                  <p className="text-[11px] font-bold text-anavu-green">{b.label}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <a href="#pedidos" className="bg-anavu-yellow text-anavu-green border-2 border-anavu-green font-extrabold px-8 py-4 rounded-2xl shadow-lg hover:bg-anavu-lightyellow hover:scale-105 transition-all text-sm flex items-center gap-3 animate-pulse-glow">
                <i className="fa-solid fa-basket-shopping text-base"></i>
                Hacer Pedido por WhatsApp
              </a>
              <a href="#productos" className="bg-anavu-green text-anavu-cream font-extrabold px-8 py-4 rounded-2xl shadow-lg hover:bg-anavu-brown hover:scale-105 transition-all text-sm flex items-center gap-3">
                <i className="fa-solid fa-store text-base text-anavu-yellow"></i>
                Ver Catálogo & Merch
              </a>
            </div>
          </div>

          {/* Right - Hero Image */}
          <div className="lg:col-span-5 flex justify-center relative animate-fade-in-up stagger-2">
            <div className="relative w-full max-w-lg">
              <div className="absolute inset-0 bg-anavu-yellow/20 rounded-3xl blur-2xl transform rotate-3"></div>
              <div className="relative overflow-hidden rounded-3xl border-4 border-anavu-yellow shadow-2xl animate-float">
                <img src="/images/hero-banner.jpg" alt="Galletas de Maracuyá y Avena Anávu" className="w-full h-auto object-cover" loading="eager" />
                <div className="absolute inset-0 bg-gradient-to-t from-anavu-green/40 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 glass-dark rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-anavu-yellow flex items-center justify-center shrink-0">
                    <i className="fa-solid fa-star text-anavu-green"></i>
                  </div>
                  <div>
                    <p className="text-anavu-yellow font-extrabold text-sm" style={{ fontFamily: 'Shrikhand, cursive' }}>Receta Original</p>
                    <p className="text-anavu-cream/70 text-[10px]">Horneadas con amor en Lima, Perú</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
