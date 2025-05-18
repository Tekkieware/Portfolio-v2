import { Project } from "../types";

// services/projectService.ts
export async function createProject(projectData: Project) {
  try {
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create project: ${response.statusText}`);
    }

    const savedProject = await response.json();
    return savedProject; 
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
}
