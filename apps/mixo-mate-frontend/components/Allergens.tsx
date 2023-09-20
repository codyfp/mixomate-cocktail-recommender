import InputChips from "./InputChips"
import { InputLabel } from '@/types/InputLabels'

interface AllergensProps {
  allergens: string[]
  setAllergens: (allergens: string[]) => void
}

const Allergens = (props: AllergensProps) => {

  const { allergens, setAllergens } = props

    return (
      <div className='flex flex-col'>
        <InputChips title={InputLabel.ALLERGENS} options={allergens} setOptions={setAllergens}/>
      </div>
    )
  }
  
  export default Allergens;