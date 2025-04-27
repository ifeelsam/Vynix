"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Check, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileCollection } from "@/components/profile/profile-collection"
import ProfileActivity from "@/components/profile/profile-activity"
import { ProfileFavorites } from "@/components/profile/profile-favorites"
import { ProfileAbout } from "@/components/profile/profile-about"
import { ProfileSettings } from "@/components/profile/profile-settings"
import { cn } from "@/lib/utils"
import { usePrivy, useWallets } from "@privy-io/react-auth"

// Mock user data
const userData = {
  username: "CardCollector",
  verified: true,
  joinDate: "Member since May 2023",
  location: "New York, USA",
  profileImage: "/placeholder.svg?key=kpnmz",
  stats: {
    collectionValue: "$45,250",
    cardsOwned: 124,
    completedTrades: 37,
  },
  wallet: {
    address: "0x1a2b...3c4d",
    connected: true,
  },
}

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState("collection")
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const {user} = usePrivy();
  const {wallets} = useWallets();
  console.log("user", user?.createdAt.getMonth())

  // Handle scroll events to adjust header
  const handleScroll = () => {
    const offset = window.scrollY
    if (offset > 100) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  }
  
  // Add scroll event listener
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", handleScroll)
  }

  // Check if user and createdAt exist before formatting the date
  const joinDateString = user?.createdAt 
    ? `Member Since ${getMonthName(user.createdAt.getUTCMonth())} ${user.createdAt.getFullYear()}` 
    : "Loading join date..."; // Or some placeholder

  // Check if wallets array has at least one wallet before accessing it
  const displayAddress = wallets && wallets.length > 0 
    ? `${wallets[0].address.slice(0, 4)}...${wallets[0].address.slice(-4)}` 
    : "Loading address..."; // Or some placeholder

  return (
    <div className="min-h-screen pt-32 pb-20 bg-white dark:bg-[#131525] relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#6C63FF]/5 dark:bg-[#6C63FF]/5 blur-[100px] animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-[#FF6B6B]/5 dark:bg-[#FF6B6B]/5 blur-[120px] animate-float-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Profile Header */}
        <motion.div
          className={cn(
            "flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 mb-12 transition-all duration-300",
            scrolled && "md:mb-8",
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Profile Image */}
          <motion.div
            className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white dark:border-[#1A1C36] shadow-lg"
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 6, ease: "easeInOut" }}
          >
            <Image
              src={`https://api.dicebear.com/9.x/notionists/svg?seed=${user?.id}`}
              alt={userData.username}
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Profile Info */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-[28px] font-bold text-[#121F3D] dark:text-white">{user?.google?.name}</h1>
              {userData.verified && (
                <div className="bg-[#6C63FF] dark:bg-[#8075FF] rounded-full p-0.5">
                  <Check className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
            <div className="flex flex-col md:flex-row items-center gap-1 md:gap-4 text-[14px] text-[#121F3D]/70 dark:text-[#B6B8CF] mb-4">
              <span>{joinDateString}</span>
              <span className="hidden md:inline">•</span>
              <span>{userData.location}</span>
            </div>

            {/* Stats Pills */}
            <div className="flex flex-wrap gap-4 mt-2">
              <div className="bg-[#F9F9FB] dark:bg-[#1A1C36] rounded-full px-4 py-2 text-center min-w-[100px]">
                <div className="font-bold text-[#121F3D] dark:text-white">{userData.stats.collectionValue}</div>
                <div className="text-[14px] text-[#121F3D]/70 dark:text-[#B6B8CF]">Collection</div>
              </div>
              <div className="bg-[#F9F9FB] dark:bg-[#1A1C36] rounded-full px-4 py-2 text-center min-w-[100px]">
                <div className="font-bold text-[#121F3D] dark:text-white">{userData.stats.cardsOwned}</div>
                <div className="text-[14px] text-[#121F3D]/70 dark:text-[#B6B8CF]">Cards</div>
              </div>
              <div className="bg-[#F9F9FB] dark:bg-[#1A1C36] rounded-full px-4 py-2 text-center min-w-[100px]">
                <div className="font-bold text-[#121F3D] dark:text-white">{userData.stats.completedTrades}</div>
                <div className="text-[14px] text-[#121F3D]/70 dark:text-[#B6B8CF]">Trades</div>
              </div>
            </div>
          </div>

          {/* Wallet & Edit Profile */}
          <div className="flex gap-3 ml-auto mt-0 md:mt-2">
            <Button
              variant="outline"
              className="rounded-full border-[#E4E1FF] dark:border-[#352F7E] text-[#121F3D]/70 dark:text-[#B6B8CF] hover:bg-[#F9F9FB] dark:hover:bg-[#1A1C36]"
            >
              {displayAddress}
              <ExternalLink className="ml-2 h-3 w-3" />
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-[#6C63FF] dark:border-[#8075FF] text-[#6C63FF] dark:text-[#8075FF] hover:bg-[#E4E1FF] dark:hover:bg-[#322F5D]"
              onClick={() => setIsSettingsOpen(true)}
            >
              Edit Profile
            </Button>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div
          className={cn(
            "sticky top-20 z-30 bg-white/80 dark:bg-[#131525]/80 backdrop-blur-md transition-all duration-300 py-4",
            scrolled && "shadow-sm border-b border-[#E4E1FF]/50 dark:border-[#352F7E]/20",
          )}
        >
          <Tabs defaultValue="collection" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-[#F9F9FB] dark:bg-[#1A1C36] rounded-full p-1 w-full max-w-md mx-auto">
              <TabsTrigger
                value="collection"
                className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-[#131525] data-[state=active]:text-[#121F3D] dark:data-[state=active]:text-white data-[state=active]:font-medium text-[#121F3D]/70 dark:text-[#B6B8CF] px-6"
              >
                Collection
              </TabsTrigger>
              <TabsTrigger
                value="activity"
                className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-[#131525] data-[state=active]:text-[#121F3D] dark:data-[state=active]:text-white data-[state=active]:font-medium text-[#121F3D]/70 dark:text-[#B6B8CF] px-6"
              >
                Activity
              </TabsTrigger>
              <TabsTrigger
                value="favorites"
                className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-[#131525] data-[state=active]:text-[#121F3D] dark:data-[state=active]:text-white data-[state=active]:font-medium text-[#121F3D]/70 dark:text-[#B6B8CF] px-6"
              >
                Favorites
              </TabsTrigger>
              <TabsTrigger
                value="about"
                className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-[#131525] data-[state=active]:text-[#121F3D] dark:data-[state=active]:text-white data-[state=active]:font-medium text-[#121F3D]/70 dark:text-[#B6B8CF] px-6"
              >
                About
              </TabsTrigger>
            </TabsList>

            <TabsContent value="collection" className="mt-8">
              <ProfileCollection />
            </TabsContent>

            <TabsContent value="activity" className="mt-8">
              <ProfileActivity />
            </TabsContent>

            <TabsContent value="favorites" className="mt-8">
              <ProfileFavorites />
            </TabsContent>

            <TabsContent value="about" className="mt-8">
              <ProfileAbout />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Settings Slide-in Panel */}
      <ProfileSettings isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  )
}

function getMonthName(monthNumber: number): string {
  switch (monthNumber) {
    case 0:
      return "Jan";
    case 1:
      return "Feb";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
    default:
      // Handle cases where the input is not between 0 and 11
      console.error(`Invalid month number: ${monthNumber}`);
      return "Invalid Month"; 
  }
}