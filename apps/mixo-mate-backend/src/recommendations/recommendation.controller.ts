import { Body, Controller, Get, Put, Request, Route, Security } from "tsoa";
import { Cocktail } from "../cocktails/cocktail.dto.js";
import { AuthenticatedRequest } from "../users/user.types.js";
import { RecommendationService } from "./recommendation.service.js";
import { StatusCodes } from "../status-codes.js";

type ReviewRecommendationDto = {
  cocktailId: string,
  rating: boolean
}

@Route("recommendations")
@Security("mixio_auth")
export class RecommendationController extends Controller {
  @Get()
  public async getRecommendedCocktails(
    @Request() request: AuthenticatedRequest
  ): Promise<Cocktail[]> {
    const userId = request.session.userId
    return new RecommendationService().getRecommendedCocktailsForUser(userId);
  }

  @Put('/review')
  public async reviewRecommendation(
    @Body() requestBody: ReviewRecommendationDto,
    @Request() request: AuthenticatedRequest
  ): Promise<unknown> {
    try {
      new RecommendationService().reviewRecommendation({
        userId: request.session.userId,
        cocktailId: requestBody.cocktailId,
        rating: requestBody.rating
      })
    } catch (error) {
      this.setStatus(StatusCodes.UNPROCESSABLE_ENTITY)
      return { error: `Failed to review cocktail. ${error.message}` }
    }

    return { message: 'Cocktail reviewed' }
  }
}
