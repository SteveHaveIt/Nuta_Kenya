"use client"

import { Heading, Text, clx } from "@modules/common/components/ui"
import PaymentButton from "../payment-button"
import { useSearchParams } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

const Review = ({ cart }: { cart: HttpTypes.StoreCart }) => {
  const searchParams = useSearchParams()
  const isOpen = searchParams.get("step") === "review"

  const paidByGiftcard = !!(
    (cart as unknown as Record<string, unknown>)?.gift_cards && 
    ((cart as unknown as Record<string, unknown>)?.gift_cards as unknown[])?.length > 0 && 
    cart?.total === 0
  )

  // Simplified check - we have payment collection or gift card
  const hasPayment = cart.payment_collection || paidByGiftcard

  return (
    <div className="bg-white">
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className={clx(
            "flex flex-row text-3xl-regular gap-x-2 items-baseline",
            {
              "opacity-50 pointer-events-none select-none": !isOpen,
            }
          )}
        >
          Review
        </Heading>
      </div>
      {isOpen && hasPayment && (
        <>
          <div className="flex items-start gap-x-1 w-full mb-6">
            <div className="w-full">
              <Text className="txt-medium-plus text-ui-fg-base mb-1">
                By clicking the Pay button, you confirm that the information above is correct 
                and that you have read and agree to our Terms & Conditions.
              </Text>
            </div>
          </div>
          <PaymentButton cart={cart} data-testid="submit-order-button" />
        </>
      )}
      {isOpen && !hasPayment && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <Text className="text-yellow-700">
            Please complete the payment step first.
          </Text>
        </div>
      )}
    </div>
  )
}

export default Review
