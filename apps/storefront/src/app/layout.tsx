import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: "NUTA Store | Premium Kenyan Peanut Products",
  description: "Discover naturally nutritious peanut products proudly made in Kenya. Shop premium peanut butter, roasted peanuts, and more.",
  keywords: ["peanut butter", "kenyan products", "natural food", "healthy snacks", "nuta"],
  authors: [{ name: "Steve Have It" }],
  openGraph: {
    title: "NUTA Store | Premium Kenyan Peanut Products",
    description: "Discover naturally nutritious peanut products proudly made in Kenya.",
    siteName: "NUTA Store",
    type: "website",
  },
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
