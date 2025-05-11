"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const projects = [
  {
    title: "E-Commerce Microservices",
    description:
      "Built a scalable e-commerce platform using microservices architecture with Python FastAPI, Docker, and React.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Python", "FastAPI", "Docker", "React", "PostgreSQL"],
    github: "https://github.com",
    demo: "https://example.com",
    category: "🌐 Web App",
    color: "primary",
  },
  {
    title: "Task Management App",
    description:
      "Full-stack task management application with real-time updates, user authentication, and mobile responsiveness.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["TypeScript", "Next.js", "MongoDB", "Tailwind CSS"],
    github: "https://github.com",
    demo: "https://example.com",
    category: "📱 Mobile",
    color: "gold",
  },
  {
    title: "Healthcare API Platform",
    description:
      "RESTful API platform for healthcare data management with Django, including authentication, authorization, and data validation.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Python", "Django", "Django REST", "JWT", "PostgreSQL"],
    github: "https://github.com",
    demo: "https://example.com",
    category: "🏥 Healthcare",
    color: "teal",
  },
  {
    title: "Mobile Fitness Tracker",
    description:
      "Cross-platform mobile application for fitness tracking with workout plans, progress monitoring, and social features.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React Native", "TypeScript", "Firebase", "Redux"],
    github: "https://github.com",
    demo: "https://example.com",
    category: "💪 Fitness",
    color: "coral",
  },
  {
    title: "Real-time Chat Application",
    description:
      "Scalable real-time chat application with private messaging, group chats, and file sharing capabilities.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["JavaScript", "Socket.io", "Express", "MongoDB"],
    github: "https://github.com",
    demo: "https://example.com",
    category: "💬 Communication",
    color: "lavender",
  },
  {
    title: "Content Management System",
    description:
      "Headless CMS with a modern admin interface, content modeling, and API-first approach for multi-platform publishing.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["TypeScript", "Next.js", "GraphQL", "PostgreSQL"],
    github: "https://github.com",
    demo: "https://example.com",
    category: "📝 CMS",
    color: "primary",
  },
]

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const activeCardRef = useRef<HTMLDivElement>(null)
  const touchStartYRef = useRef<number | null>(null)
  const touchMoveYRef = useRef<number | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [viewMode, setViewMode] = useState("slider")

  // Handle window resize to determine device type
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767)
      setIsTablet(window.innerWidth >= 768 && window.innerWidth <= 1023)
    }

    handleResize() // Initial check
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev()
      } else if (e.key === "ArrowRight") {
        handleNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isTransitioning])

  const handlePrev = () => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setActiveIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1))

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false)
    }, 700) // Slightly longer than the transition duration
  }

  const handleNext = () => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setActiveIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1))

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false)
    }, 700) // Slightly longer than the transition duration
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current || isTransitioning) return

    setIsDragging(true)
    setStartX(e.pageX - carouselRef.current.offsetLeft)
    setScrollLeft(carouselRef.current.scrollLeft)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current || isTransitioning) return

    e.preventDefault() // Prevent default behavior

    const x = e.pageX - carouselRef.current.offsetLeft
    const walk = (x - startX) * 2 // Scroll speed multiplier

    // Determine direction of drag
    if (walk > 50) {
      // Dragging right, go to previous
      handlePrev()
      setIsDragging(false)
    } else if (walk < -50) {
      // Dragging left, go to next
      handleNext()
      setIsDragging(false)
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!carouselRef.current || isTransitioning) return

    setIsDragging(true)
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft)
    setScrollLeft(carouselRef.current.scrollLeft)

    // Store the initial Y position to detect vertical scrolling
    touchStartYRef.current = e.touches[0].pageY
    touchMoveYRef.current = null
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !carouselRef.current || isTransitioning) return

    // Store current Y position
    touchMoveYRef.current = e.touches[0].pageY

    // Calculate vertical scroll distance
    const verticalScroll =
      touchStartYRef.current !== null && touchMoveYRef.current !== null
        ? Math.abs(touchMoveYRef.current - touchStartYRef.current)
        : 0

    const x = e.touches[0].pageX - carouselRef.current.offsetLeft
    const walk = x - startX

    // If vertical scrolling is significant, don't prevent default
    // This allows normal page scrolling when swiping vertically
    if (verticalScroll > 10) {
      return
    }

    // Only prevent default for horizontal swipes
    if (Math.abs(walk) > 10) {
      e.preventDefault()
    }

    // Determine direction of swipe - use a lower threshold for better responsiveness
    if (walk > 30) {
      // Swiping right, go to previous
      handlePrev()
      setIsDragging(false)
    } else if (walk < -30) {
      // Swiping left, go to next
      handleNext()
      setIsDragging(false)
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    touchStartYRef.current = null
    touchMoveYRef.current = null
  }

  // Handle parallax effect on active card
  const handleMouseMoveParallax = (e: React.MouseEvent) => {
    if (!activeCardRef.current || !isHovering) return

    const rect = activeCardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Calculate position relative to the center of the card
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Calculate the offset from center (normalized from -1 to 1)
    const offsetX = (x - centerX) / centerX
    const offsetY = (y - centerY) / centerY

    setMousePosition({ x: offsetX, y: offsetY })
  }

  // Get card color based on index
  const getCardColor = (index: number, color: string) => {
    return color
  }

  // Get card border glow class
  const getCardGlowClass = (color: string) => {
    switch (color) {
      case "primary":
        return "shadow-[0_0_15px_rgba(91,33,182,0.5)]"
      case "gold":
        return "shadow-[0_0_15px_rgba(255,215,0,0.5)]"
      case "teal":
        return "shadow-[0_0_15px_rgba(0,128,128,0.5)]"
      case "coral":
        return "shadow-[0_0_15px_rgba(255,127,80,0.5)]"
      case "lavender":
        return "shadow-[0_0_15px_rgba(230,230,250,0.5)]"
      default:
        return "shadow-[0_0_15px_rgba(91,33,182,0.5)]"
    }
  }

  // Get card width based on whether it's active and screen size
  const getCardWidth = (isActive: boolean) => {
    if (isMobile) {
      return isActive ? "90%" : "0%"
    } else if (isTablet) {
      return isActive ? "50%" : "25%"
    } else {
      return isActive ? "40%" : "30%"
    }
  }

  return (
    <div className="projects-container mx-auto px-4 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900/20 -z-10 rounded-xl"></div>
      <div className="blob blob-primary blob-3 opacity-20 -z-10"></div>

      <div className="flex w-full justify-center">
        <h2 className="text-3xl font-bold text-center mb-6 relative inline-block section-header fade-in-up purple-gold-gradient">Projects</h2>
      </div>

      <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto fade-in-up delay-100">
        Here are some of my recent projects that showcase my expertise in Python, JavaScript/TypeScript, and modern web
        development frameworks.
      </p>

      <div className="relative mb-16">
        {/* Enhanced Navigation buttons with frosted glass effect - positioned at bottom on mobile */}
        {isMobile ? (
          <div className="absolute bottom-12 left-0 right-0 flex justify-center items-center gap-4 mt-8 pt-4 z-20">
            <button
              onClick={handlePrev}
              aria-label="Previous project"
              className="flex items-center px-4 py-2 rounded-full bg-gold text-white font-bold shadow-md border border-gray-200 transition-all duration-500 hover:shadow-lg disabled:opacity-50"
              disabled={isTransitioning}
            >
              <div className="flex items-center justify-center w-12 h-6 bg-white rounded-full mr-1 -ml-1 gap-1">

                <svg className=" bg-gold rounded-full" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11 17L6 12L11 7"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18 17L13 12L18 7"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className=" text-gold text-[10px]">{activeIndex + 1} / {projects.length}</p>
              </div>
              PREV
            </button>

            <button
              onClick={handleNext}
              aria-label="Next project"
              className="flex items-center px-4 py-2 rounded-full bg-primary text-white font-bold shadow-md border border-gray-200 transition-all duration-500 hover:shadow-lg disabled:opacity-50"
              disabled={isTransitioning}
            >
              NEXT
              <div className="flex items-center justify-center w-12 h-6 bg-white rounded-full ml-1 -mr-1 gap-1">
                <p className=" text-primary text-[10px]">{activeIndex + 1} / {projects.length}</p>
                <svg className=" bg-primary rounded-full" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13 7L18 12L13 17"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 7L11 12L6 17"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
          </div>
        ) : (
          <>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20">
              <button
                onClick={handlePrev}
                aria-label="Previous project"
                className="flex gap-2 items-center px-4 py-2 rounded-full bg-gold text-white font-bold shadow-md border border-gray-200 transition-all duration-500 hover:bg-gold/70 hover:shadow-lg disabled:opacity-50"
                disabled={isTransitioning}
              >
                <div className="flex items-center justify-center w-12 h-6 bg-white rounded-full mr-1 -ml-1 gap-1">

                  <svg className=" bg-gold rounded-full" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M11 17L6 12L11 7"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18 17L13 12L18 7"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className=" text-gold text-[10px]">{activeIndex + 1} / {projects.length}</p>
                </div>
                PREV
              </button>
            </div>

            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
              <button
                onClick={handleNext}
                aria-label="Next project"
                className="flex gap-2 items-center px-4 text-sm py-2 text-white rounded-full font-bold shadow-md border border-gray-200 transition-all duration-500 bg-primary hover:bg-primary/70 hover:shadow-lg disabled:opacity-50"
                disabled={isTransitioning}
              >
                NEXT
                <div className="flex items-center justify-center w-12 h-6 bg-white rounded-full ml-1 -mr-1 gap-1">
                  <p className=" text-primary text-[10px]">{activeIndex + 1} / {projects.length}</p>
                  <svg className=" bg-primary rounded-full" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M13 7L18 12L13 17"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 7L11 12L6 17"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </>
        )}

        {/* Carousel container with perspective for 3D effect */}
        <div
          ref={carouselRef}
          className="overflow-hidden relative perspective-1000"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => {
            handleMouseUp()
            setIsHovering(false)
          }}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex justify-center py-8 transition-all duration-700 ease-out transform-style-3d"
            style={{
              gap: "16px",
            }}
          >
            {projects.map((project, index) => {
              // Calculate the distance from active index (considering circular navigation)
              const distance = Math.min(
                Math.abs(index - activeIndex),
                Math.abs(index - activeIndex - projects.length),
                Math.abs(index - activeIndex + projects.length),
              )

              // Determine if this card is the active one
              const isActive = distance === 0

              // Determine if this card should be visible based on screen size
              // On mobile: only show active card
              // On larger screens: show active card and one card on each side
              const isVisible = isMobile ? distance === 0 : distance <= 1

              if (!isVisible) return null

              const cardColor = getCardColor(index, project.color)
              const glowClass = getCardGlowClass(cardColor)
              const cardWidth = getCardWidth(isActive)

              // Calculate the position of the card
              // Active card should be in the center
              // Previous card should be to the left
              // Next card should be to the right
              let position = 0
              if (!isActive) {
                position = index < activeIndex ? -1 : 1
                // Handle wrap-around cases
                if (activeIndex === 0 && index === projects.length - 1) position = -1
                if (activeIndex === projects.length - 1 && index === 0) position = 1
              }

              // Calculate 3D rotation for inactive cards
              const rotateY = position * 15 // 15 degrees rotation for side cards
              const translateZ = isActive ? 0 : -50 // Push inactive cards back in 3D space
              const blur = isActive ? 0 : 1 // Blur for inactive cards

              // Calculate parallax effect for active card
              const parallaxX = isActive && isHovering ? mousePosition.x * 10 : 0
              const parallaxY = isActive && isHovering ? mousePosition.y * 5 : 0

              return (
                
                  <div
                    key={index}
                    ref={isActive ? activeCardRef : null}
                    className={cn("transition-all duration-700 ease-out flex-shrink-0", isActive ? "z-10" : "z-0")}
                    style={{
                      width: cardWidth,
                      transform: `
                      scale(${isActive ? 1.05 : 0.95}) 
                      rotateY(${rotateY}deg) 
                      translateZ(${translateZ}px)
                      ${isActive ? `translate(${parallaxX}px, ${parallaxY}px)` : ""}
                    `,
                      opacity: isActive ? 1 : 0.7,
                      transition: "all 0.7s cubic-bezier(0.25, 0.1, 0.25, 1)",
                      order: position, // Use flexbox order to position cards
                      filter: `blur(${blur}px)`,
                    }}
                    onMouseEnter={() => isActive && setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    onMouseMove={isActive ? handleMouseMoveParallax : undefined}
                  >
                    <Link href="/projects/1">
                    <Card
                      className={cn(
                        "overflow-hidden h-full transition-all duration-700",
                        isActive ? glowClass : "shadow-md",
                        isActive ? "border-2" : "border",
                        // Add border radius to outer edges of inactive cards
                        !isActive && position === -1 ? "rounded-l-2xl" : "",
                        !isActive && position === 1 ? "rounded-r-2xl" : "",
                        cardColor === "primary"
                          ? "border-primary/50"
                          : cardColor === "gold"
                            ? "border-gold/50"
                            : cardColor === "teal"
                              ? "border-teal/50"
                              : cardColor === "coral"
                                ? "border-coral/50"
                                : "border-lavender/50",
                      )}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10"></div>
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                          style={{
                            transform:
                              isActive && isHovering
                                ? `translate(${mousePosition.x * -5}px, ${mousePosition.y * -5}px)`
                                : "",
                            transition: isHovering ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
                          }}
                        />
                        <div className="absolute top-3 left-3 z-20">
                          <Badge
                            className={cn(
                              "text-xs px-3 py-1",
                              cardColor === "primary"
                                ? "bg-primary text-white"
                                : cardColor === "gold"
                                  ? "bg-gold text-black"
                                  : cardColor === "teal"
                                    ? "bg-teal text-white"
                                    : cardColor === "coral"
                                      ? "bg-coral text-white"
                                      : "bg-lavender text-black",
                            )}
                          >
                            {project.category}
                          </Badge>
                        </div>
                      </div>

                      <CardHeader className="pb-2">
                        <CardTitle
                          className={cn(
                            "line-clamp-1",
                            cardColor === "primary"
                              ? "text-primary"
                              : cardColor === "gold"
                                ? "text-gold"
                                : cardColor === "teal"
                                  ? "text-teal"
                                  : cardColor === "coral"
                                    ? "text-coral"
                                    : "text-lavender",
                          )}
                        >
                          {project.title}
                        </CardTitle>
                        <CardDescription className={isActive ? "" : "line-clamp-2"}>
                          {project.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, isActive ? 5 : 3).map((tag, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className={cn(
                                "text-xs",
                                cardColor === "primary"
                                  ? "border-primary/50 text-primary"
                                  : cardColor === "gold"
                                    ? "border-gold/50 text-gold"
                                    : cardColor === "teal"
                                      ? "border-teal/50 text-teal"
                                      : cardColor === "coral"
                                        ? "border-coral/50 text-coral"
                                        : "border-lavender/50 text-lavender",
                              )}
                            >
                              {tag}
                            </Badge>
                          ))}
                          {!isActive && project.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{project.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      </CardContent>

                      {isActive && (
                        <CardFooter className="flex justify-between">
                          <Button
                            variant="outline"
                            size="sm"
                            className="group"
                            onClick={() => window.open(project.github, "_blank", "noopener,noreferrer")}
                          >
                            <Github className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
                            GitHub
                          </Button>
                          <Button
                            size="sm"
                            className={cn(
                              "group relative overflow-hidden",
                              cardColor === "primary"
                                ? "bg-primary hover:bg-primary/90 text-white"
                                : cardColor === "gold"
                                  ? "bg-gold hover:bg-gold/90 text-black"
                                  : cardColor === "teal"
                                    ? "bg-teal hover:bg-teal/90 text-white"
                                    : cardColor === "coral"
                                      ? "bg-coral hover:bg-coral/90 text-white"
                                      : "bg-lavender hover:bg-lavender/90 text-black",
                            )}
                            onClick={() => window.open(project.demo, "_blank", "noopener,noreferrer")}
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Live Demo
                          </Button>
                        </CardFooter>
                      )}
                    </Card>
                    </Link>
                  </div>
              )
            })}
          </div>
        </div>

        {/* Pagination dots - added more bottom margin on mobile */}
        <div className={`flex justify-center gap-2 ${isMobile ? "mt-20 pb-6" : "mt-6"}`}>
          {projects.map((project, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all relative group",
                index === activeIndex
                  ? `bg-${project.color} w-6`
                  : "bg-gray-400 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-500",
              )}
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true)
                  setActiveIndex(index)
                  setTimeout(() => {
                    setIsTransitioning(false)
                  }, 700)
                }
              }}
              aria-label={`Go to project ${index + 1}: ${project.title}`}
              title={project.title}
              disabled={isTransitioning}
              onTouchStart={() => {
                // Show tooltip on touch devices
                const tooltip = document.getElementById(`tooltip-${index}`)
                if (tooltip) tooltip.style.opacity = "1"
              }}
              onTouchEnd={() => {
                // Hide tooltip after touch
                setTimeout(() => {
                  const tooltip = document.getElementById(`tooltip-${index}`)
                  if (tooltip) tooltip.style.opacity = "0"
                }, 1500)
              }}
            >
              <span
                id={`tooltip-${index}`}
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 px-2 py-1 bg-background/90 dark:bg-gray-800/90 text-xs rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-10"
              >
                {project.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
