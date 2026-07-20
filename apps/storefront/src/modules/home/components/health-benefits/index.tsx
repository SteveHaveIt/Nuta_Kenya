import { Heading } from "@modules/common/components/ui"

const benefits = [
  {
    icon: "💪",
    title: "Rich in Protein",
    description: "Peanuts are an excellent source of plant-based protein, supporting muscle growth and repair.",
    color: "from-[#D4A574] to-[#8B4513]",
  },
  {
    icon: "❤️",
    title: "Heart Friendly",
    description: "Contains healthy fats that can help lower bad cholesterol and support cardiovascular health.",
    color: "from-[#E8B4B8] to-[#C75B5B]",
  },
  {
    icon: "🧠",
    title: "Brain Health",
    description: "Packed with vitamin E and niacin that support cognitive function and brain health.",
    color: "from-[#B8D4E8] to-[#5B8FC7]",
  },
  {
    icon: "⚡",
    title: "Natural Energy",
    description: "Provides sustained energy from healthy fats and protein for active lifestyles.",
    color: "from-[#F4D03F] to-[#D4A017]",
  },
  {
    icon: "🦴",
    title: "Bone Strength",
    description: "Contains minerals like magnesium and phosphorus that support strong bones.",
    color: "from-[#D5F4E6] to-[#5BC7A7]",
  },
  {
    icon: "🛡️",
    title: "Immune Support",
    description: "Rich in zinc and antioxidants that help boost your immune system naturally.",
    color: "from-[#E8D4F4] to-[#A77BC7]",
  },
]

export default function HealthBenefits() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#2C1810] to-[#4A2C2A]">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#D4A574] font-medium text-sm tracking-wide uppercase">
            Nature&apos;s Bounty
          </span>
          <Heading level="h2" className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">
            Health Benefits
          </Heading>
          <p className="text-[#E8D5C4] max-w-2xl mx-auto">
            Discover why peanuts are considered one of nature&apos;s most nutritious foods. 
            Every jar of NUTA is packed with goodness for your body.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group"
            >
              <div className={`w-16 h-16 mb-5 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                <span className="text-3xl">{benefit.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {benefit.title}
              </h3>
              <p className="text-[#E8D5C4] leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="/health-tips"
            className="inline-flex items-center gap-2 text-[#D4A574] hover:text-white transition-colors font-medium"
          >
            Learn more about peanut nutrition
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
