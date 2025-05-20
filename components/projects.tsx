"use client"
import React, { useEffect, useState } from 'react'
import SLiderProjetsView from './slider-projects-view'
import ListProjectView from './list-project-view'
import { useProjectsStore } from '@/lib/store/useProjectsStore'

const Projects = ({ related, id }: { related?: string, id?: string }) => {
  const [viewMode, setViewMode] = useState("slide")
  const { fetchProjects, isLoadingProjects, projects: allProjects } = useProjectsStore()

  const projects = related ? allProjects?.filter((project) => project.categories.includes(related) && project._id !== id) : allProjects
  useEffect(() => {
    fetchProjects()
  }, [])
  return (
    <div>
      <div className="flex w-full justify-center">
        <h2 className="text-3xl font-bold text-center mb-6 relative inline-block section-header fade-in-up purple-gold-gradient">Projects</h2>
      </div>

      <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto fade-in-up delay-100">
        Here are a few recent projects that highlight my skills with Python, JavaScript/TypeScript, and current development tools and frameworks.
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
        viewMode === "slide" ? <SLiderProjetsView projects={projects!} isLoadingProjects={isLoadingProjects} /> : <ListProjectView projects={projects!} isLoadingProjects={isLoadingProjects} />
      }
    </div>
  )
}

export default Projects