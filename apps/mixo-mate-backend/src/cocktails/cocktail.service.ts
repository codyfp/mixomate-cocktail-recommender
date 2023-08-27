import { Cocktail } from "./cocktail.dto.js";
import { CocktailRepo } from "./cocktail.repo.js";

export class CocktailService {
  constructor() {
  }
  
  getAll(): Cocktail[] {
    return new CocktailRepo().getAll();
  }

  getById(id: string): Cocktail | null {
    return new CocktailRepo().getById(id);
  }
}