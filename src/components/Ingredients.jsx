const ingredients = [
  {
    emoji: '🍋',
    name: 'Maracuyá Natural',
    desc: 'Extraemos la pulpa directamente de frutas seleccionadas del trópico peruano para mantener su nivel perfecto de acidez cítrica, aroma intenso y semillas naturales.',
  },
  {
    emoji: '🌾',
    name: 'Hojuelas de Avena',
    desc: 'Avena en hojuelas integrales seleccionadas que aportan la textura crujiente característica y fibra natural que tu cuerpo necesita. 4.2g de fibra dietaria por porción.',
  },
  {
    emoji: '🍯',
    name: 'Miel de Abeja Pura',
    desc: 'Endulzado sutilmente con miel de abeja pura de apicultores locales para equilibrar la acidez cítrica con un toque dorado irresistible. Sin azúcar refinada.',
  },
]

export default function Ingredients() {
  return (
    <section id="ingredientes" className="py-20 border-b border-anavu-yellow/30 bg-anavu-cream relative overflow-hidden">
      <div className="absolute top-20 left-0 w-72 h-72 bg-anavu-lightyellow/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16 animate-fade-in-up">
          <span className="text-anavu-brown font-extrabold uppercase tracking-widest text-xs">Nutrición & Sabor</span>
          <h2 className="text-3xl sm:text-5xl text-anavu-green" style={{ fontFamily: 'Shrikhand, cursive' }}>
            Ingredientes Seleccionados
          </h2>
          <p className="text-xs sm:text-sm text-anavu-darkgreen/70">
            Insumos 100% naturales sin preservantes, colorantes ni saborizantes artificiales. Sin grasas trans.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ingredients.map((ing, i) => (
            <div key={i} className={`glass p-8 rounded-3xl border-2 border-anavu-yellow/60 text-center space-y-4 shadow-md card-hover animate-fade-in-up stagger-${i+1}`}>
              <div className="w-20 h-20 bg-anavu-yellow/20 rounded-2xl flex items-center justify-center text-5xl mx-auto">
                {ing.emoji}
              </div>
              <h3 className="text-2xl text-anavu-green" style={{ fontFamily: 'Shrikhand, cursive' }}>{ing.name}</h3>
              <p className="text-xs text-anavu-darkgreen/70 leading-relaxed">{ing.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
