"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Code, Server, Database, Cloud, Cpu, Globe } from "lucide-react"

interface Feature {
  title: string
  description: string
}

interface TechStackItem {
  name: string
  icon: string
}

interface Challenge {
  title: string
  description: string
  solution: string
}

interface ProjectFormTabsProps {
  features?: Feature[]
  techStack?: TechStackItem[]
  challenges?: Challenge[]
  onFeaturesChange?: (features: Feature[]) => void
  onTechStackChange?: (techStack: TechStackItem[]) => void
  onChallengesChange?: (challenges: Challenge[]) => void
}

export default function ProjectFormTabs({
  features = [{ title: "", description: "" }],
  techStack = [{ name: "", icon: "" }],
  challenges = [{ title: "", description: "", solution: "" }],
  onFeaturesChange,
  onTechStackChange,
  onChallengesChange,
}: ProjectFormTabsProps) {
  const [activeTab, setActiveTab] = useState("features")
  const [localFeatures, setLocalFeatures] = useState<Feature[]>(features)
  const [localTechStack, setLocalTechStack] = useState<TechStackItem[]>(techStack)
  const [localChallenges, setLocalChallenges] = useState<Challenge[]>(challenges)

  // Features tab functions
  const handleAddFeature = () => {
    const newFeatures = [...localFeatures, { title: "", description: "" }]
    setLocalFeatures(newFeatures)
    if (onFeaturesChange) onFeaturesChange(newFeatures)
  }

  const handleRemoveFeature = (index: number) => {
    if (localFeatures.length === 1) return
    const newFeatures = localFeatures.filter((_, i) => i !== index)
    setLocalFeatures(newFeatures)
    if (onFeaturesChange) onFeaturesChange(newFeatures)
  }

  const handleFeatureChange = (index: number, field: keyof Feature, value: string) => {
    const newFeatures = [...localFeatures]
    newFeatures[index][field] = value
    setLocalFeatures(newFeatures)
    if (onFeaturesChange) onFeaturesChange(newFeatures)
  }

  // Tech stack tab functions
  const handleAddTechItem = () => {
    const newTechStack = [...localTechStack, { name: "", icon: "" }]
    setLocalTechStack(newTechStack)
    if (onTechStackChange) onTechStackChange(newTechStack)
  }

  const handleRemoveTechItem = (index: number) => {
    if (localTechStack.length === 1) return
    const newTechStack = localTechStack.filter((_, i) => i !== index)
    setLocalTechStack(newTechStack)
    if (onTechStackChange) onTechStackChange(newTechStack)
  }

  const handleTechItemChange = (index: number, field: keyof TechStackItem, value: string) => {
    const newTechStack = [...localTechStack]
    newTechStack[index][field] = value
    setLocalTechStack(newTechStack)
    if (onTechStackChange) onTechStackChange(newTechStack)
  }

  // Challenges tab functions
  const handleAddChallenge = () => {
    const newChallenges = [...localChallenges, { title: "", description: "", solution: "" }]
    setLocalChallenges(newChallenges)
    if (onChallengesChange) onChallengesChange(newChallenges)
  }

  const handleRemoveChallenge = (index: number) => {
    if (localChallenges.length === 1) return
    const newChallenges = localChallenges.filter((_, i) => i !== index)
    setLocalChallenges(newChallenges)
    if (onChallengesChange) onChallengesChange(newChallenges)
  }

  const handleChallengeChange = (index: number, field: keyof Challenge, value: string) => {
    const newChallenges = [...localChallenges]
    newChallenges[index][field] = value
    setLocalChallenges(newChallenges)
    if (onChallengesChange) onChallengesChange(newChallenges)
  }

  // Render icon based on name
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Code":
        return <Code className="h-4 w-4" />
      case "Server":
        return <Server className="h-4 w-4" />
      case "Database":
        return <Database className="h-4 w-4" />
      case "Cloud":
        return <Cloud className="h-4 w-4" />
      case "Cpu":
        return <Cpu className="h-4 w-4" />
      case "Globe":
        return <Globe className="h-4 w-4" />
      default:
        return <Code className="h-4 w-4" />
    }
  }

  // Handle tab change manually
  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-colors duration-300 shadow-md">
      <CardContent className="p-6">
        <Tabs defaultValue="features" value={activeTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="features" onClick={() => handleTabChange("features")}>
              Features
            </TabsTrigger>
            <TabsTrigger value="tech" onClick={() => handleTabChange("tech")}>
              Tech Stack
            </TabsTrigger>
            <TabsTrigger value="challenges" onClick={() => handleTabChange("challenges")}>
              Challenges
            </TabsTrigger>
          </TabsList>

          {/* Features Tab */}
          <TabsContent value="features" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Project Features</h3>
              <Button type="button" size="sm" onClick={handleAddFeature}>
                <Plus className="h-4 w-4 mr-2" />
                Add Feature
              </Button>
            </div>

            {localFeatures.map((feature, index) => (
              <div key={index} className="space-y-4 p-4 border border-border rounded-md relative">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                  onClick={() => handleRemoveFeature(index)}
                  disabled={localFeatures.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>

                <div className="space-y-2">
                  <Label htmlFor={`feature-title-${index}`}>Feature Title</Label>
                  <Input
                    id={`feature-title-${index}`}
                    placeholder="Enter feature title"
                    value={feature.title}
                    onChange={(e) => handleFeatureChange(index, "title", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`feature-description-${index}`}>Description</Label>
                  <Textarea
                    id={`feature-description-${index}`}
                    placeholder="Enter feature description"
                    rows={3}
                    value={feature.description}
                    onChange={(e) => handleFeatureChange(index, "description", e.target.value)}
                  />
                </div>
              </div>
            ))}
          </TabsContent>

          {/* Tech Stack Tab */}
          <TabsContent value="tech" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Technology Stack</h3>
              <Button type="button" size="sm" onClick={handleAddTechItem}>
                <Plus className="h-4 w-4 mr-2" />
                Add Technology
              </Button>
            </div>

            {localTechStack.map((item, index) => (
              <div key={index} className="space-y-4 p-4 border border-border rounded-md relative">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                  onClick={() => handleRemoveTechItem(index)}
                  disabled={localTechStack.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`tech-name-${index}`}>Technology Name</Label>
                    <Input
                      id={`tech-name-${index}`}
                      placeholder="e.g. React, Node.js, MongoDB"
                      value={item.name}
                      onChange={(e) => handleTechItemChange(index, "name", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`tech-icon-${index}`}>Icon</Label>
                    <Select value={item.icon} onValueChange={(value) => handleTechItemChange(index, "icon", value)}>
                      <SelectTrigger id={`tech-icon-${index}`}>
                        <SelectValue placeholder="Select icon">
                          {item.icon && (
                            <div className="flex items-center">
                              {renderIcon(item.icon)}
                              <span className="ml-2">{item.icon}</span>
                            </div>
                          )}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Code">
                          <div className="flex items-center">
                            <Code className="h-4 w-4 mr-2" />
                            Code
                          </div>
                        </SelectItem>
                        <SelectItem value="Server">
                          <div className="flex items-center">
                            <Server className="h-4 w-4 mr-2" />
                            Server
                          </div>
                        </SelectItem>
                        <SelectItem value="Database">
                          <div className="flex items-center">
                            <Database className="h-4 w-4 mr-2" />
                            Database
                          </div>
                        </SelectItem>
                        <SelectItem value="Cloud">
                          <div className="flex items-center">
                            <Cloud className="h-4 w-4 mr-2" />
                            Cloud
                          </div>
                        </SelectItem>
                        <SelectItem value="Cpu">
                          <div className="flex items-center">
                            <Cpu className="h-4 w-4 mr-2" />
                            CPU
                          </div>
                        </SelectItem>
                        <SelectItem value="Globe">
                          <div className="flex items-center">
                            <Globe className="h-4 w-4 mr-2" />
                            Globe
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          {/* Challenges Tab */}
          <TabsContent value="challenges" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Project Challenges</h3>
              <Button type="button" size="sm" onClick={handleAddChallenge}>
                <Plus className="h-4 w-4 mr-2" />
                Add Challenge
              </Button>
            </div>

            {localChallenges.map((challenge, index) => (
              <div key={index} className="space-y-4 p-4 border border-border rounded-md relative">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                  onClick={() => handleRemoveChallenge(index)}
                  disabled={localChallenges.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>

                <div className="space-y-2">
                  <Label htmlFor={`challenge-title-${index}`}>Challenge Title</Label>
                  <Input
                    id={`challenge-title-${index}`}
                    placeholder="Enter challenge title"
                    value={challenge.title}
                    onChange={(e) => handleChallengeChange(index, "title", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`challenge-description-${index}`}>Description</Label>
                  <Textarea
                    id={`challenge-description-${index}`}
                    placeholder="Describe the challenge"
                    rows={2}
                    value={challenge.description}
                    onChange={(e) => handleChallengeChange(index, "description", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`challenge-solution-${index}`}>Solution</Label>
                  <Textarea
                    id={`challenge-solution-${index}`}
                    placeholder="How did you solve this challenge?"
                    rows={3}
                    value={challenge.solution}
                    onChange={(e) => handleChallengeChange(index, "solution", e.target.value)}
                  />
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
