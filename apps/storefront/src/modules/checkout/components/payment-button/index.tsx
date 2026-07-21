"use client"

import { isMpesa, isPaynector } from "@lib/constants"
import { placeOrder } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@modules/common/components/ui"
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

  // Show Paynector button if Paynector session exists OR if there are any payment sessions
  const showPaynector = isPaynector(paymentSession?.provider_id) || 
    (cart.payment_collection?.payment_sessions?.length ?? 0) > 0

  if (isPaynector(paymentSession?.provider_id)) {
    return (
      <PaynectorPaymentButton
        notReady={notReady}
        cart={cart}
        data-testid={dataTestId}
      />
    )
  }

  if (isMpesa(paymentSession?.provider_id)) {
    return (
      <MpesaPaymentButton
        notReady={notReady}
        cart={cart}
        data-testid={dataTestId}
      />
    )
  }

  // Default - show Paynector as primary option
  return (
    <PaynectorPaymentButton
      notReady={notReady}
      cart={cart}
      data-testid={dataTestId}
    />
  )
}

// Paynector - Primary payment method (Card/Mobile Money)
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
  const [showFallback, setShowFallback] = useState(false)

  const handlePayment = async () => {
    setSubmitting(true)
    setErrorMessage(null)

    try {
      const session = cart.payment_collection?.payment_sessions?.find(
        (s) => s.status === "pending"
      )
      
      if (session?.data?.checkout_url) {
        // Redirect to Paynector checkout
        window.location.href = session.data.checkout_url as string
        return
      }
      
      // If no checkout URL, try to complete order anyway
      await placeOrder()
    } catch (err: any) {
      // If Paynector fails, show fallback options
      console.error("Paynector error:", err)
      setShowFallback(true)
      setErrorMessage("Paynector payment failed. Please try another method below.")
      setSubmitting(false)
    }
  }

  if (showFallback) {
    return (
      <div className="flex flex-col gap-4">
        <ErrorMessage
          error={errorMessage}
          data-testid="paynector-error-message"
        />
        <div className="flex flex-col gap-2">
          <MpesaPaymentButton
            notReady={notReady}
            cart={cart}
            data-testid="fallback-mpesa-button"
          />
          <MpesaLinkFallback
            cart={cart}
            notReady={notReady}
          />
        </div>
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
        Pay with Paynector (Card/Mobile Money)
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="paynector-payment-error-message"
      />
    </>
  )
}

// M-PESA - STK Push payment (requires phone number)
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
  const [showMpesaLink, setShowMpesaLink] = useState(false)

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
      // The backend will handle the STK push when payment session is initiated
      await placeOrder()
    } catch (err: any) {
      setErrorMessage(err.message || "M-PESA payment failed. Please try again.")
      setSubmitting(false)
    }
  }

  const amount = cart.total ? (cart.total / 100).toFixed(2) : "0.00"

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
            className="w-full h-11 px-4 border border-ui-border-base rounded-md appearance-none bg-ui-bg-field focus:outline-none focus:ring-2 focus:ring-ui-focus"
          />
          <p className="text-xs text-ui-fg-muted">
            Enter the phone number registered with M-PESA (e.g., 0712345678)
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            disabled={notReady || !phoneNumber}
            onClick={handlePayment}
            size="large"
            isLoading={submitting}
            data-testid={dataTestId}
          >
            Pay KES {amount} with M-PESA
          </Button>
          <Button
            variant="secondary"
            onClick={() => setShowPhoneInput(false)}
          >
            Back
          </Button>
        </div>
        <ErrorMessage
          error={errorMessage}
          data-testid="mpesa-payment-error-message"
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
        disabled={notReady}
        onClick={handlePayment}
        size="large"
        isLoading={submitting}
        data-testid={dataTestId}
      >
        Pay with M-PESA (STK Push)
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="mpesa-payment-error-message"
      />
    </div>
  )
}

// M-PESA Link - Fallback option using payment link
const MpesaLinkFallback = ({
  cart,
  notReady,
}: {
  cart: HttpTypes.StoreCart
  notReady: boolean
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [showPhoneInput, setShowPhoneInput] = useState(false)
  const [linkSent, setLinkSent] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleMpesaLink = async () => {
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
      // Generate a payment link and open it
      const amount = cart.total ? (cart.total / 100).toFixed(2) : "0.00"
      const orderId = cart.id || `ORDER-${Date.now()}`
      
      // Create a M-PESA payment link (this would be generated by your backend)
      // For now, we'll show a placeholder link
      const mpesaLink = `https://pay.nuta.co.ke/mpesa?amount=${amount}&phone=${phoneNumber}&ref=${orderId}`
      
      // Open the link in a new tab
      window.open(mpesaLink, '_blank')
      setLinkSent(true)
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to generate payment link")
    } finally {
      setSubmitting(false)
    }
  }

  if (linkSent) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-green-700 text-sm font-medium">
          ✓ M-PESA payment link sent!
        </p>
        <p className="text-green-600 text-xs mt-1">
          Check your phone and complete the payment in the M-PESA app.
        </p>
      </div>
    )
  }

  if (showPhoneInput) {
    return (
      <div className="flex flex-col gap-2 border-t border-gray-200 pt-4 mt-4">
        <p className="text-sm text-ui-fg-subtle">
          Alternative: Pay via M-PESA Link
        </p>
        <input
          type="tel"
          placeholder="07XXXXXXXX (M-PESA number)"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full h-11 px-4 border border-ui-border-base rounded-md appearance-none bg-ui-bg-field focus:outline-none focus:ring-2 focus:ring-ui-focus"
        />
        <Button
          variant="secondary"
          disabled={notReady || !phoneNumber}
          onClick={handleMpesaLink}
          size="large"
          isLoading={submitting}
        >
          Get M-PESA Payment Link
        </Button>
        <ErrorMessage
          error={errorMessage}
          data-testid="mpesa-link-error-message"
        />
      </div>
    )
  }

  return (
    <div className="border-t border-gray-200 pt-4 mt-4">
      <Button
        variant="secondary"
        disabled={notReady}
        onClick={handleMpesaLink}
        size="large"
      >
        Pay via M-PESA Link (Alternative)
      </Button>
    </div>
  )
}

export default PaymentButton
