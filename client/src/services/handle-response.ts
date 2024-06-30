export interface ApiError {
  message: string,
  error: string,
  statusCode: number
}
export async function handleResponse(response: Response): Promise<any | {api_error: ApiError}> {
  if (response.ok) {
    const data = await response.json() ?? {};
    data.responseOk = true;
    return data;
  } else {
    const data = await response.json()
    return data
  }
}