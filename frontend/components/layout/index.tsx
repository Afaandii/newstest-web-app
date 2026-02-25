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
  fixed?: boolean
}

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({ className, sticky, fixed, ...props }, ref) => (
    <header
      ref={ref}
      className={cn(
        "flex h-16 items-center justify-between gap-4 px-4 py-3 sm:gap-8 sm:px-8",
        sticky && "sticky top-0 z-20 bg-background/60 backdrop-blur-md",
        fixed && "fixed top-0 right-0 left-0 md:left-[var(--sidebar-width)] z-20 bg-background/60 backdrop-blur-md transition-all duration-300 ease-in-out",
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
        "flex-1 py-6 px-4 sm:px-8",
        className
      )}
      {...props}
    />
  )
)
Body.displayName = "Body"

export { Layout, Header, Body }
