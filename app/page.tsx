"use client"

import { useEffect } from "react"
import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Skills from "@/components/skills"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"

export default function Home() {
  // Add scroll animation handler
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />
      <main>
        <section id="home" className="pt-16">
          <Hero />
        </section>

        <section id="about" className="py-20">
          <About />
        </section>

        <section id="skills" className="py-20">
          <Skills />
        </section>

        <section id="projects" className="clip-path-slant bg-muted/50 py-20 relative">
          <div className="container mx-auto">
            <Projects />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
