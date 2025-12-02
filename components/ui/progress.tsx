// components/ui/progress.tsx

"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      // FIX 1: Pakeistas fonas į tamsų (bg-slate-800), kad išryškėtų žalia juosta
      "relative h-2 w-full overflow-hidden rounded-full bg-slate-800",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      // FIX 2: Pakeista į Emerald gradientą + pridėtas švytėjimas (shadow)
      className="h-full w-full flex-1 bg-gradient-to-r from-emerald-500 to-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-500 ease-out"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }