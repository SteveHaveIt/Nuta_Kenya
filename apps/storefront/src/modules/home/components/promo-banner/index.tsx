import { Heading } from "@modules/common/components/ui"
import { Button } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function PromoBanner() {
  return (
    <section className="py-16 bg-gradient-to-r from-[#8B4513] to-[#A0522D]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Content */}
          <div className="text-center lg:text-left flex-1">
            <span className="inline-block px-4 py-1 bg-white/20 text-white text-sm font-medium rounded-full mb-4">
              Limited Time Offer
            </span>
            <Heading level="h2" className="text-2xl md:text-3xl font-bold text-white mb-3">
              Get 15% Off Your First Order!
            </Heading>
            <p className="text-white/90 max-w-xl">
              Sign up today and receive an exclusive discount on your first purchase. 
              Plus, get access to special offers and healthy recipes!
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <LocalizedClientLink href="/account">
              <Button className="bg-white text-[#8B4513] hover:bg-[#FFF8F0] px-8 py-4 rounded-full font-semibold transition-colors shadow-lg w-full sm:w-auto">
                Create Account
              </Button>
            </LocalizedClientLink>
            <LocalizedClientLink href="/store">
              <Button 
                variant="secondary" 
                className="border-2 border-white text-white hover:bg-white hover:text-[#8B4513] px-8 py-4 rounded-full font-semibold transition-colors w-full sm:w-auto"
              >
                Shop Now
              </Button>
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </section>
  )
}
