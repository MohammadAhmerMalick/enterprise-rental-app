import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '@/lib/utils'

const containerVariants = cva('mx-auto', {
  defaultVariants: {
    variant: 'default',
  },
  variants: {
    variant: {
      default: 'mx-auto max-w-8xl px-4 sm:px-6 lg:px-8',
    },
  },
})

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, children, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(containerVariants({ variant }), className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Container.displayName = 'Container'

export { Container, containerVariants }
