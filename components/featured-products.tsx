import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { getProducts, formatPrice, type ShopifyProduct } from "@/lib/shopify"
import { products as mockProducts } from "@/lib/products"
import { AddToCartButton } from "./add-to-cart-button"

type DisplayProduct = {
  id: string
  variantId: string | null
  name: string
  brand: string
  category: string
  price: string
  image: string
  tag?: string
  description: string
}

function shopifyToDisplay(p: ShopifyProduct): DisplayProduct {
  const variant = p.variants.edges[0]?.node
  return {
    id: p.id,
    variantId: variant?.id ?? null,
    name: p.title,
    brand: p.vendor,
    category: p.productType,
    price: variant
      ? formatPrice(variant.price.amount, variant.price.currencyCode)
      : formatPrice(p.priceRange.minVariantPrice.amount, p.priceRange.minVariantPrice.currencyCode),
    image: p.featuredImage?.url ?? "/placeholder.svg",
    tag: p.tags[0],
    description: p.description,
  }
}

function mockToDisplay(p: (typeof mockProducts)[number]): DisplayProduct {
  return { ...p, variantId: null }
}

export async function FeaturedProducts() {
  const shopifyProducts = await getProducts(6)
  const items: DisplayProduct[] =
    shopifyProducts.length > 0
      ? shopifyProducts.map(shopifyToDisplay)
      : mockProducts.map(mockToDisplay)

  const usingShopify = shopifyProducts.length > 0

  return (
    <section id="productos" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-accent">Selección</p>
          <h2 className="mt-2 text-balance font-serif text-4xl font-semibold text-foreground md:text-5xl">
            Productos destacados
          </h2>
        </div>
        <p className="max-w-sm text-pretty leading-relaxed text-muted-foreground">
          Lo esencial para tu escritorio y tu mochila, probado y aprobado por nuestro equipo.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((product) => (
          <article
            key={product.id}
            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {product.tag && (
                <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                  {product.tag}
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  {product.brand} · {product.category}
                </span>
              </div>
              <h3 className="mt-2 font-serif text-xl font-semibold text-foreground">
                {product.name}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>
              <div className="mt-5 flex items-center justify-between">
                <span className="font-serif text-lg font-semibold text-foreground">
                  {product.price}
                </span>
                {usingShopify && product.variantId ? (
                  <AddToCartButton variantId={product.variantId} />
                ) : (
                  <a
                    href="#contacto"
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-accent"
                  >
                    Consultar
                    <ArrowUpRight className="size-4" />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
