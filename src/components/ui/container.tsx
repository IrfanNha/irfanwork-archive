// src/components/ui/container.tsx
import { ReactNode, ElementType } from "react"
import clsx from "clsx"

interface ContainerProps {
  children: ReactNode
  className?: string
  as?: ElementType
}

export function Container({
  children,
  className,
  as: Tag = "div",
}: ContainerProps) {
  const Component = Tag as ElementType

  return (
    <Component
      className={clsx(
        // responsive max-width
        "mx-auto w-full max-w-7xl",
        // horizontal padding sesuai device
        "px-4 sm:px-6 lg:px-8",
        // vertical spacing default
        "py-6 sm:py-8 lg:py-12",
        className
      )}
    >
      {children}
    </Component>
  )
}
