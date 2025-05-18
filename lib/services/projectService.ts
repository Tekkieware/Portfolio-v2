import { Project } from "../types";

export async function createProject(projectData: Project) {
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
