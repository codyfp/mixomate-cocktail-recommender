/* 
  This file contains migrations that were run on the MongoDB database
*/

// import mongoose from "mongoose";
// import { Cocktail } from "./cocktails/cocktail.dto.js";
// import { CocktailModel } from "./cocktails/cocktail.model.js";
// import { CocktailService } from "./cocktails/cocktail.service.js";
// import { IngredientModel, RawIngredient } from "./cocktails/ingredient.model.js";

// export const separateIngredients = async () => {

//   // Get all Cocktails and get unique list of ingredient names
//   const cocktails: Cocktail[] = await (new CocktailService().getAll())
//   for(const cocktail of cocktails) {
//     const trimmedIngredientsStr = cocktail.ingredients.substr(1).slice(0, -1);

//     const ingredients: string[] = trimmedIngredientsStr.split(',');
//     ingredients.forEach((ingredient: string) => {
//       const cleanedName = ingredient.trim().substr(1).slice(0, -1);

//       if (uniqueIngredients[cleanedName] === 1) {
//         return;
//       }

//       uniqueIngredients[cleanedName] = 1;
//     })
//   }

//   const uniqueIngredientNames: string[] = Object.keys(uniqueIngredients);
//   const ingredientProps: unknown[] = uniqueIngredientNames.map((ingredientName: string) => { 
//     return { name: ingredientName } 
//   })

//   // Create ingredients in MongoDB
//   await IngredientModel.deleteMany()
//   await IngredientModel.create(ingredientProps)
// }

// export const uppercaseCocktailName = async () => {
//   const cocktailDocs = await CocktailModel.find();

//   for(const doc of cocktailDocs) {
//     const name = doc.name;
//     doc.name = name.charAt(0).toUpperCase() + name.slice(1);
//     await doc.save();
//   }
// }

// export const renameRawIngredientColumn =async () => {
//   await CocktailModel.updateMany({}, { $rename: { 'ingredients': 'ingredientsStr' }})
// }

// export const referenceIngredients = async () => {
//   // Get all Cocktails and get unique list of ingredient names
//   const cocktailsDocs = await CocktailModel.find();
//   for(const doc of cocktailsDocs) {
//     const trimmedIngredientsStr = doc.ingredientsStr.substr(1).slice(0, -1);

//     const dirtyIngredients: string[] = trimmedIngredientsStr.split(',');
//     const cleanedIngredients: string[] = dirtyIngredients.map((name: string): string => {
//       return name.trim().substr(1).slice(0, -1);
//     })

//     const ingredientIds: mongoose.Types.ObjectId[] = [];

//     for(const ingredientName of cleanedIngredients) {
//       const ingredientDoc = await IngredientModel.findOne({ name: ingredientName })
//       if (ingredientDoc) {
//         ingredientIds.push(ingredientDoc._id)
//       } else {
//         console.log(`WARN: Ingredient with name: ${ingredientName} does not have a document`)
//       }
//     }

//     doc.ingredients = ingredientIds;
//     await doc.save();
//   }
// }
