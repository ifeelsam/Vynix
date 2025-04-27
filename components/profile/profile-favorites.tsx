"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { Eye, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Generate mock favorite cards
const generateFavorites = (count: number) => {
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
      owner: "CardMaster" + Math.floor(Math.random() * 100),
    }
  })
}

const favoriteCards = generateFavorites(12)

export function ProfileFavorites() {
  return (
    <div>
      {favoriteCards.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {favoriteCards.map((card) => (
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

                {/* Favorite indicator */}
                <div className="absolute top-2 right-2 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-full p-1">
                  <Heart className="h-3 w-3 text-[#FF6B6B] fill-[#FF6B6B]" />
                </div>

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

              {/* Card owner */}
              <div className="mt-2 text-center">
                <p className="text-[14px] text-[#121F3D]/70 dark:text-[#B6B8CF]">Owned by {card.owner}</p>
                <p className="text-[16px] font-medium text-[#121F3D] dark:text-white">${card.price.toLocaleString()}</p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-[#121F3D]/70 dark:text-[#B6B8CF] mb-4">You haven't favorited any cards yet</p>
          <Button className="rounded-full bg-[#6C63FF] dark:bg-[#8075FF] text-white hover:bg-[#5D51FF] dark:hover:bg-[#6C63FF]">
            Explore Marketplace
          </Button>
        </div>
      )}
    </div>
  )
}
