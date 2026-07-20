import { Text } from "@modules/common/components/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region: _region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group block">
      <div 
        data-testid="product-wrapper" 
        className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      >
        {/* Image Container */}
        <div className="relative aspect-square bg-gradient-to-br from-[#FAF8F2] to-[#F5E1C8] overflow-hidden">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
          />
          
          {/* Badge */}
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white text-xs font-semibold rounded-full shadow-md">
              🛒 Best Seller
            </span>
          </div>

          {/* Hover Overlay - Shows "View Details" */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-6">
            <span className="px-6 py-2.5 bg-white text-[#8B4513] rounded-full font-semibold text-sm shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              View Details →
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 
            className="font-semibold text-[#2B2B2B] mb-2 line-clamp-1 group-hover:text-[#8B4513] transition-colors" 
            data-testid="product-title"
          >
            {product.title}
          </h3>
          
          {/* Description */}
          {product.description && (
            <p className="text-sm text-[#666666] mb-3 line-clamp-2">
              {product.description}
            </p>
          )}

          {/* Price and Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
            </div>
            <span className="px-2.5 py-1 bg-[#4E8B41]/10 text-[#4E8B41] text-xs font-medium rounded-full">
              ✓ In Stock
            </span>
          </div>

          {/* View Product Link */}
          <div className="mt-4 text-center">
            <span className="text-sm font-medium text-[#8B4513] group-hover:underline">
              View Product & Add to Cart →
            </span>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
