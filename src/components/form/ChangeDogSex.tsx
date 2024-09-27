import type { RadioSexProps } from "@/lib/types";
import type React from "react";

export const ChangeDogSex: React.FC<RadioSexProps> = ({
  sex_dog,
  handleChange,
}) => {
  return (
    <div className="flex gap-2 flex-col">
      <div className="flex items-center gap-4">
        <label htmlFor="macho" className="cursor-pointer flex gap-2">
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

        <label htmlFor="femea" className="cursor-pointer flex gap-2">
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
  );
};
