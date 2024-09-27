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
import { getUserById, updateUser } from "@/lib/prisma";
import type { UpdateParticipantDialogProps, UserProps } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { ChangeDogSex } from "./ChangeDogSex";
import { Loader2 } from "lucide-react";
import EditIcon from "../icon/EditIcon";
import { useToast } from "@/hooks/use-toast";
import ButtonSaving from "./ButtonSaving";

export default function UpdateParticipantDialog({
  data,
  onMutate,
}: UpdateParticipantDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<UserProps>({
    name_conductor: data.name_conductor,
    name_dog: data.name_dog,
    age_dog: data.age_dog,
    institution: data.institution,
    sex_dog: data.sex_dog,
    pontuation: data.pontuation,
    test_time: data.test_time,
  });
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

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
      await updateUser(data.id, formData).then(() => {
        onMutate();
      });
      handleOpenDialog();
      toast({
        title: "Usuário atualizado com sucesso",
        description:
          "Os dados do usuário foram atualizados e em alguns segundos serão exibidos na tabela.",
        className: "bg-[#5ac33a] text-white",
      });
    } catch (error) {
      console.error("Falha ao editar usuario:", error);
      throw new Error("Falha ao editar usuario");
    } finally {
      setButtonLoading(false);
    }
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  return (
    <>
      <Button
        onClick={handleOpenDialog}
        className="text-white hover:text-secundary  bg-transparent hover:bg-transparent  py-2 px-4 rounded-md flex gap-4 items-center"
        aria-label="Edit Participant"
      >
        <EditIcon />
      </Button>
      <Dialog open={isDialogOpen} onOpenChange={handleOpenDialog}>
        <DialogContent className="sm:max-w-[425px] bg-[#02132f] text-primary">
          <DialogHeader>
            <DialogTitle className="text-secundary text-lg font-bold">
              Editar Participante
            </DialogTitle>
            <DialogDescription className="text-primary text-base">
              Preencha as alterações do participante aqui e Clique em salvar
            </DialogDescription>
          </DialogHeader>
          {isLoading ? (
            <h4>Carregando...</h4>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name_conductor" className="text-right">
                    Condutor
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
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
