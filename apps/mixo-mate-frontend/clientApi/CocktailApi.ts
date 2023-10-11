import { Ingredient } from "./IngredientApi";
import { MixoMateApi } from "./MixoMateApi";

export type Cocktail = {
  id: string;
  name: string;
  rating: number;

  n_steps: number;
  n_ingredients: number;

  steps: string[];
  ingredients: Ingredient[];

  flavour_profile: FlavourProfile;
}

export enum FlavourProfile {
  Fruity = 'Fruity',
  Refreshing = 'Refreshing',
  Sour = 'Sour',
  Bitter = 'Bitter',
  Spicy = 'Spicy',
  Sweet = 'Sweet',
  Citrusy = 'Citrusy',
  Tropical = 'Tropical',
  Tart = 'Tart',
  Savoury = 'Savoury',
  Tangy = 'Tangy',
  Chocolatey = 'Chocolatey',
  Herby = 'Herby',
  Mellow = 'Mellow',
  Caramelly = 'Caramelly',
  Nutty = 'Nutty',
  Minty = 'Minty',
  Creamy = 'Creamy',
  Winey = 'Winey',
  Flowery = 'Flowery'
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
