import { Controller, Get, Route } from "tsoa";
import { IngredientService } from "./ingredient.service.js";
import { Ingredient } from "./ingredient.js";

@Route("ingredients")
export class IngredientController extends Controller {
  @Get()
  public async getIngredients(): Promise<Ingredient[]> {
    return new IngredientService().getAll();
  }
}
