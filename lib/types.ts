export type ProjectFeature = {
  title: string;
  description: string;
  image: string;
};

export type Project = {
  title: string;
  description: string;
  image: string;
  status: string;
  startDate: string; 
  technologies: string[];
  categories: string[];
  githubUrl: string;
  liveUrl: string;
  color: string; 
  overview: string;
  features: ProjectFeature[];
  publishStatus: string; 
};


 export type projectState = {
    projects: Project[];
    isLoadingProjects: boolean;
    fetchProjects: ()=> Promise<void>;
  };