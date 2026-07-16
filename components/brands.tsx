const brands = ["Ugreen", "Anker", "Baseus", "Logitech", "Hyper", "Belkin"]

export function Brands() {
  return (
    <section id="marcas" className="border-y border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-xs uppercase tracking-widest text-accent">Marcas y partners</p>
          <h2 className="text-balance font-serif text-3xl font-semibold md:text-4xl">
            Trabajamos con las mejores marcas de tecnología
          </h2>
          <p className="max-w-lg text-pretty leading-relaxed text-primary-foreground/70">
            Somos distribuidor autorizado Ugreen y ofrecemos productos seleccionados
            de marcas líderes en accesorios y conectividad.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-primary-foreground/10 bg-primary-foreground/10 sm:grid-cols-3 lg:grid-cols-6">
          {brands.map((brand) => (
            <div
              key={brand}
              className="flex items-center justify-center bg-primary px-6 py-8 font-serif text-xl font-semibold text-primary-foreground/80 transition-colors hover:text-accent"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
