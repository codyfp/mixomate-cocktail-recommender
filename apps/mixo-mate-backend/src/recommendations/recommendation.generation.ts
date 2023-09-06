import { Cocktail } from '../cocktails/cocktail.dto.js';
import { CocktailService } from '../cocktails/cocktail.service.js';
import { RecommendationModel } from './recommendation.model.js';
import { Recommendation } from './review.dto.js';

export default class RecommendationGenerator {
  constructor() {
  }

  async generateNewRecommendations(userId: string, count: number = 5): Promise<Recommendation[]> {
    // TODO: Get recommended cocktails for user from Recommendation ML model

    const cocktails: Cocktail[] = await new CocktailService().getAll();
    const recommendedCocktails: Cocktail[] = cocktails.slice(0, count);

    const recommendations: Recommendation[] = await Promise.all(
      recommendedCocktails.map(async (cocktail: Cocktail) => {
        const doc = await RecommendationModel.create({
          userId: userId,
          cocktailId: cocktail.id
        })

        return this._recordToRecommendation(doc)
      })
    )

    return recommendations
  }

  async reviewRecommendation(review: Required<Recommendation>): Promise<void> {
    // Use cocktail review to adjust ML model
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
 