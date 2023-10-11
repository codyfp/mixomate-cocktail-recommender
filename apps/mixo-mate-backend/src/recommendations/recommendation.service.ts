import RecommendationGenerator from "./recommendation.generation.js";
import { Recommendation } from "./recommendation.js";
import { Cocktail } from "../cocktails/cocktail.dto.js";
import { CocktailService } from "../cocktails/cocktail.service.js";
import { User } from "../users/user.dto.js";
import { UserService } from "../users/user.service.js";
import { Logger } from "../logger.js";

export class RecommendationService {
  constructor() {
  }
  
  async getRecommendedCocktailsForUser(userId: string): Promise<Cocktail[]> {
    // Get user
    const user: User = await new UserService().getById(userId)

    // Generate recommended cocktails 
    const recommendationGenerator = new RecommendationGenerator();
    const recommendedCocktailIds: string[] = await recommendationGenerator.generateNewRecommendations(
      5,
      user.allergens || [],
      user.likes || [],
      user.dislikes || [],
      user.flavourProfile || [])

    // Retrieve recommended cocktails
    const cocktailService = new CocktailService();
    let cocktails: Cocktail[] = await Promise.all(
      recommendedCocktailIds.map(async (cocktailId: string): Promise<Cocktail> => {
        try {
          const cocktail: Cocktail = await cocktailService.getById(cocktailId)
          return cocktail;
        } catch (error) {
          Logger.error(`Cocktail with ID: ${cocktailId}, does not exist`)
          return undefined;
        }
      })
    )
    cocktails = cocktails.filter(Boolean)

    return cocktails;
  }

  async reviewRecommendation(review: Required<Recommendation>): Promise<void> {
    // Find recommendation
    // Set the rating

    // Notify recommendation service of user's rating

    return new RecommendationGenerator().reviewRecommendation(review)
  }
}
