"use client"

import { useState } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"

interface PriceHistoryChartProps {
  data: { date: string; price: number }[]
}

export function PriceHistoryChart({ data }: PriceHistoryChartProps) {
  const [activeFilter, setActiveFilter] = useState("all")

  // Find min, max, and average prices
  const prices = data.map((item) => item.price)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length

  // Format dates for display
  const formattedData = data.map((item) => {
    const [year, month] = item.date.split("-")
    const date = new Date(Number.parseInt(year), Number.parseInt(month) - 1)
    return {
      ...item,
      formattedDate: date.toLocaleDateString("en-US", { month: "short", year: "2-digit" }),
    }
  })

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-[#0C0E1B]/80 backdrop-blur-md rounded-lg p-2 border border-[#352F7E]/20">
            <div className="text-xs text-[#B6B8CF]/70">Min</div>
            <div className="font-medium text-white">${minPrice.toLocaleString()}</div>
          </div>
          <div className="bg-[#0C0E1B]/80 backdrop-blur-md rounded-lg p-2 border border-[#352F7E]/20">
            <div className="text-xs text-[#B6B8CF]/70">Average</div>
            <div className="font-medium text-white">${Math.round(avgPrice).toLocaleString()}</div>
          </div>
          <div className="bg-[#0C0E1B]/80 backdrop-blur-md rounded-lg p-2 border border-[#352F7E]/20">
            <div className="text-xs text-[#B6B8CF]/70">Max</div>
            <div className="font-medium text-white">${maxPrice.toLocaleString()}</div>
          </div>
        </div>

        <div className="flex space-x-2 text-sm">
          {["all", "6m", "3m", "1m"].map((filter) => (
            <button
              key={filter}
              className={`px-3 py-1 rounded-full ${
                activeFilter === filter
                  ? "bg-[#8075FF] text-white"
                  : "bg-[#0C0E1B]/80 text-[#B6B8CF] hover:bg-[#322F5D]/50 border border-[#352F7E]/20"
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter === "all" ? "All" : filter}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={formattedData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8075FF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8075FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#352F7E" opacity={0.3} />
            <XAxis dataKey="formattedDate" tick={{ fontSize: 12, fill: "#B6B8CF" }} tickLine={false} axisLine={false} />
            <YAxis
              domain={[minPrice * 0.9, maxPrice * 1.1]}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              tick={{ fontSize: 12, fill: "#B6B8CF" }}
              tickLine={false}
              axisLine={false}
              width={60}
            />
            <Tooltip
              formatter={(value: number) => [`$${value.toLocaleString()}`, "Price"]}
              labelFormatter={(label) => `Date: ${label}`}
              contentStyle={{
                backgroundColor: "rgba(19, 21, 37, 0.9)",
                borderRadius: "8px",
                border: "1px solid rgba(53, 47, 126, 0.3)",
                color: "#FFFFFF",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
              }}
            />
            <ReferenceLine y={avgPrice} stroke="#8075FF" strokeDasharray="3 3">
              <label position="right" value="Average" fill="#8075FF" fontSize={12} />
            </ReferenceLine>
            <Area type="monotone" dataKey="price" stroke="#8075FF" fill="url(#colorPrice)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between text-xs text-[#B6B8CF]/70 mt-2">
        <div>Price history based on {data.length} sales</div>
        <div>Last updated: April 2023</div>
      </div>
    </div>
  )
}
