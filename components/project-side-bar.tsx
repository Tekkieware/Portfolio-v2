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
                 transition-all duration-300 ease-in-out ${isCollapsed ? "w-14" : "w-48"}`}
      >
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-3 relative shadow-sm">
          <button
            onClick={toggleCollapse}
            className="absolute -right-3 top-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full p-1 text-purple-600 dark:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shadow-sm"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
  
          <ul className="space-y-4">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full flex items-center rounded-md transition-all duration-200 px-3 py-2
                           ${isCollapsed ? "justify-center" : "justify-start space-x-3"}
                           ${
                             activeSection === section.id
                               ? "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 font-medium"
                               : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
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