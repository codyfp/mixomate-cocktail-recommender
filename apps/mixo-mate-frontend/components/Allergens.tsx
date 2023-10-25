import React, { useState, useEffect, useMemo } from 'react'
import { IngredientApi, Ingredient } from "@/clientApi/IngredientApi"
import InputChips from './InputChips'
import { InputLabel } from '../types/InputLabels'

interface AllergensProps {
  allergens: Ingredient[]
  setAllergens: (allergens: Ingredient[]) => void,
  skipStep: () => void
}

const Allergens = ({ allergens, setAllergens, skipStep }: AllergensProps) => {

  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const filteredIngredients = useMemo(() => {
    return ingredients.filter(ingredient => !allergens.find(allergen => allergen.id === ingredient.id))
  }, [ingredients, allergens])

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
    <div className='flex flex-col'>
      <div className="bg-white px-5 py-4 min-h-[12rem] rounded-xl flex flex-col justify-between items-center">
        <div className="relative">
          <div className="flex flex-row items-center mb-4">
            <InputChips title={InputLabel.ALLERGENS} options={allergens} setOptions={setAllergens} searchOptions={filteredIngredients} htmlId='allergens' />
          </div>
        </div>

        <button
          className={`self-center mt-4 bg-custom-orange text-white px-7 py-2 rounded ${allergens.length > 0 ? 'opacity-50 cursor-not-allowed' : ''}}`}
          disabled={allergens.length > 0}
          onClick={() => { setAllergens([]); skipStep() }}
        >
          I don't have any allergens
        </button>
      </div>
    </div>
  );
}

export default Allergens;
