"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ChevronRight, BookOpen } from 'lucide-react'

interface NavItem {
  title: string
  path: string
  level: number
  children?: NavItem[]
}

export default function Navigation() {
  const pathname = usePathname()
  const [navItems, setNavItems] = useState<NavItem[]>([])
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  useEffect(() => {
    // This would be replaced with actual data fetching
    const demoItems: NavItem[] = [
      {
        title: "Introduction",
        path: "/docs/introduction",
        level: 1,
        children: [
          {
            title: "Getting Started",
            path: "/docs/introduction/getting-started",
            level: 2,
          },
          {
            title: "Setup",
            path: "/docs/introduction/setup",
            level: 2,
          }
        ]
      },
      {
        title: "Features",
        path: "/docs/features",
        level: 1,
        children: [
          {
            title: "Games",
            path: "/docs/features/games",
            level: 2,
            children: [
              {
                title: "Fun Games",
                path: "/docs/features/games/fun",
                level: 3,
              }
            ]
          }
        ]
      }
    ]
    setNavItems(demoItems)
  }, [])

  const toggleExpand = (path: string) => {
    setExpanded(prev => ({ ...prev, [path]: !prev[path] }))
  }

  const renderNavItems = (items: NavItem[]) => {
    return items.map((item) => (
      <div key={item.path} className="flex flex-col">
        <div className={cn(
          "flex items-center gap-2",
          { "ml-4": item.level > 1 }
        )}>
          {item.children && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => toggleExpand(item.path)}
            >
              <ChevronRight
                className={cn(
                  "h-4 w-4 transition-transform",
                  expanded[item.path] ? "rotate-90" : ""
                )}
              />
            </Button>
          )}
          <Link
            href={item.path}
            className={cn(
              "flex py-2 text-sm font-medium hover:text-primary transition-colors",
              pathname === item.path
                ? "text-primary font-semibold"
                : "text-muted-foreground"
            )}
          >
            {item.title}
          </Link>
        </div>
        {item.children && expanded[item.path] && (
          <div className="ml-2">
            {renderNavItems(item.children)}
          </div>
        )}
      </div>
    ))
  }

  return (
    <div className="border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-72 h-screen">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <BookOpen className="h-6 w-6" />
          <span className="text-lg">Kids Guide</span>
        </Link>
      </div>
      <ScrollArea className="h-[calc(100vh-3.5rem)] py-4">
        <div className="px-4">
          {renderNavItems(navItems)}
        </div>
      </ScrollArea>
    </div>
  )
}