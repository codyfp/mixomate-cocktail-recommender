import { useState, useEffect } from 'react';
import { Ingredient, IngredientApi } from "@/clientApi/IngredientApi";
import Image from 'next/image';
import InputChips from './InputChips'
import { InputLabel } from '../types/InputLabels'

interface LikesAndDislikesProps {
  likes: Ingredient[];
  setLikes: (likes: Ingredient[]) => void
  dislikes: Ingredient[];
  setDislikes: (dislikes: Ingredient[]) => void
}

function LikesAndDislikes(props: LikesAndDislikesProps) {
  const { likes, setLikes, dislikes, setDislikes } = props
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
    <div className="flex flex-row">
      <div className="pr-14 w-3/5">
        <h1 className="x-title mb-8 text-center">List your preferences!</h1>
        <InputChips title={InputLabel.LIKES} options={likes} setOptions={setLikes} searchOptions={ingredients} htmlId='likes' />
        <br></br>
        <InputChips title={InputLabel.DISLIKES} options={dislikes} setOptions={setDislikes} searchOptions={ingredients} htmlId="dislikes" />
      </div>
      <div className="pl-14 h-[30rem] w-2/5">
        <div className="rounded-xl overflow-hidden h-full w-full">
          <Image
            src="/images/cocktails.jpg"
            alt="Cocktails"
            height={400}
            width={200}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  )
}

export default LikesAndDislikes
