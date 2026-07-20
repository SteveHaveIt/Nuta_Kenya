import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Heading } from "@modules/common/components/ui"
import { Button } from "@modules/common/components/ui"

type Product = {
  id: string
  title: string
  handle: string
  thumbnail?: string
  variants: HttpTypes.StoreProductVariant[]
}

type BestSellersProps = {
  products: Product[]
}

const ProductCard = ({ product }: { product: Product }) => {
  const variant = product.variants?.[0]
  const price = variant?.prices?.[0]
  const formattedPrice = price?.amount 
    ? new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(price.amount / 100)
    : 'Price TBD'

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
              alt={product.title}
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

          {/* Quick Actions */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <Button className="bg-white text-[#8B4513] hover:bg-[#8B4513] hover:text-white rounded-full px-6 py-2 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
              Quick View
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-[#2C1810] mb-2 group-hover:text-[#8B4513] transition-colors line-clamp-1">
            {product.title}
          </h3>
          
          {/* Rating placeholder */}
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-[#D4A574]">★</span>
            ))}
            <span className="text-xs text-[#5C4033] ml-2">(128 reviews)</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-[#8B4513]">
              {formattedPrice}
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
              In Stock
            </span>
          </div>

          <Button className="w-full mt-4 bg-[#8B4513] hover:bg-[#6B3410] text-white rounded-full py-3 text-sm font-medium transition-colors">
            Add to Cart
          </Button>
        </div>
      </div>
    </LocalizedClientLink>
  )
}

export default function BestSellers({ products }: BestSellersProps) {
  // If no products, show placeholder cards
  const displayProducts = products.length > 0 ? products.slice(0, 4) : [
    { id: '1', title: 'Creamy Peanut Butter', handle: 'creamy-peanut-butter', variants: [{ prices: [{ amount: 150000 }] }] },
    { id: '2', title: 'Crunchy Peanut Butter', handle: 'crunchy-peanut-butter', variants: [{ prices: [{ amount: 150000 }] }] },
    { id: '3', title: 'Roasted Peanuts 500g', handle: 'roasted-peanuts', variants: [{ prices: [{ amount: 80000 }] }] },
    { id: '4', title: 'Peanut Butter Gift Pack', handle: 'peanut-butter-gift-pack', variants: [{ prices: [{ amount: 350000 }] }] },
  ]

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
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
