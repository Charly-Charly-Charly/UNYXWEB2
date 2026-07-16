export type Product = {
  id: string
  name: string
  brand: string
  category: string
  price: string
  image: string
  tag?: string
  description: string
}

export const products: Product[] = [
  {
    id: "gan-65w",
    name: "Cargador GaN 65W",
    brand: "Ugreen",
    category: "Cargadores",
    price: "Q269.00",
    image: "/products/charger.png",
    tag: "Más vendido",
    description: "Carga rápida para laptop, tablet y teléfono desde un solo puerto compacto.",
  },
  {
    id: "cable-usbc-100w",
    name: "Cable USB-C 100W Trenzado",
    brand: "Ugreen",
    category: "Cables",
    price: "Q99.00",
    image: "/products/cable.png",
    description: "Nylon trenzado de alta resistencia con transferencia de datos a 480 Mbps.",
  },
  {
    id: "powerbank-20000",
    name: "Power Bank 20.000 mAh",
    brand: "Ugreen",
    category: "Power Banks",
    price: "Q349.00",
    image: "/products/powerbank.png",
    tag: "Nuevo",
    description: "Pantalla digital y carga rápida de 100W para mantener todo encendido.",
  },
  {
    id: "mouse-ergo",
    name: "Mouse Ergonómico Vertical",
    brand: "Ugreen",
    category: "Mouses",
    price: "Q189.00",
    image: "/products/mouse.png",
    description: "Diseño vertical que reduce la tensión de muñeca en jornadas largas.",
  },
  {
    id: "hub-usbc",
    name: "Hub USB-C 6 en 1",
    brand: "Ugreen",
    category: "Hubs",
    price: "Q299.00",
    image: "/products/hub.png",
    description: "HDMI 4K, lectura SD y tres puertos USB para expandir tu laptop.",
  },
  {
    id: "earbuds",
    name: "Audífonos Inalámbricos",
    brand: "Ugreen",
    category: "Audio",
    price: "Q229.00",
    image: "/products/earbuds.png",
    description: "Cancelación de ruido y estuche de carga compacto para todo el día.",
  },
]

export const categories = [
  { name: "Cargadores", count: 24, image: "/products/charger.png" },
  { name: "Cables", count: 38, image: "/products/cable.png" },
  { name: "Power Banks", count: 16, image: "/products/powerbank.png" },
  { name: "Mouses ergonómicos", count: 12, image: "/products/mouse.png" },
  { name: "Hubs y docks", count: 19, image: "/products/hub.png" },
  { name: "Audio", count: 14, image: "/products/earbuds.png" },
]
