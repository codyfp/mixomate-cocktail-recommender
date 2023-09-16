import { Ingredient } from "../ingredients/ingredient.js"

export type Cocktail = {
  id: string,
  name: string,

  n_steps: number,
  n_ingredients: number,

  steps: string,
  ingredients: Ingredient[]
}
