import React, { useState, type FormEvent, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUser } from "@/lib/prisma";
import { Loader2 } from "lucide-react";

interface EditScoreTimeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: {
    id: string;
    pontuation?: number;
    test_time?: string;
    institution: string;
    name_conductor: string;
    name_dog: string;
    age_dog: number;
    sex_dog: string;
  };
}

interface FormData {
  pontuation: number;
  test_time: string;
  institution: string;
  name_conductor: string;
  name_dog: string;
  age_dog: number;
  sex_dog: string;
}

export default function ExamParticipant({
  isOpen,
  onClose,
  initialData,
}: EditScoreTimeDialogProps) {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    pontuation: initialData.pontuation || 0,
    test_time: initialData.test_time || "00:00",
    institution: initialData.institution,
    name_conductor: initialData.name_conductor,
    name_dog: initialData.name_dog,
    age_dog: initialData.age_dog,
    sex_dog: initialData.sex_dog,
  });

  const handleInputFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "pontuation" || name === "age_dog" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setButtonLoading(true);
      await updateUser(initialData.id, formData);
      onClose();
    } catch (error) {
      console.error("Failed to update user", error);
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#02132f] text-primary">
        <DialogHeader>
          <DialogTitle className="text-secundary">
            Editar Pontuação e Tempo
          </DialogTitle>
          <DialogDescription className="text-primary">
            Atualize a pontuação e o tempo do teste aqui. Clique em salvar
            quando terminar.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pontuation" className="text-right">
                Pontuação
              </Label>
              <Input
                type="number"
                id="pontuation"
                name="pontuation"
                value={formData.pontuation}
                onChange={handleInputFormChange}
                required
                className="col-span-3 bg-[#02132f] text-primary border-gray-600"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4 ">
              <Label className="text-right mt-5">Tempo</Label>
              <div className="col-span-3 grid grid-cols-3 gap-2">
                <div className="flex flex-col">
                  <Label
                    htmlFor="hours"
                    className="text-center text-xs text-primary mb-2"
                  >
                    Horas
                  </Label>
                  <Input
                    id="hours"
                    type="text"
                    placeholder="HH"
                    maxLength={2}
                    className="bg-[#02132f] text-primary border-gray-600 text-center"
                    defaultValue={"00"}
                  />
                </div>
                <div className="flex flex-col">
                  <Label
                    htmlFor="minutes"
                    className="text-center text-xs text-primary mb-2"
                  >
                    Minutos
                  </Label>
                  <Input
                    id="minutes"
                    type="text"
                    placeholder="MM"
                    maxLength={2}
                    className="bg-[#02132f] text-primary border-gray-600 text-center"
                  />
                </div>
                <div className="flex flex-col">
                  <Label
                    htmlFor="seconds"
                    className="text-center text-xs text-primary mb-2"
                  >
                    Segundos
                  </Label>
                  <Input
                    id="seconds"
                    type="text"
                    placeholder="SS"
                    maxLength={2}
                    className="bg-[#02132f] text-primary border-gray-600 text-center"
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="flex w-full mt-2">
            <Button
              disabled={buttonLoading}
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-primary"
            >
              {buttonLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando
                </>
              ) : (
                <>Salvar Alterações</>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
