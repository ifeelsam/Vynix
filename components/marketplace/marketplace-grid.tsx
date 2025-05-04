"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useMotionValue, useTransform, useSpring, useInView } from "framer-motion"
import { Heart, Eye, ArrowUp, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useListedCardsStore, type ListedCard as StoreListedCard } from "@/store/useListedCard"

// Mock data generation can be removed or kept for fallback/other uses
// const generateCards = (count: number) => { ... }
// const cards = generateCards(24);

interface CardProps {
  card: StoreListedCard
  onLike: (id: string) => void
  isLiked: boolean
}

// Helper function to format time remaining (example)
function formatTimeLeft(timestamp?: number): string | undefined {
  if (!timestamp) return undefined;
  const now = Date.now();
  const diff = timestamp - now;
  if (diff <= 0) return "Ended";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
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

  const isAuction = card.listingType === 'auction';

  return (
    <Link href={`/marketplace/card/${card.id}`} className="block">
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
          {Date.now() - card.listTimestamp < 24 * 60 * 60 * 1000 && (
             <div className="absolute top-3 left-3 bg-[#6C63FF] dark:bg-[#8075FF] text-white px-2 py-0.5 rounded-full text-xs font-medium z-10">
               New
             </div>
          )}

          {/* Card image with proper aspect ratio */}
          <div className="relative h-[200px] w-[143px] mx-auto mb-3">
            <div
              className={cn(
                "absolute inset-0 rounded-lg overflow-hidden shadow-sm",
                card.isHolographic && "holographic-effect",
              )}
            >
              <Image src={card.imageUrl || "/placeholder.svg"} alt={card.name} 
                                      width={250} height={350} className="object-cover" />

              {/* Quick view overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Button
                  variant="secondary"
                  size="sm"
                  className="rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm scale-90 group-hover:scale-100 transition-transform"
                  onClick={(e) => {
                    e.preventDefault();
                    // Quick view logic here
                  }}
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
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 rounded-full" 
                onClick={(e) => {
                  e.preventDefault();
                  onLike(card.id);
                }}
              >
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
              {card.set} - #{card.number}
            </div>

            <div className="flex items-center gap-1.5">
              <div className="bg-[#FFD166] dark:bg-[#FFE066] text-[#121F3D] px-1.5 py-0.5 rounded-full text-[10px] font-medium">
                {card.rarity}
              </div>
              <div className="bg-[#E4E1FF] dark:bg-[#2A2A2A] text-[#6C63FF] dark:text-[#8075FF] px-1.5 py-0.5 rounded-full text-[10px] font-medium">
                {card.condition} ({card.grade})
              </div>
            </div>

            {isAuction ? (
              <div className="pt-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-[#121F3D]/70 dark:text-[#B6B8CF]">Starting Bid</div>
                  <div className="font-bold text-sm text-[#121F3D] dark:text-[#E0E0E0]">${card.startingPrice ?? 'N/A'}</div>
                </div>
                <div className="flex items-center justify-between text-[10px] text-[#121F3D]/70 dark:text-[#B6B8CF]">
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatTimeLeft(card.auctionEndDate) ?? 'N/A'}
                  </div>
                </div>
                <Button 
                  className="w-full h-7 rounded-full text-xs text-white bg-gradient-to-r from-[#6C63FF] to-[#5D51FF] dark:from-[#8075FF] dark:to-[#6C63FF] hover:from-[#5D51FF] hover:to-[#6C63FF]"
                  onClick={(e) => e.preventDefault()}
                >
                  Place Bid
                </Button>
              </div>
            ) : (
              <div className="pt-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-[#121F3D]/70 dark:text-[#B6B8CF]">Price</div>
                  <div className="flex items-center">
                    <div className="font-bold text-sm text-[#121F3D] dark:text-[#E0E0E0]">${card.price ?? 'N/A'}</div>
                  </div>
                </div>
                <Button 
                  className="w-full h-7 rounded-full text-xs text-white bg-gradient-to-r from-[#6C63FF] to-[#5D51FF] dark:from-[#8075FF] dark:to-[#6C63FF] hover:from-[#5D51FF] hover:to-[#6C63FF]"
                  onClick={(e) => e.preventDefault()}
                >
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
        </motion.div>
      </motion.div>
    </Link>
  )
}

export function MarketplaceGrid() {
  const listedCards = useListedCardsStore((state) => state.listedCards);
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
        {listedCards.length > 0 ? (
           listedCards.map((card) => (
             <Card key={card.id} card={card} onLike={handleLike} isLiked={likedCards.includes(card.id)} />
           ))
        ) : (
          <div className="col-span-full text-center py-10 text-[#121F3D]/70 dark:text-[#B6B8CF]">
            No cards listed yet. Start listing!
          </div>
        )}
      </div>

      {/* Load more button - Consider implementing pagination if list grows large */}
      {listedCards.length > 0 && (
        <div className="mt-12 text-center">
          <Button
            variant="outline"
            className="rounded-full border-[#6C63FF] dark:border-[#8075FF] text-[#6C63FF] dark:text-[#8075FF] hover:bg-[#E4E1FF] dark:hover:bg-[#1A1A1A]"
          >
            Load More Cards (Example)
          </Button>
        </div>
      )}

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
