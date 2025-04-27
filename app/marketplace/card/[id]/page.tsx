"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, Heart, Share2, ShoppingCart, Eye, Shield, Clock, Users, Star, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CardDetail3D } from "@/components/marketplace/card-detail-3d"
import { PriceHistoryChart } from "@/components/marketplace/price-history-chart"
import { CardCarousel } from "@/components/marketplace/card-carousel"

export default function CardDetailPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const [card, setCard] = useState<any>(null)
  const [isLiked, setIsLiked] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  // Mock data - in a real app you'd fetch this based on params.id
  useEffect(() => {
    // Simulating API fetch
    setTimeout(() => {
      setCard({
        id: params.id,
        name: "Charizard",
        subtitle: "Holo 1st Edition",
        set: "Base Set",
        number: "4/102",
        type: "Fire",
        rarity: "Holo Rare",
        condition: "PSA 9",
        images: [
          "/fiery-dragon-card.png",
          "/pokemon-card-back.png",
          "/holographic-fire-dragon.png",
          "/fiery-dragon-closeup.png",
        ],
        cardType: "holographic",
        price: 12500,
        auction: true,
        timeLeft: "2d 5h",
        bids: 24,
        views: 542,
        watchlist: 128,
        authenticator: "PSA",
        seller: {
          name: "PremiumCards",
          rating: 4.9,
          sales: 1024,
          image: "/mystical-forest-spirit.png",
          verified: true,
        },
        description:
          "The iconic Charizard from the original Pokémon Base Set, featuring stunning holographic artwork. This first edition card is in near-mint condition with minimal edge wear and has been professionally graded by PSA as a 9. Charizard is one of the most sought-after Pokémon cards due to its popularity and historical significance in the trading card game community. The holographic foil is in excellent condition with no scratches or clouding.",
        stats: [
          { name: "HP", value: "120" },
          { name: "Stage", value: "2" },
          { name: "Attack 1", value: "Fire Spin" },
          { name: "Damage", value: "100" },
          { name: "Weakness", value: "Water" },
          { name: "Resistance", value: "Fighting" },
          { name: "Retreat Cost", value: "3" },
        ],
        priceHistory: [
          { date: "2022-05", price: 9800 },
          { date: "2022-06", price: 10200 },
          { date: "2022-07", price: 10500 },
          { date: "2022-08", price: 11000 },
          { date: "2022-09", price: 10800 },
          { date: "2022-10", price: 11200 },
          { date: "2022-11", price: 11500 },
          { date: "2022-12", price: 12000 },
          { date: "2023-01", price: 11800 },
          { date: "2023-02", price: 12200 },
          { date: "2023-03", price: 12500 },
        ],
        relatedCards: [
          {
            id: "2",
            name: "Blastoise",
            set: "Base Set",
            image: "/blastoise-pokemon-card.png",
            rarity: "Holo Rare",
            condition: "PSA 8",
            price: 4500,
            cardType: "holographic",
          },
          {
            id: "3",
            name: "Venusaur",
            set: "Base Set",
            image: "/venusaur-pokemon-card.png",
            rarity: "Holo Rare",
            condition: "PSA 9",
            price: 3800,
            cardType: "holographic",
          },
          {
            id: "4",
            name: "Pikachu",
            set: "Base Set",
            image: "/electric-mouse-card.png",
            rarity: "Rare",
            condition: "PSA 10",
            price: 1200,
            cardType: "normal",
          },
          {
            id: "5",
            name: "Alakazam",
            set: "Base Set",
            image: "/alakazam-psychic-power.png",
            rarity: "Holo Rare",
            condition: "PSA 8",
            price: 1800,
            cardType: "holographic",
          },
          {
            id: "6",
            name: "Mewtwo",
            set: "Base Set",
            image: "/psychic-pokemon-card.png",
            rarity: "Holo Rare",
            condition: "PSA 9",
            price: 2500,
            cardType: "holographic",
          },
        ],
      })
      setLoading(false)
    }, 1000)
  }, [params.id])

  if (loading) {
    return (
      <main className="min-h-screen pt-32 pb-20 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-[#131525]/60 backdrop-blur-md rounded-3xl h-[500px] mb-4 border border-[#352F7E]/20"></div>
            </div>
            <div className="lg:col-span-2">
              <div className="h-10 bg-[#131525]/60 rounded mb-4 w-3/4"></div>
              <div className="h-6 bg-[#131525]/60 rounded mb-6 w-1/2"></div>
              <div className="h-24 bg-[#131525]/60 rounded mb-6"></div>
              <div className="h-12 bg-[#131525]/60 rounded mb-6 w-1/3"></div>
              <div className="h-10 bg-[#131525]/60 rounded mb-4"></div>
              <div className="h-10 bg-[#131525]/60 rounded mb-4"></div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (!card) {
    return (
      <main className="min-h-screen pt-32 pb-20 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4 text-white">Card not found</h1>
          <Button onClick={() => router.push("/marketplace")} className="rounded-full">
            Return to Marketplace
          </Button>
        </div>
      </main>
    )
  }

  const toggleLike = () => {
    setIsLiked(!isLiked)
  }

  return (
    <main className="min-h-screen pt-32 pb-20 bg-[#0A0A0A] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#6C63FF]/5 blur-[100px] animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-[#FF6B6B]/5 blur-[120px] animate-float-delayed"></div>
      </div>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb & Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            className="rounded-full hover:bg-white/10 text-white"
            onClick={() => router.push("/marketplace")}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Marketplace
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card Image & Gallery */}
          <div className="lg:col-span-1">
            <motion.div
              className="bg-[#131525]/60 backdrop-blur-md rounded-3xl p-6 shadow-lg shadow-[#352F7E]/10 mb-4 border border-[#352F7E]/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* 3D Card Display */}
              <CardDetail3D
                image={card.images[activeImage]}
                type={card.cardType}
                isZoomed={isZoomed}
                setIsZoomed={setIsZoomed}
              />

              {/* Thumbnail gallery */}
              <div className="flex justify-center mt-6 gap-3">
                {card.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    className={`relative w-16 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImage === idx
                        ? "border-[#6C63FF] shadow-[0_0_10px_rgba(108,99,255,0.3)]"
                        : "border-[#352F7E]/30 hover:border-[#6C63FF]/50"
                    }`}
                    onClick={() => setActiveImage(idx)}
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`${card.name} view ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* View controls */}
              <div className="flex justify-center mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full text-xs mr-2 border-[#352F7E]/50 text-white hover:bg-[#352F7E]/20"
                  onClick={() => setIsZoomed(!isZoomed)}
                >
                  <Eye className="h-3 w-3 mr-1" />
                  {isZoomed ? "Standard View" : "Zoom View"}
                </Button>
              </div>
            </motion.div>

            {/* Authentication Info */}
            <motion.div
              className="bg-[#131525]/60 backdrop-blur-md rounded-3xl p-6 shadow-lg shadow-[#352F7E]/10 border border-[#352F7E]/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center mb-4">
                <Shield className="h-5 w-5 text-[#5DDFB8] mr-2" />
                <h3 className="font-bold text-lg text-white">Authentication</h3>
              </div>
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm text-[#B6B8CF]">Graded By</div>
                <div className="font-medium text-white">{card.authenticator}</div>
              </div>
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm text-[#B6B8CF]">Condition</div>
                <div className="font-medium text-white">{card.condition}</div>
              </div>
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm text-[#B6B8CF]">Certificate</div>
                <a href="#" className="font-medium text-[#8075FF] hover:underline">
                  View Certificate
                </a>
              </div>

              <div className="bg-[#0C0E1B]/80 backdrop-blur-md rounded-2xl p-4 mt-4 border border-[#352F7E]/20">
                <div className="flex items-center">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                    <Image
                      src={card.seller.image || "/placeholder.svg"}
                      alt={card.seller.name}
                      fill
                      className="object-cover"
                    />
                    {card.seller.verified && (
                      <div className="absolute bottom-0 right-0 bg-[#5DDFB8] rounded-full p-1">
                        <svg width="6" height="6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-white">{card.seller.name}</div>
                    <div className="flex items-center text-sm">
                      <Star className="h-3 w-3 text-[#FFE066] mr-1" />
                      <span className="text-[#B6B8CF]">
                        {card.seller.rating} · {card.seller.sales} sales
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Card Details & Purchase Options */}
          <div className="lg:col-span-2">
            <motion.div
              className="bg-[#131525]/60 backdrop-blur-md rounded-3xl p-6 shadow-lg shadow-[#352F7E]/10 mb-6 border border-[#352F7E]/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Card name and basic info */}
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h1 className="text-3xl font-bold text-white">{card.name}</h1>
                  <h2 className="text-lg text-[#B6B8CF]">{card.subtitle}</h2>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full text-white hover:bg-white/10"
                    onClick={toggleLike}
                  >
                    <Heart
                      className={`h-5 w-5 transition-all ${
                        isLiked ? "fill-[#FF6B6B] text-[#FF6B6B]" : "text-[#B6B8CF]/70"
                      }`}
                    />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/10">
                    <Share2 className="h-5 w-5 text-[#B6B8CF]/70" />
                  </Button>
                </div>
              </div>

              {/* Card meta information */}
              <div className="flex flex-wrap gap-3 mb-6">
                <Badge
                  variant="secondary"
                  className="rounded-full bg-[#322F5D] text-[#8075FF] border border-[#8075FF]/30"
                >
                  {card.set}
                </Badge>
                <Badge
                  variant="secondary"
                  className="rounded-full bg-[#FFE066]/10 text-[#FFE066] border border-[#FFE066]/30"
                >
                  {card.rarity}
                </Badge>
                <Badge
                  variant="secondary"
                  className="rounded-full bg-[#FF7E7E]/10 text-[#FF7E7E] border border-[#FF7E7E]/30"
                >
                  {card.type}
                </Badge>
                <Badge
                  variant="secondary"
                  className="rounded-full bg-[#5DDFB8]/10 text-[#5DDFB8] border border-[#5DDFB8]/30"
                >
                  {card.condition}
                </Badge>
              </div>

              {/* Card description */}
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-2 text-white">Description</h3>
                <p className="text-[#B6B8CF]">
                  {showFullDescription ? card.description : `${card.description.substring(0, 150)}...`}
                </p>
                <button
                  className="text-[#8075FF] text-sm mt-1 hover:underline"
                  onClick={() => setShowFullDescription(!showFullDescription)}
                >
                  {showFullDescription ? "Read less" : "Read more"}
                </button>
              </div>

              {/* Stats and details */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {card.stats.map((stat: any, index: number) => (
                  <div
                    key={index}
                    className="bg-[#0C0E1B]/80 backdrop-blur-md rounded-lg p-2 border border-[#352F7E]/20"
                  >
                    <div className="text-xs text-[#B6B8CF]/70">{stat.name}</div>
                    <div className="font-medium text-white">{stat.value}</div>
                  </div>
                ))}
              </div>

              {/* Interest metrics */}
              <div className="flex flex-wrap gap-4 mb-6 text-sm text-[#B6B8CF]">
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1 text-[#8075FF]" />
                  {card.views} views
                </div>
                <div className="flex items-center">
                  <Heart className="h-4 w-4 mr-1 text-[#8075FF]" />
                  {card.watchlist} watching
                </div>
                {card.auction && (
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1 text-[#8075FF]" />
                    {card.bids} bids
                  </div>
                )}
              </div>

              {/* Price and purchase section */}
              <div className="bg-[#0C0E1B]/80 backdrop-blur-md rounded-2xl p-6 mb-6 border border-[#352F7E]/20 shadow-[0_0_20px_rgba(108,99,255,0.1)]">
                {card.auction ? (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <div className="text-sm text-[#B6B8CF]">Current Bid</div>
                        <div className="text-3xl font-bold text-white">${card.price.toLocaleString()}</div>
                      </div>
                      <div className="bg-[#322F5D]/70 backdrop-blur-md rounded-full px-4 py-2 flex items-center border border-[#8075FF]/20">
                        <Clock className="h-5 w-5 text-[#8075FF] mr-2" />
                        <span className="font-medium text-[#8075FF]">{card.timeLeft} left</span>
                      </div>
                    </div>

                    <div className="flex gap-3 mb-4">
                      <Button className="flex-1 rounded-full text-white bg-gradient-to-r from-[#8075FF] to-[#6C63FF] hover:from-[#6C63FF] hover:to-[#5D51FF] py-6 text-lg font-medium shadow-[0_0_15px_rgba(108,99,255,0.3)]">
                        Place Bid
                      </Button>
                      <Button
                        variant="outline"
                        className="rounded-full border-[#8075FF] text-[#8075FF] hover:bg-[#322F5D]"
                      >
                        <Heart className="h-5 w-5" />
                      </Button>
                    </div>

                    <div className="flex justify-between text-sm">
                      <div className="text-[#B6B8CF]">
                        Minimum bid increment: <span className="font-medium text-white">$500</span>
                      </div>
                      <div className="text-[#B6B8CF]">
                        Next minimum bid:{" "}
                        <span className="font-medium text-white">${(card.price + 500).toLocaleString()}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <div className="text-sm text-[#B6B8CF]">Buy Now Price</div>
                        <div className="text-3xl font-bold text-white">${card.price.toLocaleString()}</div>
                      </div>
                    </div>

                    <div className="flex gap-3 mb-4">
                      <Button className="flex-1 rounded-full text-white bg-gradient-to-r from-[#8075FF] to-[#6C63FF] hover:from-[#6C63FF] hover:to-[#5D51FF] py-6 text-lg font-medium shadow-[0_0_15px_rgba(108,99,255,0.3)]">
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        Buy Now
                      </Button>
                      <Button
                        variant="outline"
                        className="rounded-full border-[#8075FF] text-[#8075FF] hover:bg-[#322F5D]"
                      >
                        <Heart className="h-5 w-5" />
                      </Button>
                    </div>

                    <div className="flex justify-between text-sm">
                      <div className="text-[#B6B8CF]">Secure payment via Stripe</div>
                      <div className="text-[#B6B8CF]">Free shipping with insurance</div>
                    </div>
                  </>
                )}
              </div>

              {/* Tabs for additional info */}
              <Tabs defaultValue="price-history" className="w-full">
                <TabsList className="grid grid-cols-3 mb-4 bg-[#0C0E1B]/80 backdrop-blur-md rounded-full p-1 border border-[#352F7E]/20">
                  <TabsTrigger
                    value="price-history"
                    className="rounded-full data-[state=active]:bg-[#1A1C36] data-[state=active]:text-white text-[#B6B8CF]"
                  >
                    Price History
                  </TabsTrigger>
                  <TabsTrigger
                    value="offers"
                    className="rounded-full data-[state=active]:bg-[#1A1C36] data-[state=active]:text-white text-[#B6B8CF]"
                  >
                    Offers
                  </TabsTrigger>
                  <TabsTrigger
                    value="provenance"
                    className="rounded-full data-[state=active]:bg-[#1A1C36] data-[state=active]:text-white text-[#B6B8CF]"
                  >
                    Provenance
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="price-history" className="border-0 p-0">
                  <Card className="border-0 bg-[#131525]/60 backdrop-blur-md shadow-lg shadow-[#352F7E]/10 border border-[#352F7E]/20">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-white">Average Sale Price</h3>
                        <div className="bg-[#322F5D]/70 backdrop-blur-md rounded-full px-3 py-1 text-sm border border-[#8075FF]/20">
                          <span className="text-[#8075FF]">Last 12 months</span>
                        </div>
                      </div>
                      <PriceHistoryChart data={card.priceHistory} />
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="offers" className="border-0 p-0">
                  <Card className="border-0 bg-[#131525]/60 backdrop-blur-md shadow-lg shadow-[#352F7E]/10 border border-[#352F7E]/20">
                    <div className="p-4 text-center">
                      <div className="py-8">
                        <MessageCircle className="h-12 w-12 text-[#8075FF]/20 mx-auto mb-4" />
                        <h3 className="font-medium text-white mb-2">No offers yet</h3>
                        <p className="text-[#B6B8CF] text-sm">Be the first to make an offer on this card</p>
                        <Button className="rounded-full mt-4 bg-gradient-to-r from-[#8075FF] to-[#6C63FF] hover:from-[#6C63FF] hover:to-[#5D51FF]">
                          Make an Offer
                        </Button>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="provenance" className="border-0 p-0">
                  <Card className="border-0 bg-[#131525]/60 backdrop-blur-md shadow-lg shadow-[#352F7E]/10 border border-[#352F7E]/20">
                    <div className="p-4">
                      <div className="flex items-center mb-4">
                        <Shield className="h-5 w-5 text-[#5DDFB8] mr-2" />
                        <h3 className="font-medium text-white">Card Provenance</h3>
                      </div>

                      <div className="relative pl-8 before:absolute before:left-4 before:top-2 before:bottom-8 before:w-0.5 before:bg-[#322F5D]">
                        <div className="mb-6 relative">
                          <div className="absolute left-[-29px] top-0 w-4 h-4 rounded-full bg-[#8075FF] shadow-[0_0_10px_rgba(108,99,255,0.5)]"></div>
                          <div className="text-sm">
                            <div className="font-medium text-white">Card graded by PSA</div>
                            <div className="text-[#B6B8CF]">March 15, 2023</div>
                          </div>
                        </div>

                        <div className="mb-6 relative">
                          <div className="absolute left-[-29px] top-0 w-4 h-4 rounded-full bg-[#8075FF] shadow-[0_0_10px_rgba(108,99,255,0.5)]"></div>
                          <div className="text-sm">
                            <div className="font-medium text-white">Acquired by PremiumCards</div>
                            <div className="text-[#B6B8CF]">February 02, 2023</div>
                          </div>
                        </div>

                        <div className="relative">
                          <div className="absolute left-[-29px] top-0 w-4 h-4 rounded-full bg-[#8075FF] shadow-[0_0_10px_rgba(108,99,255,0.5)]"></div>
                          <div className="text-sm">
                            <div className="font-medium text-white">Authenticated by CardVault</div>
                            <div className="text-[#B6B8CF]">January 10, 2023</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>

            {/* Related Cards */}
            <motion.div
              className="bg-[#131525]/60 backdrop-blur-md rounded-3xl p-6 shadow-lg shadow-[#352F7E]/10 border border-[#352F7E]/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Similar Cards</h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-[#8075FF] text-[#8075FF] hover:bg-[#322F5D]"
                >
                  See All
                </Button>
              </div>

              <CardCarousel cards={card.relatedCards} />
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}
