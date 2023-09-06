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

export class CocktailApi extends MixoMateApi {
  constructor() {
    super('cocktails');
  }

  // TODO: Implement pagination
  public async getCocktails(): Promise<Cocktail[]> {
    const response = await this.client.get('/')
    return response.data;
  }

  public async getById(cocktailId: string): Promise<Cocktail> {
    const response = await this.client.get(`/${cocktailId}`)
    return response.data;
  }
}
