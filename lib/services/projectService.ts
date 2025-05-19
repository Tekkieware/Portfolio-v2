import { Project } from "../types";

export async function createProject(projectData: Partial<Project>) {
  try {
    const response = await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create project: ${response.statusText}`);
    }

    const savedProject = await response.json();
    return savedProject;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
}

export async function updateProject(id: string, updateData: Project) {
  try {
    const res = await fetch(`/api/projects/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }

    return await res.json();
  } catch (err) {
    console.error("Error updating project:", err);
    throw err;
  }
}


export async function deleteProject(id: string): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(`/api/projects/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const errorText = await res.text();
      return { success: false, message: errorText || "Failed to delete project" };
    }

    return { success: true, message: "Project deleted successfully" };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { success: false, message: "An error occurred while deleting the project" };
  }
}
