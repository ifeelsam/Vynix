"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface Card {
  id: string
  name: string
  set: string
  image: string
  rarity: string
  condition: string
  price: number
  cardType: string
}

interface CardCarouselProps {
  cards: Card[]
}

export function CardCarousel({ cards }: CardCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const scrollNext = () => {
    if (activeIndex < cards.length - 1) {
      setActiveIndex(activeIndex + 1)
      carouselRef.current?.scrollTo({
        left: (carouselRef.current.scrollWidth / cards.length) * (activeIndex + 1),
        behavior: "smooth",
      })
    }
  }

  const scrollPrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1)
      carouselRef.current?.scrollTo({
        left: (carouselRef.current.scrollWidth / cards.length) * (activeIndex - 1),
        behavior: "smooth",
      })
    }
  }

  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft
      const itemWidth = carouselRef.current.scrollWidth / cards.length
      const index = Math.round(scrollLeft / itemWidth)
      setActiveIndex(index)
    }
  }

  return (
    <div className="relative group">
      {/* Navigation buttons */}
      <Button
        variant="secondary"
        size="icon"
        className={cn(
          "absolute -left-4 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-[#0C0E1B]/80 border border-[#352F7E]/20 shadow-md opacity-0 group-hover:opacity-100 transition-opacity text-white",
          activeIndex === 0 ? "hidden" : "block",
        )}
        onClick={scrollPrev}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <Button
        variant="secondary"
        size="icon"
        className={cn(
          "absolute -right-4 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-[#0C0E1B]/80 border border-[#352F7E]/20 shadow-md opacity-0 group-hover:opacity-100 transition-opacity text-white",
          activeIndex === cards.length - 1 ? "hidden" : "block",
        )}
        onClick={scrollNext}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Carousel */}
      <div
        ref={carouselRef}
        className="flex overflow-x-auto hide-scrollbar pb-6 snap-x snap-mandatory scroll-smooth"
        onScroll={handleScroll}
      >
        {cards.map((card, index) => (
          <div key={card.id} className="min-w-[180px] max-w-[180px] mr-4 snap-start">
            <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
              <div className="bg-[#0C0E1B]/80 backdrop-blur-md rounded-xl overflow-hidden shadow-md hover:shadow-lg border border-[#352F7E]/20">
                <div className="relative h-[220px] w-full">
                  <div
                    className={cn(
                      "absolute inset-0",
                      card.cardType === "holographic" && "holographic-effect",
                      card.cardType === "full-art" && "full-art-effect",
                    )}
                  >
                    <Image src={card.image || "/placeholder.svg"} alt={card.name} fill className="object-cover" />
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="font-medium text-white truncate">{card.name}</h4>
                  <p className="text-xs text-[#B6B8CF] mb-2">{card.set}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium bg-[#322F5D] text-[#8075FF] rounded-full px-2 py-0.5 border border-[#8075FF]/20">
                      {card.condition}
                    </span>
                    <span className="font-medium text-sm text-white">${card.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="flex justify-center mt-2 space-x-1.5">
        {cards.map((_, index) => (
          <button
            key={index}
            className={`h-1.5 rounded-full transition-all ${
              activeIndex === index ? "w-4 bg-[#8075FF]" : "w-1.5 bg-[#352F7E]/30"
            }`}
            onClick={() => {
              setActiveIndex(index)
              carouselRef.current?.scrollTo({
                left: (carouselRef.current.scrollWidth / cards.length) * index,
                behavior: "smooth",
              })
            }}
          ></button>
        ))}
      </div>
    </div>
  )
}
