"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, useMotionValue, useTransform, useSpring, useInView } from "framer-motion"
import { Heart, Eye, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Generate mock card data
const generateCards = (count: number) => {
  const cardTypes = ["normal", "holographic", "full-art", "reverse-holo", "gold"]
  const rarities = ["Common", "Uncommon", "Rare", "Holo Rare", "Ultra Rare"]
  const conditions = ["PSA 10", "PSA 9", "PSA 8", "BGS 9.5", "Raw"]
  const sets = ["Base Set", "Jungle", "Fossil", "Team Rocket", "Gym Heroes", "Neo Genesis"]
  const pokemonNames = [
    "Pikachu",
    "Charizard",
    "Blastoise",
    "Venusaur",
    "Mewtwo",
    "Mew",
    "Gyarados",
    "Dragonite",
    "Gengar",
    "Alakazam",
    "Machamp",
    "Zapdos",
    "Articuno",
    "Moltres",
    "Snorlax",
    "Lapras",
    "Vaporeon",
    "Jolteon",
    "Flareon",
    "Eevee",
  ]

  return Array.from({ length: count }, (_, i) => {
    const id = (i + 1).toString()
    const name = pokemonNames[Math.floor(Math.random() * pokemonNames.length)]
    const set = sets[Math.floor(Math.random() * sets.length)]
    const rarity = rarities[Math.floor(Math.random() * rarities.length)]
    const condition = conditions[Math.floor(Math.random() * conditions.length)]
    const type = cardTypes[Math.floor(Math.random() * cardTypes.length)]
    const price = Math.floor(Math.random() * 10000) + 10
    const auction = Math.random() > 0.7
    const timeLeft = `${Math.floor(Math.random() * 3) + 1}d ${Math.floor(Math.random() * 23) + 1}h`
    const bids = Math.floor(Math.random() * 30) + 1
    const hot = Math.random() > 0.8
    const justSold = !auction && Math.random() > 0.9
    const recentPriceChange = Math.random() > 0.8

    return {
      id,
      name,
      set,
      image: `/placeholder.svg?height=350&width=250&query=${name} pokemon card`,
      rarity,
      condition,
      price,
      auction,
      timeLeft: auction ? timeLeft : undefined,
      bids: auction ? bids : undefined,
      type,
      hot,
      justSold,
      recentPriceChange,
      viewers: hot ? Math.floor(Math.random() * 10) + 3 : undefined,
    }
  })
}

const cards = generateCards(24)

interface CardProps {
  card: any
  onLike: (id: string) => void
  isLiked: boolean
}

function Card({ card, onLike, isLiked }: CardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" })

  // 3D tilt effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-100, 100], [10, -10])
  const rotateY = useTransform(x, [-100, 100], [-10, 10])

  const springConfig = { stiffness: 300, damping: 30 }
  const springRotateX = useSpring(rotateX, springConfig)
  const springRotateY = useSpring(rotateY, springConfig)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className="group relative"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
      }}
    >
      <motion.div
        className="relative bg-white dark:bg-[#1A1A1A] rounded-2xl overflow-hidden shadow-md dark:shadow-[#352F7E]/10 hover:shadow-lg dark:hover:shadow-[#352F7E]/20 border border-transparent dark:border-[#2A2A2A]/50 p-3"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Status indicators */}
        {card.hot && (
          <div className="absolute top-3 left-3 bg-[#FF6B6B] dark:bg-[#FF7E7E] text-white px-2 py-0.5 rounded-full text-xs font-medium z-10 flex items-center">
            <span className="h-1.5 w-1.5 bg-white rounded-full mr-1 animate-pulse"></span>
            Hot
          </div>
        )}

        {card.justSold && (
          <div className="absolute top-0 left-0 right-0 bg-[#4ECCA3] dark:bg-[#5DDFB8] text-white py-1 text-xs font-medium text-center z-10">
            Just Sold
          </div>
        )}

        {/* Card image with proper aspect ratio */}
        <div className="relative h-[200px] w-[143px] mx-auto mb-3">
          <div
            className={cn(
              "absolute inset-0 rounded-lg overflow-hidden shadow-sm",
              card.type === "holographic" && "holographic-effect",
              card.type === "full-art" && "full-art-effect",
              card.type === "gold" && "gold-effect",
              card.type === "reverse-holo" && "reverse-holo-effect",
            )}
          >
            <Image src={card.image || "/placeholder.svg"} alt={card.name} fill className="object-cover" />

            {/* Quick view overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Button
                variant="secondary"
                size="sm"
                className="rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm scale-90 group-hover:scale-100 transition-transform"
              >
                <Eye className="h-3 w-3 mr-1" />
                Quick View
              </Button>
            </div>
          </div>
        </div>

        {/* Card details */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-[#121F3D] dark:text-[#E0E0E0] truncate max-w-[80%]">{card.name}</h3>
            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={() => onLike(card.id)}>
              <Heart
                className={cn(
                  "h-4 w-4 transition-all duration-300",
                  isLiked ? "fill-[#FF6B6B] text-[#FF6B6B] scale-110" : "text-[#121F3D]/50 dark:text-[#B6B8CF]/50",
                )}
              />
            </Button>
          </div>

          <div className="flex items-center text-xs text-[#121F3D]/70 dark:text-[#B6B8CF]">
            <div className="bg-[#E4E1FF] dark:bg-[#2A2A2A] h-4 w-4 rounded-full mr-1.5 flex items-center justify-center text-[10px]">
              <span className="text-[#6C63FF] dark:text-[#8075FF]">S</span>
            </div>
            {card.set}
          </div>

          <div className="flex items-center gap-1.5">
            <div className="bg-[#FFD166] dark:bg-[#FFE066] text-[#121F3D] px-1.5 py-0.5 rounded-full text-[10px] font-medium">
              {card.rarity}
            </div>
            <div className="bg-[#E4E1FF] dark:bg-[#2A2A2A] text-[#6C63FF] dark:text-[#8075FF] px-1.5 py-0.5 rounded-full text-[10px] font-medium">
              {card.condition}
            </div>
          </div>

          {card.auction ? (
            <div className="pt-1 space-y-1">
              <div className="flex items-center justify-between">
                <div className="text-xs text-[#121F3D]/70 dark:text-[#B6B8CF]">Current Bid</div>
                <div className="font-bold text-sm text-[#121F3D] dark:text-[#E0E0E0]">${card.price}</div>
              </div>
              <div className="flex items-center justify-between text-[10px] text-[#121F3D]/70 dark:text-[#B6B8CF]">
                <div className="flex items-center">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1"
                  >
                    <path
                      d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {card.timeLeft}
                </div>
                <div>{card.bids} bids</div>
              </div>
              <Button className="w-full h-7 rounded-full text-xs text-white bg-gradient-to-r from-[#6C63FF] to-[#5D51FF] dark:from-[#8075FF] dark:to-[#6C63FF] hover:from-[#5D51FF] hover:to-[#6C63FF]">
                Place Bid
              </Button>
            </div>
          ) : (
            <div className="pt-1 space-y-1">
              <div className="flex items-center justify-between">
                <div className="text-xs text-[#121F3D]/70 dark:text-[#B6B8CF]">Price</div>
                <div className="flex items-center">
                  <div className="font-bold text-sm text-[#121F3D] dark:text-[#E0E0E0]">${card.price}</div>
                  {card.recentPriceChange && (
                    <div className="ml-1 text-[10px] text-[#4ECCA3] dark:text-[#5DDFB8] flex items-center">
                      <ArrowUp className="h-2 w-2 mr-0.5" />
                      5%
                    </div>
                  )}
                </div>
              </div>
              <Button className="w-full h-7 rounded-full text-xs text-white bg-gradient-to-r from-[#6C63FF] to-[#5D51FF] dark:from-[#8075FF] dark:to-[#6C63FF] hover:from-[#5D51FF] hover:to-[#6C63FF]">
                Buy Now
              </Button>
            </div>
          )}
        </div>

        {/* Authentication badge */}
        <div className="absolute bottom-3 right-3">
          <div className="bg-[#4ECCA3] dark:bg-[#5DDFB8] rounded-full p-0.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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

        {/* Viewers indicator */}
        {card.viewers && (
          <div className="absolute top-3 right-3 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-full px-2 py-0.5 text-[10px] font-medium text-[#121F3D] dark:text-[#E0E0E0] flex items-center">
            <Eye className="h-3 w-3 mr-1 text-[#6C63FF] dark:text-[#8075FF]" />
            {card.viewers} viewing
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export function MarketplaceGrid() {
  const [likedCards, setLikedCards] = useState<string[]>([])
  const [showBackToTop, setShowBackToTop] = useState(false)

  const handleLike = (id: string) => {
    setLikedCards((prev) => (prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id]))
  }

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {cards.map((card) => (
          <Card key={card.id} card={card} onLike={handleLike} isLiked={likedCards.includes(card.id)} />
        ))}
      </div>

      {/* Load more button */}
      <div className="mt-12 text-center">
        <Button
          variant="outline"
          className="rounded-full border-[#6C63FF] dark:border-[#8075FF] text-[#6C63FF] dark:text-[#8075FF] hover:bg-[#E4E1FF] dark:hover:bg-[#1A1A1A]"
        >
          Load More Cards
        </Button>
      </div>

      {/* Back to top button */}
      {showBackToTop && (
        <motion.button
          className="fixed bottom-8 right-8 bg-white dark:bg-[#1A1A1A] shadow-lg dark:shadow-[#352F7E]/20 rounded-full p-3 z-50"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowUp className="h-5 w-5 text-[#6C63FF] dark:text-[#8075FF]" />
        </motion.button>
      )}
    </div>
  )
}
