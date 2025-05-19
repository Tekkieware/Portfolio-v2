"use client"
import { Code, Database, ExternalLink, Github } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { useRouter } from 'next/navigation'
import { Project } from '@/lib/types'
import Loader from './loader'


const ListProjectView = ({ projects, isLoadingProjects }: { projects: Project[], isLoadingProjects: boolean }) => {
    const router = useRouter()
    if (isLoadingProjects) {
        return <div className="container mx-auto px-4 min-h-52 min-w-full top-0 inset-0 bg-black/80 flex items-center justify-center z-50">
            <Loader text="LOADING PROJECTS" />
        </div>
    }
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <Card
                            key={project._id}
                            className={cn(
                                "overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300",
                            )}
                            onClick={() => router.push(`/projects/${project._id}`)}
                        >
                            <div className="h-48 overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10"></div>
                                <img
                                    src={project.image || "/placeholder.svg"}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                                />
                                <div className="absolute top-3 left-3 z-20">
                                    <Badge
                                        className={cn(
                                            "text-xs px-3 py-1 text-white rounded-md"
                                        )}
                                        style={{ backgroundColor: project.color }}
                                    >
                                        {project.categories[0]}
                                    </Badge>
                                </div>
                            </div>
                            <CardHeader className="pb-2">
                                <CardTitle
                                >
                                    {project.title}
                                </CardTitle>
                                <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.slice(0, 3).map((tag: string, i: number) => (
                                        <Badge
                                            key={i}
                                            variant="outline"
                                            className=' text-[10px]'
                                            style={{ color: project.color, borderColor: project.color }}
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                    {project.categories.length > 3 && (
                                        <Badge variant="outline" className="text-xs">
                                            +{project.categories.length - 3}
                                        </Badge>
                                    )}
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="group text-sm"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        window.open(project.githubUrl, "_blank", "noopener,noreferrer")
                                    }}
                                >
                                    <Github className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
                                    GitHub
                                </Button>
                                <Button
                                    size="sm"
                                    className={cn(
                                        "group relative overflow-hidden text-white text-sm"
                                    )}
                                    style={{ backgroundColor: project.color }}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        window.open(project.liveUrl, "_blank", "noopener,noreferrer")
                                    }}
                                >
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    Live Demo
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ListProjectView