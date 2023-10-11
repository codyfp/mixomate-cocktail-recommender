import React, { useEffect, useState } from "react";
import Head from "next/head";

import { RecommendationApi } from "@/clientApi/RecommendationApi";
import { Cocktail } from "@/clientApi/CocktailApi";
import CocktailCard from "@/components/CocktailCard";

export default function Recommendations() {
  const [recommendedCocktails, setRecommendedCocktails] = useState<Cocktail[]>(
    []
  );

  useEffect(() => {
    async function fetchRecommendedCocktails() {

      try {
        const api = new RecommendationApi();
        const data: Cocktail[] = await api.getRecommendedCocktails();
        setRecommendedCocktails(data);
      } catch (error) {
        const err = error as Error;
        alert(`Failed to get recommended cocktails. ${err.message}`);
      }
    }

    fetchRecommendedCocktails();
  }, [])
  
  return (
    <div className="flex flex-1 flex-col bg-gray-300">
      <Head>
        <title>Mixo Mate | Recommendations</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-5">
        <h1 className="x-title mb-10 text-center">Recommendations</h1>

        <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-x-24 gap-y-12">
          {recommendedCocktails.map((cocktail) => (
            <div key={cocktail.id} className="justify-self-center">
              <CocktailCard cocktail={cocktail} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}