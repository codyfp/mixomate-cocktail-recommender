import { Cocktail } from "@/clientApi/CocktailApi";
import React from "react";

function CocktailCard(props: { cocktail: Cocktail }) {
  const { cocktail } = props;

  return (
    <div className="flex flex-col bg-white rounded-[20px] overflow-hidden w-[250px] h-full">
      <div className="w-full h-[300px]">
        <img
          src={cocktail.image_url}
          alt={cocktail.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-1 items-center justify-center text-center p-4 h-full">
        <h2 className="x-title">{cocktail.name}</h2>
      </div>
    </div>
  );
}

export default CocktailCard;