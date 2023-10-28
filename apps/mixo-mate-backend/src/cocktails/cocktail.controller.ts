import { Controller, Get, Middlewares, Path, Route } from "tsoa";
import { CocktailService } from "./cocktail.service.js";
import { Cocktail } from "./cocktail.dto.js";
import AuthMiddleware from "../middleware.js";

@Route("cocktails")
@Middlewares(AuthMiddleware)
export class CocktailController extends Controller {
  @Get()
  public async getCocktails(): Promise<Cocktail[]> {
    return new CocktailService().getAll();
  }

  @Get('/{cocktailId}')
  public async getCocktail(
    @Path() cocktailId: string
  ): Promise<Cocktail> {
    return new CocktailService().getById(cocktailId);
  }
}
