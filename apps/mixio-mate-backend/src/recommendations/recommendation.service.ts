import { Cocktail } from "../cocktails/cocktail.dto.js";
import { CocktailReview } from "./review.dto.js";
import RecommendationModel from "./recommendation.model.js";

export class RecommendationService {
  constructor() {
  }
  
  getRecommendedCocktailsForUser(userId: string): Cocktail[] {
    return new RecommendationModel().getRecommendedForUser(userId)
  }

  reviewRecommendation(review: CocktailReview): void {
    return new RecommendationModel().reviewRecommendation(review)
  }
}