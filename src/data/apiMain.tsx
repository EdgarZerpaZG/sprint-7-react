import type { APIResponse } from "./apiTypes";

let API_URL: string | null = null;

async function resolveConfig() {
  if (API_URL) return API_URL;

  const { API_URL: url } = await import.meta.env.VITE_API_URL;
  API_URL = url;
  return API_URL;
}

export default async function getAPIResponse(): Promise<APIResponse | null> {
  try {
    const url = await resolveConfig();

    if (!url) {
      throw new Error("API_URL is not defined.");
    }

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error in the request: ${response.status}`);
    }

    const data: APIResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error retrieving information:", error);
    return null;
  }
}