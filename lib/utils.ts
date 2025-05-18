import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export const uploadFileToCloudinary = async (
  file: File,
  path: string
): Promise<string> => {
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/image/upload`;
  const uploadPreset = "portfolio";
  const folder = `portfolio/${path}`;

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);
    formData.append("upload_preset", uploadPreset);

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload file");
    }

    const data: { secure_url: string } = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

