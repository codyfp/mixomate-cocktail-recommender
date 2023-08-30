import { Body, Controller, Get, Post, Route, SuccessResponse } from "tsoa";
import { User } from "./user.dto.js";

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
}
