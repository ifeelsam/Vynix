"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Eye, Filter, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Generate mock card data
const generateCards = (count: number) => {
  const cardTypes = ["normal", "holographic", "full-art", "reverse-holo", "gold"]
  const rarities = ["Common", "Uncommon", "Rare", "Holo Rare", "Ultra Rare"]
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
    const type = cardTypes[Math.floor(Math.random() * cardTypes.length)]
    const price = Math.floor(Math.random() * 10000) + 10

    return {
      id,
      name,
      set,
      image: `/placeholder.svg?height=350&width=250&query=${name} pokemon card`,
      rarity,
      price,
      type,
    }
  })
}

const collectionCards = generateCards(18)

export function ProfileCollection() {
  const [showFilters, setShowFilters] = useState(false)
  const [showStats, setShowStats] = useState(true)

  return (
    <div>
      {/* Collection Overview */}
      <motion.div
        className={cn("mb-8 overflow-hidden transition-all duration-300", showStats ? "max-h-[200px]" : "max-h-0")}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[20px] font-bold text-[#121F3D] dark:text-white">Collection Overview</h2>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 rounded-full text-[#121F3D]/70 dark:text-[#B6B8CF] hover:bg-[#F9F9FB] dark:hover:bg-[#1A1C36]"
            onClick={() => setShowStats(!showStats)}
          >
            {showStats ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>

        <div className="bg-[#F9F9FB] dark:bg-[#1A1C36] rounded-2xl p-6">
          <div className="flex flex-wrap gap-8 items-center">
            <div>
              <div className="text-[14px] text-[#121F3D]/70 dark:text-[#B6B8CF] mb-1">Total Cards</div>
              <div className="text-[20px] font-bold text-[#121F3D] dark:text-white">124</div>
            </div>

            <div>
              <div className="text-[14px] text-[#121F3D]/70 dark:text-[#B6B8CF] mb-1">Highest Value</div>
              <div className="text-[20px] font-bold text-[#121F3D] dark:text-white">$12,500</div>
            </div>

            <div>
              <div className="text-[14px] text-[#121F3D]/70 dark:text-[#B6B8CF] mb-1">Collection Growth</div>
              <div className="flex items-center">
                <div className="text-[20px] font-bold text-[#4ECCA3] dark:text-[#5DDFB8]">+15%</div>
                <div className="ml-3 w-24 h-8 relative">
                  <svg
                    viewBox="0 0 100 30"
                    className="w-full h-full stroke-[#4ECCA3] dark:stroke-[#5DDFB8] fill-none stroke-2"
                  >
                    <path d="M0,25 L10,20 L20,22 L30,15 L40,18 L50,10 L60,15 L70,5 L80,8 L90,3 L100,5" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="ml-auto">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-[#E4E1FF] dark:border-[#352F7E] text-[#121F3D]/70 dark:text-[#B6B8CF] hover:bg-[#F9F9FB] dark:hover:bg-[#1A1C36]"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        className={cn("mb-6 overflow-hidden transition-all duration-300", showFilters ? "max-h-[200px]" : "max-h-0")}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: showFilters ? 1 : 0, height: showFilters ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-[#F9F9FB] dark:bg-[#1A1C36] rounded-2xl p-4">
          <div className="flex flex-wrap gap-3">
            <Badge className="bg-white dark:bg-[#131525] hover:bg-white dark:hover:bg-[#131525] text-[#121F3D] dark:text-white rounded-full px-4 py-2">
              All Cards
            </Badge>
            <Badge className="bg-transparent hover:bg-white/10 text-[#121F3D]/70 dark:text-[#B6B8CF] rounded-full px-4 py-2">
              Pokémon
            </Badge>
            <Badge className="bg-transparent hover:bg-white/10 text-[#121F3D]/70 dark:text-[#B6B8CF] rounded-full px-4 py-2">
              Sports
            </Badge>
            <Badge className="bg-transparent hover:bg-white/10 text-[#121F3D]/70 dark:text-[#B6B8CF] rounded-full px-4 py-2">
              TCG
            </Badge>
            <Badge className="bg-transparent hover:bg-white/10 text-[#121F3D]/70 dark:text-[#B6B8CF] rounded-full px-4 py-2">
              Holo Rare
            </Badge>
            <Badge className="bg-transparent hover:bg-white/10 text-[#121F3D]/70 dark:text-[#B6B8CF] rounded-full px-4 py-2">
              PSA Graded
            </Badge>
            <Badge className="bg-transparent hover:bg-white/10 text-[#121F3D]/70 dark:text-[#B6B8CF] rounded-full px-4 py-2">
              First Edition
            </Badge>
          </div>
        </div>
      </motion.div>

      {/* Collection Grid */}
      {collectionCards.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {collectionCards.map((card) => (
            <motion.div
              key={card.id}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="relative aspect-[2.5/3.5] rounded-lg overflow-hidden">
                <Image
                  src={card.image || "/placeholder.svg"}
                  alt={card.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex flex-col items-center">
                    <h3 className="text-white font-medium text-center px-2">{card.name}</h3>
                    <p className="text-white/80 text-xs">{card.set}</p>
                    <Badge className="mt-2 bg-white/80 text-[#121F3D] text-xs">{card.rarity}</Badge>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="mt-3 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-[#121F3D]/70 dark:text-[#B6B8CF] mb-4">Your collection is empty</p>
          <Button className="rounded-full bg-[#6C63FF] dark:bg-[#8075FF] text-white hover:bg-[#5D51FF] dark:hover:bg-[#6C63FF]">
            Add Cards
          </Button>
        </div>
      )}
    </div>
  )
}
