import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Cocktail, CocktailApi } from "@/clientApi/CocktailApi";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Image from "next/image";

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
  }, [])

  const generateImageURL = (id: string) => {
    return `https://mixomate-cocktails.s3.ap-southeast-2.amazonaws.com/${id}.jpg`
  }
  
  const imageTemplate = (rowData: Cocktail) => {
    return (
      <Image 
        src={generateImageURL(rowData.id)}
        height={100}
        width={100}
        loading="lazy"
        alt={`Image of recipe ${rowData.id}`}
      />
    )
  }

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
            style={gridLineStyle}>
            <Column field="name" header="Name" sortable filter filterPlaceholder="Filter by name" style={gridLineStyle} headerStyle={tableHeaderStyle} filterStyle={filterInputStyle}></Column>
            <Column field="id" header="ID" sortable style={gridLineStyle} headerStyle={tableHeaderStyle}></Column>
            <Column field="rating" header="Rating" sortable filter filterPlaceholder="Filter by rating" style={gridLineStyle} headerStyle={tableHeaderStyle} filterStyle={filterInputStyle}></Column>
            <Column field="n_steps" header="Number of Steps" sortable filter filterPlaceholder="Filter by steps" style={gridLineStyle} headerStyle={tableHeaderStyle} filterStyle={filterInputStyle}></Column>
            <Column field="n_ingredients" header="Number of Ingredients" sortable filter filterPlaceholder="Filter by ingredients" style={gridLineStyle} headerStyle={tableHeaderStyle} filterStyle={filterInputStyle}></Column>
            <Column field="flavour_profile" header="Flavour Profile" style={gridLineStyle} headerStyle={tableHeaderStyle}></Column>
            <Column header="Picture" body={imageTemplate} style={gridLineStyle} headerStyle={tableHeaderStyle}></Column>
          </DataTable>
        </div>
      </main>
    </div>
  )
  }