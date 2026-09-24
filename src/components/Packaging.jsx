import { useState } from 'react'

const packagingLevels = [
  {
    id: 'primario',
    level: 'Empaque Primario',
    name: 'Doypack Trilaminado con Zipper',
    desc: 'Bolsa pouch de alta barrera contra la humedad y oxígeno. Mantiene la crocancia intacta de las galletas y conserva el aroma cítrico del maracuyá gracias a su zipper resellable.',
    capacity: '60g Netos (6 galletas)',
    material: 'Laminado Foil + BOPP Mate Grado Alimenticio',
    features: [
      'Cierre zipper hermético reutilizable',
      'Protección UV y barrera de aroma',
      'Apertura fácil "easy open" con muescas laterales',
      'Troquel euro-slot para exhibición colgada',
    ],
    img: '/images/product-pouch.jpg',
    badge: 'Consumo Individual',
    badgeColor: 'bg-anavu-green text-anavu-cream',
  },
  {
    id: 'secundario',
    level: 'Empaque Secundario',
    name: 'Caja Display Punto de Venta',
    desc: 'Caja expositora de cartón microondulado con troquel prepicado que se transforma en expositor de mostrador en segundos. Diseñada para maximizar rotación en bodegas y minimarkets.',
    capacity: '8 Paquetes Primarios (48 galletas)',
    material: 'Cartulina Sulfatada 350g con barniz UV brillante',
    features: [
      'Troquel prepicado fácil de armar en mostrador',
      'Gráfica llamativa 360° con Maracuyita',
      'Código de barras EAN-13 para facturación rápida',
      'Optimizado para estanterías de retail peruano',
    ],
    img: '/images/display-box.jpg',
    badge: 'Punto de Venta / Retail',
    badgeColor: 'bg-anavu-yellow text-anavu-green border border-anavu-green',
  },
  {
    id: 'terciario',
    level: 'Empaque Terciario',
    name: 'Caja Logística Corrugada B2B',
    desc: 'Embalaje de cartón corrugado de alta resistencia kraft para transporte y distribución masiva. Cumple con normativas logísticas peruanas e internacionales para paletizado seguro.',
    capacity: '12 Cajas Display (96 paquetes / 576 galletas)',
    material: 'Cartón Corrugado Flauta B Doble Onda 150 lb/in²',
    features: [
      'Iconografía internacional de estiba y manipulación de alimentos',
      'Etiqueta de trazabilidad y lote de producción impreso',
      'Resistencia al apilado en almacén de hasta 6 niveles',
      'Diseño ecológico 100% reciclable y biodegradable',
    ],
    img: '/images/logistics-box.jpg',
    badge: 'Distribución Mayorista B2B',
    badgeColor: 'bg-anavu-brown text-anavu-cream',
  },
]

export default function Packaging() {
  const [activeTab, setActiveTab] = useState(0)
  const current = packagingLevels[activeTab]

  return (
    <section id="packaging" className="py-20 border-b border-anavu-yellow/30 bg-gradient-to-b from-anavu-cream via-white to-anavu-cream relative overflow-hidden">
      {/* Decorative ambient elements */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-anavu-yellow/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-anavu-lushgreen/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 animate-fade-in-up">
          <span className="bg-anavu-yellow/30 text-anavu-brown font-extrabold px-4 py-1.5 rounded-full text-xs uppercase tracking-widest border border-anavu-yellow">
            Ingeniería de Empaque & Logística
          </span>
          <h2 className="text-3xl sm:text-5xl text-anavu-green" style={{ fontFamily: 'Shrikhand, cursive' }}>
            Packaging Oficial Anávu
          </h2>
          <p className="text-sm sm:text-base text-anavu-darkgreen/80">
            Diseñado meticulosamente según la guía técnica de packaging: desde la preservación de la frescura en mano del consumidor hasta la cadena de suministro B2B.
          </p>
        </div>

        {/* Level Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {packagingLevels.map((lvl, idx) => (
            <button
              key={lvl.id}
              onClick={() => setActiveTab(idx)}
              className={`px-6 py-3 rounded-2xl font-extrabold text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-sm ${
                activeTab === idx
                  ? 'bg-anavu-green text-anavu-cream scale-105 shadow-md border-2 border-anavu-yellow'
                  : 'bg-white text-anavu-green border-2 border-anavu-yellow/40 hover:bg-anavu-yellow/20'
              }`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${activeTab === idx ? 'bg-anavu-yellow text-anavu-green font-bold' : 'bg-anavu-green/10 text-anavu-green'}`}>
                {idx + 1}
              </span>
              <span>{lvl.level}</span>
            </button>
          ))}
        </div>

        {/* Tab Showcase Card */}
        <div className="glass rounded-3xl border-2 border-anavu-yellow/60 p-6 sm:p-10 shadow-2xl animate-fade-in-up">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Visual Box */}
            <div className="lg:col-span-6 relative flex justify-center">
              <div className="w-full max-w-md h-80 sm:h-96 rounded-2xl overflow-hidden border-2 border-anavu-yellow/40 shadow-xl relative group">
                <img
                  src={current.img}
                  alt={current.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-anavu-green/50 via-transparent to-transparent"></div>
                <span className={`absolute top-4 left-4 ${current.badgeColor} text-xs font-bold px-3 py-1.5 rounded-full shadow`}>
                  {current.badge}
                </span>
                <div className="absolute bottom-4 left-4 right-4 glass-dark rounded-xl p-3 text-white text-xs">
                  <p className="font-bold text-anavu-yellow flex items-center gap-2">
                    <i className="fa-solid fa-box-open"></i> {current.name}
                  </p>
                  <p className="text-white/80 text-[11px] mt-0.5">{current.capacity}</p>
                </div>
              </div>
            </div>

            {/* Technical Information */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-extrabold text-anavu-brown uppercase tracking-widest block">
                  {current.level}
                </span>
                <h3 className="text-2xl sm:text-4xl text-anavu-green mt-1" style={{ fontFamily: 'Shrikhand, cursive' }}>
                  {current.name}
                </h3>
                <p className="text-xs sm:text-sm text-anavu-darkgreen/80 mt-3 leading-relaxed">
                  {current.desc}
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/80 border border-anavu-yellow/40 p-3.5 rounded-2xl">
                  <span className="text-[10px] text-anavu-brown font-extrabold uppercase tracking-wider block">Capacidad / Contenido</span>
                  <p className="text-xs sm:text-sm font-bold text-anavu-green mt-0.5">{current.capacity}</p>
                </div>
                <div className="bg-white/80 border border-anavu-yellow/40 p-3.5 rounded-2xl">
                  <span className="text-[10px] text-anavu-brown font-extrabold uppercase tracking-wider block">Material & Sustrato</span>
                  <p className="text-xs sm:text-sm font-bold text-anavu-green mt-0.5">{current.material}</p>
                </div>
              </div>

              {/* Key Features List */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold text-anavu-green uppercase tracking-wider">
                  Especificaciones Técnicas:
                </h4>
                <ul className="space-y-2 text-xs text-anavu-darkgreen/85">
                  {current.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-anavu-yellow/30 text-anavu-green flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                        ✓
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Link */}
              <div className="pt-2">
                <a
                  href="#pedidos"
                  className="inline-flex items-center gap-2 bg-anavu-green text-anavu-cream text-xs font-bold px-6 py-3 rounded-xl hover:bg-anavu-brown transition-all shadow hover:scale-105"
                >
                  <i className="fa-solid fa-cart-shopping text-anavu-yellow"></i>
                  <span>Cotizar este formato para tu negocio</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
