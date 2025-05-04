"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Clock, Heart, Eye, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const featuredCards = [
  {
    id: "1",
    name: "Charizard",
    set: "Base Set",
    image: "/fiery-dragon-card.png",
    rarity: "Holo Rare",
    condition: "PSA 9",
    price: 12500,
    auction: true,
    timeLeft: "2d 5h",
    bids: 24,
    type: "holographic",
  },
  {
    id: "2",
    name: "Pikachu Illustrator",
    set: "Promo",
    image: "/electric-mouse-art.png",
    rarity: "Ultra Rare",
    condition: "BGS 9",
    price: 375000,
    auction: false,
    type: "full-art",
  },
  {
    id: "3",
    name: "Lugia 1st Edition",
    set: "Neo Genesis",
    image: "/swirling-sea-guardian.png",
    rarity: "Holo Rare",
    condition: "PSA 10",
    price: 28500,
    auction: true,
    timeLeft: "4d 12h",
    bids: 18,
    type: "holographic",
  },
]

export function MarketplaceFeatured() {
  const [expanded, setExpanded] = useState(true)
  const [likedCards, setLikedCards] = useState<string[]>([])

  const toggleLike = (id: string) => {
    setLikedCards((prev) => (prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id]))
  }

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#121F3D] dark:text-[#E8E6FF]">Featured Cards</h2>
        <div className="flex items-center space-x-4">
          <Link href="/marketplace" className="text-[#6C63FF] dark:text-[#8075FF] hover:underline font-medium">
            View All Cards
          </Link>
          <Button variant="ghost" size="sm" className="rounded-full" onClick={() => setExpanded(!expanded)}>
            {expanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                Collapse
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                Expand
              </>
            )}
          </Button>
        </div>
      </div>

      {expanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCards.map((card) => (
            <Link href={`/marketplace/card/${card.id}`} key={card.id} className="group relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <div className="relative bg-white dark:bg-[#1A1C36] rounded-3xl overflow-hidden shadow-lg dark:shadow-[#352F7E]/20 hover:shadow-xl dark:hover:shadow-[#352F7E]/30 border border-transparent dark:border-[#352F7E]/20 p-4">
                  {/* Premium indicator */}
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-[#FFD166] to-[#FF6B6B] dark:from-[#FFE066] dark:to-[#FF7E7E] text-white px-3 py-1 rounded-full text-xs font-medium z-10">
                    Featured
                  </div>

                  {/* Card image with proper aspect ratio */}
                  <div className="relative h-[350px] w-[250px] mx-auto mb-4 perspective-card group-hover:transform-card">
                    <div
                      className={cn(
                        "absolute inset-0 rounded-lg overflow-hidden shadow-md",
                        card.type === "holographic" && "holographic-effect",
                        card.type === "full-art" && "full-art-effect",
                      )}
                    >
                      <Image src={card.image} alt={card.name}
                        width={250} height={350} className="object-cover" />
                      {/* Quick view overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm"
                          onClick={(e) => {
                            e.preventDefault();
                            // Quick view logic here
                          }}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Quick View
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Card details */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xl text-[#121F3D] dark:text-[#E8E6FF]">{card.name}</h3>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="rounded-full" 
                        onClick={(e) => {
                          e.preventDefault();
                          toggleLike(card.id);
                        }}
                      >
                        <Heart
                          className={cn(
                            "h-5 w-5 transition-all duration-300",
                            likedCards.includes(card.id)
                              ? "fill-[#FF6B6B] text-[#FF6B6B] scale-110"
                              : "text-[#121F3D]/50 dark:text-[#B6B8CF]/50",
                          )}
                        />
                      </Button>
                    </div>

                    <div className="flex items-center text-sm text-[#121F3D]/70 dark:text-[#B6B8CF]">
                      <div className="bg-[#E4E1FF] dark:bg-[#322F5D] h-5 w-5 rounded-full mr-2 flex items-center justify-center text-xs">
                        <span className="text-[#6C63FF] dark:text-[#8075FF]">S</span>
                      </div>
                      {card.set}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-[#FFD166] dark:bg-[#FFE066] text-[#121F3D] px-2 py-0.5 rounded-full text-xs font-medium">
                          {card.rarity}
                        </div>
                        <div className="ml-2 bg-[#E4E1FF] dark:bg-[#322F5D] text-[#6C63FF] dark:text-[#8075FF] px-2 py-0.5 rounded-full text-xs font-medium">
                          {card.condition}
                        </div>
                      </div>
                    </div>

                    {card.auction ? (
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-[#121F3D]/70 dark:text-[#B6B8CF]">Current Bid</div>
                          <div className="font-bold text-[#121F3D] dark:text-[#E8E6FF]">
                            ${card.price.toLocaleString()}
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-[#121F3D]/70 dark:text-[#B6B8CF]">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {card.timeLeft}
                          </div>
                          <div>{card.bids} bids</div>
                        </div>
                        <Button 
                          className="w-full rounded-full text-white bg-gradient-to-r from-[#6C63FF] to-[#5D51FF] dark:from-[#8075FF] dark:to-[#6C63FF] hover:from-[#5D51FF] hover:to-[#6C63FF]"
                          onClick={(e) => e.preventDefault()}
                        >
                          Place Bid
                        </Button>
                      </div>
                    ) : (
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-[#121F3D]/70 dark:text-[#B6B8CF]">Price</div>
                          <div className="font-bold text-[#121F3D] dark:text-[#E8E6FF]">
                            ${card.price.toLocaleString()}
                          </div>
                        </div>
                        <Button 
                          className="w-full rounded-full text-white bg-gradient-to-r from-[#6C63FF] to-[#5D51FF] dark:from-[#8075FF] dark:to-[#6C63FF] hover:from-[#5D51FF] hover:to-[#6C63FF]"
                          onClick={(e) => e.preventDefault()}
                        >
                          Buy Now
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Authentication badge */}
                  <div className="absolute bottom-4 right-4">
                    <div className="bg-[#4ECCA3] dark:bg-[#5DDFB8] rounded-full p-1">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
