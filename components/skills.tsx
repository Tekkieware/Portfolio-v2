"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Server, Database, Globe, Laptop, Layers, Book } from "lucide-react"

const skillCategories = [
  {
    id: "languages",
    name: "Languages",
    icon: <Code className="h-5 w-5" />,
    skills: [
      { name: "Python", level: 90, icon: <Code className="h-5 w-5 text-primary" /> },
      { name: "JavaScript", level: 90, icon: <Code className="h-5 w-5 text-primary" /> },
      { name: "TypeScript", level: 85, icon: <Code className="h-5 w-5 text-primary" /> },
      { name: "HTML/CSS", level: 100, icon: <Code className="h-5 w-5 text-primary" /> },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    icon: <Server className="h-5 w-5" />,
    skills: [
      { name: "Django", level: 90, icon: <Server className="h-5 w-5 text-primary" /> },
      { name: "Flask", level: 90, icon: <Server className="h-5 w-5 text-primary" /> },
      { name: "FastAPI", level: 70, icon: <Server className="h-5 w-5 text-primary" /> },
    ],
  },
  {
    id: "frontend",
    name: "Frontend",
    icon: <Globe className="h-5 w-5" />,
    skills: [
      { name: "React", level: 90, icon: <Globe className="h-5 w-5 text-primary" /> },
      { name: "Next.js", level: 90, icon: <Globe className="h-5 w-5 text-primary" /> },
      { name: "React Native", level: 60, icon: <Globe className="h-5 w-5 text-primary" /> },
      { name: "Tailwind CSS", level: 100, icon: <Globe className="h-5 w-5 text-primary" /> },
    ],
  },
  {
    id: "database",
    name: "Database",
    icon: <Database className="h-5 w-5" />,
    skills: [
      { name: "PostgreSQL", level: 60, icon: <Database className="h-5 w-5 text-primary" /> },
      { name: "MongoDB", level: 90, icon: <Database className="h-5 w-5 text-primary" /> },
      { name: "MySQL", level: 80, icon: <Database className="h-5 w-5 text-primary" /> },
      { name: "SQLite", level: 100, icon: <Database className="h-5 w-5 text-primary" /> },
    ],
  },
  {
    id: "devops",
    name: "DevOps",
    icon: <Laptop className="h-5 w-5" />,
    skills: [
      { name: "Docker", level: 80, icon: <Laptop className="h-5 w-5 text-primary" /> },
      { name: "Docker Compose", level: 80, icon: <Laptop className="h-5 w-5 text-primary" /> },
      { name: "Kubernetes", level: 50, icon: <Laptop className="h-5 w-5 text-primary" /> },
      { name: "Bitbucket Pipelines", level: 80, icon: <Laptop className="h-5 w-5 text-primary" /> },
      { name: "CI/CD", level: 70, icon: <Laptop className="h-5 w-5 text-primary" /> },
      {
        name: "Monitoring & Observability",
        level: 70,
        icon: <Laptop className="h-5 w-5 text-primary" />
      },
      { name: "Coolify", level: 80, icon: <Laptop className="h-5 w-5 text-primary" /> },


    ],
  },
  {
    id: "architecture",
    name: "Architecture",
    icon: <Layers className="h-5 w-5" />,
    skills: [
      { name: "Microservices", level: 80, icon: <Layers className="h-5 w-5 text-primary" /> },
      { name: "RESTful APIs", level: 90, icon: <Layers className="h-5 w-5 text-primary" /> },
      { name: "Event-Driven Architecture", level: 75, icon: <Layers className="h-5 w-5 text-primary" /> },
      { name: "Monolithic Architecture", level: 90, icon: <Layers className="h-5 w-5 text-primary" /> },
      { name: "Message Queues", level: 75, icon: <Layers className="h-5 w-5 text-primary" /> },
      { name: "API Gateway", level: 80, icon: <Layers className="h-5 w-5 text-primary" /> },
      { name: "Technical Documentation & Design", level: 75, icon: <Book className="h-5 w-5 text-primary" /> }
    ]


  },
]

export default function Skills() {
  const [viewMode, setViewMode] = useState("bars")
  const [activeTab, setActiveTab] = useState("languages")
  const [animationKey, setAnimationKey] = useState(0)
  const [hasScrolled, setHasScrolled] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  // Reset animation state when tab or view mode changes
  useEffect(() => {
    setAnimationKey((prev) => prev + 1)
  }, [activeTab, viewMode])

  // Handle scroll animations
  useEffect(() => {
    const handleScroll = () => {
      const animatedElements = document.querySelectorAll(
        ".fade-in-up, .fade-in-left, .fade-in-right, .fade-in, .zoom-in",
      )

      animatedElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top
        const windowHeight = window.innerHeight

        if (elementTop < windowHeight * 0.85) {
          element.classList.add("appear")
        }
      })

      // Check if content is in view
      if (contentRef.current) {
        const rect = contentRef.current.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.85) {
          setHasScrolled(true)
        }
      }
    }

    // Run once immediately to show elements in the viewport
    handleScroll()

    // Add scroll listener
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="container mx-auto px-4 relative">
      {/* Background decorative elements */}
      <div className="blob blob-primary blob-3 opacity-20"></div>

      <div className="flex flex-col items-center mb-16">
        <h2 className="text-3xl font-bold text-center mb-6 relative inline-block section-header fade-in-up purple-gold-gradient">Skills</h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl fade-in-up delay-100">
          My technical expertise spans across various programming languages, frameworks, and tools for building modern
          web and mobile applications.
        </p>
        <div className="flex space-x-2 fade-in-up delay-200">
          <button
            onClick={() => setViewMode("bars")}
            className={`px-4 py-2 rounded-md text-xs transition-all duration-300 ${viewMode === "bars" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
              }`}
          >
            Progress Bars
          </button>
          <button
            onClick={() => setViewMode("icons")}
            className={`px-4 py-2 rounded-md text-xs transition-all duration-300 ${viewMode === "icons" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
              }`}
          >
            Icons View
          </button>
        </div>
      </div>

      <div className="w-full">
        <div className="grid grid-cols-3 md:grid-cols-6 mb-8 fade-in-up delay-300 bg-muted rounded-md p-1">
          {skillCategories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`flex items-center text-md justify-center gap-2 transition-all duration-300 py-2 px-3 rounded-md ${activeTab === category.id
                ? `${index % 4 === 0
                  ? "tab-gradient-active"
                  : index % 4 === 1
                    ? "tab-gradient-gold-active"
                    : "tab-gradient-teal-active"
                } text-foreground`
                : "hover:bg-muted/80 text-foreground"
                }`}
            >
              {category.icon}
              <span className="hidden md:inline">{category.name}</span>
            </button>
          ))}
        </div>

        <div className="mt-8" ref={contentRef}>
          {skillCategories.map((category) => (
            <div key={`${category.id}-${animationKey}`} className={activeTab === category.id ? "block" : "hidden"}>
              {viewMode === "bars" ? (
                <div className="space-y-6">
                  {category.skills.map((skill, index) => (
                    <div
                      key={`${skill.name}-${animationKey}`}
                      className={`space-y-2 fade-in-up ${hasScrolled || animationKey > 0 ? "appear" : ""}`}
                      style={{
                        transitionDelay: `${100 + index * 50}ms`,
                        animationDelay: `${100 + index * 50}ms`,
                      }}
                    >
                      <div className="flex justify-between">
                        <span className=" text-sm">{skill.name}</span>
                        <span className="text-muted-foreground text-sm">{skill.level}%</span>
                      </div>
                      <div className="animated-progress">
                        <div
                          className={`animated-progress-bar ${index % 4 === 0
                            ? "progress-gradient-primary"
                            : index % 4 === 1
                              ? "progress-gradient-gold"
                              : index % 4 === 2
                                ? "progress-gradient-teal"
                                : "progress-gradient-coral"
                            }`}
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {category.skills.map((skill, index) => (
                    <Card
                      key={`${skill.name}-${animationKey}`}
                      className={`${index % 4 === 0
                        ? "gradient-border"
                        : index % 4 === 1
                          ? "gold-border"
                          : index % 4 === 2
                            ? "teal-border"
                            : "coral-border"
                        } transition-colors card-hover-effect zoom-in ${hasScrolled || animationKey > 0 ? "appear" : ""}`}
                      style={{
                        transitionDelay: `${100 + index * 50}ms`,
                        animationDelay: `${100 + index * 50}ms`,
                      }}
                    >
                      <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 skill-icon ${index % 4 === 0
                            ? ""
                            : index % 4 === 1
                              ? "skill-icon-gold"
                              : index % 4 === 2
                                ? "skill-icon-teal"
                                : "skill-icon-coral"
                            }`}
                          style={{
                            background:
                              index % 4 === 0
                                ? "rgba(91, 33, 182, 0.1)"
                                : index % 4 === 1
                                  ? "hsla(var(--gold), 0.1)"
                                  : index % 4 === 2
                                    ? "hsla(var(--teal), 0.1)"
                                    : "hsla(var(--coral), 0.1)",
                          }}
                        >
                          {skill.icon}
                        </div>
                        <span className="text-sm font-medium">{skill.name}</span>
                        <div className="w-full bg-muted/50 h-1.5 rounded-full mt-2">
                          <div
                            className={`h-full rounded-full ${index % 4 === 0
                              ? "progress-gradient-primary"
                              : index % 4 === 1
                                ? "progress-gradient-gold"
                                : index % 4 === 2
                                  ? "progress-gradient-teal"
                                  : "progress-gradient-coral"
                              }`}
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
