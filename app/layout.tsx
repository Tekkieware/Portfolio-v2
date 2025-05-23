import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Inter } from 'next/font/google'
import { Fira_Code } from 'next/font/google'


export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ["400"]
})




export const metadata = {
  title: "Isaiah Ozadhe | Software Engineer | Python & JavaScript/TypeScript Developer | Microservices & Docker Expert",
  description:
    "Portfolio of Isaiah Ozadhe, a software engineer skilled in Python, JavaScript, TypeScript, microservices, Docker, and modern development technologies.",

  keywords: "Isaiah Ozadhe, Software Engineer, Python Developer, JavaScript Developer, TypeScript Developer, Microservices, Docker, Full-stack Developer, React, Next.js, Flask, Django, FastAPI",

  author: "Isaiah Ozadhe",

  robots: "index, follow",

  // Open Graph (for social media previews)
  openGraph: {
    title: "Isaiah Ozadhe | Software Engineer",
    description: "Explore Isaiah Ozadhe's portfolio showcasing skills in Python, JavaScript/TypeScript, microservices, Docker, and modern tech.",
    url: "https://isaiahozadhe.tech",
    site_name: "Isaiah Ozadhe | Software Engineer Portfolio",
    type: "website",
    images: [
      {
        url: "https://isaiahozadhe.tech/photo.jpg",
        width: 1200,
        height: 630,
        alt: "Isaiah Ozadhe | Software Engineer Portfolio",
      },
    ],
  }
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
        <link rel="icon" href="/icon.ico" sizes="any" />
      </head>
      <body className={cn("min-h-screen antialiased", inter.variable, firaCode.variable)}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
