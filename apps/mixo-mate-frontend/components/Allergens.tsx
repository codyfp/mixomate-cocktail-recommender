import InputChips from "./InputChips"
import { InputLabel } from '@/types/InputLabels'

const Allergens = () => {
    return (
      <div className='flex flex-col'>
        <InputChips label={InputLabel.ALLERGENS} className="mb-8"/>
      </div>
    )
  }
  
  export default Allergens;