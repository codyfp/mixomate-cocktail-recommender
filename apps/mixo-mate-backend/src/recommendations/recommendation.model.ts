import { Cocktail } from '../cocktails/cocktail.dto.js';
import { CocktailReview } from './review.dto.js';

export default class RecommendationModel {
  constructor() {
  }

  getRecommendedForUser(userId: string): Cocktail[] {
    // TODO: Get recommended cocktails for user from Recommendation ML model
    return [];
  }

  reviewRecommendation(review: CocktailReview): void {
    // Use cocktail review to adjust ML model
    return;
  }
}
 