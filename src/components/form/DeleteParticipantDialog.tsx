import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { deleteUser } from "@/lib/prisma";

import DeleteIcon from "../icon/DeleteIcon";
import { User } from "@prisma/client";
import { set } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface DeleteParticipantProps {
  isOpen: boolean;
  onClose: () => void;
  onMutate: () => void;
  data: User;
}

const DeleteParticipantDialog: React.FC<DeleteParticipantProps> = ({
  onClose,
  data,
  onMutate,
}) => {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteUser(data.id).then(() => {
        onMutate();
        setLoading(false);
      });
      onClose();
      toast({
        title: "Usuário apagado com sucesso",
        description:
          "Os dados do usuário foram excluidos e em alguns segundos não serão mais exibidos na tabela.",
        className: "bg-[#5ac33a] text-white",
      });
    } catch (error) {
      console.error("Failed to delete participant:", error);
    }
  };

  const handleOpenConfirmDialog = () => {
    setIsConfirmingDelete(!isConfirmingDelete);
  };

  return (
    <>
      <Button
        onClick={handleOpenConfirmDialog}
        className="bg-transparent hover:bg-transparent"
      >
        <DeleteIcon />
      </Button>
      {isConfirmingDelete && (
        <Dialog open={true} onOpenChange={handleOpenConfirmDialog}>
          <DialogContent className="text-white bg-[#02132f]">
            {data.name_dog ? (
              <p className="text-lg font-bold">
                Você tem certeza que deseja excluir{" "}
                <strong className="text-secundary">{data.name_dog}</strong>?
              </p>
            ) : (
              <p>Você tem certeza que deseja excluir este participante?</p>
            )}
            <p className="text-red-500 text-sm font-bold">
              Esta ação é irreversível.
            </p>
            {loading ? (
              <div>Excluindo...</div>
            ) : (
              <div className="w-full flex justify-end gap-4">
                <Button
                  onClick={handleOpenConfirmDialog}
                  className="text-white bg-transparent "
                >
                  Cancelar
                </Button>
                <Button
                  type="button"
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700 text-primary"
                >
                  Excluir
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default DeleteParticipantDialog;
