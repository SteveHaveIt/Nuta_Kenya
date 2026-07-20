import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Heading } from "@modules/common/components/ui"
import { Button } from "@modules/common/components/ui"

type Product = HttpTypes.StoreProduct
type Region = HttpTypes.StoreRegion | null

type BestSellersProps = {
  products: Product[]
  region?: Region | null
}

function formatPrice(amount: number, currency: string = "KES"): string {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

function getProductPrice(product: Product, region?: Region | null) {
  const variant = product.variants?.[0]
  if (!variant) return null

  const price = variant.calculated_price || variant.prices?.[0]
  
  if (!price) return null

  // Get currency from region or use default
  const currency = region?.currency_code?.toUpperCase() || "KES"
  
  // Handle different price formats
  let amount: number
  if (typeof price === "object" && "amount" in price) {
    amount = (price as { amount: number }).amount
  } else {
    amount = variant.prices?.[0]?.amount || 0
  }

  return {
    formatted: formatPrice(amount / 100, currency),
    amount,
    currency,
  }
}

function isInStock(product: Product): boolean {
  const variant = product.variants?.[0]
  if (!variant) return true // Default to in stock if we can't determine
  
  const quantity = variant.inventory_quantity
  return quantity === undefined || quantity > 0
}

const ProductCard = ({ product, region }: { product: Product; region?: Region | null }) => {
  const priceInfo = getProductPrice(product, region)
  const inStock = isInStock(product)

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group block"
    >
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-square bg-gradient-to-br from-[#FFF8F0] to-[#FAF0E6] overflow-hidden">
          {product.thumbnail ? (
            <img
              src={product.thumbnail}
              alt={product.title || "Product"}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-6xl">🥜</span>
            </div>
          )}
          
          {/* Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-[#8B4513] text-white text-xs font-medium rounded-full">
              Best Seller
            </span>
          </div>

          {/* Out of Stock Overlay */}
          {!inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="px-4 py-2 bg-white text-[#8B4513] font-medium rounded-full">
                Out of Stock
              </span>
            </div>
          )}

          {/* Quick Actions */}
          {inStock && (
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Button className="bg-white text-[#8B4513] hover:bg-[#8B4513] hover:text-white rounded-full px-6 py-2 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                Quick View
              </Button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-[#2C1810] mb-2 group-hover:text-[#8B4513] transition-colors line-clamp-1">
            {product.title || "Product"}
          </h3>

          {/* Description if available */}
          {product.description && (
            <p className="text-sm text-[#5C4033] mb-3 line-clamp-2">
              {product.description}
            </p>
          )}
          
          {/* Price */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xl font-bold text-[#8B4513]">
              {priceInfo?.formatted || "Price TBD"}
            </span>
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
              inStock 
                ? "bg-green-100 text-green-700" 
                : "bg-gray-100 text-gray-600"
            }`}>
              {inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          {inStock && (
            <Button className="w-full mt-2 bg-[#8B4513] hover:bg-[#6B3410] text-white rounded-full py-3 text-sm font-medium transition-colors">
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </LocalizedClientLink>
  )
}

export default function BestSellers({ products, region }: BestSellersProps) {
  // If no products from backend, show empty state message
  const displayProducts = products.length > 0 ? products.slice(0, 4) : []

  // Don't render section if no products
  if (displayProducts.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <span className="text-[#8B4513] font-medium text-sm tracking-wide uppercase">
                Top Picks for You
              </span>
              <Heading level="h2" className="text-3xl md:text-4xl font-bold text-[#2C1810] mt-3">
                Best Sellers
              </Heading>
            </div>
          </div>
          <div className="text-center py-12 bg-gradient-to-br from-[#FFF8F0] to-[#FAF0E6] rounded-3xl">
            <span className="text-5xl mb-4 block">🥜</span>
            <p className="text-[#5C4033] text-lg">
              Best sellers coming soon! Check back later for our top products.
            </p>
            <LocalizedClientLink href="/store" className="mt-4 inline-block">
              <Button className="bg-[#8B4513] hover:bg-[#6B3410] text-white px-6 py-2 rounded-full">
                Browse All Products
              </Button>
            </LocalizedClientLink>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="text-[#8B4513] font-medium text-sm tracking-wide uppercase">
              Top Picks for You
            </span>
            <Heading level="h2" className="text-3xl md:text-4xl font-bold text-[#2C1810] mt-3">
              Best Sellers
            </Heading>
          </div>
          <LocalizedClientLink href="/store" className="mt-4 md:mt-0">
            <Button 
              variant="secondary" 
              className="border-2 border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513]/10 px-6 py-2 rounded-full transition-all"
            >
              View All Products
            </Button>
          </LocalizedClientLink>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} region={region} />
          ))}
        </div>
      </div>
    </section>
  )
}
