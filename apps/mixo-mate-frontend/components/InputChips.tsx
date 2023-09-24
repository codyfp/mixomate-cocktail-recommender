import React, { useState, useEffect, useMemo } from 'react'
import { InputLabel } from '@/types/InputLabels'
import { IngredientApi } from "@/clientApi/IngredientApi"

interface InputChipProps {
  title: InputLabel
  options: string[]
  setOptions: (options: string[]) => void
}

export default function InputChips({ title, options, setOptions }: InputChipProps) {
  const [input, setInput] = useState<string>("")
  const [ingredients, setIngredients] = useState<string[]>([])
  const [showDropdown, setShowDropdown] = useState<boolean>(false)

  useEffect(() => {
    if (title === 'Allergens') getIngredients()
  }, [title])

  const getIngredients = async () => {
    const ingredientsApi = new IngredientApi()
    const allIngredients = await ingredientsApi.getIngredients()
    setIngredients(allIngredients.map(ingredient => ingredient.name))
  }

  const onChange = (text: string) => {
    setInput(text)
    setShowDropdown(text.length > 0 && title === 'Allergens')
  }

  const onAddItem = (key: string) => {
    if (key === "Enter" && input.trim() !== "") {
      setOptions(prev => [...prev, input])
      setInput("")
    }
  }

  const onDeleteItem = (index: number) => {
    setOptions(prev => prev.filter((_, i) => i !== index))
  }

  const filteredIngredients = useMemo(() => {
    if (!input) return []
    const lowercaseInput = input.toLowerCase();
    return ingredients.filter(ingredient => ingredient.toLowerCase().includes(lowercaseInput))
  }, [input, ingredients])

  return (
    <div className="bg-white px-5 py-4 min-h-[12rem] rounded-xl flex flex-col justify-between items-center">
      <div className="relative">
        <div className="flex flex-row items-center mb-4">
          <label className={`x-title w-32 ${title === 'Allergens' ? 'mr-4' : ''}`}>{title}:</label>
          <input 
            placeholder="Enter here"
            className="bg-gray-300 rounded-full h-8 w-60 px-5 uppercase"
            value={input}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => onAddItem(e.key)}
          />
        </div>
        {showDropdown && (
          <div className="absolute top-full mt-1 w-60 bg-white border border-gray-300 rounded-md shadow-lg z-10 overflow-hidden"> {/* Changed mt-2 to mt-1 and added overflow-hidden */}
            {filteredIngredients.map((ingredient, index) => (
              <div
                key={index}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => {setInput(ingredient); setShowDropdown(false);}}
              >
                {ingredient}
              </div>
            ))}
          </div>
        )}
        <div className="flex flex-row flex-wrap gap-1 mb-4">
          {options.map((chip, index) => (
            <Chip key={index} onClick={() => onDeleteItem(index)}>
              {chip}
            </Chip>
          ))}
        </div>
      </div>
      
      {title === 'Allergens' && options.length === 0 && (
        <button className="self-center mt-4 bg-custom-orange text-white px-7 py-2 rounded">
          I don't have any allergens
        </button>
      )}
    </div>
  )
}

function Chip({ children, onClick }: { children: React.ReactNode; onClick?: () => void; }) {
  return (
    <div className="bg-gray-300 flex items-center gap-3 rounded-full pl-5 pr-2 h-8 w-max">
      <div className="font-bold uppercase">{children}</div>
      <button className="hover:bg-gray-400 flex items-center justify-center rounded-full w-[20px] h-[20px]" onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
          <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
        </svg>
      </button>
    </div>
  )
}
