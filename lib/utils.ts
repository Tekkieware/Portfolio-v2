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



export const hexToRgb = (hex: string) => {
  const normalizedHex = hex.replace("#", "");
  const bigint = parseInt(normalizedHex, 16);

  if (normalizedHex.length === 3) {
    const r = parseInt(normalizedHex[0] + normalizedHex[0], 16);
    const g = parseInt(normalizedHex[1] + normalizedHex[1], 16);
    const b = parseInt(normalizedHex[2] + normalizedHex[2], 16);
    return [r, g, b];
  }

  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
};