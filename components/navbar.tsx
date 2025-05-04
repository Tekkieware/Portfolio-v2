"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { ModeToggle } from "./mode-toggle"
import { cn } from "@/lib/utils"
import Logo from "./logo"

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>, sectionId: string) => {
    e.preventDefault()
    const section = document.getElementById(sectionId)

    if (section) {
      const navbarHeight = document.querySelector("header")?.offsetHeight || 0
      const sectionTop = section.offsetTop - navbarHeight

      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      })
      setMobileMenuOpen(false)
      window.history.pushState(null, "", `#${sectionId}`)
      setActiveSection(sectionId)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
      const sections = navLinks.map((link) => link.href.substring(1))
      const scrollPosition = window.scrollY + window.innerHeight / 2
      let currentSection = sections[0]
      let maxVisibleHeight = 0

      sections.forEach((sectionId) => {
        const section = document.getElementById(sectionId)
        if (section) {
          const rect = section.getBoundingClientRect()
          const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)

          if (visibleHeight > maxVisibleHeight && visibleHeight > 0) {
            maxVisibleHeight = visibleHeight
            currentSection = sectionId
          }
        }
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const hash = window.location.hash.substring(1)
    if (hash) {
      const section = document.getElementById(hash)
      if (section) {
        const navbarHeight = document.querySelector("header")?.offsetHeight || 0
        const sectionTop = section.offsetTop - navbarHeight
        setTimeout(() => {
          window.scrollTo({
            top: sectionTop,
            behavior: "smooth",
          })
          setActiveSection(hash)
        }, 100)
      }
    }
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16">
      <div
        className={cn(
          "w-full h-full transition-all duration-300",
          isScrolled ? "bg-gray-50/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm" : "bg-transparent",
        )}
      >
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, "home")}
            className="text-xl font-bold tracking-wider flex items-center"
          >
            <Logo />
          </a>
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href.substring(1))}
                className={cn(
                  "text-sm font-medium transition-colors relative py-2",
                  activeSection === link.href.substring(1) ? "text-primary" : "hover:text-primary",
                )}
              >
                {link.name}
                {activeSection === link.href.substring(1) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"></span>
                )}
              </a>
            ))}
            <ModeToggle />
          </nav>
          <div className="flex items-center md:hidden">
            <ModeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="relative w-10 h-10 ml-2 flex items-center justify-center focus:outline-none group"
            >
              <div className="relative flex flex-col justify-center items-center w-6 h-6">
                <span
                  className={`hamburger-line origin-center transition-all duration-500 ease-in-out ${
                    mobileMenuOpen ? "w-7 translate-y-1.5 rotate-45 bg-primary" : "w-6 bg-gray-900 dark:bg-gray-100"
                  }`}
                ></span>
                <span
                  className={`hamburger-line my-1 transition-all duration-300 ease-in-out ${
                    mobileMenuOpen ? "w-0 opacity-0 scale-0" : "w-6 opacity-100 scale-100 bg-gray-900 dark:bg-gray-100"
                  }`}
                ></span>
                <span
                  className={`hamburger-line origin-center transition-all duration-500 ease-in-out ${
                    mobileMenuOpen ? "w-7 -translate-y-1.5 -rotate-45 bg-primary" : "w-6 bg-gray-900 dark:bg-gray-100"
                  }`}
                ></span>
              </div>
              <div className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300 scale-0 group-hover:scale-100"></div>
            </button>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-300 ease-in-out",
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
      >
        <div
          className="absolute inset-0 bg-gray-50/95 dark:bg-gray-900/95 backdrop-blur-md"
          onClick={() => setMobileMenuOpen(false)}
        ></div>

        {mobileMenuOpen && (
          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
            className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center focus:outline-none group"
          >
            <div className="relative flex flex-col justify-center items-center w-6 h-6">
              <span className="hamburger-line w-7 translate-y-1.5 rotate-45 bg-primary origin-center transition-all duration-500 ease-in-out"></span>
              <span className="hamburger-line my-1 w-0 opacity-0 scale-0 transition-all duration-300 ease-in-out"></span>
              <span className="hamburger-line w-7 -translate-y-1.5 -rotate-45 bg-primary origin-center transition-all duration-500 ease-in-out"></span>
            </div>
            <div className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300 scale-0 group-hover:scale-100"></div>
          </button>
        )}

        <nav
          className={cn(
            "absolute top-0 right-0 bottom-0 w-full bg-gray-50 dark:bg-gray-900 shadow-xl pt-16 transition-all duration-500 ease-in-out transform",
            mobileMenuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex flex-col space-y-1 p-6 h-full overflow-y-auto">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href.substring(1))}
                className={cn(
                  "mobile-menu-item text-xl font-medium py-4 px-4 rounded-md transition-all duration-300",
                  "hover:bg-primary/10 hover:text-primary hover:translate-x-1 hover:scale-105",
                  "border-l-4 border-transparent",
                  activeSection === link.href.substring(1)
                    ? "text-primary border-l-4 border-primary bg-primary/5"
                    : "text-gray-900 dark:text-gray-100",
                  mobileMenuOpen ? "animate-slide-in" : "animate-slide-out",
                )}
                style={{
                  animationDelay: `${150 + index * 50}ms`,
                  opacity: mobileMenuOpen ? 1 : 0,
                  transform: mobileMenuOpen ? "translateX(0)" : "translateX(1rem)",
                }}
              >
                {link.name}
              </a>
            ))}

            <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-800">
              <div
                className="text-sm text-gray-600 dark:text-gray-400"
                style={{
                  animationDelay: `${150 + navLinks.length * 50}ms`,
                  opacity: mobileMenuOpen ? 1 : 0,
                  transform: mobileMenuOpen ? "translateX(0)" : "translateX(1rem)",
                }}
              >
                <p className="mb-2">Isaiah Ozadhe</p>
                <p>Software Engineer</p>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
