import { listCartShippingMethods } from "@lib/data/fulfillment"
import { listCartPaymentMethods } from "@lib/data/payment"
import { HttpTypes } from "@medusajs/types"
import Addresses from "@modules/checkout/components/addresses"
import Payment from "@modules/checkout/components/payment"
import Review from "@modules/checkout/components/review"
import Shipping from "@modules/checkout/components/shipping"

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

  let shippingMethods: HttpTypes.StoreCartShippingOption[] = []
  let paymentMethods: { id: string }[] = []

  try {
    const sm = await listCartShippingMethods(cart.id)
    shippingMethods = sm || []
  } catch (e) {
    console.error("Error fetching shipping methods:", e)
  }

  try {
    const pm = await listCartPaymentMethods(cart.region?.id ?? "")
    paymentMethods = pm || []
  } catch (e) {
    console.error("Error fetching payment methods:", e)
  }

  return (
    <div className="w-full grid grid-cols-1 gap-y-8">
      <Addresses cart={cart} customer={customer} />

      <Shipping cart={cart} availableShippingMethods={shippingMethods} />

      <Payment cart={cart} availablePaymentMethods={paymentMethods} />

      <Review cart={cart} />
    </div>
  )
}
