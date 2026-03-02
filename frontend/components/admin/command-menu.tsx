"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { navGroups } from "@/lib/nav"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

interface CommandMenuProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function CommandMenu({ open, setOpen }: CommandMenuProps) {
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(!open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [open, setOpen])

  const runCommand = React.useCallback(
    (command: () => void) => {
      setOpen(false)
      command()
    },
    [setOpen]
  )

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList className="scrollbar-custom">
        <CommandEmpty>No results found.</CommandEmpty>
        {navGroups.map((group) => (
          <CommandGroup key={group.title} heading={group.title}>
            {group.items.map((item) => (
              <CommandItem
                key={`${group.title}-${item.title}`}
                onSelect={() => {
                  runCommand(() => router.push(item.href))
                }}
                className="flex items-center gap-2 px-3 py-4 cursor-pointer"
              >
                <div className="flex size-6 items-center justify-center rounded-md border border-border/50 bg-muted/30">
                  <item.icon className="size-3.5 opacity-80" />
                </div>
                <span className="font-medium">{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  )
}
