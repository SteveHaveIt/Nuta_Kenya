import { Suspense } from "react"

import { OptionValueIds } from "@lib/util/product-option-filters"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
  optionValueIds,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  optionValueIds?: OptionValueIds
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF8F2] to-white">
      {/* Store Header */}
      <div className="bg-gradient-to-r from-[#8B4513] via-[#A0522D] to-[#8B4513] py-12 px-4 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#D4A017] rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#4E8B41] rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 text-white text-sm font-medium rounded-full mb-4">
              <span>🛒</span> Browse Our Collection
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3" data-testid="store-page-title">
              Shop Premium Products
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto">
              Discover our range of naturally nutritious peanut products, 
              carefully crafted in Kenya with love.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-8">
        <div
          className="flex flex-col lg:flex-row gap-8"
          data-testid="category-container"
        >
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-soft p-6 sticky top-24">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#E8D5C4]">
                <span className="w-10 h-10 bg-[#8B4513] rounded-xl flex items-center justify-center text-white text-lg">🥜</span>
                <span className="font-bold text-[#2B2B2B]">Filters</span>
              </div>
              <RefinementList sortBy={sort} />
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 bg-[#D4A017] rounded-xl flex items-center justify-center text-white font-bold">📦</span>
                <div>
                  <p className="font-semibold text-[#2B2B2B]">Fresh Products</p>
                  <p className="text-sm text-[#666666]">100% Natural • Locally Made</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#666666]">
                <span className="px-3 py-1.5 bg-[#4E8B41] text-white rounded-full text-xs font-medium">🇰🇪 Kenyan Made</span>
                <span className="px-3 py-1.5 bg-[#D4A017] text-[#2B2B2B] rounded-full text-xs font-medium">✨ Premium</span>
              </div>
            </div>

            <Suspense fallback={<SkeletonProductGrid />}>
              <PaginatedProducts
                sortBy={sort}
                page={pageNumber}
                countryCode={countryCode}
                optionValueIds={optionValueIds}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreTemplate
