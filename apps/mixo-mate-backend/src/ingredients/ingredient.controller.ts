import { Controller, Get, Route, Security } from "tsoa";
import { IngredientService } from "./ingredient.service.js";
import { Ingredient } from "./ingredient.js";

@Route("ingredients")
@Security("mixio_auth")
export class IngredientController extends Controller {
  @Get()
  public async getIngredients(): Promise<Ingredient[]> {
    return new IngredientService().getAll();
  }
}
