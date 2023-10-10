import RecommendationGenerator from "./recommendation.generation.js";
import { Recommendation } from "./recommendation.js";
import { Cocktail } from "../cocktails/cocktail.dto.js";
import { CocktailService } from "../cocktails/cocktail.service.js";
import { User } from "../users/user.dto.js";
import { UserService } from "../users/user.service.js";
import { Ingredient } from "../ingredients/ingredient.js";
import { Logger } from "../logger.js";

export class RecommendationService {
  constructor() {
  }
  
  async getRecommendedCocktailsForUser(userId: string): Promise<Cocktail[]> {
    // Generate recommended cocktails 
    const recommendationGenerator = new RecommendationGenerator();
    const recommendations: Recommendation[] = await recommendationGenerator.generateNewRecommendations(userId, 10)

    // Retrieve recommended cocktails
    const cocktailService = new CocktailService();
    let cocktails: Cocktail[] = await Promise.all(
      recommendations.map(async (recommendation: Recommendation): Promise<Cocktail> => {
        try {
          const cocktail: Cocktail = await cocktailService.getById(recommendation.cocktailId)
          return cocktail;
        } catch (error) {
          Logger.error(`Cocktail with ID: ${recommendation.cocktailId}, does not exist`)
          return undefined;
        }
      })
    )
    cocktails = cocktails.filter(Boolean)
    
    // Return all recommended cocktails if the User has not specified any allergens
    const user: User = await new UserService().getById(userId)
    if (!user.allergens || user.allergens.length === 0) {
      // Limit to 5 recommended cocktails
      if (cocktails.length > 5) {
        cocktails.length = 5
      }

      return cocktails; 
    }

    // Filter out cocktails that contain a user's allergens
    const suitableCocktails: Cocktail[] = await cocktails.filter(async (cocktail: Cocktail) => {
      const containsAllergen: boolean = !cocktail.ingredients.some( (ingredient: Ingredient ): boolean => {
        return user.allergens.includes(ingredient['_id'])
      })

      Logger.debug(`Can drink ${cocktail.name}: ${!containsAllergen}`)

      return !containsAllergen;
    })

    // Limit to 5 recommended cocktails
    if (suitableCocktails.length > 5) {
      suitableCocktails.length = 5
    }

    return suitableCocktails;
  }

  async reviewRecommendation(review: Required<Recommendation>): Promise<void> {
    // Find recommendation
    // Set the rating

    // Notify recommendation service of user's rating

    return new RecommendationGenerator().reviewRecommendation(review)
  }
}
