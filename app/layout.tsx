import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Inter } from 'next/font/google'
import { Fira_Code } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next';


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
  title: "Isaiah Ozadhe — Software Engineer",
  description:
    "Portfolio of Isaiah Ozadhe — a software engineer building polished React & Next.js frontends, scalable Python backends, and full-stack applications.",

  keywords: "Isaiah Ozadhe, Software Engineer, React Developer, Next.js Developer, Python Developer, Full-Stack Developer, TypeScript, Flask, Django, FastAPI, Frontend Engineer, Backend Engineer",

  author: "Isaiah Ozadhe",

  robots: "index, follow",

  openGraph: {
    title: "Isaiah Ozadhe | Software Engineer",
    description: "React & Next.js frontend, Python backend, and full-stack engineering — explore Isaiah Ozadhe's portfolio and recent work.",
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
  },

  twitter: {
    card: "summary_large_image",
    title: "Isaiah Ozadhe | Software Engineer",
    description: "React & Next.js frontend, Python backend, and full-stack engineering — explore Isaiah Ozadhe's portfolio and recent work.",
    images: ["https://isaiahozadhe.tech/photo.jpg"],
  },
};




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
        <Analytics />
      </body>
    </html>
  )
}
