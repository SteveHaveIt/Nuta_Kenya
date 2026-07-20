"use client"

import { useState } from "react"
import { Heading } from "@modules/common/components/ui"

const testimonials = [
  {
    name: "Wanjiru Mwangi",
    location: "Nairobi",
    rating: 5,
    text: "The best peanut butter I've ever tasted! My whole family loves it. The creamy texture is perfect for spreading and baking.",
    product: "Creamy Peanut Butter",
  },
  {
    name: "James Oduya",
    location: "Kisumu",
    rating: 5,
    text: "Finally, a local brand that matches international quality. Fresh, delicious, and affordable. NUTA has become a staple in our home.",
    product: "Roasted Peanuts",
  },
  {
    name: "Sarah Kamau",
    location: "Mombasa",
    rating: 5,
    text: "I love that it's 100% natural with no added sugars. Great for my fitness journey. The protein content is amazing!",
    product: "Natural Peanut Butter",
  },
  {
    name: "David Mutua",
    location: "Nakuru",
    rating: 5,
    text: "The gift pack was perfect for my sister's wedding. Beautiful packaging and everyone loved the products inside.",
    product: "Gift Pack",
  },
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="py-20 bg-[#FFF8F0]">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#8B4513] font-medium text-sm tracking-wide uppercase">
            Customer Love
          </span>
          <Heading level="h2" className="text-3xl md:text-4xl font-bold text-[#2C1810] mt-3 mb-4">
            What Our Customers Say
          </Heading>
          <p className="text-[#5C4033] max-w-2xl mx-auto">
            Join thousands of happy customers who have made NUTA part of their daily lives.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 relative">
            {/* Quote icon */}
            <div className="absolute -top-6 left-8 w-12 h-12 bg-[#8B4513] rounded-full flex items-center justify-center">
              <span className="text-white text-2xl">&quot;</span>
            </div>

            <div className="text-center">
              {/* Rating */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <span key={i} className="text-2xl text-[#D4A574]">★</span>
                ))}
              </div>

              {/* Review text */}
              <p className="text-lg md:text-xl text-[#2C1810] leading-relaxed mb-8 italic">
                &quot;{testimonials[activeIndex].text}&quot;
              </p>

              {/* Customer info */}
              <div className="flex items-center justify-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#D4A574] to-[#8B4513] rounded-full flex items-center justify-center text-white text-xl font-semibold">
                  {testimonials[activeIndex].name.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-[#2C1810]">
                    {testimonials[activeIndex].name}
                  </p>
                  <p className="text-sm text-[#5C4033]">
                    {testimonials[activeIndex].location} • {testimonials[activeIndex].product}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-[#8B4513] w-8"
                    : "bg-[#D4A574] hover:bg-[#8B4513]/50"
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
