import { Skeleton } from "@/components/ui/skeleton"

export function MarketplaceLoading() {
  return (
    <div>
      {/* Featured cards loading */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-8 w-24" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white dark:bg-[#1A1A1A] rounded-3xl p-4 shadow-md">
              <Skeleton className="h-[350px] w-[250px] mx-auto mb-4 rounded-lg" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-2" />
              <div className="flex gap-2 mb-4">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-10 w-full rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Filters loading */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-10 w-32 rounded-full" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-10 w-40 rounded-full" />
          </div>
        </div>
        <Skeleton className="h-40 w-full rounded-2xl mb-4" />
      </div>

      {/* Cards grid loading */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="bg-white dark:bg-[#1A1A1A] rounded-2xl p-3 shadow-md">
            <Skeleton className="h-[200px] w-[143px] mx-auto mb-3 rounded-lg" />
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-2" />
            <div className="flex gap-1.5 mb-2">
              <Skeleton className="h-4 w-12 rounded-full" />
              <Skeleton className="h-4 w-12 rounded-full" />
            </div>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-7 w-full rounded-full" />
          </div>
        ))}
      </div>
    </div>
  )
}
