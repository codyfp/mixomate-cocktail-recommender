import { Body, Controller, Get, Post, Route, Request, SuccessResponse, Security, Middlewares } from "tsoa";
import { AuthenticatedRequest } from "./user.types.js";
import { UserService } from "./user.service.js";
import { IngredientService } from "../ingredients/ingredient.service.js";
import { StatusCodes } from "../status-codes.js";
import { User } from "./user.dto.js";
import AuthMiddleware from "../middleware.js";

@Route("users")
export class UsersController extends Controller {
  @Post()
  @SuccessResponse("201", "Created")
  public async createUser(
    @Body() requestBody: { username: string, password: string },
  ): Promise<unknown> {
    const { username, password } = requestBody;

    // Check if user exists
    const existingUser = await new UserService().getByUsername(username)
    if (existingUser) {
      this.setStatus(StatusCodes.CONFLICT);
      return { error: 'Username already taken' }
    }

    // Create a new user with the user data provided
    try {
      const user = await new UserService().createUser({ username, password })
      this.setStatus(StatusCodes.CREATED);
      return { message: 'User created', user: user };
    } catch (error) {
      this.setStatus(StatusCodes.UNPROCESSABLE_ENTITY);
      return { error: error.message }
    }
  }

  @Get('/current')
  @Middlewares(AuthMiddleware)
  public async getCurrentUser(
    @Request() request: AuthenticatedRequest
  ): Promise<User | object> {
    try {
      const currentUser = await new UserService().getById(request.session.userId);
      const ingredients = await new IngredientService().getAll();
      const likesWithIngredients = currentUser.likes.map((ingredientId) => {
        return ingredients.find((ingredient) => ingredient.id === ingredientId) || { id: null, name: ingredientId }
      })

      const dislikesWithIngredients = currentUser.dislikes.map((ingredientId) => {
        return ingredients.find((ingredient) => ingredient.id === ingredientId) || { id: null, name: ingredientId }
      });

      const allergensWithIngredients = currentUser.allergens.map((ingredientId) => {
        return ingredients.find((ingredient) => ingredient.id === ingredientId) || { id: null, name: ingredientId }
      });

      return {
        id: currentUser.id,
        username: currentUser.username,
        likes: likesWithIngredients,
        dislikes: dislikesWithIngredients,
        flavourProfile: currentUser.flavourProfile,
        allergens: allergensWithIngredients
      }

    } catch (error) {
      this.setStatus(StatusCodes.UNPROCESSABLE_ENTITY)
      return { error: `Failed to retrieve user details. ${error.message}` }
    }
  }

  @Get('/sessionTest')
  public async sessionTest(
    @Request() request: AuthenticatedRequest
  ): Promise<unknown> {
    return { userId: request.session?.userId || 'not set' };
  }

  @Post('/login')
  public async login(
    @Body() requestBody: { username: string, password: string },
    @Request() request: AuthenticatedRequest,
  ): Promise<unknown> {
    const { username, password } = requestBody;

    // Ensure user exists
    const existingUser = await new UserService().getByUsername(username)
    if (!existingUser) {
      this.setStatus(StatusCodes.UNPROCESSABLE_ENTITY);
      return { error: 'User with matching username does not exist' }
    }

    // Ensure password provided is correct
    const isMatch = await new UserService().hasMatchingPassword(username, password);
    if (!isMatch) {
      this.setStatus(StatusCodes.FORBIDDEN);
      return { error: 'Password incorrect' }
    }

    // Set user ID in session
    request.session.isLoggedIn = true;
    request.session.userId = existingUser.id;

    return { message: 'Login successful' }
  }

  @Post('/logout')
  public async logout(
    @Request() request: AuthenticatedRequest
  ): Promise<unknown> {
    request.session.isLoggedIn = false;

    await new Promise((resolve) => {
      request.session.save((err) => {
        if (err) {
          return resolve(err)
        }

        return resolve(null);
      })
    })

    return { message: 'Logged out successfully' };
  }

  @Post('/likes')
  @Middlewares(AuthMiddleware)
  public async likes(
    @Body() requestBody: { likes: string[], dislikes: string[] },
    @Request() request: AuthenticatedRequest,
  ): Promise<unknown> {
    const { likes, dislikes } = requestBody;

    try {
      await new UserService().setLikesAndDislikes(request.session.userId, likes, dislikes)
      return { message: 'Likes and dislikes set successfully' }
    } catch (error) {
      this.setStatus(StatusCodes.UNPROCESSABLE_ENTITY)
      return { error: error.message }
    }
  }

  @Post('/flavourPreferences')
  @Middlewares(AuthMiddleware)
  public async setFlavours(
    @Body() requestBody: { flavourProfile: string[] },
    @Request() request: AuthenticatedRequest,
  ): Promise<unknown> {
    const { flavourProfile } = requestBody;

    try {
      await new UserService().setFlavourProfile(request.session.userId, flavourProfile)
      return { message: 'Set your flavour profile successfully' }
    } catch (error) {
      this.setStatus(StatusCodes.UNPROCESSABLE_ENTITY)
      return { error: error.message }
    }
  }

  @Post('/allergens')
  @Middlewares(AuthMiddleware)
  public async setAllergens(
    @Body() requestBody: { allergens: string[] },
    @Request() request: AuthenticatedRequest,
  ): Promise<unknown> {
    const { allergens } = requestBody;

    try {
      await new UserService().setAllergens(request.session.userId, allergens)
      return { message: 'Set your allergens successfully' }
    } catch (error) {
      this.setStatus(StatusCodes.UNPROCESSABLE_ENTITY)
      return { error: error.message }
    }
  }
}
