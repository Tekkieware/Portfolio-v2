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

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const updateData = await req.json();

    const updatedProject = await ProjectModel.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return new Response("Project not found", { status: 404 });
    }

    return Response.json(updatedProject);
  } catch (err) {
    console.error("PATCH update project error:", err);
    return new Response("Failed to update project", { status: 500 });
  }
}
