import { NextRequest } from "next/server";
import dbConnect from "@/lib/db";
import ProjectModel from "@/app/models/projects";
import { Project } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const projectData: Project = await req.json();

    const entry = new ProjectModel(projectData);
    await entry.save();

    return Response.json(entry);
  } catch (err) {
    console.error("POST project error:", err);
    return new Response("Failed to save project", { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();

    const entries: Project[] = await ProjectModel.find().sort({ createdAt: -1 });

    return Response.json(entries);
  } catch (err) {
    console.error("GET projects error:", err);
    return new Response("Failed to fetch projects", { status: 500 });
  }
}
