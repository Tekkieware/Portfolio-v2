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


export function ErrorNotification({
    onClose,
    className,
    autoDismiss = false,
    dismissDuration = 5000,
}: NotificationProps) {
    const [isVisible, setIsVisible] = useState(true)
    const [isGlitching, setIsGlitching] = useState(true)
    const glitchIntervalRef = useRef<NodeJS.Timeout | null>(null)

    // Handle glitch effect
    useEffect(() => {
        if (isGlitching) {
            // Initial glitch effect
            setTimeout(() => setIsGlitching(false), 1000)

            // Random glitch effects
            glitchIntervalRef.current = setInterval(() => {
                setIsGlitching(true)
                setTimeout(() => setIsGlitching(false), 200)
            }, 3000)
        }

        return () => {
            if (glitchIntervalRef.current) clearInterval(glitchIntervalRef.current)
        }
    }, [isGlitching])

    // Handle auto-dismiss
    useEffect(() => {
        if (autoDismiss) {
            const timer = setTimeout(() => {
                setIsVisible(false)
                if (onClose) onClose()
            }, dismissDuration)
            return () => clearTimeout(timer)
        }
    }, [autoDismiss, dismissDuration, onClose])

    const handleClose = () => {
        setIsVisible(false)
        if (onClose) onClose()
    }

    if (!isVisible) return null

    return (
        <div className="fixed top-4 right-4 max-w-md w-full z-50 perspective-notification">
            <Card
                className={cn(
                    "w-full shadow-lg overflow-hidden notification-card error-card",
                    "bg-gradient-to-br from-[#f8d7da]/90 to-[#f8d7da]/80 backdrop-blur-md",
                    "dark:from-[#3b1618]/90 dark:to-[#3b1618]/80",
                    "border border-[#f5c6cb] dark:border-[#e63946]/50",
                    isGlitching && "glitch-effect",
                    "transform-gpu",
                    className,
                )}
            >
                <div className="relative p-6">
                    {/* Glitch lines */}
                    {isGlitching && (
                        <>
                            <div className="glitch-line glitch-line-1"></div>
                            <div className="glitch-line glitch-line-2"></div>
                            <div className="glitch-line glitch-line-3"></div>
                        </>
                    )}

                    {/* Close button */}
                    <div className="absolute top-0 right-0">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full hover:bg-[#f5c6cb]/30 text-[#721c24] dark:text-[#e63946] transition-transform hover:rotate-90"
                            onClick={handleClose}
                        >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </Button>
                    </div>

                    <div className="flex items-start gap-4">
                        {/* Error icon with effect */}
                        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
                            <div className="absolute inset-0 rounded-full bg-[#721c24]/10 dark:bg-[#e63946]/20 animate-pulse opacity-70"></div>
                            <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#721c24]/10 dark:bg-[#e63946]/20 z-10">
                                <AlertCircle className="h-6 w-6 text-[#721c24] dark:text-[#e63946] animate-error-alert" />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="grid gap-1">
                            <h3 className="text-lg font-semibold leading-none tracking-tight text-[#721c24] dark:text-[#e63946] animate-slide-in-right">
                                Oops! Something went wrong. Please try again.
                            </h3>
                            <p className="text-sm text-[#721c24]/80 dark:text-[#e63946]/80 animate-slide-in-right animation-delay-100">
                                Please send a direct email to example@mail.com
                            </p>

                            {/* Action buttons */}
                            <div className="mt-3 flex gap-2 animate-slide-in-right animation-delay-200">
                                <Button
                                    size="sm"
                                    className="gap-2 bg-gradient-to-r from-[#721c24] to-[#a71d2a] hover:from-[#a71d2a] hover:to-[#721c24] dark:from-[#e63946] dark:to-[#d62828] dark:hover:from-[#d62828] dark:hover:to-[#e63946] text-white transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg"
                                    onClick={() => (window.location.href = "mailto:example@mail.com")}
                                >
                                    <Mail className="h-4 w-4" />
                                    Send Email
                                    <ArrowRight className="h-3 w-3 ml-1 animate-bounce-x" />
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="gap-2 border-[#721c24] text-[#721c24] hover:bg-[#721c24]/10 dark:border-[#e63946] dark:text-[#e63946] dark:hover:bg-[#e63946]/10 transition-all duration-300 hover:translate-y-[-2px]"
                                    onClick={() => window.location.reload()}
                                >
                                    <RefreshCw className="h-4 w-4 animate-spin-slow" />
                                    Try Again
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}