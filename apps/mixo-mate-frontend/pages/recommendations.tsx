import React, { MouseEvent, useState } from "react";
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
  
  const handleGetRecommendedCocktails = async (e: MouseEvent) => {
    e.preventDefault();
  
    const api = new RecommendationApi();
    const data = await api.getRecommendedCocktails();
    setRecommendedCocktails(data);
  }

  return (
    <div>
      <Head>
        <title>Mixo Mate | Recommendations</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className='flex flex-col'>
          <h1>Recommended Cocktails</h1>
          <button onClick={handleGetRecommendedCocktails}>Generate...</button>
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
