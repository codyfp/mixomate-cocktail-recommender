import { Ingredient } from "../ingredients/ingredient.js"

export type User = {
  id: string,
  username: string,
  likes?: string[] | Ingredient[],
  dislikes?: string[] | Ingredient[],
  flavourProfile?: string[],
  allergens?: string[] | Ingredient[]
}

export type CreateUser = {
  username: string,
  password: string
}
