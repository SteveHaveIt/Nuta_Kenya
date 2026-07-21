"use client"

import { isMpesa, isPaynector } from "@lib/constants"
import { placeOrder } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@modules/common/components/ui"
import { useElements, useStripe } from "@stripe/react-stripe-js"
import React, { useState } from "react"
import ErrorMessage from "../error-message"

type PaymentButtonProps = {
  cart: HttpTypes.StoreCart
  "data-testid": string
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  cart,
  "data-testid": dataTestId,
}) => {
  const notReady =
    !cart ||
    !cart.shipping_address ||
    !cart.billing_address ||
    !cart.email ||
    (cart.shipping_methods?.length ?? 0) < 1

  // Get the pending payment session
  const paymentSession = cart.payment_collection?.payment_sessions?.find(
    (s) => s.status === "pending"
  )

  // If there's a payment collection with sessions, show appropriate button
  const hasPaymentSessions = cart.payment_collection?.payment_sessions && 
    cart.payment_collection.payment_sessions.length > 0

  switch (true) {
    case isPaynector(paymentSession?.provider_id):
    case hasPaymentSessions && !isMpesa(paymentSession?.provider_id) && !isPaynector(paymentSession?.provider_id):
      // Show Paynector button if it's paynector OR if there are sessions but none detected
      return (
        <PaynectorPaymentButton
          notReady={notReady}
          cart={cart}
          data-testid={dataTestId}
        />
      )
    case isMpesa(paymentSession?.provider_id):
      return (
        <MpesaPaymentButton
          notReady={notReady}
          cart={cart}
          data-testid={dataTestId}
        />
      )
    default:
      return <Button disabled>Select a payment method</Button>
  }
}

const PaynectorPaymentButton = ({
  cart,
  notReady,
  "data-testid": dataTestId,
}: {
  cart: HttpTypes.StoreCart
  notReady: boolean
  "data-testid"?: string
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onPaymentCompleted = async () => {
    await placeOrder()
      .catch((err) => {
        setErrorMessage(err.message)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  const handlePayment = async () => {
    setSubmitting(true)
    setErrorMessage(null)

    try {
      // Get the checkout URL from the payment session
      const session = cart.payment_collection?.payment_sessions?.find(
        (s) => s.status === "pending"
      )
      
      if (session?.data?.checkout_url) {
        // Redirect to Paynector checkout
        window.location.href = session.data.checkout_url as string
        return
      }
      
      // If no checkout URL, just complete the order (for test mode)
      await onPaymentCompleted()
    } catch (err: any) {
      setErrorMessage(err.message || "Payment failed")
      setSubmitting(false)
    }
  }

  return (
    <>
      <Button
        disabled={notReady}
        onClick={handlePayment}
        size="large"
        isLoading={submitting}
        data-testid={dataTestId}
      >
        Pay with Paynector
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="paynector-payment-error-message"
      />
    </>
  )
}

const MpesaPaymentButton = ({
  cart,
  notReady,
  "data-testid": dataTestId,
}: {
  cart: HttpTypes.StoreCart
  notReady: boolean
  "data-testid"?: string
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [showPhoneInput, setShowPhoneInput] = useState(false)

  const onPaymentCompleted = async () => {
    await placeOrder()
      .catch((err) => {
        setErrorMessage(err.message)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  const handlePayment = async () => {
    if (!showPhoneInput) {
      setShowPhoneInput(true)
      return
    }

    if (!phoneNumber) {
      setErrorMessage("Please enter your M-PESA phone number")
      return
    }

    setSubmitting(true)
    setErrorMessage(null)

    try {
      // For M-PESA, we need to initiate the STK push
      // The backend will handle this when we initiate the payment session
      // For now, we'll just complete the order
      await onPaymentCompleted()
    } catch (err: any) {
      setErrorMessage(err.message || "M-PESA payment failed")
      setSubmitting(false)
    }
  }

  if (showPhoneInput) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="mpesa-phone" className="text-sm font-medium">
            Enter M-PESA Phone Number
          </label>
          <input
            id="mpesa-phone"
            type="tel"
            placeholder="07XXXXXXXX"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full h-11 px-4 border border-ui-border-base rounded-md appearance-none bg-ui-bg-field focus:outline-none focus:ring-0 focus:shadow-borders-interactive-with-active"
          />
          <p className="text-xs text-ui-fg-muted">
            Enter the phone number registered with M-PESA (e.g., 0712345678)
          </p>
        </div>
        <Button
          disabled={notReady || !phoneNumber}
          onClick={handlePayment}
          size="large"
          isLoading={submitting}
          data-testid={dataTestId}
        >
          Pay KES {cart.total ? (cart.total / 100).toFixed(2) : "0.00"} with M-PESA
        </Button>
        <ErrorMessage
          error={errorMessage}
          data-testid="mpesa-payment-error-message"
        />
      </div>
    )
  }

  return (
    <>
      <Button
        disabled={notReady}
        onClick={handlePayment}
        size="large"
        isLoading={submitting}
        data-testid={dataTestId}
      >
        Pay with M-PESA
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="mpesa-payment-error-message"
      />
    </>
  )
}

const StripePaymentButton = ({
  cart,
  notReady,
  "data-testid": dataTestId,
}: {
  cart: HttpTypes.StoreCart
  notReady: boolean
  "data-testid"?: string
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onPaymentCompleted = async () => {
    await placeOrder()
      .catch((err) => {
        setErrorMessage(err.message)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  const stripe = useStripe()
  const elements = useElements()
  const card = elements?.getElement("card")

  const session = cart.payment_collection?.payment_sessions?.find(
    (s) => s.status === "pending"
  )

  const disabled = !stripe || !elements ? true : false

  const handlePayment = async () => {
    setSubmitting(true)

    if (!stripe || !elements || !card || !cart) {
      setSubmitting(false)
      return
    }

    await stripe
      .confirmCardPayment(session?.data.client_secret as string, {
        payment_method: {
          card: card,
          billing_details: {
            name:
              cart.billing_address?.first_name +
              " " +
              cart.billing_address?.last_name,
            address: {
              city: cart.billing_address?.city ?? undefined,
              country: cart.billing_address?.country_code ?? undefined,
              line1: cart.billing_address?.address_1 ?? undefined,
              line2: cart.billing_address?.address_2 ?? undefined,
              postal_code: cart.billing_address?.postal_code ?? undefined,
              state: cart.billing_address?.province ?? undefined,
            },
            email: cart.email,
            phone: cart.billing_address?.phone ?? undefined,
          },
        },
      })
      .then(({ error, paymentIntent }) => {
        if (error) {
          const pi = error.payment_intent

          if (
            (pi && pi.status === "requires_capture") ||
            (pi && pi.status === "succeeded")
          ) {
            onPaymentCompleted()
          }

          setErrorMessage(error.message || null)
          return
        }

        if (
          (paymentIntent && paymentIntent.status === "requires_capture") ||
          paymentIntent.status === "succeeded"
        ) {
          return onPaymentCompleted()
        }

        return
      })
  }

  return (
    <>
      <Button
        disabled={disabled || notReady}
        onClick={handlePayment}
        size="large"
        isLoading={submitting}
        data-testid={dataTestId}
      >
        Place order
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="stripe-payment-error-message"
      />
    </>
  )
}

const ManualTestPaymentButton = ({ notReady }: { notReady: boolean }) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onPaymentCompleted = async () => {
    await placeOrder()
      .catch((err) => {
        setErrorMessage(err.message)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  const handlePayment = () => {
    setSubmitting(true)

    onPaymentCompleted()
  }

  return (
    <>
      <Button
        disabled={notReady}
        isLoading={submitting}
        onClick={handlePayment}
        size="large"
        data-testid="submit-order-button"
      >
        Place order
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="manual-payment-error-message"
      />
    </>
  )
}

export default PaymentButton
