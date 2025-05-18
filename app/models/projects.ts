import mongoose, { Schema, model, models } from 'mongoose';
import { Project, ProjectFeature } from '@/lib/types';

const FeatureSchema = new Schema<ProjectFeature>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
  },
  { _id: false } 
);

const ProjectSchema = new Schema<Project>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    status: { type: String, enum: ["Completed", "In Progress"], required: true },
    client: { type: String, required: true },
    startDate: { type: String, required: true },
    technologies: [{ type: String, required: true }],
    categories: [{ type: String, required: true }],
    githubUrl: { type: String, required: true },
    liveUrl: { type: String, required: true },
    color: { type: String, required: true },
    overview: { type: String, required: true },
    features: { type: [FeatureSchema], required: true },
    publishStatus: { type: String, enum: ["published", "draft"], required: true },
  },
  { timestamps: true }
);

const ProjectModel = models.Project || model<Project>('Project', ProjectSchema);
export default ProjectModel;
