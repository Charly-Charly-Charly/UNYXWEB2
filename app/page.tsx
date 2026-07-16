import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { FeaturedProducts } from "@/components/featured-products"
import { Categories } from "@/components/categories"
import { About } from "@/components/about"
import { Brands } from "@/components/brands"
import { Contact } from "@/components/contact"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <Hero />
      <FeaturedProducts />
      <Categories />
      <About />
      <Brands />
      <Contact />
      <SiteFooter />
    </main>
  )
}
