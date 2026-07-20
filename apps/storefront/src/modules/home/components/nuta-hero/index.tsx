import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button } from "@modules/common/components/ui"

export default function NutaHero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background with warm gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAF8F2] via-[#FDF8F3] to-[#F5E1C8]" />
      
      {/* Decorative Elements - Gold and Brown accents */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large gold circle */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-gradient-to-br from-[#D4A017] via-[#D4A574] to-[#C4956A] rounded-full opacity-30 blur-3xl" />
        {/* Brown accent circle */}
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-gradient-to-br from-[#8B4513] to-[#6B3410] rounded-full opacity-20 blur-3xl" />
        {/* Green accent */}
        <div className="absolute top-1/3 left-10 w-32 h-32 bg-[#4E8B41] rounded-full opacity-10 blur-2xl" />
        {/* Gold dots */}
        <div className="absolute top-1/4 right-1/4 w-6 h-6 bg-[#D4A017] rounded-full opacity-40" />
        <div className="absolute bottom-1/3 left-1/4 w-4 h-4 bg-[#D4A574] rounded-full opacity-50" />
        <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-[#8B4513] rounded-full opacity-40" />
        <div className="absolute top-20 right-20 w-5 h-5 bg-[#4E8B41] rounded-full opacity-30" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#4E8B41] text-white rounded-full shadow-md">
              <span className="text-lg">🌱</span>
              <span className="font-semibold text-sm tracking-wide uppercase">
                Premium Quality Since Day One
              </span>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-[#2B2B2B]">Naturally Nutritious.</span>{" "}
              <span style={{ background: 'linear-gradient(to right, #8B4513, #D4A017)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Proudly Kenyan.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-[#666666] max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Discover the finest selection of fresh, high quality peanut products 
              crafted with care in Kenya. Wholesome nutrition for individuals and families.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <LocalizedClientLink href="/store">
                <button className="bg-gradient-to-r from-[#8B4513] to-[#A0522D] hover:from-[#6B3410] hover:to-[#8B4513] text-white px-10 py-4 text-lg rounded-full transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto font-semibold flex items-center justify-center gap-2">
                  <span>🛒</span> Shop Now
                </button>
              </LocalizedClientLink>
              <LocalizedClientLink href="/about">
                <button className="bg-white border-2 border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white px-10 py-4 text-lg rounded-full transition-all duration-300 w-full sm:w-auto font-semibold flex items-center justify-center gap-2">
                  <span>📖</span> Explore Our Story
                </button>
              </LocalizedClientLink>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
                <span className="w-8 h-8 bg-[#4E8B41] rounded-full flex items-center justify-center text-white font-bold text-sm">✓</span>
                <span className="text-sm font-medium text-[#2B2B2B]">100% Natural</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
                <span className="w-8 h-8 bg-[#D4A017] rounded-full flex items-center justify-center text-white font-bold text-sm">🇰🇪</span>
                <span className="text-sm font-medium text-[#2B2B2B]">Locally Made</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
                <span className="w-8 h-8 bg-[#8B4513] rounded-full flex items-center justify-center text-white font-bold text-sm">✨</span>
                <span className="text-sm font-medium text-[#2B2B2B]">Freshly Roasted</span>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Main gradient circle */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4A017] via-[#D4A574] to-[#8B4513] rounded-full opacity-40 animate-pulse" />
              
              {/* Product showcase */}
              <div className="absolute inset-6 bg-gradient-to-br from-white to-[#FAF8F2] rounded-full shadow-2xl flex items-center justify-center border-4 border-[#D4A574]/30">
                <div className="text-center p-8">
                  <div className="w-40 h-40 mx-auto mb-6 bg-gradient-to-br from-[#D4A017] via-[#D4A574] to-[#8B4513] rounded-3xl flex items-center justify-center shadow-xl transform rotate-6">
                    <span className="text-7xl transform -rotate-6">🥜</span>
                  </div>
                  <p className="text-xl font-bold" style={{ background: 'linear-gradient(to right, #8B4513, #D4A017)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    Premium Peanut Butter
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="px-3 py-1 bg-[#4E8B41] text-white text-xs font-medium rounded-full">100% Natural</span>
                    <span className="px-3 py-1 bg-[#D4A017] text-[#2B2B2B] text-xs font-medium rounded-full">No Preservatives</span>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute top-8 -left-8 bg-white rounded-2xl shadow-xl p-4 animate-bounce border-2 border-[#4E8B41]/20" style={{ animationDuration: '3s' }}>
                <div className="flex items-center gap-3">
                  <span className="w-12 h-12 bg-[#4E8B41] rounded-xl flex items-center justify-center text-2xl">🌱</span>
                  <div>
                    <p className="font-bold text-[#2B2B2B]">Organic</p>
                    <p className="text-sm text-[#666666]">Certified</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-12 -right-4 bg-white rounded-2xl shadow-xl p-4 animate-bounce border-2 border-[#D4A017]/20" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <span className="w-12 h-12 bg-gradient-to-br from-[#D4A017] to-[#D4A574] rounded-xl flex items-center justify-center text-2xl">🇰🇪</span>
                  <div>
                    <p className="font-bold text-[#2B2B2B]">Made in</p>
                    <p className="text-sm text-[#666666]">Kenya</p>
                  </div>
                </div>
              </div>

              {/* Price badge */}
              <div className="absolute bottom-4 left-4 bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white rounded-2xl shadow-xl p-4">
                <p className="text-sm font-medium opacity-80">Starting from</p>
                <p className="text-2xl font-bold">KES 1,500</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
