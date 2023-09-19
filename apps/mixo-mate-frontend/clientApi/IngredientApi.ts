import { MixoMateApi } from "./MixoMateApi";

export type Ingredient = {
  id: string;
  name: string;
}

export class IngredientApi extends MixoMateApi {
  constructor() {
    super('ingredients');
  }

  public async getIngredients(): Promise<Ingredient[]> {
    const response: Ingredient[] = await this.get('/')
    return response;
  }

  public async getById(ingredientId: string): Promise<Ingredient> {
    const response: Ingredient = await this.get(`/${ingredientId}`)
    return response;
  }
}
