import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button } from "@modules/common/components/ui"

export default function NutaHero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#FFF8F0] via-[#FAF0E6] to-[#F5DEB3]">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#D4A574]/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#8B4513]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-[#D4A574] rounded-full opacity-60" />
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-[#8B4513] rounded-full opacity-40" />
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-[#D4A574] rounded-full opacity-50" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="inline-block px-4 py-2 bg-[#8B4513]/10 rounded-full">
              <span className="text-[#8B4513] font-medium text-sm tracking-wide uppercase">
                Premium Quality Since Day One
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2C1810] leading-tight">
              Naturally Nutritious.{" "}
              <span className="text-[#8B4513]">Proudly Kenyan.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-[#5C4033] max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Discover the finest selection of fresh, high-quality peanut products 
              crafted with care in Kenya. Wholesome nutrition for individuals and families.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <LocalizedClientLink href="/store">
                <Button className="bg-[#8B4513] hover:bg-[#6B3410] text-white px-8 py-4 text-lg rounded-full transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto">
                  Shop Now
                </Button>
              </LocalizedClientLink>
              <LocalizedClientLink href="/about">
                <Button 
                  variant="secondary" 
                  className="border-2 border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513]/10 px-8 py-4 text-lg rounded-full transition-all duration-300 w-full sm:w-auto"
                >
                  Explore Our Story
                </Button>
              </LocalizedClientLink>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-4">
              <div className="flex items-center gap-2 text-sm text-[#5C4033]">
                <span className="w-8 h-8 bg-[#8B4513]/10 rounded-full flex items-center justify-center">
                  <span className="text-[#8B4513]">✓</span>
                </span>
                100% Natural
              </div>
              <div className="flex items-center gap-2 text-sm text-[#5C4033]">
                <span className="w-8 h-8 bg-[#8B4513]/10 rounded-full flex items-center justify-center">
                  <span className="text-[#8B4513]">✓</span>
                </span>
                Locally Sourced
              </div>
              <div className="flex items-center gap-2 text-sm text-[#5C4033]">
                <span className="w-8 h-8 bg-[#8B4513]/10 rounded-full flex items-center justify-center">
                  <span className="text-[#8B4513]">✓</span>
                </span>
                Freshly Made
              </div>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Main circle */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4A574] to-[#8B4513] rounded-full opacity-20 animate-pulse" />
              
              {/* Product showcase */}
              <div className="absolute inset-8 bg-gradient-to-br from-[#FFF8F0] to-[#FAF0E6] rounded-full shadow-2xl flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-[#D4A574] to-[#8B4513] rounded-3xl flex items-center justify-center shadow-lg">
                    <span className="text-5xl">🥜</span>
                  </div>
                  <p className="text-[#8B4513] font-semibold text-lg">Premium Peanut Butter</p>
                  <p className="text-[#5C4033] text-sm">100% Natural • No Preservatives</p>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute top-12 -left-4 bg-white rounded-2xl shadow-lg p-4 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌱</span>
                  <div>
                    <p className="text-xs font-semibold text-[#2C1810]">Organic</p>
                    <p className="text-xs text-[#5C4033]">Certified</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-16 -right-4 bg-white rounded-2xl shadow-lg p-4 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🇰🇪</span>
                  <div>
                    <p className="text-xs font-semibold text-[#2C1810]">Made in</p>
                    <p className="text-xs text-[#5C4033]">Kenya</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
