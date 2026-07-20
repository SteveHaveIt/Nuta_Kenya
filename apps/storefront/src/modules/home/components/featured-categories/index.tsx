import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Heading } from "@modules/common/components/ui"

type Category = HttpTypes.StoreProductCategory
type Collection = HttpTypes.StoreCollection

type FeaturedCategoriesProps = {
  categories: Category[]
  collections: Collection[]
}

// Default emojis for categories
const categoryEmojis: Record<string, string> = {
  "peanut-butter": "🫙",
  "peanut-butter-varieties": "🫙",
  "roasted-peanuts": "🥜",
  "peanuts": "🥜",
  "peanut-flour": "🌾",
  "flour": "🌾",
  "peanut-oil": "🫒",
  "oil": "🫒",
  "snacks": "🍫",
  "healthy-snacks": "🍫",
  "gift-packs": "🎁",
  "gifts": "🎁",
  "default": "🥜",
}

const gradients = [
  "from-[#D4A574] to-[#8B4513]",
  "from-[#C4956A] to-[#A0522D]",
  "from-[#DEB887] to-[#CD853F]",
  "from-[#F4A460] to-[#8B4513]",
  "from-[#D2B48C] to-[#A0522D]",
  "from-[#DEB887] to-[#8B4513]",
]

function getCategoryEmoji(handle: string): string {
  const normalized = handle.toLowerCase().replace(/-/g, "-")
  for (const [key, emoji] of Object.entries(categoryEmojis)) {
    if (normalized.includes(key)) {
      return emoji
    }
  }
  return categoryEmojis.default
}

export default function FeaturedCategories({ categories, collections }: FeaturedCategoriesProps) {
  // Combine categories and collections for display
  const items = [
    ...categories.map((cat, idx) => ({
      name: cat.name || "Category",
      handle: cat.handle || cat.id,
      description: cat.category_children?.length 
        ? `${cat.category_children.length} subcategories` 
        : "Explore products",
      emoji: getCategoryEmoji(cat.handle || ""),
      gradient: gradients[idx % gradients.length],
      type: "category" as const,
    })),
    ...collections.slice(0, Math.max(0, 6 - categories.length)).map((col, idx) => ({
      name: col.title || "Collection",
      handle: col.handle || col.id,
      description: `${col.metadata?.product_count || 0} products`,
      emoji: getCategoryEmoji(col.handle || ""),
      gradient: gradients[(categories.length + idx) % gradients.length],
      type: "collection" as const,
    })),
  ]

  // If no data from backend, show placeholder
  if (items.length === 0) {
    items.push(
      { name: "Peanut Butter", handle: "peanut-butter", description: "Smooth & creamy", emoji: "🫙", gradient: gradients[0], type: "category" },
      { name: "Roasted Peanuts", handle: "roasted-peanuts", description: "Snack-ready", emoji: "🥜", gradient: gradients[1], type: "category" },
      { name: "Peanut Flour", handle: "peanut-flour", description: "High protein", emoji: "🌾", gradient: gradients[2], type: "category" },
      { name: "Peanut Oil", handle: "peanut-oil", description: "Pure cooking", emoji: "🫒", gradient: gradients[3], type: "category" },
      { name: "Healthy Snacks", handle: "snacks", description: "Guilt-free", emoji: "🍫", gradient: gradients[4], type: "category" },
      { name: "Gift Packs", handle: "gift-packs", description: "Perfect presents", emoji: "🎁", gradient: gradients[5], type: "collection" },
    )
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#8B4513] font-medium text-sm tracking-wide uppercase">
            Explore Our Collection
          </span>
          <Heading level="h2" className="text-3xl md:text-4xl font-bold text-[#2C1810] mt-3 mb-4">
            Shop by Category
          </Heading>
          <p className="text-[#5C4033] max-w-2xl mx-auto">
            From creamy peanut butter to protein-rich flour, discover our complete range 
            of premium peanut products.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {items.slice(0, 6).map((item, index) => (
            <LocalizedClientLink
              key={`${item.type}-${item.handle}`}
              href={`/categories/${item.handle}`}
              className="group"
            >
              <div className="relative bg-gradient-to-br from-[#FFF8F0] to-[#FAF0E6] rounded-3xl p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-[#E8D5C4] overflow-hidden">
                {/* Background decoration */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-4xl">{item.emoji}</span>
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-semibold text-[#2C1810] mb-2 group-hover:text-[#8B4513] transition-colors line-clamp-1">
                  {item.name}
                </h3>
                <p className="text-sm text-[#5C4033] line-clamp-1">
                  {item.description}
                </p>

                {/* Hover arrow */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="inline-flex items-center text-[#8B4513] text-sm font-medium">
                    Shop Now
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </LocalizedClientLink>
          ))}
        </div>
      </div>
    </section>
  )
}
