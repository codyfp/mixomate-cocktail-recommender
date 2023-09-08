import axios, { AxiosInstance } from "axios";

export class MixoMateApi {
  protected client: AxiosInstance;

  constructor(resource: string) {

    // Remove trailing forward slash
    let trimmedResource: string;
    if (resource.charAt( 0 ) === '/' ) {
      trimmedResource = resource.slice( 1 );
    } else {
      trimmedResource = resource;
    }

    const clientBaseURL = `http://localhost:4000/${resource}`

    this.client = axios.create({
      baseURL: clientBaseURL,
      headers: { "Content-Type": "application/json" },
    });
  }

  async get(url: string) {
    try {
      const response = await this.client.get(url)
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error))  {
        // Access to config, request, and response
        throw new Error(error.response?.data)
      } else if (error instanceof Error) {
        // Just a stock error
        throw new Error(error.message)
      } else {
        // unknown error
        throw new Error()
      }
    }
  }

  async post(url: string, body: unknown) {
    try {
      const response = await this.client.post(url, body)
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error))  {
        // Access to config, request, and response
        throw new Error(error.response?.data)
      } else if (error instanceof Error) {
        // Just a stock error
        throw new Error(error.message)
      } else {
        // unknown error
        throw new Error()
      }
    }
  }
}