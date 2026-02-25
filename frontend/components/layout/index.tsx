import * as React from "react"
import { cn } from "@/lib/utils"

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  fixed?: boolean
}

const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, fixed, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative flex h-full w-full flex-col",
        fixed && "overflow-hidden",
        className
      )}
      {...props}
    />
  )
)
Layout.displayName = "Layout"

interface HeaderProps extends React.HTMLAttributes<HTMLHeadElement> {
  sticky?: boolean
}

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({ className, sticky, ...props }, ref) => (
    <header
      ref={ref}
      className={cn(
        "flex h-16 items-center justify-between gap-4 border-b px-4 py-3 sm:gap-8 sm:px-8",
        sticky && "sticky top-0 z-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
      {...props}
    />
  )
)
Header.displayName = "Header"

const Body = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex-1 overflow-auto py-6 px-4 sm:px-8",
        className
      )}
      {...props}
    />
  )
)
Body.displayName = "Body"

export { Layout, Header, Body }
