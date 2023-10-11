import React, { useState } from 'react'
import { UserApi } from './../clientApi/UserApi';
interface Props {
  chipData: { label: string, selected: boolean }[];
  setChipData: (chipData: { label: string, selected: boolean }[]) => void;
  toggleChipSelection: (index: number) => void;
}

const FlavourProfile: React.FC<Props> = ({ chipData, setChipData, toggleChipSelection }) => {
  const title = "Choose up to 3 flavour profiles!"

  return (
    <div className="p-10 bg-white rounded-xl">
      <div className="bg-custom-orange text-white text-center py-4 rounded-xl">
        Build your flavour profile
      </div>
      <div className="px-6 py-4">
        <div className="text-m text-center mb-1">{title}</div>
      </div>
      <div className="px-6 pt-4 pb-2 flex flex-wrap gap-2 justify-center items-center">
        {chipData.map((chip, index) => (
          <span
            key={chip.label}
            className={`w-32 h-8 rounded-full px-3 py-1 text-sm font-semibold flex items-center justify-center ${chip.selected ? 'bg-custom-orange text-white' : 'bg-gray-400 text-white'} cursor-pointer`}
            onClick={() => toggleChipSelection(index)}
          >
            {chip.label}
            {chip.selected && (
              <span className="ml-2" onClick={(e) => { e.stopPropagation(); toggleChipSelection(index); }}>x</span>
            )}
          </span>
        ))}
      </div>
    </div>
  )
}

export default FlavourProfile
