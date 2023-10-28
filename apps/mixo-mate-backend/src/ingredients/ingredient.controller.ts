import { Controller, Get, Middlewares, Route, Security } from "tsoa";
import { IngredientService } from "./ingredient.service.js";
import { Ingredient } from "./ingredient.js";
import AuthMiddleware from "../middleware.js";

@Route("ingredients")
@Middlewares(AuthMiddleware)
export class IngredientController extends Controller {
  @Get()
  public async getIngredients(): Promise<Ingredient[]> {
    return new IngredientService().getAll();
  }
}
