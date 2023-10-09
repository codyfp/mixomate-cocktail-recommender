import React, { useState, useEffect, useMemo } from 'react'
import { IngredientApi } from "@/clientApi/IngredientApi"

interface AllergensProps {
  allergens: string[]
  setAllergens: (allergens: string[]) => void,
  skipStep: () => void
}

const Allergens = (props: AllergensProps) => {
  const { allergens, setAllergens, skipStep } = props

  const [input, setInput] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([])
  const [showDropdown, setShowDropdown] = useState<boolean>(false)

  useEffect(() => {
    getIngredients()
  }, [])

  const getIngredients = async () => {
    const ingredientsApi = new IngredientApi()
    const allIngredients = await ingredientsApi.getIngredients()
    setIngredients(allIngredients.map(ingredient => ingredient.name))
  }

  const onChange = (text: string) => {
    setInput(text);
    setShowDropdown(text.length > 0)
  }

  const onAddItem = (item?: string) => {
    const value = item ? item.trim() : input.trim()
    if (value !== "" && !allergens.includes(value)) {
      setAllergens(prev => [...prev, value])
      setInput("")
      setShowDropdown(false)
    }
  }

  const onSelectItem = (item: string) => {
    onAddItem(item)
  }

  const onDeleteItem = (index: number) => {
    setAllergens(prev => prev.filter((_, i) => i !== index))
  }

  const filteredIngredients = useMemo(() => {
    if (!input) return [];
    const lowercaseInput = input.toLowerCase()
    return ingredients.filter(ingredient => ingredient.toLowerCase().includes(lowercaseInput))
  }, [input, ingredients])

  return (
    <div className='flex flex-col'>
      <div className="bg-white px-5 py-4 min-h-[12rem] rounded-xl flex flex-col justify-between items-center">
        <div className="relative">
          <div className="flex flex-row items-center mb-4">
            <label className="x-title w-32 mr-4">Allergens:</label>
            <input
              placeholder="Enter here"
              className="bg-gray-300 rounded-full h-8 w-60 px-5 uppercase"
              value={input}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onAddItem()}
            />
          </div>
          {showDropdown && (
            <div className="absolute top-full mt-1 w-60 bg-white border border-gray-300 rounded-md shadow-lg z-10 overflow-hidden">
              {filteredIngredients.map(ingredient => (
                <div
                  key={ingredient}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => onSelectItem(ingredient)}
                >
                  {ingredient}
                </div>
              ))}
            </div>
          )}
          <div className="flex flex-row flex-wrap gap-1 mb-4">
            {allergens.map((chip, index) => (
              <Chip key={index} onClick={() => onDeleteItem(index)}>
                {chip}
              </Chip>
            ))}
          </div>
        </div>
        {allergens.length === 0 && (
          <button className="self-center mt-4 bg-custom-orange text-white px-7 py-2 rounded" onClick={() => { setAllergens([]); skipStep() }}>
            I don't have any allergens
          </button>
        )}
      </div>
    </div>
  );
}

function Chip({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <div className="bg-gray-300 flex items-center gap-3 rounded-full pl-5 pr-2 h-8 w-max">
      <div className="font-bold uppercase">{children}</div>
      <button className="hover:bg-gray-400 flex items-center justify-center rounded-full w-[20px] h-[20px]" onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
          <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
        </svg>
      </button>
    </div>
  );
}

export default Allergens;
