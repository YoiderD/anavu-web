export default function NutritionTable() {
  const rows = [
    { nutrient: 'Energía', per100g: '400 kcal', perServing: '240 kcal', vd: '12%' },
    { nutrient: 'Proteínas', per100g: '10g', perServing: '6g', vd: '12%' },
    { nutrient: 'Grasas Totales', per100g: '15g', perServing: '9g', vd: '14%' },
    { nutrient: 'Grasas Saturadas', per100g: '5g', perServing: '3g', vd: '15%' },
    { nutrient: 'Grasas Trans', per100g: '0g', perServing: '0g', vd: '—' },
    { nutrient: 'Carbohidratos', per100g: '58g', perServing: '35g', vd: '12%' },
    { nutrient: 'Azúcares Totales', per100g: '18g', perServing: '11g', vd: '—' },
    { nutrient: 'Fibra Dietaria', per100g: '7g', perServing: '4.2g', vd: '17%' },
    { nutrient: 'Sodio', per100g: '200mg', perServing: '120mg', vd: '5%' },
  ]

  return (
    <section id="nutricion" className="py-20 border-b border-anavu-yellow/30 bg-gradient-to-b from-anavu-cream to-anavu-oat/30 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12 animate-fade-in-up">
          <span className="text-anavu-brown font-extrabold uppercase tracking-widest text-xs">Información Nutricional</span>
          <h2 className="text-3xl sm:text-5xl text-anavu-green" style={{ fontFamily: 'Shrikhand, cursive' }}>
            Tabla Nutricional
          </h2>
          <p className="text-xs sm:text-sm text-anavu-darkgreen/70">Porción: 60g (1 paquete individual = 6 galletas)</p>
        </div>

        <div className="glass rounded-3xl border-2 border-anavu-yellow overflow-hidden shadow-xl animate-fade-in-up stagger-2">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-anavu-green text-anavu-cream">
                  <th className="text-left px-6 py-4 font-extrabold text-xs uppercase tracking-wider">Nutriente</th>
                  <th className="text-center px-4 py-4 font-extrabold text-xs uppercase tracking-wider">Por 100g</th>
                  <th className="text-center px-4 py-4 font-extrabold text-xs uppercase tracking-wider">Por Porción (60g)</th>
                  <th className="text-center px-4 py-4 font-extrabold text-xs uppercase tracking-wider">% VD*</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className={`border-b border-anavu-yellow/20 transition-colors hover:bg-anavu-yellow/10 ${r.nutrient === 'Grasas Trans' ? 'bg-anavu-lushgreen/5' : ''}`}>
                    <td className="px-6 py-3 font-bold text-anavu-green text-xs">
                      {r.nutrient}
                      {r.nutrient === 'Grasas Trans' && <span className="ml-2 text-[9px] bg-anavu-lushgreen text-white px-1.5 py-0.5 rounded-full">0g ✓</span>}
                    </td>
                    <td className="text-center px-4 py-3 text-anavu-darkgreen/80 text-xs">{r.per100g}</td>
                    <td className="text-center px-4 py-3 font-bold text-anavu-green text-xs">{r.perServing}</td>
                    <td className="text-center px-4 py-3 text-anavu-brown font-bold text-xs">{r.vd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 bg-anavu-yellow/10 border-t border-anavu-yellow/30">
            <p className="text-[10px] text-anavu-darkgreen/60">* Valores Diarios con base en una dieta de 2000 kcal. Sus valores diarios pueden ser mayores o menores dependiendo de sus necesidades calóricas.</p>
          </div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { value: '240', unit: 'kcal', label: 'Por porción' },
            { value: '6g', unit: '', label: 'Proteína' },
            { value: '4.2g', unit: '', label: 'Fibra' },
            { value: '0g', unit: '', label: 'Grasas Trans' },
          ].map((h, i) => (
            <div key={i} className={`glass p-4 rounded-2xl text-center card-hover animate-fade-in-up stagger-${i+1}`}>
              <p className="text-2xl text-anavu-green font-bold" style={{ fontFamily: 'Shrikhand, cursive' }}>{h.value}{h.unit}</p>
              <p className="text-[10px] font-extrabold text-anavu-brown uppercase tracking-wider">{h.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
