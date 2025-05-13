"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, X, Upload, Trash2, Save } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import ProjectFormTabs from "@/components/admin/project-form-tabs"
import { useToast } from "@/components/ui/use-toast"

// Sample project data - this would typically come from an API
const projectsData = [
  {
    id: "1",
    title: "E-Commerce Microservices",
    description:
      "Built a scalable e-commerce platform using microservices architecture with Python FastAPI, Docker, and React.",
    category: "🌐 Web App",
    status: "published",
    tags: ["Python", "FastAPI", "Docker", "React", "PostgreSQL"],
    color: "primary",
    image: "/placeholder.svg?height=400&width=600",
    features: [
      { title: "Microservices Architecture", description: "Decomposed the application into specialized services" },
      { title: "API Gateway", description: "Centralized entry point for all client requests" },
    ],
    techStack: [
      { name: "Python", icon: "Code" },
      { name: "FastAPI", icon: "Server" },
      { name: "React", icon: "Code" },
    ],
    challenges: [
      {
        title: "Data Consistency",
        description: "Maintaining data consistency across multiple services was challenging.",
        solution: "Implemented the Saga pattern with compensating transactions to ensure eventual consistency.",
      },
    ],
  },
  {
    id: "2",
    title: "Task Management App",
    description:
      "Full-stack task management application with real-time updates, user authentication, and mobile responsiveness.",
    category: "📱 Mobile",
    status: "published",
    tags: ["TypeScript", "Next.js", "MongoDB", "Tailwind CSS"],
    color: "gold",
    image: "/placeholder.svg?height=400&width=600",
    features: [
      { title: "Kanban Board", description: "Interactive kanban board with customizable columns" },
      { title: "Real-time Updates", description: "Live updates when team members create or modify tasks" },
    ],
    techStack: [
      { name: "TypeScript", icon: "Code" },
      { name: "Next.js", icon: "Code" },
      { name: "MongoDB", icon: "Database" },
    ],
    challenges: [
      {
        title: "State Management",
        description: "Managing complex state across multiple components was challenging.",
        solution: "Implemented a custom state management solution with React Context and reducers.",
      },
    ],
  },
  {
    id: "6",
    title: "AI Image Generator",
    description: "Web application that uses AI to generate custom images based on text prompts.",
    category: "🤖 AI",
    status: "draft",
    tags: ["Python", "React", "OpenAI"],
    color: "primary",
    image: null,
    features: [
      { title: "Text-to-Image Generation", description: "Generate images from text descriptions" },
      { title: "Style Transfer", description: "Apply artistic styles to generated images" },
    ],
    techStack: [
      { name: "Python", icon: "Code" },
      { name: "React", icon: "Code" },
      { name: "OpenAI API", icon: "Cloud" },
    ],
    challenges: [
      {
        title: "API Rate Limiting",
        description: "Handling OpenAI API rate limits was challenging.",
        solution: "Implemented a queue system with retry logic and fallback mechanisms.",
      },
    ],
  },
]

export default function EditProjectPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tagInput, setTagInput] = useState("")
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [projectData, setProjectData] = useState({
    id: "",
    title: "",
    description: "",
    category: "",
    color: "primary",
    status: "draft",
    tags: [] as string[],
    image: null as string | null,
    features: [{ title: "", description: "" }],
    techStack: [{ name: "", icon: "" }],
    challenges: [{ title: "", description: "", solution: "" }],
  })

  useEffect(() => {
    // Simulate API call to fetch project data
    const fetchProject = async () => {
      try {
        // In a real app, this would be an API call
        const project = projectsData.find((p) => p.id === params.id)

        if (project) {
          setProjectData({
            id: project.id,
            title: project.title,
            description: project.description,
            category: project.category,
            color: project.color,
            status: project.status,
            tags: project.tags,
            image: project.image,
            features: project.features,
            techStack: project.techStack,
            challenges: project.challenges,
          })
        } else {
          // Project not found, redirect to projects page
          toast({
            title: "Project Not Found",
            description: "The project you're trying to edit doesn't exist.",
            variant: "destructive",
          })
          router.push("/admin/projects")
        }
      } catch (error) {
        console.error("Error fetching project:", error)
        toast({
          title: "Error",
          description: "Failed to load project data.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchProject()
  }, [params.id, router, toast])

  // Update project data from tabs
  const updateProjectData = (field: string, value: any) => {
    setProjectData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!projectData.title.trim()) {
      errors.title = "Title is required"
    }

    if (!projectData.description.trim()) {
      errors.description = "Description is required"
    }

    if (!projectData.category) {
      errors.category = "Category is required"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !projectData.tags.includes(tagInput.trim())) {
      setProjectData({
        ...projectData,
        tags: [...projectData.tags, tagInput.trim()],
      })
      setTagInput("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setProjectData({
      ...projectData,
      tags: projectData.tags.filter((t) => t !== tag),
    })
  }

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag()
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Image must be less than 5MB",
          variant: "destructive",
        })
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        setProjectData({
          ...projectData,
          image: event.target?.result as string,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Project data updated:", projectData)

      toast({
        title: "Project Updated",
        description: "Your project has been updated successfully",
      })

      // Redirect to projects page
      router.push("/admin/projects")
    } catch (error) {
      console.error("Error updating project:", error)
      toast({
        title: "Error",
        description: "Failed to update project. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Edit Project</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="published"
              checked={projectData.status === "published"}
              onCheckedChange={(checked) =>
                setProjectData({
                  ...projectData,
                  status: checked ? "published" : "draft",
                })
              }
            />
            <Label htmlFor="published">{projectData.status === "published" ? "Published" : "Draft"}</Label>
          </div>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Update Project
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-colors duration-300 shadow-md">
            <CardContent className="p-6">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="title" className="flex items-center">
                    Project Title <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="Enter project title"
                    value={projectData.title}
                    onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                    className={formErrors.title ? "border-red-500" : ""}
                    required
                  />
                  {formErrors.title && <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="flex items-center">
                    Description <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Enter project description"
                    rows={4}
                    value={projectData.description}
                    onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                    className={formErrors.description ? "border-red-500" : ""}
                    required
                  />
                  {formErrors.description && <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category" className="flex items-center">
                      Category <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Select
                      value={projectData.category}
                      onValueChange={(value) => setProjectData({ ...projectData, category: value })}
                    >
                      <SelectTrigger id="category" className={formErrors.category ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="🌐 Web App">🌐 Web App</SelectItem>
                        <SelectItem value="📱 Mobile">📱 Mobile</SelectItem>
                        <SelectItem value="🏥 Healthcare">🏥 Healthcare</SelectItem>
                        <SelectItem value="💪 Fitness">💪 Fitness</SelectItem>
                        <SelectItem value="💬 Communication">💬 Communication</SelectItem>
                        <SelectItem value="📝 CMS">📝 CMS</SelectItem>
                        <SelectItem value="🤖 AI">🤖 AI</SelectItem>
                      </SelectContent>
                    </Select>
                    {formErrors.category && <p className="text-red-500 text-sm mt-1">{formErrors.category}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="color">Color Theme</Label>
                    <Select
                      value={projectData.color}
                      onValueChange={(value) => setProjectData({ ...projectData, color: value })}
                    >
                      <SelectTrigger id="color">
                        <SelectValue placeholder="Select color" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="primary">Purple</SelectItem>
                        <SelectItem value="gold">Gold</SelectItem>
                        <SelectItem value="teal">Teal</SelectItem>
                        <SelectItem value="coral">Coral</SelectItem>
                        <SelectItem value="lavender">Lavender</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="tags"
                      placeholder="Add a tag"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleTagKeyDown}
                    />
                    <Button type="button" size="icon" onClick={handleAddTag}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {projectData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          <ProjectFormTabs
            features={projectData.features}
            techStack={projectData.techStack}
            challenges={projectData.challenges}
            onFeaturesChange={(features) => updateProjectData("features", features)}
            onTechStackChange={(techStack) => updateProjectData("techStack", techStack)}
            onChallengesChange={(challenges) => updateProjectData("challenges", challenges)}
          />
        </div>

        <div className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-colors duration-300 shadow-md">
            <CardContent className="p-6">
              <div className="space-y-4">
                <Label>Featured Image</Label>
                {projectData.image ? (
                  <div className="relative rounded-lg overflow-hidden">
                    <img
                      src={projectData.image || "/placeholder.svg"}
                      alt="Project preview"
                      className="w-full aspect-video object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => setProjectData({ ...projectData, image: null })}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <div className="flex flex-col items-center">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">Drag and drop an image, or click to browse</p>
                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="image-upload"
                        onChange={handleImageUpload}
                      />
                      <Label
                        htmlFor="image-upload"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm cursor-pointer"
                      >
                        Upload Image
                      </Label>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-colors duration-300 shadow-md">
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="font-medium">Project Preview</h3>
                <div className="rounded-lg overflow-hidden border border-border">
                  <div className="h-32 bg-muted flex items-center justify-center">
                    {projectData.title ? (
                      <div className="text-center p-4">
                        <h3 className="font-bold">{projectData.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {projectData.description || "No description provided"}
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">Preview will appear here</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
