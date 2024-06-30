import { Env } from "@/libs/Env.mjs";
const apiUrl = Env?.NEXT_PUBLIC_API_URL
import { handleResponse } from "./handle-response";

export async function loginApi(data: {
  email: string,
  password: string
}) {
  const response = await fetch(`${apiUrl}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',

    },
    credentials: 'include',
    body: JSON.stringify(data)
  });
  return await handleResponse(response);
}
