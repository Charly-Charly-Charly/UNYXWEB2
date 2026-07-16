import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ShaderBackground } from "@/components/shader-background";

export function Hero() {
  return (
    <section className="relative -mt-20 overflow-hidden bg-primary pt-20 text-primary-foreground">
      <ShaderBackground />
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
        <div>
          <h1 className="mt-6 text-balance text-white font-serif text-5xl font-semibold leading-[1.05] md:text-6xl lg:text-7xl">
            Carga, conecta y trabaja <span className="text-white">mejor.</span>
          </h1>
          <p className="mt-6 max-w-md text-pretty leading-relaxed text-white">
            Accesorios de tecnología seleccionados con criterio. Cargadores GaN,
            cables de alta resistencia, power banks y periféricos ergonómicos
            que duran de verdad.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#productos"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90"
            >
              Ver productos
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#nosotros"
              className="inline-flex items-center gap-2 rounded-full border border-white px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/70"
            >
              Conócenos
            </a>
          </div>

          <div className="mt-12 flex gap-10 text-white">
            {[
              { value: "120+", label: "Productos" },
              { value: "10k+", label: "Clientes" },
              { value: "24 meses", label: "Garantía" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-3xl font-semibold text-white">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-white">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[380px] md:min-h-[460px]">
          <div className="absolute inset-0 -z-0 rounded-full bg-accent/10 blur-3xl" />

          <div
            className="animate-float absolute left-0 top-2 aspect-square w-36 overflow-hidden  md:w-64 drop-shadow-[5px_5px_10px_rgba(0,0,0,0.75)]"
            style={
              {
                animationDelay: "0s",
                "--float-rotate": "-6deg",
              } as React.CSSProperties
            }
          >
            <Image
              src="/products/fl1.png"
              alt="Cargador GaN premium Ugreen"
              fill
              priority
              className="object-cover"
            />
          </div>

          <div
            className="animate-float absolute right-4 top-24 aspect-square w-44 overflow-hidden  md:w-64  drop-shadow-[5px_5px_10px_rgba(0,0,0,0.75)]"
            style={
              {
                animationDelay: "1.2s",
                "--float-rotate": "4deg",
              } as React.CSSProperties
            }
          >
            <Image
              src="/products/fl2.png"
              alt="Audífonos inalámbricos"
              fill
              className="object-cover"
            />
          </div>

          <div
            className="animate-float absolute bottom-0 left-16 aspect-square w-32 overflow-hidden md:w-64  drop-shadow-[5px_5px_10px_rgba(0,0,0,0.75)]"
            style={
              {
                animationDelay: "2.4s",
                "--float-rotate": "3deg",
              } as React.CSSProperties
            }
          >
            <Image
              src="/products/fl3.png"
              alt="Power bank portátil"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
