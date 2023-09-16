import { PropType, Ref, getModelForClass, mongoose, prop } from "@typegoose/typegoose";
import { HydratedDocument } from "mongoose";
import { IngredientClass } from "../ingredients/ingredient.model.js";
import { Ingredient } from "../ingredients/ingredient.js";

class CocktailClass {
  @prop({ type: () => String, required: true })
  public name: string;
  
  @prop({ type: () => String, required: true })
  public steps: string;
  @prop({ type: () => Number, required: true, index: true })
  public n_steps: number;

  @prop({ ref: () => IngredientClass, required: true }, PropType.ARRAY) // array of Ingredient references
  public ingredients: Ref<IngredientClass>[];

  @prop({ type: () => Number, required: true, index: true })
  public n_ingredients: number;

  @prop({ type: () => Number, required: true, index: true })
  public rating: number;
}

export type RawCocktail = HydratedDocument<{
  name: string;
  steps: string;
  n_steps: number;
  n_ingredients: number;
  rating: number;
  ingredients: mongoose.Schema.Types.ObjectId[];
}>

export type PopulatedCocktail = HydratedDocument<{
  name: string;
  steps: string;
  n_steps: number;
  n_ingredients: number;
  rating: number;
  ingredients: Ingredient[];
}>

export const CocktailModel = getModelForClass(CocktailClass);
