"use client"

import Image from "next/image"
import { X, ShoppingBag, Trash2, ArrowRight, Loader2 } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { formatPrice } from "@/lib/shopify"

export function CartDrawer() {
  const { cart, open, setOpen, removeItem, loading } = useCart()

  const lines = cart?.lines.edges.map((e) => e.node) ?? []
  const total = cart?.cost.totalAmount

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-background shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <div className="flex items-center gap-2">
            <ShoppingBag className="size-5 text-foreground" />
            <h2 className="font-serif text-lg font-semibold text-foreground">Tu carrito</h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Cerrar carrito"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Lines */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {lines.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
              <ShoppingBag className="size-12 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">Tu carrito está vacío</p>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {lines.map((line) => (
                <li key={line.id} className="flex gap-4">
                  {line.merchandise.product.featuredImage && (
                    <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                      <Image
                        src={line.merchandise.product.featuredImage.url}
                        alt={line.merchandise.product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground leading-snug">
                        {line.merchandise.product.title}
                      </p>
                      {line.merchandise.title !== "Default Title" && (
                        <p className="text-xs text-muted-foreground">{line.merchandise.title}</p>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-foreground">
                        {formatPrice(line.merchandise.price.amount, line.merchandise.price.currencyCode)}
                      </span>
                      <button
                        onClick={() => removeItem(line.id)}
                        disabled={loading}
                        className="rounded p-1 text-muted-foreground transition-colors hover:text-destructive disabled:opacity-40"
                        aria-label="Eliminar"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {lines.length > 0 && total && (
          <div className="border-t border-border px-6 py-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="font-serif text-xl font-semibold text-foreground">
                {formatPrice(total.amount, total.currencyCode)}
              </span>
            </div>
            <a
              href={cart?.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <>
                  Ir al checkout
                  <ArrowRight className="size-4" />
                </>
              )}
            </a>
            <p className="text-center text-xs text-muted-foreground">
              Pago seguro vía Shopify · Tarjetas · Transferencia
            </p>
          </div>
        )}
      </div>
    </>
  )
}
