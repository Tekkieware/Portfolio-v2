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

  // Particle effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: Particle[] = []
    const particleCount = 50

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.color = `rgba(124, 58, 237, ${Math.random() * 0.3 + 0.1})` // Purple color with opacity
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

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

  const recentActivity = [
    { action: "Project updated", project: "E-Commerce Microservices", time: "2 hours ago" },
    { action: "Project created", project: "AI Image Generator", time: "1 day ago" },
    { action: "Project published", project: "Task Management App", time: "3 days ago" },
  ]

  // Format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Handle new project button click
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
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back, manage your portfolio content</p>
          </div>
          <Button onClick={handleNewProject}>
            <FolderPlus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

          <Card className="bg-card/50 backdrop-blur-sm border border-rose-500/20 hover:border-rose-500/40 transition-colors duration-300 shadow-md overflow-hidden">
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                  {isLoading ? (
                    <div className="h-9 w-24 bg-muted animate-pulse rounded mt-1"></div>
                  ) : (
                    <h3 className="text-3xl font-bold">{stats.totalViews}</h3>
                  )}
                </div>
                <div className="h-12 w-12 rounded-full bg-rose-500/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-rose-500" />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 h-16 w-16 rounded-full bg-gradient-to-r opacity-20 blur-xl from-rose-500 to-rose-500/50"></div>
            </CardContent>
          </Card>
        </div>

        {/* System Overview and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/40 transition-colors duration-300 shadow-md">
            <CardHeader className="pb-2 border-b border-border/50">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5 text-purple-500" />
                  System Overview
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-background/50 text-purple-500 border-purple-500/50 text-xs">
                    <div className="h-1.5 w-1.5 rounded-full bg-purple-500 mr-1 animate-pulse"></div>
                    LIVE
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard
                  title="CPU Usage"
                  value={cpuUsage}
                  icon={Cpu}
                  trend="up"
                  color="purple"
                  detail="3.8 GHz | 12 Cores"
                />
                <MetricCard
                  title="Memory"
                  value={memoryUsage}
                  icon={HardDrive}
                  trend="stable"
                  color="amber"
                  detail="16.4 GB / 24 GB"
                />
                <MetricCard
                  title="Network"
                  value={networkStatus}
                  icon={Wifi}
                  trend="down"
                  color="emerald"
                  detail="1.2 GB/s | 42ms"
                />
              </div>

              <div className="mt-8">
                <Tabs defaultValue="performance" className="w-full">
                  <div className="flex items-center justify-between mb-4">
                    <TabsList className="bg-background/50 p-1">
                      <TabsTrigger
                        value="performance"
                        className="data-[state=active]:bg-purple-500/10 data-[state=active]:text-purple-500"
                      >
                        Performance
                      </TabsTrigger>
                      <TabsTrigger
                        value="projects"
                        className="data-[state=active]:bg-purple-500/10 data-[state=active]:text-purple-500"
                      >
                        Projects
                      </TabsTrigger>
                      <TabsTrigger
                        value="storage"
                        className="data-[state=active]:bg-purple-500/10 data-[state=active]:text-purple-500"
                      >
                        Storage
                      </TabsTrigger>
                    </TabsList>

                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-purple-500 mr-1"></div>
                        CPU
                      </div>
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-amber-500 mr-1"></div>
                        Memory
                      </div>
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 mr-1"></div>
                        Network
                      </div>
                    </div>
                  </div>

                  <TabsContent value="performance" className="mt-0">
                    <div className="h-64 w-full relative bg-background/30 rounded-lg border border-border/50 overflow-hidden">
                      <PerformanceChart />
                      <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm rounded-md px-3 py-2 border border-border/50">
                        <div className="text-xs text-muted-foreground">System Load</div>
                        <div className="text-lg font-mono text-purple-500">{cpuUsage}%</div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="projects" className="mt-0">
                    <div className="bg-background/30 rounded-lg border border-border/50 overflow-hidden">
                      <div className="grid grid-cols-12 text-xs text-muted-foreground p-3 border-b border-border/50 bg-background/50">
                        <div className="col-span-1">ID</div>
                        <div className="col-span-4">Project</div>
                        <div className="col-span-2">Type</div>
                        <div className="col-span-2">Views</div>
                        <div className="col-span-2">Completion</div>
                        <div className="col-span-1">Status</div>
                      </div>

                      <div className="divide-y divide-border/30">
                        <ProjectRow
                          id="P001"
                          name="E-Commerce Microservices"
                          type="Backend"
                          views={450}
                          completion={100}
                          status="published"
                        />
                        <ProjectRow
                          id="P002"
                          name="Task Management App"
                          type="Full Stack"
                          views={325}
                          completion={100}
                          status="published"
                        />
                        <ProjectRow
                          id="P003"
                          name="AI Image Generator"
                          type="AI/ML"
                          views={210}
                          completion={60}
                          status="draft"
                        />
                        <ProjectRow
                          id="P004"
                          name="Portfolio Website"
                          type="Frontend"
                          views={265}
                          completion={100}
                          status="published"
                        />
                        <ProjectRow
                          id="P005"
                          name="Mobile Banking App"
                          type="Mobile"
                          views={0}
                          completion={25}
                          status="draft"
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="storage" className="mt-0">
                    <div className="bg-background/30 rounded-lg border border-border/50 p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <StorageItem name="Project Assets" total={512} used={324} type="Images" />
                        <StorageItem name="Code Repositories" total={256} used={185} type="Code" />
                        <StorageItem name="Backup Storage" total={1024} used={465} type="Backup" />
                        <StorageItem name="Media Files" total={768} used={210} type="Media" />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/40 transition-colors duration-300 shadow-md">
            <CardHeader className="pb-2 border-b border-border/50">
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-amber-500" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-background to-background/80 p-6 border-b border-border/50">
                <div className="text-center">
                  <div className="text-xs text-muted-foreground mb-1 font-mono">CURRENT TIME</div>
                  <div className="text-3xl font-mono text-purple-500 mb-1">{formatTime(currentTime)}</div>
                  <div className="text-sm text-muted-foreground">{formatDate(currentTime)}</div>
                </div>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-background/50 rounded-md p-3 border border-border/50">
                    <div className="text-xs text-muted-foreground mb-1">Session</div>
                    <div className="text-sm font-mono">3h 42m 18s</div>
                  </div>
                  <div className="bg-background/50 rounded-md p-3 border border-border/50">
                    <div className="text-xs text-muted-foreground mb-1">Last Login</div>
                    <div className="text-sm font-mono">2 days ago</div>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-4">
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-14 bg-muted animate-pulse rounded"></div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentActivity.map((activity, i) => (
                      <div key={i} className="flex items-start space-x-3">
                        <div className="h-8 w-8 rounded-full bg-purple-500/10 flex items-center justify-center mt-0.5">
                          <Activity className="h-4 w-4 text-purple-500" />
                        </div>
                        <div>
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">{activity.project}</p>
                          <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="border-t border-border/50 p-4">
              <Button variant="outline" className="w-full">
                View All Activity
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Project Completion */}
        <Card className="bg-card/50 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/40 transition-colors duration-300 shadow-md">
          <CardHeader className="pb-2 border-b border-border/50">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5 text-purple-500" />
                Project Completion
              </CardTitle>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-3.5 w-3.5 mr-1" />
                Refresh
              </Button>
            </div>
            <CardDescription>Progress on your current projects</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {isLoading ? (
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-5 w-40 bg-muted animate-pulse rounded"></div>
                    <div className="h-4 bg-muted animate-pulse rounded"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="font-medium">E-Commerce Microservices</p>
                    <p className="text-sm text-muted-foreground">100%</p>
                  </div>
                  <Progress value={100} className="h-2">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-purple-500/70 rounded-full"
                      style={{ width: "100%" }}
                    />
                  </Progress>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="font-medium">Task Management App</p>
                    <p className="text-sm text-muted-foreground">100%</p>
                  </div>
                  <Progress value={100} className="h-2">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-purple-500/70 rounded-full"
                      style={{ width: "100%" }}
                    />
                  </Progress>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="font-medium">AI Image Generator</p>
                    <p className="text-sm text-muted-foreground">60%</p>
                  </div>
                  <Progress value={60} className="h-2">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-500/70 rounded-full"
                      style={{ width: "60%" }}
                    />
                  </Progress>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="font-medium">Mobile Banking App</p>
                    <p className="text-sm text-muted-foreground">25%</p>
                  </div>
                  <Progress value={25} className="h-2">
                    <div
                      className="h-full bg-gradient-to-r from-rose-500 to-rose-500/70 rounded-full"
                      style={{ width: "25%" }}
                    />
                  </Progress>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Component for metric cards
function MetricCard({
  title,
  value,
  icon: Icon,
  trend,
  color,
  detail,
}: {
  title: string
  value: number
  icon: React.ElementType
  trend: "up" | "down" | "stable"
  color: string
  detail: string
}) {
  const getColor = () => {
    switch (color) {
      case "purple":
        return "from-purple-500 to-purple-500/70 border-purple-500/30"
      case "amber":
        return "from-amber-500 to-amber-500/70 border-amber-500/30"
      case "emerald":
        return "from-emerald-500 to-emerald-500/70 border-emerald-500/30"
      case "rose":
        return "from-rose-500 to-rose-500/70 border-rose-500/30"
      default:
        return "from-purple-500 to-purple-500/70 border-purple-500/30"
    }
  }

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <BarChart3 className={`h-4 w-4 text-rose-500`} />
      case "down":
        return <BarChart3 className={`h-4 w-4 rotate-180 text-emerald-500`} />
      case "stable":
        return <LineChart className={`h-4 w-4 text-amber-500`} />
      default:
        return null
    }
  }

  return (
    <div className={`bg-background/50 rounded-lg border ${getColor()} p-4 relative overflow-hidden`}>
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-muted-foreground">{title}</div>
        <Icon className={`h-5 w-5 text-${color}-500`} />
      </div>
      <div className="text-2xl font-bold mb-1">{value}%</div>
      <div className="text-xs text-muted-foreground">{detail}</div>
      <div className="absolute bottom-2 right-2 flex items-center">{getTrendIcon()}</div>
      <div
        className={`absolute -bottom-6 -right-6 h-16 w-16 rounded-full bg-gradient-to-r opacity-20 blur-xl ${getColor()}`}
      ></div>
    </div>
  )
}

// Performance chart component
function PerformanceChart() {
  return (
    <div className="h-full w-full flex items-end justify-between px-4 pt-4 pb-8 relative">
      {/* Y-axis labels */}
      <div className="absolute left-2 top-0 h-full flex flex-col justify-between py-4">
        <div className="text-xs text-muted-foreground">100%</div>
        <div className="text-xs text-muted-foreground">75%</div>
        <div className="text-xs text-muted-foreground">50%</div>
        <div className="text-xs text-muted-foreground">25%</div>
        <div className="text-xs text-muted-foreground">0%</div>
      </div>

      {/* X-axis grid lines */}
      <div className="absolute left-0 right-0 top-0 h-full flex flex-col justify-between py-4 px-10">
        <div className="border-b border-border/30 w-full"></div>
        <div className="border-b border-border/30 w-full"></div>
        <div className="border-b border-border/30 w-full"></div>
        <div className="border-b border-border/30 w-full"></div>
        <div className="border-b border-border/30 w-full"></div>
      </div>

      {/* Chart bars */}
      <div className="flex-1 h-full flex items-end justify-between px-2 z-10">
        {Array.from({ length: 24 }).map((_, i) => {
          const cpuHeight = Math.floor(Math.random() * 60) + 20
          const memHeight = Math.floor(Math.random() * 40) + 40
          const netHeight = Math.floor(Math.random() * 30) + 30

          return (
            <div key={i} className="flex space-x-0.5">
              <div
                className="w-1 bg-gradient-to-t from-purple-500 to-purple-500/70 rounded-t-sm"
                style={{ height: `${cpuHeight}%` }}
              ></div>
              <div
                className="w-1 bg-gradient-to-t from-amber-500 to-amber-500/70 rounded-t-sm"
                style={{ height: `${memHeight}%` }}
              ></div>
              <div
                className="w-1 bg-gradient-to-t from-emerald-500 to-emerald-500/70 rounded-t-sm"
                style={{ height: `${netHeight}%` }}
              ></div>
            </div>
          )
        })}
      </div>

      {/* X-axis labels */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-10">
        <div className="text-xs text-muted-foreground">00:00</div>
        <div className="text-xs text-muted-foreground">06:00</div>
        <div className="text-xs text-muted-foreground">12:00</div>
        <div className="text-xs text-muted-foreground">18:00</div>
        <div className="text-xs text-muted-foreground">24:00</div>
      </div>
    </div>
  )
}

// Project row component
function ProjectRow({
  id,
  name,
  type,
  views,
  completion,
  status,
}: {
  id: string
  name: string
  type: string
  views: number
  completion: number
  status: string
}) {
  return (
    <div className="grid grid-cols-12 py-2 px-3 text-sm hover:bg-background/50">
      <div className="col-span-1 text-muted-foreground">{id}</div>
      <div className="col-span-4">{name}</div>
      <div className="col-span-2 text-muted-foreground">{type}</div>
      <div className="col-span-2 text-purple-500">{views}</div>
      <div className="col-span-2">
        <div className="w-full bg-background/50 h-1.5 rounded-full">
          <div
            className={`h-full rounded-full ${
              completion === 100 ? "bg-purple-500" : completion > 50 ? "bg-amber-500" : "bg-rose-500"
            }`}
            style={{ width: `${completion}%` }}
          ></div>
        </div>
      </div>
      <div className="col-span-1">
        <Badge
          variant="outline"
          className={`
          ${status === "published" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30" : "bg-amber-500/10 text-amber-500 border-amber-500/30"} 
          text-xs`}
        >
          {status}
        </Badge>
      </div>
    </div>
  )
}

// Storage item component
function StorageItem({
  name,
  total,
  used,
  type,
}: {
  name: string
  total: number
  used: number
  type: string
}) {
  const percentage = Math.round((used / total) * 100)

  return (
    <div className="bg-background/50 rounded-md p-3 border border-border/50">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm">{name}</div>
        <Badge variant="outline" className="bg-background/50 text-foreground border-border/50 text-xs">
          {type}
        </Badge>
      </div>
      <div className="mb-2">
        <div className="flex items-center justify-between mb-1">
          <div className="text-xs text-muted-foreground">
            {used} MB / {total} MB
          </div>
          <div className="text-xs text-muted-foreground">{percentage}%</div>
        </div>
        <Progress value={percentage} className="h-1.5 bg-background/70">
          <div
            className={`h-full rounded-full ${
              percentage > 90 ? "bg-rose-500" : percentage > 70 ? "bg-amber-500" : "bg-purple-500"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </Progress>
      </div>
      <div className="flex items-center justify-between text-xs">
        <div className="text-muted-foreground">Free: {total - used} MB</div>
        <Button variant="ghost" size="sm" className="h-6 text-xs px-2 text-muted-foreground hover:text-foreground">
          Details
        </Button>
      </div>
    </div>
  )
}
