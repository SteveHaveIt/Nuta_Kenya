import { Metadata } from "next"

import AnnouncementBar from "@modules/home/components/announcement-bar"
import NutaHero from "@modules/home/components/nuta-hero"
import FeaturedCategories from "@modules/home/components/featured-categories"
import WhyNuta from "@modules/home/components/why-nuta"
import BestSellers from "@modules/home/components/best-sellers"
import HealthBenefits from "@modules/home/components/health-benefits"
import Testimonials from "@modules/home/components/testimonials"
import PromoBanner from "@modules/home/components/promo-banner"
import Newsletter from "@modules/home/components/newsletter"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "NUTA Store | Premium Kenyan Peanut Products",
  description:
    "Discover naturally nutritious peanut products proudly made in Kenya. Shop premium peanut butter, roasted peanuts, and more at NUTA.",
}

export default async function Home() {
  return (
    <>
      <AnnouncementBar />
      <NutaHero />
      <FeaturedCategories />
      <WhyNuta />
      <BestSellers products={[]} />
      <HealthBenefits />
      <Testimonials />
      <PromoBanner />
      <Newsletter />
    </>
  )
}
