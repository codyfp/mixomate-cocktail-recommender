import React, { useEffect, useState } from "react";
import Head from "next/head";

import { RecommendationApi } from "@/clientApi/RecommendationApi";
import { Cocktail } from "@/clientApi/CocktailApi";
import CocktailCard from "@/components/CocktailCard";

import { ProgressSpinner } from 'primereact/progressspinner';
import Link from "next/link";

export default function Recommendations() {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [recommendedCocktails, setRecommendedCocktails] = useState<Cocktail[]>([]);

  useEffect(() => {
    async function fetchRecommendedCocktails() {
      try {
        const api = new RecommendationApi();
        const data: Cocktail[] = await api.getRecommendedCocktails();
        setRecommendedCocktails(data);
        setLoading(false);

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

        {/* Show spinner when loading recommendations */}
        {isLoading && 
          <div className="flex flex-col	items-center">
            <ProgressSpinner />
            <i className="mt-10">Mixing cocktails for you...</i>
          </div>
        }

        {!isLoading && recommendedCocktails.length === 0 && 
          <div className="text-center">
            <p>We were not able to find any matching cocktails to suit your taste.</p>
            <Link
              href={'/preferences'}
              className="cursor-pointer mt-4 font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Edit your preferences
            </Link>
          </div>
        }

        {!isLoading && recommendedCocktails.length > 0 && 
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-x-24 gap-y-12">
            {recommendedCocktails.map((cocktail) => (
              <div key={cocktail.id} className="justify-self-center cursor-pointer">
                <CocktailCard cocktail={cocktail} />
              </div>
            ))}
          </div>
        }
      </main>
    </div>
  );
}