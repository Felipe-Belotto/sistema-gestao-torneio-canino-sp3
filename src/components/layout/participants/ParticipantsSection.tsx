"use client";
import type React from "react";
import { useEffect, useState } from "react";
import { getAllUsers } from "@/lib/prisma";
import type { User } from "@prisma/client";
import DeleteIcon from "@/components/icon/DeleteIcon";
import EditIcon from "@/components/icon/EditIcon";
import ExamParticipant from "@/components/form/ExamParticipant";
import ExamIcon from "@/components/icon/ExamIcon";

export default function ParticipantsSection() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
      } catch (error) {
        if (error instanceof Error) {
          setError(`An error occurred while fetching data: ${error.message}`);
        } else {
          setError("An unknown error occurred.");
        }
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  if (users.length === 0) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="p-5 bg-white rounded-lg">
      {error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : (
        <>
          <div className="bg-primary px-6 rounded-md flex justify-between items-center gap-3 flex-1 h-[100px]">
            <h4 className="text-secundary text-[32px]">Participantes</h4>
            <p className="text-[48px] text-white">Faro de drogas</p>
          </div>
          <table className="2xl:w-[1130px] mx-auto shadow-md rounded-lg mt-14">
            <caption className="sr-only">Ranking Data</caption>
            <thead>
              <tr className="bg-primary text-white uppercase text-sm">
                <th className="text-left px-8 py-3  rounded-tl-md">
                  Pontuação
                </th>
                <th className="text-left px-8 py-3">Tempo</th>
                <th className="text-left px-8 py-3">Instituição</th>
                <th className="text-left px-8 py-3">Condutor</th>
                <th className="text-left px-8 py-3">Nome</th>
                <th className="text-left px-8 py-3">Idade</th>
                <th className="text-left px-8 py-3">Sexo</th>
                <th className="text-left px-8 py-3">Avaliação</th>
                <th className="text-left px-8 py-3 rounded-tr-md">Ações</th>
              </tr>
            </thead>
            <tbody className="h-full">
              {users.map((user) => (
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
                    <button
                      onClick={() => handleEditClick(user)}
                      className="text-white hover:text-secundary bg-tertiary py-2 px-4 rounded-md flex gap-4 items-center"
                      aria-label="Edit Score and Time"
                    >
                      Avaliar <ExamIcon />
                    </button>
                  </TableTd>
                  <TableTd>
                    <div className="flex opacity-80 hover:opacity-100">
                      <button
                        onClick={() => console.log("edit")}
                        className="text-yellow-500 hover:text-yellow-700 mx-6"
                        aria-label="Edit"
                      >
                        <EditIcon />
                      </button>
                      <button
                        onClick={() => console.log("delete")}
                        className="text-red-500 hover:text-red-700"
                        aria-label="Delete"
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </TableTd>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {selectedUser && (
        <ExamParticipant
          isOpen={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            setSelectedUser(null);
          }}
          initialData={{
            id: selectedUser.id,
            pontuation: selectedUser.pontuation,
            test_time: selectedUser.test_time,
            institution: selectedUser.institution,
            name_conductor: selectedUser.name_conductor,
            name_dog: selectedUser.name_dog,
            age_dog: selectedUser.age_dog,
            sex_dog: selectedUser.sex_dog,
          }}
        />
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
    <td className="text-left px-8 py-3 border-b border-gray-200 ">
      {text}
      {children}
    </td>
  );
};
