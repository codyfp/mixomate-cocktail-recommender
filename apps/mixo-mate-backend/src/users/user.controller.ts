import { Body, Controller, Get, Post, Route, Request, SuccessResponse } from "tsoa";
import { User } from "./user.dto.js";
import { AuthenticatedRequest } from "./user.types.js";
import { UserService } from "./user.service.js";
import { StatusCodes } from "../status-codes.js";

@Route("users")
export class UsersController extends Controller {
  @Get()
  public async getUsers(
  ): Promise<User[]> {
    return [];
  }

  @SuccessResponse("201", "Created")
  @Post()
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
  ): Promise<unknown> {
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
    if (request.session?.userId) {
      return { message: 'Already authenticated' }
    }

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
  public async likes(
    @Body() requestBody: { likes: string[], dislikes: string[] },
    @Request() request: AuthenticatedRequest,
  ): Promise<unknown> {
    let { userId } = request.session;
    if (!userId) {
      return { error: 'Must be logged in to set preferences' }
    }
    const { likes, dislikes } = requestBody;

    const user = await new UserService().setLikesAndDislikes(userId, likes, dislikes)
    console.log(user)
    return { message: 'Login successful' }
  }
}
