"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Mic } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const categories = [
  { name: "Pokemon", icon: "pokeball", active: true },
  { name: "Sports Cards", icon: "sports", active: false },
  { name: "TCG", icon: "cards", active: false },
  { name: "Collectible Cards", icon: "collectible", active: false },
  { name: "Limited Editions", icon: "limited", active: false },
]

export function MarketplaceHeader() {
  const [searchFocused, setSearchFocused] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("Pokemon")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  return (
    <div className="relative">
      {/* Category Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#6C63FF]/10 to-[#5D51FF]/20 dark:from-[#1A1A1A] dark:to-[#121212] -z-10"></div>

        {/* Pokemon-themed background elements */}
        {selectedCategory === "Pokemon" && (
          <>
            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#E4E1FF] dark:bg-[#2A2A2A] blur-3xl opacity-30 animate-float -z-10"></div>
            <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-[#6C63FF] dark:bg-[#1A1A1A] blur-3xl opacity-20 animate-float-delayed -z-10"></div>

            {/* Pokemon silhouettes */}
            <div className="absolute top-20 right-[10%] w-32 h-32 opacity-10 dark:opacity-5 -z-5">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  d="M25,75 C25,91.5 41.5,91.5 50,83 C58.5,91.5 75,91.5 75,75 C75,58.5 58.5,58.5 50,67 C41.5,58.5 25,58.5 25,75 Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div className="absolute bottom-10 left-[15%] w-24 h-24 opacity-10 dark:opacity-5 -z-5">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" />
                <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="8" />
                <circle cx="50" cy="50" r="15" fill="currentColor" />
              </svg>
            </div>
          </>
        )}

        <div className="max-w-7xl mx-auto px-4 py-12">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-[#6C63FF] to-[#5D51FF] dark:from-[#8075FF] dark:to-[#6C63FF] text-transparent bg-clip-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {selectedCategory} Trading Cards
          </motion.h1>
          <motion.p
            className="text-lg text-center text-[#121F3D]/80 dark:text-[#B6B8CF] max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Authentic physical cards with digital verification
          </motion.p>
        </div>
      </div>

      {/* Category Navigation */}
      <div
        className={cn(
          "sticky top-20 z-30 bg-white/80 dark:bg-black/80 backdrop-blur-md transition-all duration-300 py-4",
          scrolled && "shadow-md",
        )}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col space-y-4">
            {/* Category Pills */}
            <div className="flex overflow-x-auto pb-2 hide-scrollbar">
              <div className="flex space-x-2">
                {categories.map((category) => (
                  <Button
                    key={category.name}
                    variant={category.name === selectedCategory ? "default" : "outline"}
                    className={cn(
                      "rounded-full whitespace-nowrap",
                      category.name === selectedCategory
                        ? "bg-gradient-to-r from-[#6C63FF] to-[#5D51FF] dark:from-[#8075FF] dark:to-[#6C63FF] text-white"
                        : "text-[#121F3D] dark:text-[#E0E0E0]",
                    )}
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    {category.name === "Pokemon" && (
                      <div className="mr-2 relative w-5 h-5">
                        <div className="absolute inset-0 rounded-full bg-white dark:bg-[#1A1A1A] border-2 border-current"></div>
                        <div className="absolute inset-[30%] rounded-full bg-current"></div>
                      </div>
                    )}
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <div
                className={cn(
                  "flex items-center bg-white dark:bg-[#1A1A1A] rounded-full border border-[#E4E1FF] dark:border-[#2A2A2A] overflow-hidden transition-all duration-300",
                  searchFocused ? "ring-2 ring-[#6C63FF] dark:ring-[#8075FF]" : "",
                )}
              >
                <Search className="h-5 w-5 text-[#6C63FF] dark:text-[#8075FF] ml-4" />
                <Input
                  type="text"
                  placeholder={`Search ${selectedCategory} cards...`}
                  className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-[#121F3D] dark:text-[#E0E0E0] placeholder:text-[#121F3D]/50 dark:placeholder:text-[#E0E0E0]/50"
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
                <Button variant="ghost" size="icon" className="rounded-full mr-1">
                  <Mic className="h-5 w-5 text-[#6C63FF] dark:text-[#8075FF]" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
