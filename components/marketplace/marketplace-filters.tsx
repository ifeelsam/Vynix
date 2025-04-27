"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, X, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

interface FilterOption {
  label: string
  value: string
  count?: number
}

interface FilterCategory {
  name: string
  options: FilterOption[]
}

const filterCategories: FilterCategory[] = [
  {
    name: "Card Series",
    options: [
      { label: "Base Set", value: "base-set", count: 102 },
      { label: "Jungle", value: "jungle", count: 64 },
      { label: "Fossil", value: "fossil", count: 62 },
      { label: "Team Rocket", value: "team-rocket", count: 83 },
      { label: "Gym Heroes", value: "gym-heroes", count: 132 },
    ],
  },
  {
    name: "Rarity",
    options: [
      { label: "Common", value: "common", count: 245 },
      { label: "Uncommon", value: "uncommon", count: 187 },
      { label: "Rare", value: "rare", count: 96 },
      { label: "Holo Rare", value: "holo-rare", count: 52 },
      { label: "Ultra Rare", value: "ultra-rare", count: 28 },
    ],
  },
  {
    name: "Card Type",
    options: [
      { label: "Pokémon", value: "pokemon", count: 412 },
      { label: "Energy", value: "energy", count: 87 },
      { label: "Trainer", value: "trainer", count: 109 },
    ],
  },
  {
    name: "Condition",
    options: [
      { label: "PSA 10", value: "psa-10", count: 42 },
      { label: "PSA 9", value: "psa-9", count: 78 },
      { label: "PSA 8", value: "psa-8", count: 124 },
      { label: "BGS 9.5", value: "bgs-9.5", count: 36 },
      { label: "Raw", value: "raw", count: 328 },
    ],
  },
]

export function MarketplaceFilters() {
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({})
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [sortOption, setSortOption] = useState("recently-listed")
  const [viewMode, setViewMode] = useState("grid")
  const [isFilterExpanded, setIsFilterExpanded] = useState(true)

  const handleFilterToggle = (category: string, value: string) => {
    setActiveFilters((prev) => {
      const current = prev[category] || []
      if (current.includes(value)) {
        return {
          ...prev,
          [category]: current.filter((v) => v !== value),
        }
      } else {
        return {
          ...prev,
          [category]: [...current, value],
        }
      }
    })
  }

  const handleClearFilter = (category: string, value: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [category]: (prev[category] || []).filter((v) => v !== value),
    }))
  }

  const handleClearAllFilters = () => {
    setActiveFilters({})
    setPriceRange([0, 1000])
  }

  const totalActiveFilters =
    Object.values(activeFilters).flat().length + (priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0)

  const sortOptions = [
    { label: "Recently Listed", value: "recently-listed" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Popularity", value: "popularity" },
    { label: "Rarity", value: "rarity" },
    { label: "Ending Soon", value: "ending-soon" },
  ]

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          className="rounded-full flex items-center gap-2"
          onClick={() => setIsFilterExpanded(!isFilterExpanded)}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {totalActiveFilters > 0 && (
            <span className="bg-[#6C63FF] dark:bg-[#8075FF] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalActiveFilters}
            </span>
          )}
          {isFilterExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>

        <div className="flex items-center gap-2">
          <div className="text-sm text-[#121F3D]/70 dark:text-[#B6B8CF]">608 results</div>

          <div className="relative group">
            <Button variant="outline" className="rounded-full flex items-center gap-2">
              Sort: {sortOptions.find((o) => o.value === sortOption)?.label}
              <ChevronDown className="h-4 w-4" />
            </Button>
            <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-[#1A1A1A] shadow-lg border border-[#E4E1FF] dark:border-[#2A2A2A] p-2 hidden group-hover:block z-10">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-sm",
                    sortOption === option.value
                      ? "bg-[#E4E1FF] dark:bg-[#322F5D] text-[#6C63FF] dark:text-[#8075FF]"
                      : "hover:bg-[#F8F9FF] dark:hover:bg-[#1A1A1A] text-[#121F3D] dark:text-[#E0E0E0]",
                  )}
                  onClick={() => setSortOption(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isFilterExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-white dark:bg-[#1A1A1A] rounded-2xl p-4 border border-[#E4E1FF] dark:border-[#2A2A2A] mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {filterCategories.map((category) => (
                  <div key={category.name} className="space-y-2">
                    <div
                      className="font-medium text-[#121F3D] dark:text-[#E0E0E0] flex items-center justify-between cursor-pointer"
                      onClick={() => setExpandedCategory(expandedCategory === category.name ? null : category.name)}
                    >
                      {category.name}
                      {expandedCategory === category.name ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>

                    <AnimatePresence>
                      {(expandedCategory === category.name || expandedCategory === null) && (
                        <motion.div
                          initial={expandedCategory !== null ? { height: 0, opacity: 0 } : false}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-1 overflow-hidden"
                        >
                          {category.options.map((option) => (
                            <div key={option.value} className="flex items-center">
                              <input
                                type="checkbox"
                                id={option.value}
                                checked={(activeFilters[category.name] || []).includes(option.value)}
                                onChange={() => handleFilterToggle(category.name, option.value)}
                                className="rounded-sm text-[#6C63FF] dark:text-[#8075FF] focus:ring-[#6C63FF] dark:focus:ring-[#8075FF]"
                              />
                              <label
                                htmlFor={option.value}
                                className="ml-2 text-sm text-[#121F3D]/80 dark:text-[#B6B8CF] flex-1 cursor-pointer"
                              >
                                {option.label}
                              </label>
                              <span className="text-xs text-[#121F3D]/50 dark:text-[#B6B8CF]/50">{option.count}</span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                <div className="space-y-2">
                  <div className="font-medium text-[#121F3D] dark:text-[#E0E0E0]">Price Range</div>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 1000]}
                      max={1000}
                      step={10}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="py-4"
                    />
                    <div className="flex justify-between text-sm text-[#121F3D]/80 dark:text-[#B6B8CF]">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {totalActiveFilters > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {Object.entries(activeFilters).flatMap(([category, values]) =>
                  values.map((value) => {
                    const option = filterCategories
                      .find((c) => c.name === category)
                      ?.options.find((o) => o.value === value)

                    return option ? (
                      <div
                        key={`${category}-${value}`}
                        className="bg-[#E4E1FF] dark:bg-[#322F5D] text-[#6C63FF] dark:text-[#8075FF] rounded-full px-3 py-1 text-sm flex items-center gap-1"
                      >
                        {option.label}
                        <button onClick={() => handleClearFilter(category, value)}>
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ) : null
                  }),
                )}

                {(priceRange[0] > 0 || priceRange[1] < 1000) && (
                  <div className="bg-[#E4E1FF] dark:bg-[#322F5D] text-[#6C63FF] dark:text-[#8075FF] rounded-full px-3 py-1 text-sm flex items-center gap-1">
                    ${priceRange[0]} - ${priceRange[1]}
                    <button onClick={() => setPriceRange([0, 1000])}>
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full text-[#6C63FF] dark:text-[#8075FF] hover:bg-[#E4E1FF] dark:hover:bg-[#322F5D]"
                  onClick={handleClearAllFilters}
                >
                  Clear All
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
