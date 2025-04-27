"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Star, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock user data
const userData = {
  bio: "Passionate Pokémon card collector since 1999. Specializing in first edition holos and Japanese promos. Always looking to trade for rare Charizard variants and Pikachu promos. Based in New York City, I attend most major trading card events on the East Coast.",
  socialLinks: [
    { name: "Twitter", url: "https://twitter.com/cardcollector" },
    { name: "Instagram", url: "https://instagram.com/cardcollector" },
    { name: "YouTube", url: "https://youtube.com/cardcollector" },
  ],
  collectorFocus: ["Pokémon", "First Editions", "Holos", "Japanese Promos", "PSA Graded"],
  trustScore: 98,
  feedback: [
    {
      id: "1",
      user: "PokéMaster42",
      avatar: "/placeholder.svg?key=wz3mk",
      comment: "Great collector to deal with! Cards arrived in perfect condition and exactly as described.",
      date: "2 weeks ago",
    },
    {
      id: "2",
      user: "VintageTrader",
      avatar: "/placeholder.svg?key=7cdzs",
      comment: "Smooth transaction and fast payment. Would definitely trade with again!",
      date: "1 month ago",
    },
    {
      id: "3",
      user: "HoloHunter",
      avatar: "/placeholder.svg?key=51p9p",
      comment: "Excellent communication throughout the entire process. A trustworthy collector.",
      date: "2 months ago",
    },
  ],
}

export function ProfileAbout() {
  const [showAllFeedback, setShowAllFeedback] = useState(false)

  const displayedFeedback = showAllFeedback ? userData.feedback : userData.feedback.slice(0, 2)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Bio and Info */}
      <div className="md:col-span-2">
        <motion.div
          className="bg-[#F9F9FB] dark:bg-[#1A1C36] rounded-2xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-[20px] font-bold text-[#121F3D] dark:text-white mb-4">Bio</h3>
          <p className="text-[16px] text-[#121F3D]/80 dark:text-[#B6B8CF] leading-relaxed">{userData.bio}</p>

          {/* Social Links */}
          {userData.socialLinks.length > 0 && (
            <div className="mt-6">
              <h4 className="text-[16px] font-medium text-[#121F3D] dark:text-white mb-2">Social Links</h4>
              <div className="flex flex-wrap gap-4">
                {userData.socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#6C63FF] dark:text-[#8075FF] hover:underline flex items-center"
                  >
                    {link.name}
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Collector Focus */}
          <div className="mt-6">
            <h4 className="text-[16px] font-medium text-[#121F3D] dark:text-white mb-2">Collector Focus</h4>
            <div className="flex flex-wrap gap-2">
              {userData.collectorFocus.map((focus) => (
                <Badge
                  key={focus}
                  className="bg-[#E4E1FF] dark:bg-[#322F5D] text-[#6C63FF] dark:text-[#8075FF] border border-[#6C63FF]/20 dark:border-[#8075FF]/20 rounded-full"
                >
                  {focus}
                </Badge>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Feedback */}
        <motion.div
          className="bg-[#F9F9FB] dark:bg-[#1A1C36] rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="text-[20px] font-bold text-[#121F3D] dark:text-white mb-4">Recent Feedback</h3>

          <div className="space-y-6">
            {displayedFeedback.map((feedback) => (
              <div key={feedback.id} className="flex">
                <div className="relative h-10 w-10 rounded-full overflow-hidden mr-4">
                  <Image
                    src={feedback.avatar || "/placeholder.svg"}
                    alt={feedback.user}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center">
                    <h4 className="font-medium text-[#121F3D] dark:text-white">{feedback.user}</h4>
                    <span className="text-[14px] text-[#121F3D]/70 dark:text-[#B6B8CF] ml-2">{feedback.date}</span>
                  </div>
                  <p className="text-[#121F3D]/80 dark:text-[#B6B8CF] mt-1">{feedback.comment}</p>
                </div>
              </div>
            ))}
          </div>

          {userData.feedback.length > 2 && (
            <button
              className="text-[#6C63FF] dark:text-[#8075FF] hover:underline mt-4 text-[14px]"
              onClick={() => setShowAllFeedback(!showAllFeedback)}
            >
              {showAllFeedback ? "Show Less" : "Show All Feedback"}
            </button>
          )}
        </motion.div>
      </div>

      {/* Trust Score */}
      <div>
        <motion.div
          className="bg-[#F9F9FB] dark:bg-[#1A1C36] rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-[20px] font-bold text-[#121F3D] dark:text-white mb-4">Trust Score</h3>

          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 mb-4">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#E4E1FF"
                  strokeWidth="10"
                  className="dark:stroke-[#322F5D]"
                />
                {/* Progress circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#6C63FF"
                  strokeWidth="10"
                  strokeDasharray={`${userData.trustScore * 2.83} 283`}
                  strokeDashoffset="0"
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                  className="dark:stroke-[#8075FF]"
                />
                {/* Center text */}
                <text
                  x="50"
                  y="50"
                  textAnchor="middle"
                  dy="0.3em"
                  fontSize="24"
                  fontWeight="bold"
                  fill="#121F3D"
                  className="dark:fill-white"
                >
                  {userData.trustScore}%
                </text>
              </svg>
            </div>

            <div className="flex items-center mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="h-5 w-5 text-[#FFD166] dark:text-[#FFE066] fill-[#FFD166] dark:fill-[#FFE066]"
                />
              ))}
            </div>

            <p className="text-center text-[#121F3D]/70 dark:text-[#B6B8CF]">
              Based on {userData.feedback.length} transactions
            </p>
          </div>

          <div className="mt-6 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[14px] text-[#121F3D]/70 dark:text-[#B6B8CF]">On-time Shipping</span>
              <span className="text-[14px] font-medium text-[#121F3D] dark:text-white">100%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[14px] text-[#121F3D]/70 dark:text-[#B6B8CF]">Item as Described</span>
              <span className="text-[14px] font-medium text-[#121F3D] dark:text-white">98%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[14px] text-[#121F3D]/70 dark:text-[#B6B8CF]">Communication</span>
              <span className="text-[14px] font-medium text-[#121F3D] dark:text-white">95%</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
