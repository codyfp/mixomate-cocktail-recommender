import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Cocktail, CocktailApi } from "@/clientApi/CocktailApi";
import Image from "next/image";

export default function Cocktails() {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);

  useEffect(() => {
    async function fetchCocktails() {
      try {
        const api = new CocktailApi();
        const data = await api.getCocktails();
        setCocktails(data);
      } catch (error) {
        const err = error as Error
        alert(`Failed to get cocktails. ${err.message}`)
      }
    }

    fetchCocktails();
  }, [])

  const generateImageURL = (recipe_id: string) => {
    return `https://mixomate-cocktails.s3.ap-southeast-2.amazonaws.com/${recipe_id}.jpg`
  }
  
  return (
    <div>
      <Head>
        <title>Mixo Mate | Cocktails</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className='flex flex-col'>
          <h1>Cocktails</h1>
          <table className="table-auto">
            <thead>
              <tr>
                <th>Name</th>
                <th>Recipe ID</th>
                <th>Rating</th>
                <th>Number of Steps</th>
                <th>Number of Ingredients</th>
                <th>Flavour Profile</th>
                <th>Picture</th>
              </tr>
            </thead>
            <tbody>
              {cocktails.map((cocktail) => (
                <tr key={cocktail.id} className="text-center">
                  <td>{cocktail.name}</td>
                  <td>{cocktail.recipe_id}</td>
                  <td>{cocktail.rating}</td>
                  <td>{cocktail.n_steps}</td>
                  <td>{cocktail.n_ingredients}</td>
                  <td>{cocktail.flavour_profile}</td>
                  <td>
                    <Image 
                      src={generateImageURL(cocktail.recipe_id)}
                      height={300}
                      width={300}
                      loading="lazy"
                      alt={`Image of recipe ${cocktail.recipe_id}`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
