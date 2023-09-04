import { Controller, Get, Route } from "tsoa";
import { Cocktail } from "../cocktails/cocktail.dto.js";

@Route("recommendations")
export class RecommendationController extends Controller {
  @Get()
  public async getRecommendedCocktails(): Promise<Cocktail[]> {
    // TODO: Get userId from user session
    const _userId: string = 'stubbed-user-id'

    return []
    // return new RecommendationService().getRecommendedCocktailsForUser(userId);
  }
}
