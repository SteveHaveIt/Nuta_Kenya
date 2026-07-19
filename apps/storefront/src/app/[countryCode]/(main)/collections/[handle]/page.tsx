import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getCollectionByHandle } from "@lib/data/collections"
import CollectionTemplate from "@modules/collections/templates"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { parseOptionValueIds } from "@lib/util/product-option-filters"

// Force dynamic rendering to prevent build-time data fetching
// which would fail since the Medusa backend is not running during build
export const dynamic = "force-dynamic"

type Props = {
  params: Promise<{ handle: string; countryCode: string }>
  searchParams: Promise<
    Record<string, string | string[] | undefined> & {
      page?: string
      sortBy?: SortOptions
      optionValueIds?: string | string[]
    }
  >
}

export const PRODUCT_LIMIT = 12

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  try {
    const collection = await getCollectionByHandle(params.handle)

    if (!collection) {
      return {
        title: `Collection | Medusa Store`,
        description: "Browse our collections",
      }
    }

    return {
      title: `${collection.title} | Medusa Store`,
      description: `${collection.title} collection`,
    }
  } catch {
    return {
      title: `Collection | Medusa Store`,
      description: "Browse our collections",
    }
  }
}

export default async function CollectionPage(props: Props) {
  const searchParams = await props.searchParams
  const params = await props.params
  const { sortBy, page } = searchParams
  const optionValueIds = parseOptionValueIds(searchParams)

  const collection = await getCollectionByHandle(params.handle).then(
    (collection) => collection
  )

  if (!collection) {
    notFound()
  }

  return (
    <CollectionTemplate
      collection={collection}
      page={page}
      sortBy={sortBy}
      countryCode={params.countryCode}
      optionValueIds={optionValueIds}
    />
  )
}
