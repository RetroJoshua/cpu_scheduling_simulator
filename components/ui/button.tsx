
import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'secondary' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const buttonVariants = (props?: { variant?: ButtonProps['variant']; size?: ButtonProps['size'] } | ButtonProps['variant'], sizeArg?: ButtonProps['size']) => {
  let variant: ButtonProps['variant'] = 'default'
  let size: ButtonProps['size'] = 'default'
  
  if (typeof props === 'object' && props !== null) {
    variant = props.variant || 'default'
    size = props.size || 'default'
  } else if (typeof props === 'string') {
    variant = props
    size = sizeArg || 'default'
  }
  
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
  
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    link: "text-primary underline-offset-4 hover:underline"
  }
  
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3 text-sm",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10"
  }

  return `${baseStyles} ${variants[variant]} ${sizes[size]}`
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
