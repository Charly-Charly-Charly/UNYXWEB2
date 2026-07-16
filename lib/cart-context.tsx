"use client"

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react"
import { createCart, addToCart, removeFromCart, fetchCart, type Cart } from "./shopify"

type CartContextType = {
  cart: Cart | null
  open: boolean
  setOpen: (v: boolean) => void
  addItem: (variantId: string) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
  itemCount: number
  loading: boolean
}

const CartContext = createContext<CartContextType | null>(null)

const CART_ID_KEY = "unyx_cart_id"

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const savedId = localStorage.getItem(CART_ID_KEY)
    if (savedId) {
      fetchCart(savedId).then((c) => {
        if (c) setCart(c)
        else localStorage.removeItem(CART_ID_KEY)
      })
    }
  }, [])

  const addItem = useCallback(async (variantId: string) => {
    setLoading(true)
    try {
      let updatedCart: Cart
      const cartId = localStorage.getItem(CART_ID_KEY)
      if (cartId) {
        updatedCart = await addToCart(cartId, variantId)
      } else {
        updatedCart = await createCart(variantId)
        localStorage.setItem(CART_ID_KEY, updatedCart.id)
      }
      setCart(updatedCart)
      setOpen(true)
    } finally {
      setLoading(false)
    }
  }, [])

  const removeItem = useCallback(async (lineId: string) => {
    if (!cart) return
    setLoading(true)
    try {
      const updatedCart = await removeFromCart(cart.id, lineId)
      setCart(updatedCart)
    } finally {
      setLoading(false)
    }
  }, [cart])

  const itemCount = cart?.lines.edges.reduce((sum, e) => sum + e.node.quantity, 0) ?? 0

  return (
    <CartContext.Provider value={{ cart, open, setOpen, addItem, removeItem, itemCount, loading }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
