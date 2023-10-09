import { Body, Controller, Get, Post, Route, Request, SuccessResponse, Security } from "tsoa";
import { AuthenticatedRequest } from "./user.types.js";
import { UserService } from "./user.service.js";
import { StatusCodes } from "../status-codes.js";
import { User } from "./user.dto.js";

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
  public async getCurrentUser(
    @Request() request: AuthenticatedRequest
  ): Promise<User | object> {
    if (!request.session?.userId) {
      return { message: 'Not authenticated' }
    }

    try {
      const currentUser = new UserService().getById(request.session.userId)
      return currentUser;
    } catch (error) {
      this.setStatus(StatusCodes.UNPROCESSABLE_ENTITY)
      return { error: 'Failed to retrieve user details' }
    }
  }

  @Get('/logout')
  public async logout(
    @Request() request: AuthenticatedRequest
  ): Promise<unknown> {
    if (!request.session?.userId) {
      return { message: 'Not authenticated' }
    }

    request.session.destroy(() => {
      return { message: 'Logged out successfully' }
    });

    return { error: 'Failed to log out' }
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
    request.session.userId = existingUser.id
    request.session.save();

    return { message: 'Login successful' }
  }

  @Post('/likes')
  @Security("mixio_auth")
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
  @Security("mixio_auth")
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
  @Security("mixio_auth")
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
