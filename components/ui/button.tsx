import * as React from "react"
import { cn } from "@/lib/utils"

type Variant = "default" | "outline" | "ghost" | "link"
type Size = "default" | "sm" | "lg" | "icon"

export const buttonVariants = (
  variant: Variant = "default",
  size: Size = "default",
  className = ""
) => {
  const base =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"

  const variants: Record<Variant, string> = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  }

  const sizes: Record<Size, string> = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10 p-0",
  }

  return cn(base, variants[variant], sizes[size], className)
}

interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  variant?: Variant
  size?: Size
  asChild?: boolean
  disabled: boolean
  children: React.ReactNode
  type:"button" | "submit" | "reset" | undefined
}

const Button = React.forwardRef<HTMLElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, children, ...props }, ref) => {
    const Comp: React.ElementType = asChild ? "a" : "button"

    return (
      <Comp
        className={buttonVariants(variant, size, className)}
        ref={ref as any}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)

Button.displayName = "Button"

export { Button }
