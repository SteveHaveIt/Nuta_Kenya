import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

// Force dynamic rendering
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 15 and Medusa.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  let region = null
  let collections: any[] = []

  try {
    region = await getRegion(countryCode)
    const result = await listCollections({
      fields: "id, handle, title",
    })
    collections = result?.collections || []
  } catch {
    // Backend not available, render with empty state
  }

  return (
    <>
      <Hero />
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          {collections.length > 0 && region && (
            <FeaturedProducts collections={collections} region={region} />
          )}
        </ul>
      </div>
    </>
  )
}
