import { Cocktail } from "@/clientApi/CocktailApi";
import { RecommendationApi } from "@/clientApi/RecommendationApi";
import { useRouter } from "next/router";
import Head from "next/head";
import React, { useEffect, useState } from "react";

type ReactionType = "like" | "dislike";

const mockCocktail: Cocktail = {
  id: "4",
  name: "Margarita",
  image_url: "/images/recommendations/margarita.jpg",
  rating: 4.5,
  ingredients: [
    { id: "1", name: "1 1/2 ounces jamaican rum" },
    { id: "2", name: "1 1/2 ounces puerto rican gold run" },
    { id: "3", name: "1 ounce 151-proof demerara rum" },
    { id: "4", name: "3/4 ounce lime juice, freshly squeezed" },
    { id: "5", name: "1/2 ounce don's mix (Recipe below)" },
  ],
  steps: [
    "Add the Jamaica rum, Puerto Rican gold rum, demerara rum, pernod, lime juice, donn's mix, falernum, grenadine and bitters into a blender, then add 6 ounces of crushed ice.",
    "Blend at high speed for no more than 5 seconds.",
    "Pour the contents into a tall glass or tiki mug and add additional crushed ice to fill, if necesary.",
    "Garnish with a mint sprig.",
  ],
  n_ingredients: 5,
  n_steps: 4,
};

function Cocktail() {
  const router = useRouter();

  const [cocktail, setCocktail] = useState<Cocktail>();
  const [reaction, setReaction] = useState<ReactionType>();

  const onReactionClick = (reactionType: ReactionType) => {
    setReaction(reactionType);
  };

  useEffect(() => {
    async function fetchCocktail() {
      const id = router.query.id as string;

      if (id) {
        return;
      }
      setCocktail(mockCocktail); //Can remove when API works 

      try {
        const api = new RecommendationApi();
        const data = await api.getCocktail(id);
        setCocktail(data);
      } catch (error) {
        const err = error as Error;
        alert(`Failed to get cocktail. ${err.message}`);
      }
    }

    fetchCocktail();
  }, [router.query.id]);

  if (!cocktail) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col bg-gray-300">
      <Head>
        <title>Mixo Mate | Cocktail</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-5">
        <h1 className="x-title mb-10 text-center">{cocktail?.name}</h1>

        <div className="flex">
          <div className="flex flex-col items-center w-1/2">
            <div className="overflow-hidden rounded-[20px] w-[300px] h-[400px]">
              <img
                src={cocktail.image_url}
                alt={cocktail.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex gap-4 p-4">
              <ButtonReaction
                reactionType="like"
                value={reaction}
                onClick={onReactionClick}
              />

              <ButtonReaction
                reactionType="dislike"
                value={reaction}
                onClick={onReactionClick}
              />
            </div>
          </div>

          <div className="w-1/2">
            <Card
              title="Ingredients"
              list={cocktail.ingredients.map((ingredient) => ingredient.name)}
            />

            <Card title="Steps" list={cocktail.steps} listNumber />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Cocktail;

function Card({
  title,
  list = [],
  listNumber = false,
}: {
  title: string;
  list: string[];
  listNumber?: boolean;
}) {
  return (
    <div className="bg-white rounded-[20px] p-5 mb-2">
      <h2 className="x-title mb-4">{title}</h2>

      <ul
        className={`x-title !text-[16px] !leading-[1.5] pl-6 ${
          listNumber ? "list-decimal" : "list-disc"
        }`}
      >
        {list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function ButtonReaction({
  value,
  reactionType,
  onClick,
}: {
  value?: ReactionType;
  reactionType: ReactionType;
  onClick: (reaction: "like" | "dislike") => void;
}) {
  const iconType = value === reactionType ? "fa-solid" : "fa-regular";

  const reactionClass =
    reactionType === "like"
      ? "fa-thumbs-up text-green-500 hover:text-green-600"
      : "fa-thumbs-down text-red-500 hover:text-red-600";

  return (
    <button onClick={() => onClick(reactionType)} className="outline-none">
      <i className={`${iconType} ${reactionClass} text-[28px]`} />
    </button>
  );
}