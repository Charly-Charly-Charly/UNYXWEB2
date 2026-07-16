import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { categories } from "@/lib/products"

export function Categories() {
  return (
    <section id="categorias" className="bg-secondary">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-accent">Explora</p>
            <h2 className="mt-2 text-balance font-serif text-4xl font-semibold text-foreground md:text-5xl">
              Categorías
            </h2>
          </div>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <a
              key={cat.name}
              href={cat.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-4 overflow-hidden rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent"
            >
              <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                <Image src={cat.image || "/placeholder.svg"} alt={cat.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-lg font-semibold text-foreground">{cat.name}</h3>
                <p className="text-sm text-muted-foreground">{cat.count} productos</p>
              </div>
              <ArrowRight className="size-5 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-accent" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
