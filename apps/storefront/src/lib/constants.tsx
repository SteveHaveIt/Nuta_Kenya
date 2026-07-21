import { CreditCard, DeviceMobile } from "@medusajs/icons"
import React from "react"

/* Map of payment provider_id to their title and icon. */
export const paymentInfoMap: Record<
  string,
  { title: string; icon: React.JSX.Element }
> = {
  // Paynector (Card/Mobile Money for Kenya)
  pp_paynector_paynector: {
    title: "Paynector (Card/Mobile)",
    icon: <CreditCard />,
  },
  // M-PESA (Mobile Money for Kenya)
  pp_mpesa_mpesa: {
    title: "M-PESA",
    icon: <DeviceMobile />,
  },
}

// Check if payment provider is Paynector
export const isPaynector = (providerId?: string) => {
  return providerId === "pp_paynector_paynector"
}

// Check if payment provider is M-PESA
export const isMpesa = (providerId?: string) => {
  return providerId === "pp_mpesa_mpesa"
}

// Check if payment provider is Stripe (legacy - not used anymore)
export const isStripeLike = (providerId?: string) => {
  return false // Disabled - no Stripe in Kenya
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
