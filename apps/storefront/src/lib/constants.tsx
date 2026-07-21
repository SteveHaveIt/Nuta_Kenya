import { CreditCard } from "@medusajs/icons"
import React from "react"

/* Map of payment provider_id to their title and icon. Add in any payment providers you want to use. */
export const paymentInfoMap: Record<
  string,
  { title: string; icon: React.JSX.Element }
> = {
  // Paynector (System Default for Kenya)
  pp_paynector_paynector: {
    title: "Paynector (Card/Mobile)",
    icon: <CreditCard />,
  },
  // M-PESA (Mobile Money for Kenya)
  pp_mpesa_mpesa: {
    title: "M-PESA",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#00A86B"/>
        <path d="M6 8H18C18.5523 8 19 8.44772 19 9V15C19 15.5523 18.5523 16 18 16H6C5.44772 16 5 15.5523 5 15V9C5 8.44772 5.44772 8 6 8Z" fill="white"/>
        <path d="M8 11L10 13L8 15M11 12H16" stroke="#00A86B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  // Legacy manual payment (kept for reference, can be removed)
  pp_system_default: {
    title: "Manual Payment",
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
  return providerId?.startsWith("pp_paynector")
}

export const isMpesa = (providerId?: string) => {
  return providerId?.startsWith("pp_mpesa")
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
