"use client"

import { useState, useEffect, useRef } from "react"
import { CheckCircle, AlertCircle, X, Mail, RefreshCw, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface NotificationProps {
    onClose?: () => void
    className?: string
    autoDismiss?: boolean
    dismissDuration?: number
}

export function SuccessNotification({
    onClose,
    className,
    autoDismiss = true,
    dismissDuration = 5000,
}: NotificationProps) {
    const [isVisible, setIsVisible] = useState(true)
    const [progress, setProgress] = useState(100)
    const particlesRef = useRef<HTMLDivElement>(null)
    const startTime = useRef(Date.now())
    const frameRef = useRef<number | null>(null)

    // Create particles on mount
    useEffect(() => {
        if (!particlesRef.current) return

        const colors = ["#4CAF50", "#8BC34A", "#CDDC39", "#2a9d8f", "#00BCD4"]
        const container = particlesRef.current

        // Create particles
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement("div")
            particle.className = "absolute rounded-full"

            // Random properties
            const size = Math.random() * 8 + 4
            const color = colors[Math.floor(Math.random() * colors.length)]

            // Set styles
            particle.style.width = `${size}px`
            particle.style.height = `${size}px`
            particle.style.backgroundColor = color
            particle.style.left = `${Math.random() * 100}%`
            particle.style.top = `${Math.random() * 100}%`
            particle.style.opacity = "0"
            particle.style.transform = "scale(0)"

            // Animation
            const delay = Math.random() * 500
            const duration = Math.random() * 1000 + 1000

            particle.style.animation = `
        particleFadeIn 300ms ease ${delay}ms forwards,
        particleFloat ${duration}ms ease ${delay}ms forwards,
        particleFadeOut 300ms ease ${delay + duration - 300}ms forwards
      `

            container.appendChild(particle)
        }

        return () => {
            if (container) {
                while (container.firstChild) {
                    container.removeChild(container.firstChild)
                }
            }
        }
    }, [])

    // Handle progress bar for auto-dismiss
    useEffect(() => {
        if (!autoDismiss) return

        const updateProgress = () => {
            const elapsed = Date.now() - startTime.current
            const remaining = dismissDuration - elapsed
            const newProgress = (remaining / dismissDuration) * 100

            if (newProgress <= 0) {
                setIsVisible(false)
                if (onClose) onClose()
                return
            }

            setProgress(newProgress)
            frameRef.current = requestAnimationFrame(updateProgress)
        }

        frameRef.current = requestAnimationFrame(updateProgress)

        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current)
        }
    }, [autoDismiss, dismissDuration, onClose])

    const handleClose = () => {
        setIsVisible(false)
        if (onClose) onClose()
    }

    if (!isVisible) return null

    return (
        <div className="w-full">
            <Card
                className={cn(
                    "w-full shadow-lg overflow-hidden notification-card",
                    "bg-gradient-to-br from-[#d4edda]/90 to-[#d4edda]/80 backdrop-blur-md",
                    "dark:from-[#0f3622]/90 dark:to-[#0f3622]/80",
                    "border border-[#c3e6cb] dark:border-[#2a9d8f]/50",
                    "transform-gpu",
                    className,
                )}
            >
                {/* Progress bar */}
                {autoDismiss && (
                    <div className="h-1 bg-[#c3e6cb]/30 dark:bg-[#2a9d8f]/30 w-full">
                        <div
                            className="h-full bg-gradient-to-r from-[#155724] to-[#2a9d8f] dark:from-[#2a9d8f] dark:to-[#4ecdc4]"
                            style={{ width: `${progress}%`, transition: "width 100ms linear" }}
                        />
                    </div>
                )}

                <div className="relative p-6">
                    {/* Close button */}
                    <div className="absolute top-0 right-0">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full hover:bg-[#c3e6cb]/30 text-[#155724] dark:text-[#2a9d8f] transition-transform hover:rotate-90"
                            onClick={handleClose}
                        >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </Button>
                    </div>

                    <div className="flex items-start gap-4">
                        {/* Success icon with glow */}
                        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
                            <div className="absolute inset-0 rounded-full bg-[#155724]/10 dark:bg-[#2a9d8f]/20 animate-ping-slow opacity-70"></div>
                            <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#155724]/10 dark:bg-[#2a9d8f]/20 z-10">
                                <CheckCircle className="h-6 w-6 text-[#155724] dark:text-[#2a9d8f] animate-success-check" />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="grid gap-1">
                            <h3 className="text-lg font-semibold leading-none tracking-tight text-[#155724] dark:text-[#2a9d8f] animate-slide-in-right">
                                Thank you for reaching out!
                            </h3>
                            <p className="text-sm text-[#155724]/80 dark:text-[#2a9d8f]/80 animate-slide-in-right animation-delay-100">
                                I'll get back to you as soon as possible.
                            </p>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

