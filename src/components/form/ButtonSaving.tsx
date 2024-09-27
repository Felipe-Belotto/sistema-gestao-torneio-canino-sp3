import React from "react";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ButtonSavingProps {
  buttonLoading: boolean;
}

export default function ButtonSaving({ buttonLoading }: ButtonSavingProps) {
  return (
    <Button
      disabled={buttonLoading}
      type="submit"
      className="bg-[#20640b] hover:bg-[#327c1b] active:bg-[#327c1b] text-primary"
    >
      {buttonLoading ? (
        <div className="flex gap-1 items-center">
          Salvando
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        </div>
      ) : (
        <>Salvar</>
      )}
    </Button>
  );
}
