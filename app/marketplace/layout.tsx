import type React from "react"
import "../globals.css"
import "./marketplace.css"

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
