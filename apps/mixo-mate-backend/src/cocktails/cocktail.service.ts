import { Cocktail } from "./cocktail.dto.js";
import { CocktailRepo } from "./cocktail.repo.js";

export class CocktailService {
  constructor() {
  }
  
  async getAll(): Promise<Cocktail[]> {
    return await new CocktailRepo().getAll();
  }

  async getById(id: string): Promise<Cocktail> {
    return new CocktailRepo().getById(id);
  }
}
