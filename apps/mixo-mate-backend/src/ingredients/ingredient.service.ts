import { Ingredient } from "./ingredient.js";
import { IngredientRepo } from "./ingredient.repo.js";

export class IngredientService {
  constructor() {
  }
  
  async getAll(): Promise<Ingredient[]> {
    return await new IngredientRepo().getAll();;
  }

  async getById(id: string): Promise<Ingredient> {
    return await new IngredientRepo().getById(id);
  }
}
