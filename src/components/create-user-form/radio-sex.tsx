import React from 'react'
import { UserProps } from '@/lib/types'

interface RadioSexProps {
  sex_dog: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const RadioSex: React.FC<RadioSexProps> = ({sex_dog , handleChange}) => {
  return (
    <div className="flex gap-2 flex-col">
      <label>Sexo do Cachorro:</label>
      <div className="flex items-center gap-4">
        <label htmlFor="macho">
          <input
            type="radio"
            id="macho"
            name="sex_dog"
            value="Macho"
            checked={sex_dog === "Macho"}
            onChange={handleChange}
            required
          />
          Macho
        </label>

        <label htmlFor="femea">
          <input
            type="radio"
            id="femea"
            name="sex_dog"
            value="Femea"
            checked={sex_dog === "Femea"}
            onChange={handleChange}
            required
          />
          Fêmea
        </label>
      </div>
    </div>
  )
}
