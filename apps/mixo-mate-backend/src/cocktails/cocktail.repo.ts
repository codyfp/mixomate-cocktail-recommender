import { Cocktail } from "./cocktail.dto.js";
import dataset from './dataset.json'

export class CocktailRepo {
  constructor() {
  }
  
  getAll(): Cocktail[] {
    return dataset;
  }

  getById(id: string): Cocktail | null {
    // TODO: Access DB and retrieve cocktail with ID
    return null;
  }
}