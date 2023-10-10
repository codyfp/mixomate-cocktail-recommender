import axios, { AxiosInstance } from "axios";
import { Cocktail } from "../cocktails/cocktail.dto.js";
import { Recommendation } from "./recommendation.js";

export class RecommendationAPI {
  private _httpClient: AxiosInstance;

  constructor() {
    this._httpClient = axios.create({ 
      baseURL: 'http://localhost:5000/api/recommendations',
      headers: { "Content-Type": "application/json" },
    })
  }

  public async getRecommended(userId: string, count: number = 5): Promise<Cocktail[]> {
    try {
      const requestBody = { userId, count }
      const response = await this._httpClient.post('', requestBody)
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

  public async submitReview(review: Required<Recommendation>): Promise<void> {
    try {
      const response = await this._httpClient.post('', review)
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
