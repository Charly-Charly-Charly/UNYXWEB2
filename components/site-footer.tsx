const columns = [
  {
    title: "Productos",
    links: ["Cargadores", "Cables", "Power Banks", "Mouses", "Hubs", "Audio"],
  },
  {
    title: "Empresa",
    links: ["Nosotros", "Marcas", "Garantía", "Envíos"],
  },
  {
    title: "Contacto",
    links: ["hola@nexvolt.com", "+502 1234 5678", "Ciudad de Guatemala"],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <p className="font-serif text-2xl font-semibold text-foreground">
Un<span className="text-accent">yx</span>
            </p>
            <p className="mt-4 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
              Accesorios de tecnología premium. Distribuidor autorizado Ugreen.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-medium text-foreground">{col.title}</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Unyx. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-foreground">
              Términos
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Privacidad
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
