"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FolderPlus, MoreHorizontal, Search, Edit, Trash2, Eye, ArrowUpDown, Filter } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import DeleteProjectModal from "@/components/admin/delete-project-modal"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Project } from "@/lib/types"
import { deleteProject } from "@/lib/services/projectService"


export default function Projects({ projects, isLoadingProjects }: { projects: Project[], isLoadingProjects: boolean }) {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("")
    const [sortField, setSortField] = useState("date")
    const [sortDirection, setSortDirection] = useState("desc")
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [projectToDelete, setProjectToDelete] = useState<string | null>(null)
    const [deleting, setDeleting] = useState(false)



    const handleSort = (field: string) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortField(field)
            setSortDirection("asc")
        }
    }

    const sortedProjects = Array.isArray(projects)
        ? [...projects].sort((a, b) => {
            if (sortField === "title") {
                return sortDirection === "asc"
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title)
            } else if (sortField === "date") {
                return sortDirection === "asc"
                    ? new Date(a.createdAt ?? "").getTime() - new Date(b.createdAt ?? "").getTime()
                    : new Date(b.createdAt ?? "").getTime() - new Date(a.createdAt ?? "").getTime()
            } else if (sortField === "status") {
                return sortDirection === "asc"
                    ? a.status.localeCompare(b.status)
                    : b.status.localeCompare(a.status)
            }
            return 0
        })
        : []



    const filteredProjects = sortedProjects.filter(
        (project) =>
            project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.categories.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
    )

    const handleDeleteClick = (id: string) => {
        setProjectToDelete(id)
        setDeleteModalOpen(true)
    }

    const handleDeleteConfirm = async () => {
        if (projectToDelete) {
            const result = await deleteProject(projectToDelete);
            if (result.success) {
                alert("Deleted!");
            } else {
                alert("Error: " + result.message);
            }
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "published":
                return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
            case "draft":
                return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Projects</h1>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search projects..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="sm:hidden">
                            <Filter className="h-4 w-4" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <SheetHeader>
                            <SheetTitle>Filter Projects</SheetTitle>
                        </SheetHeader>
                        <div className="py-4 space-y-4">
                            <div className="space-y-2">
                                <h3 className="text-sm font-medium">Status</h3>
                                <div className="flex flex-wrap gap-2">
                                    <Badge
                                        variant="outline"
                                        className="cursor-pointer hover:bg-muted"
                                        onClick={() => console.log("Filter by published")}
                                    >
                                        Published
                                    </Badge>
                                    <Badge
                                        variant="outline"
                                        className="cursor-pointer hover:bg-muted"
                                        onClick={() => console.log("Filter by draft")}
                                    >
                                        Draft
                                    </Badge>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-sm font-medium">Category</h3>
                                <div className="flex flex-wrap gap-2">
                                    <Badge
                                        variant="outline"
                                        className="cursor-pointer hover:bg-muted"
                                        onClick={() => console.log("Filter by Web App")}
                                    >
                                        Web App
                                    </Badge>
                                    <Badge
                                        variant="outline"
                                        className="cursor-pointer hover:bg-muted"
                                        onClick={() => console.log("Filter by Mobile")}
                                    >
                                        Mobile
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            <div className="rounded-lg border shadow-sm overflow-hidden bg-card/50 backdrop-blur-sm">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[250px] md:w-[300px]">
                                    <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("title")}>
                                        Project
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </TableHead>
                                <TableHead className="hidden md:table-cell">Category</TableHead>
                                <TableHead className="hidden lg:table-cell">Tags</TableHead>
                                <TableHead>
                                    <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("status")}>
                                        Status
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </TableHead>
                                <TableHead className="hidden sm:table-cell">
                                    <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("date")}>
                                        Date
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoadingProjects ? (
                                // Loading skeleton
                                Array.from({ length: 5 }).map((_, i) => (
                                    <TableRow key={i}>
                                        <TableCell>
                                            <div className="h-6 w-48 bg-muted animate-pulse rounded"></div>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            <div className="h-6 w-24 bg-muted animate-pulse rounded"></div>
                                        </TableCell>
                                        <TableCell className="hidden lg:table-cell">
                                            <div className="h-6 w-32 bg-muted animate-pulse rounded"></div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="h-6 w-20 bg-muted animate-pulse rounded"></div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <div className="h-6 w-24 bg-muted animate-pulse rounded"></div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="h-8 w-8 bg-muted animate-pulse rounded-full ml-auto"></div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : filteredProjects.length > 0 ? (
                                filteredProjects.map((project) => (
                                    <TableRow key={project._id}>
                                        <TableCell>
                                            <div>
                                                <p className="font-medium">{project.title}</p>
                                                <p className="text-sm text-muted-foreground truncate max-w-[250px] md:max-w-[300px]">
                                                    {project.description}
                                                </p>
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">{project.categories[0]}</TableCell>
                                        <TableCell className="hidden lg:table-cell">
                                            <div className="flex flex-wrap gap-1">
                                                {project.categories.slice(0, 3).map((tag: string, i: number) => (
                                                    <Badge key={i} variant="outline" className="text-xs">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                                {project.categories.length > 3 && (
                                                    <Badge variant="outline" className="text-xs">
                                                        +{project.categories.length - 3}
                                                    </Badge>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={`${getStatusColor(project.status)}`}>
                                                {project.publishStatus === "published" ? "Published" : "Draft"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            {new Date(project.createdAt!).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem onClick={() => router.push(`/projects/${project._id}`)}>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        View
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => router.push(`/admin/projects/${project._id}`)}>
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="text-red-600 dark:text-red-400"
                                                        onClick={() => handleDeleteClick(project._id)}
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8">
                                        <div className="flex flex-col items-center justify-center">
                                            <Search className="h-8 w-8 text-muted-foreground mb-2" />
                                            <p className="text-muted-foreground">No projects found</p>
                                            <p className="text-sm text-muted-foreground">Try adjusting your search query</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <DeleteProjectModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
            />
        </div>
    )
}
