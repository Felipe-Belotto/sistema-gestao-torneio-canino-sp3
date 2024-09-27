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
import { useState, useRef } from "react";
import { ChangeDogSex } from "./ChangeDogSex";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ButtonSaving from "./ButtonSaving";
import { useAdmin } from "@/hook/useAdmin";

const initialForm = {
  name_conductor: "",
  name_dog: "",
  age_dog: 0,
  institution: "",
  sex_dog: "Macho",
  pontuation: 100,
  test_time: "00m 00s",
};

export default function CreateParticipantDialog({
  isOpen,
  onClose,
  onMutate,
}: CreateParticipantDialogProps) {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [formData, setFormData] = useState<UserProps>(initialForm);
  const { toast } = useToast();
  const nameConductorRef = useRef<HTMLInputElement>(null);

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
      await createUser(formData).then(() => {
        onMutate();
      });
      setFormData(initialForm);
      toast({
        title: "Usuário criado com sucesso",
        description:
          "Os dados do usuário foram gerados e em alguns segundos serão exibidos na tabela.",
        className: "bg-[#5ac33a] text-white",
      });

      if (nameConductorRef.current) {
        nameConductorRef.current.focus();
      }
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
          <DialogTitle className="text-secundary text-lg font-bold">
            Criar Novo Participante
          </DialogTitle>
          <DialogDescription className="text-primary text-base">
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
                ref={nameConductorRef} // Attach the ref to the input
                value={formData.name_conductor}
                onChange={handleInputFormChange}
                required
                placeholder="Nome do condutor"
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
                placeholder="Nome do cão"
                className="col-span-3 bg-[#02132f] text-primary border-gray-600"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="age_dog" className="text-right">
                Idade
              </Label>
              <Input
                id="age_dog"
                name="age_dog"
                value={formData.age_dog === 0 ? "" : formData.age_dog}
                onChange={handleInputFormChange}
                required
                placeholder="Idade do cão"
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
                placeholder="Nome da instituição"
                className="col-span-3 bg-[#02132f] text-primary border-gray-600"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sex_dog" className="text-right">
                Sexo do Cão
              </Label>
              <ChangeDogSex
                handleChange={handleInputFormChange}
                sex_dog={formData.sex_dog}
              />
            </div>
          </div>
          <DialogFooter className="flex w-full">
            <ButtonSaving buttonLoading={buttonLoading} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
