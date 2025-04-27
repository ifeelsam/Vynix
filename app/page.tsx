import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Clock,
  Star,
  TrendingUp,
  Users,
  BarChart3,
  ArrowUpRight,
  Heart,
  Shield,
  CheckCircle,
  Wallet,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { MainNav } from "@/components/main-nav"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Resizable Navigation */}
      <MainNav />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#6C63FF]/10 to-[#5D51FF]/20 dark:from-[#1A1A1A] dark:to-[#121212] -z-10"></div>

        {/* Animated background shapes */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#E4E1FF] dark:bg-[#2A2A2A] blur-3xl opacity-30 animate-float -z-10"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-[#6C63FF] dark:bg-[#1A1A1A] blur-3xl opacity-20 animate-float-delayed -z-10"></div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#6C63FF] to-[#5D51FF] dark:from-[#8075FF] dark:to-[#6C63FF] text-transparent bg-clip-text leading-tight">
              Collect the Extraordinary
            </h1>
            <p className="text-xl text-[#121F3D]/80 dark:text-[#B6B8CF] max-w-2xl mx-auto mb-8">
              Physical cards with digital ownership. Authenticated, vaulted, and tokenized on the blockchain.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="rounded-full text-white bg-gradient-to-r from-[#6C63FF] to-[#5D51FF] dark:from-[#8075FF] dark:to-[#6C63FF] hover:from-[#5D51FF] hover:to-[#6C63FF] dark:hover:from-[#6C63FF] dark:hover:to-[#8075FF] px-8 py-6 text-lg font-medium group">
                Explore Marketplace
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-[#6C63FF] dark:border-[#8075FF] text-[#6C63FF] dark:text-[#8075FF] hover:bg-[#E4E1FF] dark:hover:bg-[#322F5D] px-8 py-6 text-lg font-medium"
              >
                View Drops
              </Button>
            </div>
          </div>

          <div className="relative h-[400px] md:h-[500px] mt-16">
            {/* Floating cards with proper trading card aspect ratio - evenly spaced */}
            <div className="absolute left-[5%] top-[10%] w-[180px] md:w-[220px] h-[250px] md:h-[307px] transform rotate-[-8deg] hover:rotate-[-5deg] hover:translate-y-[-10px] transition-all duration-500 z-20">
              <div className="w-full h-full rounded-xl overflow-hidden shadow-lg dark:shadow-[#8075FF]/20 hover:shadow-xl dark:hover:shadow-[#8075FF]/30 bg-white dark:bg-[#201C4A] p-1">
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image src="/pikachu-rookie-card.png" alt="Pikachu rookie card" fill className="object-cover" />
                </div>
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-[#4ECCA3] dark:bg-[#5DDFB8] text-white px-3 py-1 rounded-full text-xs font-medium">
                Rookie Card
              </div>
            </div>

            {/* Rare Card - Venusaur */}
            <div className="absolute left-[25%] top-[5%] w-[180px] md:w-[220px] h-[250px] md:h-[307px] transform rotate-[-3deg] hover:rotate-[0deg] hover:translate-y-[-10px] transition-all duration-500 z-25">
              <div className="w-full h-full rounded-xl overflow-hidden shadow-lg dark:shadow-[#9B59B6]/20 hover:shadow-xl dark:hover:shadow-[#9B59B6]/30 bg-white dark:bg-[#201C4A] p-1">
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image src="/venusaur-rare-card.png" alt="Rare Venusaur card" fill className="object-cover" />
                </div>
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-[#9B59B6] dark:bg-[#9B59B6] text-white px-3 py-1 rounded-full text-xs font-medium">
                Rare
              </div>
            </div>

            {/* Holographic Card - Charizard */}
            <div className="absolute left-[45%] top-[10%] w-[180px] md:w-[220px] h-[250px] md:h-[307px] transform rotate-[5deg] hover:rotate-[8deg] hover:translate-y-[-10px] transition-all duration-500 z-30">
              <div className="w-full h-full rounded-xl overflow-hidden shadow-lg dark:shadow-[#FF7E7E]/20 hover:shadow-xl dark:hover:shadow-[#FF7E7E]/30 bg-white dark:bg-[#201C4A] p-1">
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image
                    src="/charizard-holo-card.png"
                    alt="Holographic Charizard card"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-[#FFD166] dark:bg-[#FFE066] text-[#121F3D] px-3 py-1 rounded-full text-xs font-medium">
                Holographic
              </div>
            </div>

            {/* Limited Edition Card - Mewtwo */}
            <div className="absolute left-[65%] top-[5%] w-[180px] md:w-[220px] h-[250px] md:h-[307px] transform rotate-[-6deg] hover:rotate-[-3deg] hover:translate-y-[-10px] transition-all duration-500 z-10">
              <div className="w-full h-full rounded-xl overflow-hidden shadow-lg dark:shadow-[#8075FF]/20 hover:shadow-xl dark:hover:shadow-[#8075FF]/30 bg-white dark:bg-[#201C4A] p-1">
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image
                    src="/mewtwo-limited-card.png"
                    alt="Limited edition Mewtwo card"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-[#FF6B6B] dark:bg-[#FF7E7E] text-white px-3 py-1 rounded-full text-xs font-medium">
                Limited Edition
              </div>
            </div>

            {/* Ancient Card - Mew */}
            <div className="absolute left-[85%] top-[10%] w-[180px] md:w-[220px] h-[250px] md:h-[307px] transform rotate-[8deg] hover:rotate-[5deg] hover:translate-y-[-10px] transition-all duration-500 z-5">
              <div className="w-full h-full rounded-xl overflow-hidden shadow-lg dark:shadow-[#8075FF]/20 hover:shadow-xl dark:hover:shadow-[#8075FF]/30 bg-white dark:bg-[#201C4A] p-1">
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image src="/mew-ancient-card.png" alt="Ancient Mew card" fill className="object-cover" />
                </div>
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-[#6C63FF] dark:bg-[#8075FF] text-white px-3 py-1 rounded-full text-xs font-medium">
                Ancient
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20 px-4 bg-white dark:bg-[#121212]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#121F3D] dark:text-[#E8E6FF] tracking-tight">
              Featured Collections
            </h2>
            <Button
              variant="outline"
              className="rounded-full border-[#6C63FF] dark:border-[#8075FF] text-[#6C63FF] dark:text-[#8075FF] hover:bg-[#E4E1FF] dark:hover:bg-[#322F5D]"
            >
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((collection, index) => (
              <div
                key={index}
                className="rounded-3xl bg-white dark:bg-[#1A1C36] p-1 shadow-lg dark:shadow-[#352F7E]/20 hover:shadow-xl dark:hover:shadow-[#352F7E]/30 transition-all duration-300 hover:translate-y-[-8px] border border-transparent dark:border-[#352F7E]/20"
              >
                <div className="p-5">
                  <h3 className="font-bold text-xl mb-2 text-[#121F3D] dark:text-[#E8E6FF]">{collection.name}</h3>
                  <p className="text-[#121F3D]/70 dark:text-[#B6B8CF] text-sm mb-4">{collection.description}</p>

                  {/* Card display area with proper aspect ratio */}
                  <div className="relative h-[140px] mb-6 overflow-hidden">
                    <div className="absolute left-[5%] top-[10%] w-[120px] h-[84px] transform rotate-[-8deg] hover:rotate-[-5deg] transition-all duration-300 z-10">
                      <div className="w-full h-full rounded-lg overflow-hidden shadow-md bg-white dark:bg-[#201C4A]">
                        <div className="relative w-full h-full">
                          <Image
                            src={collection.cardImages[0] || "/placeholder.svg?height=84&width=120"}
                            alt="Card"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="absolute left-[30%] top-[5%] w-[120px] h-[84px] transform rotate-[3deg] hover:rotate-[6deg] transition-all duration-300 z-20">
                      <div className="w-full h-full rounded-lg overflow-hidden shadow-md bg-white dark:bg-[#201C4A]">
                        <div className="relative w-full h-full">
                          <Image
                            src={collection.cardImages[1] || "/placeholder.svg?height=84&width=120"}
                            alt="Card"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="absolute right-[5%] top-[15%] w-[120px] h-[84px] transform rotate-[10deg] hover:rotate-[7deg] transition-all duration-300 z-10">
                      <div className="w-full h-full rounded-lg overflow-hidden shadow-md bg-white dark:bg-[#201C4A]">
                        <div className="relative w-full h-full">
                          <Image
                            src={collection.cardImages[2] || "/placeholder.svg?height=84&width=120"}
                            alt="Card"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-[#E4E1FF] dark:bg-[#322F5D] flex items-center justify-center mr-2">
                        <span className="text-xs font-medium text-[#6C63FF] dark:text-[#8075FF]">
                          {collection.items}
                        </span>
                      </div>
                      <span className="text-sm text-[#121F3D]/70 dark:text-[#B6B8CF]">Cards</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-[#E4E1FF] dark:bg-[#322F5D] flex items-center justify-center mr-2">
                        <span className="text-xs font-medium text-[#6C63FF] dark:text-[#8075FF]">
                          {collection.floor}
                        </span>
                      </div>
                      <span className="text-sm text-[#121F3D]/70 dark:text-[#B6B8CF]">Floor</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Drops */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#F8F9FF] to-[#E4E1FF]/50 dark:from-[#121212] dark:to-[#1A1A1A]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#121F3D] dark:text-[#E8E6FF] tracking-tight">
              Latest Drops
            </h2>
            <Button
              variant="outline"
              className="rounded-full border-[#6C63FF] dark:border-[#8075FF] text-[#6C63FF] dark:text-[#8075FF] hover:bg-[#E4E1FF] dark:hover:bg-[#322F5D]"
            >
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {drops.map((drop, index) => (
              <Card
                key={index}
                className="rounded-3xl overflow-hidden hover:scale-[1.03] transition-all duration-300 shadow-md dark:shadow-[#352F7E]/20 hover:shadow-lg dark:hover:shadow-[#352F7E]/30 bg-white dark:bg-[#1A1C36] border-0 dark:border dark:border-[#352F7E]/20"
              >
                {/* Card display with proper aspect ratio */}
                <div className="relative h-[140px] w-full overflow-hidden bg-[#F8F9FF] dark:bg-[#0C0E1B]">
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[180px] h-[126px] hover:scale-105 transition-all duration-500">
                    <div className="w-full h-full rounded-lg overflow-hidden shadow-md dark:shadow-[#352F7E]/30 bg-white dark:bg-[#201C4A]">
                      <div className="relative w-full h-full">
                        <Image
                          src={drop.image || "/placeholder.svg?height=126&width=180"}
                          alt={drop.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {drop.status === "Live" && (
                    <div className="absolute top-3 right-3 bg-[#4ECCA3] dark:bg-[#5DDFB8] text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                      <span className="h-2 w-2 bg-white rounded-full mr-1 animate-pulse"></span>
                      Live Now
                    </div>
                  )}
                  {drop.status === "Upcoming" && (
                    <div className="absolute top-3 right-3 bg-[#FFD166] dark:bg-[#FFE066] text-[#121F3D] px-3 py-1 rounded-full text-xs font-medium">
                      Upcoming
                    </div>
                  )}
                  {drop.status === "Sold Out" && (
                    <div className="absolute top-3 right-3 bg-[#121F3D] dark:bg-[#848699] text-white dark:text-[#0C0E1B] px-3 py-1 rounded-full text-xs font-medium">
                      Sold Out
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center mb-3">
                    <div className="h-8 w-8 rounded-full overflow-hidden relative mr-2">
                      <Image
                        src={drop.creatorImage || "/placeholder.svg?height=100&width=100"}
                        alt={drop.creator}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium text-[#121F3D] dark:text-[#E8E6FF]">{drop.creator}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-[#121F3D] dark:text-[#E8E6FF]">{drop.name}</h3>
                  {drop.status === "Upcoming" && (
                    <div className="flex items-center text-sm text-[#121F3D]/70 dark:text-[#B6B8CF]">
                      <Clock className="h-4 w-4 mr-1" />
                      {drop.timeLeft}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vaulting & Tokenization */}
      <section className="py-20 px-4 bg-white dark:bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#121F3D] dark:text-[#E8E6FF] tracking-tight mb-4">
              Secure Vaulting & Tokenization
            </h2>
            <p className="text-lg text-[#121F3D]/70 dark:text-[#B6B8CF] max-w-2xl mx-auto">
              We bridge physical trading cards with blockchain technology through our secure vaulting process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {vaultingSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="rounded-3xl bg-white dark:bg-[#1A1C36] p-6 shadow-lg dark:shadow-[#352F7E]/20 hover:shadow-xl dark:hover:shadow-[#352F7E]/30 transition-all duration-300 hover:translate-y-[-8px] relative z-10 border border-transparent dark:border-[#352F7E]/20 h-full">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-[#6C63FF] to-[#5D51FF] dark:from-[#8075FF] dark:to-[#6C63FF] flex items-center justify-center text-white font-bold text-xl mb-6">
                    {index + 1}
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-[#121F3D] dark:text-[#E8E6FF]">{step.title}</h3>
                  <p className="text-[#121F3D]/70 dark:text-[#B6B8CF]">{step.description}</p>
                </div>
                {index < vaultingSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 w-12 h-2 bg-[#E4E1FF] dark:bg-[#322F5D] transform translate-x-3 z-0"></div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button className="rounded-full text-white bg-gradient-to-r from-[#6C63FF] to-[#5D51FF] dark:from-[#8075FF] dark:to-[#6C63FF] hover:from-[#5D51FF] hover:to-[#6C63FF] dark:hover:from-[#6C63FF] dark:hover:to-[#8075FF] px-8 py-6 text-lg font-medium">
              Learn More About Vaulting
            </Button>
          </div>
        </div>
      </section>

      {/* Live Auctions */}
      <section className="py-20 px-4 bg-[#121F3D] dark:bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-[#E8E6FF] tracking-tight">
              Live Auctions
            </h2>
            <Button
              variant="outline"
              className="rounded-full border-white dark:border-[#8075FF] text-white dark:text-[#8075FF] hover:bg-white/10 dark:hover:bg-[#322F5D]"
            >
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {auctions.map((auction, index) => (
              <Card
                key={index}
                className="rounded-3xl overflow-hidden hover:scale-[1.03] transition-all duration-300 shadow-lg dark:shadow-[#352F7E]/20 hover:shadow-xl dark:hover:shadow-[#352F7E]/30 bg-white/5 dark:bg-[#1A1C36] backdrop-blur-sm border-0 dark:border dark:border-[#352F7E]/20"
              >
                {/* Card display with proper aspect ratio */}
                <div className="relative h-[140px] w-full overflow-hidden bg-[#0C0E1B]/50 dark:bg-[#0C0E1B]">
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[180px] h-[126px] hover:scale-105 hover:rotate-1 transition-all duration-500">
                    <div className="w-full h-full rounded-lg overflow-hidden shadow-md dark:shadow-[#352F7E]/30 bg-white/10 dark:bg-[#201C4A]">
                      <div className="relative w-full h-full">
                        <Image
                          src={auction.image || "/placeholder.svg?height=126&width=180"}
                          alt={auction.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-3 right-3 bg-[#FF6B6B] dark:bg-[#FF7E7E] text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                    <span className="h-2 w-2 bg-white rounded-full mr-1 animate-pulse"></span>
                    Live Auction
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-xl mb-2 text-white dark:text-[#E8E6FF]">{auction.name}</h3>
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-white/80 dark:text-[#B6B8CF] text-sm">Current Bid</div>
                    <div className="text-white dark:text-[#E8E6FF] font-bold">{auction.currentBid}</div>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center text-white/80 dark:text-[#B6B8CF] text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      {auction.timeLeft}
                    </div>
                    <div className="flex items-center text-white/80 dark:text-[#B6B8CF] text-sm">
                      <Users className="h-4 w-4 mr-1" />
                      {auction.bidders} bidders
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1 rounded-full text-[#121F3D] dark:text-[#0C0E1B] bg-gradient-to-r from-[#FFD166] to-[#FF6B6B] dark:from-[#FFE066] dark:to-[#FF7E7E] hover:from-[#FF6B6B] hover:to-[#FFD166] dark:hover:from-[#FF7E7E] dark:hover:to-[#FFE066] font-medium">
                      Place Bid
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-white/20 dark:border-[#B6B8CF]/20 text-white dark:text-[#B6B8CF] hover:bg-white/10 dark:hover:bg-[#B6B8CF]/10"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Card Authentication */}
      <section className="py-20 px-4 bg-white dark:bg-[#121212]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#121F3D] dark:text-[#E8E6FF] tracking-tight mb-6">
                Expert Card Authentication
              </h2>
              <p className="text-lg text-[#121F3D]/70 dark:text-[#B6B8CF] mb-6">
                Every card in our marketplace undergoes rigorous authentication by industry experts using advanced
                technology to ensure authenticity and proper grading.
              </p>
              <ul className="space-y-4 mb-8">
                {authenticationFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[#4ECCA3] dark:bg-[#5DDFB8] flex items-center justify-center mr-3 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-[#121F3D]/80 dark:text-[#B6B8CF]">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="rounded-full text-white bg-gradient-to-r from-[#6C63FF] to-[#5D51FF] dark:from-[#8075FF] dark:to-[#6C63FF] hover:from-[#5D51FF] hover:to-[#6C63FF] dark:hover:from-[#6C63FF] dark:hover:to-[#8075FF] px-6 py-2 font-medium">
                Verify Your Cards
              </Button>
            </div>
            <div className="relative h-[300px] md:h-[400px]">
              {/* Authentication visualization */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[220px] h-[154px] bg-gradient-to-r from-[#6C63FF]/10 to-[#5D51FF]/10 dark:from-[#8075FF]/20 dark:to-[#6C63FF]/20 rounded-xl p-3 z-20">
                <div className="w-full h-full rounded-lg overflow-hidden relative">
                  <Image
                    src="/placeholder.svg?height=154&width=220"
                    alt="Card authentication"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#6C63FF]/20 to-transparent dark:from-[#8075FF]/30 pointer-events-none"></div>

                  {/* Authentication overlay elements */}
                  <div className="absolute top-2 left-2 h-5 w-5 rounded-full border-2 border-[#4ECCA3] dark:border-[#5DDFB8] animate-pulse"></div>
                  <div className="absolute bottom-2 right-2 h-5 w-5 rounded-full border-2 border-[#4ECCA3] dark:border-[#5DDFB8] animate-pulse"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-16 w-16 rounded-full border-2 border-[#FFD166] dark:border-[#FFE066] animate-pulse"></div>
                </div>
              </div>

              {/* Authentication badges */}
              <div className="absolute top-[15%] right-[10%] bg-white dark:bg-[#1A1C36] rounded-full p-3 shadow-lg dark:shadow-[#352F7E]/20 z-10">
                <Shield className="h-8 w-8 text-[#4ECCA3] dark:text-[#5DDFB8]" />
              </div>
              <div className="absolute bottom-[20%] left-[15%] bg-white dark:bg-[#1A1C36] rounded-full p-3 shadow-lg dark:shadow-[#352F7E]/20 z-10">
                <CheckCircle className="h-8 w-8 text-[#FFD166] dark:text-[#FFE066]" />
              </div>
              <div className="absolute bottom-[30%] right-[20%] bg-white dark:bg-[#1A1C36] rounded-full p-3 shadow-lg dark:shadow-[#352F7E]/20 z-10">
                <Wallet className="h-8 w-8 text-[#6C63FF] dark:text-[#8075FF]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#F8F9FF] to-[#E4E1FF]/50 dark:from-[#121212] dark:to-[#1A1A1A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#121F3D] dark:text-[#E8E6FF] tracking-tight mb-4">
              Collector Stories
            </h2>
            <p className="text-lg text-[#121F3D]/70 dark:text-[#B6B8CF] max-w-2xl mx-auto">
              Hear from our community of card collectors and sellers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="rounded-3xl bg-white dark:bg-[#1A1C36] p-6 shadow-lg dark:shadow-[#352F7E]/20 hover:shadow-xl dark:hover:shadow-[#352F7E]/30 transition-all duration-300 hover:translate-y-[-8px] border border-transparent dark:border-[#352F7E]/20"
              >
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden relative mr-3">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg?height=100&width=100"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#121F3D] dark:text-[#E8E6FF]">{testimonial.name}</h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 text-[#FFD166] dark:text-[#FFE066]"
                          fill={i < testimonial.rating ? (testimonial.rating > i ? "#FFD166" : "none") : "none"}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-[#121F3D]/80 dark:text-[#B6B8CF] italic mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="h-10 w-14 rounded-lg overflow-hidden relative mr-3">
                    <Image
                      src={testimonial.cardImage || "/placeholder.svg?height=70&width=100"}
                      alt="Card"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-sm text-[#121F3D]/70 dark:text-[#B6B8CF]">{testimonial.transaction}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Insights */}
      <section className="py-20 px-4 bg-white dark:bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {marketStats.map((stat, index) => (
              <div
                key={index}
                className="rounded-3xl bg-white dark:bg-[#1A1C36] p-6 shadow-lg dark:shadow-[#352F7E]/20 hover:shadow-xl dark:hover:shadow-[#352F7E]/30 transition-all duration-300 hover:scale-105 border border-transparent dark:border-[#352F7E]/20"
              >
                <div className="flex items-center justify-center mb-4">
                  {stat.icon === "trending" && <TrendingUp className="h-12 w-12 text-[#6C63FF] dark:text-[#8075FF]" />}
                  {stat.icon === "users" && <Users className="h-12 w-12 text-[#6C63FF] dark:text-[#8075FF]" />}
                  {stat.icon === "chart" && <BarChart3 className="h-12 w-12 text-[#6C63FF] dark:text-[#8075FF]" />}
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#6C63FF] to-[#5D51FF] dark:from-[#8075FF] dark:to-[#6C63FF] text-transparent bg-clip-text">
                    {stat.value}
                  </div>
                  <div className="text-[#121F3D]/70 dark:text-[#B6B8CF]">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="rounded-full border-[#6C63FF] dark:border-[#8075FF] text-[#6C63FF] dark:text-[#8075FF] hover:bg-[#E4E1FF] dark:hover:bg-[#322F5D]"
            >
              Download Market Report <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#6C63FF] to-[#5D51FF] dark:from-[#1A1A1A] dark:to-[#121212] -z-10"></div>

        {/* Animated background shapes */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white blur-3xl opacity-10 animate-float -z-10"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-white blur-3xl opacity-10 animate-float-delayed -z-10"></div>

        <div className="max-w-3xl mx-auto">
          <div className="rounded-3xl bg-white/10 dark:bg-white/5 backdrop-blur-sm p-8 md:p-12 border border-white/20">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                Get Early Access to Exclusive Card Drops
              </h2>
              <p className="text-white/80 max-w-lg mx-auto">
                Be the first to know about new collections, auctions, and platform features
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <Input
                type="email"
                placeholder="Enter your email"
                className="rounded-full bg-white/20 border-0 text-white placeholder:text-white/60 focus:ring-2 focus:ring-white/50"
              />
              <Button className="rounded-full text-[#121F3D] dark:text-[#0C0E1B] bg-white hover:bg-white/90 px-8 font-medium">
                Subscribe
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center">
                <Checkbox
                  id="sports"
                  className="rounded-full data-[state=checked]:bg-white data-[state=checked]:text-[#6C63FF] dark:data-[state=checked]:text-[#8075FF]"
                />
                <label htmlFor="sports" className="ml-2 text-sm text-white">
                  Sports Cards
                </label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="tcg"
                  className="rounded-full data-[state=checked]:bg-white data-[state=checked]:text-[#6C63FF] dark:data-[state=checked]:text-[#8075FF]"
                />
                <label htmlFor="tcg" className="ml-2 text-sm text-white">
                  Trading Card Games
                </label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="collectible"
                  className="rounded-full data-[state=checked]:bg-white data-[state=checked]:text-[#6C63FF] dark:data-[state=checked]:text-[#8075FF]"
                />
                <label htmlFor="collectible" className="ml-2 text-sm text-white">
                  Collectible Cards
                </label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="reports"
                  className="rounded-full data-[state=checked]:bg-white data-[state=checked]:text-[#6C63FF] dark:data-[state=checked]:text-[#8075FF]"
                />
                <label htmlFor="reports" className="ml-2 text-sm text-white">
                  Market Reports
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#121F3D] dark:bg-[#0A0A0A] text-white pt-20 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div>
              <div className="font-bold text-2xl mb-4">
                Card<span className="text-[#6C63FF] dark:text-[#8075FF]">Vault</span>
              </div>
              <p className="text-white/70 dark:text-[#B6B8CF] mb-6">
                The premier marketplace for authenticated trading cards on the blockchain.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                  </svg>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                  </svg>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8c0 2.173.01 2.445.048 3.298.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.445-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.298c-.04-.851-.175-1.433-.372-1.942a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.445.01 10.173 0 8 0zm0 1.44c2.136 0 2.39.01 3.233.048.78.036 1.203.166 1.485.276.374.145.64.318.92.598.28.28.453.546.598.92.11.282.24.705.276 1.485.038.844.047 1.097.047 3.233s-.01 2.39-.05 3.233c-.04.78-.17 1.203-.28 1.485-.15.374-.32.64-.6.92-.28.28-.55.453-.92.598-.28.11-.71.24-1.49.276-.85.038-1.1.047-3.24.047s-2.39-.01-3.24-.05c-.78-.04-1.21-.17-1.49-.28a2.49 2.49 0 0 1-.92-.6c-.28-.28-.46-.55-.6-.92-.11-.28-.24-.71-.28-1.49-.03-.84-.04-1.1-.04-3.23s.01-2.39.04-3.24c.04-.78.17-1.21.28-1.49.14-.38.32-.64.6-.92.28-.28.54-.46.92-.6.28-.11.7-.24 1.48-.28.85-.03 1.1-.04 3.24-.04zm0 2.452a4.108 4.108 0 1 0 0 8.215 4.108 4.108 0 0 0 0-8.215zm0 6.775a2.667 2.667 0 1 1 0-5.334 2.667 2.667 0 0 1 0 5.334zm5.23-6.937a.96.96 0 1 1-1.92 0 .96.96 0 0 1 1.92 0z" />
                  </svg>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
                  </svg>
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-white/70 dark:text-[#B6B8CF] hover:text-white dark:hover:text-[#E8E6FF]"
                  >
                    Cards
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/70 dark:text-[#B6B8CF] hover:text-white dark:hover:text-[#E8E6FF]"
                  >
                    Sets
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/70 dark:text-[#B6B8CF] hover:text-white dark:hover:text-[#E8E6FF]"
                  >
                    Auctions
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/70 dark:text-[#B6B8CF] hover:text-white dark:hover:text-[#E8E6FF]"
                  >
                    Vaulting
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/70 dark:text-[#B6B8CF] hover:text-white dark:hover:text-[#E8E6FF]"
                  >
                    Drops
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-white/70 dark:text-[#B6B8CF] hover:text-white dark:hover:text-[#E8E6FF]"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/70 dark:text-[#B6B8CF] hover:text-white dark:hover:text-[#E8E6FF]"
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/70 dark:text-[#B6B8CF] hover:text-white dark:hover:text-[#E8E6FF]"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/70 dark:text-[#B6B8CF] hover:text-white dark:hover:text-[#E8E6FF]"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/70 dark:text-[#B6B8CF] hover:text-white dark:hover:text-[#E8E6FF]"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Newsletter</h4>
              <p className="text-white/70 dark:text-[#B6B8CF] mb-4">Stay updated with the latest drops and features</p>
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Email"
                  className="rounded-l-full bg-white/10 border-0 text-white placeholder:text-white/60 focus:ring-1 focus:ring-white/30"
                />
                <Button className="rounded-r-full bg-[#6C63FF] dark:bg-[#8075FF] hover:bg-[#5D51FF] dark:hover:bg-[#6C63FF]">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-white/60 dark:text-[#848699] text-sm">
            <p>© 2025 CardVault. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

// Sample data
const collections = [
  {
    name: "Vintage Baseball Cards",
    description: "Authenticated vintage baseball cards from the golden era of the sport",
    items: "124",
    floor: "1.2 ETH",
    cardImages: [
      "/placeholder.svg?height=84&width=120",
      "/placeholder.svg?height=84&width=120",
      "/placeholder.svg?height=84&width=120",
    ],
  },
  {
    name: "Holographic Pokémon",
    description: "First edition holographic Pokémon cards with authentication",
    items: "57",
    floor: "2.8 ETH",
    cardImages: [
      "/placeholder.svg?height=84&width=120",
      "/placeholder.svg?height=84&width=120",
      "/placeholder.svg?height=84&width=120",
    ],
  },
  {
    name: "Limited Edition Sports",
    description: "Rare and limited edition sports cards from championship seasons",
    items: "89",
    floor: "0.8 ETH",
    cardImages: [
      "/placeholder.svg?height=84&width=120",
      "/placeholder.svg?height=84&width=120",
      "/placeholder.svg?height=84&width=120",
    ],
  },
]

const drops = [
  {
    name: "Rookie Legends",
    creator: "Sports Vault",
    creatorImage: "/placeholder.svg?height=100&width=100",
    status: "Live",
    image: "/placeholder.svg?height=126&width=180",
  },
  {
    name: "Holographic Heroes",
    creator: "Collector's Guild",
    creatorImage: "/placeholder.svg?height=100&width=100",
    status: "Upcoming",
    timeLeft: "2d 5h",
    image: "/placeholder.svg?height=126&width=180",
  },
  {
    name: "Championship Collection",
    creator: "Sports Legends",
    creatorImage: "/placeholder.svg?height=100&width=100",
    status: "Upcoming",
    timeLeft: "5d 12h",
    image: "/placeholder.svg?height=126&width=180",
  },
  {
    name: "Signature Series",
    creator: "Card Masters",
    creatorImage: "/placeholder.svg?height=100&width=100",
    status: "Sold Out",
    image: "/placeholder.svg?height=126&width=180",
  },
]

const vaultingSteps = [
  {
    title: "Authentication",
    description: "Our experts authenticate your card using advanced techniques and industry knowledge",
  },
  {
    title: "Secure Vaulting",
    description: "Your card is stored in our climate-controlled, insured vault facility with 24/7 security",
  },
  {
    title: "Tokenization",
    description: "Your physical card is tokenized on the blockchain with a unique NFT representing ownership",
  },
  {
    title: "Marketplace Listing",
    description: "Your card becomes available for trading on our marketplace with full provenance history",
  },
]

const auctions = [
  {
    name: "1952 Mickey Mantle Rookie",
    currentBid: "45.5 ETH",
    timeLeft: "2h 45m",
    bidders: "24",
    image: "/placeholder.svg?height=126&width=180",
  },
  {
    name: "Charizard 1st Edition",
    currentBid: "32.8 ETH",
    timeLeft: "5h 12m",
    bidders: "18",
    image: "/placeholder.svg?height=126&width=180",
  },
  {
    name: "Michael Jordan Fleer RC",
    currentBid: "12.4 ETH",
    timeLeft: "1h 30m",
    bidders: "9",
    image: "/placeholder.svg?height=126&width=180",
  },
]

const testimonials = [
  {
    name: "Alex Thompson",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
    quote:
      "The authentication process gave me complete confidence in my purchase. The tokenization makes reselling so much easier.",
    cardImage: "/placeholder.svg?height=70&width=100",
    transaction: "Purchased rare rookie card",
  },
  {
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
    quote: "I sold my vintage card collection for 30% more than traditional auction houses were offering.",
    cardImage: "/placeholder.svg?height=70&width=100",
    transaction: "Sold vintage collection",
  },
  {
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4,
    quote: "The vaulting service gives me peace of mind knowing my cards are secure while I can still trade them.",
    cardImage: "/placeholder.svg?height=70&width=100",
    transaction: "Vaulted sports cards",
  },
]

const marketStats = [
  {
    icon: "trending",
    value: "$24.5M",
    label: "Trading Volume",
  },
  {
    icon: "users",
    value: "12,450+",
    label: "Active Collectors",
  },
  {
    icon: "chart",
    value: "22.4%",
    label: "Average ROI",
  },
]

const authenticationFeatures = [
  "High-resolution scanning and imaging",
  "Multi-point verification process",
  "Professional grading partnerships",
  "Tamper-proof security seals",
  "Blockchain verification record",
]
