"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"
const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
    data-oid="1z41cae"
  >
    <SliderPrimitive.Track
      className="bg-secondary relative h-2 w-full grow overflow-hidden rounded-full"
      data-oid="t7sc6f0"
    >
      <SliderPrimitive.Range
        className="bg-primary absolute h-full"
        data-oid="m6h7vj_"
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className="border-primary bg-background ring-offset-background focus-visible:ring-ring block size-5 rounded-full border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      data-oid="9zvp35i"
    />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName
export { Slider }
