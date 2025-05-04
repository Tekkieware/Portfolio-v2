import type React from "react"
import "@/app/globals.css"
import { Mona_Sans as FontSans } from "next/font/google"
import { Fira_Mono as FontMono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata = {
  title: "Isaiah Ozadhe | Software Engineer | Python Developer | Typescript Developer",
  description:
    "Portfolio of Isaiah Ozadhe, a Software Engineer specializing in Python, JavaScript/TypeScript, Microservices, and modern technologies.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Add Montserrat font for the logo */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("min-h-screen font-sans antialiased", fontSans.variable, fontMono.variable)}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
