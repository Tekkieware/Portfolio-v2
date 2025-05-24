"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import {
  Clock,
  Command,
  Eye,
  FolderPlus,
} from "lucide-react"
import { useRouter } from "next/navigation"
import Projects from "@/components/admin/projects"
import Loader from "@/components/loader"
import { useProjectsStore } from "@/lib/store/useProjectsStore"

export default function AdminDashboard() {
  const router = useRouter()
  
  const {fetchProjects, isLoadingProjects, projects} = useProjectsStore()

  const published = projects?.filter((project)=> project.publishStatus === "published").length
  const drafts = projects?.filter((project)=> project.publishStatus === "draft").length


  const handleNewProject = () => {
    router.push("/admin/projects/new")
  }

  useEffect(()=>{
    fetchProjects()
  }, [])

  return (
    <div className="relative overflow-hidden">
      {isLoadingProjects && (
        <div className="fixed min-h-screen min-w-screen top-0 inset-0 bg-black/80 flex items-center justify-center z-50">
          <Loader text="INITIALIZING DASHBOARD" />
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
                  <p className="text-xs font-medium text-muted-foreground">Total Projects</p>
                  {isLoadingProjects ? (
                    <div className="h-9 w-16 bg-muted animate-pulse rounded mt-1"></div>
                  ) : (
                    <h3 className="text-3xl font-bold">{projects?.length}</h3>
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
                  <p className="text-xs font-medium text-muted-foreground">Published</p>
                  {isLoadingProjects ? (
                    <div className="h-9 w-16 bg-muted animate-pulse rounded mt-1"></div>
                  ) : (
                    <h3 className="text-3xl font-bold">{published}</h3>
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
                  <p className="text-xs font-medium text-muted-foreground">Drafts</p>
                  {isLoadingProjects ? (
                    <div className="h-9 w-16 bg-muted animate-pulse rounded mt-1"></div>
                  ) : (
                    <h3 className="text-3xl font-bold">{drafts}</h3>
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
        <Projects projects={projects!} isLoadingProjects={isLoadingProjects} />
      </div>
    </div>
  )
}

