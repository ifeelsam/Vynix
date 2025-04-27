import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl" | "2xl"
  variant?: "default" | "gradient"
}

export function VynixLogo({ className, size = "2xl", variant = "gradient" }: LogoProps) {
  const sizeClasses = {
    sm: "h-6",
    md: "h-8",
    lg: "h-10",
    xl: "h-30"
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative">
        <svg
          className={cn(
            sizeClasses["lg"],
            "w-auto",
            variant === "gradient" ? "text-[#6C63FF] dark:text-[#8075FF]" : "text-current",
          )}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16 2L3 9L16 16L29 9L16 2Z" fill="currentColor" fillOpacity="0.8" />
          <path d="M3 9V23L16 30V16L3 9Z" fill="currentColor" fillOpacity="0.6" />
          <path d="M16 16V30L29 23V9L16 16Z" fill="currentColor" fillOpacity="0.4" />
          <path d="M10 12L16 15L22 12L16 9L10 12Z" fill="white" fillOpacity="0.5" />
        </svg>
      </div>
      <span
        className={cn(
          "semi-bold",
          sizeClasses["xl"],
          variant === "gradient"
            ? "bg-gradient-to-r from-[#6C63FF] to-[#5D51FF] dark:from-[#8075FF] dark:to-[#6C63FF] text-transparent bg-clip-text text-2xl"
            : "text-current",
        )}
      >
        Vynix
      </span>
    </div>
  )
}
