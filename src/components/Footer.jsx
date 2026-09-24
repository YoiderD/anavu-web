export default function Footer() {
  return (
    <footer className="bg-anavu-darkgreen text-anavu-cream pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t-4 border-anavu-yellow">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo.png"
                alt="Logo Oficial Anávu"
                className="w-14 h-14 object-contain rounded-full shadow-md border-2 border-anavu-yellow bg-white shrink-0"
              />
              <div>
                <span className="text-2xl text-anavu-yellow leading-none block" style={{ fontFamily: 'Shrikhand, cursive' }}>
                  Anávu
                </span>
                <span className="text-[10px] text-anavu-cream/80 uppercase tracking-widest font-extrabold block">
                  Galletas de Maracuyá & Avena
                </span>
              </div>
            </div>
            <p className="text-xs text-anavu-cream/70 leading-relaxed">
              Elaboramos galletas artesanales únicas fusionando la intensidad del maracuyá de la costa y selva peruana con la suavidad crocante de las hojuelas integrales de avena y miel de abeja.
            </p>
            <div className="inline-flex items-center gap-2 bg-anavu-yellow/15 border border-anavu-yellow/30 px-3 py-1.5 rounded-full text-[11px] text-anavu-yellow font-bold">
              <span>🇵🇪 Hecho con orgullo en el Perú</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-anavu-yellow uppercase tracking-widest">
              Explorar Marca
            </h4>
            <ul className="space-y-2 text-xs text-anavu-cream/80">
              <li>
                <a href="#hero" className="hover:text-anavu-yellow transition-colors flex items-center gap-2">
                  <i className="fa-solid fa-chevron-right text-[9px] text-anavu-yellow"></i> Inicio
                </a>
              </li>
              <li>
                <a href="#productos" className="hover:text-anavu-yellow transition-colors flex items-center gap-2">
                  <i className="fa-solid fa-chevron-right text-[9px] text-anavu-yellow"></i> Catálogo & Merchandising
                </a>
              </li>
              <li>
                <a href="#packaging" className="hover:text-anavu-yellow transition-colors flex items-center gap-2">
                  <i className="fa-solid fa-chevron-right text-[9px] text-anavu-yellow"></i> Packaging & Logística
                </a>
              </li>
              <li>
                <a href="#maracuyita" className="hover:text-anavu-yellow transition-colors flex items-center gap-2">
                  <i className="fa-solid fa-chevron-right text-[9px] text-anavu-yellow"></i> Maracuyita & Stickers
                </a>
              </li>
              <li>
                <a href="#ingredientes" className="hover:text-anavu-yellow transition-colors flex items-center gap-2">
                  <i className="fa-solid fa-chevron-right text-[9px] text-anavu-yellow"></i> Ingredientes Naturales
                </a>
              </li>
              <li>
                <a href="#nutricion" className="hover:text-anavu-yellow transition-colors flex items-center gap-2">
                  <i className="fa-solid fa-chevron-right text-[9px] text-anavu-yellow"></i> Tabla Nutricional
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Attention */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-anavu-yellow uppercase tracking-widest">
              Contacto & Ventas B2B
            </h4>
            <ul className="space-y-3 text-xs text-anavu-cream/80">
              <li className="flex items-start gap-2.5">
                <i className="fa-solid fa-location-dot text-anavu-yellow mt-0.5"></i>
                <span>Taller de Horneado: Lima Metropolitana, Perú</span>
              </li>
              <li className="flex items-start gap-2.5">
                <i className="fa-brands fa-whatsapp text-anavu-yellow mt-0.5"></i>
                <a href="https://wa.me/51906013296" target="_blank" rel="noreferrer" className="hover:text-anavu-yellow transition-colors">
                  Atención WhatsApp: +51 906 013 296
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <i className="fa-solid fa-envelope text-anavu-yellow mt-0.5"></i>
                <span>hola@anavu.pe / ventas@anavu.pe</span>
              </li>
              <li className="flex items-start gap-2.5">
                <i className="fa-solid fa-clock text-anavu-yellow mt-0.5"></i>
                <span>Lunes a Sábado: 8:00 AM – 7:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Social */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold text-anavu-yellow uppercase tracking-widest">
              Comunidad Anávu
            </h4>
            <p className="text-xs text-anavu-cream/70">
              Síguenos en redes sociales para sorteos, recetas y lanzamientos de nuevas ediciones limitadas.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: 'fa-instagram', href: 'https://instagram.com' },
                { icon: 'fa-facebook', href: 'https://facebook.com' },
                { icon: 'fa-tiktok', href: 'https://tiktok.com' },
                { icon: 'fa-whatsapp', href: 'https://wa.me/51906013296' },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/10 border border-anavu-yellow/30 flex items-center justify-center text-anavu-yellow hover:bg-anavu-yellow hover:text-anavu-green transition-all hover:scale-110 shadow-sm"
                  aria-label={s.icon}
                >
                  <i className={`fa-brands ${s.icon} text-lg`}></i>
                </a>
              ))}
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-anavu-yellow/20 text-[10px] text-anavu-cream/70">
              🛡️ Registro Sanitario Digesa en trámite conforme a normativas de inocuidad alimentaria.
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-anavu-yellow/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-anavu-cream/60">
          <p>&copy; {new Date().getFullYear()} Anávu Perú. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <a href="#hero" className="hover:text-anavu-yellow transition-colors">Términos & Condiciones</a>
            <a href="#hero" className="hover:text-anavu-yellow transition-colors">Políticas de Privacidad</a>
            <a href="#hero" className="hover:text-anavu-yellow transition-colors">Libro de Reclamaciones</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
