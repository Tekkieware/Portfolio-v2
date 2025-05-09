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
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Projects from "@/components/projects"

const projectsData = [
  {
    id: "1",
    title: "E-Commerce Microservices",
    description:
      "A scalable e-commerce platform using microservices architecture with Python FastAPI, Docker, and React.",
    image: "/placeholder.svg?height=600&width=1200",
    status: "Completed",
    client: "Nebula Technologies",
    date: "2023-05-15",
    duration: "4 months",
    technologies: ["Python", "FastAPI", "Docker", "React", "PostgreSQL"],
    categories: ["Web Application", "Developer Tools"],
    githubUrl: "https://github.com/username/ecommerce-microservices",
    liveUrl: "https://ecommerce-microservices.vercel.app",
    overview:
      "Built a scalable e-commerce platform using microservices architecture with Python FastAPI, Docker, and React. The platform includes services for product catalog, user authentication, order processing, payment gateway, and inventory management.",
    features: [
      {
        title: "Microservices Architecture",
        description:
          "Decomposed the application into specialized services: Product Catalog, User Authentication, Order Processing, Payment Gateway, and Inventory Management.",
        image: "/placeholder.svg?height=200&width=400",
      },
      {
        title: "API Gateway",
        description:
          "Centralized entry point for all client requests, handling routing, authentication, and rate limiting.",
        image: "/placeholder.svg?height=200&width=400",
      },
      {
        title: "Event-Driven Communication",
        description:
          "Implemented asynchronous communication between services using RabbitMQ for events like order placement and inventory updates.",
        image: "/placeholder.svg?height=200&width=400",
      },
      {
        title: "Containerized Deployment",
        description: "Docker containers orchestrated with Kubernetes for scalable and resilient deployment.",
        image: "/placeholder.svg?height=200&width=400",
      },
    ],
    stats: {
      commits: 1247,
      contributors: 8,
      stars: 342,
      forks: 87,
    },
    relatedProjects: [
      {
        id: "2",
        title: "Task Management App",
        description: "Full-stack task management application with real-time updates and mobile responsiveness.",
        image: "/placeholder.svg?height=300&width=600",
        technologies: ["TypeScript", "Next.js", "MongoDB", "Tailwind CSS"],
      },
      {
        id: "3",
        title: "Healthcare API Platform",
        description: "RESTful API platform for healthcare data management with Django.",
        image: "/placeholder.svg?height=300&width=600",
        technologies: ["Python", "Django", "Django REST", "PostgreSQL"],
      },
    ],
  },
  {
    id: "2",
    title: "Task Management App",
    description:
      "Full-stack task management application with real-time updates, user authentication, and mobile responsiveness.",
    image: "/placeholder.svg?height=600&width=1200",
    status: "Completed",
    client: "Stellar Solutions",
    date: "2023-01-10",
    duration: "2 months",
    technologies: ["TypeScript", "Next.js", "MongoDB", "Tailwind CSS"],
    categories: ["Web Application", "Productivity"],
    githubUrl: "https://github.com/username/task-management-app",
    liveUrl: "https://task-management-app.vercel.app",
    overview:
      "A modern, real-time task management solution for teams and individuals. The application features interactive kanban boards, real-time collaboration, and task dependencies management.",
    features: [
      {
        title: "Kanban Board",
        description: "Interactive kanban board with customizable columns and drag-and-drop task management.",
        image: "/placeholder.svg?height=200&width=400",
      },
      {
        title: "Real-time Collaboration",
        description: "Live updates when team members create, modify, or complete tasks.",
        image: "/placeholder.svg?height=200&width=400",
      },
      {
        title: "Task Dependencies",
        description: "Define and visualize task dependencies to manage complex workflows and project timelines.",
        image: "/placeholder.svg?height=200&width=400",
      },
      {
        title: "Mobile Responsive",
        description: "Fully responsive design that works seamlessly on desktop, tablet, and mobile devices.",
        image: "/placeholder.svg?height=200&width=400",
      },
    ],
    stats: {
      commits: 856,
      contributors: 3,
      stars: 178,
      forks: 42,
    },
    relatedProjects: [
      {
        id: "1",
        title: "E-Commerce Microservices",
        description: "A scalable e-commerce platform using microservices architecture.",
        image: "/placeholder.svg?height=300&width=600",
        technologies: ["Python", "FastAPI", "Docker", "React"],
      },
      {
        id: "4",
        title: "Mobile Fitness Tracker",
        description: "Cross-platform mobile application for fitness tracking with workout plans.",
        image: "/placeholder.svg?height=300&width=600",
        technologies: ["React Native", "TypeScript", "Firebase", "Redux"],
      },
    ],
  },
  {
    id: "3",
    title: "Healthcare API Platform",
    description:
      "RESTful API platform for healthcare data management with Django, including authentication, authorization, and data validation.",
    image: "/placeholder.svg?height=600&width=1200",
    status: "Completed",
    client: "MediTech Innovations",
    date: "2022-11-05",
    duration: "4 months",
    technologies: ["Python", "Django", "Django REST", "JWT", "PostgreSQL"],
    categories: ["API", "Healthcare"],
    githubUrl: "https://github.com/username/healthcare-api-platform",
    liveUrl: "https://healthcare-api-platform.vercel.app",
    overview:
      "Secure, compliant API infrastructure for healthcare applications. The platform implements FHIR standards for healthcare data exchange and includes comprehensive audit logging for compliance and security.",
    features: [
      {
        title: "FHIR Compliance",
        description:
          "Implementation of Fast Healthcare Interoperability Resources (FHIR) standards for healthcare data exchange.",
        image: "/placeholder.svg?height=200&width=400",
      },
      {
        title: "Role-Based Access Control",
        description:
          "Granular permission system with role-based access control for different types of healthcare providers.",
        image: "/placeholder.svg?height=200&width=400",
      },
      {
        title: "Audit Logging",
        description: "Comprehensive audit logging of all data access and modifications for compliance and security.",
        image: "/placeholder.svg?height=200&width=400",
      },
      {
        title: "Data Validation",
        description: "Robust data validation and sanitization to ensure data integrity and security.",
        image: "/placeholder.svg?height=200&width=400",
      },
    ],
    stats: {
      commits: 1089,
      contributors: 5,
      stars: 215,
      forks: 63,
    },
    relatedProjects: [
      {
        id: "1",
        title: "E-Commerce Microservices",
        description: "A scalable e-commerce platform using microservices architecture.",
        image: "/placeholder.svg?height=300&width=600",
        technologies: ["Python", "FastAPI", "Docker", "React"],
      },
      {
        id: "6",
        title: "Content Management System",
        description: "Headless CMS with a modern admin interface and API-first approach.",
        image: "/placeholder.svg?height=300&width=600",
        technologies: ["TypeScript", "Next.js", "GraphQL", "PostgreSQL"],
      },
    ],
  },
  {
    id: "4",
    title: "Mobile Fitness Tracker",
    description:
      "Cross-platform mobile application for fitness tracking with workout plans, progress monitoring, and social features.",
    image: "/placeholder.svg?height=600&width=1200",
    status: "Completed",
    client: "FitLife Solutions",
    date: "2022-08-20",
    duration: "3 months",
    technologies: ["React Native", "TypeScript", "Firebase", "Redux"],
    categories: ["Mobile Application", "Health & Fitness"],
    githubUrl: "https://github.com/username/mobile-fitness-tracker",
    liveUrl: "https://mobile-fitness-tracker.vercel.app",
    overview:
      "Your personal fitness companion for tracking workouts and achieving goals. The app includes workout tracking, progress analytics, and AI workout recommendations based on user goals and fitness level.",
    features: [
      {
        title: "Workout Tracking",
        description: "Track exercises, sets, reps, and weights with automatic rest timers and personal records.",
        image: "/placeholder.svg?height=200&width=400",
      },
      {
        title: "Progress Analytics",
        description:
          "Visual charts and graphs showing progress over time for different exercises and body measurements.",
        image: "/placeholder.svg?height=200&width=400",
      },
      {
        title: "AI Workout Recommendations",
        description: "Personalized workout recommendations based on goals, available equipment, and fitness level.",
        image: "/placeholder.svg?height=200&width=400",
      },
      {
        title: "Social Features",
        description: "Connect with friends, share achievements, and participate in challenges for added motivation.",
        image: "/placeholder.svg?height=200&width=400",
      },
    ],
    stats: {
      commits: 932,
      contributors: 4,
      stars: 267,
      forks: 71,
    },
    relatedProjects: [
      {
        id: "2",
        title: "Task Management App",
        description: "Full-stack task management application with real-time updates.",
        image: "/placeholder.svg?height=300&width=600",
        technologies: ["TypeScript", "Next.js", "MongoDB", "Tailwind CSS"],
      },
      {
        id: "5",
        title: "Real-time Chat Application",
        description: "Scalable real-time chat application with private messaging and group chats.",
        image: "/placeholder.svg?height=300&width=600",
        technologies: ["JavaScript", "Express", "MongoDB", "Redis"],
      },
    ],
  },
  {
    id: "5",
    title: "Real-time Chat Application",
    description:
      "Scalable real-time chat application with private messaging, group chats, and file sharing capabilities.",
    image: "/placeholder.svg?height=600&width=1200",
    status: "Completed",
    client: "ConnectX",
    date: "2022-05-15",
    duration: "2.5 months",
    technologies: ["JavaScript", "Express", "MongoDB", "Redis"],
    categories: ["Web Application", "Communication"],
    githubUrl: "https://github.com/username/real-time-chat-application",
    liveUrl: "https://real-time-chat-application.vercel.app",
    overview:
      "Secure, feature-rich messaging platform for teams and communities. The application includes real-time messaging, end-to-end encryption, and rich media sharing capabilities.",
    features: [
      {
        title: "Real-time Messaging",
        description: "Instant message delivery with typing indicators, read receipts, and presence status.",
        image: "/placeholder.svg?height=200&width=400",
      },
      {
        title: "End-to-End Encryption",
        description: "Messages encrypted on the client side before transmission, ensuring privacy and security.",
        image: "/placeholder.svg?height=200&width=400",
      },
      {
        title: "Rich Media Sharing",
        description: "Share images, videos, documents, and code snippets with preview capabilities.",
        image: "/placeholder.svg?height=200&width=400",
      },
      {
        title: "Group Chats & Channels",
        description: "Create and manage group conversations with customizable permissions and notifications.",
        image: "/placeholder.svg?height=200&width=400",
      },
    ],
    stats: {
      commits: 768,
      contributors: 6,
      stars: 312,
      forks: 84,
    },
    relatedProjects: [
      {
        id: "4",
        title: "Mobile Fitness Tracker",
        description: "Cross-platform mobile application for fitness tracking with workout plans.",
        image: "/placeholder.svg?height=300&width=600",
        technologies: ["React Native", "TypeScript", "Firebase", "Redux"],
      },
      {
        id: "6",
        title: "Content Management System",
        description: "Headless CMS with a modern admin interface and API-first approach.",
        image: "/placeholder.svg?height=300&width=600",
        technologies: ["TypeScript", "Next.js", "GraphQL", "PostgreSQL"],
      },
    ],
  },
  {
    id: "6",
    title: "Content Management System",
    description:
      "Headless CMS with a modern admin interface, content modeling, and API-first approach for multi-platform publishing.",
    image: "/placeholder.svg?height=600&width=1200",
    status: "Completed",
    client: "PublishPro",
    date: "2022-02-10",
    duration: "5 months",
    technologies: ["TypeScript", "Next.js", "GraphQL", "PostgreSQL"],
    categories: ["Web Application", "Content Management"],
    githubUrl: "https://github.com/username/content-management-system",
    liveUrl: "https://content-management-system.vercel.app",
    overview:
      "A flexible, API-first content management system for modern digital experiences. The CMS includes flexible content modeling, a powerful GraphQL API, and a modern block-based editor.",
    features: [
      {
        title: "Content Modeling",
        description:
          "Flexible content modeling system allowing users to define custom content types and relationships.",
        image: "/placeholder.svg?height=200&width=400",
      },
      {
        title: "GraphQL API",
        description:
          "Powerful GraphQL API with filtering, pagination, and nested queries for efficient content delivery.",
        image: "/placeholder.svg?height=200&width=400",
      },
      {
        title: "WYSIWYG Editor",
        description:
          "Modern block-based editor with support for rich media, custom components, and collaborative editing.",
        image: "/placeholder.svg?height=200&width=400",
      },
      {
        title: "Multi-platform Publishing",
        description: "Publish content to multiple platforms and channels from a single source of truth.",
        image: "/placeholder.svg?height=200&width=400",
      },
    ],
    stats: {
      commits: 1356,
      contributors: 7,
      stars: 389,
      forks: 92,
    },
    relatedProjects: [
      {
        id: "3",
        title: "Healthcare API Platform",
        description: "RESTful API platform for healthcare data management with Django.",
        image: "/placeholder.svg?height=300&width=600",
        technologies: ["Python", "Django", "Django REST", "PostgreSQL"],
      },
      {
        id: "5",
        title: "Real-time Chat Application",
        description: "Scalable real-time chat application with private messaging and group chats.",
        image: "/placeholder.svg?height=300&width=600",
        technologies: ["JavaScript", "Express", "MongoDB", "Redis"],
      },
    ],
  },
]


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
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})
  const { id } = React.use(params)

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const handleBack = () => {
    router.push("/#projects")
  }

  // Find the project data based on the ID
  useEffect(() => {
    try {
      const projectId = id
      console.log("Looking for project with ID:", projectId)

      const foundProject = projectsData.find((p) => p.id === projectId)
      console.log("Project found:", foundProject)

      if (foundProject) {
        setProject(foundProject)
      } else {
        console.log("Project not found, redirecting to projects section")
        router.push("/#projects")
      }

      setLoading(false)
    } catch (error) {
      console.error("Error in project detail:", error)
      setLoading(false)
    }
  }, [params, router])

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Loading project details...</p>
        </div>
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 mt-10">
      <main>
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <div className="mb-8">
            <button
              onClick={handleBack}
              className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
            >
              <ArrowLeft size={18} />
              <span className="ml-1 font-medium">Back</span>
            </button>
          </div>

          {/* Hero Section */}
          <section className="relative rounded-xl overflow-hidden mb-12 shadow-lg">
            <div className="relative h-[400px] w-full">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-2 mb-3">
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
              <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">{project.title}</h1>
              <p className="max-w-2xl text-gray-200 mb-6">{project.description}</p>

              <div className="flex flex-wrap gap-4">
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
                  className="inline-flex items-center px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View Source Code
                </a>
              </div>
            </div>
          </section>

          {/* Project Overview Section */}
          <section id="overview" className="mb-16 scroll-mt-24">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="md:col-span-2">
                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Project Overview</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">{project.overview}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm rounded-md bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Project Details</h3>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Completion Date</p>
                        <p className="text-gray-900 dark:text-white">
                          {new Date(project.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Client</p>
                        <p className="text-gray-900 dark:text-white">{project.client}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
                        <p className="text-gray-900 dark:text-white">{project.duration}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Stats */}
                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Project Statistics</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 text-center">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {project.stats.commits}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Commits</div>
                    </div>
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 text-center">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {project.stats.contributors}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Contributors</div>
                    </div>
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 text-center">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {project.stats.stars}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Stars</div>
                    </div>
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 text-center">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {project.stats.forks}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Forks</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features & Functionality Section */}
          <section id="features" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Key Features & Functionality</h2>
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
          <section className="mb-16">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 dark:from-purple-700 dark:to-indigo-800 rounded-xl p-8 text-center text-white shadow-lg">
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
          <section id="related" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Related Projects</h2>
            <Projects />
          </section>
        </div>
      </main>
    </div>
  )
}
