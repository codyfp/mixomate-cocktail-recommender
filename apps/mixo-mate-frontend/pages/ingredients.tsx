import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Ingredient, IngredientApi } from "@/clientApi/IngredientApi";
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
  marginBottom: '20px',
  textAlign: 'center'
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

export default function Ingredients() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    async function fetchIngredients() {
      try {
        const api = new IngredientApi();
        const data = await api.getIngredients();
        setIngredients(data);
      } catch (error) {
        const err = error as Error
        alert(`Failed to get ingredients. ${err.message}`)
      }
    }

    fetchIngredients();
  }, [])

  return (
    <div>
      <Head>
        <title>Mixo Mate | Ingredients</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={mainStyle}>
        <div className='flex flex-col'>
          <h1 style={headerStyle}>Ingredients</h1>
          <DataTable
            value={ingredients}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            sortMode="single"
            className="p-datatable-gridlines p-shadow-2"
            style={gridLineStyle}>
            <Column field="id" header="ID" style={gridLineStyle} headerStyle={tableHeaderStyle}></Column>
            <Column field="name" header="Name" sortable filter filterPlaceholder="Filter by name" style={gridLineStyle} headerStyle={tableHeaderStyle} filterStyle={filterInputStyle}></Column>
          </DataTable>
        </div>
      </main>
    </div>
  )
}
