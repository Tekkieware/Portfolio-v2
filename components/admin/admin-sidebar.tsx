"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, FolderKanban, FileText, Settings, ChevronLeft, ChevronRight, LogOut, PanelRightOpen, PanelLeftOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import Logo from "../logo"

export default function AdminSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()

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
    }
  ]

  function logoutHandler() {
    router.push("/")
  }

  return (
    <div
      className={cn(
        "h-screen overflow-hidden bg-card/50 backdrop-blur-sm border-r border-border flex flex-col transition-all duration-300 relative z-20",
        collapsed ? "w-16" : "w-64",
        isMobile && collapsed ? "absolute" : "",
      )}
    >
      <div className="p-4 border-b border-border flex items-start justify-between gap-2">
        <Link
          href="/admin"
          className={cn(
            "flex items-center gap-2 font-bold text-xl",
          )}
        >
          <Logo />
        </Link>
        <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <PanelLeftOpen size={15} /> : <PanelRightOpen size={15} />}
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
          onClick={logoutHandler}
          className={cn(
            "w-full justify-start flex gap-1 items-center text-muted-foreground hover:text-foreground text-sm hover:cursor-pointer",
            collapsed && "justify-center",
          )}
          asChild
        >
          <LogOut className="h-4 w-4" />
          <span className={cn("transition-all duration-300", collapsed ? "opacity-0 w-0 hidden" : "opacity-100")}>
            Exit Admin
          </span>
        </Button>
      </div>
    </div>
  )
}
