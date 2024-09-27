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
import type React from "react";

interface CreateParticipantDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateParticipantDialog({
  isOpen,
  onClose,
}: CreateParticipantDialogProps) {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onClose();
    /* lógica de salvar o participante */
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
              <Label htmlFor="conductor" className="text-right">
                Nome do condutor
              </Label>
              <Input
                id="conductor"
                className="col-span-3 bg-[#02132f] text-primary border-gray-600"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dog" className="text-right">
                Cão
              </Label>
              <Input
                id="dog"
                className="col-span-3 bg-[#02132f] text-primary border-gray-600"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="age" className="text-right">
                Idade
              </Label>
              <Input
                id="age"
                type="number"
                className="col-span-3 bg-[#02132f] text-primary border-gray-600"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="institution" className="text-right">
                Instituição
              </Label>
              <Input
                id="institution"
                className="col-span-3 bg-[#02132f] text-primary border-gray-600"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Tempo</Label>
              <div className="col-span-3 grid grid-cols-3 gap-2">
                <div className="flex flex-col">
                  <Label
                    htmlFor="hours"
                    className="text-center text-xs text-primary"
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
                    className="text-center text-xs text-primary"
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
                    className="text-center text-xs text-primary"
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

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="score" className="text-right">
                Pontuação
              </Label>
              <Input
                id="score"
                type="text"
                className="col-span-3 bg-[#02132f] text-primary border-gray-600"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-primary"
            >
              Salvar Participante
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
