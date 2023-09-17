import { Cocktail } from "./cocktail.dto.js";
import { CocktailModel, PopulatedCocktail } from "./cocktail.model.js";
import { Ingredient } from "./ingredient.js";

export class CocktailRepo {
  constructor() {
  }
  
  async getAll(): Promise<Cocktail[]> {
    try {
      const documents = await CocktailModel
        .find({})
        .populate<{ ingredients: Ingredient[] }>({
          path: 'ingredients',
          select: '_id name', // TODO: make this return id instead of _id
          options: { lean: true }
        }) as PopulatedCocktail[]

      return documents.map(this._documentToCocktail)
    } catch (error) {
      throw new Error(`Failed to retrieve Cocktails. ${error.message}`)
    }
  }

  async getById(id: string): Promise<Cocktail> {
    try {
      const document = await CocktailModel
        .findById(id)
        .populate<{ ingredients: Ingredient[] }>({
          path: 'ingredients',
          select: '_id name',
          options: { lean: true }
        }) as PopulatedCocktail;

      if (!document) {
        throw new Error('Not exist')
      }

      return this._documentToCocktail(document)
    } catch (error) {
      throw new Error('Not exist')
    }
  }

  private _documentToCocktail(document: PopulatedCocktail): Cocktail {
    return {
      id: document.id,
      name: document.name,
      n_steps: document.n_steps,
      n_ingredients: document.n_ingredients,

      steps: document.steps,
      ingredients: document.ingredients
    }
  }
}