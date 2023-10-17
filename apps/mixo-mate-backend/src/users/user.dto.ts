import { Ingredient } from "../ingredients/ingredient.js"

export type User = {
  id: string,
  username: string,
  likes?: string[] | Ingredient[],
  dislikes?: string[] | Ingredient[],
  flavourProfile?: string[],
  allergens?: string[]
}

export type CreateUser = {
  username: string,
  password: string
}
