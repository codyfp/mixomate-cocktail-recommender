import { Cocktail } from "@/clientApi/CocktailApi";
import Image from "next/image";
import React from "react";

function CocktailCard(props: { cocktail: Cocktail }) {
  const { cocktail } = props;

  const generateImageURL = (id: string) => {
    return `https://mixomate-cocktails.s3.ap-southeast-2.amazonaws.com/${id}.jpg`
  }

  const redirectToCocktailPage = (e: any) => {
    window.location.href = `/cocktail/${cocktail.id}`
  }

  return (
    <div className="flex flex-col bg-white rounded-[20px] overflow-hidden w-[250px] h-full" onClick={redirectToCocktailPage}>
      <div className="w-full h-[300px]">
        <Image
          src={generateImageURL(cocktail.id)}
          alt={cocktail.name}
          className="w-full h-full object-cover"
          height={400}
          width={400}
        />
      </div>

      <div className="flex flex-1 items-center justify-center text-center p-4 h-full">
        <h2 className="x-title">{cocktail.name}</h2>
      </div>
    </div>
  );
}

export default CocktailCard;