import { Recommendation } from './recommendation.js';
import { RecommendationAPI } from './recommendation.api.js';

export default class RecommendationGenerator {
  async generateNewRecommendations(
    count: number = 5,
    allergens: string[],
    likes: string[],
    dislikes: string[],
    flavourProfile: string[]
  ): Promise<string[]> {
    try {
      const api = new RecommendationAPI();
      const cocktailIds: string[] = await api.getRecommended(count, allergens, likes, dislikes, flavourProfile);
      return cocktailIds.map((cocktailId: string): string => { return cocktailId }  )
    } catch (error) {
      console.error(`Failed to generate recommended cocktails. ${error.message}`)
      return [];
    }
  }

  async reviewRecommendation(review: Required<Recommendation>): Promise<void> {
    const api = new RecommendationAPI();
    await api.submitReview(review);

    return;
  }
}
 