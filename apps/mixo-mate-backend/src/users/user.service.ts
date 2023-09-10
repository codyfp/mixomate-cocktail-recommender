import mongoose from "mongoose"
import { CreateUser, User } from "./user.dto.js"
import { UserModel } from "./user.model.js"

export class UserService {
  constructor() {
  }

  async getById(userId: string): Promise<User> {
    if (!mongoose.isValidObjectId(userId)) {
      throw new Error('Invalid ID')
    }

    return await UserModel.findById(userId)
  }

  async getByUsername(username: string): Promise<User> {
    return await UserModel.findOne({ username: username })
  }

  async hasMatchingPassword(username: string, password: string): Promise<boolean> {
    const doc = await UserModel.findOne({ username: username })
    return doc.matchPassword(password)
  }

  async createUser(args: CreateUser): Promise<User> {
    const doc = await UserModel.create(args);

    return {
      id: doc.id,
      username: doc.username
    }
  }

  async setLikesAndDislikes(userId: string, likes: string[], dislikes: string[]): Promise<User> {
    if (!mongoose.isValidObjectId(userId)) {
      throw new Error('Invalid ID')
    }

    const doc = await UserModel.findById(userId)
    const updatedDoc = await doc.setLikesAndDislikes(likes, dislikes)
    return {
      id: updatedDoc.id,
      username: updatedDoc.username,
      likes: updatedDoc.likes,
      dislikes: updatedDoc.dislikes
    }
  }
}