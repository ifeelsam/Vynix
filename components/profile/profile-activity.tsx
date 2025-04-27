"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Generate mock activity data
const generateActivity = (count: number) => {
  const activityTypes = ["Purchased", "Sold", "Listed", "Traded", "Favorited"]
  const cardNames = ["Charizard", "Pikachu", "Blastoise", "Venusaur", "Mewtwo", "Mew", "Gyarados", "Dragonite"]
  const sets = ["Base Set", "Jungle", "Fossil", "Team Rocket", "Gym Heroes"]

  // Generate dates within the last 3 months
  const getRandomDate = () => {
    const now = new Date()
    const threeMonthsAgo = new Date()
    threeMonthsAgo.setMonth(now.getMonth() - 3)

    const randomTimestamp = threeMonthsAgo.getTime() + Math.random() * (now.getTime() - threeMonthsAgo.getTime())
    return new Date(randomTimestamp)
  }

  // Sort activities by date (newest first)
  return Array.from({ length: count }, (_, i) => {
    const id = (i + 1).toString()
    const type = activityTypes[Math.floor(Math.random() * activityTypes.length)]
    const cardName = cardNames[Math.floor(Math.random() * cardNames.length)]
    const set = sets[Math.floor(Math.random() * sets.length)]
    const date = getRandomDate()
    const price = type !== "Favorited" ? Math.floor(Math.random() * 5000) + 50 : null

    return {
      id,
      type,
      cardName,
      set,
      date,
      price,
      image: `/placeholder.svg?height=100&width=70&query=${cardName} pokemon card`,
    }
  }).sort((a, b) => b.date.getTime() - a.date.getTime())
}

const activities = generateActivity(15)

// Group activities by month
const groupActivitiesByMonth = (activities: any[]) => {
  const grouped: Record<string, any[]> = {}

  activities.forEach((activity) => {
    const monthYear = activity.date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
    if (!grouped[monthYear]) {
      grouped[monthYear] = []
    }
    grouped[monthYear].push(activity)
  })

  return grouped
}

const groupedActivities = groupActivitiesByMonth(activities)

export function ProfileActivity() {
  const [expandedActivity, setExpandedActivity] = useState<string | null>(null)

  const toggleActivityDetails = (id: string) => {
    if (expandedActivity === id) {
      setExpandedActivity(null)
    } else {
      setExpandedActivity(id)
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "Purchased":
        return "bg-[#4ECCA3]/10 text-[#4ECCA3] border-[#4ECCA3]/30"
      case "Sold":
        return "bg-[#6C63FF]/10 text-[#6C63FF] border-[#6C63FF]/30"
      case "Listed":
        return "bg-[#FFD166]/10 text-[#FFD166] border-[#FFD166]/30"
      case "Traded":
        return "bg-[#FF6B6B]/10 text-[#FF6B6B] border-[#FF6B6B]/30"
      case "Favorited":
        return "bg-[#FF6B6B]/10 text-[#FF6B6B] border-[#FF6B6B]/30"
      default:
        return "bg-[#6C63FF]/10 text-[#6C63FF] border-[#6C63FF]/30"
    }
  }

  return (
    <div>
      {Object.keys(groupedActivities).length > 0 ? (
        <div className="space-y-8">
          {Object.entries(groupedActivities).map(([monthYear, monthActivities]) => (
            <div key={monthYear}>
              <h3 className="text-[16px] font-medium text-[#121F3D]/70 dark:text-[#B6B8CF] mb-4">{monthYear}</h3>

              <div className="space-y-4">
                {monthActivities.map((activity) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-[#F9F9FB] dark:bg-[#1A1C36] rounded-xl overflow-hidden"
                  >
                    {/* Activity Summary */}
                    <div
                      className="p-4 flex items-center cursor-pointer"
                      onClick={() => toggleActivityDetails(activity.id)}
                    >
                      <div className="relative h-14 w-10 rounded overflow-hidden mr-4">
                        <Image
                          src={activity.image || "/placeholder.svg"}
                          alt={activity.cardName}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center">
                          <Badge
                            className={`${getActivityColor(activity.type)} border rounded-full px-2 py-0.5 text-xs`}
                          >
                            {activity.type}
                          </Badge>
                          <span className="text-[14px] text-[#121F3D]/70 dark:text-[#B6B8CF] ml-2">
                            {activity.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </span>
                        </div>

                        <h4 className="font-medium text-[#121F3D] dark:text-white mt-1">
                          {activity.cardName}{" "}
                          <span className="font-normal text-[14px] text-[#121F3D]/70 dark:text-[#B6B8CF]">
                            ({activity.set})
                          </span>
                        </h4>
                      </div>

                      <div className="flex items-center">
                        {activity.price && (
                          <span className="font-medium text-[#121F3D] dark:text-white mr-3">
                            ${activity.price.toLocaleString()}
                          </span>
                        )}
                        {expandedActivity === activity.id ? (
                          <ChevronUp className="h-5 w-5 text-[#121F3D]/70 dark:text-[#B6B8CF]" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-[#121F3D]/70 dark:text-[#B6B8CF]" />
                        )}
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {expandedActivity === activity.id && (
                      <div className="px-4 pb-4 pt-2 border-t border-[#E4E1FF]/50 dark:border-[#352F7E]/20">
                        <div className="bg-white dark:bg-[#131525] rounded-lg p-3">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="text-[14px] text-[#121F3D]/70 dark:text-[#B6B8CF]">Transaction ID</div>
                              <div className="text-[#121F3D] dark:text-white font-medium">
                                #{Math.random().toString(36).substring(2, 10).toUpperCase()}
                              </div>
                            </div>
                            <div>
                              <div className="text-[14px] text-[#121F3D]/70 dark:text-[#B6B8CF]">Date & Time</div>
                              <div className="text-[#121F3D] dark:text-white font-medium">
                                {activity.date.toLocaleString()}
                              </div>
                            </div>
                            {activity.price && (
                              <>
                                <div>
                                  <div className="text-[14px] text-[#121F3D]/70 dark:text-[#B6B8CF]">Price</div>
                                  <div className="text-[#121F3D] dark:text-white font-medium">
                                    ${activity.price.toLocaleString()}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-[14px] text-[#121F3D]/70 dark:text-[#B6B8CF]">
                                    Payment Method
                                  </div>
                                  <div className="text-[#121F3D] dark:text-white font-medium">Ethereum</div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-[#121F3D]/70 dark:text-[#B6B8CF]">No activity to display</p>
        </div>
      )}
    </div>
  )
}

// Make sure we're exporting the component properly
export default ProfileActivity
