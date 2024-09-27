"use client";
import type React from "react";
import UpdateParticipantDialog from "@/components/form/UpdateParticipantDialog";
import { useMemo, useState } from "react";
import { useUsers } from "@/hook/useUsers";
import ExamParticipantDialog from "@/components/form/ExamParticipantDialog";
import DeleteParticipantDialog from "@/components/form/DeleteParticipantDialog";
import AddIcon from "@/components/icon/AddIcon";
import CreateParticipantDialog from "@/components/form/CreateParticipantDialog";

export default function ParticipantsSection() {
  const [isExamDialogOpen, setIsExamDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { users, error, fetchUsers } = useUsers();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => b.pontuation - a.pontuation);
  }, [users]);

  return (
    <div className="p-5 bg-white rounded-lg mt-14">
      {error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : (
        <>
          <div className="bg-primary px-6 rounded-md flex flex-col md:flex-row justify-between items-center gap-3 flex-1 h-[100px]">
            <h4 className="text-secundary text-2xl md:text-3xl">
              Participantes
            </h4>
            <p className="text-4xl text-white">Faro de drogas</p>
          </div>
          <div className="overflow-x-auto">
            <table className="mx-auto shadow-md rounded-lg mt-14 min-w-full">
              <caption className="sr-only">Ranking Data</caption>
              <thead>
                <tr className="bg-primary text-white uppercase text-xs md:text-sm">
                  <th className="text-left px-4 py-2 rounded-tl-md">
                    Pontuação
                  </th>
                  <th className="text-left px-4 py-2">Tempo</th>
                  <th className="text-left px-4 py-2">Instituição</th>
                  <th className="text-left px-4 py-2">Condutor</th>
                  <th className="text-left px-4 py-2">Nome</th>
                  <th className="text-left px-4 py-2">Idade</th>
                  <th className="text-left px-4 py-2">Sexo</th>
                  <th className="text-left px-4 py-2">Avaliação</th>
                  <th className="text-left px-4 py-2 rounded-tr-md">Ações</th>
                </tr>
              </thead>
              <tbody className="h-full">
                {sortedUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-100 text-base max-h-12"
                  >
                    <TableTd text={user.pontuation} />
                    <TableTd text={user.test_time} />
                    <TableTd text={user.institution} />
                    <TableTd text={user.name_conductor} />
                    <TableTd text={user.name_dog} />
                    <TableTd text={user.age_dog} />
                    <TableTd text={user.sex_dog} />
                    <TableTd>
                      <ExamParticipantDialog
                        isOpen={isExamDialogOpen}
                        onClose={() => setIsExamDialogOpen(false)}
                        data={user}
                        key={user.id}
                      />
                    </TableTd>
                    <TableTd>
                      <div className="flex gap-2">
                        <UpdateParticipantDialog
                          isOpen={isUpdateDialogOpen}
                          onClose={() => setIsUpdateDialogOpen(false)}
                          data={user}
                          onMutate={fetchUsers}
                        />
                        <DeleteParticipantDialog
                          isOpen={isDeleteDialogOpen}
                          onClose={() => setIsDeleteDialogOpen(false)}
                          data={user}
                          onMutate={fetchUsers}
                        />
                      </div>
                    </TableTd>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="bg-tertiary flex items-center rounded-md px-6 py-2 text-lg text-white mt-14 mx-auto"
              onClick={() => setIsDialogOpen(true)}
            >
              <AddIcon /> Criar participante
            </button>
            <CreateParticipantDialog
              isOpen={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
              onMutate={fetchUsers}
            />
          </div>
        </>
      )}
    </div>
  );
}

type TableTdProps = {
  text?: string | number;
  children?: React.ReactNode;
};

const TableTd = ({ text, children }: TableTdProps) => {
  return (
    <td className="text-left px-4 py-2 border-b border-gray-200">
      {text && <span>{text}</span>}
      {children}
    </td>
  );
};
