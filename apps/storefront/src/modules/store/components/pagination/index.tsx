"use client"

import { clx } from "@modules/common/components/ui"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export function Pagination({
  page,
  totalPages,
  'data-testid': dataTestid
}: {
  page: number
  totalPages: number
  'data-testid'?: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Helper function to generate an array of numbers within a range
  const arrayRange = (start: number, stop: number) =>
    Array.from({ length: stop - start + 1 }, (_, index) => start + index)

  // Function to handle page changes
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", newPage.toString())
    router.push(`${pathname}?${params.toString()}`)
  }

  // Function to render a page button
  const renderPageButton = (
    p: number,
    label: string | number,
    isCurrent: boolean
  ) => (
    <button
      key={p}
      className={clx(
        "w-10 h-10 rounded-full font-semibold transition-all duration-200 flex items-center justify-center",
        {
          "bg-[#8B4513] text-white shadow-md": isCurrent,
          "bg-white text-[#666666] hover:bg-[#8B4513] hover:text-white shadow-sm border border-[#E8D5C4]": !isCurrent,
        }
      )}
      disabled={isCurrent}
      onClick={() => handlePageChange(p)}
    >
      {label}
    </button>
  )

  // Function to render ellipsis
  const renderEllipsis = (key: string) => (
    <span
      key={key}
      className="w-10 h-10 flex items-center justify-center text-[#D4A574] font-semibold"
    >
      •••
    </span>
  )

  // Function to render page buttons based on the current page and total pages
  const renderPageButtons = () => {
    const buttons = []

    if (totalPages <= 7) {
      // Show all pages
      buttons.push(
        ...arrayRange(1, totalPages).map((p) =>
          renderPageButton(p, p, p === page)
        )
      )
    } else {
      // Handle different cases for displaying pages and ellipses
      if (page <= 4) {
        // Show 1, 2, 3, 4, 5, ..., lastpage
        buttons.push(
          ...arrayRange(1, 5).map((p) => renderPageButton(p, p, p === page))
        )
        buttons.push(renderEllipsis("ellipsis1"))
        buttons.push(
          renderPageButton(totalPages, totalPages, totalPages === page)
        )
      } else if (page >= totalPages - 3) {
        // Show 1, ..., lastpage - 4, lastpage - 3, lastpage - 2, lastpage - 1, lastpage
        buttons.push(renderPageButton(1, 1, 1 === page))
        buttons.push(renderEllipsis("ellipsis2"))
        buttons.push(
          ...arrayRange(totalPages - 4, totalPages).map((p) =>
            renderPageButton(p, p, p === page)
          )
        )
      } else {
        // Show 1, ..., page - 1, page, page + 1, ..., lastpage
        buttons.push(renderPageButton(1, 1, 1 === page))
        buttons.push(renderEllipsis("ellipsis3"))
        buttons.push(
          ...arrayRange(page - 1, page + 1).map((p) =>
            renderPageButton(p, p, p === page)
          )
        )
        buttons.push(renderEllipsis("ellipsis4"))
        buttons.push(
          renderPageButton(totalPages, totalPages, totalPages === page)
        )
      }
    }

    return buttons
  }

  // Render the component
  return (
    <div className="flex justify-center w-full mt-12">
      <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-soft" data-testid={dataTestid}>
        {/* Previous button */}
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className={clx(
            "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200",
            page === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-[#FAF8F2] text-[#8B4513] hover:bg-[#8B4513] hover:text-white"
          )}
        >
          <span className="text-lg">←</span>
        </button>

        <div className="flex items-center gap-1">
          {renderPageButtons()}
        </div>

        {/* Next button */}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className={clx(
            "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200",
            page === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-[#FAF8F2] text-[#8B4513] hover:bg-[#8B4513] hover:text-white"
          )}
        >
          <span className="text-lg">→</span>
        </button>
      </div>
    </div>
  )
}
