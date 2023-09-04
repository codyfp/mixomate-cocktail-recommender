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
}