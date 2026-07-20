import { Heading } from "@modules/common/components/ui"

const features = [
  {
    icon: "🌿",
    title: "100% Natural",
    description: "No artificial preservatives or additives",
  },
  {
    icon: "❤️",
    title: "Heart Friendly",
    description: "Supports cardiovascular health",
  },
  {
    icon: "💪",
    title: "Rich in Protein",
    description: "Perfect for active lifestyles",
  },
  {
    icon: "⚡",
    title: "Healthy Energy",
    description: "Natural fuel for your day",
  },
  {
    icon: "🇰🇪",
    title: "Proudly Kenyan",
    description: "Supporting local agriculture",
  },
  {
    icon: "✨",
    title: "Premium Quality",
    description: "Carefully sourced and crafted",
  },
  {
    icon: "🏭",
    title: "Freshly Produced",
    description: "Roasted and packed weekly",
  },
  {
    icon: "🔒",
    title: "Secure Shopping",
    description: "Safe online payments",
  },
]

export default function WhyNuta() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#FFF8F0] to-[#FAF0E6]">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#8B4513] font-medium text-sm tracking-wide uppercase">
            Why Choose Us
          </span>
          <Heading level="h2" className="text-3xl md:text-4xl font-bold text-[#2C1810] mt-3 mb-4">
            Why Choose NUTA
          </Heading>
          <p className="text-[#5C4033] max-w-2xl mx-auto">
            We&apos;re committed to delivering the highest quality peanut products 
            while supporting Kenyan farmers and communities.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center group"
            >
              <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-2xl shadow-md flex items-center justify-center group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-300">
                <span className="text-4xl">{feature.icon}</span>
              </div>
              <h3 className="text-lg font-semibold text-[#2C1810] mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-[#5C4033]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Banner */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
            <p className="text-3xl md:text-4xl font-bold text-[#8B4513]">100%</p>
            <p className="text-sm text-[#5C4033] mt-1">Natural Ingredients</p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
            <p className="text-3xl md:text-4xl font-bold text-[#8B4513]">10K+</p>
            <p className="text-sm text-[#5C4033] mt-1">Happy Customers</p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
            <p className="text-3xl md:text-4xl font-bold text-[#8B4513]">50+</p>
            <p className="text-sm text-[#5C4033] mt-1">Products</p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
            <p className="text-3xl md:text-4xl font-bold text-[#8B4513]">5★</p>
            <p className="text-sm text-[#5C4033] mt-1">Average Rating</p>
          </div>
        </div>
      </div>
    </section>
  )
}
