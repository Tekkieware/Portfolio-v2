"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Linkedin, Mail, Send } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      console.log("Form submitted:", formData)
      setIsSubmitting(false)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 relative">
      <div className="blob blob-primary blob-3 opacity-20"></div>

      <div className="flex w-full justify-center">
        <h2 className="text-3xl font-bold text-center mb-6 relative inline-block section-header fade-in-up purple-gold-gradient">Get In Touch</h2>
      </div>
      <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto fade-in-up delay-100">
        Feel free to reach out if you're looking for a software engineer, have a question, or just want to connect.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="fade-in-right delay-100">
          <h3
            className="text-2xl font-bold mb-8 teal-accent-gradient inline-block section-header"
          >
            Contact Information
          </h3>
          <div className="space-y-6">
            <Card className="card-hover-effect gradient-border fade-in-up delay-150 animated-gradient-border">
              <CardContent className="flex items-center p-6">
                <div className="bg-primary/10 p-3 rounded-full mr-4 skill-icon">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <a href="isaiahozadhe247@gmail.com" className="text-gradient-gold-purple hover:underline">
                    gmail &gt; isaiahozadhe
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover-effect gold-border fade-in-up delay-200">
              <CardContent className="flex items-center p-6">
                <div
                  className="p-3 rounded-full mr-4 skill-icon skill-icon-gold"
                  style={{ background: "hsla(var(--gold), 0.1)" }}
                >
                  <Linkedin className="h-6 w-6" style={{ color: "hsl(var(--gold))" }} />
                </div>
                <div>
                  <h4 className="font-medium">LinkedIn</h4>
                  <a
                    href="https://www.linkedin.com/in/isaiah-ozadhe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gradient-gold-purple hover:underline"
                  >
                    linkedin.com &gt; isaiahozadhe
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover-effect teal-border fade-in-up delay-250">
              <CardContent className="flex items-center p-6">
                <div
                  className="p-3 rounded-full mr-4 skill-icon skill-icon-teal"
                  style={{ background: "hsla(var(--teal), 0.1)" }}
                >
                  <Github className="h-6 w-6" style={{ color: "hsl(var(--teal))" }} />
                </div>
                <div>
                  <h4 className="font-medium">GitHub</h4>
                  <a
                    href="https://github.com/Tekkieware"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gradient-teal-purple hover:underline"
                  >
                    github.com &gt; isaiahozadhe
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="fade-in-left delay-100">
          <h3
            className="text-2xl font-bold mb-8 teal-accent-gradient inline-block section-header"
          >
            Send Me a Message
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6 p-6 rounded-lg border border-primary/20 bg-card/50">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="border-primary/20 focus:border-primary focus:ring-primary/20"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Your Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="border-primary/20 focus:border-primary focus:ring-primary/20"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message here..."
                rows={5}
                required
                className="border-primary/20 focus:border-primary focus:ring-primary/20"
              />
            </div>

            <Button
              type="submit"
              className="w-full btn-gradient-primary group relative overflow-hidden"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>Processing...</>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
