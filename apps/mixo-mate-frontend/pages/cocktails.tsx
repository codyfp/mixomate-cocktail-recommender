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

const mainStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '20px'
};

const headerStyle = {
  fontSize: '1.8em',
  marginBottom: '20px'
};

const tableHeaderStyle = {
  background: '#f5f5f5'
};

const filterInputStyle = {
  borderRadius: '4px',
  border: '1px solid #ccc',
  padding: '4px 8px',
  fontSize: '0.9em'
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
      <main style={mainStyle}>
        <div className='flex flex-col'>
          <h1 style={headerStyle}>Cocktails</h1>
          <DataTable 
            value={cocktails} 
            paginator 
            rows={5} 
            rowsPerPageOptions={[5, 10, 25, 50]}
            sortMode="single" 
            className="p-datatable-gridlines p-shadow-2" 
            rowStyle={gridLineStyle}>
            <Column field="name" header="Name" sortable filter filterPlaceholder="Filter by name" style={gridLineStyle} headerStyle={tableHeaderStyle} filterStyle={filterInputStyle}></Column>
            <Column field="rating" header="Rating" sortable filter filterPlaceholder="Filter by rating" style={gridLineStyle} headerStyle={tableHeaderStyle} filterStyle={filterInputStyle}></Column>
            <Column field="n_steps" header="Number of Steps" sortable filter filterPlaceholder="Filter by steps" style={gridLineStyle} headerStyle={tableHeaderStyle} filterStyle={filterInputStyle}></Column>
            <Column field="n_ingredients" header="Number of Ingredients" sortable filter filterPlaceholder="Filter by ingredients" style={gridLineStyle} headerStyle={tableHeaderStyle} filterStyle={filterInputStyle}></Column>
          </DataTable>
        </div>
      </main>
    </div>
  )
}
