import { Recommendation } from "./review.dto.js";
import RecommendationGenerator from "./recommendation.generation.js";
import { Cocktail } from "../cocktails/cocktail.dto.js";
import { CocktailService } from "../cocktails/cocktail.service.js";

export class RecommendationService {
  constructor() {
  }
  
  async getRecommendedCocktailsForUser(userId: string): Promise<Cocktail[]> {
    // Generate recommendations
    const recommendationGenerator = new RecommendationGenerator();
    const recommendations: Recommendation[] = await recommendationGenerator.generateNewRecommendations(userId)

    // Fetch recommended cocktails 
    const cocktailService = new CocktailService();
    const cocktails: Cocktail[] = await Promise.all(
      recommendations.map(async (recommendation: Recommendation): Promise<Cocktail> => {
        return cocktailService.getById(recommendation.cocktailId)
      })
    )

    return cocktails;
  }

  async reviewRecommendation(review: Required<Recommendation>): Promise<void> {
    // Find recommendation
    // Set the rating

    // Notify recommendation service of user's rating

    return new RecommendationGenerator().reviewRecommendation(review)
  }
}
