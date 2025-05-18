import { NextRequest } from "next/server";
import dbConnect from "@/lib/db";
import ProjectModel from "@/app/models/projects";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const project = await ProjectModel.findById(params.id);

    if (!project) {
      return new Response("Project not found", { status: 404 });
    }

    return Response.json(project);
  } catch (err) {
    console.error("GET single project error:", err);
    return new Response("Failed to fetch project", { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await dbConnect();

    const { params } = context;
    const {id} = await params

    if (!id) {
      return new Response("Project ID is missing in route params", { status: 400 });
    }

    const newProjectData = await req.json();

    // Remove _id if present to avoid immutable field issues
    if ("_id" in newProjectData) {
      delete newProjectData._id;
    }

    const updatedProject = await ProjectModel.findByIdAndUpdate(
      id,
      newProjectData,
      {
        new: true,
        runValidators: true,
        overwrite: true,
      }
    );

    if (!updatedProject) {
      return new Response("Project not found", { status: 404 });
    }

    return Response.json(updatedProject);
  } catch (err) {
    console.error("PUT update project error:", err);
    return new Response("Failed to update project", { status: 500 });
  }
}
