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

  let shippingMethods: HttpTypes.StoreCartShippingOption[] | null = null
  let paymentMethods: { id: string }[] | null = null

  try {
    shippingMethods = await listCartShippingMethods(cart.id)
  } catch (e) {
    console.error("Error fetching shipping methods:", e)
  }

  try {
    paymentMethods = await listCartPaymentMethods(cart.region?.id ?? "")
  } catch (e) {
    console.error("Error fetching payment methods:", e)
  }

  return (
    <div className="w-full grid grid-cols-1 gap-y-8">
      <Addresses cart={cart} customer={customer} />

      <Shipping cart={cart} availableShippingMethods={shippingMethods || []} />

      <Payment cart={cart} availablePaymentMethods={paymentMethods || []} />

      <Review cart={cart} />
    </div>
  )
}
