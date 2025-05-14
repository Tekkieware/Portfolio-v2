"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Activity,
  BarChart3,
  Clock,
  Command,
  Cpu,
  Eye,
  FolderPlus,
  HardDrive,
  LineChart,
  RefreshCw,
  Users,
  Wifi,
} from "lucide-react"
import { useRouter } from "next/navigation"
import Projects from "@/components/admin/projects"

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState({
    totalProjects: 0,
    publishedProjects: 0,
    drafts: 0,
    totalViews: 0,
  })

  const [isLoading, setIsLoading] = useState(true)
  const [cpuUsage, setCpuUsage] = useState(42)
  const [memoryUsage, setMemoryUsage] = useState(68)
  const [networkStatus, setNetworkStatus] = useState(92)
  const [currentTime, setCurrentTime] = useState(new Date())

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Update time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        totalProjects: 6,
        publishedProjects: 5,
        drafts: 1,
        totalViews: 1250,
      })
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Simulate changing data
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 30) + 30)
      setMemoryUsage(Math.floor(Math.random() * 20) + 60)
      setNetworkStatus(Math.floor(Math.random() * 15) + 80)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleNewProject = () => {
    router.push("/admin/projects/new")
  }

  return (
    <div className="relative overflow-hidden">
      {/* Background particle effect */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-20" />

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full animate-ping"></div>
              <div className="absolute inset-2 border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-4 border-4 border-r-amber-500 border-t-transparent border-b-transparent border-l-transparent rounded-full animate-spin-slow"></div>
              <div className="absolute inset-6 border-4 border-b-emerald-500 border-t-transparent border-r-transparent border-l-transparent rounded-full animate-spin-slower"></div>
              <div className="absolute inset-8 border-4 border-l-rose-500 border-t-transparent border-r-transparent border-b-transparent rounded-full animate-spin"></div>
            </div>
            <div className="mt-4 text-purple-500 font-mono text-sm tracking-wider">INITIALIZING DASHBOARD</div>
          </div>
        </div>
      )}

      <div className="space-y-8 relative z-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
            <p className="text-muted-foreground mt-1">Welcome back, manage your portfolio content</p>
          </div>
          <Button onClick={handleNewProject}>
            <FolderPlus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-card/50 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/40 transition-colors duration-300 shadow-md overflow-hidden">
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Projects</p>
                  {isLoading ? (
                    <div className="h-9 w-16 bg-muted animate-pulse rounded mt-1"></div>
                  ) : (
                    <h3 className="text-3xl font-bold">{stats.totalProjects}</h3>
                  )}
                </div>
                <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <Command className="h-6 w-6 text-purple-500" />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 h-16 w-16 rounded-full bg-gradient-to-r opacity-20 blur-xl from-purple-500 to-purple-500/50"></div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border border-amber-500/20 hover:border-amber-500/40 transition-colors duration-300 shadow-md overflow-hidden">
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Published</p>
                  {isLoading ? (
                    <div className="h-9 w-16 bg-muted animate-pulse rounded mt-1"></div>
                  ) : (
                    <h3 className="text-3xl font-bold">{stats.publishedProjects}</h3>
                  )}
                </div>
                <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-amber-500" />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 h-16 w-16 rounded-full bg-gradient-to-r opacity-20 blur-xl from-amber-500 to-amber-500/50"></div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border border-emerald-500/20 hover:border-emerald-500/40 transition-colors duration-300 shadow-md overflow-hidden">
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Drafts</p>
                  {isLoading ? (
                    <div className="h-9 w-16 bg-muted animate-pulse rounded mt-1"></div>
                  ) : (
                    <h3 className="text-3xl font-bold">{stats.drafts}</h3>
                  )}
                </div>
                <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-emerald-500" />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 h-16 w-16 rounded-full bg-gradient-to-r opacity-20 blur-xl from-emerald-500 to-emerald-500/50"></div>
            </CardContent>
          </Card>
        </div>

        {/* Projects */}
        <Projects />
      </div>
    </div>
  )
}

