import { Cocktail } from "./cocktail.dto.js";
import { CocktailModel, PopulatedCocktail } from "./cocktail.model.js";
import { Ingredient } from "../ingredients/ingredient.js"

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
        .findOne({ recipe_id: id })
        .populate<{ ingredients: Ingredient[] }>({
          path: 'ingredients',
          select: '_id name',
          options: { lean: true }
        }) as PopulatedCocktail;

      if (!document) {
        throw new Error(`Cocktail with ID: ${id}, does not exist`)
      }

      return this._documentToCocktail(document)
    } catch (error) {
      throw new Error(`Cocktail with ID: ${id}, does not exist. ${error.message}`)
    }
  }

  private _documentToCocktail(document: PopulatedCocktail): Cocktail {
    return {
      id: document.recipe_id,
      name: document.name,

      n_steps: document.n_steps,
      n_ingredients: document.n_ingredients,

      rating: document.rating,

      steps: [...document.stepsArr],
      ingredients: document.ingredients,

      flavour_profile: document.flavour_profile
    }
  }
}