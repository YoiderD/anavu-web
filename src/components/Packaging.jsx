import { useState } from 'react'

const packagingLevels = [
  {
    id: 'primario',
    level: 'Empaque Primario',
    name: 'Bolsa Plástica Laminada (Flowpack)',
    desc: 'Empaque primario individual para galletas de avena con maracuyá. Fabricado en bolsa plástica laminada para alimentos con sellado térmico hermético en ambos extremos. Protege el producto contra la humedad y el oxígeno, conservando la textura crocante y el sabor natural.',
    capacity: '6 unidades (60 g horneado / 100 g mezcla)',
    dimensions: '6 cm (ancho) × 18 cm (largo)',
    material: 'Bolsa plástica para alimentos / BOPP o material laminado',
    cierre: 'Sellado térmico hermético',
    cost: 'S/ 1.11 por paquete (6 galletas)',
    costBreakdown: [
      { item: 'Avena', amount: '22.5 g', cost: 'S/ 0.18' },
      { item: 'Maracuyá', amount: '24.0 g', cost: 'S/ 0.12' },
      { item: 'Harina / Ingr. base', amount: '20.0 g', cost: 'S/ 0.08' },
      { item: 'Huevo', amount: '1/4 unidad (~12.5 g)', cost: 'S/ 0.12' },
      { item: 'Azúcar / endulzante', amount: '16.0 g', cost: 'S/ 0.08' },
      { item: 'Aceite / mantequilla', amount: '5.0 g', cost: 'S/ 0.08' },
      { item: 'Proteína en polvo', amount: '2.5 g', cost: 'S/ 0.25' },
      { item: 'Gas / energía / horneado', amount: 'Servicio operativo', cost: 'S/ 0.08' },
      { item: 'Mano de obra', amount: 'Costo operativo', cost: 'S/ 0.12' },
    ],
    features: [
      'Medidas exactas: 6 × 18 cm con sellado térmico de grado alimenticio',
      'Contenido neto: 6 unidades crujientes (60 g horneado)',
      'Diseño: Marca Anávu, sabor maracuyá y avena, octógonos y contenido neto',
      'Lemas oficiales: "El sabor que despierta tus sentidos" & "Crujientes y llenas de sabor natural"',
      'Costo unitario de receta: S/ 1.11 por paquete',
    ],
    img: '/images/flowpack-pouch.jpg',
    badge: 'Consumo Individual (6 Galletas)',
    badgeColor: 'bg-anavu-yellow text-anavu-green border border-anavu-green',
  },
  {
    id: 'secundario',
    level: 'Empaque Secundario',
    name: 'Bolsa Plástica Laminada para Alimentos',
    desc: 'Empaque secundario oficial que agrupa 8 empaques primarios organizados en 2 filas × 2 columnas × 2 niveles. Protege los paquetes individuales, mantiene la frescura durante el almacenaje y permite la comercialización en pack multipack transparente con sellado hermético.',
    capacity: '8 empaques primarios (48 galletas en total)',
    dimensions: '38 cm (ancho) × 14 cm (alto) × 3 cm (fondo)',
    material: 'Bolsa plástica laminar transparente (BOPP-PE apta para alimentos)',
    cierre: 'Sellado térmico hermético',
    cost: 'S/ 10.80 por empaque secundario (8 × S/ 1.35)',
    costBreakdown: [
      { item: '8 Empaques primarios (S/ 1.35 c/u)', amount: '8 paquetes', cost: 'S/ 10.80' },
      { item: 'Distribución interior', amount: '2 filas × 2 col × 2 niveles', cost: 'Optimizado' },
      { item: 'Costo Total del empaque secundario', amount: '8 unidades', cost: 'S/ 10.80' },
    ],
    features: [
      'Medidas oficiales: 38 cm de ancho × 14 cm de alto × 3 cm de fondo',
      'Contenido: 8 empaques primarios (48 galletas en total)',
      'Distribución: 2 filas × 2 columnas × 2 niveles (2 × 2 × 2 = 8)',
      'Material: Bolsa plástica transparente laminar BOPP-PE con sellado térmico',
      'Costo unitario de transferencia: S/ 1.35 | Costo Total: S/ 10.80',
    ],
    img: '/images/multipack-bag.jpg',
    badge: 'Pack x 8 Unidades (S/ 10.80)',
    badgeColor: 'bg-anavu-green text-anavu-cream',
  },
  {
    id: 'terciario',
    level: 'Empaque Terciario',
    name: 'Caja de Distribución y Transporte',
    desc: 'Caja de cartón kraft corrugado de alta resistencia destinada al almacenamiento, transporte y distribución mayorista del producto. Impresa con identidad botánica oficial en tinta verde ecológica Anávu.',
    capacity: '12 empaques secundarios = 96 primarios = 576 galletas',
    dimensions: '42 cm (largo) × 28 cm (ancho) × 28 cm (alto)',
    material: 'Cartón corrugado kraft de alta resistencia 100% reciclable',
    cierre: 'Cinta de seguridad para mayor protección',
    cost: 'S/ 149.60 por caja de transporte',
    costBreakdown: [
      { item: '12 empaques secundarios (12 × S/ 11.80)', amount: '12 packs (96 primarios)', cost: 'S/ 141.60' },
      { item: 'Caja de cartón corrugado', amount: '1 caja alta resistencia', cost: 'S/ 6.00' },
      { item: 'Separadores y protección interna', amount: 'Set de separadores', cost: 'S/ 1.50' },
      { item: 'Etiqueta / cinta de seguridad', amount: 'Insumo de sellado', cost: 'S/ 0.50' },
      { item: 'Costo Total de la caja terciaria', amount: '576 galletas', cost: 'S/ 149.60' },
    ],
    features: [
      'Medidas oficiales: 42 cm (largo) × 28 cm (ancho) × 28 cm (alto)',
      'Contenido total: 12 empaques secundarios (96 empaques primarios = 576 galletas)',
      'Distribución interna: 2 columnas × 2 filas × 3 niveles (2 × 2 × 3 = 12)',
      'Peso neto estimado por caja: aprox. 2.592 kg',
      'Estructura de costo total: S/ 149.60 (con caja kraft, separadores y precinto)',
    ],
    img: '/images/kraft-box.jpg',
    badge: '576 Galletas (Costo S/ 149.60)',
    badgeColor: 'bg-anavu-brown text-anavu-cream',
  },
  {
    id: 'pallet',
    level: 'Nivel Logístico (Pallet)',
    name: 'Pallet Mayorista B2B (Parihuela Estándar)',
    desc: 'Unidad de carga paletizada para almacenamiento y distribución a gran escala en centros logísticos y cadenas comerciales. Estiba estandarizada sobre parihuela de madera asegurada con film extensible.',
    capacity: '8 cajas terciarias = 96 secundarios = 768 primarios = 4,608 galletas',
    dimensions: '126 cm (largo) × 84 cm (ancho) × 56 cm (alto)',
    material: 'Parihuela de madera normalizada tratada para carga pesada y film stretch',
    cierre: 'Enzunchado industrial y film extensible de alta resistencia',
    cost: 'S/ 1,246.80 por pallet completo B2B',
    costBreakdown: [
      { item: '8 Cajas terciarias (8 × S/ 149.60)', amount: '8 cajas (4,608 galletas)', cost: 'S/ 1,196.80' },
      { item: 'Parihuela de madera normalizada', amount: '1 pallet estándar', cost: 'S/ 35.00' },
      { item: 'Film stretch y flejes de seguridad', amount: 'Embalaje logístico', cost: 'S/ 15.00' },
      { item: 'Costo Total del Pallet Logístico', amount: '4,608 galletas', cost: 'S/ 1,246.80' },
    ],
    features: [
      'Medidas oficiales de lámina: 126 cm largo × 84 cm ancho × 56 cm alto',
      'Capacidad de estiba: Cada pallet lleva exactamente 8 cajas terciarias',
      'Contenido total: 96 empaques secundarios (768 empaques primarios = 4,608 galletas)',
      'Apto para montacargas, transpaletas y estiba en almacenes centrales',
      'Costo logístico B2B completo: S/ 1,246.80',
    ],
    img: '/images/pallet-logistics.jpg',
    badge: 'Pallet Logístico (8 Cajas Terciarias)',
    badgeColor: 'bg-anavu-green text-anavu-cream',
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
          <span className="bg-anavu-yellow/30 text-anavu-brown font-extrabold px-4 py-1.5 rounded-full text-xs uppercase tracking-widest border border-anavu-yellow inline-block">
            Ingeniería de Empaques Oficial
          </span>
          <h2 className="text-3xl sm:text-5xl text-anavu-green" style={{ fontFamily: 'Shrikhand, cursive' }}>
            Empaque Primario, Secundario & Terciario
          </h2>
          <p className="text-sm sm:text-base text-anavu-darkgreen/80">
            Ficha técnica oficial: dimensiones, capacidades, materiales y desglose de costos de fabricación y transporte de Anávu.
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Visual Box */}
            <div className="lg:col-span-5 relative flex flex-col items-center">
              <div className="w-full h-72 sm:h-80 rounded-2xl overflow-hidden border-2 border-anavu-yellow/40 shadow-xl relative group bg-white flex items-center justify-center p-3">
                <img
                  src={current.img}
                  alt={current.name}
                  className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-105 drop-shadow-md"
                  loading="lazy"
                />
                <span className={`absolute top-4 left-4 ${current.badgeColor} text-xs font-bold px-3 py-1.5 rounded-full shadow`}>
                  {current.badge}
                </span>
              </div>

              {/* Price / Cost Tag Box */}
              <div className="w-full mt-4 p-4 rounded-2xl bg-anavu-yellow/20 border-2 border-anavu-yellow text-center">
                <span className="text-[10px] text-anavu-brown font-extrabold uppercase tracking-wider block">Costo Oficial Ficha Técnica</span>
                <span className="text-2xl font-bold text-anavu-green" style={{ fontFamily: 'Shrikhand, cursive' }}>
                  {current.cost}
                </span>
              </div>
            </div>

            {/* Technical Information & Costs Table */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-extrabold text-anavu-brown uppercase tracking-widest block">
                  {current.level}
                </span>
                <h3 className="text-2xl sm:text-3xl text-anavu-green mt-1" style={{ fontFamily: 'Shrikhand, cursive' }}>
                  {current.name}
                </h3>
                <p className="text-xs sm:text-sm text-anavu-darkgreen/80 mt-2 leading-relaxed">
                  {current.desc}
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white/90 border border-anavu-yellow/40 p-3 rounded-xl shadow-2xs">
                  <span className="text-[10px] text-anavu-brown font-extrabold uppercase tracking-wider block">Dimensiones Exactas</span>
                  <p className="text-xs font-bold text-anavu-green mt-0.5">{current.dimensions}</p>
                </div>
                <div className="bg-white/90 border border-anavu-yellow/40 p-3 rounded-xl shadow-2xs">
                  <span className="text-[10px] text-anavu-brown font-extrabold uppercase tracking-wider block">Capacidad / Contenido</span>
                  <p className="text-xs font-bold text-anavu-green mt-0.5">{current.capacity}</p>
                </div>
                <div className="bg-white/90 border border-anavu-yellow/40 p-3 rounded-xl shadow-2xs">
                  <span className="text-[10px] text-anavu-brown font-extrabold uppercase tracking-wider block">Material & Sustrato</span>
                  <p className="text-xs font-bold text-anavu-green mt-0.5">{current.material}</p>
                </div>
                <div className="bg-white/90 border border-anavu-yellow/40 p-3 rounded-xl shadow-2xs">
                  <span className="text-[10px] text-anavu-brown font-extrabold uppercase tracking-wider block">Tipo de Cierre</span>
                  <p className="text-xs font-bold text-anavu-green mt-0.5">{current.cierre}</p>
                </div>
              </div>

              {/* Cost Breakdown Table */}
              <div className="bg-white rounded-2xl border-2 border-anavu-yellow/40 overflow-hidden shadow-xs">
                <div className="bg-anavu-green text-anavu-cream px-4 py-2 flex items-center justify-between text-xs font-bold">
                  <span>Desglose de Costos de la Ficha</span>
                  <span className="text-anavu-yellow">{current.cost}</span>
                </div>
                <div className="max-h-48 overflow-y-auto">
                  <table className="w-full text-xs">
                    <tbody>
                      {current.costBreakdown.map((row, idx) => (
                        <tr key={idx} className="border-b border-slate-100 hover:bg-anavu-yellow/10">
                          <td className="px-4 py-1.5 font-bold text-anavu-green">{row.item}</td>
                          <td className="px-4 py-1.5 text-center text-slate-500">{row.amount}</td>
                          <td className="px-4 py-1.5 text-right font-bold text-anavu-brown">{row.cost}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Key Features List */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-extrabold text-anavu-green uppercase tracking-wider">
                  Especificaciones Técnicas:
                </h4>
                <ul className="space-y-1 text-xs text-anavu-darkgreen/85">
                  {current.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-anavu-yellow/40 text-anavu-green flex items-center justify-center shrink-0 mt-0.5 text-[9px] font-bold">
                        ✓
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
