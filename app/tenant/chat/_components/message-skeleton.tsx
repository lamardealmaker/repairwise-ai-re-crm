"use client"

import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

export default function MessageSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex w-full",
            i % 2 === 0 ? "justify-start" : "justify-end"
          )}
        >
          <div
            className={cn(
              "flex items-center space-x-2",
              i % 2 === 0 ? "flex-row" : "flex-row-reverse"
            )}
          >
            <Skeleton className="size-8 rounded-full" />
            <div className="space-y-2">
              <Skeleton
                className={cn(
                  "h-10",
                  i === 0 ? "w-[250px]" : i === 1 ? "w-[180px]" : "w-[120px]"
                )}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
