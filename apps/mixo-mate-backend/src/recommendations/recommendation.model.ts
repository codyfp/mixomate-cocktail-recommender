import { getModelForClass, index, prop } from "@typegoose/typegoose";
import { HydratedDocument } from "mongoose";

@index({ userId: 1, cocktailId: 1 }, { unique: true }) // compound index
class RecommendationClass {
  @prop({ type: () => String, required: true })
  public userId: string;
  
  @prop({ type: () => String, required: true })
  public cocktailId: number;
  
  @prop({ type: () => Number, required: false, min: 0.0, max: 5.0})
  public rating?: number;
}

export type RawRecommendation = HydratedDocument<{
  userId: string;
  cocktailId: string;
  rating?: number;
}>

export const RecommendationModel = getModelForClass(RecommendationClass);
