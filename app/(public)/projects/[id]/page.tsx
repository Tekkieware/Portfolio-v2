"use client"

import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Calendar,
  Users,
  LayoutDashboard,
  Layers,
  Grid,
  RefreshCcw,
} from "lucide-react"
import Projects from "@/components/projects"
import SideNavigator from "@/components/project-side-bar"
import MobileNav from "@/components/mobile-project-sidebar"
import { cn } from "@/lib/utils"
import Loader from "@/components/loader"
import { Project } from "@/lib/types"
import { useProjectsStore } from "@/lib/store/useProjectsStore"



const sections = [
  { id: "overview", label: "Overview", icon: <LayoutDashboard size={18} /> },
  { id: "features", label: "Features", icon: <Layers size={18} /> },
  { id: "related", label: "Related Projects", icon: <Grid size={18} /> },
]


type Params = {
  id: string;
};

export default function ProjectDetails({ params }: { params: Promise<Params> }) {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState("overview")
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})
  const { id } = React.use(params)
  const { projects, fetchProjects, isLoadingProjects } = useProjectsStore()

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const handleBack = () => {
    router.push("/#projects")
  }

  // Find the project data based on the ID
  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  useEffect(() => {
    if (projects?.length && id) {
      const foundProject = projects.find((p) => p._id === id)
      setProject(foundProject || null)
      setLoading(false)
    }
  }, [projects, id])



  // Check if mobile on initial load and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true)
      }
    }

    // Check on initial load
    checkIfMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile)

    // Clean up
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Set up intersection observer to track active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-100px 0px -100px 0px",
      threshold: 0.1,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all section elements
    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) {
        sectionRefs.current[section.id] = element
        observer.observe(element)
      }
    })

    return () => {
      // Clean up observer
      sections.forEach((section) => {
        const element = sectionRefs.current[section.id]
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [project])

  if (isLoadingProjects || loading) {
    return (
      <div className="fixed min-h-screen min-w-screen top-0 inset-0 bg-gray-50 dark:bg-gray-950 flex items-center justify-center z-50">
        <Loader text="Loading project details..." />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The project you're looking for doesn't exist or has been moved.
          </p>
          <button
            onClick={() => router.push("/#projects")}
            className="inline-flex items-center px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <SideNavigator activeSection={activeSection} isCollapsed={isCollapsed} toggleCollapse={toggleCollapse} />
      <MobileNav activeSection={activeSection} />
      {/* Back Button */}
      <div className={cn("fixed top-20 left-4 z-50 dark:bg-gray-900 bg-background/80 hover:bg-muted text-xs backdrop-blur-sm shadow-lg  py-1 border border-border border-gray-200 dark:border-gray-800 rounded-lg px-6", isCollapsed ? " w-[78px]" : "w-[172px]")}>
        <button
          onClick={handleBack}
          className="inline-flex w-full items-center dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
        >
          <ArrowLeft size={18} />
          {!isCollapsed && <span className="ml-1 font-medium">Back</span>}
        </button>
      </div>

      <main>
        <div>
          {/* Hero Section */}
          <section className="relative overflow-hidden mb-12 shadow-lg">
            <div className="relative h-[500px] w-full">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent" />
            </div>

            <div className="absolute top-28 left-0 right-0 p-6 md:p-8 container mx-auto px-4 py-8">
              <div className="flex flex-wrap justify-center items-center gap-2 mb-3">
                {project.categories.map((category: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                  >
                    {category}
                  </span>
                ))}
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                  {project.status}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white text-center">{project.title}</h1>
              <p className="text-gray-200 mb-6 text-center">{project.description}</p>

              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Live Demo
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 rounded-md border border-gray-300 bg-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-colors"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View Source Code
                </a>
              </div>
            </div>
          </section>

          {/* Project Overview Section */}
          <section id="overview" className="mb-16 scroll-mt-24 container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="md:col-span-2">
                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
                  <h2 className="text-2xl font-bold teal-accent-gradient inline-block section-header">Project Overview</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">{project.overview}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs rounded-md bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
                  <h3 className="text-2xl font-bold teal-accent-gradient inline-block section-header">Project Details</h3>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Start Date</p>
                        <p className="text-gray-900 dark:text-white text-xs">
                          {new Date(project.startDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <RefreshCcw className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
                        <p className="text-gray-900 dark:text-white text-xs">{project.status}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features & Functionality Section */}
          <section id="features" className="mb-16 scroll-mt-24 container mx-auto px-4">
            <h2 className="text-2xl font-bold teal-accent-gradient inline-block section-header">Key Features & Functionality</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {project.features.map((feature: any, index: number) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800 transition-transform hover:-translate-y-1"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={feature.image || "/placeholder.svg"}
                      alt={feature.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Call to Action & Engagement Section */}
          <section className="mb-16 container mx-auto px-4">
            <div className=" card-hover-effect gradient-border animated-gradient-border rounded-xl p-8 text-center text-white shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Explore This Project</h2>
              <p className="max-w-2xl mx-auto mb-6">
                Check out the live demo to see the project in action or explore the source code on GitHub. I welcome any
                feedback or questions about this project!
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 rounded-md bg-white text-purple-700 hover:bg-gray-100 transition-colors"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Live Demo
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 rounded-md bg-purple-700/20 text-white border border-white/30 hover:bg-purple-700/30 transition-colors"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View Source Code
                </a>
              </div>
            </div>
          </section>

          {/* Related Projects */}
          <div className="py-5">
            <section id="related" className="scroll-mt-24 container mx-auto px-4 -mb-36">
              <h2 className="text-2xl font-bold teal-accent-gradient inline-block section-header">Related Projects</h2>
            </section>
            <div className="mx-auto md:mx-24">
              <Projects related={project.categories[0]} id={project._id} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
