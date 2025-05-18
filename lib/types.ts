type ProjectFeature = {
  title: string;
  description: string;
  image: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  status: string;
  client: string;
  startDate: string; 
  technologies: string[];
  categories: string[];
  githubUrl: string;
  liveUrl: string;
  color: string; 
  overview: string;
  features: ProjectFeature[];
  publishStatus: "published" | "draft" | "archived"; 
};


 export type projectState = {
    projects: Project[];
    isLoadingProjects: boolean;
    fetchProjects: ()=> Promise<void>;
  };