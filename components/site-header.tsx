"use client";

import { useEffect, useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import Image from "next/image";

const links = [
  { label: "Productos", href: "#productos" },
  { label: "Categorías", href: "#categorias" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Marcas", href: "#marcas" },
  { label: "Contacto", href: "#contacto" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { itemCount, setOpen: setCartOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        solid
          ? "border-white/10 bg-primary/95 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#"
          className="font-serif text-2xl font-semibold tracking-tight text-primary-foreground"
        >
          <Image
            src="/unyx-logo.png"
            className="invert"
            width={70}
            height={70}
            alt="Unyx Logo"
          />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white transition-colors hover:underline hover:underline-offset-4 hover:transition-all hover:duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#contacto"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            Tienda
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-primary-foreground md:hidden"
          aria-label="Abrir menú"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-primary md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-sm text-primary-foreground/70 hover:bg-white/10 hover:text-primary-foreground"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-accent px-5 py-3 text-center text-sm font-medium text-accent-foreground"
            >
              Cotizar
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
