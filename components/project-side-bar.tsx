import { ChevronLeft, ChevronRight, Grid, Layers, LayoutDashboard } from 'lucide-react'
import React from 'react'

const sections = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard size={18} /> },
    { id: "features", label: "Features", icon: <Layers size={18} /> },
    { id: "related", label: "Related Projects", icon: <Grid size={18} /> },
  ]

function SideNavigator({
    activeSection,
    isCollapsed,
    toggleCollapse,
  }: {
    activeSection: string
    isCollapsed: boolean
    toggleCollapse: () => void
  }) {
    const scrollToSection = (id: string) => {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  
    return (
      <div
        className={`side-navigator fixed left-4 top-32 z-20 hidden lg:block
                 transition-all duration-300 ease-in-out w-auto`}
      >
        <div className="bg-white dark:bg-gray-900 bg-background/80 backdrop-blur-sm shadow-lg p-4 border border-border border-gray-200 dark:border-gray-800 rounded-lg relative">
          <button
            onClick={toggleCollapse}
            className="absolute -right-3 top-3 bg-background/80 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full p-1 text-purple-600 dark:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shadow-sm"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
  
          <ul className="space-y-4">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={` w-full flex gap-1 px-3 py-2 rounded-md text-xs ${
                    activeSection === section.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  <span>{section.icon}</span>
                  {!isCollapsed && <span>{section.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
    )
  }

export default SideNavigator