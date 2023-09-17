import { MixoMateApi } from "./MixoMateApi";
import { Cocktail } from "./CocktailApi";

export class RecommendationApi extends MixoMateApi {
  constructor() {
    super('recommendations');
  }

  public async getRecommendedCocktails(): Promise<Cocktail[]> {
    const cocktails: Cocktail[] = await this.get('/')
    return cocktails;
  }

  public async reviewRecommendation(cocktailId: string, rating: number) {
    const responseData = await this.post('/review', {
      cocktailId,
      rating
    })

    return responseData;
  }
}