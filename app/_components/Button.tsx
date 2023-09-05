import React from 'react'
import { cn } from '../_utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, ...props }, ref) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 sm:text-sm bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 text-white tracking-[0.02em]',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

Button.displayName = 'Button'

export default Button
