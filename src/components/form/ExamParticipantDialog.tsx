import React, {
  useState,
  type FormEvent,
  type ChangeEvent,
  useEffect,
} from "react";
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
import ExamIcon from "../icon/ExamIcon";
import { useUsers } from "@/hook/useUsers";
import type { User } from "@prisma/client";
import { useToast } from "@/hooks/use-toast";
import ButtonSaving from "./ButtonSaving";

interface ExamParticipantProps {
  isOpen: boolean;
  onClose: () => void;
  data: User;
}

export default function ExamParticipantDialog({ data }: ExamParticipantProps) {
  const { fetchUsers } = useUsers();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isExamDialogOpen, setIsExamDialogOpen] = useState(false);
  const [formData, setFormData] = useState<User>({
    id: data.id,
    pontuation: data.pontuation,
    test_time: data.test_time,
    institution: data.institution,
    name_conductor: data.name_conductor,
    name_dog: data.name_dog,
    age_dog: data.age_dog,
    sex_dog: data.sex_dog,
    fileURL: data.fileURL,
  });

  const [minutes, setMinutes] = useState(() => {
    const match = data.test_time.match(/(\d+)m/);
    return match ? Number.parseInt(match[1], 10) : 0;
  });
  const [seconds, setSeconds] = useState(() => {
    const match = data.test_time.match(/(\d+)s/);
    return match ? Number.parseInt(match[1], 10) : 0;
  });
  const { toast } = useToast();

  useEffect(() => {
    handleTimeChange();
  }, [minutes, seconds]);

  const handleInputFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]:
        name === "pontuation" || name === "age_dog" ? Number(value) : value,
    }));
  };

  const handleMinuteChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,2}$/.test(value)) {
      setMinutes(Number(value));
    }
  };

  const handleSecondChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,2}$/.test(value)) {
      setSeconds(Number(value));
    }
  };

  const handleTimeChange = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      test_time: `${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setButtonLoading(true);
      console.log("formData", formData);
      await updateUser(data.id, formData);
      setIsExamDialogOpen(false);
      fetchUsers();
      toast({
        title: "Usuário avaliado com sucesso",
        description:
          "Os dados do usuário foram atualizados e em alguns segundos serão exibidos na tabela.",
        className: "bg-[#5ac33a] text-white",
      });
    } catch (error) {
      console.error("Falha ao atualizar o usuário", error);
    } finally {
      setButtonLoading(false);
    }
  };

  const handleOpenExamDialog = () => {
    setIsExamDialogOpen(!isExamDialogOpen);
  };

  return (
    <>
      <Button
        onClick={handleOpenExamDialog}
        className="text-white hover:text-secundary bg-tertiary py-2 px-4 rounded-md flex gap-4 items-center"
        aria-label="Edit Score and Time"
      >
        Avaliar <ExamIcon />
      </Button>
      {isExamDialogOpen && (
        <Dialog open={true} onOpenChange={handleOpenExamDialog}>
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
                        htmlFor="minutes"
                        className="text-center text-xs text-primary mb-2"
                      >
                        Minutos
                      </Label>
                      <Input
                        id="minutes"
                        placeholder="MM"
                        value={minutes}
                        onChange={handleMinuteChange}
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
                        placeholder="SS"
                        value={seconds}
                        onChange={handleSecondChange}
                        className="bg-[#02132f] text-primary border-gray-600 text-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter className="flex w-full mt-2">
                <ButtonSaving buttonLoading={buttonLoading} />
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
