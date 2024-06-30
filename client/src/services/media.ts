import { Env } from "@/libs/Env.mjs";
import { handleResponse } from "./handle-response";
const apiUrl = Env?.NEXT_PUBLIC_API_URL

export async function fetchMedias(page: number, limit: number, type: string, search: string) {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    type: type,
    search: search
  });

  const response = await fetch(`${apiUrl}/api/scrape/media?${queryParams.toString()}`, {
    method: 'GET',
    credentials: 'include',
  });
  return await handleResponse(response);
}