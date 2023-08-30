import { Controller, Get, Route } from "tsoa";
import { Cocktail } from "../cocktails/cocktail.dto.js";

@Route("cocktails")
export class RecommendationController extends Controller {
  @Get()
  public async getRecommendedCocktails(): Promise<Cocktail[]> {
    // TODO: Get userId from user session
    const userId: string = 'stubbed-user-id'

    return new RecommendationService().getRecommendedCocktailsForUser(userId);
  }
}
