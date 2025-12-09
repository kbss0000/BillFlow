import { cn } from "../../lib/utils"

export function GridPattern({ className, ...props }) {
  return (
    <div
      className={cn(
        "absolute inset-0 [background-image:linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [background-size:24px_24px]",
        className
      )}
      {...props}
    />
  )
}

