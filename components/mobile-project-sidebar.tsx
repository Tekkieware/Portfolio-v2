import { Grid, Layers, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const sections = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard size={18} /> },
    { id: "features", label: "Features", icon: <Layers size={18} /> },
    { id: "related", label: "Related Projects", icon: <Grid size={18} /> },
  ]

function MobileNav({ activeSection }: { activeSection: string }) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50">
      <div className="container mx-auto px-4 py-2 flex justify-around items-center">
        {sections.map((section) => (
          <Link
            href={`#${section.id}`}
            key={section.id}
            className="flex flex-col items-center text-gray-700 dark:text-gray-300"
          >
            {section.icon}
            <span className="text-xs mt-1">{section.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default MobileNav