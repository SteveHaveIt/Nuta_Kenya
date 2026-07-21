import { listCartShippingMethods } from "@lib/data/fulfillment"
import { listCartPaymentMethods } from "@lib/data/payment"
import { HttpTypes } from "@medusajs/types"
import Addresses from "@modules/checkout/components/addresses"
import Payment from "@modules/checkout/components/payment"
import Review from "@modules/checkout/components/review"
import Shipping from "@modules/checkout/components/shipping"
import { Text } from "@modules/common/components/ui"

export default async function CheckoutForm({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) {
  if (!cart) {
    return null
  }

  const shippingMethods = await listCartShippingMethods(cart.id)
  const paymentMethods = await listCartPaymentMethods(cart.region?.id ?? "")

  return (
    <div className="w-full grid grid-cols-1 gap-y-8">
      <Addresses cart={cart} customer={customer} />

      <Shipping cart={cart} availableShippingMethods={shippingMethods || []} />

      {(!paymentMethods || paymentMethods.length === 0) ? (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <Text className="text-red-600 font-medium">No payment methods available.</Text>
          <Text className="text-gray-600 text-sm mt-2">
            Please contact support or ensure payment providers are configured for Kenya.
          </Text>
        </div>
      ) : (
        <Payment cart={cart} availablePaymentMethods={paymentMethods} />
      )}

      <Review cart={cart} />
    </div>
  )
}
