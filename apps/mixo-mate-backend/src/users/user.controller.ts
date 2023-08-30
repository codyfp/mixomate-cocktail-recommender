import { Body, Controller, Get, Post, Route, Request, SuccessResponse } from "tsoa";
import { User } from "./user.dto.js";
import { AuthenticatedRequest } from "./user.types.js";

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
    @Body() _requestBody: any
  ): Promise<void> {
    this.setStatus(201); // set return status 201
    return;
  }

  @Get('/sessionTest')
  public async sessionTest(
    @Request() request: AuthenticatedRequest
  ): Promise<unknown> {
    return { userId: request.session.userId || 'not set' };
  }

  @Get('/login')
  public async login(
    @Request() request: AuthenticatedRequest
  ): Promise<unknown> {
    request.session.userId = Math.random().toString(36).slice(2, 7);
    request.session.save()

    this.setStatus(201); // set return status 201
    return { message: 'User logged in'}
  }
}
