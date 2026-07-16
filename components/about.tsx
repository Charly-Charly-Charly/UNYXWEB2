import Image from "next/image"
import { ShieldCheck, Truck, Headphones } from "lucide-react"

const features = [
  {
    icon: ShieldCheck,
    title: "Garantía real",
    description: "Hasta 24 meses de garantía y soporte directo con la marca.",
  },
  {
    icon: Truck,
    title: "Envío a todo el país",
    description: "Despacho en 24-48h y seguimiento en cada pedido.",
  },
  {
    icon: Headphones,
    title: "Asesoría experta",
    description: "Te ayudamos a elegir el accesorio correcto para tu setup.",
  },
]

export function About() {
  return (
    <section id="nosotros" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
          <Image
            src="/products/desk-setup.png"
            alt="Escritorio de trabajo con accesorios de tecnología"
            fill
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-accent">Sobre nosotros</p>
          <h2 className="mt-2 text-balance font-serif text-4xl font-semibold leading-tight text-foreground md:text-5xl">
            Tecnología que dura, elegida con criterio
          </h2>
          <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
            En Unyx creemos que un buen accesorio no se nota: simplemente
            funciona, día tras día. Por eso seleccionamos cada producto pensando
            en durabilidad, rendimiento y diseño. Trabajamos principalmente con
            Ugreen, una marca reconocida mundialmente por su ingeniería confiable.
          </p>

          <div className="mt-10 grid gap-6">
            {features.map((f) => (
              <div key={f.title} className="flex gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                  <f.icon className="size-5" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{f.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
