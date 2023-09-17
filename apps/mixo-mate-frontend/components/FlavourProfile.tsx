import React, { useState } from 'react'
import { UserApi } from './../clientApi/UserApi';
interface Props {
  onSubmit: () => void
  onClose: () => void
}

const FlavourProfile: React.FC<Props> = ({ onSubmit, onClose }) => {
  const title = "Choose up to 3 flavour profiles!"

  const [chipData, setChipData] = useState([
    { label: 'Sweet', selected: false },
    { label: 'Smoky', selected: false },
    { label: 'Spicy', selected: false },
    { label: 'Tropical', selected: false },
    { label: 'Floral', selected: false },
    { label: 'Earthy', selected: false },
    { label: 'Citrus', selected: false },
    { label: 'Herbal', selected: false },
    { label: 'Fruity', selected: false },
  ]);

  const toggleChipSelection = (index: number) => {
    const newChipData = [...chipData]
    newChipData[index].selected = !newChipData[index].selected
    setChipData(newChipData)
  };

  const saveProfile = () => {
    const selectedChips = chipData.filter(chip => chip.selected).map(chip => chip.label)
    sessionStorage.setItem('FlavourProfile', JSON.stringify(selectedChips))
    const userApi = new UserApi();
    userApi.setFlavourProfile(selectedChips);
  }

  const handleCancel = () => {
    const resetChipData = chipData.map(chip => ({ ...chip, selected: false }))
    setChipData(resetChipData);
  }

  const handleSubmission = () => {
    saveProfile()
    // Triggers next button flow
    // onSubmit() 
  }

  return (
    <div className="p-10">
      <div className="transform scale-150 rounded overflow-hidden shadow-lg max-w-lg mx-auto">
        <button onClick={onClose} className="absolute top-2 left-2 p-2 rounded-full">
          <i className="fas fa-times"></i>
        </button>
        <div className="bg-custom-orange text-white text-center py-4">
          Build your flavour profile
        </div>
        <div className="px-6 py-4">
          <div className="text-m text-center mb-1">{title}</div>
        </div>
        <div className="px-6 pt-4 pb-2 flex flex-wrap gap-2 justify-center items-center">
          {chipData.map((chip, index) => (
            <span
              key={chip.label}
              className={`inline-block w-1/4 h-8 rounded-full px-3 py-1 text-sm font-semibold flex items-center justify-center ${chip.selected ? 'bg-custom-orange text-white' : 'bg-gray-400 text-white'} cursor-pointer`}
              onClick={() => toggleChipSelection(index)}
            >
              {chip.label}
              {chip.selected && (
                <span className="ml-2" onClick={(e) => { e.stopPropagation(); toggleChipSelection(index); }}>x</span>
              )}
            </span>
          ))}
        </div>
        <div className="px-6 py-4 border-t mt-2">
          <div className="flex justify-between">
            <button
              className="bg-red-500 text-white px-6 py-1 rounded"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="bg-green-500 text-white px-6 py-1 rounded"
              onClick={handleSubmission}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlavourProfile
