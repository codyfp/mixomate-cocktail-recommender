import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Cocktail, CocktailApi } from "@/clientApi/CocktailApi";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function Cocktails() {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);

  useEffect(() => {
    async function fetchCocktails() {
      try {
        const api = new CocktailApi();
        const data = await api.getCocktails();
        setCocktails(data);
      } catch (error) {
        const err = error as Error;
        alert(`Failed to get cocktails. ${err.message}`);
      }
    }

    fetchCocktails();
  }, []);
  
  return (
    <div>
      <Head>
        <title>Mixo Mate | Cocktails</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className='flex flex-col'>
          <h1>Cocktails</h1>
          <DataTable value={cocktails}>
            <Column field="name" header="Name"></Column>
            <Column field="rating" header="Rating"></Column>
            <Column field="n_steps" header="Number of Steps"></Column>
            <Column field="n_ingredients" header="Number of Ingredients"></Column>
          </DataTable>
        </div>
      </main>
    </div>
  )
}
