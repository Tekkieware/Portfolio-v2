"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Linkedin, Mail, Code, Server, Globe, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Handle scroll animations and visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  // Career timeline data
const careerSteps = [
  {
    title: "Full Stack Developer",
    company: "Luday SE",
    period: "Mar 2024 – Present",
    description:
      "Leading and Collaborating on projects across frontend, backend, and DevOps. Mentoring developers and improving internal tools.",
  },
  {
    title: "Frontend Developer (Part-Time)",
    company: "Knight Corporate Services",
    period: "Apr 2023 – Feb 2024",
    description:
      "Developed and maintained the company's website, focusing on performance, design, and user experience.",
  },
  {
    title: "IT Officer (NYSC)",
    company: "Spaceview Scientific Nigeria Ltd.",
    period: "Sep 2022 – Mar 2023",
    description:
      "Managed company IT infrastructure, website updates, and provided hardware/software support.",
  },
  {
    title: "Backend Intern",
    company: "Hotels.ng (HNG)",
    period: "Oct 2022 – Dec 2022",
    description:
      "Built APIs with FastAPI, led backend tasks, and supported integration efforts during a competitive internship.",
  },
  {
    title: "Web Development Intern",
    company: "Oasis Infobyte",
    period: "Feb 2022 – Mar 2022",
    description:
      "Created a full-stack pizza ordering app using React and Django, including payment integration.",
  },
  {
    title: "Web Development Trainee",
    company: "Hallmarkit Business Solutions",
    period: "Feb 2019 – Aug 2019",
    description:
      "Trained in HTML, CSS, JavaScript, ASP.NET, and SQL. Assisted peers and supported basic development tasks.",
  },
];


  return (
    <div ref={sectionRef} className="container mx-auto px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 -z-10"></div>
      <div className="blob blob-primary blob-1 opacity-10 -z-10"></div>
      <div className="blob blob-gold blob-2 opacity-10 -z-10"></div>
      <div
        className="blob blob-teal"
        style={{ width: "180px", height: "180px", top: "30%", right: "15%", opacity: "0.1", zIndex: "-10" }}
      ></div>
      <div className="flex flex-col items-center mb-16">
        <h2 className="text-3xl font-bold text-center mb-6 relative inline-block section-header fade-in-up">
          <span className="purple-gold-gradient">About Me</span>
        </h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl fade-in-up delay-100">
          I'm a dedicated software engineer with over three years of experience designing and developing web applications and microservices.
        </p>
      </div>

      {/* Profile section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div className="flex justify-center fade-in-right delay-100">
          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20 animate-pulse-glow glass-card">
              <img
                src="/photo.jpg?height=320&width=320"
                alt="Isaiah Ozadhe"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-background rounded-full p-3 shadow-lg glass-card">
              <Badge className="text-xs px-3 py-1 bg-primary hover:bg-primary">3+ Years</Badge>
            </div>

            {/* Decorative elements */}
            <div
              className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-secondary/20 animate-float"
              style={{ animationDelay: "-1s" }}
            ></div>
            <div
              className="absolute -bottom-6 -left-6 w-8 h-8 rounded-full bg-primary/20 animate-float"
              style={{ animationDelay: "-3s" }}
            ></div>
            <div
              className="absolute top-1/4 -right-4 w-10 h-10 rounded-full bg-gold animate-float"
              style={{ animationDelay: "-2s", opacity: "0.2" }}
            ></div>
          </div>
        </div>

        <div className="fade-in-left delay-200">
          <h3
            className={cn(
              "text-2xl font-bold mb-8 teal-accent-gradient inline-block section-header",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              "transition-all duration-1000 delay-700",
            )}
          >
            Software Engineer & Problem Solver
          </h3>

          <div className="glass-card p-6 rounded-lg gold-border mb-6 card-hover-effect">
            <p className="text-muted-foreground">
              I build smart, scalable solutions that solve real-world problems. My skills span full-stack development, microservices, and DevOps practices that support reliable, efficient software delivery.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-6">
            <Button
              variant="outline"
              className="group relative overflow-hidden border-primary/30 hover:border-primary/60 flex-1"
              onClick={() => window.open("/resume.pdf", "_blank")}
            >
              <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
              Download Resume
              <span className="absolute inset-0 w-full h-full bg-primary/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
            </Button>

            <Button
              className="bg-primary hover:bg-primary/90 group relative overflow-hidden flex-1"
              onClick={() => {
                const contactSection = document.getElementById("contact")
                if (contactSection) {
                  const navbarHeight = document.querySelector("header")?.offsetHeight || 0
                  const sectionTop = contactSection.offsetTop - navbarHeight
                  window.scrollTo({
                    top: sectionTop,
                    behavior: "smooth",
                  })
                  window.history.pushState(null, "", "#contact")
                }
              }}
            >
              <Mail className="mr-2 h-4 w-4" />
              Contact Me
              <span className="absolute inset-0 w-full h-full bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
            </Button>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="https://github.com/Tekkieware" target="_blank" rel="noopener noreferrer" className="flex-1 flex justify-center">
              <span
                className="flex gap-0.5 hover:bg-muted group transition-all duration-300 border text-xs font-semibold border-primary/50 w-full justify-center py-1 rounded-sm"
              >
                <Github className="h-3.5 w-3.5 group-hover:text-primary transition-colors" />
                GitHub
              </span>
            </Link>
            <Link href="https://www.linkedin.com/in/isaiah-ozadhe" target="_blank" rel="noopener noreferrer" className="flex-1 flex justify-center">
              <span
                className="flex gap-0.5 hover:bg-muted group transition-all duration-300 border text-xs font-semibold border-primary/50 w-full justify-center py-1 rounded-sm"
              >
                <Linkedin className="h-3.5 w-3.5 group-hover:text-primary transition-colors" />
                LinkedIn
              </span>
            </Link>
            <a href="mailto:isaiahozadhe247@gmail.com" className="flex-1 flex justify-center">
              <span
                className="flex gap-0.5 hover:bg-muted group transition-all duration-300 border text-xs font-semibold border-primary/50 w-full justify-center py-1 rounded-sm"
              >
                <Mail className="h-3.5 w-3.5 group-hover:text-primary transition-colors" />
                Email
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="gold-divider my-12 fade-in-up"></div>

      <h3
        className={cn(
          "text-2xl font-bold mb-8 teal-accent-gradient inline-block section-header",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          "transition-all duration-1000 delay-700",
        )}
      >
        My Expertise
      </h3>

      {/* Expertise cards with glassmorphic styling */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {/* Card 1 */}
        <Card
          className={cn(
            "overflow-hidden card-hover-effect gradient-border glass-card backdrop-blur-sm bg-background/30 dark:bg-gray-900/30 border border-primary/20 group",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            "transition-all duration-1000 delay-800",
          )}
        >
          <CardHeader className="pb-2">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 skill-icon group-hover:scale-110 transition-transform duration-500">
              <Code className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-xl">Full-Stack Development</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              I'm skilled in Python (Flask, Django) and JavaScript/TypeScript (React, Next.js, React Native), and use them to build complete, end-to-end solutions.
            </p>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card
          className={cn(
            "overflow-hidden card-hover-effect gold-border glass-card backdrop-blur-sm bg-background/30 dark:bg-gray-900/30 border border-gold/20 group",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            "transition-all duration-1000 delay-900",
          )}
        >
          <CardHeader className="pb-2">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mb-4 skill-icon skill-icon-gold group-hover:scale-110 transition-transform duration-500"
              style={{ background: "hsla(var(--gold), 0.1)" }}
            >
              <Server className="h-6 w-6" style={{ color: "hsl(var(--gold))" }} />
            </div>
            <CardTitle className="text-xl">Microservices Architecture</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              I design and build microservices using Docker, with a growing understanding of Kubernetes and DevOps practices.
            </p>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card
          className={cn(
            "overflow-hidden card-hover-effect teal-border glass-card backdrop-blur-sm bg-background/30 dark:bg-gray-900/30 border border-teal/20 group",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            "transition-all duration-1000 delay-1000",
          )}
        >
          <CardHeader className="pb-2">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mb-4 skill-icon skill-icon-blue group-hover:scale-110 transition-transform duration-500"
              style={{ background: "hsla(var(--blue), 0.1)" }}
            >
              <Globe className="h-6 w-6" style={{ color: "hsl(var(--teal))" }} />

            </div>
            <CardTitle className="text-xl">DevOps & CI/CD</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Automating and optimizing workflows to deliver software quickly, reliably, and consistently across multiple environments.
            </p>
          </CardContent>

        </Card>
      </div>

      <h3
        className={cn(
          "text-2xl font-bold mb-8 teal-accent-gradient inline-block section-header",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          "transition-all duration-1000 delay-700",
        )}
      >
        Professional Journey
      </h3>

      {/* Timeline */}
      <div className="relative mb-16">
        {/* Timeline line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-gold/50 to-teal/50"></div>

        {/* Timeline steps */}
        {careerSteps.map((step, index) => (
          <div
            key={index}
            className={cn(
              "relative flex flex-col md:flex-row mb-8 last:mb-0",
              index % 2 === 0 ? "md:flex-row-reverse" : "",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              "transition-all duration-1000",
            )}
            style={{ transitionDelay: `${1200 + index * 100}ms` }}
          >
            {/* Timeline dot */}
            <div className="absolute left-0 -top-1 md:top-2 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary z-10"></div>

            {/* Content */}
            <div className={cn("ml-6 md:ml-0 md:w-[calc(50%-20px)]", index % 2 === 0 ? "md:mr-10" : "md:ml-10")}>
              <div className="glass-card p-6 rounded-lg border border-primary/20 backdrop-blur-sm bg-background/30 dark:bg-gray-900/30 hover:border-primary/40 transition-colors duration-300">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-lg">{step.title}</h4>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {step.period}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{step.company}</p>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
