import { Ingredient } from "./IngredientApi";
import { MixoMateApi } from "./MixoMateApi";

export type Cocktail = {
  id: string;
  name: string;
  rating: number;

  n_steps: number;
  n_ingredients: number;

  steps: string;
  ingredients: Ingredient[];

  image_url: string;
}

export class CocktailApi extends MixoMateApi {
  constructor() {
    super('cocktails');
  }

  // TODO: Implement pagination
  public async getCocktails(): Promise<Cocktail[]> {
    const response: Cocktail[] = await this.get('/')
    return response;
  }

  public async getById(cocktailId: string): Promise<Cocktail> {
    const response: Cocktail = await this.get(`/${cocktailId}`);
    return response;
  }
}
