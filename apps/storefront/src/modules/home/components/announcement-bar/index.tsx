"use client"

import { useState, useEffect } from "react"

const announcements = [
  "🥜 Free delivery on qualifying orders",
  "✨ 100% Natural Peanut Products",
  "🇰🇪 Proudly Made in Kenya",
  "🌱 Freshly Roasted Every Week",
  "🔥 Special Offers - Shop Now!",
]

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gradient-to-r from-[#8B4513] via-[#A0522D] to-[#8B4513] text-white py-3 px-4 relative overflow-hidden">
      {/* Decorative stripe */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#D4A574]/20 via-transparent to-[#D4A574]/20" />
      
      {/* Left decoration */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-[#4E8B41]" />
      
      <div className="flex items-center justify-center relative z-10">
        <p className="text-sm md:text-base font-semibold text-center tracking-wide transition-opacity duration-500">
          {announcements[currentIndex]}
        </p>
      </div>
    </div>
  )
}
