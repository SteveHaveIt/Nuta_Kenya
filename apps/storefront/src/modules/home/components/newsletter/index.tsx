"use client"

import { useState } from "react"
import { Heading } from "@modules/common/components/ui"
import { Button } from "@modules/common/components/ui"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      // In production, this would send to an API
    }
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#FFF8F0] to-[#FAF0E6] rounded-3xl p-8 md:p-12 border border-[#E8D5C4] text-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4A574]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#8B4513]/10 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <span className="text-5xl mb-6 block">📬</span>
              
              <Heading level="h2" className="text-2xl md:text-3xl font-bold text-[#2C1810] mb-4">
                Stay in the Loop
              </Heading>
              
              <p className="text-[#5C4033] max-w-xl mx-auto mb-8">
                Subscribe to our newsletter for exclusive discounts, healthy recipes, 
                nutrition tips, and new product announcements.
              </p>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 px-6 py-4 rounded-full border border-[#D4A574] bg-white focus:outline-none focus:ring-2 focus:ring-[#8B4513] text-[#2C1810]"
                  />
                  <Button 
                    type="submit"
                    className="bg-[#8B4513] hover:bg-[#6B3410] text-white px-8 py-4 rounded-full font-semibold transition-colors whitespace-nowrap"
                  >
                    Subscribe
                  </Button>
                </form>
              ) : (
                <div className="bg-green-100 text-green-800 px-6 py-4 rounded-full inline-flex items-center gap-2">
                  <span className="text-xl">✓</span>
                  <span className="font-medium">Thank you for subscribing!</span>
                </div>
              )}

              <p className="text-xs text-[#5C4033] mt-6">
                By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
