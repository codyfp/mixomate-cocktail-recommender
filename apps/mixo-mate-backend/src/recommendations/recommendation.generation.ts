import { Cocktail } from '../cocktails/cocktail.dto.js';
import { Recommendation } from './recommendation.js';
import { RecommendationAPI } from './recommendation.api.js';

export default class RecommendationGenerator {
  async generateNewRecommendations(userId: string, count: number = 5): Promise<Recommendation[]> {
    const api = new RecommendationAPI();

    try {
      const recommendedCocktails: Cocktail[] = await api.getRecommended(userId, count);
      return recommendedCocktails.map((cocktail: Cocktail): Recommendation => {
        return { 
          userId: userId, 
          cocktailId: cocktail.id
        }
      })

    } catch (error) {
      return [];
    }
  }

  async reviewRecommendation(review: Required<Recommendation>): Promise<void> {
    const api = new RecommendationAPI();
    await api.submitReview(review);

    return;
  }

  private _recordToRecommendation(doc): Recommendation {
    const obj = {
      userId: doc.userId,
      cocktailId: doc.cocktailId
    }

    if (doc.rating) {
      obj['rating'] = doc.rating;
    }

    return obj
  }
}
 