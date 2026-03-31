"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  ChevronDown,
  ChevronRight,
  Folder,
  FolderOpen,
  Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavItem {
  title: string
  href?: string
  children?: NavItem[]
  active?: boolean
}

const navItems: NavItem[] = [
  {
    title: "Master",
    children: [
      { title: "Master Info" },
    ],
  },
  {
    title: "Sales",
    children: [
      { title: "Sales" },
    ],
  },
  {
    title: "Inventory",
    children: [
      { title: "Monitoring" },
      { title: "Inbound List" },
      { title: "Outbound List" },
      { title: "Outbound Order List", active: true },
      { title: "Stocktaking" },
      { title: "Inventory Adjustment" },
      { title: "Inventory Movement" },
    ],
  },
  {
    title: "Global Report",
    children: [
      { title: "Global Report" },
    ],
  },
  {
    title: "Setting",
    children: [
      { title: "System Settings" },
    ],
  },
]

function NavItemComponent({ item, depth = 0 }: { item: NavItem; depth?: number }) {
  const [isOpen, setIsOpen] = useState(
    item.children?.some(child => child.active || child.children?.some(c => c.active)) ?? false
  )
  const hasChildren = item.children && item.children.length > 0
  const Icon = isOpen ? FolderOpen : Folder

  return (
    <div>
      <button
        onClick={() => hasChildren && setIsOpen(!isOpen)}
        className={cn(
          "flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors rounded-md",
          depth === 0 ? "text-muted-foreground font-medium" : "text-foreground",
          item.active && "bg-primary/10 text-primary font-medium",
          !item.active && "hover:bg-muted"
        )}
        style={{ paddingLeft: `${12 + depth * 16}px` }}
      >
        {depth === 0 ? (
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            {item.title}
          </span>
        ) : (
          <>
            <Icon className="h-4 w-4 text-muted-foreground" />
            <span className="flex-1 text-left">{item.title}</span>
            {hasChildren && (
              isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
            )}
          </>
        )}
      </button>
      {hasChildren && isOpen && (
        <div className="mt-1">
          {item.children?.map((child, i) => (
            child.children ? (
              <NavItemComponent key={i} item={child} depth={depth + 1} />
            ) : (
              <button
                key={i}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 text-sm transition-colors rounded-md w-full",
                  child.active ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
                style={{ paddingLeft: `${28 + depth * 16}px` }}
              >
                <Folder className="h-4 w-4" />
                {child.title}
              </button>
            )
          ))}
        </div>
      )}
    </div>
  )
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={cn(
      "flex flex-col bg-card border-r border-border h-screen transition-all duration-300 shrink-0",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center gap-2 px-4 h-14 border-b border-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8"
        >
          <Menu className="h-4 w-4" />
        </Button>
        {!collapsed && (
          <span className="font-bold text-lg">IIC_BO</span>
        )}
      </div>

      {!collapsed && (
        <nav className="flex-1 overflow-y-auto py-4">
          {navItems.map((item, i) => (
            <div key={i} className="mb-2">
              <NavItemComponent item={item} />
            </div>
          ))}
        </nav>
      )}

      {!collapsed && (
        <div className="p-4 border-t border-border">
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Front POS
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
    </aside>
  )
}
