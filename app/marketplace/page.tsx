import { Suspense } from "react"
import { MarketplaceHeader } from "@/components/marketplace/marketplace-header"
import { MarketplaceFilters } from "@/components/marketplace/marketplace-filters"
import { MarketplaceGrid } from "@/components/marketplace/marketplace-grid"
import { MarketplaceFeatured } from "@/components/marketplace/marketplace-featured"
import { MarketplaceLoading } from "@/components/marketplace/marketplace-loading"

export default function MarketplacePage() {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <MarketplaceHeader />
      <div className="max-w-7xl mx-auto px-4">
        <Suspense fallback={<MarketplaceLoading />}>
          <MarketplaceFeatured />
          <MarketplaceFilters />
          <MarketplaceGrid />
        </Suspense>
      </div>
    </main>
  )
}
