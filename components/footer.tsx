"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  // Function to handle smooth scrolling with offset for fixed header
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const section = document.getElementById(sectionId)

    if (section) {
      // Get the height of the navbar to offset the scroll
      const navbarHeight = document.querySelector("header")?.offsetHeight || 0
      const sectionTop = section.offsetTop - navbarHeight

      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      })

      // Update URL hash without scrolling (prevents double scroll)
      window.history.pushState(null, "", `#${sectionId}`)
    }
  }

  return (
    <footer className="bg-muted/30 py-12 mt-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="blob blob-primary blob-1 opacity-10"></div>
      <div className="blob blob-secondary blob-2 opacity-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, "home")}
              className="text-xl font-bold tracking-wider flex items-center"
            >
              {/* Reverted I.O.O. logo */}
              <div className="flex justify-center min-h-full gap-0.5">
                <div className="flex flex-col items-center">
                  {/* Two dots atop the "i" with alternating colors */}
                  <div className="flex mb-0.5">
                    <div className="w-2 h-2 rounded-full bg-gold mr-0.5"></div>
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>

                  {/* Rectangle body of the "i" with two color blocks */}
                  <div className="flex w-5 h-7">
                    <div className="w-1/2 h-full bg-primary rounded-l-sm"></div>
                    <div className="w-1/2 h-full bg-gold rounded-r-sm"></div>
                  </div>
                </div>
                <div className="mt-1 flex gap-0.5">
                  <h1
                    className="font-black text-3xl text-transparent bg-[linear-gradient(110deg,_hsl(var(--primary))_45%,_hsl(var(--gold))_45%,_hsl(var(--gold))_55%,_hsl(var(--primary))_55%)] bg-clip-text"
                    style={{ fontWeight: 900, fontFamily: "'Montserrat', sans-serif" }}
                  >
                    O
                  </h1>
                  <h1
                    className="font-black text-3xl text-transparent bg-[linear-gradient(110deg,_hsl(var(--gold))_45%,_hsl(var(--primary))_45%,_hsl(var(--primary))_55%,_hsl(var(--gold))_55%)] bg-clip-text"
                    style={{ fontWeight: 900, fontFamily: "'Montserrat', sans-serif" }}
                  >
                    O
                  </h1>
                </div>
              </div>
            </a>
            <p className="text-muted-foreground mt-2 text-sm max-w-md">
              Software Engineer specializing in Python, JavaScript/TypeScript, and modern web technologies.
            </p>
          </div>

          <div className="flex space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-primary/20 hover:text-primary transition-colors"
              onClick={() => window.open("https://github.com", "_blank", "noopener,noreferrer")}
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-gold/20 hover:text-gold transition-colors"
              onClick={() => window.open("https://linkedin.com", "_blank", "noopener,noreferrer")}
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-teal/20 hover:text-teal transition-colors"
              onClick={() => window.open("mailto:isaiah@example.com")}
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} Isaiah Ozadhe. All rights reserved.
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {["Home", "About", "Projects", "Skills", "Blog", "Contact"].map((item, index) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => scrollToSection(e, item.toLowerCase())}
                className={`text-sm text-muted-foreground hover:${
                  index % 4 === 0
                    ? "text-primary"
                    : index % 4 === 1
                      ? "text-gold"
                      : index % 4 === 2
                        ? "text-teal"
                        : "text-coral"
                } transition-colors ${
                  index % 4 === 0
                    ? "animated-border"
                    : index % 4 === 1
                      ? "animated-border-gold"
                      : index % 4 === 2
                        ? "animated-border-teal"
                        : "animated-border-coral"
                }`}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-6 right-6 rounded-full shadow-md bg-background animate-pulse-glow z-20 border-gold hover:border-primary"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5 text-primary" />
      </Button>
    </footer>
  )
}
