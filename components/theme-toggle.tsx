"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()


  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-full z-20"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Moon className="h-5 w-5 text-[#E0E0E0]" /> : <Sun className="h-5 w-5 text-[#121F3D]" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
