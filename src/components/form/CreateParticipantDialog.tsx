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
import { createUser } from "@/lib/prisma";
import type { CreateParticipantDialogProps, UserProps } from "@/lib/types";
import type React from "react";
import { useState } from "react";
import { RadioSex } from "./radio-sex";
import { Loader2 } from "lucide-react";

const initialForm = {
  name_conductor: "",
  name_dog: "",
  age_dog: 0,
  institution: "",
  sex_dog: "",
  pontuation: 0,
  test_time: "00",
};

export default function CreateParticipantDialog({
  isOpen,
  onClose,
}: CreateParticipantDialogProps) {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [formData, setFormData] = useState<UserProps>(initialForm);

  const handleInputFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "age_dog" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setButtonLoading(true);
      await createUser(formData);
      setFormData(initialForm);
    } catch (error) {
      throw new Error("Failed to create user");
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#02132f] text-primary">
        <DialogHeader>
          <DialogTitle className="text-secundary">
            Criar Novo Participante
          </DialogTitle>
          <DialogDescription className="text-primary">
            Preencha os detalhes do novo participante aqui. Clique em salvar
            quando terminar.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name_conductor" className="text-right">
                Nome do condutor
              </Label>
              <Input
                type="text"
                id="name_conductor"
                name="name_conductor"
                value={formData.name_conductor}
                onChange={handleInputFormChange}
                required
                className="col-span-3 bg-[#02132f] text-primary border-gray-600"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name_dog" className="text-right">
                Cão
              </Label>
              <Input
                type="text"
                id="name_dog"
                name="name_dog"
                value={formData.name_dog}
                onChange={handleInputFormChange}
                required
                className="col-span-3 bg-[#02132f] text-primary border-gray-600"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="age_dog" className="text-right">
                Idade
              </Label>
              <Input
                type="number"
                id="age_dog"
                name="age_dog"
                value={formData.age_dog}
                onChange={handleInputFormChange}
                required
                className="col-span-3 bg-[#02132f] text-primary border-gray-600"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="institution" className="text-right">
                Instituição
              </Label>
              <Input
                type="text"
                id="institution"
                name="institution"
                value={formData.institution}
                onChange={handleInputFormChange}
                required
                className="col-span-3 bg-[#02132f] text-primary border-gray-600"
              />
            </div>
            <RadioSex
              handleChange={handleInputFormChange}
              sex_dog={formData.sex_dog}
            />
          </div>
          <DialogFooter className="flex w-full">
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
                <>Salvar participante</>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
