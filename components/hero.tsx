"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const roles = [
  "Python Expert",
  "TypeScript Developer",
  "JavaScript Engineer",
  "Backend Specialist",
  "Microservices Engineer",
  "Full-Stack Developer",
  "API Architect",
  "Problem Solver"
];


export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [delta, setDelta] = useState(20)

  useEffect(() => {
    let timer: NodeJS.Timeout
    const currentRole = roles[roleIndex]

    if (!isDeleting && displayText === currentRole) {
      // Pause at full word
      timer = setTimeout(() => {
        setIsDeleting(true)
      }, 2000)
    } else if (isDeleting && displayText === "") {
      // Move to next word
      setIsDeleting(false)
      setRoleIndex((prev) => (prev + 1) % roles.length)
    } else {
      timer = setTimeout(() => {
        setDisplayText((prev) =>
          isDeleting ? prev.substring(0, prev.length - 1) : currentRole.substring(0, prev.length + 1),
        )
      }, delta)
    }

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, roleIndex, delta])

  const scrollToAbout = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    const aboutSection = document.getElementById("about")

    if (aboutSection) {
      const navbarHeight = document.querySelector("header")?.offsetHeight || 0
      const sectionTop = aboutSection.offsetTop - navbarHeight

      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      })
      window.history.pushState(null, "", "#about")
    }
  }

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="hero-gradient absolute inset-0"></div>
        <div className="blob blob-primary blob-1 animate-float"></div>
        <div className="blob blob-gold blob-2 animate-float" style={{ animationDelay: "-2s" }}></div>
      </div>
      <div className="absolute top-20 left-10 hidden lg:block fade-in-left delay-300">
        <div className="terminal-header">
          <div className="terminal-dot terminal-dot-red"></div>
          <div className="terminal-dot terminal-dot-yellow"></div>
          <div className="terminal-dot terminal-dot-green"></div>
        </div>
        <div className="terminal-body w-64">
          <div className="terminal-line">
            <span className="terminal-prompt">$</span>
            <span className="terminal-text">python app.py</span>
          </div>
          <div className="terminal-line">
            <span className="terminal-text">* Running on http://127.0.0.1:5000</span>
          </div>
          <div className="terminal-line">
            <span className="terminal-text">* Environment: production</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-20 right-10 hidden lg:block fade-in-right delay-300">
        <div className="terminal-header">
          <div className="terminal-dot terminal-dot-red"></div>
          <div className="terminal-dot terminal-dot-yellow"></div>
          <div className="terminal-dot terminal-dot-green"></div>
        </div>
        <div className="terminal-body w-64">
          <div className="terminal-line">
            <span className="terminal-prompt">$</span>
            <span className="terminal-text">npm run dev</span>
          </div>
          <div className="terminal-line">
            <span className="terminal-text">ready - started server on 0.0.0.0:3000</span>
          </div>
          <div className="terminal-line">
            <span className="terminal-text">event - compiled successfully</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 flex flex-col items-center text-center z-10 fade-in-up">
        <div className="mb-6 inline-block">
          <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Software Engineer
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-4 relative">
          Hi, I'm <span className="purple-gold-gradient animate-pulse-glow px-3 rounded-sm">Isaiah Ozadhe</span>
        </h1>

        <h2 className="text-2xl md:text-4xl font-bold mb-6 code-bracket">Building modern solutions</h2>

        <div className="h-8 mb-8 font-mono">
          <p className="text-xl md:text-2xl">
            <span className="text-gradient-gold-purple">&gt; </span>
            <span>{displayText}a</span>
            <span
              className={cn("ml-1 inline-block w-2 bg-primary", {
                "animate-blink": !isDeleting,
              })}
            >
              &nbsp;
            </span>
          </p>
        </div>

        <p className="text-lg md:text-xl max-w-2xl mb-10 text-muted-foreground">
        I specialize in building reliable, easy-to-use softwares that solves real-world problems using Python, JavaScript, and TypeScript.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            size="lg"
            className="btn-gradient-primary group relative overflow-hidden text-sm"
            onClick={() => {
              const projectsSection = document.getElementById("projects")
              if (projectsSection) {
                const navbarHeight = document.querySelector("header")?.offsetHeight || 0
                const sectionTop = projectsSection.offsetTop - navbarHeight
                window.scrollTo({
                  top: sectionTop,
                  behavior: "smooth",
                })
                window.history.pushState(null, "", "#projects")
              }
            }}
          >
            View Projects
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="group relative overflow-hidden border-gold hover:border-primary/60 text-sm"
            onClick={() => window.open("/resume.pdf", "_blank")}
          >
            <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
            Download Resume
            <span className="absolute inset-0 w-full h-full bg-gold/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
          </Button>
        </div>
        <div
          className="mt-16 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
          onClick={scrollToAbout}
          aria-label="Scroll to About section"
        >
          <div className="w-8 h-8 rounded-full border-2 border-gold flex items-center justify-center animate-bounce">
            <ArrowRight className="h-4 w-4 rotate-90 text-gold" />
          </div>
        </div>
      </div>
    </div>
  )
}
