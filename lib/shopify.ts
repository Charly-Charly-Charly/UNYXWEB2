const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? ""
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN ?? ""
const endpoint = `https://${domain}/api/2024-10/graphql.json`

export type ShopifyProduct = {
  id: string
  handle: string
  title: string
  description: string
  vendor: string
  productType: string
  tags: string[]
  featuredImage: { url: string; altText: string | null } | null
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } }
  variants: {
    edges: {
      node: {
        id: string
        title: string
        price: { amount: string; currencyCode: string }
        availableForSale: boolean
      }
    }[]
  }
}

export type CartLine = {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    price: { amount: string; currencyCode: string }
    product: { title: string; featuredImage: { url: string } | null }
  }
}

export type Cart = {
  id: string
  checkoutUrl: string
  lines: { edges: { node: CartLine }[] }
  cost: { totalAmount: { amount: string; currencyCode: string } }
}

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  })
  const json = await res.json()
  if (json.errors) throw new Error(json.errors[0].message)
  return json.data as T
}

const PRODUCTS_QUERY = `
  query Products($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          handle
          title
          description
          vendor
          productType
          tags
          featuredImage { url altText }
          priceRange { minVariantPrice { amount currencyCode } }
          variants(first: 1) {
            edges {
              node {
                id
                title
                price { amount currencyCode }
                availableForSale
              }
            }
          }
        }
      }
    }
  }
`

export async function getProducts(first = 12): Promise<ShopifyProduct[]> {
  if (!domain || !token) return []
  const data = await shopifyFetch<{ products: { edges: { node: ShopifyProduct }[] } }>(
    PRODUCTS_QUERY,
    { first },
  )
  return data.products.edges.map((e) => e.node)
}

const CART_CREATE = `
  mutation CartCreate($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart { id checkoutUrl
        lines(first: 20) { edges { node {
          id quantity
          merchandise { ... on ProductVariant {
            id title price { amount currencyCode }
            product { title featuredImage { url } }
          }}
        }}}
        cost { totalAmount { amount currencyCode } }
      }
    }
  }
`

const CART_LINES_ADD = `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { id checkoutUrl
        lines(first: 20) { edges { node {
          id quantity
          merchandise { ... on ProductVariant {
            id title price { amount currencyCode }
            product { title featuredImage { url } }
          }}
        }}}
        cost { totalAmount { amount currencyCode } }
      }
    }
  }
`

const CART_LINES_REMOVE = `
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { id checkoutUrl
        lines(first: 20) { edges { node {
          id quantity
          merchandise { ... on ProductVariant {
            id title price { amount currencyCode }
            product { title featuredImage { url } }
          }}
        }}}
        cost { totalAmount { amount currencyCode } }
      }
    }
  }
`

const CART_QUERY = `
  query Cart($cartId: ID!) {
    cart(id: $cartId) {
      id checkoutUrl
      lines(first: 20) { edges { node {
        id quantity
        merchandise { ... on ProductVariant {
          id title price { amount currencyCode }
          product { title featuredImage { url } }
        }}
      }}}
      cost { totalAmount { amount currencyCode } }
    }
  }
`

export async function createCart(variantId: string): Promise<Cart> {
  const data = await shopifyFetch<{ cartCreate: { cart: Cart } }>(CART_CREATE, {
    lines: [{ merchandiseId: variantId, quantity: 1 }],
  })
  return data.cartCreate.cart
}

export async function addToCart(cartId: string, variantId: string): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: Cart } }>(CART_LINES_ADD, {
    cartId,
    lines: [{ merchandiseId: variantId, quantity: 1 }],
  })
  return data.cartLinesAdd.cart
}

export async function removeFromCart(cartId: string, lineId: string): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: Cart } }>(CART_LINES_REMOVE, {
    cartId,
    lineIds: [lineId],
  })
  return data.cartLinesRemove.cart
}

export async function fetchCart(cartId: string): Promise<Cart | null> {
  const data = await shopifyFetch<{ cart: Cart | null }>(CART_QUERY, { cartId })
  return data.cart
}

export function formatPrice(amount: string, currencyCode: string): string {
  const num = parseFloat(amount)
  if (currencyCode === "GTQ") {
    return `Q${num.toLocaleString("es-GT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }
  return new Intl.NumberFormat("es-GT", { style: "currency", currency: currencyCode }).format(num)
}
