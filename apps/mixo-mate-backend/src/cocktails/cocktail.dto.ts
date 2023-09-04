import { Portion } from "./portion.dto.js";

export type Cocktail = {
  id: string,
  name: string,
  price: number,
  glassware: string, // See if an enum is needed here
  portions?: Portion[],

  instructions?: string,
  imageURL?: string

  // Determine whether these are needed
  origin?: string;
}
