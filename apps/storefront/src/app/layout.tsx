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
      <head>
        {/* Google Fonts - Plus Jakarta Sans for body, Playfair Display for headings */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600&family=Playfair+Display:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-cream-100 text-nutaText-primary">
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
