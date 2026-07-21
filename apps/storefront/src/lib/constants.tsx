import { CreditCard } from "@medusajs/icons"
import React from "react"

/* Map of payment provider_id to their title and icon. Add in any payment providers you want to use. */
export const paymentInfoMap: Record<
  string,
  { title: string; icon: React.JSX.Element }
> = {
  // Manual Payment (System Default)
  pp_system_default: {
    title: "Manual Payment",
    icon: <CreditCard />,
  },
  // Paynector (Card/Mobile Money for Kenya)
  pp_paynector_paynector: {
    title: "Paynector (Card/Mobile)",
    icon: <CreditCard />,
  },
  // M-PESA (Mobile Money for Kenya)
  pp_mpesa_mpesa: {
    title: "M-PESA",
    icon: <CreditCard />,
  },
}

// This only checks if it is native stripe or medusa payments for card payments
export const isStripeLike = (providerId?: string) => {
  return (
    providerId?.startsWith("pp_stripe_") || providerId?.startsWith("pp_medusa-")
  )
}

export const isPaynector = (providerId?: string) => {
  return providerId === "pp_paynector_paynector"
}

export const isMpesa = (providerId?: string) => {
  return providerId === "pp_mpesa_mpesa"
}

export const isPaypal = (providerId?: string) => {
  return providerId?.startsWith("pp_paypal")
}
export const isManual = (providerId?: string) => {
  return providerId?.startsWith("pp_system_default")
}

// Add currencies that don't need to be divided by 100
export const noDivisionCurrencies = [
  "krw",
  "jpy",
  "vnd",
  "clp",
  "pyg",
  "xaf",
  "xof",
  "bif",
  "djf",
  "gnf",
  "kmf",
  "mga",
  "rwf",
  "xpf",
  "htg",
  "vuv",
  "xag",
  "xdr",
  "xau",
]
