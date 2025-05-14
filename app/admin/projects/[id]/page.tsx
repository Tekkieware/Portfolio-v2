"use client"

import type React from "react"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus, X, Save } from "lucide-react"

// Sample project data - this would typically come from an API
const projectsData = [
  {
    id: "1",
    title: "E-Commerce Microservices",
    description:
      "A stacalable e-commerce platform using microservices architecture with Python FastAPI, Docker, and React.",
    image: "/placeholder.svg?height=600&width=1200",
    status: "Completed",
    client: "Nebula Technologies",
    startDate: "2023-05-15",
    technologies: ["Python", "FastAPI", "Docker", "React", "PostgreSQL"],
    categories: ["Web Application", "Developer Tools"],
    githubUrl: "https://github.com/username/ecommerce-microservices",
    liveUrl: "https://ecommerce-microservices.vercel.app",
    color: "primary",
    overview:
      "Built a scalable e-commerce platform using microservices architecture with Python FastAPI, Docker, and React. The platform includes services for product catalog, user authentication, order processing, payment gateway, and inventory management.",
    features: [
      {
        title: "Microservices Architecture",
        description:
          "Decomposed the application into specialized services: Product Catalog, User Authentication, Order Processing, Payment Gateway, and Inventory Management.",
        image: "/placeholder.svg?height=200&width=400",
      },
      {
        title: "API Gateway",
        description:
          "Centralized entry point for all client requests, handling routing, authentication, and rate limiting.",
        image: "/placeholder.svg?height=200&width=400",
      },
      {
        title: "Event-Driven Communication",
        description:
          "Implemented asynchronous communication between services using RabbitMQ for events like order placement and inventory updates.",
        image: "/placeholder.svg?height=200&width=400",
      },
      {
        title: "Containerized Deployment",
        description: "Docker containers orchestrated with Kubernetes for scalable and resilient deployment.",
        image: "/placeholder.svg?height=200&width=400",
      },
    ],
    publishStatus: "published",
  },
  {
    id: "2",
    title: "Task Management App",
    description: "Full-stack task management application with real-time updates and mobile responsiveness.",
    image: "/placeholder.svg?height=300&width=600",
    status: "In Progress",
    client: "Acme Corp",
    startDate: "2023-08-10",
    technologies: ["TypeScript", "Next.js", "MongoDB", "Tailwind CSS"],
    categories: ["Web Application", "Productivity"],
    githubUrl: "https://github.com/username/task-management",
    liveUrl: "https://task-management.vercel.app",
    color: "gold",
    overview: "A comprehensive task management application designed for teams to collaborate efficiently.",
    features: [
      {
        title: "Kanban Board",
        description: "Drag-and-drop interface for managing tasks across different stages.",
        image: "/placeholder.svg?height=200&width=400",
      },
      {
        title: "Real-time Updates",
        description: "Instant updates when team members modify tasks or add comments.",
        image: "/placeholder.svg?height=200&width=400",
      },
    ],
    publishStatus: "draft",
  },
]


type Params = {
  id: string;
};

export default function EditProjectPage({ params }: { params: Promise<Params> }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [techInput, setTechInput] = useState("")
  const [categoryInput, setCategoryInput] = useState("")
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedFeatureIndex, setSelectedFeatureIndex] = useState<number | null>(null)
  const { id: projectId } = use(params)

  const [projectData, setProjectData] = useState({
    id: "",
    title: "",
    description: "",
    image: "/placeholder.svg?height=600&width=1200",
    status: "In Progress", // Completion status
    publishStatus: "draft", // Publication status
    client: "",
    startDate: "",
    technologies: [] as string[],
    categories: [] as string[],
    githubUrl: "",
    liveUrl: "",
    color: "primary",
    overview: "",
    features: [] as {
      title: string
      description: string
      image: string
    }[],
  })

  // Fetch project data on component mount
  useEffect(() => {
    const fetchProject = async () => {
      try {
        // In a real app, this would be an API call
        const project = projectsData.find((p) => p.id === projectId)

        if (project) {
          setProjectData(project)
        } else {
          // Project not found, redirect to projects page
          alert("Project not found")
          router.push("/projects")
        }
      } catch (error) {
        console.error("Error fetching project:", error)
        alert("Failed to load project data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProject()
  }, [projectId, router])

  // Update selected feature index when switching to features tab or when features change
  useEffect(() => {
    if (activeTab === "features" && projectData.features.length > 0 && selectedFeatureIndex === null) {
      setSelectedFeatureIndex(0)
    } else if (activeTab === "features" && projectData.features.length === 0) {
      setSelectedFeatureIndex(null)
    } else if (
      activeTab === "features" &&
      selectedFeatureIndex !== null &&
      selectedFeatureIndex >= projectData.features.length
    ) {
      setSelectedFeatureIndex(projectData.features.length - 1)
    } else if (activeTab !== "features") {
      setSelectedFeatureIndex(null)
    }
  }, [activeTab, projectData.features.length, selectedFeatureIndex])

  const validateForm = () => {
    const errors: Record<string, string> = {}

    // Basic fields validation
    if (!projectData.title.trim()) {
      errors.title = "Title is required"
    }

    if (!projectData.description.trim()) {
      errors.description = "Description is required"
    }

    if (!projectData.client.trim()) {
      errors.client = "Client is required"
    }

    if (!projectData.startDate.trim()) {
      errors.startDate = "Start date is required"
    }

    if (!projectData.overview.trim()) {
      errors.overview = "Overview is required"
    }

    if (projectData.technologies.length === 0) {
      errors.technologies = "At least one technology is required"
    }

    if (projectData.categories.length === 0) {
      errors.categories = "At least one category is required"
    }

    if (!projectData.githubUrl.trim()) {
      errors.githubUrl = "GitHub URL is required"
    }

    if (!projectData.liveUrl.trim()) {
      errors.liveUrl = "Live URL is required"
    }

    // Features validation
    if (projectData.features.length === 0) {
      errors.features = "At least one feature is required"
    } else {
      projectData.features.forEach((feature, index) => {
        if (!feature.title.trim()) {
          errors[`feature-${index}-title`] = "Feature title is required"
        }
        if (!feature.description.trim()) {
          errors[`feature-${index}-description`] = "Feature description is required"
        }
      })
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleAddTechnology = () => {
    if (techInput.trim() && !projectData.technologies.includes(techInput.trim())) {
      setProjectData({
        ...projectData,
        technologies: [...projectData.technologies, techInput.trim()],
      })
      setTechInput("")
    }
  }

  const handleRemoveTechnology = (tech: string) => {
    setProjectData({
      ...projectData,
      technologies: projectData.technologies.filter((t) => t !== tech),
    })
  }

  const handleTechKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTechnology()
    }
  }

  const handleAddCategory = () => {
    if (categoryInput.trim() && !projectData.categories.includes(categoryInput.trim())) {
      setProjectData({
        ...projectData,
        categories: [...projectData.categories, categoryInput.trim()],
      })
      setCategoryInput("")
    }
  }

  const handleRemoveCategory = (category: string) => {
    setProjectData({
      ...projectData,
      categories: projectData.categories.filter((c) => c !== category),
    })
  }

  const handleCategoryKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddCategory()
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field = "image", featureIndex?: number) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File too large. Image must be less than 5MB")
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string

        if (field === "image") {
          setProjectData({
            ...projectData,
            image: imageUrl,
          })
        } else if (field === "featureImage" && typeof featureIndex === "number") {
          const updatedFeatures = [...projectData.features]
          updatedFeatures[featureIndex] = { ...updatedFeatures[featureIndex], image: imageUrl }
          setProjectData({ ...projectData, features: updatedFeatures })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFeatureChange = (index: number, field: string, value: string) => {
    const updatedFeatures = [...projectData.features]
    updatedFeatures[index] = { ...updatedFeatures[index], [field]: value }
    setProjectData({ ...projectData, features: updatedFeatures })
  }

  const handleAddFeature = () => {
    const newFeature = {
      title: "",
      description: "",
      image: "/placeholder.svg?height=200&width=400",
    }

    setProjectData({
      ...projectData,
      features: [...projectData.features, newFeature],
    })

    // Select the newly added feature
    setSelectedFeatureIndex(projectData.features.length)
  }

  const handleRemoveFeature = (index: number) => {
    const updatedFeatures = [...projectData.features]
    updatedFeatures.splice(index, 1)
    setProjectData({ ...projectData, features: updatedFeatures })

    // Update selected feature index if needed
    if (selectedFeatureIndex === index) {
      if (updatedFeatures.length > 0) {
        setSelectedFeatureIndex(Math.min(index, updatedFeatures.length - 1))
      } else {
        setSelectedFeatureIndex(null)
      }
    } else if (selectedFeatureIndex !== null && selectedFeatureIndex > index) {
      setSelectedFeatureIndex(selectedFeatureIndex - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorElement = document.querySelector('[class*="border-red-500"]')
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: "smooth", block: "center" })
      }

      alert("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    try {
      // Just log the project data to console
      console.log("Project data updated:", projectData)

      // Show success message
      alert("Project updated successfully! Check the console for details.")

      setIsSubmitting(false)
    } catch (error) {
      console.error("Error updating project:", error)
      alert("Failed to update project. Please try again.")
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
    <div className="space-y-6 w-full mx-auto px-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <button
            className="p-2 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Edit Project</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-4">
            {/* Completion Status Toggle */}
            <div className="flex items-center space-x-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={projectData.status === "Completed"}
                  onChange={(e) =>
                    setProjectData({
                      ...projectData,
                      status: e.target.checked ? "Completed" : "In Progress",
                    })
                  }
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                <span className="ml-3 text-sm font-medium">{projectData.status}</span>
              </label>
            </div>

            {/* Publication Status Toggle */}
            <div className="flex items-center space-x-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={projectData.publishStatus === "published"}
                  onChange={(e) =>
                    setProjectData({
                      ...projectData,
                      publishStatus: e.target.checked ? "published" : "draft",
                    })
                  }
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                <span className="ml-3 text-sm font-medium capitalize">{projectData.publishStatus}</span>
              </label>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
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
          </button>
        </div>
      </div>

      <div className="flex space-x-2 border-b">
        <button
          className={`px-4 py-2 font-medium text-sm ${activeTab === "overview" ? "text-primary border-b-2 border-primary" : "text-gray-500 hover:text-gray-700"}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${activeTab === "features" ? "text-primary border-b-2 border-primary" : "text-gray-500 hover:text-gray-700"}`}
          onClick={() => setActiveTab("features")}
        >
          Features
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {activeTab === "overview" && (
            <div className=" rounded-lg border border-gray-200 shadow-sm p-6 space-y-6">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label htmlFor="title" className="flex items-center text-sm font-medium">
                    Project Title <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    id="title"
                    placeholder="Enter project title"
                    value={projectData.title}
                    onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                    className={`w-full bg-transparent px-3 py-2 border ${formErrors.title ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                  />
                  {formErrors.title && <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="flex items-center text-sm font-medium">
                    Description <span className="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    id="description"
                    placeholder="Enter project description"
                    rows={4}
                    value={projectData.description}
                    onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                    className={`w-full bg-transparent px-3 py-2 border ${formErrors.description ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                  />
                  {formErrors.description && <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="client" className="flex items-center text-sm font-medium">
                      Client <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      id="client"
                      placeholder="Client name"
                      value={projectData.client}
                      onChange={(e) => setProjectData({ ...projectData, client: e.target.value })}
                      className={`w-full bg-transparent px-3 py-2 border ${formErrors.client ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      required
                    />
                    {formErrors.client && <p className="text-red-500 text-sm mt-1">{formErrors.client}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="startDate" className="flex items-center text-sm font-medium">
                      Start Date <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      id="startDate"
                      type="date"
                      value={projectData.startDate}
                      onChange={(e) => setProjectData({ ...projectData, startDate: e.target.value })}
                      className={`w-full bg-transparent px-3 py-2 border ${formErrors.startDate ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      required
                    />
                    {formErrors.startDate && <p className="text-red-500 text-sm mt-1">{formErrors.startDate}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="color" className="flex items-center text-sm font-medium">
                      Color Theme <span className="text-red-500 ml-1">*</span>
                    </label>
                    <select
                      id="color"
                      value={projectData.color}
                      onChange={(e) => setProjectData({ ...projectData, color: e.target.value })}
                      className="w-full bg-transparent px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select a color</option>
                      <option value="primary">Purple</option>
                      <option value="gold">Gold</option>
                      <option value="teal">Teal</option>
                      <option value="coral">Coral</option>
                      <option value="lavender">Lavender</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="githubUrl" className="flex items-center text-sm font-medium">
                      GitHub URL <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      id="githubUrl"
                      placeholder="https://github.com/username/repo"
                      value={projectData.githubUrl}
                      onChange={(e) => setProjectData({ ...projectData, githubUrl: e.target.value })}
                      className={`w-full bg-transparent px-3 py-2 border ${formErrors.githubUrl ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      required
                    />
                    {formErrors.githubUrl && <p className="text-red-500 text-sm mt-1">{formErrors.githubUrl}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="liveUrl" className="flex items-center text-sm font-medium">
                      Live URL <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      id="liveUrl"
                      placeholder="https://your-project.com"
                      value={projectData.liveUrl}
                      onChange={(e) => setProjectData({ ...projectData, liveUrl: e.target.value })}
                      className={`w-full bg-transparent px-3 py-2 border ${formErrors.liveUrl ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      required
                    />
                    {formErrors.liveUrl && <p className="text-red-500 text-sm mt-1">{formErrors.liveUrl}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="overview" className="flex items-center text-sm font-medium">
                    Overview <span className="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    id="overview"
                    placeholder="Detailed project overview"
                    rows={6}
                    value={projectData.overview}
                    onChange={(e) => setProjectData({ ...projectData, overview: e.target.value })}
                    className={`w-full bg-transparent px-3 py-2 border ${formErrors.overview ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                  />
                  {formErrors.overview && <p className="text-red-500 text-sm mt-1">{formErrors.overview}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="technologies" className="flex items-center text-sm font-medium">
                    Technologies <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      id="technologies"
                      placeholder="Add a technology"
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      onKeyDown={handleTechKeyDown}
                      className={`w-full bg-transparent px-3 py-2 border ${formErrors.technologies ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    <button
                      type="button"
                      onClick={handleAddTechnology}
                      className="p-2 bg-primary text-white rounded-md hover:bg-primary transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {projectData.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {tech}
                        <button
                          type="button"
                          onClick={() => handleRemoveTechnology(tech)}
                          className="ml-1 text-blue-500 hover:text-blue-700"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  {formErrors.technologies && <p className="text-red-500 text-sm mt-1">{formErrors.technologies}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="categories" className="flex items-center text-sm font-medium">
                    Categories <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      id="categories"
                      placeholder="Add a category"
                      value={categoryInput}
                      onChange={(e) => setCategoryInput(e.target.value)}
                      onKeyDown={handleCategoryKeyDown}
                      className={`w-full bg-transparent px-3 py-2 border ${formErrors.categories ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    <button
                      type="button"
                      onClick={handleAddCategory}
                      className="p-2 bg-primary text-white rounded-md hover:bg-primary transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {projectData.categories.map((category, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                      >
                        {category}
                        <button
                          type="button"
                          onClick={() => handleRemoveCategory(category)}
                          className="ml-1 text-green-500 hover:text-green-700"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  {formErrors.categories && <p className="text-red-500 text-sm mt-1">{formErrors.categories}</p>}
                </div>
              </form>
            </div>
          )}

          {activeTab === "features" && (
            <div className=" rounded-lg border border-gray-200 shadow-sm p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Project Features</h2>
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="flex items-center px-3 py-1.5 text-sm bg-primary text-white rounded-md hover:bg-primary transition-colors"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Feature
                </button>
              </div>

              {formErrors.features && (
                <p className="text-red-500 text-sm mt-1 p-2 bg-red-50 rounded-md">{formErrors.features}</p>
              )}

              {projectData.features.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <p className="text-gray-500">No features added yet. Click "Add Feature" to get started.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {projectData.features.map((feature, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setSelectedFeatureIndex(index)}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${selectedFeatureIndex === index
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                      >
                        {feature.title || `Feature ${index + 1}`}
                      </button>
                    ))}
                  </div>

                  {selectedFeatureIndex !== null && (
                    <div className="p-4 border border-gray-200 rounded-lg relative">
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(selectedFeatureIndex)}
                        className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="feature-title" className="flex items-center text-sm font-medium mb-1">
                            Feature Title <span className="text-red-500 ml-1">*</span>
                          </label>
                          <input
                            id="feature-title"
                            value={projectData.features[selectedFeatureIndex].title}
                            onChange={(e) => handleFeatureChange(selectedFeatureIndex, "title", e.target.value)}
                            className={`w-full bg-transparent px-3 py-2 border ${formErrors[`feature-${selectedFeatureIndex}-title`] ? "border-red-500" : "border-gray-300"
                              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            placeholder="Feature title"
                            required
                          />
                          {formErrors[`feature-${selectedFeatureIndex}-title`] && (
                            <p className="text-red-500 text-sm mt-1">
                              {formErrors[`feature-${selectedFeatureIndex}-title`]}
                            </p>
                          )}
                        </div>
                        <div>
                          <label htmlFor="feature-desc" className="flex items-center text-sm font-medium mb-1">
                            Feature Description <span className="text-red-500 ml-1">*</span>
                          </label>
                          <textarea
                            id="feature-desc"
                            value={projectData.features[selectedFeatureIndex].description}
                            onChange={(e) => handleFeatureChange(selectedFeatureIndex, "description", e.target.value)}
                            className={`w-full bg-transparent px-3 py-2 border ${formErrors[`feature-${selectedFeatureIndex}-description`]
                              ? "border-red-500"
                              : "border-gray-300"
                              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            placeholder="Feature description"
                            rows={3}
                            required
                          />
                          {formErrors[`feature-${selectedFeatureIndex}-description`] && (
                            <p className="text-red-500 text-sm mt-1">
                              {formErrors[`feature-${selectedFeatureIndex}-description`]}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-6">
          {activeTab === "overview" && (
            <>
              <div className="rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="space-y-4">
                  <label className="block text-sm font-medium">
                    Featured Image <span className="text-red-500">*</span>
                  </label>
                  <div className="relative rounded-lg overflow-hidden">
                    <img
                      src={projectData.image || "/placeholder.svg"}
                      alt="Project preview"
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="main-image-upload"
                        onChange={(e) => handleImageUpload(e, "image")}
                      />
                      <label
                        htmlFor="main-image-upload"
                        className="bg-primary text-white hover:bg-primary px-4 py-2 rounded-md text-sm cursor-pointer transition-colors"
                      >
                        Change Image
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Project Preview</h3>
                  <div className="rounded-lg overflow-hidden border border-gray-200">
                    <div className=" flex flex-col">
                      <div className="aspect-video bg-gray-200 relative overflow-hidden">
                        <img
                          src={projectData.image || "/placeholder.svg"}
                          alt="Project preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-bold text-lg">{projectData.title || "Project Title"}</h3>
                          <div className="flex space-x-2">
                            <span className="px-2 py-0.5 text-xs rounded-full capitalize bg-gray-100 text-gray-800">
                              {projectData.publishStatus}
                            </span>
                            <span
                              className={`px-2 py-0.5 text-xs rounded-full capitalize ${projectData.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                                }`}
                            >
                              {projectData.status}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {projectData.description || "Project description will appear here"}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-1">
                          {projectData.technologies.slice(0, 3).map((tech, i) => (
                            <span key={i} className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                              {tech}
                            </span>
                          ))}
                          {projectData.technologies.length > 3 && (
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded-full">
                              +{projectData.technologies.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "features" && selectedFeatureIndex !== null && (
            <>
              <div className=" rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="space-y-4">
                  <label className="block text-sm font-medium">
                    Feature Image <span className="text-red-500">*</span>
                  </label>
                  <div className="relative rounded-lg overflow-hidden">
                    <img
                      src={projectData.features[selectedFeatureIndex].image || "/placeholder.svg"}
                      alt="Feature preview"
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id={`feature-image-upload-${selectedFeatureIndex}`}
                        onChange={(e) => handleImageUpload(e, "featureImage", selectedFeatureIndex)}
                      />
                      <label
                        htmlFor={`feature-image-upload-${selectedFeatureIndex}`}
                        className="bg-primary text-white hover:bg-primary px-4 py-2 rounded-md text-sm cursor-pointer transition-colors"
                      >
                        Change Image
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Feature Preview</h3>
                  <div className="rounded-lg overflow-hidden border border-gray-200">
                    <div className=" flex flex-col">
                      <div className="aspect-video bg-gray-200 relative overflow-hidden">
                        <img
                          src={projectData.features[selectedFeatureIndex].image || "/placeholder.svg"}
                          alt="Feature preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg">
                          {projectData.features[selectedFeatureIndex].title || "Feature Title"}
                        </h3>
                        <p className="text-sm text-gray-500 mt-2">
                          {projectData.features[selectedFeatureIndex].description ||
                            "Feature description will appear here"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
