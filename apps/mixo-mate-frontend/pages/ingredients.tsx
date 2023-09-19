import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Ingredient, IngredientApi } from "@/clientApi/IngredientApi";

export default function Ingredients() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    async function fetchCocktails() {
      try {
        const api = new IngredientApi();
        const data = await api.getIngredients();
        setIngredients(data);
      } catch (error) {
        const err = error as Error
        alert(`Failed to get ingredients. ${err.message}`)
      }
    }

    fetchCocktails();
  })
  
  return (
    <div>
      <Head>
        <title>Mixo Mate | Ingredients</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className='flex flex-col'>
          <h1>Ingredients</h1>
          <table className="table-auto">
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((ingredient) => (
                <tr key={ingredient.id} className="text-center">
                  <td>{ingredient.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
