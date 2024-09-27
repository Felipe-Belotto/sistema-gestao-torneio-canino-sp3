"use client";
import DeleteIcon from "@/components/icon/DeleteIcon";
import EditIcon from "@/components/icon/EditIcon";
import ExamIcon from "@/components/icon/ExamIcon";
import { getAllUsers } from "@/lib/prisma";
import type { User } from "@prisma/client";
import React, { useEffect, useState } from "react";

export default function ParticipantsSection() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

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
          <table className="2xl:w-[1130px] mx-auto shadow-md rounded-lg mt-14 min-h-[485px]">
            <caption className="sr-only">Ranking Data</caption>
            <thead>
              <tr className="bg-primary text-white uppercase text-sm">
                <th className="text-left px-8 py-3 rounded-tl-md">
                  Instituição
                </th>
                <th className="text-left px-8 py-3">Nome Condutor</th>
                <th className="text-left px-8 py-3">Nome</th>
                <th className="text-left px-8 py-3">Idade</th>
                <th className="text-left px-8 py-3">Sexo</th>
                <th className="text-left px-8 py-3">Avaliação</th>
                <th className="text-left px-8 py-3 rounded-tr-md">Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100 text-base">
                  <td className="text-left px-8 py-3 border-b border-gray-200">
                    {user.institution}
                  </td>
                  <td className="text-left px-8 py-3 border-b border-gray-200">
                    {user.name_conductor}
                  </td>
                  <td className="text-left px-8 py-3 border-b border-gray-200">
                    {user.name_dog}
                  </td>
                  <td className="text-left px-8 py-3 border-b border-gray-200">
                    {user.age_dog}
                  </td>
                  <td className="text-left px-8 py-3 border-b border-gray-200">
                    {user.sex_dog}
                  </td>
                  <td className="text-left px-8 py-3 border-b border-gray-200">
                    <button
                      onClick={() => console.log("exam")}
                      className="text-white hover:text-secundary bg-tertiary py-2 px-4 rounded-md flex gap-4"
                      aria-label="View"
                    >
                      Avaliar <ExamIcon />
                    </button>
                  </td>
                  <td className="text-left px-8 py-3 border-b border-gray-200  ">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
