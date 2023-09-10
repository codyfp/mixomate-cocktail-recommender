import { getModelForClass, prop } from "@typegoose/typegoose";
import mongoose, { HydratedDocument } from "mongoose";

class CocktailClass {
  @prop({ type: () => String, required: true })
  public name: string;
  
  @prop({ type: () => Number, required: true })
  public price: number;
  
  @prop({ type: () => String, required: true })
  public glassware: string;
  // @prop({ type: String, required: true, default: [] })
  // public portions: PortionClass;
}

// class PortionClass {
//   @prop({ type: () => String, required: true })
//   public ingredient: string;
  
//   @prop({ type: () => String, required: true })
//   public quantity: string;
// }

export type RawCocktail = HydratedDocument<{
  name: string;
  price: number;
  glassware: string;
}>

export const CocktailModel = getModelForClass(CocktailClass);
