import { cn } from '@/app/_utils'
import React from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  errormsg?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, errormsg, ...props }, ref) => {
    console.log('errormsg', errormsg)
    return (
      <textarea
        className={cn(
          'flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-base/6 shadow-sm placeholder:text-muted-foreground focus:outline-none focus:border-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm sm:leading-[22px]',
          {
            'border-red-500 focus-visible:ring-red-500': errormsg,
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export default Textarea
