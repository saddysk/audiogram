import { env } from "@/env.mjs";
import axios from "axios";

export const uploadFileToCloudinary = async (file: File): Promise<string> => {
  if (!file) {
    alert("Please select an audio file.");
    return "";
  }

  const URL = `https://api.cloudinary.com/v1_1/${env.NEXT_PUBLIC_CLOUD_NAME}/raw/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", env.NEXT_PUBLIC_API_KEY);
  formData.append("upload_preset", env.NEXT_PUBLIC_UPLOAD_PRESET);

  const response = await axios.post(URL, formData);

  if (response.status !== 200) {
    return "";
  }

  return response.data.url;
};
