"use client"

import type React from "react"
import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"
import { ZoomIn, ZoomOut } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CardDetail3DProps {
  image: string
  type?: "normal" | "holographic" | "full-art" | "reverse-holo" | "gold"
  isZoomed: boolean
  setIsZoomed: (isZoomed: boolean) => void
}

export function CardDetail3D({ image, type = "normal", isZoomed, setIsZoomed }: CardDetail3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)

  // 3D tilt effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-100, 100], [8, -8])
  const rotateY = useTransform(x, [-100, 100], [-8, 8])

  const springConfig = { stiffness: 300, damping: 30 }
  const springRotateX = useSpring(rotateX, springConfig)
  const springRotateY = useSpring(rotateY, springConfig)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (isZoomed) {
      // Handle zoom panning
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return

      const relativeX = e.clientX - rect.left
      const relativeY = e.clientY - rect.top

      const percentX = (relativeX / rect.width) * 100
      const percentY = (relativeY / rect.height) * 100

      setZoomPosition({ x: percentX, y: percentY })
    } else {
      // Handle 3D tilt effect
      const rect = e.currentTarget.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      x.set(e.clientX - centerX)
      y.set(e.clientY - centerY)
    }
  }

  function handleMouseLeave() {
    if (!isZoomed) {
      x.set(0)
      y.set(0)
    }
  }

  function handleMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    if (isZoomed) {
      setIsDragging(true)
      setPosition({
        x: e.clientX - zoomPosition.x,
        y: e.clientY - zoomPosition.y,
      })
    }
  }

  function handleMouseUp() {
    if (isZoomed) {
      setIsDragging(false)
    }
  }

  return (
    <div
      className={cn("relative cursor-move transition-all duration-300", isZoomed ? "h-[600px]" : "h-[450px]")}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{
        perspective: 1000,
      }}
    >
      {isZoomed ? (
        <div
          className="relative w-full h-full overflow-hidden rounded-xl"
          style={{
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          <div
            className="absolute w-[200%] h-[200%]"
            style={{
              transform: `translate(${-zoomPosition.x}%, ${-zoomPosition.y}%)`,
            }}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt="Card detail"
              fill
              className="object-cover"
              quality={100}
              priority
            />
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="absolute bottom-4 right-4 rounded-full bg-black/50 backdrop-blur-sm text-white border border-white/10 hover:bg-black/70"
            onClick={(e) => {
              e.stopPropagation()
              setIsZoomed(false)
            }}
          >
            <ZoomOut className="h-4 w-4 mr-1" />
            Exit Zoom
          </Button>
        </div>
      ) : (
        <motion.div
          className={cn(
            "relative w-full h-full rounded-xl overflow-hidden shadow-lg shadow-[#352F7E]/20",
            type === "holographic" && "holographic-effect",
            type === "full-art" && "full-art-effect",
            type === "gold" && "gold-effect",
            type === "reverse-holo" && "reverse-holo-effect",
          )}
          style={{
            rotateX: springRotateX,
            rotateY: springRotateY,
            transformStyle: "preserve-3d",
          }}
        >
          <Image src={image || "/placeholder.svg"} alt="Card detail" fill className="object-contain" priority />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#6C63FF]/5 to-transparent pointer-events-none"></div>
          <Button
            variant="secondary"
            size="sm"
            className="absolute bottom-4 right-4 rounded-full bg-black/50 backdrop-blur-sm text-white border border-white/10 hover:bg-black/70"
            onClick={(e) => {
              e.stopPropagation()
              setIsZoomed(true)
            }}
          >
            <ZoomIn className="h-4 w-4 mr-1" />
            Zoom
          </Button>
        </motion.div>
      )}
    </div>
  )
}
