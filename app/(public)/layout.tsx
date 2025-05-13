import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Inter } from 'next/font/google'
import { Fira_Code } from 'next/font/google'


export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ["700", "500", "600", "300" ,]
})




export const metadata = {
  title: "Isaiah Ozadhe | Software Engineer | Python Developer | Javascript Developer | Typescript Developer",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("min-h-screen antialiased", inter.variable, firaCode.variable)}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <Navbar />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
