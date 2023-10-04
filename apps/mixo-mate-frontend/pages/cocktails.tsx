import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Cocktail, CocktailApi } from "@/clientApi/CocktailApi";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const gridLineStyle = {
  border: "1px solid #d1d1d1"
};

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
          <DataTable 
            value={cocktails} 
            paginator 
            rows={5} 
            rowsPerPageOptions={[5, 10, 25, 50]}
            sortMode="single" 
            className="p-datatable-gridlines" 
            rowStyle={gridLineStyle}>
            <Column field="name" header="Name" sortable filter style={gridLineStyle}></Column>
            <Column field="rating" header="Rating" sortable filter style={gridLineStyle}></Column>
            <Column field="n_steps" header="Number of Steps" sortable filter style={gridLineStyle}></Column>
            <Column field="n_ingredients" header="Number of Ingredients" sortable filter style={gridLineStyle}></Column>
          </DataTable>
        </div>
      </main>
    </div>
  )
}
