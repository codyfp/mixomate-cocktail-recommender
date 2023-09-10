import { Cocktail } from "./cocktail.dto.js";
import { RawCocktail, CocktailModel } from "./cocktail.model.js";

export class CocktailRepo {
  constructor() {
  }
  
  async getAll(): Promise<Cocktail[]> {
    try {
      const documents = await CocktailModel.find({});
      return documents.map(this._documentToCocktail)
    } catch (error) {
      throw new Error(`Failed to retrieve Cocktails. ${error.message}`)
    }
  }

  async getById(id: string): Promise<Cocktail> {
    try {
      const document = await CocktailModel.findById(id);
      return this._documentToCocktail(document)
    } catch (error) {
      throw new Error('Not exist')
    }
  }

  private _documentToCocktail(document: RawCocktail): Cocktail {
    return {
      id: document.id,
      name: document.name,
      price: document.price,
      glassware: document.glassware
    }
  }
}