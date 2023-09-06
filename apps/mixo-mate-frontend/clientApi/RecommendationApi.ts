import { MixoMateApi } from "./MixoMateApi";

type Cocktail = {
  id: string,
  name: string,
  price: number,
  glassware: string, // See if an enum is needed here

  instructions?: string,
  imageURL?: string

  // Determine whether these are needed
  origin?: string;
}

export class RecommendationApi extends MixoMateApi {
  constructor() {
    super('recommendations');
  }

  public async getRecommendedCocktails(): Promise<Cocktail[]> {
    const response = await this.client.get('/')
    return response.data;
  }

  public async reviewRecommendation(cocktailId: string, rating: number) {
    const response = await this.client.post('/signup', {
      cocktailId,
      rating
    })

    return response.data;
  }
}