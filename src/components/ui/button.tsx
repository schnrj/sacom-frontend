import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-md hover:bg-primary-hover hover:shadow-lg active:scale-95",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 active:scale-95",
        outline:
          "border border-input-border bg-background shadow-sm hover:bg-accent hover:text-accent-foreground hover:border-accent",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary-hover active:scale-95",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        success:
          "bg-success text-success-foreground shadow-md hover:bg-success/90 active:scale-95",
        warning:
          "bg-warning text-warning-foreground shadow-md hover:bg-warning/90 active:scale-95",
        accent:
          "bg-accent text-accent-foreground shadow-md hover:bg-accent-hover active:scale-95",
        gradient:
          "bg-gradient-primary text-primary-foreground shadow-lg hover:shadow-xl active:scale-95",
        "gradient-accent":
          "bg-gradient-accent text-accent-foreground shadow-lg hover:shadow-xl active:scale-95",
        chat:
          "bg-user-message text-user-message-foreground shadow-md hover:bg-user-message/90 rounded-lg",
        "ai-response":
          "bg-ai-response text-ai-response-foreground shadow-md hover:bg-ai-response/90 rounded-lg",
        minimal:
          "bg-transparent text-foreground hover:bg-muted-hover border border-transparent",
        floating:
          "bg-card text-card-foreground shadow-xl hover:shadow-2xl border border-card-border backdrop-blur-sm",
        microphone:
          "bg-gradient-primary text-primary-foreground shadow-glow hover:shadow-xl rounded-full active:scale-95",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-lg px-10 text-lg",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-11 w-11",
        "icon-xl": "h-12 w-12",
        microphone: "h-12 w-12 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
