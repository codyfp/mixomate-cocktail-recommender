import axios, { AxiosInstance } from "axios";
import { Recommendation } from "./recommendation.js";

export class RecommendationAPI {
  private _httpClient: AxiosInstance;

  constructor() {
    this._httpClient = axios.create({ 
      baseURL: 'http://recommendations:5000/api/recommendations',
    })
  }

  /**
   * Recommend N number of Cocktails
   * 
   * @param {number} count Number of cocktails to recommend
   * @param {string[]} allergens Allergens (ingredient IDs)
   * @param {string[]} likes Likes (ingredient IDs)
   * @param {string[]} dislikes Dislikes (ingredient IDs)
   * @param {string[]} flavourProfile Flavour Profiles
   * @returns {string[]} IDs of recommended cocktails
   */
  public async getRecommended(
    count: number = 5,
    allergens: string[],
    likes: string[],
    dislikes: string[],
    flavourProfile: string[]
  ): Promise<string[]> {
    try {
      const requestBody = { count, allergens, likes, dislikes, flavourProfile }
      const response = await this._httpClient.post('/', requestBody)

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
