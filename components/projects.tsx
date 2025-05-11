"use client"
import React, { useState } from 'react'
import SLiderProjetsView from './slider-projects-view'
import ListProjectView from './list-project-view'

const Projects = () => {
  const [viewMode, setViewMode] = useState("slide")
  return (
    <div>
      <div className="flex w-full justify-center">
        <h2 className="text-3xl font-bold text-center mb-6 relative inline-block section-header fade-in-up purple-gold-gradient">Projects</h2>
      </div>

      <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto fade-in-up delay-100">
        Here are some of my recent projects that showcase my expertise in Python, JavaScript/TypeScript, and modern web
        development frameworks.
      </p>
      <div className="flex w-full justify-center space-x-2 fade-in-up delay-200 mb-5">
        <button
          onClick={() => setViewMode("slide")}
          className={`px-4 py-2 rounded-md text-sm transition-all duration-300 ${viewMode === "slide" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
            }`}
        >
          Slide View
        </button>
        <button
          onClick={() => setViewMode("list")}
          className={`px-4 py-2 rounded-md text-sm transition-all duration-300 ${viewMode === "list" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
            }`}
        >
          List View
        </button>
      </div>
      {
        viewMode === "slide" ? <SLiderProjetsView /> : <ListProjectView />
      }
    </div>
  )
}

export default Projects