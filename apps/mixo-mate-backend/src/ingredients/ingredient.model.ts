import { getModelForClass, prop } from "@typegoose/typegoose";
import { ObjectId } from "mongoose";

export class IngredientClass {
  @prop({ type: () => String, required: true, unique: true, index: true })
  public name: string;
}

export type RawIngredient = {
  _id: ObjectId;
  name: string;
}

export const IngredientModel = getModelForClass(IngredientClass);
