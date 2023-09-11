import React, { useEffect, useState } from "react";
import Head from "next/head";

import { RecommendationApi } from '@/clientApi/RecommendationApi';

export type Cocktail = {
  id: string,
  name: string,
  price: number,
  glassware: string, // See if an enum is needed here

  instructions?: string,
  imageURL?: string

  // Determine whether these are needed
  origin?: string;
}

export default function Recommendations() {
  const [recommendedCocktails, setRecommendedCocktails] = useState<Cocktail[]>([]);

  useEffect(() => {
    async function fetchRecommendedCocktails() {
      try {
        const api = new RecommendationApi();
        const data = await api.getRecommendedCocktails();
        setRecommendedCocktails(data);
      } catch (error) {
        const err = error as Error
        alert(`Failed to get recommended cocktails. ${err.message}`)
      }
    }

    fetchRecommendedCocktails();
  })
  
  return (
    <div>
      <Head>
        <title>Mixo Mate | Recommendations</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className='flex flex-col'>
          <h1>Recommended Cocktails</h1>
          <ul>
            {recommendedCocktails.map((cocktail) => (
              <li key={cocktail.id}>{cocktail.name}</li>
            ))}
          </ul>
      </div>
      </main>
    </div>
  )
}
