import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Heading } from "@modules/common/components/ui"

const categories = [
  {
    name: "Peanut Butter",
    description: "Smooth & crunchy varieties",
    emoji: "🫙",
    gradient: "from-[#D4A574] to-[#8B4513]",
  },
  {
    name: "Roasted Peanuts",
    description: "Snack-ready goodness",
    emoji: "🥜",
    gradient: "from-[#C4956A] to-[#A0522D]",
  },
  {
    name: "Peanut Flour",
    description: "High-protein baking essential",
    emoji: "🌾",
    gradient: "from-[#DEB887] to-[#CD853F]",
  },
  {
    name: "Peanut Oil",
    description: "Pure cooking excellence",
    emoji: "🫒",
    gradient: "from-[#F4A460] to-[#8B4513]",
  },
  {
    name: "Healthy Snacks",
    description: "Guilt-free indulgence",
    emoji: "🍫",
    gradient: "from-[#D2B48C] to-[#A0522D]",
  },
  {
    name: "Gift Packs",
    description: "Perfect presents",
    emoji: "🎁",
    gradient: "from-[#DEB887] to-[#8B4513]",
  },
]

export default function FeaturedCategories() {
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
          {categories.map((category, index) => (
            <LocalizedClientLink
              key={index}
              href={`/categories/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="group"
            >
              <div className="relative bg-gradient-to-br from-[#FFF8F0] to-[#FAF0E6] rounded-3xl p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-[#E8D5C4] overflow-hidden">
                {/* Background decoration */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-4xl">{category.emoji}</span>
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-semibold text-[#2C1810] mb-2 group-hover:text-[#8B4513] transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-[#5C4033]">
                  {category.description}
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
