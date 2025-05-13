"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, FolderKanban, FileText, Settings, ChevronLeft, ChevronRight, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

export default function AdminSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Handle responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setCollapsed(true)
      }
    }

    // Initial check
    checkScreenSize()

    // Add event listener
    window.addEventListener("resize", checkScreenSize)

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Projects",
      href: "/admin/projects",
      icon: <FolderKanban className="h-5 w-5" />,
    },
    {
      title: "Blog Posts",
      href: "/admin/blog",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <div
      className={cn(
        "h-screen bg-card/50 backdrop-blur-sm border-r border-border flex flex-col transition-all duration-300 relative z-20",
        collapsed ? "w-16" : "w-64",
        isMobile && collapsed ? "absolute" : "",
      )}
    >
      <div className="p-4 border-b border-border flex items-center justify-between">
        <Link
          href="/admin"
          className={cn(
            "flex items-center gap-2 font-bold text-xl",
            collapsed ? "opacity-0 invisible" : "opacity-100 visible",
          )}
        >
          <div className="flex justify-center min-h-full gap-0.5">
            <div className="flex flex-col items-center">
              <div className="flex mb-0.5">
                <div className="w-2 h-2 rounded-full bg-gold mr-0.5"></div>
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              </div>
              <div className="flex w-5 h-6">
                <div className="w-1/2 h-full bg-primary rounded-l-sm"></div>
                <div className="w-1/2 h-full bg-gold rounded-r-sm"></div>
              </div>
            </div>
          </div>
          <span className="transition-opacity duration-300">Admin</span>
        </Link>
        <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex-1 py-6 overflow-y-auto">
        <nav className="px-2 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground",
                  collapsed && "justify-center",
                )}
              >
                {item.icon}
                <span className={cn("transition-all duration-300", collapsed ? "opacity-0 w-0 hidden" : "opacity-100")}>
                  {item.title}
                </span>
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-muted-foreground hover:text-foreground",
            collapsed && "justify-center",
          )}
          asChild
        >
          <Link href="/">
            <LogOut className="h-5 w-5 mr-2" />
            <span className={cn("transition-all duration-300", collapsed ? "opacity-0 w-0 hidden" : "opacity-100")}>
              Exit Admin
            </span>
          </Link>
        </Button>
      </div>
    </div>
  )
}
