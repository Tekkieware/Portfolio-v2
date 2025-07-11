"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react"
import Logo from "./logo"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Footer() {
  const pathname = usePathname()
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const section = document.getElementById(sectionId)

    if (section) {
      const navbarHeight = document.querySelector("header")?.offsetHeight || 0
      const sectionTop = section.offsetTop - navbarHeight

      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      })
      window.history.pushState(null, "", `#${sectionId}`)
    }
  }

  return (
    <footer className="py-12 mt-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="blob blob-primary blob-1 opacity-10"></div>
      <div className="blob blob-secondary blob-2 opacity-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0 flex gap-3 items-end">
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, "home")}
              className="text-xl font-bold tracking-wider flex items-center"
            >
              <Logo />
            </a>
            <p className="text-muted-foreground text-xs max-w-md">
              Building Solutions!
            </p>
          </div>

          <div className="flex space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-primary/20 hover:text-primary transition-colors"
              onClick={() => window.open("https://github.com/Tekkieware", "_blank", "noopener,noreferrer")}
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-gold/20 hover:text-gold transition-colors"
              onClick={() => window.open("https://www.linkedin.com/in/isaiah-ozadhe", "_blank", "noopener,noreferrer")}
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-teal/20 hover:text-teal transition-colors"
              onClick={() => window.open("mailto:isaiahozadhe247@gmail.com")}
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-xs text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} Isaiah Ozadhe. All rights reserved.
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {!pathname.includes("project") &&
              ["Home", "About", "Projects", "Skills", "Blog", "Contact", "v1"].map((item, index) => (
                item === "v1" ?
                  <a
                    key={item}
                    href="https://portfolio-v1.isaiahozadhe.tech"
                    target="_blank"
                    className={`text-xs text-muted-foreground hover:${index % 4 === 0
                      ? "text-primary"
                      : index % 4 === 1
                        ? "text-gold"
                        : index % 4 === 2
                          ? "text-teal"
                          : "text-coral"
                      } transition-colors ${index % 4 === 0
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
                  :

                  <Link
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => scrollToSection(e, item.toLowerCase())}
                    className={`text-xs text-muted-foreground hover:${index % 4 === 0
                      ? "text-primary"
                      : index % 4 === 1
                        ? "text-gold"
                        : index % 4 === 2
                          ? "text-teal"
                          : "text-coral"
                      } transition-colors ${index % 4 === 0
                        ? "animated-border"
                        : index % 4 === 1
                          ? "animated-border-gold"
                          : index % 4 === 2
                            ? "animated-border-teal"
                            : "animated-border-coral"
                      }`}
                  >
                    {item}
                  </Link>
              ))
            }
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
