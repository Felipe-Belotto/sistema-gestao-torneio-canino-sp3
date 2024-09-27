"use client";
import DeleteIcon from "@/components/icon/DeleteIcon";
import EditIcon from "@/components/icon/EditIcon";
import ExamIcon from "@/components/icon/ExamIcon";
import { useBreakpoint } from "@/hook/useBreakpoint";
import { getAllUsers } from "@/lib/prisma";
import type { User } from "@prisma/client";
import type React from "react";
import { useEffect, useState } from "react";

export default function RankingSection() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  const breakpoint = useBreakpoint();

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
            <h4 className="text-secundary text-[32px]">Ranking</h4>
            <p className="text-[48px] text-white">Faro de drogas</p>
          </div>
          <table className="2xl:w-[1130px] mx-auto shadow-md rounded-lg mt-14">
            <caption className="sr-only">Ranking Data</caption>
            <thead>
              <tr className="bg-primary text-white uppercase text-sm">
                <th className="text-left px-8 py-3 rounded-tl-md">Pontuação</th>
                <th className="text-left px-8 py-3">Tempo</th>
                {breakpoint === "desktop" && (
                  <>
                    <th className="text-left px-8 py-3">Instituição</th>
                    <th className="text-left px-8 py-3">Condutor</th>
                  </>
                )}
                <th className="text-left px-8 py-3">Nome</th>
                <th className="text-left px-8 py-3">Idade</th>
                <th className="text-left px-8 py-3 rounded-tr-md">Sexo</th>
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
                  {breakpoint === "desktop" && (
                    <>
                      <TableTd text={user.institution} />
                      <TableTd text={user.name_conductor} />
                    </>
                  )}

                  <TableTd text={user.name_dog} />
                  <TableTd text={user.age_dog} />
                  <TableTd text={user.sex_dog} />
                </tr>
              ))}
            </tbody>
          </table>
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
    <td className="text-left px-8 py-3 border-b border-gray-200 ">
      {text}
      {children}
    </td>
  );
};
