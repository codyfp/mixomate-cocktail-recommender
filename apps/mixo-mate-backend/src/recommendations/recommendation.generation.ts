import { Recommendation } from './recommendation.js';
import { RecommendationAPI } from './recommendation.api.js';

export default class RecommendationGenerator {
  async generateNewRecommendations(userId: string, count: number = 5): Promise<Recommendation[]> {
    try {
      const api = new RecommendationAPI();
      const cocktailIds: string[] = await api.getRecommended(userId, count);
      return cocktailIds.map((cocktailId: string): Recommendation => { return { userId, cocktailId }}  )
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
 