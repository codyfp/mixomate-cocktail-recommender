import { IngredientModel } from "./ingredient.model.js";
import { Ingredient } from "./ingredient.js";

export class IngredientRepo {
  constructor() {
  }
  
  async getAll(): Promise<Ingredient[]> {
    try {
      const documents = await IngredientModel.find({})

      return documents.map(this._documentToIngredient)
    } catch (error) {
      throw new Error(`Failed to retrieve Cocktails. ${error.message}`)
    }
  }

  async getById(id: string): Promise<Ingredient> {
    try {
      const document = await IngredientModel.findById(id)
      if (!document) {
        throw new Error(`Ingredient with ID: ${id} does not exist`)
      }

      return this._documentToIngredient(document)
    } catch (error) {
      throw new Error(`Ingredient with ID: ${id} does not exist`)
    }
  }

  private _documentToIngredient(document): Ingredient {
    return {
      id: document.id,
      name: document.name
    }
  }
}