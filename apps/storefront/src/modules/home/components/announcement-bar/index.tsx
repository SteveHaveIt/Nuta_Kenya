"use client"

import { useState, useEffect } from "react"

const announcements = [
  "Free delivery on qualifying orders",
  "100% Natural Peanut Products",
  "Proudly Made in Kenya",
  "Freshly Roasted Every Week",
  "Special Offers - Shop Now!",
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
    <div className="bg-[#8B4513] text-white py-2 px-4">
      <div className="flex items-center justify-center">
        <p className="text-sm md:text-base font-medium text-center transition-opacity duration-500">
          {announcements[currentIndex]}
        </p>
      </div>
    </div>
  )
}
