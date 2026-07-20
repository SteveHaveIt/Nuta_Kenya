import { Metadata } from "next"

import { listProducts } from "@lib/data/products"
import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
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

type Props = {
  params: Promise<{ countryCode: string }>
}

export default async function Home(props: Props) {
  const params = await props.params
  const { countryCode } = params

  // Fetch data from Medusa backend
  let products: any[] = []
  let categories: any[] = []
  let collections: any[] = []
  let region = null

  try {
    // Fetch products (limit 8 for best sellers)
    const productsResult = await listProducts({
      countryCode,
      queryParams: { limit: 8 },
    })
    products = productsResult.response.products

    // Fetch categories
    const categoriesData = await listCategories({ limit: 6 })
    categories = categoriesData || []

    // Fetch collections
    const collectionsResult = await listCollections({ limit: 6 })
    collections = collectionsResult?.collections || []

    // Fetch region for pricing
    region = await getRegion(countryCode)
  } catch (error) {
    console.error("Error fetching homepage data:", error)
    // Continue with empty data - components will show fallback UI
  }

  return (
    <>
      <AnnouncementBar />
      <NutaHero />
      <FeaturedCategories 
        categories={categories} 
        collections={collections} 
      />
      <WhyNuta />
      <BestSellers 
        products={products} 
        region={region}
      />
      <HealthBenefits />
      <Testimonials />
      <PromoBanner />
      <Newsletter />
    </>
  )
}
