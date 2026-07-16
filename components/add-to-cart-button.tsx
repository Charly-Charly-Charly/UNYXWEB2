"use client"

import { ShoppingCart, Loader2 } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useState } from "react"

export function AddToCartButton({ variantId }: { variantId: string }) {
  const { addItem } = useCart()
  const [busy, setBusy] = useState(false)

  async function handleClick() {
    setBusy(true)
    try {
      await addItem(variantId)
    } finally {
      setBusy(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={busy}
      className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
    >
      {busy ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <ShoppingCart className="size-4" />
      )}
      Agregar
    </button>
  )
}
